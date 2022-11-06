import express from 'express';
import { weeklyReportScheduler } from './scheduler';

const PORT = 4500;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/start-scheduler', async (req, res) => {
  await weeklyReportScheduler.start();

  return res.json({ message: 'OK' });
});

app.post('/stop-scheduler', async (req, res) => {
  await weeklyReportScheduler.stop();

  return res.json({ message: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Application started on URL http://localhost:${PORT} 🎉`);
});
