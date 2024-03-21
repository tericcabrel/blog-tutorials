'use strict';

const childProcess= require("child_process");
const path= require("path");

const backupDatabase = () => {
  const scriptFilePath =path.resolve(__dirname, "./backup.sh");

  return new Promise((resolve, reject) => {
    childProcess.execFile(scriptFilePath, (error) => {
      if (error) {
        console.error(error);
        resolve(false);
      }

      resolve(true);
    });
  });
};

module.exports.handler = async (event) => {
  const isBackupSuccessful = await backupDatabase();

  if (isBackupSuccessful) {
    return {
      status: "success",
      message: "Database backup completed successfully!"
    };
  }

  return  {
    status: "failed",
    message: "Failed to backup the database! Check out the logs for more details"
  };
};

