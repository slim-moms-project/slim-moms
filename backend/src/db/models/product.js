import { Schema, model } from 'mongoose';

// Product modeli oluşturulacak
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      default: 100,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model('Product', productSchema);