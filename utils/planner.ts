
import { Dish, DayPlan, UserProfile, DAYS_OF_WEEK } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { estimateCalories, estimateCookTime, getDishNature } from './recipeHelpers';
import { CHALLENGES } from '../data/challenges';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const normalize = (str: string) => {
  if (!str) return '';
  return str.replace(/[آأإ]/g, 'ا').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200C\s]+/g, '').trim().toLowerCase();
};

const getAllowedDishes = (user: UserProfile, isQuickMode: boolean): Dish[] => {
  const allDishes = RecipeService.getAllDishes();
  const challenge = user.activeChallengeId ? CHALLENGES.find(c => c.id === user.activeChallengeId) : null;
  const dislikedIngs = (user.dislikedIngredients || []).map(i => normalize(i));

  return allDishes.filter(dish => {
    const dishContent = normalize(dish.name + dish.description);
    const ingredientsText = dish.ingredients.map(ing => normalize(ing.item)).join(' ');
    
    // ۱. چک کردن لیست سیاه دستی
    if ((user.blacklistedDishIds || []).includes(dish.id)) return false;
    
    // ۲. چک کردن حساسیت‌ها و مواد ناخواسته (فیلتر هوشمند مواد اولیه)
    if (dislikedIngs.length > 0) {
      const hasBadIngredient = dislikedIngs.some(disliked => 
        ingredientsText.includes(disliked) || dishContent.includes(disliked)
      );
      if (hasBadIngredient) return false;
    }

    // ۳. چک کردن دسته‌بندی‌های حذف شده
    if (user.excludedCategories.includes(dish.category)) return false;
    
    // ۴. مود فقط محبوب‌ها
    if (user.onlyFavoritesMode && !(user.favoriteDishIds || []).includes(dish.id)) return false;

    // ۵. حالت رژیمی
    if (user.dietMode) {
      if (estimateCalories(dish) >= 500) return false;
      if (['fastfood', 'dessert'].includes(dish.category)) return false;
    }

    // ۶. غذاهای سریع
    if (isQuickMode && estimateCookTime(dish) > 45) return false;
    
    // ۷. چالش‌های فعال
    if (challenge) {
      if (challenge.bannedCategories?.includes(dish.category)) return false;
      const combinedFullText = dishContent + ingredientsText;
      if (challenge.bannedKeywords?.some(k => combinedFullText.includes(normalize(k)))) return false;
      if (challenge.requiredKeywords && !challenge.requiredKeywords.some(k => combinedFullText.includes(normalize(k)))) return false;
    }
    
    return true;
  });
};

const pickUniqueDishes = (candidates: Dish[], count: number, history: string[], userNatures?: string[]): Dish[] => {
  let filtered = candidates;
  if (userNatures && userNatures.length > 0) {
     const natureMatches = candidates.filter(d => userNatures.includes(getDishNature(d).type));
     if (natureMatches.length >= count) filtered = natureMatches;
  }
  let pool = filtered.filter(d => !history.includes(d.id));
  if (pool.length < count) pool = filtered;
  return shuffleArray(pool).slice(0, count);
};

export const generateDailyPlan = (user: UserProfile, isQuickMode: boolean = false): { plan: DayPlan[], updatedUser: UserProfile } => {
  const allowedDishes = getAllowedDishes(user, isQuickMode);
  const selectedDishes = pickUniqueDishes(allowedDishes, 3, user.history, user.preferredNatures);
  const plan: DayPlan[] = selectedDishes.map((dish, index) => ({
    dayName: index === 0 ? 'پیشنهاد اصلی' : index === 1 ? 'جایگزین اول' : 'جایگزین دوم (سبک)',
    dish: dish
  }));
  return { plan, updatedUser: UserService.addToHistory(user.username, selectedDishes.map(d => d.id)) };
};

export const generateWeeklyPlan = (user: UserProfile, isQuickMode: boolean = false): { plan: DayPlan[], updatedUser: UserProfile } => {
  const allowedDishes = getAllowedDishes(user, isQuickMode);
  const plan: DayPlan[] = [];
  const selectedIds = new Set<string>();
  const tempHistory = [...user.history];
  const structure = [
    { day: 'شنبه', cats: ['stew', 'local'] }, { day: 'یک‌شنبه', cats: ['polo'] },
    { day: 'دوشنبه', cats: ['kuku', 'nani', 'soup'] }, { day: 'سه‌شنبه', cats: ['kabab', 'stew'] },
    { day: 'چهارشنبه', cats: ['polo', 'international'] }, { day: 'پنج‌شنبه', cats: ['fastfood', 'nani'] },
    { day: 'جمعه', cats: ['kabab', 'stew', 'local'] }
  ];
  structure.forEach(s => {
    let pool = allowedDishes.filter(d => s.cats.includes(d.category) && !selectedIds.has(d.id));
    if (pool.length === 0) pool = allowedDishes.filter(d => !selectedIds.has(d.id));
    const d = pickUniqueDishes(pool, 1, tempHistory, user.preferredNatures)[0];
    if(d) { plan.push({ dayName: s.day, dish: d }); selectedIds.add(d.id); tempHistory.push(d.id); }
  });
  return { plan, updatedUser: UserService.addToHistory(user.username, Array.from(selectedIds)) };
};
