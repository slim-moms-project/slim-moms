import Joi from 'joi';

export const addDiarySchema = Joi.object({
  productId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      'string.empty': 'Product ID cannot be empty.',
      'string.pattern.base': 'Product ID must be a valid Mongo ObjectId.',
    }),
  productName: Joi.string().trim().min(1).optional().messages({
    'string.empty': 'Product name cannot be empty.',
    'string.min': 'Product name cannot be empty.',
  }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'any.required': 'Date is required.',
      'string.empty': 'Date cannot be empty.',
      'string.pattern.base': 'Date must be in YYYY-MM-DD format.',
    }),
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      'any.required': 'Amount is required.',
      'number.positive': 'Amount must be greater than 0.',
    }),
  calories: Joi.number().min(0).required().messages({
    'any.required': 'Calories is required.',
    'number.min': 'Calories cannot be negative.',
  }),
}).or('productId', 'productName');
