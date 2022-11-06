import cron from 'node-cron';

cron.schedule('* * * * *', () => {
  const date = new Date();

  console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);
});
