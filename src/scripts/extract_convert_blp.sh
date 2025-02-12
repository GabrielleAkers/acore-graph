#!/usr/bin/env bash

if [ $# -ne 2 ] && [ $# -ne 3 ]; then
    echo "usage: extract_mpq.sh <wow-data-dir> <output-dir> [--no-instances]"
    exit 1
fi

CUR_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$CUR_PATH/../../" && pwd )"

WOW_DATA_DIR=$1
OUTPUT_DIR=$2
NO_INSTANCES=$3

mkdir -p "$OUTPUT_DIR"
mkdir -p "$PROJECT_ROOT/tmp"

MPQExtractor=./MPQExtractor/build/bin/MPQExtractor
BLPConverter=./BLPConverter/build/bin/BLPConverter

if [ ! -f "$MPQExtractor" ]; then
    git clone https://github.com/Kanma/MPQExtractor.git && cd MPQExtractor && git submodule init && git submodule update
    mkdir build && cd build && cmake .. && cmake --build .
    cd $PROJECT_ROOT
fi

if [ ! -f "$BLPConverter" ]; then
    git clone https://github.com/Kanma/BLPConverter.git && cd BLPConverter
    mkdir build && cd build && cmake -DCMAKE_CXX_STANDARD=14 .. && make
    cd $PROJECT_ROOT
fi

echo "extracting blps from mpqs"

# extracts the .trs file to build the texture->maptile mapping
$MPQExtractor \
    -e "Textures\Minimap\*" -f -c -p \
    $WOW_DATA_DIR/common.MPQ,base \
    $WOW_DATA_DIR/expansion.MPQ,base \
    $WOW_DATA_DIR/lichking.MPQ \
    $WOW_DATA_DIR/patch.MPQ,base \
    $WOW_DATA_DIR/patch-2.MPQ,base \
    $WOW_DATA_DIR/patch-3.MPQ,base \
    -o $PROJECT_ROOT/tmp $WOW_DATA_DIR/common-2.MPQ

if [ ! -f "$PROJECT_ROOT/tmp/textures/minimap/md5translate.trs" ]; then
    echo "md5translate.trs failed to extract! can not continue without it."
    exit 1
fi

echo "converting pngs"

for blp in $PROJECT_ROOT/tmp/textures/minimap/*.blp; do
    if [ ! -f "$PROJECT_ROOT/tmp/$(basename "$blp" .blp).png" ]; then
        $BLPConverter -o "$PROJECT_ROOT/tmp" -f png "$blp"
    fi
done

if [ "$NO_INSTANCES" = "--no-instances" ]; then
    node "$CUR_PATH/rename_png_with_md5translate.js" "$PROJECT_ROOT/tmp" "$PROJECT_ROOT/tmp/textures/minimap/md5translate.trs" "$OUTPUT_DIR" --no-instances
else
    node "$CUR_PATH/rename_png_with_md5translate.js" "$PROJECT_ROOT/tmp" "$PROJECT_ROOT/tmp/textures/minimap/md5translate.trs" "$OUTPUT_DIR"
fi

# rm -rf $PROJECT_ROOT/tmp
