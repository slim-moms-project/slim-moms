import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('This field cannot be empty!')
    .email('Please enter a valid email!'),

  password: yup
    .string()
    .trim()
    .required('This field cannot be empty!')
    .min(6, 'Password must be at least 6 characters!'),
});

export const registerValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('This field cannot be empty!'),

  email: yup
    .string()
    .trim()
    .required('This field cannot be empty!')
    .email('Please enter a valid email!'),

  password: yup
    .string()
    .trim()
    .required('This field cannot be empty!')
    .min(6, 'Password must be at least 6 characters!'),
});
