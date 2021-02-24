import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import path from 'path';

import { handleSingleUploadFile } from '../utils/uploadSingle';
import { User, UserInput } from '../models/user';

export type UploadedFile = {
  fieldname: string; // file
  originalname: string; // myPicture.png
  encoding: string; // 7bit
  mimetype: string; // image/png
  destination: string; // ./public/uploads
  filename: string; // 1571575008566-file.png
  path: string; // public/uploads/1571575008566-file.png
  size: number; // 1255
};

const appRoute = Router();

appRoute.post('/register/user', async (req, res) => {
  let uploadResult;

  try {
    uploadResult = await handleSingleUploadFile(req, res);
  } catch (e) {
    return res.status(422).json({ errors: [e.message] });
  }

  const uploadedFile: UploadedFile = uploadResult.file;
  const { body } = uploadResult;

  const newUserInput: UserInput = {
    name: body.name,
    picture: uploadedFile.filename,
  };

  const createdUser = await User.create(newUserInput);

  return res.json({ data: createdUser });
});

appRoute.get('/user/:id/generate-link', (req, res) => {
  const { id } = req.params;
  const action = req.query.action as string;

  const payload = { userId: id };

  const token = jwt.sign(payload, 'My#SecretKey007', { expiresIn: 1800 });

  const url = `${req.protocol}://${req.hostname}:${process.env.PORT}/view-file?token=${token}&action=${action}`;

  return res.json({ url });
});

appRoute.get('/view-file', async (req, res) => {
  const { action, token } = req.query as { token: string; action: string };

  try {
    const decoded: any = jwt.verify(token, 'My#SecretKey007');

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const filePath = path.resolve(__dirname, '../../public/uploads', user.picture);

    if (action === 'view') {
      return res.sendFile(filePath);
    } else {
      return res.download(filePath);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export { appRoute };
