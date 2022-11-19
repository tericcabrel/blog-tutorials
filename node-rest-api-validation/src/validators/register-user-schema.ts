import * as yup from 'yup';

enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

const DATE_REGEX = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

export const registerUserSchema = yup
  .object({
    address: yup.string().optional().trim(),
    birthDate: yup.string().matches(DATE_REGEX, 'birthDate must be in the format YYYY-MM-DD'),
    email: yup.string().required().email(),
    fullName: yup.string().trim().min(2).max(50),
    gender: yup.string().oneOf([GenderEnum.MALE, GenderEnum.OTHER, GenderEnum.FEMALE]),
    password: yup.string().matches(PASSWORD_REGEX, 'password must contain only letters and numbers with a minimum of 8 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "confirmPassword doesn't match the password"),
  })
  .required();
