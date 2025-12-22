
import { Dish, NatureType } from '../types';

export const estimateCookTime = (dish: Dish): number => {
  const text = (dish.description + ' ' + dish.recipeSteps.join(' ')).toLowerCase();
  
  let time = 45; 
  if (dish.category === 'stew') time = 120;
  if (dish.category === 'ash') time = 90;
  if (dish.category === 'polo') time = 60;
  if (dish.category === 'kabab') time = 40;
  if (dish.category === 'kuku' || dish.category === 'fastfood') time = 30;
  if (dish.category === 'soup') time = 45;

  if (text.includes('خیس کنید') || text.includes('از شب قبل')) time += 30;
  if (text.includes('آرام') || text.includes('جا بیفتد')) time += 30;
  if (text.includes('فوری') || text.includes('سریع')) time = 20;

  return time;
};

export const estimateCalories = (dish: Dish): number => {
  let baseCal = 400;

  if (dish.category === 'stew') baseCal = 550;
  if (dish.category === 'polo') baseCal = 650;
  if (dish.category === 'kabab') baseCal = 450;
  if (dish.category === 'kuku') baseCal = 380;
  if (dish.category === 'ash' || dish.category === 'soup') baseCal = 300;
  if (dish.category === 'fastfood') baseCal = 750;
  if (dish.category === 'dessert') baseCal = 500;

  const ingText = JSON.stringify(dish.ingredients);
  if (ingText.includes('دنبه') || ingText.includes('چربی')) baseCal += 150;
  if (ingText.includes('خامه') || ingText.includes('کره')) baseCal += 120;
  if (ingText.includes('شکر')) baseCal += 80;
  if (ingText.includes('بادمجان') && !ingText.includes('کبابی')) baseCal += 100;
  if (ingText.includes('سینه مرغ')) baseCal -= 50;
  if (ingText.includes('سبزیجات')) baseCal -= 30;

  return Math.round(baseCal);
};

export const getDifficulty = (dish: Dish): 'آسان' | 'متوسط' | 'سخت' => {
  const time = estimateCookTime(dish);
  const steps = dish.recipeSteps.length;
  if (time < 45 && steps < 6) return 'آسان';
  if (time > 120 || steps > 12) return 'سخت';
  return 'متوسط';
};

export const getDishNature = (dish: Dish): { type: NatureType; label: string; mosleh: string } => {
  const text = (dish.name + ' ' + dish.description + ' ' + JSON.stringify(dish.ingredients)).toLowerCase();
  
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
