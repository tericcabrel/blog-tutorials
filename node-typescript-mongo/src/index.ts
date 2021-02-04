import { connectToDatabase } from './db-connection';

(async () => {
  await connectToDatabase();

  console.log('Connected to the database successfully!');
})();
