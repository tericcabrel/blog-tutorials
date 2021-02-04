import mongoose, { Document, Schema, Model } from 'mongoose';

type UserType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  location: {
    country: string;
    city: string;
  };
  email: string;
  phone: string;
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    location: {
      country: String,
      city: String,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

const User: Model<Document<UserType>> = mongoose.model('User', userSchema);

export { User };
