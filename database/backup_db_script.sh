#!/bin/bash

while getopts i:d:p: option
do
    case "${option}"
    in
        i) INTERACTIVE=${OPTARG};;
        p) MYSQL_ROOT_PASSWORD=${OPTARG};;
        d) LOCAL_DB=${OPTARG};;
    esac
done


OUTPUT_FILE_NAME=kanikapilas_backup_$(date +%Y-%m-%d_%H:%M).sql.bz2
OUTPUT_DIRECTORY=archives
STEP_COUNTER=1;
KANIKAPILAS_DATABASE="kanikapilas";

buildOutputFile() {
    if [[ "$LOCAL_DB" == "Y" ]]
    then
        WORKING_DIR=`pwd`
    else
        WORKING_DIR=/home/stepou4/kanikapilas.com/database/backups
    fi
    OUTPUT_DIR=$WORKING_DIR/$OUTPUT_DIRECTORY;
    if [ ! -d $OUTPUT_DIR ]; then
        OUTPUT_DIR=$WORKING_DIR/backups/$OUTPUT_DIRECTORY;
    fi
    if [ ! -d $OUTPUT_DIR ]; then
        echo "The database output directory was not created!"
        exit 1;
    fi
    OUTPUT_FILE=$OUTPUT_DIR/$OUTPUT_FILE_NAME;
}

incStep() {
    ((STEP_COUNTER++))
}

mysqlRootPassword() {
    printf "\nSTEP $STEP_COUNTER: What is your 'MYSQL' root user password?\n";
    echo "* INFO * All SQL statements are executed as the 'MYSQL root' user";
    read -p "Password:" -s MYSQL_ROOT_PASSWORD;
    printf "\n";
    incStep
}

localDevelopment() {
    /opt/local/lib/mysql56/bin/mysqldump --add-drop-table --routines -u root --password=$MYSQL_ROOT_PASSWORD $KANIKAPILAS_DATABASE | /opt/local/bin/bzip2 -c > $OUTPUT_FILE
}

liveServer() {
    /usr/bin/mysqldump --add-drop-table --routines -u 7hiez8ei --password=$MYSQL_ROOT_PASSWORD $KANIKAPILAS_DATABASE -h mysql.kanikapilas.com | /bin/bzip2 -c > $OUTPUT_FILE
}

kanikapilasEnvironment() {
    printf "\nSTEP $STEP_COUNTER: Is this a local 'Kanikapilas' database?\n";
    echo -n "Local DB? (Y\n) [ENTER]: "; 
    read LOCAL_DB;
    incStep
}

validateFileCreated() {
    if [ ! -f $OUTPUT_FILE ]; then
        echo "The database archive file was not created!"
        exit 1;
    fi
}

executeBackup() {
    echo "Backing up: $OUTPUT_FILE_NAME"
    if [[ "$LOCAL_DB" == "Y" ]]
    then
        localDevelopment
    else
        liveServer 
    fi
}

printInstructions() {
    printf "\n***********************************************";
    printf "\n* Kanikapilas Database Backup                 *";
    printf "\n***********************************************";
    printf "\n\n";
    echo "This script will backup the 'Kanikapilas' database.";
    printf "\n";
}

userInput() {
    buildOutputFile;
    if [[ "$INTERACTIVE" != "Y" ]]
    then
        clear;
        printInstructions;
        kanikapilasEnvironment;
        mysqlRootPassword;
    fi
    executeBackup;
    validateFileCreated;
}

userInput;
