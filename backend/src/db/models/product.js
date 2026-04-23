import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
      index: true,
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
productSchema.index({ title: 'text', category: 'text' });
export const Product = model('Product', productSchema);
