import { OrderStatus, PrismaClient, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const userId = 2; // ID of "the second user" in the database table

export const processUserOrder = async () => {
  try {
    await prisma.$transaction(async (transaction) => {
      console.log('Step 1: create the order with order items');

      const createdOrder = await transaction.order.create({
        data: {
          amount: 125,
          status: OrderStatus.CREATED,
          reference: 'ord-ref-0002',
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      console.log('Step 2: create the payment');
      await transaction.payment.create({
        data: {
          id: createdOrder.id,
          amount: createdOrder.amount,
          reference: 'pay-ref-0002',
          status: PaymentStatus.CREATED,
          userId: createdOrder.userId,
          orderId: createdOrder.id,
        },
      });

      console.log('Step 3: Update bonus mark');
      if (createdOrder.amount > 100) {
        await transaction.user.update({
          where: {
            id: createdOrder.userId,
          },
          data: {
            bonusMark: {
              increment: 5,
            },
          },
        });
      }
    });
  } catch (error) {
    console.error('Failed to create the order => ', error);
  }
};

void processUserOrder();
