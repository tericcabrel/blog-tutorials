import mongoose, { ConnectOptions, Model, Document } from "mongoose";
import { seedDatabaseWithUsersAndProducts } from "./seed";
import { processUserOrderFail } from "./failure-transaction";
import { models } from "./models";
import {processUserOrderSuccessful} from "./success-transaction";

const DATABASE_URL = "mongodb://localhost:27021,localhost:27022,localhost:27023/test?replicaSet=dbrs";
const options: ConnectOptions = {
  readPreference: 'secondary',
};

const createCollections = async (models: Model<Document>[]) => {
  await Promise.all(
      models.map((model) => model.createCollection())
  );
};

(async () => {
  try {
    await mongoose.connect(DATABASE_URL, options);
    console.log("Connected to the database successfully ");

    await createCollections(models);

    await seedDatabaseWithUsersAndProducts();

    // await processUserOrderFail();

    await processUserOrderSuccessful();

  } catch (e) {
    console.error("Failed to connect to the database!", e);
  }
})();
