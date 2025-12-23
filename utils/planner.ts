
import { Dish, DayPlan, UserProfile, DAYS_OF_WEEK } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { estimateCalories, estimateCookTime, getDishNature } from './recipeHelpers';

const normalize = (str: string) => {
  if (!str) return '';
  return str.replace(/[آأإ]/g, 'ا').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200C\s]+/g, '').trim().toLowerCase();
};

const getAllowedDishes = (user: UserProfile, isQuickMode: boolean): Dish[] => {
  const allDishes = RecipeService.getAllDishes();
  const dislikedIngredients = (user.dislikedIngredients || []).map(i => normalize(i));

  return allDishes.filter(dish => {
    if ((user.blacklistedDishIds || []).includes(dish.id)) return false;

    const dishContent = normalize(dish.name + dish.description);
    const ingredientsText = dish.ingredients.map(ing => normalize(ing.item)).join(' ');
    
    if (dislikedIngredients.length > 0) {
      const hasForbiddenIngredient = dislikedIngredients.some(forbidden => 
        ingredientsText.includes(forbidden) || dishContent.includes(forbidden)
      );
      if (hasForbiddenIngredient) return false;
    }

    if ((user.excludedCategories || []).includes(dish.category)) return false;

    const dishNature = getDishNature(dish);
    if (user.preferredNatures && user.preferredNatures.length > 0) {
      if (!user.preferredNatures.includes(dishNature.type)) return false;
    }

    if (user.dietMode && (dish.calories || estimateCalories(dish)) > 500) return false;
    if (isQuickMode && (dish.cookTime || estimateCookTime(dish)) > 45) return false;

    return true;
  });
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const generateDailyPlan = async (user: UserProfile, isQuickMode: boolean = false): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const allowedDishes = getAllowedDishes(user, isQuickMode);
  let pool = allowedDishes;
  
  if (user.onlyFavoritesMode && user.favoriteDishIds.length > 0) {
    const favs = allowedDishes.filter(d => user.favoriteDishIds.includes(d.id));
    if (favs.length > 0) pool = favs;
  }

  const shuffled = shuffleArray(pool.filter(d => !user.history.includes(d.id)));
  const selectedDishes = (shuffled.length >= 3 ? shuffled : shuffleArray(pool)).slice(0, 3);

  const plan: DayPlan[] = selectedDishes.map((dish, index) => ({
    dayName: index === 0 ? 'پیشنهاد اصلی' : index === 1 ? 'جایگزین اول' : 'جایگزین دوم',
    dish: dish
  }));

  const newHistory = [...(user.history || []), ...selectedDishes.map(d => d.id)].slice(-20);
  const updatedUser = await UserService.updateProfile(user.username, { 
    history: newHistory,
    weeklyPlan: [] // پاک کردن برنامه قبلی در صورت درخواست پیشنهاد روزانه
  });

  return { plan, updatedUser };
};

export const generateWeeklyPlan = async (user: UserProfile, isQuickMode: boolean = false): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const allowedDishes = getAllowedDishes(user, isQuickMode);
  
  // فیلتر کردن پایه بر اساس محبوب‌ها در صورت فعال بودن مود مربوطه
  let basePool = allowedDishes;
  if (user.onlyFavoritesMode && (user.favoriteDishIds || []).length > 0) {
    const favs = allowedDishes.filter(d => user.favoriteDishIds.includes(d.id));
    if (favs.length > 0) basePool = favs;
  }

  const plan: DayPlan[] = [];
  const selectedIds: string[] = [];

  const dayConfigs = [
    { day: 'شنبه', cats: ['stew', 'local'] },
    { day: 'یک‌شنبه', cats: ['polo'] },
    { day: 'دوشنبه', cats: ['nani', 'kuku'] },
    { day: 'سه‌شنبه', cats: ['stew', 'kabab'] },
    { day: 'چهارشنبه', cats: ['international', 'polo'] },
    { day: 'پنج‌شنبه', cats: ['fastfood', 'nani'] },
    { day: 'جمعه', cats: ['kabab', 'local'] }
  ];

  for (const config of dayConfigs) {
    // تلاش برای انتخاب از basePool (که ممکن است فقط محبوب‌ها باشد)
    let pool = basePool.filter(d => config.cats.includes(d.category) && !selectedIds.includes(d.id));
    
    // اگر در آن دسته‌بندی خاص غذایی نبود، از کل basePool انتخاب کن
    if (pool.length === 0) {
      pool = basePool.filter(d => !selectedIds.includes(d.id));
    }
    
    // اگر باز هم خالی بود (مثلاً محبوب‌ها تمام شدند)، از کل غذاهای مجاز انتخاب کن
    if (pool.length === 0) {
      pool = allowedDishes.filter(d => !selectedIds.includes(d.id));
    }

    const selected = shuffleArray(pool)[0];
    if (selected) {
      plan.push({ dayName: config.day, dish: selected });
      selectedIds.push(selected.id);
    }
  }

  const updatedUser = await UserService.updateProfile(user.username, { 
    history: [...(user.history || []), ...selectedIds].slice(-30),
    weeklyPlan: plan 
  });

  return { plan, updatedUser };
};
