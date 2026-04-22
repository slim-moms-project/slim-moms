import { ACTIVITY_MULTIPLIERS } from '../constants';
export const calculateDailyCalories = ({
  age,
  height,
  weight,
  gender,
  activityLevel = 'sedentary',
}) => {
  if (!age || !height || !weight || !gender) {
    throw new Error('age, height, weight ve gender alanları zorunludur');
  }
  const normalizedGender = gender.toLowerCase();
  if (!['male', 'female'].includes(normalizedGender)) {
    throw new Error('gender yalnızca "male" veya "female" olabilir ');
  }
  const activityMultiplier =
    ACTIVITY_MULTIPLIERS[activityLevel] || ACTIVITY_MULTIPLIERS.sedentary;
  let bmr = 0;
  if (normalizedGender == 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  }
  if (normalizedGender === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const dailyCalories = Math.round(bmr * activityMultiplier);
  return {
    bmr: Math.round(bmr),
    dailyCalories,
    activityLevel,
  };
};
