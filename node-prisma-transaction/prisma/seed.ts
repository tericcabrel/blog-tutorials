import { OrderStatus, PaymentStatus, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const loadUsers = async () => {
  const usersInput: Prisma.UserCreateManyInput[] = [
    { name: 'Bob', email: 'bob@email.com', bonusMark: 0 },
    { name: 'Alice', email: 'alice@email.com', bonusMark: 0 },
  ];

  await prisma.user.createMany({
    data: usersInput,
  });
};

const loadPayments = async () => {
  const userId = 1;

  const createdOrder = await prisma.order.create({
    data: {
      amount: 60,
      status: OrderStatus.CREATED,
      reference: 'ord-ref-0001',
      user: {
        connect: {
          id: userId,
        },
      },
    }
  });

  await prisma.payment.create({
    data: {
      id: createdOrder.id,
      amount: createdOrder.amount,
      reference: 'pay-ref-0001',
      status: PaymentStatus.CREATED,
      userId: createdOrder.userId,
      orderId: createdOrder.id,
    },
  });
};

const main = async () => {
  await loadUsers();

  await loadPayments();
};

void main();
