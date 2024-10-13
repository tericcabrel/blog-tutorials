import mongoose, { ClientSession } from "mongoose";
import { User } from "./models/user.model";
import { Product } from "./models/product.model";

type TransactionCallback = (session: ClientSession) => Promise<void>;

export const runInTransaction = async (callback: TransactionCallback) => {
  const session: ClientSession = await mongoose.startSession();

  session.startTransaction();

  try {
    await callback(session);

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
    await session.endSession();
  }
};

runInTransaction(async (session) => {
  await Product.findOneAndUpdate({ _id: '61912208082a0397ff955e53' }, { $inc: { inStock: -5 } }, { session });

  await User.findOneAndUpdate({ _id: '61912208082a0397ff955e51' }, { $inc: { bonusMark: 5 } }, { session });
});