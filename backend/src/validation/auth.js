import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});
