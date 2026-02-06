
import { Dish, DayPlan, UserProfile } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const filterDishes = (user: UserProfile) => {
  let pool = (user.isApproved || user.isAdmin) ? RecipeService.getAllDishes() : RecipeService.getAccessibleDishes(user);
  pool = pool.filter(d => !user.blacklistedDishIds?.includes(d.id));
  if (user.excludedCategories?.length) pool = pool.filter(d => !user.excludedCategories.includes(d.category));
  if (user.onlyFavoritesMode) pool = pool.filter(d => user.favoriteDishIds?.includes(d.id));
  if (user.quickMealsMode) pool = pool.filter(d => (d.cookTime || 60) <= 45);
  return pool;
};

export const generateDailyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const pool = filterDishes(user);
  const selected = shuffleArray(pool).slice(0, 3);
  const plan = selected.map((dish, idx) => ({ dayName: idx === 0 ? 'پیشنهاد اصلی' : `جایگزین ${idx}`, dish }));
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};

export const generateWeeklyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const pool = filterDishes(user);
  const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const shuffled = shuffleArray(pool);
  const plan = days.map((day, idx) => ({ dayName: day, dish: shuffled[idx % shuffled.length] }));
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};

export const generateMonthlyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const pool = filterDishes(user);
  const shuffled = shuffleArray(pool);
  const plan: DayPlan[] = [];
  for (let i = 1; i <= 31; i++) {
    plan.push({ dayName: `روز ${i}`, dish: shuffled[i % shuffled.length] });
  }
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};
