
import { Dish } from '../types';

export const KUKUS: Dish[] = [
  {
    "id": "kuku-1",
    "name": "کوکو سبزی مجلسی",
    "category": "kuku",
    "description": "کوکو سبزی با مغز گردو و زرشک",
    "ingredients": [
      { "item": "سبزی کوکو", "amount": 500, "unit": "گرم" },
      { "item": "تخم مرغ", "amount": 5, "unit": "عدد" },
      { "item": "گردو خرد شده", "amount": 3, "unit": "قاشق" },
      { "item": "زرشک", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": ["سبزی را با تخم مرغ و ادویه بزنید.", "گردو و زرشک را اضافه کنید.", "در تابه با روغن داغ سرخ کنید."]
  },
  {
    "id": "kuku-2",
    "name": "کوکو سیب‌زمینی (پخته)",
    "category": "kuku",
    "description": "کوکو سیب‌زمینی سنتی و نرم",
    "ingredients": [
      { "item": "سیب زمینی پخته", "amount": 4, "unit": "عدد" },
      { "item": "تخم مرغ", "amount": 3, "unit": "عدد" },
      { "item": "پیاز رنده شده", "amount": 1, "unit": "عدد" }
    ],
    "recipeSteps": ["سیب زمینی را له کنید.", "با پیاز و تخم مرغ مخلوط کنید.", "به شکل دایره سرخ کنید."]
  },
  {
    "id": "kuku-3",
    "name": "کتلت گوشت کلاسیک",
    "category": "kuku",
    "description": "کتلت ترد با گوشت و سیب زمینی خام",
    "ingredients": [
      { "item": "گوشت چرخ‌کرده", "amount": 300, "unit": "گرم" },
      { "item": "سیب زمینی خام رنده شده", "amount": 3, "unit": "عدد" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" },
      { "item": "آرد نخودچی", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": ["آب سیب زمینی و پیاز را بگیرید.", "با گوشت و ادویه ورز دهید.", "در روغن سرخ کنید."]
  },
  {
    "id": "kuku-4",
    "name": "کوکو دورنگ",
    "category": "kuku",
    "description": "ترکیب زیبای کوکو سبزی و کوکو سیب زمینی",
    "ingredients": [
      { "item": "مایه کوکو سبزی", "amount": 1, "unit": "واحد" },
      { "item": "مایه کوکو سیب زمینی", "amount": 1, "unit": "واحد" }
    ],
    "recipeSteps": ["ابتدا یک لایه را سرخ کنید.", "لایه دوم را روی آن بریزید و درب تابه را بگذارید."]
  },
  {
    "id": "kuku-5",
    "name": "کوکو لوبیا سبز (تبریزی)",
    "category": "kuku",
    "description": "کوکو مجلسی و بسیار مقوی",
    "ingredients": [
      { "item": "لوبیا سبز خرد شده", "amount": 2, "unit": "پیمانه" },
      { "item": "هویج نگینی", "amount": 0.5, "unit": "پیمانه" },
      { "item": "سیب زمینی نگینی", "amount": 0.5, "unit": "پیمانه" },
      { "item": "تخم مرغ", "amount": 4, "unit": "عدد" }
    ],
    "recipeSteps": ["همه مواد را جدا پخته یا سرخ کنید.", "با تخم مرغ مخلوط و سرخ کنید."]
  },
  { "id": "kuku-6", "name": "کوکو کدو سبز", "category": "kuku", "description": "کوکو رژیمی و سبک", "ingredients": [{ "item": "کدو سبز رنده شده", "amount": 4, "unit": "عدد" }, { "item": "تخم مرغ", "amount": 3, "unit": "عدد" }, { "item": "شوید", "amount": 2, "unit": "قاشق" }], "recipeSteps": ["آب کدو را بگیرید.", "با مواد مخلوط و سرخ کنید."] },
  { "id": "kuku-7", "name": "شامی پوک (گیلانی)", "category": "kuku", "description": "شامی ترد با لپه و گوشت", "ingredients": [{ "item": "گوشت پخته", "amount": 200, "unit": "گرم" }, { "item": "لپه پخته", "amount": 200, "unit": "گرم" }, { "item": "تخم مرغ", "amount": 2, "unit": "عدد" }], "recipeSteps": ["گوشت و لپه را چرخ کنید.", "با تخم مرغ ورز داده و در روغن سرخ کنید."] },
  { "id": "kuku-8", "name": "کوکو بادمجان", "category": "kuku", "description": "کوکو با طعم بادمجان کبابی", "ingredients": [{ "item": "بادمجان کبابی", "amount": 3, "unit": "عدد" }, { "item": "تخم مرغ", "amount": 3, "unit": "عدد" }, { "item": "سیر", "amount": 2, "unit": "حبه" }], "recipeSteps": ["بادمجان را ساطوری کنید.", "با سیر و تخم مرغ سرخ کنید."] },
  { "id": "kuku-9", "name": "املت گوجه‌فرنگی (قهوه‌خانه‌ای)", "category": "kuku", "description": "املت اصیل با رب و گوجه فراوان", "ingredients": [{ "item": "گوجه فرنگی", "amount": 4, "unit": "عدد" }, { "item": "رب گوجه", "amount": 1, "unit": "قاشق" }, { "item": "تخم مرغ", "amount": 3, "unit": "عدد" }], "recipeSteps": ["گوجه را سرخ کنید تا آبش کشیده شود.", "رب را تفت دهید.", "تخم مرغ را اضافه کنید."] },
  { "id": "kuku-10", "name": "نرگسی اسفناج", "category": "kuku", "description": "املت اسفناج و پیاز داغ", "ingredients": [{ "item": "اسفناج تازه", "amount": 500, "unit": "گرم" }, { "item": "پیاز داغ", "amount": 3, "unit": "قاشق" }, { "item": "تخم مرغ", "amount": 2, "unit": "عدد" }], "recipeSteps": ["اسفناج را بپزید.", "با پیازداغ تفت دهید.", "تخم مرغ را روی آن بشکنید."] },
  { "id": "kuku-11", "name": "کوکو والک", "category": "kuku", "description": "کوکو بهاری با سبزی والک", "ingredients": [{ "item": "سبزی والک", "amount": 400, "unit": "گرم" }, { "item": "تخم مرغ", "amount": 4, "unit": "عدد" }], "recipeSteps": ["والک را خرد کنید.", "مانند کوکو سبزی بپزید."] },
  { "id": "kuku-12", "name": "کتلت مرغ", "category": "kuku", "description": "کتلت سبک با سینه مرغ", "ingredients": [{ "item": "سینه مرغ چرخ شده", "amount": 300, "unit": "گرم" }, { "item": "سیب زمینی پخته", "amount": 2, "unit": "عدد" }], "recipeSteps": ["مواد را مخلوط و سرخ کنید."] },
  { "id": "kuku-13", "name": "شامی کباب (لرستان)", "category": "kuku", "description": "شامی با سس رب انار و گردو", "ingredients": [{ "item": "گوشت چرخ‌کرده", "amount": 300, "unit": "گرم" }, { "item": "رب انار", "amount": 0.5, "unit": "پیمانه" }, { "item": "گردو", "amount": 50, "unit": "گرم" }], "recipeSteps": ["کتلت‌ها را سرخ کنید.", "در سس رب انار و گردو غوطه‌ور کنید تا بپزد."] },
  { "id": "kuku-14", "name": "کوکو گل کلم", "category": "kuku", "description": "کوکو لطیف و خوشمزه", "ingredients": [{ "item": "گل کلم ریز شده", "amount": 1, "unit": "عدد کوچک" }, { "item": "تخم مرغ", "amount": 3, "unit": "عدد" }], "recipeSteps": ["گل کلم را نیم‌پز کنید.", "با تخم مرغ سرخ کنید."] },
  { "id": "kuku-15", "name": "املت شاپوری", "category": "kuku", "description": "املت گیلانی با لوبیا چیتی", "ingredients": [{ "item": "املت ساده", "amount": 1, "unit": "واحد" }, { "item": "خوراک لوبیا", "amount": 1, "unit": "کاسه" }], "recipeSteps": ["املت را کنار خوراک لوبیا سرو کنید."] }
];
