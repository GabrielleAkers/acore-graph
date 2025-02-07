#!/usr/bin/env bash

[ -z "$WITH_ERRORS" ] && set -e

CUR_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cypher-shell -a bolt://localhost:7687 -u neo4j -p mynewpass --database=acore-graph -f $CUR_PATH/../cypher/quests.cypher
cypher-shell -a bolt://localhost:7687 -u neo4j -p mynewpass --database=acore-graph -f $CUR_PATH/../cypher/loot.cypher
