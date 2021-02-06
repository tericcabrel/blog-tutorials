import mongoose, { Document, Schema, Model } from 'mongoose';

type UserType = {
  name: string;
  dateOfBirth: Date;
  location: {
    country: string;
    city: string;
  };
  email: string;
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
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
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

const User: Model<Document> = mongoose.model('User', userSchema);

export { User, UserType };
