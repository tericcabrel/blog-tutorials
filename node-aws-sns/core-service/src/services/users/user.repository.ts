import { User } from "./user.model";

export const findUser = async (id: string) => {
  return User.findOne({ _id: id });
}