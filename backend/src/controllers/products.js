import { Product } from '../db/models/product.js';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  MAX_PER_PAGE,
  SORT_ORDER,
} from '../constants/index.js';
import { calculateDailyCalories } from '../utils/calculateDailyCalories.js';

export const getProductsController = async (req, res, next) => {
  try {
    const page = Number(req.qurey.page) || DEFAULT_PAGE;
    const perPage = Math.min(
      Number(req.query.perPage) || DEFAULT_PER_PAGE,
      MAX_PER_PAGE,
    );
    const sortBy = req.query.sortBy || 'tityle';
    const sortOrder =
      req.query.sortOrder === SORT_ORDER.DESC
        ? SORT_ORDER.DESC
        : SORT_ORDER.ASC;
    const category = req.query.category?.trim();
    const minCalories = req.query.minCalories
      ? Number(req.query.minCalories)
      : undefined;
    const maxCalories = req.query.maxCalories
      ? Number(req.query.maxCalories)
      : undefined;
    const filter = {};
    if (category) {
      filter.category = new RegExp(category, 'i');
    }
    if (minCalories !== undefined || maxCalories !== undefined) {
      filter.calories = {};
      if (minCalories !== undefined) filter.calories.$gte = minCalories;
      if (maxCalories !== undefined) filter.calories.$lte = maxCalories;
    }
    const skip = (page - 1) * perPage;
    const [products, totalItems] = await Promise.all([
      Product.find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(perPage),
      Product.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(totalItems / perPage);
    res.status(200).json({
      status: 200,
      message: 'Products fetched successfully',
      data: {
        data: products,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const searchProductsController = async (req, res, next) => {
  try {
    const q = req.query.q?.trim();
    if (!q) {
      return res.status(400).json({
        status: 400,
        message: 'Search query "q" is required ',
      });
    }
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const perPage = Math.min(
      Number(req.query.perPage) || DEFAULT_PER_PAGE,
      MAX_PER_PAGE,
    );
    const skip = (page - 1) * perPage;
    const filter = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { category: { regex: q, $options: 'i' } },
      ],
    };
    const [products, totalItems] = await Promise.all([
      (await Product.find(filter).skip(skip).limit(perPage)).toSorted({
        title: 1,
      }),
      Product.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(totalItems / perPage);
    res.status(200).json({
      status: 200,
      message: 'Search Completed successfully',
      data: {
        data: products,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const calculateDailyCaloriesController = async (req, res, next) => {
  try {
    const { age, height, weight, gender, activityLevel } = req.body;
    const result = calculateDailyCalories({
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      gender,
      activityLevel,
    });
    res.status(200).json({
      status: 200,
      message: 'Daily calories calculated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
