import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User, UserInput } from '../models/user.model';
import { generateJwtToken, TokenPayload } from '../helpers/jwt';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRE = parseInt(process.env.JWT_EXPIRE || '3600', 10);

export const registerUser = async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password) {
    return res.status(422).json({ message: 'The fields email, fullName and password are required' });
  }

  const userInput: UserInput = {
    fullName,
    email,
    password: bcrypt.hashSync(password, 10),
  };

  const userCreated = await User.create(userInput);

  return res.status(201).json({ data: userCreated });
};

export const authenticateUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  const isMatch: boolean = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  const tokenInfo: TokenPayload = {
    id: user.id,
  };
  const token = generateJwtToken(tokenInfo, JWT_SECRET, JWT_EXPIRE);

  return res.json({ token, expiresIn: JWT_EXPIRE });
};
