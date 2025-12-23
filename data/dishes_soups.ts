
import { Dish } from '../types';

export const SOUPS: Dish[] = [
  {
    "id": "soup-1",
    "name": "سوپ جو قرمز",
    "category": "soup",
    "description": "سوپ جو کلاسیک رستورانی با رب گوجه",
    "ingredients": [
      { "item": "جو پرک", "amount": 1, "unit": "پیمانه" },
      { "item": "هویج رنده شده", "amount": 1, "unit": "عدد" },
      { "item": "مرغ پخته ریش شده", "amount": 0.5, "unit": "پیمانه" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": ["جو و هویج را بپزید.", "رب تفت داده و مرغ را اضافه کنید.", "با جعفری تزیین کنید."]
  },
  {
    "id": "soup-2",
    "name": "سوپ شیر و خامه",
    "category": "soup",
    "description": "سوپ سفید غلیظ و مجلسی",
    "ingredients": [
      { "item": "جو پوست کنده پخته", "amount": 1, "unit": "پیمانه" },
      { "item": "شیر", "amount": 1, "unit": "لیتر" },
      { "item": "خامه", "amount": 2, "unit": "قاشق" },
      { "item": "قارچ", "amount": 100, "unit": "گرم" }
    ],
    "recipeSteps": ["جو و قارچ را در شیر بپزید.", "در انتها خامه را اضافه کرده و هم نزنید تا نبرد."]
  },
  { "id": "soup-3", "name": "سوپ ورمیشل", "category": "soup", "description": "سوپ رشته فرنگی سریع", "ingredients": [{ "item": "رشته سوپی", "amount": 1, "unit": "پیمانه" }, { "item": "سیب زمینی و هویج", "amount": 1, "unit": "عدد" }], "recipeSteps": ["سبزیجات را بپزید.", "رشته را در ۱۰ دقیقه آخر اضافه کنید."] },
  { "id": "soup-4", "name": "سوپ عدس (دال عدس)", "category": "soup", "description": "سوپ تند و مقوی جنوبی", "ingredients": [{ "item": "دال عدس", "amount": 1, "unit": "پیمانه" }, { "item": "سیر و پیاز", "amount": 2, "unit": "حبه" }], "recipeSteps": ["عدس را بپزید تا له شود.", "با پیازداغ و فلفل فراوان میل کنید."] },
  { "id": "soup-5", "name": "سوپ کدو حلوایی", "category": "soup", "description": "سوپ خامه‌ای و نارنجی", "ingredients": [{ "item": "کدو حلوایی پوره شده", "amount": 2, "unit": "پیمانه" }, { "item": "سیب زمینی", "amount": 1, "unit": "عدد" }], "recipeSteps": ["مواد را بپزید و میکس کنید.", "با خامه سرو کنید."] },
  { "id": "soup-6", "name": "سوپ قارچ", "category": "soup", "description": "سوپ غلیظ با طعم قارچ فراوان", "ingredients": [{ "item": "قارچ", "amount": 400, "unit": "گرم" }, { "item": "شیر", "amount": 2, "unit": "پیمانه" }], "recipeSteps": ["قارچ را تفت دهید.", "با آرد و شیر غلیظ کنید."] },
  { "id": "soup-7", "name": "سوپ پیاز فرانسوی", "category": "soup", "description": "سوپ پیاز کاراملی با پنیر", "ingredients": [{ "item": "پیاز فراوان", "amount": 5, "unit": "عدد" }, { "item": "پنیر پیتزا", "amount": 100, "unit": "گرم" }], "recipeSteps": ["پیاز را طولانی تفت دهید.", "با آب گوشت بپزید و روی آن پنیر بریزید."] },
  { "id": "soup-8", "name": "سوپ سبزیجات رژیمی", "category": "soup", "description": "ترکیب کلم، هویج و کرفس", "ingredients": [{ "item": "انواع سبزیجات", "amount": 1, "unit": "کیلوگرم" }], "recipeSteps": ["همه را با آب مرغ بپزید."] },
  { "id": "soup-9", "name": "سوپ مرغ و ذرت", "category": "soup", "description": "سوپ چینی لذیذ", "ingredients": [{ "item": "ذرت", "amount": 1, "unit": "پیمانه" }, { "item": "مرغ", "amount": 1, "unit": "تکه" }], "recipeSteps": ["مرغ و ذرت را بپزید.", "با تخم مرغ غلیظ کنید."] },
  { "id": "soup-10", "name": "سوپ بروکلی", "category": "soup", "description": "سوپ سبز و سالم", "ingredients": [{ "item": "کلم بروکلی", "amount": 300, "unit": "گرم" }, { "item": "خامه", "amount": 1, "unit": "قاشق" }], "recipeSteps": ["بروکلی را بپزید و میکس کنید."] }
];
