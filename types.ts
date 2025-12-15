
export interface Ingredient {
  item: string;
  amount: string;
}

export type DishCategory = 
  | 'stew' 
  | 'polo' 
  | 'kabab' 
  | 'ash' 
  | 'soup' 
  | 'kuku' 
  | 'dolma' 
  | 'local' 
  | 'nani' 
  | 'fastfood'
  | 'dessert'
  | 'international'
  | 'other';

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  description: string;
  ingredients: Ingredient[];
  recipeSteps: string[];
  imageUrl?: string;
  hasRealData?: boolean;
  nationality?: string; // New field for international dishes (e.g., 'tr', 'ar', 'it')
}

export interface DayPlan {
  dayName: string;
  dish: Dish;
  sideDish?: Dish;
}

export const DAYS_OF_WEEK = [
  'شنبه',
  'یک‌شنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه',
];

export const CATEGORY_LABELS: Record<DishCategory, string> = {
  stew: 'خورش‌ها',
  polo: 'پلو و چلو',
  kabab: 'کباب‌ها',
  ash: 'آش‌ها',
  soup: 'سوپ‌ها',
  kuku: 'کوکو و املت',
  dolma: 'دلمه و کوفته',
  local: 'غذاهای محلی',
  nani: 'نانی و خوراک',
  fastfood: 'ساندویچ و فست‌فود',
  dessert: 'دسر',
  international: 'غذاهای ملل',
  other: 'سایر'
};

export interface ShoppingItem {
  id: string;
  name: string;
  amount?: string;
  checked: boolean;
  fromRecipe?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bannedCategories?: DishCategory[];
  requiredKeywords?: string[];
  bannedKeywords?: string[]; // Added this new field
}

export interface UserProfile {
  username: string;
  fullName: string; 
  passwordCode: string; 
  email?: string; // New
  phoneNumber?: string; // New
  avatar?: string; // New for Google profile pic
  subscriptionExpiry: number; 
  blacklistedDishIds: string[]; 
  excludedCategories: DishCategory[]; 
  history: string[]; 
  familySize: number;
  isAdmin?: boolean;
  dietMode?: boolean; 
  activeChallengeId?: string; 
  customShoppingList?: ShoppingItem[]; 
}