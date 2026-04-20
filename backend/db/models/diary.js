import { Schema, model } from 'mongoose';

const diarysSchema = new Schema({});

export const DiaryCollection = model('diary', diarysSchema);
