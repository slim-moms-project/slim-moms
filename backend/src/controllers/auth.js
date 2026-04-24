import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUser, loginUser, logoutUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const payload = await registerUserSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const user = await registerUser(payload);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data: {
      user,
    },
  });
};

export const loginUserController = async (req, res) => {
  const payload = await loginUserSchema.validateAsync(req.body, {
    abortEarly: false,
  });

  const { user, accessToken, refreshToken } = await loginUser(payload);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: {
      user,
      token: accessToken,
      refreshToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const sessionId = req.session._id;
  await logoutUser(sessionId);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged out',
  });
};

export const getCurrentUserController = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully found user',
    data: {
      user: req.user,
    },
  });
};
