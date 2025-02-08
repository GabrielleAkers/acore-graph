#!/usr/bin/env bash

[ -z "$WITH_ERRORS" ] && set -e

CUR_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DBC_SQL_DIR="$CUR_PATH/../../data/dbc_sql"

mkdir -p $DBC_SQL_DIR

cd $CUR_PATH/../../node-dbc-reader
npm install

# generates sql to import dbc files directly into acore_world
# some files dont have schemas so continue on error
for dbc_file in data/dbc/*.dbc; do
    echo parsing "$dbc_file"
    npm run start -- --out-type=sql --file="$DBC_SQL_DIR/$(basename "$dbc_file" .dbc).sql" "$(basename "$dbc_file" .dbc)" || true
done

cd $CUR_PATH/../../
for sql_file in $DBC_SQL_DIR/*.sql; do
    echo applying "$sql_file"
    mysql -u root --password=password -h 127.0.0.1 -P 3307 -D acore_world < "$sql_file" || true
done
