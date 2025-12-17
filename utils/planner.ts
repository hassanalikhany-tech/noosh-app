
import { Dish, DayPlan, UserProfile, DAYS_OF_WEEK } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { estimateCalories, getDishNature } from './recipeHelpers';
import { CHALLENGES } from '../data/challenges';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const pickUniqueDishes = (candidates: Dish[], count: number, history: string[], userNatures?: string[]): Dish[] => {
  // Filter by nature if provided
  let filtered = candidates;
  if (userNatures && userNatures.length > 0) {
     filtered = candidates.filter(d => {
        const nature = getDishNature(d).type;
        return userNatures.includes(nature);
     });
     // Fallback to all if too few results
     if (filtered.length < count) filtered = candidates;
  }

  let pool = filtered.filter(d => !history.includes(d.id));
  
  if (pool.length < count) {
    pool = filtered;
  }

  const shuffled = shuffleArray(pool);
  
  if (shuffled.length < count && shuffled.length > 0) {
     const result = [...shuffled];
     while (result.length < count) {
        result.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
     }
     return result;
  }

  return shuffled.slice(0, count);
};

export const generateDailyPlan = (user: UserProfile): { plan: DayPlan[], updatedUser: UserProfile } => {
  const allDishes = RecipeService.getAllDishes();
  
  if (!allDishes || allDishes.length === 0) {
     return { plan: [], updatedUser: user };
  }

  // Basic Filter: Blacklist & Excluded Categories
  let allowedDishes = allDishes.filter(dish => {
    if (user.blacklistedDishIds.includes(dish.id)) return false;
    if (user.excludedCategories.includes(dish.category)) return false;
    return true;
  });

  // 1. CHALLENGE ACTIVE
  if (user.activeChallengeId) {
    const challenge = CHALLENGES.find(c => c.id === user.activeChallengeId);
    if (challenge) {
      const challengeDishes = allowedDishes.filter(d => {
        if (challenge.bannedCategories && challenge.bannedCategories.includes(d.category)) return false;
        if (challenge.bannedKeywords && challenge.bannedKeywords.length > 0) {
          const content = JSON.stringify(d.ingredients) + ' ' + d.name + ' ' + d.description;
          if (challenge.bannedKeywords.some(badWord => content.includes(badWord))) return false;
        }
        if (challenge.requiredKeywords && challenge.requiredKeywords.length > 0) {
          const text = (d.name + ' ' + d.description + ' ' + JSON.stringify(d.ingredients)).toLowerCase();
          if (!challenge.requiredKeywords.some(k => text.includes(k))) return false;
        }
        if (challenge.id === 'no-oil') {
           const steps = d.recipeSteps.join(' ');
           if (steps.includes('سرخ کنید') || steps.includes('تفت دهید') || d.category === 'kuku') return false;
        }
        return true;
      });

      const selectedDishes = pickUniqueDishes(challengeDishes, 7, user.history, user.preferredNatures);
      const plan: DayPlan[] = selectedDishes.map((dish, index) => ({
        dayName: DAYS_OF_WEEK[index % 7], 
        dish: dish
      }));
      return { plan, updatedUser: UserService.addToHistory(user.username, selectedDishes.map(d => d.id)) };
    }
  }

  // 2. DIET MODE
  if (user.dietMode) {
    const dietCandidates = allowedDishes.filter(d => {
      const cals = estimateCalories(d);
      const isFried = (d.description + d.recipeSteps.join(' ')).includes('سرخ کنید');
      if (cals > 450 || isFried) return false;
      if (['fastfood', 'kuku', 'dessert', 'polo', 'kabab'].includes(d.category)) return false;
      return true;
    });

    const selectedDishes = pickUniqueDishes(dietCandidates, 3, user.history, user.preferredNatures);
    const plan: DayPlan[] = selectedDishes.map((dish, index) => ({
      dayName: `پیشنهاد رژیمی ${index + 1}`,
      dish: dish
    }));
    return { plan, updatedUser: UserService.addToHistory(user.username, selectedDishes.length > 0 ? [selectedDishes[0].id] : []) };
  }

  // 3. NORMAL MODE
  const completeCandidates = allowedDishes.filter(d => ['stew', 'polo', 'kabab', 'local', 'dolma'].includes(d.category));
  const dietCandidates = allowedDishes.filter(d => estimateCalories(d) < 550 && !['fastfood', 'dessert'].includes(d.category));
  const lightCandidates = allowedDishes.filter(d => ['ash', 'soup', 'kuku', 'nani', 'fastfood'].includes(d.category) || estimateCalories(d) < 450);

  const selectedIds: string[] = [];
  const dishComplete = pickUniqueDishes(completeCandidates, 1, user.history, user.preferredNatures)[0];
  if (dishComplete) selectedIds.push(dishComplete.id);
  const dishDiet = pickUniqueDishes(dietCandidates.filter(d => !selectedIds.includes(d.id)), 1, user.history, user.preferredNatures)[0];
  if (dishDiet) selectedIds.push(dishDiet.id);
  const dishLight = pickUniqueDishes(lightCandidates.filter(d => !selectedIds.includes(d.id)), 1, user.history, user.preferredNatures)[0];
  if (dishLight) selectedIds.push(dishLight.id);

  const plan: DayPlan[] = [];
  if (dishComplete) plan.push({ dayName: 'پیشنهاد غذای کامل', dish: dishComplete });
  if (dishDiet) plan.push({ dayName: 'پیشنهاد رژیمی/سالم', dish: dishDiet });
  if (dishLight) plan.push({ dayName: 'پیشنهاد شام/سبک', dish: dishLight });

  return { plan, updatedUser: UserService.addToHistory(user.username, dishComplete ? [dishComplete.id] : []) };
};

