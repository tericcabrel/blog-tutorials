import mongoose, { Document, Model, Schema } from 'mongoose';

type UserDocument = Document & {
  name: string;
  email: string;
  bonusMark: number;
};

type UserInput = {
  name: UserDocument['name'];
  email: UserDocument['email'];
  bonusMark: UserDocument['bonusMark'];
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
  bonusMark: {
    type: Schema.Types.Number,
    default: 0,
  }
}, {
  collection: "users",
  timestamps: true,
});

const User: Model<UserDocument> = mongoose.model('User', userSchema);

export { User, UserDocument, UserInput };