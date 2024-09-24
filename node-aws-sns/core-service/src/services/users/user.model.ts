import mongoose, { Document, Schema } from 'mongoose';

type UserDocument = Document & {
  name: string;
  email: string;
  password: number;
};

type UserInput = {
  name: UserDocument['name'];
  email: UserDocument['email'];
  password: UserDocument['password'];
};

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    default: 0,
  }
}, {
  collection: "users",
  timestamps: true,
});

const User = mongoose.model<UserDocument>('User', userSchema);

export { User, UserDocument, UserInput };