import { Router } from 'express';

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

export { appRoute };
