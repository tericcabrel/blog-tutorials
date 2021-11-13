import mongoose, { ConnectOptions } from "mongoose";

const DATABASE_URL = "mongodb://localhost:27021,localhost:27022,localhost:27023/test?replicaSet=dbrs";
const options: ConnectOptions = {
  autoIndex: true,
  directConnection: true,
};

(async () => {
  try {
    await mongoose.connect(DATABASE_URL, options);

    console.log("Connected to the database successfully ");
  } catch (e) {
    console.error("Failed to connect to the database!", e);
  }
})();
