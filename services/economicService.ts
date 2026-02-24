
import { collection, getDocs, setDoc, doc, deleteDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { IngredientPrice, Dish, UserProfile } from "../types";

let priceCache: Record<string, IngredientPrice> = {};
let isInitialized = false;

export const EconomicService = {
  initialize: async (force = false) => {
    if (isInitialized && !force) return;
    try {
      const snapshot = await getDocs(collection(db, "ingredient_prices"));
      const newCache: Record<string, IngredientPrice> = {};
      snapshot.docs.forEach(d => {
        const data = d.data() as IngredientPrice;
        const id = data.id || d.id;
        newCache[id] = { ...data, id };
      });
      priceCache = newCache;
      isInitialized = true;
    } catch (e) {
      console.error("Failed to initialize EconomicService", e);
    }
  },

  getAllPrices: async (force = false): Promise<IngredientPrice[]> => {
    await EconomicService.initialize(force);
    return Object.values(priceCache).sort((a, b) => a.name.localeCompare(b.name, 'fa'));
  },

  updatePrice: async (price: IngredientPrice) => {
    await setDoc(doc(db, "ingredient_prices", price.id), price);
    priceCache[price.id] = price;
  },

  updatePricesBatch: async (prices: IngredientPrice[]) => {
    const batch = writeBatch(db);
    prices.forEach(p => {
      const ref = doc(db, "ingredient_prices", p.id);
      batch.set(ref, p);
      priceCache[p.id] = p;
    });
    await batch.commit();
  },

  deletePrice: async (id: string) => {
    if (!id) return;
    await deleteDoc(doc(db, "ingredient_prices", id));
    delete priceCache[id];
  },

  clearAllPrices: async () => {
    const snapshot = await getDocs(collection(db, "ingredient_prices"));
    const batch = writeBatch(db);
    snapshot.docs.forEach(d => {
      batch.delete(d.ref);
    });
    await batch.commit();
    priceCache = {};
    isInitialized = false;
  },

  calculateDishCost: (dish: Dish): { totalCost: number; accuracy: number } => {
    let total = 0;
    let matchedCount = 0;
    
    if (!dish.ingredients || dish.ingredients.length === 0) return { totalCost: 0, accuracy: 0 };

    const pricesArray = Object.values(priceCache);

    dish.ingredients.forEach(ing => {
      const searchName = ing.item.trim().toLowerCase();
      const priceObj = pricesArray.find(p => p.name.trim().toLowerCase() === searchName);
      
      if (priceObj) {
        let amount = ing.amount;
        const pUnit = priceObj.unit;
        const iUnit = ing.unit;

        if (iUnit === 'گرم' && pUnit === 'کیلوگرم') {
          amount = amount / 1000;
        } else if (iUnit === 'کیلوگرم' && pUnit === 'گرم') {
          amount = amount * 1000;
        } else if (iUnit === 'میلی‌لیتر' && pUnit === 'لیتر') {
          amount = amount / 1000;
        } else if (iUnit === 'لیتر' && pUnit === 'میلی‌لیتر') {
          amount = amount * 1000;
        }
        
        total += amount * priceObj.price;
        matchedCount++;
      }
    });

    const accuracy = (matchedCount / dish.ingredients.length) * 100;
    return { totalCost: Math.round(total), accuracy: Math.round(accuracy) };
  },

  enrichDishWithEconomicData: (dish: Dish, user: UserProfile | null): Dish => {
    const { totalCost, accuracy } = EconomicService.calculateDishCost(dish);
    const costPerServing = Math.round(totalCost / 4); 
    
    let economicLabel: 'economic' | 'balanced' | 'expensive' | undefined = undefined;

    if (user && user.monthlyFoodBudget && user.householdSize) {
      const budgetPerMeal = user.monthlyFoodBudget / 30 / user.householdSize;
      
      if (costPerServing <= budgetPerMeal) {
        economicLabel = 'economic';
      } else if (costPerServing <= budgetPerMeal * 1.5) {
        economicLabel = 'balanced';
      } else {
        economicLabel = 'expensive';
      }
    }

    return {
      ...dish,
      totalCost,
      costPerServing,
      economicLabel,
      accuracyPercent: accuracy
    };
  }
};
