import mongoose, { Document, Schema } from 'mongoose';

type UserDocument = Document & {
  fullName: string;
  email: string;
  password: string;
  birthDate: Date;
};

type UserInput = {
  fullName: UserDocument['fullName'];
  email: UserDocument['email'];
  password: UserDocument['password'];
  birthDate: UserDocument['birthDate'];
};

const userSchema = new Schema({
  fullName: {
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
    required: true,
  },
  birthDate: {
    type: Schema.Types.Date,
    required: true,
  }
}, {
  collection: "users",
  timestamps: true,
});

const User = mongoose.model<UserDocument>('User', userSchema);

export { User, UserDocument, UserInput };