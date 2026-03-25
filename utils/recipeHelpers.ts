import { Dish, NatureType } from '../types';

export const estimateCookTime = (dish: Dish): number => {
  let time = 45; 
  if (dish.category === 'stew' || dish.category === 'ash') time = 120;
  if (dish.category === 'polo') time = 60;
  if (dish.category === 'kabab') time = 40;
  if (dish.category === 'fastfood' || dish.category === 'khorak') time = 30;
  if (dish.category === 'soup') time = 45;
  if (dish.category === 'international') time = 50;
  return time;
};

export const estimateCalories = (dish: Dish): number => {
  let baseCal = 400;
  if (dish.category === 'stew') baseCal = 550;
  if (dish.category === 'polo') baseCal = 650;
  if (dish.category === 'kabab') baseCal = 450;
  if (dish.category === 'khorak') baseCal = 380;
  if (dish.category === 'ash' || dish.category === 'soup') baseCal = 300;
  if (dish.category === 'fastfood') baseCal = 750;
  if (dish.category === 'international') baseCal = 500;
  return baseCal;
};

export const getDifficulty = (dish: Dish): 'آسان' | 'متوسط' | 'سخت' => {
  const time = estimateCookTime(dish);
  if (time < 45) return 'آسان';
  if (time > 90) return 'سخت';
  return 'متوسط';
};

export const getDishNature = (dish: Dish): { type: NatureType; label: string; mosleh: string } => {
  return { type: 'balanced', label: 'معتدل', mosleh: 'نیاز به مصلح خاصی ندارد' };
};

export const isIngredientMatch = (selected: string, ingredient: string): boolean => {
  const s = selected.trim();
  const i = ingredient.trim();
  
  // Basic match (case insensitive-ish for Persian)
  if (i.includes(s) || s.includes(i)) return true;
  
  // Special case for Chicken (مرغ) and Joojeh (جوجه)
  // If user selects "مرغ", it should match "جوجه", "سینه مرغ", "ران مرغ", etc.
  if (s === 'مرغ') {
    if (i.includes('جوجه') || i.includes('سینه') || i.includes('ران') || i.includes('بال') || i.includes('کتف')) {
      return true;
    }
  }

  // If user selects "گوشت سینه مرغ", it should also match "مرغ" or "جوجه"
  if (s.includes('مرغ') && (i === 'مرغ' || i.includes('جوجه'))) {
    return true;
  }

  return false;
};

export const convertToKg = (amount: number, unit: string): number => {
  const u = unit.trim();
  if (u === 'گرم' || u === 'g') return amount / 1000;
  if (u === 'کیلوگرم' || u === 'kg') return amount;
  // Approximations for common kitchen units if needed
  if (u === 'مثقال') return (amount * 4.6) / 1000;
  return amount; // Default
};

export const normalizeUnit = (unit: string): string => {
  const u = unit.trim();
  if (u === 'گرم' || u === 'g' || u === 'کیلوگرم' || u === 'kg') return 'کیلوگرم';
  if (u === 'عدد' || u === 'piece' || u === 'number') return 'عدد';
  return u;
};

export const getInventoryUpdate = (
  inventory: any[],
  ingredients: any[],
  servings: number,
  baseServings: number = 4
) => {
  const scale = servings / baseServings;
  const newInventory = [...inventory];
  let updatedCount = 0;

  ingredients.forEach(ing => {
    const invIdx = newInventory.findIndex(item => isIngredientMatch(item.name, ing.item));
    if (invIdx !== -1) {
      const invItem = { ...newInventory[invIdx] };
      const requiredAmount = ing.amount * scale;
      
      if (invItem.unit === 'کیلوگرم' && (ing.unit === 'گرم' || ing.unit === 'کیلوگرم')) {
        const requiredKg = convertToKg(requiredAmount, ing.unit);
        invItem.amount = Math.max(0, invItem.amount - requiredKg);
        newInventory[invIdx] = invItem;
        updatedCount++;
      } else if (invItem.unit === 'عدد' && ing.unit === 'عدد') {
        invItem.amount = Math.max(0, invItem.amount - requiredAmount);
        newInventory[invIdx] = invItem;
        updatedCount++;
      }
    }
  });

  return { newInventory, updatedCount };
};
