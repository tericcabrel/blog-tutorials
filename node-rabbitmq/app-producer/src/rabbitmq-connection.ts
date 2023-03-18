import amqplib from 'amqplib';

export const connectToRabbitMQ = async () => {
  return amqplib.connect('amqp://admin:MyStrong-P4ssw0rd$@rabbitmq.tericcabrel.com');
};
