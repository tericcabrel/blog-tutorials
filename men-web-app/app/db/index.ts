import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const dbConnection = async (): Promise<void> => {
  const dbHost: string = process.env.DB_HOST || '';
  const dbPort: string = process.env.DB_PORT || '';
  const dbName: string = process.env.DB_NAME || '';
  const dbUser: string = process.env.DB_USER || '';
  const dbPassword: string = process.env.DB_PASSWORD || '';

  const options = { useNewUrlParser: true , useFindAndModify: false, useCreateIndex: true };
  try {
    await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, options);
    console.log('Connected successfully to the database!');
  } catch (err) {
    console.error(err.stack);
  }
};

export default dbConnection;
