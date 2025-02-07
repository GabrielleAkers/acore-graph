# acore-graph

Creates a neo4j graph db from the acore_world db in azerothcore

why? because this data is well suited to a graph format and because I wanted to learn more about graph dbs

## Prequesites
- docker
- docker-compose-plugin
- java-21-openjdk
- neo4j
- neo4j-etl
- mysql-connector-j

## Steps

1. git clone https://github.com/azerothcore/azerothcore-wotlk.git
2. cd azerothcore-wotlk
3. docker-compose up -d  // this populates the db
4. docker-compose down
5. docker-compose up -d ac-database  // no reason to run the entire game just need the data
6. make sure JAVA_HOME="/usr/lib/jvm/java-21-openjdk-amd64" is in /etc/environment and source it
7. run cd .. && ./src/scripts/neo4j_import.sh  // make sure to set your paths correctly
8. neo4j-etl is bugged (at time of writing) and generates everything we need but does it incorrectly so we have to patch it, it also bricks the database for some reason
9. so run sudo rm -rf /var/neo4j/data/databases && sudo rm -rf /var/neo4j/data/transactions
10. cd /tmp/acore_world/csv-001
11. replace CREATE CONSTRAINT ON .. ASSERT .. with CREATE CONSTRAINT FOR .. REQUIRE ..
12. replace USING PERIODIC COMMIT `USING PERIODIC COMMIT\n(.*\n.*\n.*);` with `CALL {\n$1\n} IN TRANSACTIONS`
13. also replace `USING PERIODIC COMMIT\n([aA-zZ0-9-\(\)\{\},. \n>]*).*` with `CALL {\n$1\n} IN TRANSACTIONS`
14. remove all locales imports `CALL .*\n.*locale.*\n[aA-zZ \n\(\)0-9:\{\}.,>=]* IN TRANSACTIONS` with ` `
15. edit `initial.dbms.default_database=` in /etc/neo4j/neo4j.conf to `initial.dbms.default_database=acore-graph` and comment out `server.directories.import=/var/lib/neo4j/import`
16. sudo neo4j start
17. cypher-shell -a bolt://localhost:7687 -u neo4j -p neo4j -f ./load-csv.cypher

at this point the nodes, labels and node properties should be generated and you can start graphing and databasing.

time to generate relationships (this takes a while)

18. cd $HOME/acore-graph && ./src/scripts/generate_relationships.sh

