#!/bin/sh
# Script to compile project files

IFS=''

# GLOBAL VARIABLES #############################################################

## PROJECT SPECIFIC ################## ヽ(•‿•)ノ ##################

declare VC_PACKAGE=DeviantIO

declare VC_BRIEF="Additional functionality for Deviant Art"

## INPUT #########################################################

declare INPUT_FOLDER=../script

declare INPUT=${INPUT_FOLDER}/DeviantIO.js

## OUTPUT ########################################################

declare OUTPUT_DIRECTORY=../script

declare OUTPUT_JSDOC=../docs/JSDoc.md
declare OUTPUT_JSDOCS=../docs/JSDoc

declare OUTPUT=${OUTPUT_DIRECTORY}/DeviantIO.js

## CACHE #########################################################

declare PREAMBLE

declare FILE

## GENERAL #######################################################

declare NO_ERRORS=true

declare DATE=$(date +"%m-%d-%y")
declare TIME=$(date +"%r")

declare FILE_REGEX="\.js"

declare VERSION

## PROMPT ########################################################

declare FG_RED="\033[1;31m"
declare FG_GREEN="\033[1;32m"
declare FG_PINK="\033[1;35m"
declare FG_BLUE="\033[1;36m"
declare FG_WHITE="\033[1;37m"

declare FG_YELLOW="\033[1;33m"
declare NOCOLOR="\033[0m"

declare PROMPT="${FG_BLUE}>>${NOCOLOR}"

# MAIN #########################################################################

main ()
{
    clear

    get_version

    compile_master

    compile_minified

    compile_readme

    compile_jsdoc

    compile_jsdocs

    complete
}

# FUNCTIONS ####################################################################

## COMPILE #######################################################

function compile_master ()
{
    update_master_js_version $INPUT

    echo "${PROMPT} ${FG_PINK}${VC_PACKAGE}.js Compiling Complete \t${FG_BLUE}[${OUTPUT}]${NOCOLOR}\n"

    afplay audio/complete.mp3
}

function compile_minified ()
{
    FILE_MIN=${OUTPUT_DIRECTORY}/${VC_PACKAGE}-min.js

    if command -v uglifyjs
    then
        if $(uglifyjs ${OUTPUT} -o ${FILE_MIN} --compress --mangle reserved=['window']); then
            echo "\n${PROMPT} ${FG_PINK}${VC_PACKAGE} Minified Complete \t\t${FG_BLUE}[${FILE_MIN}]${NOCOLOR}\n"
        else
            NO_ERRORS=false
        fi
    fi

    update_minified_js_preamble $FILE_MIN
}

function compile_readme ()
{
    if [ -e "readme.sh" ]
    then
        $(sh readme.sh)

        echo "${PROMPT} ${FG_PINK}Read Me Complete \t\t\t${FG_BLUE}[../README.md]${NOCOLOR}\n"
    fi
}

function compile_jsdoc ()
{
    if command -v jsdoc2md
    then
        if $(jsdoc2md ${OUTPUT} > $OUTPUT_JSDOC)
            then echo "\n${PROMPT} ${FG_PINK}JSDoc Complete \t\t\t${FG_BLUE}[${OUTPUT_JSDOC}]${NOCOLOR}\n"
        else
            NO_ERRORS=false
        fi
    fi
}

function compile_jsdocs ()
{
    $(rm -r $OUTPUT_JSDOCS)

    if command -v jsdoc
    then
        if (jsdoc --private $OUTPUT -d $OUTPUT_JSDOCS)
            then echo "\n${PROMPT} ${FG_PINK}JSDocs Complete \t\t\t${FG_BLUE}[${OUTPUT_JSDOCS}]${NOCOLOR}\n"
        else
            NO_ERRORS=false
        fi
    fi
}

function compile_preamble ()
{
    PREAMBLE="\/** \\n"
    PREAMBLE+=" * ${VC_PACKAGE} - ${VC_BRIEF} \\n"
    PREAMBLE+=" * Copyright (C) 2023  Justin D. Byrne \\n"
    PREAMBLE+=" * \\n"
    PREAMBLE+=" * This library is free software; you can redistribute it and\/or \\n"
    PREAMBLE+=" * modify it under the terms of the GNU Library General Public \\n"
    PREAMBLE+=" * License as published by the Free Software Foundation; either \\n"
    PREAMBLE+=" * version 2 of the License, or (at your option) any later version. \\n"
    PREAMBLE+=" * \\n"
    PREAMBLE+=" * This library is distributed in the hope that it will be useful, \\n"
    PREAMBLE+=" * but WITHOUT ANY WARRANTY; without even the implied warranty of \\n"
    PREAMBLE+=" * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU \\n"
    PREAMBLE+=" * Library General Public License for more details. \\n"
    PREAMBLE+=" * \\n"
    PREAMBLE+=" * You should have received a copy of the GNU Library General Public \\n"
    PREAMBLE+=" * License along with this library; if not, write to the \\n"
    PREAMBLE+=" * Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, \\n"
    PREAMBLE+=" * Boston, MA  02110-1301, USA. \\n"
    PREAMBLE+=" * \\n"
    PREAMBLE+=" * Byrne-Systems, hereby disclaims all copyright interest in \\n"
    PREAMBLE+=" * the library '${VC_PACKAGE}' (${VC_BRIEF}) written \\n"
    PREAMBLE+=" * by Justin D. Byrne. (justin@byrne-systems.com) \\n"
    PREAMBLE+=" *\/ \\n\\n"
}

## UPDATE ########################################################

function update_master_js_version ()
{
    sed -r -i '' -e 's/@version:.+/@version:        '${VERSION}'/' ${1}
}

function update_minified_js_preamble ()
{
    compile_preamble

    sed -r -i '' -e 's/"use strict"/'${PREAMBLE}'"use strict"/' ${1}
}

## GENERAL #######################################################

function get_version ()
{
    VERSION=`head -n4 ../docs/CHANGELOG.md | awk '/## \[/{print $2}'`

    LENGTH=${#VERSION}

    LENGTH=$(($LENGTH-2))

    VERSION=${VERSION:1:$LENGTH}
}

function insert_file ()
{
    echo " " | cat - $1 >> $OUTPUT
}

function flash_screen ()
{
    printf '\e[?5h'  # Turn on reverse video

    sleep 0.15

    printf '\e[?5l'  # Turn on normal video
}

## COMPLETE ######################################################

function complete()
{
    echo "${FG_YELLOW}ᕕ( ᐛ )ᕗ${NOCOLOR}\t\t\t\t\t${PROMPT} Complete - ${FG_WHITE}${DATE} ${NOCOLOR}@ ${FG_WHITE}${TIME}${NOCOLOR}\n"

    if $NO_ERRORS
    then
        afplay audio/success.mp3
    else
        afplay audio/failure.mp3

        flash_screen
    fi
}

main
