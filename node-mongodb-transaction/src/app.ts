import mongoose, { ConnectOptions, Model, Document } from "mongoose";
import { models } from "./models";
import { seedDatabaseWithUsersAndProducts } from "./seed";

const DATABASE_URL = "mongodb://localhost:27021,localhost:27022,localhost:27023/test?replicaSet=dbrs";
const options: ConnectOptions = {
  // autoIndex: true,
  directConnection: true,
// retryWrites: true,
  readPreference: 'secondary',
};

const createCollections = async (models: Model<Document>[]) => {
  await Promise.all(
      models.map((model) => model.createCollection({ retryWrites: true,  readPreference: 'secondary' }))
  );
};

(async () => {
  try {
    await mongoose.connect(DATABASE_URL, options);

    // await createCollections(models);

    await seedDatabaseWithUsersAndProducts();

    console.log("Connected to the database successfully ");
  } catch (e) {
    console.error("Failed to connect to the database!", e);
  }
})();
