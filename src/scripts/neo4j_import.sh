#!/usr/bin/env bash

export NEO4J_HOME=/var/lib/neo4j
export NEO4J_ETL_CLI_DIR=/home/gabby/neo4j-etl-cli-1.6.0

mkdir -p /tmp/acore_world

echo '{ "multiline-fields" : "true" }' > /tmp/acore_world/options.json

# generate mappings for acore_world
$NEO4J_ETL_CLI_DIR/bin/neo4j-etl generate-metadata-mapping \
  --rdbms:url "jdbc:mysql://localhost:3307/acore_world?user=root&password=password" \
  --rdbms:user "root" --rdbms:password "password" \
  --rdbms:schema "acore_world" --output-mapping-file "/tmp/acore_world/mapping.json" \
  --debug

# import into acore-graph neo4j db
$NEO4J_ETL_CLI_DIR/bin/neo4j-etl export \
  --rdbms:url "jdbc:mysql://localhost:3307/acore_world?user=root&password=password" \
  --rdbms:user "root" --rdbms:password "password" \
  --neo4j:url "bolt://localhost:7687" \
  --neo4j:user "neo4j" \
  --neo4j:password "mynewpass" \
  --import-tool "/usr/bin" \
  --using cypher:direct \
  --options-file "/tmp/acore_world/options.json" \
  --csv-directory "/tmp/acore_world" \
  --destination "$NEO4J_HOME/data/databases/acore-graph/" \
  --mapping-file "/tmp/acore_world/mapping.json" \
  --quote '"' --force --debug
