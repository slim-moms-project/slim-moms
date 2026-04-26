import { createSelector } from '@reduxjs/toolkit';

export const selectCalculatorResult = createSelector(
  (state) => state.calculator.dailyCalories,
  (state) => state.calculator.notRecommendedProducts,
  (dailyCalories, notRecommendedProducts) => ({
    dailyCalories,
    notRecommendedProducts,
  })
);

export const selectCalculatorIsLoading = (state) => state.calculator.isLoading;
