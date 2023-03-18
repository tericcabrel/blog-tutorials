import amqplib from 'amqplib';

export const connectToRabbitMQ = async () => {
  return amqplib.connect({
    username: 'admin',
    password: 'MyStrong-P4ssw0rd$',
    port: 5672,
    hostname: 'rabbitmq.tericcabrel.com',
    vhost: '/',
  });
};
