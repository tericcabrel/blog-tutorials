import mongoose, { Document, Schema, Model } from 'mongoose';

type UserDocument = Document & {
  name: string;
  picture: string;
};

type UserInput = {
  name: UserDocument['name'];
  picture: UserDocument['picture'];
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'col_users',
  },
);

const User: Model<UserDocument> = mongoose.model('User', userSchema);

export { User, UserDocument, UserInput };
