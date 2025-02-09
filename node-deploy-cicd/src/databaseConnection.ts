import mongoose, { ConnectOptions } from 'mongoose';

mongoose.Promise = global.Promise;

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectOptions = { autoIndex: true };

  await mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, options);
};

export { connectToDatabase };
