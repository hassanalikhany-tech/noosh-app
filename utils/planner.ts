import { Dish, DayPlan, UserProfile, DAYS_OF_WEEK } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { estimateCalories } from './recipeHelpers';
import { CHALLENGES } from '../data/challenges';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const pickUniqueDishes = (candidates: Dish[], count: number, history: string[]): Dish[] => {
  let pool = candidates.filter(d => !history.includes(d.id));
  
  if (pool.length < count) {
    pool = candidates;
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

  // ---------------------------------------------------------
  // SCENARIO 1: WEEKLY CHALLENGE IS ACTIVE (7 Days Plan)
  // ---------------------------------------------------------
  if (user.activeChallengeId) {
    const challenge = CHALLENGES.find(c => c.id === user.activeChallengeId);
    if (challenge) {
      const challengeDishes = allowedDishes.filter(d => {
        // 1. Check Banned Categories
        if (challenge.bannedCategories && challenge.bannedCategories.includes(d.category)) {
          return false;
        }

        // 2. Check Banned Keywords (Strict Ingredient Check)
        if (challenge.bannedKeywords && challenge.bannedKeywords.length > 0) {
          const content = JSON.stringify(d.ingredients) + ' ' + d.name + ' ' + d.description;
          const hasBannedWord = challenge.bannedKeywords.some(badWord => content.includes(badWord));
          if (hasBannedWord) return false;
        }
        
        // 3. Check Required Keywords (if any exist)
        if (challenge.requiredKeywords && challenge.requiredKeywords.length > 0) {
          const text = (d.name + ' ' + d.description + ' ' + JSON.stringify(d.ingredients)).toLowerCase();
          const matchesKeyword = challenge.requiredKeywords.some(k => text.includes(k));
          if (!matchesKeyword) return false;
        }

        // 4. Special check for 'No Oil'
        if (challenge.id === 'no-oil') {
           const steps = d.recipeSteps.join(' ');
           if (steps.includes('سرخ کنید') || steps.includes('تفت دهید') || d.category === 'kuku') return false;
        }

        return true;
      });

      const selectedDishes = pickUniqueDishes(challengeDishes, 7, user.history);
      
      const plan: DayPlan[] = selectedDishes.map((dish, index) => ({
        dayName: DAYS_OF_WEEK[index % 7], 
        dish: dish
      }));

      const newHistoryIds = selectedDishes.map(d => d.id);
      const updatedUser = UserService.addToHistory(user.username, newHistoryIds);

      return { plan, updatedUser };
    }
  }

  // ---------------------------------------------------------
  // SCENARIO 2: DIET MODE IS ACTIVE (3 Diet Options)
  // ---------------------------------------------------------
  if (user.dietMode) {
    const dietCandidates = allowedDishes.filter(d => {
      const cals = estimateCalories(d);
      const isFried = (d.description + d.recipeSteps.join(' ')).includes('سرخ کنید');
      
      // Strict calorie limit and NO fried foods
      if (cals > 450) return false;
      if (isFried) return false;
      if (['fastfood', 'kuku', 'dessert', 'polo', 'kabab'].includes(d.category)) return false;
      
      return true;
    });

    const selectedDishes = pickUniqueDishes(dietCandidates, 3, user.history);

    const plan: DayPlan[] = selectedDishes.map((dish, index) => ({
      dayName: `پیشنهاد رژیمی ${index + 1}`,
      dish: dish
    }));

    const updatedUser = UserService.addToHistory(user.username, selectedDishes.length > 0 ? [selectedDishes[0].id] : []);
    return { plan, updatedUser };
  }

  // ---------------------------------------------------------
  // SCENARIO 3: NORMAL MODE (3 Varied Options)
  // ---------------------------------------------------------
  
  const completeCandidates = allowedDishes.filter(d => 
    ['stew', 'polo', 'kabab', 'local', 'dolma'].includes(d.category)
  );

  const dietCandidates = allowedDishes.filter(d => {
    const cals = estimateCalories(d);
    return cals < 550 && !['fastfood', 'dessert'].includes(d.category);
  });

  const lightCandidates = allowedDishes.filter(d => 
    ['ash', 'soup', 'kuku', 'nani', 'fastfood'].includes(d.category) || estimateCalories(d) < 450
  );

  const selectedIds: string[] = [];
  
  const dishComplete = pickUniqueDishes(completeCandidates, 1, user.history)[0];
  if (dishComplete) selectedIds.push(dishComplete.id);

  const dishDiet = pickUniqueDishes(dietCandidates.filter(d => !selectedIds.includes(d.id)), 1, user.history)[0];
  if (dishDiet) selectedIds.push(dishDiet.id);

  const dishLight = pickUniqueDishes(lightCandidates.filter(d => !selectedIds.includes(d.id)), 1, user.history)[0];
  if (dishLight) selectedIds.push(dishLight.id);

  const plan: DayPlan[] = [];

  if (dishComplete) plan.push({ dayName: 'پیشنهاد غذای کامل', dish: dishComplete });
  if (dishDiet) plan.push({ dayName: 'پیشنهاد رژیمی/سالم', dish: dishDiet });
  if (dishLight) plan.push({ dayName: 'پیشنهاد شام/سبک', dish: dishLight });

  const updatedUser = UserService.addToHistory(user.username, dishComplete ? [dishComplete.id] : []);

  return { plan, updatedUser };
};

export const generateWeeklyPlan = (user: UserProfile): { plan: DayPlan[], updatedUser: UserProfile } => {
  const allDishes = RecipeService.getAllDishes();
  
  // Basic Filter: Blacklist & Excluded Categories
  let allowedDishes = allDishes.filter(dish => {
    if (user.blacklistedDishIds.includes(dish.id)) return false;
    if (user.excludedCategories.includes(dish.category)) return false;
    
    // In Diet Mode for weekly plan, filter out very heavy items
    if (user.dietMode) {
       const cals = estimateCalories(dish);
       if (cals > 600) return false;
       if (dish.category === 'fastfood') return false;
    }
    
    return true;
  });

  const plan: DayPlan[] = [];
  const selectedIds = new Set<string>();
  // Use a temporary history that includes recent user history to avoid repetition
  const tempHistory = [...user.history];

  const getDish = (cats: string[], count: number) => {
     // Filter candidates that match categories AND haven't been selected in this batch
     const pool = allowedDishes.filter(d => cats.includes(d.category) && !selectedIds.has(d.id));
     // Pick unique based on history
     return pickUniqueDishes(pool, count, tempHistory);
  };

  // Define a balanced week structure
  // 1. Saturday: Stew (Khoresht)
  const d1 = getDish(['stew'], 1)[0] || pickUniqueDishes(allowedDishes, 1, tempHistory)[0];
  if(d1) { plan.push({ dayName: 'شنبه', dish: d1 }); selectedIds.add(d1.id); tempHistory.push(d1.id); }

  // 2. Sunday: Polo (Rice)
  const d2 = getDish(['polo'], 1)[0] || pickUniqueDishes(allowedDishes.filter(d=>!selectedIds.has(d.id)), 1, tempHistory)[0];
  if(d2) { plan.push({ dayName: 'یک‌شنبه', dish: d2 }); selectedIds.add(d2.id); tempHistory.push(d2.id); }

  // 3. Monday: Light/Vegetarian (Kuku, Ash, Soup, Nani)
  const d3 = getDish(['kuku', 'ash', 'soup', 'nani'], 1)[0] || pickUniqueDishes(allowedDishes.filter(d=>!selectedIds.has(d.id)), 1, tempHistory)[0];
  if(d3) { plan.push({ dayName: 'دوشنبه', dish: d3 }); selectedIds.add(d3.id); tempHistory.push(d3.id); }

  // 4. Tuesday: Mixed/Main (Kabab, Dolma, Local, Stew)
  const d4 = getDish(['kabab', 'dolma', 'local', 'stew'], 1)[0] || pickUniqueDishes(allowedDishes.filter(d=>!selectedIds.has(d.id)), 1, tempHistory)[0];
  if(d4) { plan.push({ dayName: 'سه‌شنبه', dish: d4 }); selectedIds.add(d4.id); tempHistory.push(d4.id); }

  // 5. Wednesday: Polo or International
  const d5 = getDish(['polo', 'international'], 1)[0] || pickUniqueDishes(allowedDishes.filter(d=>!selectedIds.has(d.id)), 1, tempHistory)[0];
  if(d5) { plan.push({ dayName: 'چهارشنبه', dish: d5 }); selectedIds.add(d5.id); tempHistory.push(d5.id); }

  // 6. Thursday: Fun/Fastfood/Nani/Kuku
  const d6 = getDish(['fastfood', 'nani', 'kuku', 'international'], 1)[0] || pickUniqueDishes(allowedDishes.filter(d=>!selectedIds.has(d.id)), 1, tempHistory)[0];
  if(d6) { plan.push({ dayName: 'پنج‌شنبه', dish: d6 }); selectedIds.add(d6.id); tempHistory.push(d6.id); }

  // 7. Friday: Special Family Meal (Kabab, Stew, Local, Polo)
  const d7 = getDish(['kabab', 'stew', 'local', 'polo'], 1)[0] || pickUniqueDishes(allowedDishes.filter(d=>!selectedIds.has(d.id)), 1, tempHistory)[0];
  if(d7) { plan.push({ dayName: 'جمعه', dish: d7 }); selectedIds.add(d7.id); tempHistory.push(d7.id); }

  const updatedUser = UserService.addToHistory(user.username, Array.from(selectedIds));
  
  return { plan, updatedUser };
};