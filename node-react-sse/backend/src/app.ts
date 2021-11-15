import express, { Request, Response } from 'express';
import cors from 'cors';

const donation = {
  user: 0,
  amount: 0
};

const app = express();

app.use(express.json());
app.use(cors());

app.post('/donate', (req, res) => {
  const amount = req.body.amount || 0;

  if (amount > 0) {
    donation.amount += amount;
    donation.user += 1;
  }

  return res.json({ message: 'Thank you 🙏'});
});

const SEND_INTERVAL = 2000;

const writeEvent = (res: Response, sseId: string, data: string) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req: Request, res: Response) => {
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });

  const sseId = new Date().toDateString();

  setInterval(() => {
    writeEvent(res, sseId, JSON.stringify(donation));
  }, SEND_INTERVAL);

  writeEvent(res, sseId, JSON.stringify(donation));
};

app.get('/dashboard', (req: Request, res: Response) => {
  if (req.headers.accept === 'text/event-stream') {
    sendEvent(req, res);
  } else {
    res.json({ message: 'Ok' });
  }
});

app.listen(4650, () => {
  console.log(`Application started 🎉`);
});
