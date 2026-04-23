import { ACTIVITY_MULTIPLIERS } from '../constants/index.js';

export const calculateDailyCalories = ({
  age,
  height,
  weight,
  gender,
  activityLevel = 'sedentary',
}) => {
  if (!age || !height || !weight || !gender) {
    const error = new Error(
      'age, height, weight ve gender alanları zorunludur',
    );
    error.status = 400;
    throw error;
  }

  const normalizedGender = String(gender).toLowerCase();
  const normalizedActivityLevel = String(activityLevel).trim();

  if (!['male', 'female'].includes(normalizedGender)) {
    const error = new Error('gender yalnızca "male" veya "female" olabilir');
    error.status = 400;
    throw error;
  }

  if (!ACTIVITY_MULTIPLIERS[normalizedActivityLevel]) {
    const error = new Error(
      'activityLevel yalnızca sedentary, light, moderate, active veya veryActive olabilir',
    );
    error.status = 400;
    throw error;
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