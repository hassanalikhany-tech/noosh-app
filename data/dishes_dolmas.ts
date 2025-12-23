
import { Dish } from '../types';

export const DOLMAS: Dish[] = [
  {
    "id": "dolma-1",
    "name": "دلمه برگ مو (مجلسی)",
    "category": "dolma",
    "description": "دلمه با چاشنی ملس سرکه و شیره",
    "ingredients": [
      { "item": "برگ مو تازه", "amount": 50, "unit": "عدد" },
      { "item": "برنج", "amount": 1, "unit": "پیمانه" },
      { "item": "لپه", "amount": 0.5, "unit": "پیمانه" },
      { "item": "گوشت چرخ‌کرده", "amount": 200, "unit": "گرم" },
      { "item": "سبزی دلمه", "amount": 300, "unit": "گرم" }
    ],
    "recipeSteps": ["مواد میانی را نیم‌پز و تفت دهید.", "داخل برگ‌ها بپیچید.", "با سس سرکه و شیره بپزید."]
  },
  {
    "id": "dolma-2",
    "name": "کوفته تبریزی اصیل",
    "category": "dolma",
    "description": "کوفته بزرگ با مغز آلو، گردو و پیاز داغ",
    "ingredients": [
      { "item": "گوشت چرخ‌کرده", "amount": 500, "unit": "گرم" },
      { "item": "لپه و برنج له شده", "amount": 1, "unit": "پیمانه" },
      { "item": "تخم مرغ", "amount": 1, "unit": "عدد" },
      { "item": "سبزی کوفته", "amount": 200, "unit": "گرم" }
    ],
    "recipeSteps": ["مواد را بسیار ورز دهید تا چسبنده شود.", "گلوله‌های بزرگ درست کرده و مغز بگذارید.", "در سس گوجه به آرامی بپزید."]
  },
  {
    "id": "dolma-3",
    "name": "دلمه بادمجان و فلفل",
    "category": "dolma",
    "description": "دلمه رنگارنگ فلفل دلمه‌ای، بادمجان و گوجه",
    "ingredients": [
      { "item": "بادمجان و فلفل و گوجه", "amount": 6, "unit": "عدد" },
      { "item": "مایه دلمه", "amount": 1, "unit": "واحد" }
    ],
    "recipeSteps": ["داخل سبزیجات را خالی کنید.", "با مایه دلمه پر کنید.", "در سس رب گوجه بپزید."]
  },
  { "id": "dolma-4", "name": "کوفته برنجی", "category": "dolma", "description": "کوفته سنتی با برنج فراوان", "ingredients": [{ "item": "برنج", "amount": 2, "unit": "پیمانه" }, { "item": "گوشت", "amount": 200, "unit": "گرم" }], "recipeSteps": ["مواد را مخلوط و گرد کنید.", "بپزید."] },
  { "id": "dolma-5", "name": "دلمه کدو سبز", "category": "dolma", "description": "دلمه سبک و تابستانی", "ingredients": [{ "item": "کدو سبز درشت", "amount": 5, "unit": "عدد" }, { "item": "مایه دلمه", "amount": 1, "unit": "واحد" }], "recipeSteps": ["کدو را خالی و پر کنید."] },
  { "id": "dolma-6", "name": "کوفته سبزی شیرازی", "category": "dolma", "description": "کوفته معطر با سبزیجات فراوان", "ingredients": [{ "item": "سبزی معطر", "amount": 500, "unit": "گرم" }, { "item": "برنج و نخودچی", "amount": 1, "unit": "پیمانه" }], "recipeSteps": ["سبزی را با گوشت و برنج ورز دهید.", "بپزید."] },
  { "id": "dolma-7", "name": "دلمه کلم برگ", "category": "dolma", "description": "دلمه شیرین یا ملس با کلم سفید", "ingredients": [{ "item": "کلم برگ", "amount": 1, "unit": "عدد" }, { "item": "مایه دلمه", "amount": 1, "unit": "واحد" }], "recipeSteps": ["کلم را در آب جوش نرم کنید.", "بپیچید و بپزید."] },
  { "id": "dolma-8", "name": "کوفته نخودچی (اراک)", "category": "dolma", "description": "کوفته ساده با آرد نخودچی", "ingredients": [{ "item": "گوشت", "amount": 300, "unit": "گرم" }, { "item": "آرد نخودچی", "amount": 1, "unit": "پیمانه" }], "recipeSteps": ["ورز دهید و در سس بپزید."] },
  { "id": "dolma-9", "name": "دلمه پیاز", "category": "dolma", "description": "دلمه متفاوت و لذیذ با پیاز سفید", "ingredients": [{ "item": "پیاز بزرگ", "amount": 4, "unit": "عدد" }, { "item": "مایه دلمه", "amount": 1, "unit": "واحد" }], "recipeSteps": ["لایه‌های پیاز را جدا کنید.", "پر کرده و بپزید."] },
  { "id": "dolma-10", "name": "کوفته هلو (شیراز)", "category": "dolma", "description": "کوفته با طعم ملس و گوشت مرغ یا گوسفند", "ingredients": [{ "item": "گوشت", "amount": 300, "unit": "گرم" }, { "item": "هویج رنده شده", "amount": 2, "unit": "عدد" }], "recipeSteps": ["مانند کوفته بپزید."] }
];
