
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

const toPersianDigits = (num: number | string) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

const filterDishes = (user: UserProfile) => {
  let pool = RecipeService.getAllDishes();
  
  if (pool.length === 0) return [];

  // ۱. حذف قطعی لیست سیاه
  pool = pool.filter(d => !user.blacklistedDishIds?.includes(d.id));
  
  // ۲. فیلتر مواد ممنوعه
  if (user.dislikedIngredients?.length) {
    pool = pool.filter(dish => {
        return !dish.ingredients.some(ing => 
            user.dislikedIngredients.some(disliked => 
                ing.item.includes(disliked) || disliked.includes(ing.item)
            )
        );
    });
  }

  // ۳. فیلتر دسته‌های حذف شده
  const filteredByCategory = pool.filter(d => !user.excludedCategories?.includes(d.category));
  if (filteredByCategory.length > 0) pool = filteredByCategory;

  // ۴. فیلتر طبع
  const preferred = (user.preferredNatures && user.preferredNatures.length > 0) 
    ? user.preferredNatures 
    : ['hot', 'cold', 'balanced'];

  const filteredByNature = pool.filter(d => {
    const dishNature = d.nature || 'balanced';
    return preferred.includes(dishNature);
  });
  if (filteredByNature.length > 0) pool = filteredByNature;
  
  // ۵. فیلترهای سریع
  if (user.onlyFavoritesMode) {
      const favorites = pool.filter(d => user.favoriteDishIds?.includes(d.id));
      if (favorites.length > 0) pool = favorites;
  }
  
  if (user.meatlessMode) {
      const meatKeywords = ['گوشت', 'مرغ', 'ماهی', 'میگو', 'کالباس', 'سوسیس', 'کباب', 'بره', 'گوساله'];
      const meatless = pool.filter(d => !meatKeywords.some(k => d.name.includes(k) || (d.description || "").includes(k)));
      if (meatless.length > 0) pool = meatless;
  }
  
  if (user.quickMealsMode) {
      const quick = pool.filter(d => (d.cookTime || 60) <= 45);
      if (quick.length > 0) pool = quick;
  }
  
  return pool;
};

export const generateDailyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  if (RecipeService.getLocalCount() === 0) throw new Error("دیتابیس خالی است یا در حال بارگذاری می‌باشد.");
  
  const pool = filterDishes(user);
  if (pool.length === 0) throw new Error("موردی با فیلترهای شما یافت نشد.");
  
  const selected = shuffleArray(pool).slice(0, 3);
  const plan = selected.map((dish, idx) => ({ dayName: idx === 0 ? 'پیشنهاد اصلی' : `جایگزین ${idx}`, dish }));
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};

export const generateWeeklyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  if (RecipeService.getLocalCount() === 0) throw new Error("دیتابیس در حال بارگذاری است.");

  const pool = filterDishes(user);
  if (pool.length === 0) throw new Error("موردی با فیلترهای شما یافت نشد.");
  
  const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const shuffled = shuffleArray(pool);
  
  // اطمینان از اینکه اگر تعداد غذاها کمتر از ۷ تا بود، خطا ندهد
  const plan = days.map((day, idx) => ({ 
    dayName: day, 
    dish: shuffled[idx % shuffled.length] 
  }));

  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};

export const generateMonthlyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  if (RecipeService.getLocalCount() === 0) throw new Error("دیتابیس در حال بارگذاری است.");

  const pool = filterDishes(user);
  if (pool.length === 0) throw new Error("موردی با فیلترهای شما یافت نشد.");
  
  const shuffled = shuffleArray(pool);
  const plan: DayPlan[] = [];
  for (let i = 1; i <= 31; i++) {
    plan.push({ 
      dayName: `روز ${toPersianDigits(i)}`, 
      dish: shuffled[(i - 1) % shuffled.length] 
    });
  }
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};
