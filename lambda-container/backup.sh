#!/bin/bash

# day_month_year_hour_minute
TODAY=`date +"%d_%m_%Y_%H_%M"`

FILENAME="db_name-${TODAY}.tar"

echo "${FILENAME}.gz"

# Dump only the data and the schema (data definitions).
pg_dump --dbname=postgresql://postgres:secret@2.tcp.eu.ngrok.io:18635/postgres -F t > "/tmp/${FILENAME}"

if [ $? -eq 0 ]; then
  exit 0
else
  exit 1
fi

# compress the SQL dump file
gzip "/tmp/${FILENAME}"