
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

/**
 * انتخاب هوشمند غذاها برای رعایت سقف بودجه
 */
const selectEconomicPlan = (pool: Dish[], count: number, budgetPerMeal: number): Dish[] => {
  if (pool.length === 0) return [];
  
  // اگر بودجه نداریم، فقط رندوم انتخاب کن
  if (!budgetPerMeal) return shuffleArray(pool).slice(0, count);

  let selected: Dish[] = [];
  let currentTotal = 0;

  // تلاش برای انتخاب ترکیبی که میانگینش از بودجه کمتر باشد
  const shuffled = shuffleArray(pool);
  
  for (const dish of shuffled) {
    if (selected.length >= count) break;
    
    const cost = dish.costPerServing || 0;
    const projectedAvg = (currentTotal + cost) / (selected.length + 1);
    
    // اجازه می‌دهیم تا ۲۰٪ از غذاها متعادل باشند حتی اگر میانگین را کمی بالا ببرند
    // اما در نهایت میانگین کل نباید از بودجه بیشتر شود (مگر اینکه مجبور باشیم)
    const balancedCount = selected.filter(d => d.economicLabel === 'balanced').length;
    const canAddBalanced = balancedCount < count * 0.2;

    if (projectedAvg <= budgetPerMeal || (canAddBalanced && dish.economicLabel === 'balanced')) {
      selected.push(dish);
      currentTotal += cost;
    }
  }

  // اگر به تعداد کافی نرسیدیم، بقیه را از اقتصادی‌ها پر کن
  if (selected.length < count) {
    const economicOnly = shuffled.filter(d => d.economicLabel === 'economic' && !selected.find(s => s.id === d.id));
    for (const dish of economicOnly) {
      if (selected.length >= count) break;
      selected.push(dish);
    }
  }

  // اگر باز هم نرسیدیم، هر چی موند اضافه کن
  if (selected.length < count) {
    for (const dish of shuffled) {
      if (selected.length >= count) break;
      if (!selected.find(s => s.id === dish.id)) selected.push(dish);
    }
  }

  return selected;
};

/**
 * فیلتر کردن غذاها بر اساس تنظیمات کاربر
 */
export const filterDishes = (user: UserProfile) => {
  let pool = RecipeService.getAllDishes();
  
  if (pool.length === 0) return [];

  // ۱. حذف قطعی لیست سیاه کاربر
  pool = pool.filter(d => !user.blacklistedDishIds?.includes(d.id));
  
  // ۲. فیلتر مواد ممنوعه (حساسیت‌های کاربر)
  if (user.dislikedIngredients?.length) {
    pool = pool.filter(dish => {
        return !dish.ingredients.some(ing => 
            user.dislikedIngredients.some(disliked => 
                ing.item.includes(disliked) || disliked.includes(ing.item)
            )
        );
    });
  }

  // ۳. فیلتر دسته‌های حذف شده در تنظیمات
  const filteredByCategory = pool.filter(d => !user.excludedCategories?.includes(d.category));
  if (filteredByCategory.length > 0) pool = filteredByCategory;

  // ۴. فیلتر طبع (گرم، سرد، معتدل)
  const preferred = (user.preferredNatures && user.preferredNatures.length > 0) 
    ? user.preferredNatures 
    : ['hot', 'cold', 'balanced'];

  const filteredByNature = pool.filter(d => {
    const dishNature = d.nature || 'balanced';
    return preferred.includes(dishNature);
  });
  if (filteredByNature.length > 0) pool = filteredByNature;
  
  // ۵. فیلترهای هوشمند سریع
  if (user.onlyFavoritesMode) {
      const favorites = pool.filter(d => user.favoriteDishIds?.includes(d.id));
      if (favorites.length > 0) pool = favorites;
  }
  
  // --- تقویت شدید فیلتر گیاهی (فقط مواد غیرگوشتی) ---
  if (user.meatlessMode) {
      const meatKeywords = [
        'گوشت', 'مرغ', 'ماهی', 'میگو', 'کالباس', 'سوسیس', 'ژامبون', 'بره', 'گوساله', 'گوسفند', 
        'بوقلمون', 'جگر', 'زبان', 'سیرابی', 'کله', 'پاچه', 'شتر', 'بلدرچین', 'اردک', 'غاز', 
        'فیله', 'استیک', 'کباب', 'مغز', 'دل', 'قلوه', 'خویش', 'دنبه', 'تن ماهی', 'ژلاتین'
      ];
      
      pool = pool.filter(dish => {
          const nameHasMeat = meatKeywords.some(k => dish.name.includes(k));
          const descHasMeat = meatKeywords.some(k => (dish.description || "").includes(k));
          const ingredientsHaveMeat = dish.ingredients.some(ing => 
            meatKeywords.some(k => ing.item.includes(k))
          );
          const isKababCategory = dish.category === 'kabab' && !dish.name.includes('گیاهی');
          return !nameHasMeat && !descHasMeat && !ingredientsHaveMeat && !isKababCategory;
      });
  }
  
  if (user.quickMealsMode) {
      const quick = pool.filter(d => (d.cookTime || 60) <= 45);
      if (quick.length > 0) pool = quick;
  }

  // ۶. فیلتر اقتصادی (اگر بودجه تنظیم شده باشد)
  if (user.monthlyFoodBudget && user.householdSize) {
    const budgetPerMeal = user.monthlyFoodBudget / 30 / user.householdSize;
    
    // جدا کردن دسته‌ها
    const economic = pool.filter(d => d.economicLabel === 'economic');
    const balanced = pool.filter(d => d.economicLabel === 'balanced');
    const expensive = pool.filter(d => d.economicLabel === 'expensive');

    // اولویت‌بندی: اقتصادی > متعادل > پرهزینه
    // برای حفظ تنوع، ترکیبی از اینها را برمی‌گردانیم اما با اولویت اقتصادی
    if (economic.length > 0) {
      // اگر اقتصادی داریم، بیشتر آنها را برمی‌گردانیم
      // اما اجازه می‌دهیم متعادل‌ها هم باشند (حداکثر ۲۰٪ در خروجی نهایی توسط پلنر مدیریت می‌شود)
      pool = [...economic, ...balanced, ...expensive];
      
      // مرتب‌سازی بر اساس برچسب
      pool.sort((a, b) => {
        const order = { 'economic': 1, 'balanced': 2, 'expensive': 3 };
        return (order[a.economicLabel || 'expensive'] || 3) - (order[b.economicLabel || 'expensive'] || 3);
      });
    }
  }
  
  return pool;
};

