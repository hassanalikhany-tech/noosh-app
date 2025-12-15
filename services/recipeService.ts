
import { Dish } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { getHiddenDishIds, getRenamedDishes } from '../utils/dishStorage';

export const RecipeService = {
  // No async initialization needed anymore
  initialize: async (): Promise<void> => {
    return Promise.resolve();
  },

  getAllDishes: (): Dish[] => {
    const hiddenIds = getHiddenDishIds();
    const renamedMap = getRenamedDishes();

    // Filter out hidden dishes first
    const visibleDishes = DEFAULT_DISHES.filter(d => !hiddenIds.includes(d.id)) || [];

    // Apply renames
    return visibleDishes.map(dish => {
        if (renamedMap[dish.id]) {
            return { ...dish, name: renamedMap[dish.id] };
        }
        return dish;
    });
  },

  // Stub for compatibility
  importDatabase: async () => {
    return { success: true, count: 0, message: '' };
  },

  resetToDefault: async () => {
    // No-op
  }
};
