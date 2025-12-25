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

export const generateDailyPlan = async (user: UserProfile, isQuickMode: boolean = false): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const allDishes = RecipeService.getAllDishes();
  const pool = allDishes.filter(d => !user.blacklistedDishIds?.includes(d.id));
  const selected = shuffleArray(pool).slice(0, 3);

  const plan: DayPlan[] = selected.map((dish, index) => ({
    dayName: index === 0 ? 'پیشنهاد اصلی' : `جایگزین ${index}`,
    dish: dish
  }));

  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: [] });
  return { plan, updatedUser };
};

export const generateWeeklyPlan = async (user: UserProfile, isQuickMode: boolean = false): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const allDishes = RecipeService.getAllDishes();
  const basePool = allDishes.filter(d => !user.blacklistedDishIds?.includes(d.id));
  
  const plan: DayPlan[] = [];
  const dayConfigs = [
    { day: 'شنبه', cats: ['stew', 'khorak'] },
    { day: 'یک‌شنبه', cats: ['polo'] },
    { day: 'دوشنبه', cats: ['khorak', 'ash'] },
    { day: 'سه‌شنبه', cats: ['stew', 'kabab'] },
    { day: 'چهارشنبه', cats: ['international', 'polo'] },
    { day: 'پنج‌شنبه', cats: ['fastfood', 'khorak'] },
    { day: 'جمعه', cats: ['kabab', 'khorak'] }
  ];

  const usedIds = new Set<string>();

  for (const config of dayConfigs) {
    let pool = basePool.filter(d => config.cats.includes(d.category) && !usedIds.has(d.id));
    if (pool.length === 0) pool = basePool.filter(d => !usedIds.has(d.id));
    
    const selected = shuffleArray(pool)[0];
    if (selected) {
      plan.push({ dayName: config.day, dish: selected });
      usedIds.add(selected.id);
    }
  }

  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};