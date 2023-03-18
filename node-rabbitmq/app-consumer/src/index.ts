import { connectToRabbitMQ } from './rabbitmq-connection';

(async () => {
  const QUEUE_NAME = 'user-registration';

  const rabbitConnection = await connectToRabbitMQ();

  console.log('Successfully connected to RabbitMQ server!');

  const channel = await rabbitConnection.createChannel();

  await channel.assertQueue(QUEUE_NAME);

  await channel.consume(QUEUE_NAME, async (message) => {
    if (!message) {
      console.error('Consumer cancelled by server!');
      return;
    }

    const data = JSON.parse(message.content.toString());

    console.table(data);

    // TODO send an email using the data

    channel.ack(message);
  });
})();
