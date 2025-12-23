import { Dish } from '../types';

export const VARIED_DISHES: Dish[] = [
  // --- آبگوشت‌ها و دیزی‌ها ---
  {
    "id": "dish-abgoosht-1",
    "name": "آبگوشت سنتی (دیزی سنگی)",
    "category": "local",
    "description": "دیزی اصیل با گوشت گوسفندی، نخود، لوبیا و دنبه",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی با استخوان و دنبه", "amount": 500, "unit": "گرم" },
      { "item": "نخود و لوبیا سفید (خیس شده)", "amount": 1, "unit": "پیمانه" },
      { "item": "پیاز", "amount": 2, "unit": "عدد" },
      { "item": "سیب زمینی", "amount": 2, "unit": "عدد" },
      { "item": "گوجه فرنگی", "amount": 2, "unit": "عدد" },
      { "item": "رب گوجه فرنگی", "amount": 2, "unit": "قاشق غذاخوری" },
      { "item": "لیمو عمانی", "amount": 2, "unit": "عدد" },
      { "item": "سیر", "amount": 2, "unit": "حبه" },
      { "item": "مرزه خشک", "amount": 1, "unit": "قاشق غذاخوری" }
    ],
    "recipeSteps": [
      "نخود و لوبیا را از شب قبل خیس کنید.",
      "گوشت، دنبه، حبوبات، یک پیاز درسته و گوجه فرنگی‌ها را با آب در قابلمه (یا ظرف سنگی) بگذارید تا کاملا بپزد (حدود ۳-۴ ساعت).",
      "سیب زمینی‌ها را شسته و اضافه کنید.",
      "دنبه را خارج کرده، با پیاز دیگر و رب گوجه و ادویه بکوبید یا تفت دهید و به آبگوشت برگردانید.",
      "لیمو عمانی و مرزه را در نیم ساعت آخر اضافه کنید.",
      "آب غذا را جداگانه با نان تلیت کنید و مواد جامد را به عنوان گوشت‌کوبیده سرو نمایید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-abgoosht-2",
    "name": "آبگوشت بزباش",
    "category": "local",
    "description": "آبگوشت سبزی‌دار سنتی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی", "amount": 500, "unit": "گرم" },
      { "item": "لوبیا قرمز (یا چشم بلبلی)", "amount": 1, "unit": "پیمانه" },
      { "item": "سبزی (تره، جعفری، شنبلیله)", "amount": 300, "unit": "گرم" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" },
      { "item": "لیمو عمانی", "amount": 3, "unit": "عدد" },
      { "item": "سیب زمینی", "amount": 2, "unit": "عدد" }
    ],
    "recipeSteps": [
      "گوشت و لوبیا و پیاز را بپزید.",
      "سبزی‌ها را خرد کرده و تفت دهید و به آبگوشت اضافه کنید.",
      "لیمو عمانی و سیب زمینی را در ساعت آخر اضافه کنید.",
      "این غذا شبیه قرمه سبزی اما آبدارتر و با سیب زمینی است."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-abgoosht-3",
    "name": "آبگوشت کشک (لرستان/اراک)",
    "category": "local",
    "description": "آبگوشت سفید مقوی با کشک",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی", "amount": 400, "unit": "گرم" },
      { "item": "نخود و لوبیا سفید", "amount": 1, "unit": "پیمانه" },
      { "item": "بادمجان سرخ شده", "amount": 2, "unit": "عدد" },
      { "item": "کشک غلیظ", "amount": 1, "unit": "پیمانه" },
      { "item": "پیاز و سیر داغ", "amount": 0, "unit": "به میزان لازم" },
      { "item": "نعناع داغ", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "گوشت و حبوبات را بپزید.",
      "بادمجان‌های سرخ شده را اضافه کنید تا له شوند.",
      "در انتها کشک را اضافه کرده و با نعناع داغ و سیر داغ تزیین و سرو کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-abgoosht-4",
    "name": "آبگوشت قنبید (قم)",
    "category": "local",
    "description": "آبگوشت سنتی قم با کلم قمری",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی", "amount": 500, "unit": "گرم" },
      { "item": "کلم قمری (قنبید) (درشت)", "amount": 2, "unit": "عدد" },
      { "item": "نخود و لوبیا سفید", "amount": 1, "unit": "پیمانه" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" }
    ],
    "recipeSteps": [
      "گوشت و حبوبات را بپزید.",
      "کلم قمری‌ها را پوست گرفته و مکعبی خرد کنید و به غذا اضافه کنید.",
      "رب گوجه تفت داده شده و ادویه را اضافه کرده و بگذارید جا بیفتد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-abgoosht-5",
    "name": "آبگوشت مرغ",
    "category": "local",
    "description": "دیزی سبک با گوشت مرغ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "مرغ کامل یا ران و سینه", "amount": 800, "unit": "گرم" },
      { "item": "نخود و لوبیا چیتی", "amount": 1, "unit": "پیمانه" },
      { "item": "سیب زمینی", "amount": 2, "unit": "عدد" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "حبوبات را جداگانه نیم‌پز کنید.",
      "مرغ را با پیاز و ادویه تفت داده و با حبوبات و آب بپزید.",
      "سیب زمینی و رب گوجه را اضافه کنید تا جا بیفتد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-abgoosht-6",
    "name": "آبگوشت غوره",
    "category": "local",
    "description": "آبگوشت با طعم ترش غوره",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی", "amount": 500, "unit": "گرم" },
      { "item": "نخود و لوبیا", "amount": 1, "unit": "پیمانه" },
      { "item": "غوره تازه یا فریز شده", "amount": 0.5, "unit": "پیمانه" },
      { "item": "سیب زمینی", "amount": 2, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 1, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "مانند آبگوشت سنتی گوشت و حبوبات را بپزید.",
      "در 45 دقیقه آخر غوره و سیب زمینی را اضافه کنید تا طعم ترشی به خورد غذا برود."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-abgoosht-7",
    "name": "آبگوشت لپه و لیمو",
    "category": "local",
    "description": "آبگوشت سریع و خوش‌عطر",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی", "amount": 400, "unit": "گرم" },
      { "item": "لپه", "amount": 1, "unit": "پیمانه" },
      { "item": "لیمو عمانی", "amount": 4, "unit": "عدد" },
      { "item": "سیب زمینی", "amount": 2, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "گوشت و پیاز را تفت دهید و بپزید.",
      "لپه خیس خورده را اضافه کنید (لپه زودتر از نخود می‌پزد).",
      "لیمو عمانی و سیب زمینی را اضافه کرده و نمک و فلفل بزنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-abgoosht-8",
    "name": "آبگوشت باغی (کرمانشاه)",
    "category": "local",
    "description": "آبگوشت با انواع میوه‌های خشک",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی", "amount": 500, "unit": "گرم" },
      { "item": "نخود و لوبیا", "amount": 1, "unit": "پیمانه" },
      { "item": "میوه خشک (آلو، زردآلو، سیب، گیلاس)", "amount": 1, "unit": "پیمانه" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" }
    ],
    "recipeSteps": [
      "گوشت و حبوبات را بپزید.",
      "میوه‌های خشک را شسته و در ساعت آخر پخت اضافه کنید تا طعم ملس و لذیذی به آبگوشت بدهد."
    ],
    "hasRealData": true
  },

  // --- خوراک‌های نانی ---
  {
    "id": "dish-nani-1",
    "name": "تاس‌کباب",
    "category": "nani",
    "description": "خوراک لایه‌ای گوشت و سبزیجات",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت گوسفندی ورقه شده", "amount": 400, "unit": "گرم" },
      { "item": "پیاز حلقه شده", "amount": 2, "unit": "عدد" },
      { "item": "سیب زمینی حلقه شده", "amount": 2, "unit": "عدد" },
      { "item": "هویج حلقه شده", "amount": 2, "unit": "عدد" },
      { "item": "به حلقه شده", "amount": 1, "unit": "عدد" },
      { "item": "آلو بخارا", "amount": 10, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "کف قابلمه کمی روغن ریخته و به ترتیب: پیاز، گوشت، هویج، به، آلو و سیب زمینی را لایه لایه بچینید.",
      "سس شامل آب، رب گوجه، نمک، فلفل و دارچین را روی مواد بریزید.",
      "درب قابلمه را بسته و اجازه دهید با حرارت ملایم ۳-۴ ساعت بپزد تا آب آن غلیظ شود."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-2",
    "name": "کله‌جوش",
    "category": "nani",
    "description": "غذای فوری و مقوی با کشک و گردو",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "کشک غلیظ", "amount": 2, "unit": "پیمانه" },
      { "item": "گردو خرد شده", "amount": 0.5, "unit": "پیمانه" },
      { "item": "پیاز داغ فراوان", "amount": 3, "unit": "قاشق" },
      { "item": "نعناع خشک", "amount": 2, "unit": "قاشق" },
      { "item": "سیر داغ", "amount": 1, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "پیاز داغ، سیر داغ، نعناع و گردو را کمی تفت دهید.",
      "کشک را با کمی آب رقیق کرده و اضافه کنید.",
      "اجازه دهید ۱۵ دقیقه بجوشد (نباید زیاد بجوشد که کشک ببرد). با نان سنگک خشک سرو کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-3",
    "name": "اشکنه سنتی (پیاز)",
    "category": "nani",
    "description": "غذای قدیمی و سریع ایرانی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "پیاز (درشت)", "amount": 2, "unit": "عدد" },
      { "item": "تخم مرغ", "amount": 3, "unit": "عدد" },
      { "item": "شنبلیله خشک", "amount": 1, "unit": "قاشق" },
      { "item": "آرد", "amount": 1, "unit": "قاشق" },
      { "item": "سیب زمینی نگینی", "amount": 2, "unit": "عدد" },
      { "item": "رب گوجه (اختیاری)", "amount": 1, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "پیاز را خلالی کرده و طلایی کنید. آرد و شنبلیله را تفت دهید.",
      "آب و سیب زمینی را اضافه کنید تا سیب زمینی بپزد.",
      "تخم مرغ‌ها را داخل غذا بشکنید و هم نزنید تا خودش را بگیرد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-4",
    "name": "اشکنه کشک",
    "category": "nani",
    "description": "اشکنه با طعم کشک",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "پیاز داغ", "amount": 3, "unit": "قاشق" },
      { "item": "کشک ساییده", "amount": 1, "unit": "پیمانه" },
      { "item": "تخم مرغ", "amount": 2, "unit": "عدد" },
      { "item": "نعناع خشک", "amount": 1, "unit": "قاشق" },
      { "item": "گردو", "amount": 0, "unit": "به میزان دلخواه" }
    ],
    "recipeSteps": [
      "پیاز داغ و نعناع را تفت دهید. آب اضافه کنید.",
      "کشک را اضافه کرده و قبل از جوشیدن زیاد، تخم مرغ‌ها را اضافه کنید تا سفت شوند."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-5",
    "name": "واویشکا گوشت",
    "category": "nani",
    "description": "خوراک شمالی تند و لذیذ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت چرخ‌کرده یا تکه‌ای ریز", "amount": 300, "unit": "گرم" },
      { "item": "پیاز", "amount": 2, "unit": "عدد" },
      { "item": "گوجه فرنگی", "amount": 4, "unit": "عدد" },
      { "item": "سیر", "amount": 2, "unit": "حبه" },
      { "item": "رب گوجه", "amount": 1, "unit": "قاشق" },
      { "item": "تخم مرغ (اختیاری)", "amount": 2, "unit": "عدد" }
    ],
    "recipeSteps": [
      "پیاز و سیر را تفت دهید. گوشت را اضافه کرده و سرخ کنید.",
      "گوجه خرد شده و رب را اضافه کنید و در ظرف را بگذارید تا جا بیفتد.",
      "در انتها می‌توانید تخم مرغ را روی آن بشکنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-6",
    "name": "واویشکا مرغ",
    "category": "nani",
    "description": "واویشکا با سینه مرغ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "سینه مرغ نگینی", "amount": 400, "unit": "گرم" },
      { "item": "پیاز", "amount": 2, "unit": "عدد" },
      { "item": "فلفل دلمه‌ای", "amount": 1, "unit": "عدد" },
      { "item": "گوجه فرنگی", "amount": 3, "unit": "عدد" },
      { "item": "زعفران", "amount": 0, "unit": "به میزان لازم" }
    ],
    "recipeSteps": [
      "مرغ نگینی را با پیاز تفت دهید. فلفل دلمه‌ای را اضافه کنید.",
      "گوجه و ادویه را اضافه کرده و بگذارید با آب گوجه بپزد و به روغن بیفتد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-7",
    "name": "جغور بغور",
    "category": "nani",
    "description": "خوراک جگر سنتی (حسرت‌الملوک)",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "جگر سفید و سیاه گوسفندی", "amount": 500, "unit": "گرم" },
      { "item": "پیاز فراوان", "amount": 3, "unit": "عدد" },
      { "item": "رب گوجه یا گوجه فرنگی", "amount": 2, "unit": "قاشق" },
      { "item": "سیب زمینی نگینی (اختیاری)", "amount": 2, "unit": "عدد" }
    ],
    "recipeSteps": [
      "جگر سفید را دیرپزتر است، ابتدا با کمی آب بپزید و خرد کنید.",
      "پیاز را تفت دهید، جگر سیاه و سفید خرد شده را اضافه کنید و تفت دهید.",
      "ادویه و رب را اضافه کنید. سیب زمینی سرخ شده را کنار آن سرو کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-8",
    "name": "خوراک لوبیا چیتی",
    "category": "nani",
    "description": "خوراک لوبیا گرم و غلیظ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "لوبیا چیتی", "amount": 2, "unit": "پیمانه" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" },
      { "item": "قارچ (اختیاری)", "amount": 5, "unit": "عدد" },
      { "item": "سیب زمینی (اختیاری)", "amount": 1, "unit": "عدد" },
      { "item": "آبلیمو و گلپر", "amount": 0, "unit": "به میزان لازم" }
    ],
    "recipeSteps": [
      "لوبیا را که خیس کرده‌اید بپزید.",
      "پیاز داغ و رب تفت داده شده را اضافه کنید.",
      "سیب زمینی و قارچ را اضافه کرده و بگذارید لعاب بیندازد. با گلپر سرو کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-9",
    "name": "عدسی",
    "category": "nani",
    "description": "خوراک عدس مقوی (صبحانه یا شام)",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "عدس", "amount": 2, "unit": "پیمانه" },
      { "item": "پیاز داغ", "amount": 3, "unit": "قاشق" },
      { "item": "آرد (برای لعاب)", "amount": 1, "unit": "قاشق" },
      { "item": "سیب زمینی", "amount": 1, "unit": "عدد" },
      { "item": "گلپر و نمک", "amount": 0, "unit": "به میزان لازم" }
    ],
    "recipeSteps": [
      "عدس را بپزید. سیب زمینی را نگینی یا درسته (برای له کردن) اضافه کنید.",
      "پیاز داغ و آرد تفت داده شده را اضافه کنید تا غلیظ شود."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-10",
    "name": "نرگسی اسفناج",
    "category": "nani",
    "description": "خوراک اسفناج و تخم مرغ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "اسفناج تازه", "amount": 500, "unit": "گرم" },
      { "item": "پیاز", "amount": 2, "unit": "عدد" },
      { "item": "تخم مرغ", "amount": 3, "unit": "عدد" },
      { "item": "سیر", "amount": 2, "unit": "حبه" }
    ],
    "recipeSteps": [
      "پیاز را تفت دهید. اسفناج خرد شده را اضافه کنید تا آبش کشیده شود.",
      "سیر را اضافه کنید. تخم مرغ‌ها را روی اسفناج بشکنید و درب تابه را بگذارید تا ببندد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-11",
    "name": "دوپیازه آلو شیرازی",
    "category": "nani",
    "description": "خوراک سیب زمینی و پیاز",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "سیب زمینی (آلو)", "amount": 4, "unit": "عدد" },
      { "item": "پیاز", "amount": 3, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 1, "unit": "قاشق" },
      { "item": "نعناع خشک", "amount": 1, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "سیب زمینی‌ها را آب‌پز و مکعبی خرد کنید.",
      "پیاز خلالی فراوان را طلایی کنید. رب و نعناع را تفت دهید.",
      "سیب زمینی را اضافه کرده و مخلوط کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-12",
    "name": "دال عدس (جنوبی)",
    "category": "nani",
    "description": "خوراک تند عدس قرمز",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "عدس قرمز (دال)", "amount": 1.5, "unit": "پیمانه" },
      { "item": "سیر", "amount": 4, "unit": "حبه" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" },
      { "item": "تمر هندی", "amount": 0.25, "unit": "پیمانه" },
      { "item": "سیب زمینی", "amount": 1, "unit": "عدد" },
      { "item": "فلفل قرمز", "amount": 0, "unit": "فراوان" }
    ],
    "recipeSteps": [
      "پیاز و سیر را تفت دهید. دال عدس شسته شده و سیب زمینی را اضافه کنید.",
      "آب بریزید تا بپزد و له شود. رب و تمر هندی و فلفل را اضافه کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-13",
    "name": "سوسیس بندری",
    "category": "fastfood",
    "description": "خوراک سوسیس و سیب زمینی تند",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "سوسیس کوکتل یا آلمانی", "amount": 400, "unit": "گرم" },
      { "item": "پیاز (درشت)", "amount": 3, "unit": "عدد" },
      { "item": "سیب زمینی (نگینی سرخ شده)", "amount": 2, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 3, "unit": "قاشق" },
      { "item": "فلفل قرمز و سیاه", "amount": 0, "unit": "فراوان" }
    ],
    "recipeSteps": [
      "پیاز را خلالی درشت خرد و تفت دهید. سوسیس حلقه‌ای را اضافه و سرخ کنید.",
      "رب و ادویه‌ها را تفت دهید. سیب زمینی سرخ شده را اضافه کرده و مخلوط کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-14",
    "name": "سمبوسه",
    "category": "nani",
    "description": "سمبوسه سیب زمینی جنوبی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "نان لواش", "amount": 10, "unit": "تکه" },
      { "item": "سیب زمینی پخته", "amount": 4, "unit": "عدد" },
      { "item": "جعفری خرد شده", "amount": 1, "unit": "پیمانه" },
      { "item": "پیاز", "amount": 2, "unit": "عدد" },
      { "item": "تمرهندی یا سرکه", "amount": 0, "unit": "کمی برای مزه" },
      { "item": "فلفل قرمز", "amount": 0, "unit": "فراوان" }
    ],
    "recipeSteps": [
      "سیب زمینی پخته را له کنید. با پیاز سرخ شده، جعفری و ادویه تند مخلوط کنید.",
      "مواد را لای نان لواش پیچیده و در روغن فراوان سرخ کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-15",
    "name": "بریانی اصفهان",
    "category": "nani",
    "description": "بریان سنتی اصفهان",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "گوشت سردست و دنده", "amount": 500, "unit": "گرم" },
      { "item": "جگر سفید (شش)", "amount": 200, "unit": "گرم" },
      { "item": "پیاز", "amount": 2, "unit": "عدد" },
      { "item": "ادویه‌جات (دارچین، نعناع خشک، زعفران)", "amount": 0, "unit": "به میزان لازم" },
      { "item": "گردو و خلال بادام (برای تزیین)", "amount": 0, "unit": "به میزان لازم" }
    ],
    "recipeSteps": [
      "گوشت را با پیاز بپزید و چرخ کنید. با ادویه‌ها ورز دهید.",
      "جگر سفید را جدا بپزید و چرخ کنید.",
      "کف کفگیر مخصوص روغن و دارچین ریخته، گوشت را پهن کنید و روی حرارت بگیرید تا سرخ شود. روی نان سنگک برگردانید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-16",
    "name": "کله پاچه",
    "category": "local",
    "description": "غذای سنتی و سنگین",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "کله و پاچه گوسفند (کامل)", "amount": 1, "unit": "دست" },
      { "item": "پیاز", "amount": 3, "unit": "عدد" },
      { "item": "سیر (بوته)", "amount": 1, "unit": "بوته" },
      { "item": "ادویه‌جات (زردچوبه، فلفل سیاه، دارچین)", "amount": 0, "unit": "به میزان لازم" },
      { "item": "نخود (اختیاری)", "amount": 0.5, "unit": "پیمانه" }
    ],
    "recipeSteps": [
      "کله پاچه را بسیار تمیز بشویید.",
      "با پیاز، سیر و آب فراوان از شب تا صبح با حرارت خیلی ملایم بپزید.",
      "در انتها نمک و دارچین بزنید و با نان سنگک و آبلیمو/نارنج سرو کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-17",
    "name": "سیرابی و شیردان",
    "category": "local",
    "description": "خوراک سیرابی مقوی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "سیرابی و شیردان تمیز شده", "amount": 1, "unit": "دست" },
      { "item": "پیاز", "amount": 2, "unit": "عدد" },
      { "item": "سیر", "amount": 5, "unit": "حبه" },
      { "item": "زردچوبه و نمک", "amount": 0, "unit": "به میزان لازم" }
    ],
    "recipeSteps": [
      "سیرابی را برش زده و با پیاز و سیر و آب فراوان بپزید (زمان پخت طولانی).",
      "معمولاً با سرکه و سیر کوبیده سرو می‌شود."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-18",
    "name": "خوراک زبان",
    "category": "nani",
    "description": "خوراک زبان گوساله با سس قارچ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "زبان گوساله", "amount": 1, "unit": "عدد" },
      { "item": "پیاز و سیر و برگ بو (برای پخت)", "amount": 0, "unit": "به میزان لازم" },
      { "item": "قارچ", "amount": 200, "unit": "گرم" },
      { "item": "رب گوجه", "amount": 1, "unit": "قاشق" }
    ],
    "recipeSteps": [
      "زبان را با پیاز و برگ بو کامل بپزید (چندین ساعت). پوست آن را بکنید و حلقه کنید.",
      "سس قارچ و رب را آماده کرده و زبان‌ها را در آن تفت دهید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-19",
    "name": "خوراک مغز",
    "category": "nani",
    "description": "خوراک مغز لذیذ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "مغز گوسفند یا گوساله", "amount": 2, "unit": "عدد" },
      { "item": "پیاز", "amount": 1, "unit": "عدد" },
      { "item": "آبلیمو و جعفری (برای سرو)", "amount": 0, "unit": "به میزان لازم" },
      { "item": "نمک و زردچوبه", "amount": 0, "unit": "به میزان لازم" }
    ],
    "recipeSteps": [
      "مغز را در آب جوش انداخته و رگ و ریشه را بگیرید.",
      "با پیاز و ادویه و کمی آب بپزید (سریع می‌پزد).",
      "می‌توانید بعد از پخت، در کره تفت دهید و با آبلیمو سرو کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-20",
    "name": "سالاد الویه",
    "category": "nani",
    "description": "سالاد الویه کلاسیک",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "سیب زمینی پخته", "amount": 4, "unit": "عدد" },
      { "item": "تخم مرغ پخته", "amount": 3, "unit": "عدد" },
      { "item": "سینه مرغ پخته", "amount": 1, "unit": "عدد" },
      { "item": "خیارشور", "amount": 200, "unit": "گرم" },
      { "item": "نخود فرنگی", "amount": 0.5, "unit": "پیمانه" },
      { "item": "سس مایونز", "amount": 1, "unit": "پیمانه" }
    ],
    "recipeSteps": [
      "سیب زمینی و تخم مرغ را رنده کنید. مرغ را ریش کنید.",
      "خیارشور نگینی و نخود فرنگی را اضافه کنید.",
      "با سس مایونز، آب مرغ غلیظ شده، نمک و فلفل مخلوط کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-21",
    "name": "کشک بادمجان",
    "category": "local",
    "description": "کشک بادمجان مجلسی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "بادمجان", "amount": 5, "unit": "عدد" },
      { "item": "کشک", "amount": 1, "unit": "پیمانه" },
      { "item": "پیاز داغ", "amount": 4, "unit": "قاشق" },
      { "item": "سیر داغ", "amount": 2, "unit": "قاشق" },
      { "item": "نعناع داغ", "amount": 2, "unit": "قاشق" },
      { "item": "گردو", "amount": 0, "unit": "به میزان دلخواه" }
    ],
    "recipeSteps": [
      "بادمجان‌ها را پوست گرفته و سرخ کنید.",
      "سپس آن‌ها را کوبیده و با پیاز داغ، سیر داغ و نعناع داغ مخلوط کنید.",
      "کشک را اضافه کرده و اجازه دهید چند دقیقه بجوشد تا جا بیفتد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-22",
    "name": "میرزا قاسمی",
    "category": "local",
    "description": "میرزا قاسمی گیلانی با بادمجان کبابی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "بادمجان", "amount": 5, "unit": "عدد" },
      { "item": "گوجه فرنگی", "amount": 3, "unit": "عدد" },
      { "item": "سیر (بوته)", "amount": 1, "unit": "بوته" },
      { "item": "تخم مرغ", "amount": 3, "unit": "عدد" },
      { "item": "روغن و نمک و زردچوبه", "amount": 0, "unit": "به میزان لازم" }
    ],
    "recipeSteps": [
      "بادمجان‌ها را کبابی کنید و پوست بگیرید.",
      "سیر کوبیده را در روغن تفت دهید، بادمجان و گوجه پوست گرفته و خرد شده را اضافه کنید.",
      "تخم مرغ‌ها را اضافه کرده و مخلوط کنید تا بپزد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-23",
    "name": "باقلاقاتق",
    "category": "local",
    "description": "خورشت باقلاقاتق گیلانی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "لوبیا کشاورزی (پاچ باقلا)", "amount": 2, "unit": "پیمانه" },
      { "item": "شوید خشک", "amount": 2, "unit": "قاشق" },
      { "item": "تخم مرغ", "amount": 2, "unit": "عدد" },
      { "item": "سیر", "amount": 4, "unit": "حبه" },
      { "item": "کره یا روغن", "amount": 50, "unit": "گرم" }
    ],
    "recipeSteps": [
      "سیر و شوید را تفت دهید، باقلا پوست گرفته را اضافه کنید.",
      "آب بریزید تا بپزد. در انتها تخم مرغ را اضافه کنید تا خودش را بگیرد."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-24",
    "name": "کوکو سیب‌زمینی شکم‌پر",
    "category": "kuku",
    "description": "کوکو سیب‌زمینی با مغز گوشت و قارچ",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "سیب زمینی پخته", "amount": 4, "unit": "عدد" },
      { "item": "تخم مرغ", "amount": 2, "unit": "عدد" },
      { "item": "گوشت چرخ‌کرده", "amount": 200, "unit": "گرم" },
      { "item": "قارچ و فلفل دلمه‌ای", "amount": 1, "unit": "پیمانه" },
      { "item": "پنیر پیتزا (اختیاری)", "amount": 0, "unit": "به میزان دلخواه" }
    ],
    "recipeSteps": [
      "مایه گوشتی (مانند مایه ماکارونی) تهیه کنید.",
      "سیب زمینی پخته و له شده را با تخم مرغ مخلوط کنید.",
      "از خمیر سیب زمینی برداشته، داخلش مایه گوشتی بگذارید و ببندید، سپس سرخ کنید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-nani-25",
    "name": "پیراشکی گوشت",
    "category": "nani",
    "description": "پیراشکی گوشت خانگی",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "خمیر پیراشکی", "amount": 1, "unit": "بسته" },
      { "item": "گوشت چرخ‌کرده", "amount": 300, "unit": "گرم" },
      { "item": "قارچ", "amount": 200, "unit": "گرم" },
      { "item": "فلفل دلمه‌ای", "amount": 1, "unit": "عدد" },
      { "item": "رب گوجه", "amount": 2, "unit": "قاشق" },
      { "item": "پنیر پیتزا", "amount": 0, "unit": "به میزان دلخواه" }
    ],
    "recipeSteps": [
      "مایه گوشتی را با پیاز، قارچ و فلفل دلمه تفت دهید.",
      "مواد را داخل خمیر گذاشته، بپیچید و در روغن سرخ کنید یا در فر بپزید."
    ],
    "hasRealData": true
  },
  {
    "id": "dish-1765580062996-h4sdy-2",
    "name": "نان برنجی گیلانی (نسخه غذایی با تخم‌مرغ)",
    "category": "local",
    "description": "نان برنجی گیلانی (نسخه غذایی با تخم‌مرغ)",
    "ingredients": [
      // Fix: Converted amount strings to number and unit
      { "item": "آرد برنج", "amount": 2, "unit": "پیمانه" },
      { "item": "تخم مرغ (بزرگ)", "amount": 2, "unit": "عدد" },
      { "item": "ماست پرچرب", "amount": 0.5, "unit": "پیمانه" },
      { "item": "روغن مایع یا کره ذوب شده", "amount": 0.25, "unit": "پیمانه" },
      { "item": "شکر", "amount": 2, "unit": "قاشق غذاخوری" },
      { "item": "نمک", "amount": 1, "unit": "قاشق چای‌خوری" },
      { "item": "بیکینگ پودر", "amount": 1, "unit": "قاشق چای‌خوری" },
      { "item": "آب ولرم (در صورت نیاز)", "amount": 3, "unit": "قاشق غذاخوری" },
      { "item": "کنجد یا سیاه‌دانه (اختیاری)", "amount": 1, "unit": "قاشق غذاخوری" }
    ],
    "recipeSteps": [
      "آرد برنج، بیکینگ پودر و نمک را در یک کاسه بزرگ با هم مخلوط کنید",
      "در کاسه‌ای جداگانه، تخم مرغ‌ها را با چنگال بزنید تا از لختگی خارج شوند، سپس ماست، روغن یا کره ذوب شده و شکر را اضافه کرده و خوب هم بزنید",
      "مخلوط مواد مایع را به تدریج به مخلوط آرد اضافه کنید و با قاشق یا نوک انگشتان هم بزنید تا خمیر جمع شود",
      "اگر خمیر خیلی سفت بود و منسجم نمی‌شد، ۱ تا ۲ قاشق غذاخوری آب ولرم به آن اضافه کنید تا خمیر نرم و یکدستی به دست آید که به دست نچسبد",
      "خمیر را برای ۱۵ دقیقه در دمای محیط استراحت دهید",
      "فر را با دمای ۱۸۰ درجه سانتی‌گراد (۳۵۰ درجه فارنهایت) روشن کنید و سینی فر را با کاغذ روغنی بپوشانید",
      "از خمیر گلوله‌هایی به اندازه گردو بردارید و کمی با دست فشار دهید تا به شکل دایره‌های کوچک با ضخامت حدود نیم سانتیمتر درآیند",
      "نان‌ها را با فاصله روی سینی فر بچینید و در صورت تمایل روی هر کدام کمی کنجد یا سیاه‌دانه بپاشید",
      "نان‌ها را به مدت ۱۵ تا ۲۰ دقیقه در فر از قبل گرم شده بپزید تا لبه‌های آنها کمی طلایی شود",
      "پس از پخت، نان‌ها را از فر خارج کرده و اجازه دهید روی توری خنک شوند. این نان‌ها هم گرم و هم سرد خوشمزه هستند."
    ],
    "hasRealData": true
  }
];