import { connectToDatabase } from './db-connection';
import { insertUserAndPost } from './queries/insertUserAndPost';
import { retrieveData } from './queries/retrieveData';
import { updateData } from './queries/updateData';
import { deleteData } from './queries/deleteData';

(async () => {
  await connectToDatabase();

  console.log('Connected to the database successfully!');

  await insertUserAndPost();

  await retrieveData();

  await updateData();

  await deleteData();
})();
