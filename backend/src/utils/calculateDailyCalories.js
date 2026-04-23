import createHttpError from 'http-errors';
import { ACTIVITY_MULTIPLIERS } from '../constants/index.js';

export const calculateDailyCalories = ({
  age,
  height,
  weight,
  gender,
  activityLevel = 'sedentary',
}) => {
  if (!age || !height || !weight || !gender) {
    throw createHttpError(
      400,
      'age, height, weight ve gender alanları zorunludur',
    );
  }

  const normalizedGender = String(gender).toLowerCase();
  const normalizedActivityLevel = String(activityLevel).trim();

  if (!['male', 'female'].includes(normalizedGender)) {
    throw createHttpError(400, 'gender yalnızca "male" veya "female" olabilir');
  }

  if (!ACTIVITY_MULTIPLIERS[normalizedActivityLevel]) {
    throw createHttpError(
      400,
      'activityLevel yalnızca sedentary, light, moderate, active veya veryActive olabilir',
    );
  }

  let bmr;

  if (normalizedGender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const dailyCalories = Math.round(
    bmr * ACTIVITY_MULTIPLIERS[normalizedActivityLevel],
  );

  return {
    bmr: Math.round(bmr),
    dailyCalories,
    activityLevel: normalizedActivityLevel,
  };
};
