#!/bin/bash

if [ $1 == "linux" ]; then
  export PATH=/bin:/usr/bin:/usr/local/bin
elif [ $1 == "macos" ]; then
  export PATH=/bin:/usr/bin:/usr/local/mysql/bin
else
  echo "Only linux and MacOS are supported!"
  exit 1
fi

TODAY=`date +"%d_%m_%Y"`
 
DB_BACKUP_PATH=$2
MYSQL_HOST=$3
MYSQL_PORT=$4
MYSQL_USER=$5
MYSQL_PASSWORD=$6
DATABASE_NAME=$7

echo "${DATABASE_NAME}-${TODAY}.sql.gz"
 
mkdir -p ${DB_BACKUP_PATH}
# echo "Backup started for database - ${DATABASE_NAME}"
 
mysqldump -h ${MYSQL_HOST} \
   -P ${MYSQL_PORT} \
   -u ${MYSQL_USER} \
   -p${MYSQL_PASSWORD} \
   ${DATABASE_NAME} | gzip > ${DB_BACKUP_PATH}/${DATABASE_NAME}-${TODAY}.sql.gz

if [ $? -eq 0 ]; then
  echo "SUCCESS"
else
  echo "ERROR"
  exit 1
fi
