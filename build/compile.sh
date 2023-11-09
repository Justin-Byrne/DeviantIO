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

declare HEADER

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
    update_master_js_file $INPUT

    echo "${PROMPT} ${FG_PINK}${VC_PACKAGE}.js Compiling Complete \t${FG_BLUE}[${OUTPUT}]${NOCOLOR}\n"

    afplay audio/complete.mp3
}

function compile_minified ()
{
    FILE_MIN=${OUTPUT_DIRECTORY}/${VC_PACKAGE}-min.js

    if command -v uglifyjs
    then
        if $(uglifyjs ${OUTPUT} -o ${FILE_MIN} --compress --mangle); then
            echo "\n${PROMPT} ${FG_PINK}${VC_PACKAGE} Minified Complete \t\t${FG_BLUE}[${FILE_MIN}]${NOCOLOR}\n"
        else
            NO_ERRORS=false
        fi
    fi

    update_minified_js_file $FILE_MIN
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
            then echo "\n${PROMPT} ${FG_PINK}API Complete \t\t\t${FG_BLUE}[${OUTPUT_JSDOC}]${NOCOLOR}\n"
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
            then echo "\n${PROMPT} ${FG_PINK}JSDoc Complete \t\t\t${FG_BLUE}[${OUTPUT_JSDOCS}]${NOCOLOR}\n"
        else
            NO_ERRORS=false
        fi
    fi
}

## UPDATE ########################################################

function update_master_js_file ()
{
    sed -r -i '' -e 's/@version:.+/@version:        '${VERSION}'/' ${1}
}

function update_minified_js_file ()
{
    HEADER="\/** @program: \t\t${VC_PACKAGE} \\n"
    HEADER+=" * @brief: \t\t\t${VC_BRIEF} \\n"
    HEADER+=" * @author: \t\tJustin D. Byrne \\n"
    HEADER+=" * @email: \t\t\tjustin@byrne-systems.com \\n"
    HEADER+=" * @version: \t\t${VERSION} \\n"
    HEADER+=" * @license: \t\tGPL-2.0\\n"
    HEADER+=" *\/\\n\\n"

    sed -r -i '' -e 's/"use strict"/'${HEADER}'"use strict"/' ${1}
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