export const generateWeeklyPlan = (user: UserProfile): { plan: DayPlan[], updatedUser: UserProfile } => {
  const allDishes = RecipeService.getAllDishes();
  let allowedDishes = allDishes.filter(dish => {
    if (user.blacklistedDishIds.includes(dish.id)) return false;
    if (user.excludedCategories.includes(dish.category)) return false;
    if (user.dietMode) {
       if (estimateCalories(dish) > 600 || dish.category === 'fastfood') return false;
    }
    return true;
  });

  const plan: DayPlan[] = [];
  const selectedIds = new Set<string>();
  const tempHistory = [...user.history];

  const getDish = (cats: string[], count: number) => {
     const pool = allowedDishes.filter(d => cats.includes(d.category) && !selectedIds.has(d.id));
     return pickUniqueDishes(pool, count, tempHistory, user.preferredNatures);
  };

  const structure = [
    { day: 'شنبه', cats: ['stew'] },
    { day: 'یک‌شنبه', cats: ['polo'] },
    { day: 'دوشنبه', cats: ['kuku', 'ash', 'soup', 'nani'] },
    { day: 'سه‌شنبه', cats: ['kabab', 'dolma', 'local', 'stew'] },
    { day: 'چهارشنبه', cats: ['polo', 'international'] },
    { day: 'پنج‌شنبه', cats: ['fastfood', 'nani', 'kuku', 'international'] },
    { day: 'جمعه', cats: ['kabab', 'stew', 'local', 'polo'] }
  ];

  structure.forEach(s => {
    const d = getDish(s.cats, 1)[0] || pickUniqueDishes(allowedDishes.filter(x => !selectedIds.has(x.id)), 1, tempHistory, user.preferredNatures)[0];
    if(d) { plan.push({ dayName: s.day, dish: d }); selectedIds.add(d.id); tempHistory.push(d.id); }
  });

  return { plan, updatedUser: UserService.addToHistory(user.username, Array.from(selectedIds)) };
};
