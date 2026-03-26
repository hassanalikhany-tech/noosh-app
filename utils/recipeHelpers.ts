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

export const normalizeItemName = (str: string): string => 
  str.trim()
     .replace(/ی/g, 'ی')
     .replace(/ي/g, 'ی')
     .replace(/ک/g, 'ک')
     .replace(/ك/g, 'ک')
     .replace(/آ/g, 'ا')
     .replace(/\s+/g, '') // Remove all spaces for matching
     .replace(/[\u200B-\u200D\uFEFF]/g, '');

export const isIngredientMatch = (selected: string, ingredient: string): boolean => {
  const s = normalizeItemName(selected);
  const i = normalizeItemName(ingredient);
  
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

// Standard conversion factors to base units (grams for weight, ml for volume, pieces for count)
export const UNIT_CONVERSIONS: Record<string, { factor: number, type: 'weight' | 'volume' | 'count' }> = {
  'گرم': { factor: 1, type: 'weight' },
  'g': { factor: 1, type: 'weight' },
  'کیلوگرم': { factor: 1000, type: 'weight' },
  'kg': { factor: 1000, type: 'weight' },
  'مثقال': { factor: 4.6, type: 'weight' },
  'سیر': { factor: 75, type: 'weight' },
  'پیمانه': { factor: 100, type: 'weight' }, // As per user request: 1 cup = 100g
  'استکان': { factor: 100, type: 'weight' },
  'قاشق غذاخوری': { factor: 15, type: 'weight' },
  'قاشق چایخوری': { factor: 5, type: 'weight' },
  'لیتر': { factor: 1000, type: 'volume' },
  'l': { factor: 1000, type: 'volume' },
  'میلی‌لیتر': { factor: 1, type: 'volume' },
  'ml': { factor: 1, type: 'volume' },
  'عدد': { factor: 1, type: 'count' },
  'دانه': { factor: 1, type: 'count' },
  'حلقه': { factor: 1, type: 'count' },
  'بسته': { factor: 1, type: 'count' },
  'حبه': { factor: 1, type: 'count' },
};

export const normalizeUnit = (unit: string): string => {
  if (!unit) return 'عدد';
  
  // Normalize Persian/Arabic characters
  let u = unit.trim()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u200B-\u200D\uFEFF]/g, ''); // Remove zero-width spaces
    
  if (u.includes('کیلوگرم') || u === 'kg') return 'کیلوگرم';
  if (u.includes('گرم') || u === 'g') return 'گرم';
  
  // Standardize all variations of "count" to "عدد"
  // Including common Persian variations and specific ones mentioned by user
  const countVariations = [
    'عدد', 'piece', 'number', 'دانه', 'حلقه', 'واحد', 
    'درشت', 'بزرگ', 'متوسط', 'کوچک', 'سایز', 'دونه'
  ];
  
  if (countVariations.some(v => u.includes(v))) return 'عدد';

  if (u.includes('حبه')) return 'حبه';

  if (u === 'لیتر' || u === 'l' || u === 'میلی‌لیتر' || u === 'ml') return 'لیتر';
  if (u === 'پیمانه' || u === 'استکان') return 'پیمانه';
  if (u.includes('قاشق')) return 'قاشق';
  if (u.includes('لازم') || u.includes('دلخواه')) return 'به میزان لازم';
  return u;
};

