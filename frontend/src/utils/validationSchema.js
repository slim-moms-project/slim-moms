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
const numberField = (label, min, max) =>
  yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError(`${label} must be a number`)
    .min(min, `Min ${min}`)
    .max(max, `Max ${max}`)
    .required(`${label} is required`);

export const calculatorValidationSchema = yup.object({
  height: numberField('Height', 100, 250),
  age: numberField('Age', 18, 100),
  currentWeight: numberField('Current weight', 20, 500),
  desiredWeight: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .typeError('Desired weight must be a number')
    .min(20, 'Min 20 kg')
    .max(500, 'Max 500 kg')
    .required('Desired weight is required')
    .test(
      'valid-weight-difference',
      'Desired weight must be realistic and different from current weight',
      function (value) {
        const { currentWeight } = this.parent;
        if (!value || !currentWeight) return true;
        const diff = Math.abs(value - currentWeight);
        return diff > 0 && diff <= 100;
      }
    ),
  bloodType: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? undefined : Number(originalValue))
    .oneOf([1, 2, 3, 4], 'Select a blood type')
    .required('Blood type is required'),
});
