
import { Dish, NatureType } from '../types';

// Helper to estimate cooking time based on keywords and category
export const estimateCookTime = (dish: Dish): number => {
  const text = (dish.description + ' ' + dish.recipeSteps.join(' ')).toLowerCase();
  
  // Base time by category
  let time = 45; // Default
  if (dish.category === 'stew') time = 120;
  if (dish.category === 'ash') time = 90;
  if (dish.category === 'polo') time = 60;
  if (dish.category === 'kabab') time = 40;
  if (dish.category === 'kuku' || dish.category === 'fastfood') time = 30;
  if (dish.category === 'soup') time = 45;

  // Adjust based on keywords
  if (text.includes('خیس کنید') || text.includes('از شب قبل')) time += 30; // Prep time penalty
  if (text.includes('آرام') || text.includes('جا بیفتد')) time += 30;
  if (text.includes('فوری') || text.includes('سریع')) time = 20;
  if (text.includes('سرخ کنید') && dish.category === 'kuku') time = 25;

  return time;
};

// Helper to estimate calories (very rough approximation per serving)
export const estimateCalories = (dish: Dish): number => {
  let baseCal = 400;

  // Category Baselines
  if (dish.category === 'stew') baseCal = 550; // Oil + Meat
  if (dish.category === 'polo') baseCal = 600; // Rice + Oil
  if (dish.category === 'kabab') baseCal = 450; // Meat mostly
  if (dish.category === 'kuku') baseCal = 350; // Egg + Veg
  if (dish.category === 'ash' || dish.category === 'soup') baseCal = 300;
  if (dish.category === 'fastfood') baseCal = 700;

  // Ingredient Adjustments
  const ingText = JSON.stringify(dish.ingredients);
  if (ingText.includes('دنبه') || ingText.includes('چربی')) baseCal += 150;
  if (ingText.includes('خامه') || ingText.includes('کره')) baseCal += 100;
  if (ingText.includes('بادمجان') && !textContains(dish, 'کبابی')) baseCal += 100; // Fried eggplant absorbs oil
  if (ingText.includes('سینه مرغ') && !ingText.includes('روغن')) baseCal -= 50;
  if (ingText.includes('سبزیجات') && dish.category === 'soup') baseCal -= 50;

  return Math.round(baseCal);
};

const textContains = (dish: Dish, term: string) => {
  const text = (dish.description + ' ' + dish.recipeSteps.join(' ')).toLowerCase();
  return text.includes(term);
};

// Helper to determine difficulty
export const getDifficulty = (dish: Dish): 'آسان' | 'متوسط' | 'سخت' => {
  const time = estimateCookTime(dish);
  const steps = dish.recipeSteps.length;
  
  if (time < 45 && steps < 6) return 'آسان';
  if (time > 120 || steps > 12) return 'سخت';
  return 'متوسط';
};

// --- Traditional Persian Medicine Helpers ---

export const getDishNature = (dish: Dish): { type: NatureType; label: string; mosleh: string } => {
  const text = (dish.name + ' ' + dish.description + ' ' + JSON.stringify(dish.ingredients)).toLowerCase();
  
  // Logic for Cold dishes
  if (
    text.includes('ماهی') || 
    text.includes('جو') || 
    text.includes('عدس') || 
    text.includes('بادمجان') || 
    text.includes('خیار') || 
    text.includes('دوغ') || 
    text.includes('ماست') || 
    text.includes('کدو') ||
    text.includes('سیب زمینی')
  ) {
    let mosleh = "خرما، عسل، گردو، یا زیره";
    if (text.includes('ماهی')) mosleh = "خرما یا گردو";
    if (text.includes('برنج')) mosleh = "زعفران، زیره یا شوید";
    if (text.includes('دوغ') || text.includes('ماست')) mosleh = "نعناع یا گردو";
    
    return { type: 'cold', label: 'سرد', mosleh };
  }

  // Logic for Hot dishes
  if (
    text.includes('قرمه') || 
    text.includes('فسنجان') || 
    text.includes('کباب') || 
    text.includes('گوشت گوسفند') || 
    text.includes('عسل') || 
    text.includes('گردو') || 
    text.includes('خرما') ||
    text.includes('نخود')
  ) {
     return { type: 'hot', label: 'گرم', mosleh: 'سرکه، ترشیجات، یا آبلیمو تازه' };
  }

  return { type: 'balanced', label: 'معتدل', mosleh: 'نیاز به مصلح خاصی ندارد' };
};
