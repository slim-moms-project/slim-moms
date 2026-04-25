import createHttpError from 'http-errors';

export const calculateDailyCalories = ({
  height,
  age,
  currentWeight,
  desiredWeight,
}) => {
  if (!height || !age || !currentWeight || !desiredWeight) {
    throw createHttpError(
      400,
      'height, age, currentWeight ve desiredWeight alanları zorunludur',
    );
  }

  const dailyCalories =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  return Math.round(dailyCalories);
};