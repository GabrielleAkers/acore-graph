#!/usr/bin/env bash

[ -z "$WITH_ERRORS" ] && set -e

CUR_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for cypher_file in $CUR_PATH/../relationship-cypher/*.cypher; do
    cypher-shell -a bolt://localhost:7687 -u neo4j -p mynewpass --database=acore-graph -f "$cypher_file"
done
