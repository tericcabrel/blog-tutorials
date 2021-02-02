import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  const options = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };

  await mongoose.connect(`mongodb://blogUser:blogUserPwd@$localhost:$27017/blog`, options);
};

export { connectToDatabase };
