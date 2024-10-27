import mongoose, { ConnectOptions } from 'mongoose';

mongoose.Promise = global.Promise;

const { MONGODB_URL } = process.env;

const connectToDatabase = async (): Promise<void> => {
  if (!MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined');
  }

  const options: ConnectOptions = { autoIndex: true };

  await mongoose.connect(MONGODB_URL, options);
};

export { connectToDatabase };
