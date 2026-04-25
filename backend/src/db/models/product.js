import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
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
    groupBloodNotAllowed: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model('Product', productSchema);