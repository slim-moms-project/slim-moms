import Joi from 'joi';

export const addDiarySchema = Joi.object({
  productId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'any.required': 'Product ID is required.',
      'string.empty': 'Product ID cannot be empty.',
      'string.pattern.base': 'Product ID must be a valid Mongo ObjectId.',
    }),
  date: Joi.date().required().messages({
    'any.required': 'Date is required.',
    'date.base': 'Date must be a valid date format (e.g., YYYY-MM-DD).',
  }),
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      'any.required': 'Amount is required.',
      'number.positive': 'Amount must be greater than 0.',
    }),
  calories: Joi.number().positive().required().messages({
    'any.required': 'Calories is required.',
    'number.positive': 'Calories must be greater than 0.',
  }),
});
