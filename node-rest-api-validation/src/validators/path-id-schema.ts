import * as yup from 'yup';
import { isValidObjectId } from 'mongoose';

export const pathIdSchema = yup
  .object({
    id: yup
      .string()
      .required('id must be a valid ObjectId')
      .trim()
      .transform((value) => {
        if (isValidObjectId(value)) {
          return value;
        }

        return '';
      }),
  })
  .required();
