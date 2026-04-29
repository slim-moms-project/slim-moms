import { Schema, model } from 'mongoose';

const diarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User ID is required!'],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    productName: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'The Date field is required!'],
    },
    amount: {
      type: Number,
      required: [true, 'The Amount field is required!'],
    },
    calories: {
      type: Number,
      required: [true, 'The Calories field is required!'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const DiaryCollection = model('diary', diarySchema);
