import { Response } from 'express';
import { CustomRequest } from '../config/auth.middleware';
import { User } from '../models/user.model';

export const getAllUsers = async (req: CustomRequest, res: Response) => {
  const users = await User.find().sort('-createdAt').exec();

  return res.status(200).json({ data: users });
};

export const getAuthenticatedUser = async (req: CustomRequest, res: Response) => {
  const { id } = req.user;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` });
  }

  return res.status(200).json({ data: user });
};
