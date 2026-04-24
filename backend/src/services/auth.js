import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

import { env } from '../utils/env.js';

// Kullanıcı kaydı için servis fonksiyonu
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// Kullanıcı girişi için servis fonksiyonu
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const accessToken = jwt.sign({ userId: user._id }, env('JWT_SECRET'), {
    expiresIn: env('JWT_EXPIRES_IN', '7d'),
  });

  const refreshToken = jwt.sign({ userId: user._id }, env('JWT_SECRET'), {
    expiresIn: '30d',
  });

  await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return { user, accessToken, refreshToken };
};

// Kullanıcı çıkışı için servis fonksiyonu
export const logoutUser = async (sessionId) => {
  await SessionsCollection.findByIdAndDelete(sessionId);
};

// Kullanıcı oturumunu yenile (refresh token rotasyonu)
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {};
