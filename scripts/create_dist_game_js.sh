#! /bin/bash

PATH_STATIC=/home/ljm/acpp/game/static/js/
PATH_STATIC_DIST=${PATH_STATIC}dist/
PATH_STATIC_SRC=${PATH_STATIC}src/

find ${PATH_STATIC_SRC} -type f -name '*.js' | sort | xargs cat > ${PATH_STATIC_DIST}game.js