/**
 * تولید یک جایگزین تکی برای یک وعده
 */
export const generateSingleReplacement = async (user: UserProfile, currentIds: string[]): Promise<Dish> => {
    const pool = filterDishes(user);
    if (pool.length === 0) throw new Error("غذای جایگزین با این فیلترها یافت نشد.");
    
    // فیلتر کردن غذاهایی که همین الان در لیست هستند برای جلوگیری از تکرار
    const uniquePool = pool.filter(d => !currentIds.includes(d.id));
    const finalPool = uniquePool.length > 0 ? uniquePool : pool;
    
    return finalPool[Math.floor(Math.random() * finalPool.length)];
};

export const generateDailyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  if (RecipeService.getLocalCount() === 0) throw new Error("دیتابیس خالی است یا در حال بارگذاری می‌باشد.");
  const pool = filterDishes(user);
  if (pool.length === 0) throw new Error("موردی با فیلترهای شما یافت نشد.");
  
  const budgetPerMeal = (user.monthlyFoodBudget && user.householdSize) ? (user.monthlyFoodBudget / 30 / user.householdSize) : 0;
  const selected = selectEconomicPlan(pool, 3, budgetPerMeal);
  
  const plan = selected.map((dish, idx) => ({ dayName: idx === 0 ? 'پیشنهاد اصلی' : `جایگزین ${idx}`, dish }));
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};

export const generateWeeklyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  if (RecipeService.getLocalCount() === 0) throw new Error("دیتابیس در حال بارگذاری است.");
  const pool = filterDishes(user);
  if (pool.length === 0) throw new Error("موردی با فیلترهای شما یافت نشد.");
  
  const budgetPerMeal = (user.monthlyFoodBudget && user.householdSize) ? (user.monthlyFoodBudget / 30 / user.householdSize) : 0;
  const selected = selectEconomicPlan(pool, 7, budgetPerMeal);
  
  const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const plan = days.map((day, idx) => ({ dayName: day, dish: selected[idx % selected.length] }));
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};

export const generateMonthlyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  if (RecipeService.getLocalCount() === 0) throw new Error("دیتابیس در حال بارگذاری است.");
  const pool = filterDishes(user);
  if (pool.length === 0) throw new Error("موردی با فیلترهای شما یافت نشد.");
  
  const budgetPerMeal = (user.monthlyFoodBudget && user.householdSize) ? (user.monthlyFoodBudget / 30 / user.householdSize) : 0;
  const selected = selectEconomicPlan(pool, 31, budgetPerMeal);
  
  const plan: DayPlan[] = [];
  for (let i = 1; i <= 31; i++) {
    plan.push({ dayName: `روز ${toPersianDigits(i)}`, dish: selected[(i - 1) % selected.length] });
  }
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};
