import express from 'express';
//import { ctrlWrapper } from '../utils/ctrlWrapper.js';
//import { searchProductsController } from '../controllers/products.js';
import {
  getProductsController,
  searchProductsController,
  calculateDailyCaloriesController,
} from '../controllers/products.js';

const router = express.Router();
router.get('/', getProductsController);
(router.get('/search', searchProductsController),
  router.get('/calculate-daily-calories', calculateDailyCaloriesController));
export default router;
