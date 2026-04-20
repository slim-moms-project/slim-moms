import { Schema, model } from 'mongoose';

// Kullanıcı oturumlarını yönetmek için Session modeli
const sessionsSchema = new Schema({});

export const SessionsCollection = model('sessions', sessionsSchema);
