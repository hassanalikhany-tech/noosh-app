
import { Dish } from '../types';

export const USER_PROVIDED_DISHES_PART_1: Dish[] = [
  {
    "id": "user-1",
    "name": "دمپختک باقالی",
    "category": "polo",
    "description": "دمپختک زرد و سنتی با نیمرو",
    "ingredients": [
      { "item": "برنج", "amount": 3, "unit": "پیمانه" },
      { "item": "باقالی زرد خشک", "amount": 1.5, "unit": "پیمانه" },
      { "item": "زردچوبه فراوان", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": ["باقالی را بپزید.", "برنج را اضافه کرده و کته کنید.", "با نیمرو سرو کنید."]
  },
  {
    "id": "user-2",
    "name": "آبگوشت بزباش",
    "category": "local",
    "description": "آبگوشت با سبزی قرمه",
    "ingredients": [
      { "item": "گوشت گوسفندی", "amount": 400, "unit": "گرم" },
      { "item": "لوبیا قرمز", "amount": 0.5, "unit": "پیمانه" },
      { "item": "سبزی قرمه", "amount": 200, "unit": "گرم" }
    ],
    "recipeSteps": ["گوشت و لوبیا را بپزید.", "سبزی تفت داده را اضافه کنید.", "سیب زمینی بریزید."]
  },
  { "id": "user-3", "name": "خورشت به آلو", "category": "stew", "description": "خورشت پاییزه ملس", "ingredients": [{ "item": "گوشت", "amount": 300, "unit": "گرم" }, { "item": "به", "amount": 2, "unit": "عدد" }], "recipeSteps": ["به را تفت دهید و در اواخر پخت گوشت اضافه کنید."] },
  { "id": "user-4", "name": "خوراک کله گنجشکی", "category": "nani", "description": "گوشت قلقلی با سیب زمینی", "ingredients": [{ "item": "گوشت چرخ‌کرده", "amount": 200, "unit": "گرم" }, { "item": "سیب زمینی", "amount": 2, "unit": "عدد" }], "recipeSteps": ["قلقلی‌ها را با سیب زمینی مکعبی در سس بپزید."] },
  { "id": "user-5", "name": "پلو یونانی", "category": "polo", "description": "پلو مخلوط با ذرت و فلفل دلمه", "ingredients": [{ "item": "برنج", "amount": 3, "unit": "پیمانه" }, { "item": "مرغ", "amount": 200, "unit": "گرم" }], "recipeSteps": ["مرغ و سبزیجات را با برنج دم کنید."] },
  { "id": "user-6", "name": "خورشت بامیه", "category": "stew", "description": "خورشت لذیذ جنوبی", "ingredients": [{ "item": "بامیه", "amount": 300, "unit": "گرم" }, { "item": "گوشت", "amount": 300, "unit": "گرم" }], "recipeSteps": ["بامیه را تفت داده و در سس گوجه و سیر بپزید."] },
  { "id": "user-7", "name": "اشکنه پیاز", "category": "nani", "description": "غذای سریع و قدیمی", "ingredients": [{ "item": "پیاز", "amount": 2, "unit": "عدد" }, { "item": "تخم مرغ", "amount": 2, "unit": "عدد" }], "recipeSteps": ["پیاز را سرخ کرده، آب بریزید و تخم مرغ بزنید."] },
  { "id": "user-8", "name": "کته کباب شمالی", "category": "kabab", "description": "کباب تابه ای با کته کره ای", "ingredients": [{ "item": "گوشت", "amount": 300, "unit": "گرم" }, { "item": "برنج", "amount": 3, "unit": "پیمانه" }], "recipeSteps": ["کباب را در تابه درست کرده و با کته سرو کنید."] },
  { "id": "user-9", "name": "ماهی گردبیج", "category": "local", "description": "ماهی شکم پر شمالی", "ingredients": [{ "item": "ماهی سفید", "amount": 1, "unit": "عدد" }, { "item": "گردو و رب انار", "amount": 1, "unit": "پیمانه" }], "recipeSteps": ["شکم ماهی را پر کرده و در فر یا قابلمه بپزید."] },
  { "id": "user-10", "name": "قنبر پلو شیرازی", "category": "polo", "description": "پلو با گوشت قلقلی و کشمش", "ingredients": [{ "item": "برنج", "amount": 3, "unit": "پیمانه" }, { "item": "گوشت", "amount": 200, "unit": "گرم" }], "recipeSteps": ["قلقلی و کشمش و رب انار را لای برنج دم کنید."] }
];
