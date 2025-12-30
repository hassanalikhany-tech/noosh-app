
import { Dish, DayPlan, UserProfile } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';

const MEAT_KEYWORDS = [
  'گوشت', 'مرغ', 'ماهی', 'میگو', 'اردک', 'غاز', 'بوقلمون', 'بلدرچین', 
  'چرخ‌کرده', 'سینه', 'ران', 'فیله', 'جگر', 'دل', 'قلوه', 'سیرابی', 
  'پاچه', 'زبان', 'گردن', 'ماهیچه', 'کالباس', 'سوسیس', 'ژامبون', 'بیکن',
  'کباب', 'بره', 'گوساله', 'گاو', 'گوسفند', 'بال', 'مغز', 'همبرگر', 
  'کله‌پاچه', 'کله پاچه', 'جغور', 'بغور', 'واویشکا', 'سوجوک', 'پپرونی',
  'شنیسل', 'استیک', 'کوفته'
];

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getProteinWeight = (dish: Dish): number => {
  let score = 0;
  if (dish.category === 'kabab') score += 50;
  dish.ingredients.forEach(ing => {
    if (MEAT_KEYWORDS.some(kw => ing.item.includes(kw))) {
      score += 10;
      if (['ماهیچه', 'گردن', 'راسته', 'فیله', 'سردست'].some(kw => ing.item.includes(kw))) {
        score += 15;
      }
    }
  });
  return score;
};

const filterDishes = (user: UserProfile) => {
  // اگر کاربر تایید نشده باشد، فقط از غذاهای رایگان (۲۴ مورد) انتخاب کن
  let pool = (user.isApproved || user.isAdmin) 
    ? RecipeService.getAllDishes() 
    : RecipeService.getAccessibleDishes(user);

  // ۱. حذف لیست سیاه شخصی و دسته‌بندی‌های ممنوعه
  pool = pool.filter(d => !user.blacklistedDishIds?.includes(d.id));
  if (user.excludedCategories && user.excludedCategories.length > 0) {
    pool = pool.filter(d => !user.excludedCategories.includes(d.category));
  }

  // ۲. فیلتر مواد ممنوعه و حساسیت‌زا
  if (user.dislikedIngredients && user.dislikedIngredients.length > 0) {
    pool = pool.filter(dish => {
      const isForbiddenInName = user.dislikedIngredients.some(forbidden => dish.name.includes(forbidden));
      const isForbiddenInIngredients = dish.ingredients.some(ing => 
        user.dislikedIngredients.some(forbidden => ing.item.includes(forbidden))
      );
      return !isForbiddenInName && !isForbiddenInIngredients;
    });
  }

  // ۳. فیلتر حالت رژیمی
  if (user.dietMode) {
    pool = pool.filter(d => (d.calories || 400) < 500);
  }

  // ۴. فیلتر طبع دلخواه
  if (user.preferredNatures && user.preferredNatures.length > 0) {
    pool = pool.filter(d => user.preferredNatures.includes(d.nature || 'balanced'));
  }

  // ۵. فیلترهای محبوب
  if (user.onlyFavoritesMode) {
    pool = pool.filter(d => user.favoriteDishIds?.includes(d.id));
  }
  if (user.quickMealsMode) {
    pool = pool.filter(d => (d.cookTime || 60) <= 45);
  }

  // ۶. چالش‌ها
  const activeChallengeId = user.activeChallengeId;
  if (user.meatlessMode || activeChallengeId === 'vegan-week') {
    pool = pool.filter(dish => {
      const nameMatch = MEAT_KEYWORDS.some(kw => dish.name.includes(kw));
      const ingredientMatch = dish.ingredients.some(ing => 
        MEAT_KEYWORDS.some(kw => ing.item.includes(kw))
      );
      return !nameMatch && !ingredientMatch;
    });
  }

  if (activeChallengeId === 'protein-power') {
    pool = pool.filter(dish => {
        return MEAT_KEYWORDS.some(kw => dish.name.includes(kw)) || 
               dish.ingredients.some(ing => MEAT_KEYWORDS.some(kw => ing.item.includes(kw)));
    });
    pool.sort((a, b) => getProteinWeight(b) - getProteinWeight(a));
  }

  return pool;
};

export const generateDailyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  let pool = filterDishes(user);
  const selectionPool = user.activeChallengeId === 'protein-power' ? pool.slice(0, 8) : pool;
  const selected = shuffleArray(selectionPool).slice(0, 3);
  const plan: DayPlan[] = selected.map((dish, index) => ({
    dayName: index === 0 ? 'پیشنهاد اصلی' : `جایگزین ${index}`,
    dish: dish
  }));
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};

export const generateWeeklyPlan = async (user: UserProfile): Promise<{ plan: DayPlan[], updatedUser: UserProfile }> => {
  const basePool = filterDishes(user);
  const isProteinChallenge = user.activeChallengeId === 'protein-power';
  const plan: DayPlan[] = [];
  const dayConfigs = [
    { day: 'شنبه', cats: isProteinChallenge ? ['kabab', 'stew'] : ['stew', 'khorak'] },
    { day: 'یک‌شنبه', cats: isProteinChallenge ? ['kabab', 'polo'] : ['polo'] },
    { day: 'دوشنبه', cats: isProteinChallenge ? ['stew', 'international'] : ['khorak', 'ash'] },
    { day: 'سه‌شنبه', cats: ['kabab', 'stew'] },
    { day: 'چهارشنبه', cats: isProteinChallenge ? ['kabab', 'polo'] : ['international', 'polo'] },
    { day: 'پنج‌شنبه', cats: isProteinChallenge ? ['kabab', 'stew'] : ['fastfood', 'khorak'] },
    { day: 'جمعه', cats: ['kabab', 'khorak'] }
  ];
  const usedIds = new Set<string>();
  for (const config of dayConfigs) {
    let pool = basePool.filter(d => config.cats.includes(d.category) && !usedIds.has(d.id));
    if (isProteinChallenge) {
        const kababs = pool.filter(d => d.category === 'kabab');
        if (kababs.length > 0) pool = kababs;
    }
    if (pool.length === 0) pool = basePool.filter(d => !usedIds.has(d.id));
    const selected = shuffleArray(pool.slice(0, 10))[0];
    if (selected) {
      plan.push({ dayName: config.day, dish: selected });
      usedIds.add(selected.id);
    }
  }
  const updatedUser = await UserService.updateProfile(user.username, { weeklyPlan: plan });
  return { plan, updatedUser };
};
