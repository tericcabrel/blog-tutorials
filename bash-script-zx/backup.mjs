#!/usr/bin/env zx

$.verbose = false;

// console.log(process.argv)
const [, , , osPlatform, saveDirectory, dbHost, dbPort, dbUser, dbPassword, dbName ] = process.argv;

let mysqlDumpLocation;

if (osPlatform === "linux") {
    mysqlDumpLocation = "/bin:/usr/bin:/usr/local/bin";
} else if (osPlatform === "macos") {
    mysqlDumpLocation = "/bin:/usr/bin:/usr/local/mysql/bin";
} else {
    console.log("Only Linux and MacOS are supported!");
    process.exit(1);
}

process.env.PATH = [process.env.PATH, mysqlDumpLocation].join(':');

const today = new Intl.DateTimeFormat("en-GB")
    .format(new Date())
    .replace(/\//g, '_');

console.log(`${dbName}-${today}.sql.gz`);

await $`mkdir -p ${saveDirectory}`;

try {
    await $`mysqldump -h ${dbHost} \\
   -P ${dbPort} \\
   -u ${dbUser} \\
   -p${dbPassword} \\
   ${dbName} | gzip > ${saveDirectory}/${dbName}-${today}.sql.gz`;

    console.log("Database backup performed successfully!")
} catch (e) {
    console.log("Fail to backup the database!");
    process.exit(1);
}