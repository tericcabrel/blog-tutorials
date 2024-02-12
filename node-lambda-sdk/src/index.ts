import { configDotenv } from 'dotenv';
import { LambdaClient, InvokeCommand, InvokeCommandInput } from '@aws-sdk/client-lambda';

configDotenv();

const lambdaClient = new LambdaClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const main = async () => {
  const payload = {
    body: JSON.stringify({
      height: 1.81,
      weight: 88,
    }),
  };

  const input: InvokeCommandInput = {
    FunctionName: 'bmi-calculator',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload),
  };

  try {
    const command = new InvokeCommand(input);
    const response = await lambdaClient.send(command);

    const responseString = response.Payload?.transformToString('utf-8') ?? '{}';

    console.log(JSON.parse(responseString));
  } catch (e) {
    console.error(e);
  }
};

void main();
