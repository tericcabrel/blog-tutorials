import mongoose, {ClientSession} from "mongoose";
import {Order, OrderInput, OrderStatusEnum, PaymentStatusEnum} from "./models/order.model";
import {Product} from "./models/product.model";
import {User} from "./models/user.model";

const userId = '61912208082a0397ff955e51'; // ID of "User Second" in the users collection

const orderInput: OrderInput = {
  amount: 120,
  vat: 0,
  user: new mongoose.Types.ObjectId(userId),
  status: OrderStatusEnum.CREATED,
  reference: Math.random().toString(),
  payment: {
    amount: 120,
    reference: Math.random().toString(),
    status: PaymentStatusEnum.CREATED,
  },
  items: [
    {
      product: '61912208082a0397ff955e53', // ID of "Product One" in the products collection
      priceUnit: 5,
      quantity: 10,
    },
    {
      product: '61912208082a0397ff955e55', // ID of the "Product Two" in the products collection
      priceUnit: 10,
      quantity: 3,
    },
    {
      product: '61912208082a0397ff955e57', // ID of the "Product Two" in the products collection
      priceUnit: 20,
      quantity: 2,
    },
  ]
};



const proceedToPayment = async (paymentInput: OrderInput["payment"]) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ failed: false });
    }, 2000);
  })
};

export const processUserOrderSuccessful = async () => {
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

    console.log("The order has been placed successfully!");
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
