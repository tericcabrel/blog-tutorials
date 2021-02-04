import mongoose, { ConnectionOptions } from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectionOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };

  await mongoose.connect(`mongodb://blogUser:blogUserPwd@localhost:27017/blog`, options);
};

export { connectToDatabase };
