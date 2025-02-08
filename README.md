# acore-graph

Creates a neo4j graph db from the acore_world db in azerothcore

why? because this data is well suited to a graph format and because I wanted to learn more about graph dbs

## Prequesites
- node
- mysql
- docker
- docker-compose-plugin
- java-21-openjdk
- neo4j
- neo4j-etl
- mysql-connector-j

## Steps

1. git clone https://github.com/azerothcore/azerothcore-wotlk.git
2. cd azerothcore-wotlk
3. DOCKER_DB_EXTERNAL_PORT=3307 docker compose build --no-cache
4. DOCKER_DB_EXTERNAL_PORT=3307 docker compose up -d ac-database  // no reason to run the entire game just need the data
5. cd .. && git clone https://github.com/wowgaming/node-dbc-reader.git && ./src/scripts/dbc_import.sh  // builds all the sql queries to import dbc data into acore_world
5. make sure JAVA_HOME="/usr/lib/jvm/java-21-openjdk-amd64" is in /etc/environment and source it
6. edit `initial.dbms.default_database=` in /etc/neo4j/neo4j.conf to `initial.dbms.default_database=acore-graph` and comment out `server.directories.import=/var/lib/neo4j/import`
7. sudo neo4j-admin dbms set-initial-password mynewpass && sudo neo4j start
8. run cd .. && ./src/scripts/neo4j_import.sh  // make sure to set your paths correctly
9. neo4j-etl is bugged (at time of writing) and generates everything we need but does it incorrectly so we have to patch it, it also bricks the database for some reason
10. sudo neo4j stop && sudo rm -rf /var/neo4j/data/databases && sudo rm -rf /var/neo4j/data/transactions
11. cd /tmp/acore_world/csv-001
12. replace `(CREATE CONSTRAINT) ON (.*) ASSERT (.*)` with `$1 FOR $2 REQUIRE $3`
13. replace USING PERIODIC COMMIT `USING PERIODIC COMMIT\n(.*\n.*\n.*);` with `CALL {\n$1\n} IN TRANSACTIONS ON ERROR CONTINUE`
14. also replace `USING PERIODIC COMMIT\n([aA-zZ0-9-\(\)\{\},. \n>':\/]*)` with `CALL {\n$1\n} IN TRANSACTIONS ON ERROR CONTINUE`
15. remove all locales imports `CALL .*\n.*locale.*\n[aA-zZ \n\(\)0-9:\{\}.,>=]* IN TRANSACTIONS ON ERROR CONTINUE` with ` `
18. sudo neo4j start && cypher-shell -a bolt://localhost:7687 -u neo4j -p mynewpass -f ./load-csv.cypher

at this point the nodes, labels and node properties should be generated and you can start graphing and databasing.

time to generate relationships. this takes a while (especially the item relationships)

19. cd wherever you cloned this project to and ./src/scripts/generate_relationships.sh

