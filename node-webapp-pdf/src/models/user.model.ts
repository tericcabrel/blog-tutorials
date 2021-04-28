import mongoose, { Schema, Document, Model } from 'mongoose';

type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type UserInput = {
  firstName: UserDocument['firstName'];
  lastName: UserDocument['lastName'];
  email: UserDocument['email'];
  phoneNumber: UserDocument['phoneNumber'];
};

const userSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      index: true,
    },
    phoneNumber: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'store_users',
    timestamps: true,
  },
);

const User: Model<UserDocument> = mongoose.model('User', userSchema);

export { User, UserDocument, UserInput };
