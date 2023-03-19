import { connectToRabbitMQ } from './rabbitmq-connection';

(async () => {
  const EXCHANGE_NAME = 'users';

  const rabbitConnection = await connectToRabbitMQ();

  console.log('Successfully connected to RabbitMQ server!');

  const channel = await rabbitConnection.createChannel();

  const assertQueueResult = await channel.assertQueue('', { exclusive: true });

  await channel.bindQueue(assertQueueResult.queue, EXCHANGE_NAME, '');

  await channel.consume(
    assertQueueResult.queue,
    async (message) => {
      if (!message) {
        console.error('Consumer cancelled by server!');
        return;
      }

      const data = JSON.parse(message.content.toString());

      console.table(data);

      // TODO compute new analytics using the data

      console.log('Compute done successfully!');
    },
    { noAck: true },
  );
})();
