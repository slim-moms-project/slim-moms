import { Schema, model } from 'mongoose';

// Product modeli oluşturulacak
const productsSchema = new Schema({});

export const ProductsCollection = model('products', productsSchema);
