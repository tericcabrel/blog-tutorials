import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

const usersData = [
  {
    email: "john.doe@email.com",
    fullName: "John Doe",
    password: "e10adc3949ba59abbe56e057f20f883e",
    birthDate: new Date(1996, 10, 11),
  },
  {
    email: "jane.doe@email.com",
    fullName: "Jane Doe",
    password: "7d793037a0760186574b0282f2f435e7",
    birthDate: new Date(1997, 9, 10),
  },
];

(async () => {
  const databaseConnection = await mongoose.connect(process.env.DATABASE_URL, {
    // and tell the MongoDB driver to not wait more than 5 seconds before erroring out if it isn't connected
    serverSelectionTimeoutMS: 5000
  });

  try {
    await User.create(usersData);
  } catch (e) {
    console.error(e);
  } finally {
    await databaseConnection.disconnect();
  }
})();