export const convertToBase = (amount: number, unit: string, itemName?: string): { value: number, type: 'weight' | 'volume' | 'count' | 'unknown' } => {
  const u = unit.trim();
  
  // Special case for Onion (پیاز) as per user request: 1 count = 100g
  // This allows comparing "count" with "weight" for onions
  if (itemName && isIngredientMatch('پیاز', itemName) && (u === 'عدد' || u === 'دانه')) {
    return { value: amount * 100, type: 'weight' };
  }

  // Special case for Garlic (سیر) as per user request: 1 clove = 10g
  if (itemName && isIngredientMatch('سیر', itemName) && u.includes('حبه')) {
    return { value: amount * 10, type: 'weight' };
  }

  // Special case for Olive Oil as per user request: 1 spoon = 50g
  if (itemName && isIngredientMatch('روغن زیتون', itemName) && normalizeUnit(u) === 'قاشق') {
    return { value: amount * 50, type: 'weight' };
  }

  // Special case for Saffron (زعفران دم کرده) as per user request: 1 "to taste" = 0.25g
  if (itemName && isIngredientMatch('زعفران دم کرده', itemName) && normalizeUnit(u) === 'به میزان لازم') {
    return { value: 0.25, type: 'weight' };
  }

  // Special case for Chicken Breast (سینه مرغ) as per user request: 1 count = 250g
  if (itemName && isIngredientMatch('سینه مرغ', itemName) && normalizeUnit(u) === 'عدد') {
    return { value: amount * 250, type: 'weight' };
  }

  // Special case for Carrot (هویج) as per user request: 1 count = 100g
  if (itemName && isIngredientMatch('هویج', itemName) && normalizeUnit(u) === 'عدد') {
    return { value: amount * 100, type: 'weight' };
  }

  const conv = UNIT_CONVERSIONS[u] || Object.entries(UNIT_CONVERSIONS).find(([k]) => u.includes(k))?.[1];
  
  if (conv) {
    return { value: amount * conv.factor, type: conv.type };
  }
  
  return { value: amount, type: 'unknown' };
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
      
      const invBase = convertToBase(invItem.amount, invItem.unit, invItem.name);
      const ingBase = convertToBase(requiredAmount, ing.unit || '', ing.item);

      if (invBase.type !== 'unknown' && ingBase.type !== 'unknown' && invBase.type === ingBase.type) {
        // Same type (e.g. both weight), so we can subtract base values
        const remainingBase = Math.max(0, invBase.value - ingBase.value);
        
        // Convert back to inventory unit
        // Special case for Onion back-conversion
        if (invItem.name && isIngredientMatch('پیاز', invItem.name) && (invItem.unit === 'عدد' || invItem.unit === 'دانه')) {
          invItem.amount = remainingBase / 100;
          newInventory[invIdx] = invItem;
          updatedCount++;
        } 
        // Special case for Garlic back-conversion
        else if (invItem.name && isIngredientMatch('سیر', invItem.name) && invItem.unit.includes('حبه')) {
          invItem.amount = remainingBase / 10;
          newInventory[invIdx] = invItem;
          updatedCount++;
        }
        // Special case for Olive Oil back-conversion
        else if (invItem.name && isIngredientMatch('روغن زیتون', invItem.name) && normalizeUnit(invItem.unit) === 'قاشق') {
          invItem.amount = remainingBase / 50;
          newInventory[invIdx] = invItem;
          updatedCount++;
        }
        // Special case for Saffron back-conversion
        else if (invItem.name && isIngredientMatch('زعفران دم کرده', invItem.name) && normalizeUnit(invItem.unit) === 'به میزان لازم') {
          invItem.amount = remainingBase / 0.25;
          newInventory[invIdx] = invItem;
          updatedCount++;
        }
        // Special case for Chicken Breast back-conversion (if inventory is in count)
        else if (invItem.name && isIngredientMatch('سینه مرغ', invItem.name) && normalizeUnit(invItem.unit) === 'عدد') {
          invItem.amount = remainingBase / 250;
          newInventory[invIdx] = invItem;
          updatedCount++;
        }
        // Special case for Carrot back-conversion (if inventory is in count)
        else if (invItem.name && isIngredientMatch('هویج', invItem.name) && normalizeUnit(invItem.unit) === 'عدد') {
          invItem.amount = remainingBase / 100;
          newInventory[invIdx] = invItem;
          updatedCount++;
        }
        else {
          const invConv = UNIT_CONVERSIONS[invItem.unit] || Object.entries(UNIT_CONVERSIONS).find(([k]) => invItem.unit.includes(k))?.[1];
          if (invConv) {
            invItem.amount = remainingBase / invConv.factor;
            newInventory[invIdx] = invItem;
            updatedCount++;
          }
        }
      } else if (isIngredientMatch(invItem.name, ing.item)) {
        // Fallback if types don't match or are unknown but names match
        // If it's "to taste", don't deduct
        if (normalizeUnit(ing.unit || '') !== 'به میزان لازم') {
          const deduct = invItem.unit === 'کیلوگرم' ? 0.05 : 1; // Deduct a small amount
          invItem.amount = Math.max(0, invItem.amount - deduct);
          newInventory[invIdx] = invItem;
          updatedCount++;
        }
      }
    }
  });

  return { newInventory, updatedCount };
};

export interface UnitDiscrepancy {
  item: string;
  unitDishMap: Record<string, string[]>;
  allUnits: string[];
  allDishes: string[];
}

export const checkUnitConsistency = (dishes: Dish[]): UnitDiscrepancy[] => {
  const itemData: Record<string, { unitDishMap: Record<string, string[]>, allUnits: Set<string>, allDishes: Set<string> }> = {};

  dishes.forEach(dish => {
    dish.ingredients.forEach(ing => {
      const normalizedItem = normalizeItemName(ing.item);
      if (!itemData[normalizedItem]) {
        itemData[normalizedItem] = { unitDishMap: {}, allUnits: new Set(), allDishes: new Set() };
      }
      
      const unit = normalizeUnit(ing.unit);
      if (!itemData[normalizedItem].unitDishMap[unit]) {
        itemData[normalizedItem].unitDishMap[unit] = [];
      }
      if (!itemData[normalizedItem].unitDishMap[unit].includes(dish.name)) {
        itemData[normalizedItem].unitDishMap[unit].push(dish.name);
      }
      
      itemData[normalizedItem].allUnits.add(unit);
      itemData[normalizedItem].allDishes.add(dish.name);
    });
  });

  const discrepancies: UnitDiscrepancy[] = [];
  for (const [item, data] of Object.entries(itemData)) {
    if (data.allUnits.size > 1) {
      discrepancies.push({
        item,
        unitDishMap: data.unitDishMap,
        allUnits: Array.from(data.allUnits),
        allDishes: Array.from(data.allDishes)
      });
    }
  }

  return discrepancies;
};

export const getStandardUnit = (itemName: string, dishes: Dish[]): string => {
  const units: Record<string, number> = {};
  dishes.forEach(dish => {
    dish.ingredients.forEach(ing => {
      if (isIngredientMatch(itemName, ing.item)) {
        const u = normalizeUnit(ing.unit);
        units[u] = (units[u] || 0) + 1;
      }
    });
  });

  const sorted = Object.entries(units).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : 'عدد';
};
