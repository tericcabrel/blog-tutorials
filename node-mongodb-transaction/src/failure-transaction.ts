import mongoose, { ClientSession } from "mongoose";
import { Order, OrderInput, OrderStatusEnum, PaymentStatusEnum } from "./models/order.model";
import { Product } from "./models/product.model";
import { User } from "./models/user.model";

const userId = '619052e09f31f6bcc5cf0234'; // ID of "User First" in the users collection

const orderInput: OrderInput = {
  amount: 50,
  vat: 20,
  user: new mongoose.Types.ObjectId(userId),
  status: OrderStatusEnum.CREATED,
  reference: Math.random().toString(),
  payment: {
    amount: 50,
    reference: Math.random().toString(),
    status: PaymentStatusEnum.CREATED,
  },
  items: [
    {
      product: '61903d0c3e658edce54265b6', // ID of "Product One" in the products collection
      priceUnit: 5,
      quantity: 4,
    },
    {
      product: '61903cdabe8df95babed6698', // ID of the "Product Two" in the products collection
      priceUnit: 10,
      quantity: 3,
    },
  ]
};

const proceedToPayment = async (paymentInput: OrderInput["payment"]) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Payment failed for unknown reason');
    }, 2000);
  })
};

export const processUserOrderFail = async () => {
  const session: ClientSession = await mongoose.startSession();

  session.startTransaction();

  try {
    // Step 1: create the order
    const [createdOrder] = await Order.create([orderInput], { session });

    // Step 2: process the payment
    const paymentResult: any = await proceedToPayment(orderInput.payment);

    if (paymentResult.failed) {
      // Step 3: update the payment status
      await Order.updateOne({ reference: createdOrder.reference }, { 'payment.status': PaymentStatusEnum.FAILED }, { session });
    } else {
      // Step 3: update the payment status
      await Order.updateOne({ reference: createdOrder.reference }, { 'payment.status': PaymentStatusEnum.SUCCEEDED }, { session });

      // Step 4: Update the product quantity in stock
      await Promise.all(orderInput.items.map((item) => {
        Product.findOneAndUpdate({ _id: item.product }, { $inc: { inStock: item.quantity * -1 } }, { new: true, session });
      }));

      // Step 5: Update bonus mark
      if (orderInput.payment.amount > 100) {
        await User.findOneAndUpdate({ _id: orderInput.user }, { $inc: { bonusMark: 5 } }, { new: true, session });
      }
    }

    // Commit the changes
    await session.commitTransaction();
  } catch (error) {
    // Rollback any changes made in the database
    await session.abortTransaction();

    // logging the error
    console.error(error);

    // Rethrow the error
    throw error;
  } finally {
    // Ending the session
    session.endSession();
  }
};
