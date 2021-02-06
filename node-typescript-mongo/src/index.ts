import { connectToDatabase } from './db-connection';
import { insertUserAndPost } from './queries/insertUserAndPost';

(async () => {
  await connectToDatabase();

  console.log('Connected to the database successfully!');

  await insertUserAndPost();
})();
