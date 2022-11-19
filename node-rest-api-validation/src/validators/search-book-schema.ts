import * as yup from 'yup';

export const searchBookSchema = yup
  .object({
    keyword: yup.string().required(),
    publishYear: yup.number().min(2000).max(new Date().getFullYear()).optional(),
    minPrice: yup.number().min(5).optional(),
    maxPrice: yup
      .number()
      .optional()
      .when('minPrice', {
        is: (minPrice) => !!minPrice,
        then: yup.number().min(yup.ref('minPrice')),
        otherwise: yup.number().min(5),
      }),
  })
  .required();
