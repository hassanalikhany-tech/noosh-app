
import { Dish } from '../types';

export const RUSSIAN_DISHES: Dish[] = [
  { "id": "ru-1", "nationality": "ru", "name": "Borscht (بورش روسی)", "category": "international", "description": "سوپ قرمز با چغندر و خامه ترش", "ingredients": [{ "item": "چغندر", "amount": 2, "unit": "عدد" }], "recipeSteps": ["چغندر و سبزیجات را بپزید.", "با خامه ترش سرو کنید."] },
  { "id": "ru-2", "nationality": "ru", "name": "Beef Stroganoff (بیف استروگانف روسی)", "category": "international", "description": "نوارهای گوشت گوساله در سس خامه و قارچ", "ingredients": [{ "item": "فیله گوساله", "amount": 400, "unit": "گرم" }], "recipeSteps": ["گوشت را تفت دهید.", "با سس خامه و قارچ بپزید."] },
  { "id": "ua-1", "nationality": "ua", "name": "Vareniki (وارنیکی اوکراینی)", "category": "international", "description": "دامپلینگ‌های پر شده با سیب‌زمینی یا آلبالو", "ingredients": [{ "item": "سیب زمینی", "amount": 3, "unit": "عدد" }], "recipeSteps": ["سیب زمینی را بپزید و لای خمیر بگذارید.", "در آب جوش بپزید."] }
];
