#!/usr/bin/env zx

$.verbose = false;

const saveDirectory = await question("Path to save the file? [current directory]: ");
const dbHost = await question("Database host? [localhost]: ");
const dbPort = await question("Database port? [3306]: ");
const dbUser = await question("Database username? ");
const dbPassword = await question("Database password? ");
const dbName = await question("Database name? ");

const finalSaveDirectory = saveDirectory || "./";

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

await $`mkdir -p ${finalSaveDirectory}`;

try {
    await $`mysqldump -h ${dbHost || "localhost"} \\
   -P ${dbPort || 3306} \\
   -u ${dbUser} \\
   -p${dbPassword} \\
   ${dbName} | gzip > ${finalSaveDirectory}/${dbName}-${today}.sql.gz`;

    console.log(chalk.green("Database backup performed successfully!"))
} catch (p) {
    console.log(chalk.red(p.stderr));
    console.log(chalk.red("Fail to backup the database!"));
    process.exit(1);
}