import { Product } from '../db/models/product.js';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  MAX_PER_PAGE,
  SORT_ORDER,
} from '../constants/index.js';
import { calculateDailyCalories } from '../utils/calculateDailyCalories.js';

const parsePositiveNumber = (value, fallback) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
};

export const getProductsController = async (req, res, next) => {
  try {
    const page = parsePositiveNumber(req.query.page, DEFAULT_PAGE);
    const perPage = Math.min(
      parsePositiveNumber(req.query.perPage, DEFAULT_PER_PAGE),
      MAX_PER_PAGE,
    );

    const allowedSortFields = ['title', 'category', 'calories', 'createdAt'];
    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : 'title';

    const sortOrder =
      req.query.sortOrder === SORT_ORDER.DESC ? SORT_ORDER.DESC : SORT_ORDER.ASC;

    const category = req.query.category?.trim();
    const minCalories =
      req.query.minCalories !== undefined
        ? Number(req.query.minCalories)
        : undefined;
    const maxCalories =
      req.query.maxCalories !== undefined
        ? Number(req.query.maxCalories)
        : undefined;

    const filter = {};

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (
      Number.isFinite(minCalories) ||
      Number.isFinite(maxCalories)
    ) {
      filter.calories = {};

      if (Number.isFinite(minCalories)) {
        filter.calories.$gte = minCalories;
      }

      if (Number.isFinite(maxCalories)) {
        filter.calories.$lte = maxCalories;
      }
    }

    const skip = (page - 1) * perPage;

    const [products, totalItems] = await Promise.all([
      Product.find(filter)
        .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 })
        .skip(skip)
        .limit(perPage),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / perPage) || 1;

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
        message: 'Search query "q" is required',
      });
    }

    const page = parsePositiveNumber(req.query.page, DEFAULT_PAGE);
    const perPage = Math.min(
      parsePositiveNumber(req.query.perPage, DEFAULT_PER_PAGE),
      MAX_PER_PAGE,
    );

    const skip = (page - 1) * perPage;

    const filter = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
      ],
    };

    const [products, totalItems] = await Promise.all([
      Product.find(filter).sort({ title: 1 }).skip(skip).limit(perPage),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / perPage) || 1;

    res.status(200).json({
      status: 200,
      message: 'Search completed successfully',
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
    if (error.status === 400) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    next(error);
  }
};