import mongoose, { Document, Schema, Model } from 'mongoose';

type UserDocument = Document & {
  name: string;
  dateOfBirth: Date;
  location: {
    country: string;
    city: string;
  };
  email: string;
};

type UserInput = {
  name: UserDocument['name'];
  dateOfBirth: UserDocument['dateOfBirth'];
  location: UserDocument['location'];
  email: UserDocument['email'];
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

const User: Model<UserDocument> = mongoose.model('User', userSchema);

export { User, UserDocument, UserInput };
