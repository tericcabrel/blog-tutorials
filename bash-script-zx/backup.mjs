#!/usr/bin/env zx

$.verbose = false;

// console.log(process.argv)
const [, , , saveDirectory, dbHost, dbPort, dbUser, dbPassword, dbName ] = process.argv;

let mysqlDumpLocation;
const osPlatform = os.platform();

if (osPlatform === "linux") {
    mysqlDumpLocation = "/bin:/usr/bin:/usr/local/bin";
} else if (osPlatform === "darwin") {
    mysqlDumpLocation = "/bin:/usr/bin:/usr/local/mysql/bin";
} else {
    console.log(chalk.red("Only Linux and MacOS are supported!"));
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

    console.log(chalk.green("Database backup performed successfully!"))
} catch (e) {
    console.log(chalk.red("Fail to backup the database!"));
    process.exit(1);
}