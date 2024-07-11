
import { connect } from '@planetscale/database';

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

const connection = connect(config);

const main = async () => {
  const results = await connection.execute('select 1 from dual where 1 = ?', [1]);

  console.log(results);
};

void main();
