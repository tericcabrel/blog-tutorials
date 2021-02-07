import { connectToDatabase } from './db-connection';
import { insertUserAndPost } from './queries/insertUserAndPost';
import { retrieveData } from './queries/retrieveData';

(async () => {
  await connectToDatabase();

  console.log('Connected to the database successfully!');

  // await insertUserAndPost();

  await retrieveData();
})();
