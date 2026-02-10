
export interface Ingredient {
  item: string;
  amount: number;
  unit: string;
}

export type DishCategory =
  | 'ash' 
  | 'polo' 
  | 'khorak' 
  | 'stew' 
  | 'soup' 
  | 'fastfood'
  | 'kabab'
  | 'international'
  | 'dessert';

export type NatureType = 'hot' | 'cold' | 'balanced';

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  description: string;
  ingredients: Ingredient[];
  recipeSteps: string[];
  imageUrl?: string;
  hasRealData?: boolean;
  nationality?: string;
  nature?: NatureType;
  mosleh?: string;
  calories?: number;
  cookTime?: number;
  difficulty?: string;
  natureLabel?: string;
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
  ash: 'آش',
  polo: 'پلو',
  khorak: 'خوراک',
  stew: 'خورش',
  soup: 'سوپ',
  fastfood: 'فست فود',
  kabab: 'کباب',
  international: 'بین المللی',
  dessert: 'پیش‌غذا و دسر'
};

export interface ShoppingItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
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
  bannedKeywords?: string[];
}

export interface PaymentRecord {
  date: number;
  amount: number;
  referenceId: string;
}

export interface AppConfig {
  subscriptionFee: number;
  commissionRate: number; // به صورت درصد مثلا 20
}

export interface UserProfile {
  uid: string;
  username: string;
  fullName: string; 
  passwordCode: string; 
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  subscriptionExpiry: number; 
  blacklistedDishIds: string[]; 
  favoriteDishIds: string[];
  dislikedIngredients: string[];
  excludedCategories: DishCategory[]; 
  excludedNationalities?: string[];
  preferredNatures: NatureType[];
  history: string[];
  familySize: number;
  isAdmin?: boolean;
  isApproved?: boolean; 
  isDeleted?: boolean; 
  isVisitor?: boolean; 
  dietMode?: boolean; 
  activeChallengeId?: string | null; 
  customShoppingList?: ShoppingItem[]; 
  hasCompletedSetup?: boolean;
  onlyFavoritesMode?: boolean;
  meatlessMode?: boolean;
  quickMealsMode?: boolean;
  weeklyPlan?: DayPlan[]; 
  currentSessionId?: string;
  registeredDevices?: string[]; 
  isBiometricEnabled?: boolean;
  referralCode: string;
  referredBy?: string;
  referralBalance: number; 
  referralTotalEarned: number; 
  referralCount: number;
  paymentHistory?: PaymentRecord[]; 
}
