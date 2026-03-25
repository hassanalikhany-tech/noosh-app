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
  const normalize = (str: string) => 
    str.trim()
       .replace(/ی/g, 'ي')
       .replace(/ک/g, 'ك')
       .replace(/آ/g, 'ا');

  const s = normalize(selected);
  const i = normalize(ingredient);
  
  // Specific fix for Egg (تخم مرغ) vs Chicken (مرغ)
  if ((s === 'مرغ' && i.includes('تخم مرغ')) || (i === 'مرغ' && s.includes('تخم مرغ'))) {
    return false;
  }

  if (i.includes(s) || s.includes(i)) return true;
  
  if (s === 'مرغ') {
    if (i.includes('جوجه') || i.includes('سینه') || i.includes('ران') || i.includes('بال') || i.includes('کتف')) {
      return true;
    }
  }

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
  if (u === 'عدد' || u === 'piece' || u === 'number' || u === 'دانه' || u === 'حلقه') return 'عدد';
  if (u === 'لیتر' || u === 'l' || u === 'میلی‌لیتر' || u === 'ml' || u === 'پیمانه' || u === 'استکان') return 'لیتر';
  if (u.includes('قاشق')) return 'قاشق';
  if (u.includes('لازم') || u.includes('دلخواه')) return 'به میزان لازم';
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
      const requiredAmount = (ing.amount || 0) * scale;
      
      const invUnit = normalizeUnit(invItem.unit);
      const ingUnit = normalizeUnit(ing.unit || '');

      if (invUnit === 'کیلوگرم' && ingUnit === 'کیلوگرم') {
        const requiredKg = convertToKg(requiredAmount, ing.unit);
        invItem.amount = Math.max(0, invItem.amount - requiredKg);
        newInventory[invIdx] = invItem;
        updatedCount++;
      } else if (invUnit === 'عدد' && ingUnit === 'عدد') {
        invItem.amount = Math.max(0, invItem.amount - requiredAmount);
        newInventory[invIdx] = invItem;
        updatedCount++;
      } else if (invUnit === 'لیتر' && ingUnit === 'لیتر') {
        const amountInLiters = (ing.unit === 'میلی‌لیتر' || ing.unit === 'ml') ? requiredAmount / 1000 : requiredAmount;
        invItem.amount = Math.max(0, invItem.amount - amountInLiters);
        newInventory[invIdx] = invItem;
        updatedCount++;
      } else {
        // Lenient matching: if names match, we count it as a match
        // and try to deduct a reasonable amount if possible
        if (ingUnit !== 'به میزان لازم') {
          const deduct = requiredAmount > 0 ? requiredAmount : 1;
          // If units are different, we just deduct 1 unit or 0.01 kg as a fallback
          invItem.amount = Math.max(0, invItem.amount - (invItem.unit === 'کیلوگرم' ? 0.01 : 1));
        }
        newInventory[invIdx] = invItem;
        updatedCount++;
      }
    }
  });

  return { newInventory, updatedCount };
};
