// Yardımcı olması açısından import kısımlarını ekledim
// Yorum satırlarını kaldırıp kullanabilirsiniz

// import bcrypt from 'bcrypt';
// import createHttpError from 'http-errors';
// import jwt from 'jsonwebtoken';

// import { UsersCollection } from '../db/models/user.js';
// import { SessionsCollection } from '../db/models/session.js';

// import { env } from '../utils/env.js';

// Kullanıcı kaydı için servis fonksiyonu
export const registerUser = async (payload) => {};

// Kullanıcı girişi için servis fonksiyonu
export const loginUser = async (payload) => {};

// Kullanıcı çıkışı için servis fonksiyonu
export const logoutUser = async (sessionId) => {};

// Kullanıcı oturumunu yenile (refresh token rotasyonu)
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {};
