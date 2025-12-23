import { Dish } from '../types';

export const DEFAULT_DISHES: Dish[] = [
  {
    "id": "stew-1",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "گوشت"
      },
      {
        "unit": "گرم",
        "item": "سبزی قورمه",
        "amount": 500
      }
    ],
    "name": "خورش قورمه‌سبزی مجلسی",
    "description": "خورش قورمه‌سبزی با سبزی سرخ شده فراوان و لیمو عمانی",
    "category": "stew",
    "recipeSteps": [
      "گوشت را بپزید.",
      "سبزی تفت داده را اضافه کنید."
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خورش قیمه سیب‌زمینی",
    "recipeSteps": [
      "لپه و گوشت را تفت دهید.",
      "بپزید و سیب زمینی سرخ کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "لپه",
        "amount": 1
      },
      {
        "item": "گوشت",
        "unit": "گرم",
        "amount": 300
      }
    ],
    "id": "stew-2",
    "category": "stew",
    "description": "قیمه کلاسیک با لپه و لیمو عمانی",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "stew-3",
    "recipeSteps": [
      "گوشت را بپزید.",
      "بادمجان و غوره را اضافه کنید."
    ],
    "ingredients": [
      {
        "item": "بادمجان",
        "unit": "عدد",
        "amount": 4
      },
      {
        "item": "گوشت",
        "amount": 300,
        "unit": "گرم"
      }
    ],
    "name": "خورش بادمجان با غوره",
    "category": "stew",
    "description": "خورش بادمجان لذیذ با طعم ترش غوره",
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "خورش کرفس معطر و خوشرنگ",
    "ingredients": [
      {
        "item": "کرفس",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "جعفری و نعناع",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "id": "stew-4",
    "recipeSteps": [
      "کرفس را تفت دهید.",
      "با گوشت و سبزی بپزید."
    ],
    "name": "خورش کرفس با نعناع و جعفری",
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 300,
        "item": "گردو",
        "unit": "گرم"
      },
      {
        "unit": "تکه",
        "item": "مرغ",
        "amount": 4
      }
    ],
    "category": "stew",
    "recipeSteps": [
      "گردو را بپزید تا روغن بیندازد.",
      "رب انار و مرغ را اضافه کنید."
    ],
    "id": "stew-5",
    "name": "خورش فسنجان ملس",
    "description": "فسنجان با گردو و رب انار ملس",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "خورش بامیه با سیر و تمبرهندی",
    "category": "stew",
    "id": "stew-6",
    "name": "خورش bامیه جنوبی",
    "ingredients": [
      {
        "item": "بامیه",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "سیر",
        "amount": 3,
        "unit": "حبه"
      }
    ],
    "recipeSteps": [
      "بامیه را تفت دهید.",
      "در سس گوجه و سیر بپزید."
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "item": "اسفناج",
        "amount": 600
      },
      {
        "unit": "عدد",
        "item": "آلو",
        "amount": 10
      }
    ],
    "category": "stew",
    "description": "خورش مقوی اسفناج و آلو بخارا",
    "recipeSteps": [
      "اسفناج را تفت دهید.",
      "با آلو و گوشت بپزید."
    ],
    "id": "stew-7",
    "name": "خورش آلو اسفناج",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "مرغ با سبزیجات محلی و آب نارنج",
    "name": "خورش مرغ ترش گیلانی",
    "recipeSteps": [
      "مرغ را سرخ کنید.",
      "با سبزی و آب نارنج بپزید."
    ],
    "id": "stew-8",
    "category": "stew",
    "ingredients": [
      {
        "unit": "تکه",
        "amount": 3,
        "item": "مرغ"
      },
      {
        "item": "سبزی محلی",
        "unit": "گرم",
        "amount": 300
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گوشت را بپزید.",
      "با برنج و خلال‌ها تزیین کنید."
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت",
        "amount": 400
      },
      {
        "amount": 1,
        "item": "انواع خلال",
        "unit": "پیمانه"
      }
    ],
    "name": "خورش قیمه نثار قزوین",
    "category": "stew",
    "description": "غذای مجلسی با خلال پسته و بادام",
    "id": "stew-9",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "قیصی را تفت دهید.",
      "به مرغ در حال پخت اضافه کنید."
    ],
    "category": "stew",
    "description": "خورش ملس با زردآلو خشک",
    "name": "خورش آلو قیصی",
    "ingredients": [
      {
        "amount": 10,
        "item": "قیصی",
        "unit": "عدد"
      },
      {
        "item": "مرغ",
        "unit": "تکه",
        "amount": 3
      }
    ],
    "id": "stew-10",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "خورش پاییزی با کدو و آلو",
    "category": "stew",
    "name": "خورش کدو حلوایی شیرین",
    "recipeSteps": [
      "کدو را سرخ کنید.",
      "با آلو و گوشت بپزید."
    ],
    "ingredients": [
      {
        "item": "کدو حلوایی",
        "unit": "گرم",
        "amount": 500
      }
    ],
    "id": "stew-11",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "خورش خوشمزه با تره و گوشت",
    "category": "stew",
    "ingredients": [
      {
        "amount": 500,
        "item": "تره خرد شده",
        "unit": "گرم"
      }
    ],
    "name": "خورش تره کردستان",
    "id": "stew-12",
    "recipeSteps": [
      "تره را تفت دهید.",
      "مانند قورمه سبزی بپزید."
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 300,
        "item": "گردو",
        "unit": "گرم"
      }
    ],
    "id": "stew-13",
    "description": "خورش غلیظ گردو برای گیاهخواران",
    "name": "خورش گردو (فسنجان بدون گوشت)",
    "recipeSteps": [
      "گردو را بپزید تا کاملا روغن بیندازد."
    ],
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "stew-14",
    "description": "خورش بهاری با ساقه ریواس",
    "recipeSteps": [
      "ریواس را در اواخر پخت اضافه کنید تا له نشود."
    ],
    "category": "stew",
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "ریواس"
      }
    ],
    "name": "خورش ریواس ترش",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "stew-15",
    "description": "خورش تبریزی هویج خلالی",
    "ingredients": [
      {
        "item": "هویج خلالی",
        "amount": 400,
        "unit": "گرم"
      }
    ],
    "name": "خورش هویج با آلو",
    "recipeSteps": [
      "هویج را تفت دهید و با آلو بپزید."
    ],
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "گوشت ریز شده"
      },
      {
        "amount": 1,
        "item": "خلال بادام",
        "unit": "پیمانه"
      }
    ],
    "id": "stew-16",
    "recipeSteps": [
      "گوشت و خلال را با زعفران بپزید."
    ],
    "name": "خورش خلال کرمانشاه",
    "category": "stew",
    "description": "خورش اصیل با زرشک سیاه و خلال بادام",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "خوراک لوبیا سبز مجلسی",
    "recipeSteps": [
      "لوبیا را تفت دهید و با گوشت بپزید."
    ],
    "category": "stew",
    "id": "stew-17",
    "ingredients": [
      {
        "item": "لوبیا سبز",
        "amount": 300,
        "unit": "گرم"
      }
    ],
    "name": "خورش لوبیا سبز با گوشت",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "stew-18",
    "description": "ترکیب دو گیاه لذیذ در یک خورش",
    "category": "stew",
    "name": "خورش bادمجان و کدو",
    "recipeSteps": [
      "هر دو را سرخ کرده و در سس بپزید."
    ],
    "ingredients": [
      {
        "unit": "عدد",
        "item": "بادمجان",
        "amount": 3
      },
      {
        "item": "کدو",
        "amount": 3,
        "unit": "عدد"
      }
    ],
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "stew",
    "ingredients": [
      {
        "amount": 400,
        "item": "کنگر پاک شده",
        "unit": "گرم"
      }
    ],
    "name": "خورش کنگر پاییزی",
    "id": "stew-19",
    "recipeSteps": [
      "کنگر را تفت دهید و با نعناع جعفری بپزید."
    ],
    "description": "خورش با گیاه کوهی کنگر",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "stew",
    "description": "خورش ملس و معطر با میوه به",
    "recipeSteps": [
      "به را تفت دهید و با آلو و گوشت بپزید."
    ],
    "ingredients": [
      {
        "amount": 2,
        "unit": "عدد",
        "item": "به"
      }
    ],
    "name": "خورش به آلو کلاسیک",
    "id": "stew-20",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "گوشت چرخ کرده"
      }
    ],
    "description": "گوشت قلقلی با سس نعناع و رب انار",
    "name": "خورش داوود پاشا",
    "recipeSteps": [
      "قلقلی‌ها را تفت دهید.",
      "در سس رب انار بپزید."
    ],
    "id": "stew-21",
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "خورش ترش بهاری",
    "category": "stew",
    "recipeSteps": [
      "گوجه سبز را به خورش سبزی اضافه کنید."
    ],
    "name": "خورش گوجه سبز",
    "id": "stew-22",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 20,
        "item": "گوجه سبز"
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "مرغ و گوشت"
      }
    ],
    "id": "stew-23",
    "recipeSteps": [
      "با گردو و رب انار فراوان بپزید."
    ],
    "description": "خورش قدیمی گیلانی با گوشت و مرغ",
    "name": "خورش مطنجن",
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "برگ سیر را تفت دهید و با مرغ بپزید."
    ],
    "ingredients": [
      {
        "amount": 300,
        "item": "برگ سیر",
        "unit": "گرم"
      }
    ],
    "name": "خورش سیرقلیه",
    "description": "خورش شمالی با برگ سیر و تخم مرغ",
    "category": "stew",
    "id": "stew-24",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "خورش فوری جنوبی",
    "category": "stew",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "دال عدس"
      }
    ],
    "id": "stew-25",
    "name": "خورش دال عدس تند",
    "recipeSteps": [
      "عدس را با پیاز و سیر و رب بپزید."
    ],
    "calories": 550,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 0.25,
        "item": "تمبر هندی",
        "unit": "بسته"
      }
    ],
    "name": "خورش بامیه با تمر هندی",
    "recipeSteps": [
      "عصاره تمر را در اواخر پخت اضافه کنید."
    ],
    "description": "واریانت ترش خورش بامیه",
    "id": "stew-26",
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خورش چغاله بادام",
    "description": "خورش نایاب بهاری",
    "id": "stew-27",
    "category": "stew",
    "recipeSteps": [
      "چغاله را تفت دهید و طولانی بپزید."
    ],
    "ingredients": [
      {
        "amount": 300,
        "item": "چغاله بادام",
        "unit": "گرم"
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "میوه‌ها را با گوشت مرغ بپزید."
    ],
    "description": "خورش میوه‌ای ملس",
    "name": "خورش سیب آلبالو",
    "category": "stew",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "سیب",
        "amount": 2
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "آلبالو"
      }
    ],
    "id": "stew-28",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خورش هلو",
    "description": "خورش تابستانی متفاوت",
    "recipeSteps": [
      "هلو را تفت دهید و در آخر اضافه کنید."
    ],
    "id": "stew-29",
    "ingredients": [
      {
        "amount": 3,
        "unit": "عدد",
        "item": "هلو زعفرانی"
      }
    ],
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 4,
        "item": "کدو و بادمجان",
        "unit": "عدد"
      }
    ],
    "description": "خورش روزمره و خوشمزه",
    "id": "stew-30",
    "name": "خورش کدو بادمجان ساده",
    "category": "stew",
    "recipeSteps": [
      "سرخ کرده و با گوجه بپزید."
    ],
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "خورش مرغ با دانه انار خشک",
    "name": "خورش ناردون مازندرانی",
    "category": "stew",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "مرغ"
      },
      {
        "unit": "پیمانه",
        "item": "دانه انار خشک",
        "amount": 1
      }
    ],
    "recipeSteps": [
      "مرغ را سرخ کنید و در سس انار بپزید."
    ],
    "id": "stew-31",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خورش ساک (گلستان)",
    "category": "stew",
    "ingredients": [
      {
        "item": "اسفناج",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "item": "نخود",
        "unit": "پیمانه",
        "amount": 0.5
      }
    ],
    "recipeSteps": [
      "اسفناج و نخود را با گوشت بپزید."
    ],
    "description": "خورش سنتی گرگان با اسفناج و نخود",
    "id": "stew-32",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "item": "لپه",
        "unit": "پیمانه"
      },
      {
        "item": "بادمجان",
        "amount": 3,
        "unit": "عدد"
      }
    ],
    "recipeSteps": [
      "قیمه را بپزید و بادمجان را جدا سرخ کرده و اضافه کنید."
    ],
    "id": "stew-33",
    "category": "stew",
    "description": "قیمه با بادمجان سرخ شده",
    "name": "خورش قیمه بادمجان مجلسی",
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "قلقلی‌ها را در سس پیاز و رب بپزید."
    ],
    "id": "stew-34",
    "ingredients": [
      {
        "item": "گوشت چرخ‌کرده",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 2,
        "item": "آرد نخودچی",
        "unit": "قاشق"
      }
    ],
    "name": "خورش قیمه ریزه اصفهانی",
    "description": "گوشت قلقلی با آرد نخودچی در سس",
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "stew",
    "description": "خورش مرغ و دانه انار شمالی",
    "recipeSteps": [
      "مرغ را با دانه انار تفت دهید و بپزید."
    ],
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "انار تازه"
      },
      {
        "item": "مرغ",
        "unit": "ران",
        "amount": 2
      }
    ],
    "id": "stew-35",
    "name": "خورش انار مسما",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "خورش کدو سبز با چاشنی غوره",
    "ingredients": [
      {
        "amount": 4,
        "item": "کدو سبز",
        "unit": "عدد"
      },
      {
        "amount": 2,
        "unit": "قاشق",
        "item": "غوره"
      }
    ],
    "name": "خورش کدو مسما",
    "recipeSteps": [
      "کدو را سرخ کرده و با مرغ بپزید."
    ],
    "id": "stew-36",
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 300,
        "item": "سبزی ترشه واش",
        "unit": "گرم"
      },
      {
        "item": "مرغ",
        "amount": 300,
        "unit": "گرم"
      }
    ],
    "category": "stew",
    "recipeSteps": [
      "سبزی را تفت داده و با بادمجان و مرغ بپزید."
    ],
    "id": "stew-37",
    "name": "خورش ترشه واش",
    "description": "خورش محلی گیلانی با سبزی معطر",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خورش آلو اسفناج با مرغ",
    "id": "stew-38",
    "category": "stew",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "اسفناج",
        "amount": 400
      },
      {
        "unit": "تکه",
        "amount": 2,
        "item": "مرغ"
      }
    ],
    "recipeSteps": [
      "مرغ را با اسفناج تفت داده و با آلو بپزید."
    ],
    "description": "نسخه سبک‌تر خورش آلو اسفناج",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گردو و رب انار را بپزید، بادمجان سرخ شده را اضافه کنید."
    ],
    "name": "خورش شش‌انداز بادمجان",
    "description": "خورش گیاهی شمالی شبیه فسنجان",
    "category": "stew",
    "ingredients": [
      {
        "amount": 200,
        "item": "گردو",
        "unit": "گرم"
      },
      {
        "amount": 3,
        "unit": "عدد",
        "item": "بادمجان"
      }
    ],
    "id": "stew-39",
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "stew-40",
    "recipeSteps": [
      "سبزی را سرخ کنید و میگو را در آخر اضافه کنید."
    ],
    "description": "خورش تند میگو با تمر هندی",
    "name": "خورش قلیه میگو",
    "ingredients": [
      {
        "amount": 300,
        "item": "میگو",
        "unit": "گرم"
      },
      {
        "item": "سبزی قلیه",
        "amount": 200,
        "unit": "گرم"
      }
    ],
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "لبو را با گوشت و آلو بخارا بپزید."
    ],
    "id": "stew-41",
    "category": "stew",
    "ingredients": [
      {
        "item": "لبو",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "item": "گوشت",
        "unit": "گرم",
        "amount": 300
      }
    ],
    "description": "خورش زمستانی با لبو",
    "name": "خورش چغندر و آلو",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گل کلم را تفت دهید و در اواخر پخت گوشت اضافه کنید."
    ],
    "description": "خورش لطیف و خوشمزه",
    "category": "stew",
    "name": "خورش گل کلم",
    "id": "stew-42",
    "ingredients": [
      {
        "item": "گل کلم",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "رب گوجه",
        "unit": "قاشق",
        "amount": 1
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "عدد",
        "item": "بادمجان",
        "amount": 4
      },
      {
        "amount": 2,
        "item": "گوجه",
        "unit": "عدد"
      }
    ],
    "name": "خورش بادمجان و غوره (بدون گوشت)",
    "description": "خورش گیاهی و ترش",
    "id": "stew-43",
    "category": "stew",
    "recipeSteps": [
      "بادمجان و گوجه را در سس غوره بپزید."
    ],
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "stew",
    "name": "خورش تره فرنگی",
    "ingredients": [
      {
        "amount": 300,
        "item": "تره فرنگی",
        "unit": "گرم"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "مرغ"
      }
    ],
    "id": "stew-44",
    "description": "خورش معطر با تره فرنگی",
    "recipeSteps": [
      "تره فرنگی را تفت دهید و با مرغ بپزید."
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "حبه",
        "item": "سیر تازه",
        "amount": 10
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گوشت"
      }
    ],
    "recipeSteps": [
      "سیر را با پیاز تفت دهید و با گوشت بپزید."
    ],
    "id": "stew-45",
    "name": "خورش سیر و پیاز همدانی",
    "description": "خورش مقوی با سیر فراوان",
    "category": "stew",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "ریحان و نعناع",
        "unit": "گرم",
        "amount": 200
      },
      {
        "amount": 300,
        "unit": "گرم",
        "item": "گوشت"
      }
    ],
    "name": "خورش ریحان و نعناع",
    "recipeSteps": [
      "سبزی را تفت دهید و مانند قورمه بپزید."
    ],
    "id": "stew-46",
    "category": "stew",
    "description": "خورش معطر بهاری",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "stew",
    "ingredients": [
      {
        "item": "مرغ",
        "unit": "گرم",
        "amount": 300
      },
      {
        "amount": 3,
        "item": "بادمجان",
        "unit": "عدد"
      }
    ],
    "name": "خورش گوجه بادمجان با مرغ",
    "recipeSteps": [
      "مرغ و بادمجان را در سس گوجه بپزید."
    ],
    "description": "خوراک کلاسیک مرغ و بادمجان",
    "id": "stew-47",
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "خورش کدو تنبل ترش",
    "category": "stew",
    "recipeSteps": [
      "کدو را تفت دهید و در سس انار بپزید."
    ],
    "description": "با رب انار و گردو",
    "id": "stew-48",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "کدو تنبل"
      },
      {
        "item": "رب انار",
        "amount": 2,
        "unit": "قاشق"
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "خورش بامیه تند (عربی)",
    "recipeSteps": [
      "تند تفت دهید و با رب بپزید."
    ],
    "category": "stew",
    "ingredients": [
      {
        "item": "بامیه",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "unit": "قاشق",
        "item": "ادویه کاری"
      }
    ],
    "description": "با ادویه کاری و فلفل فراوان",
    "id": "stew-49",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خورش قیمه با قارچ",
    "category": "stew",
    "recipeSteps": [
      "قارچ را جایگزین گوشت کنید."
    ],
    "description": "نسخه گیاهی قیمه",
    "id": "stew-50",
    "ingredients": [
      {
        "item": "قارچ",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "لپه"
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "polo",
    "name": "باقالی‌پلو با ماهیچه",
    "id": "polo-1",
    "description": "مجلسی‌ترین غذای ایرانی با شوید و باقالی",
    "recipeSteps": [
      "ماهیچه را با پیاز فراوان بپزید.",
      "برنج را با باقالی و شوید دم کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "item": "باقالی",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 2,
        "item": "ماهیچه",
        "unit": "عدد"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "category": "polo",
    "description": "لوبیا پلو سنتی با دارچین فراوان",
    "ingredients": [
      {
        "amount": 3,
        "unit": "پیمانه",
        "item": "برنج"
      },
      {
        "unit": "گرم",
        "item": "لوبیا سبز",
        "amount": 400
      }
    ],
    "id": "polo-2",
    "recipeSteps": [
      "مایه لوبیا را با رب تفت دهید.",
      "لابلای برنج دم کنید."
    ],
    "name": "لوبیاپلو با گوشت تکه‌ای",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "polo",
    "recipeSteps": [
      "عدس و برنج را بپزید.",
      "با کشمش و خرما تزیین کنید."
    ],
    "id": "polo-3",
    "ingredients": [
      {
        "item": "عدس",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "خرما و کشمش",
        "amount": 0.5
      }
    ],
    "description": "عدس پلو مقوی با پیازداغ فراوان",
    "name": "عدس‌پلو با خرما و کشمش",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "polo-4",
    "description": "پلو زعفرانی با مرغ سرخ شده",
    "recipeSteps": [
      "مرغ را با سس بپزید.",
      "برنج را با زرشک تزیین کنید."
    ],
    "category": "polo",
    "ingredients": [
      {
        "unit": "تکه",
        "amount": 4,
        "item": "مرغ"
      },
      {
        "item": "زرشک",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "name": "زرشک‌پلو با مرغ مجلسی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "استامبولی پلو با گوجه",
    "category": "polo",
    "recipeSteps": [
      "گوجه را پوره کنید.",
      "با برنج و سیب زمینی کته کنید."
    ],
    "id": "polo-5",
    "description": "دمی گوجه نوستالژیک با سیب زمینی",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "amount": 6,
        "unit": "عدد",
        "item": "گوجه"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "category": "polo",
    "name": "کلم‌پلو شیرازی",
    "description": "با کلم قمری و سبزیجات معطر",
    "recipeSteps": [
      "کلم را خلالی سرخ کنید.",
      "با سبزی و برنج دم کنید."
    ],
    "id": "polo-6",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "کلم قمری",
        "amount": 300
      },
      {
        "amount": 200,
        "item": "گوشت قلقلی",
        "unit": "گرم"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "ماست"
      },
      {
        "amount": 1,
        "unit": "سینه",
        "item": "مرغ"
      }
    ],
    "name": "ته‌چین مرغ زعفرانی",
    "id": "polo-7",
    "recipeSteps": [
      "مایه ته‌چین را بسازید.",
      "مرغ را لابلای برنج بگذارید."
    ],
    "description": "ته‌چین طلایی با ماست و تخم مرغ",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "ماش را بپزید.",
      "با برنج دم کنید."
    ],
    "id": "polo-8",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "ماش"
      }
    ],
    "description": "غذای سالم و سبک سنتی",
    "name": "ماش‌پلو با گوشت چرخ‌کرده",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "رشته‌پلو با قیسی",
    "category": "polo",
    "ingredients": [
      {
        "amount": 200,
        "unit": "گرم",
        "item": "رشته پلویی"
      }
    ],
    "id": "polo-9",
    "description": "غذای شب عید سنتی",
    "recipeSteps": [
      "رشته را با برنج بجوشانید.",
      "دم کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "polo",
    "id": "polo-10",
    "name": "دمپختک باقالی زرد",
    "description": "دمپختک تهرانی با نیمرو",
    "ingredients": [
      {
        "item": "باقالی زرد",
        "unit": "پیمانه",
        "amount": 1
      }
    ],
    "recipeSteps": [
      "باقالی را بپزید.",
      "با زردچوبه فراوان کته کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "آلبالو هسته گرفته"
      }
    ],
    "name": "آلبالوپلو با مرغ",
    "description": "پلو میوه‌ای ملس و زیبا",
    "recipeSteps": [
      "آلبالو را با شکر بجوشانید.",
      "لابلای برنج دم کنید."
    ],
    "id": "polo-11",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "هویج رنده شده",
        "amount": 3,
        "unit": "عدد"
      }
    ],
    "id": "polo-12",
    "category": "polo",
    "recipeSteps": [
      "هویج را تفت دهید.",
      "با گوشت و برنج دم کنید."
    ],
    "name": "هویج‌پلو با گوشت تکه‌ای",
    "description": "پلو شیرین و مجلسی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "میگو را با پیاز و سبزی تفت دهید.",
      "با برنج دم کنید."
    ],
    "category": "polo",
    "name": "میگوپلو bوشهری",
    "description": "پلو تند جنوبی با سبزی معطر",
    "ingredients": [
      {
        "item": "میگو",
        "unit": "گرم",
        "amount": 300
      },
      {
        "unit": "گرم",
        "item": "سبزی پلویی",
        "amount": 200
      }
    ],
    "id": "polo-13",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گوشت قلقلی را سرخ کنید.",
      "با رب انار و گردو لای برنج بدهید."
    ],
    "category": "polo",
    "name": "قنبرپلو شیرازی",
    "ingredients": [
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "رب انار"
      },
      {
        "unit": "گرم",
        "amount": 50,
        "item": "گردو"
      }
    ],
    "description": "پلو با رب انار و گردو و کشمش",
    "id": "polo-14",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "ماهی سفید",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "unit": "گرم",
        "item": "سبزی پلو",
        "amount": 400
      }
    ],
    "category": "polo",
    "description": "غذای اصیل شمالی",
    "id": "polo-15",
    "name": "سبزی‌پلو با ماهی سفید",
    "recipeSteps": [
      "ماهی را سرخ کنید.",
      "برنج را با سبزی دم کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "recipeSteps": [
      "بادمجان را سرخ کنید.",
      "در لایه میانی ته‌چین بچینید."
    ],
    "name": "ته‌چین بادمجان و گوشت",
    "description": "ته‌چین متفاوت و لذیذ",
    "id": "polo-16",
    "category": "polo",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 3,
        "item": "بادمجان"
      }
    ],
    "calories": 750,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "polo",
    "description": "نسخه سریع و خوشمزه لوبیا پلو",
    "recipeSteps": [
      "گوشت و لوبیا را تفت دهید.",
      "دم کنید."
    ],
    "name": "لوبیاپلو با گوشت چرخ‌کرده",
    "ingredients": [
      {
        "amount": 300,
        "item": "گوشت چرخ کرده",
        "unit": "گرم"
      }
    ],
    "id": "polo-17",
    "calories": 650,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "بلغور گندم",
        "unit": "پیمانه",
        "amount": 1
      }
    ],
    "category": "polo",
    "description": "غذای محلی آذری با بلغور",
    "name": "دمی یارما (بلغور پلو)",
    "id": "polo-18",
    "recipeSteps": [
      "بلغور را با برنج کته کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "پلو مجلسی با دانه انار و پسته",
    "id": "polo-19",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "انار دانه شده",
        "amount": 1
      }
    ],
    "category": "polo",
    "name": "انارپلو قزوینی",
    "recipeSteps": [
      "انار و خلال را لای برنج بدهید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "مرغ",
        "amount": 2,
        "unit": "تکه"
      }
    ],
    "id": "polo-20",
    "name": "شویدباقالی با مرغ",
    "recipeSteps": [
      "مرغ را زعفرانی بپزید.",
      "با باقالی پلو سرو کنید."
    ],
    "category": "polo",
    "description": "باقالی پلو خانگی با ران مرغ",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "ته‌چین اسفناج",
    "id": "polo-21",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "اسفناج پخته",
        "amount": 300
      }
    ],
    "recipeSteps": [
      "اسفناج را لای برنج ته‌چینی بگذارید."
    ],
    "description": "ته‌چین سالم و مقوی",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "عدس پلو مجلسی با گوشت ریز",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 200,
        "item": "گوشت قلقلی"
      }
    ],
    "recipeSteps": [
      "قلقلی‌ها را سرخ کرده و روی پلو بریزید."
    ],
    "id": "polo-22",
    "category": "polo",
    "name": "عدس‌پلو با گوشت قلقلی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "polo-23",
    "category": "polo",
    "description": "پلو رنگارنگ با ذرت و نخودفرنگی",
    "recipeSteps": [
      "سبزیجات را تفت دهید و با برنج دم کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "سبزیجات مخلوط"
      }
    ],
    "name": "پلو یونانی با سبزیجات",
    "calories": 620,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "رشته‌پلو با مرغ ریش شده",
    "category": "polo",
    "recipeSteps": [
      "مرغ را با پیازداغ لای پلو بدهید."
    ],
    "description": "پلو معطر و سیرکننده",
    "ingredients": [
      {
        "amount": 200,
        "item": "مرغ پخته",
        "unit": "گرم"
      }
    ],
    "id": "polo-24",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "polo",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "بلغور"
      },
      {
        "unit": "پیمانه",
        "item": "عدس",
        "amount": 0.5
      }
    ],
    "id": "polo-25",
    "name": "دمی بلغور با عدس",
    "description": "غذای رژیمی و سنتی",
    "recipeSteps": [
      "هر دو را با هم کته کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "polo",
    "description": "ترکیب غذای اصفهانی با پلو",
    "name": "خورشت ماست با برنج",
    "recipeSteps": [
      "کنار پلو زعفرانی سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 1,
        "item": "خورشت ماست",
        "unit": "کاسه"
      }
    ],
    "id": "polo-26",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "item": "ادویه کاری",
        "unit": "قاشق"
      }
    ],
    "category": "polo",
    "recipeSteps": [
      "مرغ را با ادویه فراوان بپزید و دم کنید."
    ],
    "id": "polo-27",
    "name": "پلو هندی با ادویه تند",
    "description": "بریانی تند مرغ",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "polo-28",
    "category": "polo",
    "ingredients": [
      {
        "amount": 500,
        "unit": "گرم",
        "item": "گوشت سردست"
      }
    ],
    "name": "چلو گوشت سمنانی",
    "recipeSteps": [
      "گوشت را لای برنج خام بگذارید و دم کنید."
    ],
    "description": "گوشت پخته شده در برنج",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "polo-29",
    "recipeSteps": [
      "لوبیا را بپزید و با شوید دم کنید."
    ],
    "name": "دمی لوبیا چشم‌بلبلی",
    "description": "پلو مخلوط با لوبیا و شوید",
    "category": "polo",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "لوبیا چشم بلبلی"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "برنج را کته کنید و با کباب میل کنید."
    ],
    "id": "polo-30",
    "name": "کته کباب شمالی",
    "ingredients": [
      {
        "amount": 3,
        "unit": "پیمانه",
        "item": "برنج محلی"
      }
    ],
    "category": "polo",
    "description": "کته نرم با کره و کباب تابه ای",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "پلو با لپه و زرشک و گوشت",
    "category": "polo",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "لپه"
      },
      {
        "item": "رشته",
        "amount": 100,
        "unit": "گرم"
      }
    ],
    "id": "polo-31",
    "recipeSteps": [
      "مواد را تفت داده و لای برنج دم کنید."
    ],
    "name": "مانی پلو دامغان",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "پلو معطر کرمانی با زیره سیاه",
    "recipeSteps": [
      "زیره را لای برنج دم کنید."
    ],
    "id": "polo-32",
    "name": "زیره پلو با مرغ",
    "category": "polo",
    "ingredients": [
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "زیره سیاه"
      },
      {
        "amount": 2,
        "unit": "تکه",
        "item": "مرغ"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "ماش را بپزید و با برنج کته نرم کنید."
    ],
    "id": "polo-33",
    "ingredients": [
      {
        "item": "ماش",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "item": "برنج",
        "unit": "پیمانه"
      }
    ],
    "description": "پلو نرم با ماش و سبزی معطر",
    "category": "polo",
    "name": "پلو دزفولی (شلی)",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "ته‌چین ماهی",
    "ingredients": [
      {
        "item": "ماهی شیر",
        "unit": "گرم",
        "amount": 300
      },
      {
        "amount": 1,
        "item": "شوید",
        "unit": "پیمانه"
      }
    ],
    "description": "ته‌چین جنوبی با ماهی شیر",
    "category": "polo",
    "recipeSteps": [
      "ماهی را ته قابلمه بگذارید و برنج ته‌چینی بریزید."
    ],
    "id": "polo-34",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "recipeSteps": [
      "بادمجان را سرخ کنید و لای برنج کته کنید."
    ],
    "description": "ترکیب لذیذ بادمجان سرخ شده و برنج",
    "ingredients": [
      {
        "amount": 2,
        "unit": "عدد",
        "item": "بادمجان"
      },
      {
        "item": "گوجه",
        "unit": "عدد",
        "amount": 4
      }
    ],
    "category": "polo",
    "name": "دمی گوجه و bادمجان",
    "id": "polo-35",
    "calories": 750,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "id": "polo-36",
    "name": "عدس پلو با مرغ حلزونی",
    "recipeSteps": [
      "فیله‌ها را رول کرده و سرخ کنید و روی پلو بگذارید."
    ],
    "ingredients": [
      {
        "item": "فیله مرغ",
        "unit": "گرم",
        "amount": 300
      },
      {
        "amount": 1,
        "unit": "دیس",
        "item": "عدس پلو"
      }
    ],
    "category": "polo",
    "description": "مجلسی و زیبا",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "پلو خانگی مقوی",
    "id": "polo-37",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "گوشت گوسفند"
      },
      {
        "amount": 0.5,
        "item": "شوید خشک",
        "unit": "پیمانه"
      }
    ],
    "recipeSteps": [
      "گوشت را بپزید و با شوید پلو سرو کنید."
    ],
    "category": "polo",
    "name": "شوید پلو با گوشت گوسفندی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "نخود پلو با مرغ",
    "id": "polo-38",
    "ingredients": [
      {
        "item": "نخود فرنگی",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "amount": 200,
        "item": "مرغ",
        "unit": "گرم"
      }
    ],
    "category": "polo",
    "recipeSteps": [
      "نخود را با مرغ و برنج دم کنید."
    ],
    "description": "پلو با نخود فرنگی و شوید",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "polo",
    "description": "پلو زمستانی شیرین",
    "id": "polo-39",
    "name": "پلو کدو حلوایی",
    "recipeSteps": [
      "کدو را نگینی سرخ کرده و لای برنج بدهید."
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "item": "کدو حلوایی",
        "amount": 300
      },
      {
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "polo",
    "recipeSteps": [
      "خرما را تفت داده و روی پلو بریزید."
    ],
    "id": "polo-40",
    "description": "پلو انرژی‌بخش",
    "name": "رشته پلو با خرما و گردو",
    "ingredients": [
      {
        "item": "خرما",
        "amount": 10,
        "unit": "عدد"
      },
      {
        "amount": 100,
        "unit": "گرم",
        "item": "رشته"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "اسفناج تازه",
        "amount": 300,
        "unit": "گرم"
      }
    ],
    "name": "دمی اسفناج و برنج",
    "description": "کته سبز و مقوی",
    "recipeSteps": [
      "اسفناج را لای برنج کته کنید."
    ],
    "id": "polo-41",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "پلو مرغ با آلو بخارا",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "آلو بخارا",
        "amount": 10
      },
      {
        "item": "مرغ",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "description": "پلو ملس و مجلسی",
    "id": "polo-42",
    "recipeSteps": [
      "آلو را با مرغ تفت داده و لای پلو بدهید."
    ],
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "polo-43",
    "name": "دمپخت لای پلو تهرانی",
    "category": "polo",
    "description": "گوشت پخته شده در برنج",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "گوشت سردست"
      }
    ],
    "recipeSteps": [
      "گوشت را لابلای برنج دم کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "پلو میگو با کشمش",
    "recipeSteps": [
      "هر دو را تفت داده و روی پلو بریزید."
    ],
    "category": "polo",
    "description": "ترکیب شیرین و دریایی",
    "id": "polo-44",
    "ingredients": [
      {
        "amount": 200,
        "item": "میگو",
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "کشمش"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "با هم کته کنید."
    ],
    "category": "polo",
    "name": "دمی بلغور گندم",
    "description": "پلو رژیمی و سنتی",
    "id": "polo-45",
    "ingredients": [
      {
        "item": "بلغور گندم",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "برنج"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 1,
        "item": "کدو حلوایی"
      }
    ],
    "name": "پلو با ته‌دیگ کدو",
    "recipeSteps": [
      "کدو را ورقه‌ای ته قابلمه بچینید."
    ],
    "description": "پلو با ته‌دیگ متفاوت",
    "category": "polo",
    "id": "polo-46",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 200,
        "item": "گوشت تکه‌ای",
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "item": "گوجه",
        "amount": 4
      }
    ],
    "description": "نسخه مجلسی دمی گوجه",
    "id": "polo-47",
    "name": "استامبولی پلو با گوشت",
    "category": "polo",
    "recipeSteps": [
      "گوشت را بپزید و با برنج کته کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "پلو با سبزیجات گریل شده",
    "id": "polo-48",
    "description": "پلو مدرن و سالم",
    "category": "polo",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "سبزیجات فصلی",
        "amount": 2
      }
    ],
    "recipeSteps": [
      "سبزیجات را گریل کرده و کنار پلو سرو کنید."
    ],
    "calories": 620,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "پلو مخلوط با ماش و شوید",
    "id": "polo-49",
    "recipeSteps": [
      "ماش را با برنج و شوید دم کنید."
    ],
    "category": "polo",
    "name": "دمی ماش شیرازی",
    "ingredients": [
      {
        "item": "ماش پخته",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "غذای ساده و خوشمزه",
    "recipeSteps": [
      "مرغ را با کره تفت داده و با کته میل کنید."
    ],
    "id": "polo-50",
    "name": "کته کره و مرغ",
    "category": "polo",
    "ingredients": [
      {
        "amount": 200,
        "unit": "گرم",
        "item": "مرغ پخته"
      },
      {
        "unit": "گرم",
        "item": "کره",
        "amount": 50
      }
    ],
    "calories": 770,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "recipeSteps": [
      "پیازها را با رنده ریز رنده کنید یا در غذاساز پوره کنید.",
      "پیاز رنده شده را داخل یک پارچه تمیز یا الک بریزید و آب آن را کاملا بگیرید تا جایی که تفاله پیاز خشک شود.",
      "گوشت چرخ‌کرده را در یک کاسه بزرگ بریزید.",
      "تفاله پیاز، نمک، فلفل سیاه و بیکینگ پودر (اگر استفاده می‌کنید) را به گوشت اضافه کنید.",
      "مواد را با دست به مدت ۱۵ تا ۲۰ دقیقه به خوبی ورز دهید تا گوشت حالت چسبندگی پیدا کند و کش‌دار شود. این مرحله برای انسجام کباب بسیار حیاتی است.",
      "زعفران دم‌کرده را به مواد اضافه کرده و ۵ دقیقه دیگر ورز دهید تا رنگ و عطر زعفران به همه جای گوشت برسد.",
      "روی کاسه را بپوشانید و حداقل ۴ تا ۶ ساعت (یا بهتر است یک شب) در یخچال استراحت دهید تا مواد به خوبی مزه‌دار و منسجم شوند.",
      "قبل از سیخ کشیدن، دوباره گوشت را ۱۰ دقیقه ورز دهید.",
      "به اندازه یک نارنگی از مواد برداشته و به سیخ‌های کباب پهن و تمیز بکشید. با کمک انگشتان، به گوشت روی سیخ فرم دهید و شیارهایی ایجاد کنید.",
      "مطمئن شوید که سر و ته کباب به سیخ محکم چسبیده باشد تا هنگام پخت از سیخ جدا نشود.",
      "کباب‌ها را روی منقل داغ با زغال گداخته یا روی گریل برقی با حرارت متوسط رو به بالا بپزید.",
      "سیخ‌ها را مرتب بچرخانید تا کباب یکنواخت پخته شود و نسوزد.",
      "معمولا ۱۰ تا ۱۵ دقیقه برای پخت کامل کباب کوبیده کافی است.",
      "کباب‌ها را بلافاصله با برنج، گوجه کبابی و سماق سرو کنید."
    ],
    "id": "dish-1765151410989-rjy9b-1",
    "description": "کباب کوبیده",
    "category": "kabab",
    "name": "کباب کوبیده",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده (مخلوط گوسفند و گوساله با ۲۰-۲۵% چربی)",
        "amount": 750
      },
      {
        "amount": 300,
        "unit": "گرم",
        "item": "پیاز درشت"
      },
      {
        "amount": 1.5,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "فلفل سیاه"
      },
      {
        "item": "زعفران دم‌کرده غلیظ",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "بیکینگ پودر (اختیاری)"
      }
    ],
    "calories": 600,
    "cookTime": 40,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "کباب برگ",
    "recipeSteps": [
      "گوشت را به صورت ورقه‌های نازک برش دهید. اگر ضخیم بودند، با بیفتک‌کوب کمی بکوبید تا نازک‌تر شوند و از طول به ابعاد مناسب سیخ برگ ببرید.",
      "پیازها را رنده کرده و آب آن را کاملا بگیرید. تفاله پیاز را دور بریزید یا برای مصارف دیگر استفاده کنید.",
      "در یک کاسه بزرگ، آب پیاز، ماست، آب لیموترش، روغن زیتون، زعفران دم‌کرده و فلفل سیاه را با هم مخلوط کنید.",
      "ورقه‌های گوشت را به این مواد اضافه کرده و به خوبی ماساژ دهید تا تمام سطح گوشت به مواد آغشته شود.",
      "روی کاسه را بپوشانید و حداقل ۱۲ تا ۲۴ ساعت در یخچال قرار دهید تا گوشت مزه‌دار و ترد شود. (نمک را در این مرحله اضافه نکنید زیرا باعث سفت شدن گوشت می‌شود. می‌توانید ۳۰ دقیقه قبل از پخت اضافه کنید).",
      "قبل از سیخ کشیدن، گوشت‌ها را از مواد مرینیت خارج کنید و اجازه دهید کمی از آبشان خارج شود.",
      "گوشت‌های مزه‌دار شده را به آرامی و بدون اینکه چروک شوند، به سیخ‌های پهن کباب بکشید.",
      "کباب‌ها را روی منقل داغ با زغال گداخته و شعله ملایم (یا گریل) بپزید.",
      "مرتب سیخ‌ها را بچرخانید تا کباب‌ها به طور یکنواخت و آبدار پخته شوند.",
      "در حین پخت، می‌توانید با برس روی کباب‌ها مخلوط کره ذوب شده و کمی زعفران دم‌کرده بمالید تا خوش‌طعم‌تر و براق‌تر شوند.",
      "پخت کباب برگ معمولا ۸ تا ۱۲ دقیقه زمان می‌برد.",
      "کباب برگ را با برنج زعفرانی، کره محلی، گوجه کبابی و سماق سرو کنید."
    ],
    "description": "کباب برگ",
    "ingredients": [
      {
        "amount": 800,
        "unit": "گرم",
        "item": "فیله گوسفندی یا راسته گوساله"
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط (آب گرفته شده)",
        "amount": 2
      },
      {
        "amount": 4,
        "unit": "قاشق غذاخوری",
        "item": "ماست پرچرب"
      },
      {
        "item": "آب لیموترش تازه",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "amount": 4,
        "item": "روغن زیتون",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک (بعد از پخت یا ۳۰ دقیقه قبل از پخت)",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه",
        "amount": 0.5
      }
    ],
    "hasRealData": true,
    "category": "kabab",
    "id": "dish-1765151410989-t21ot-2",
    "calories": 450,
    "cookTime": 70,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "hasRealData": true,
    "description": "جوجه‌کباب زعفرانی",
    "recipeSteps": [
      "تکه‌های مرغ را در یک کاسه بزرگ بریزید.",
      "پیاز خلالی، آب لیموترش، روغن مایع، زعفران دم‌کرده، نمک و فلفل سیاه را به مرغ اضافه کنید.",
      "اگر از ماست استفاده می‌کنید، آن را نیز در این مرحله اضافه کنید.",
      "مواد را با دست به خوبی مخلوط کنید و ماساژ دهید تا تکه‌های مرغ کاملا به سس آغشته شوند.",
      "روی کاسه را بپوشانید و حداقل ۴ تا ۶ ساعت (یا بهتر است یک شب) در یخچال قرار دهید تا مرغ مزه‌دار شود.",
      "قبل از سیخ کشیدن، تکه‌های مرغ را از پیازها جدا کنید تا هنگام پخت پیازها نسوزند.",
      "تکه‌های مرغ را به سیخ‌های فلزی یا چوبی (اگر چوبی است، قبلا در آب خیس کنید) بکشید. می‌توانید لابه‌لای مرغ‌ها فلفل دلمه‌ای و گوجه گیلاسی هم سیخ کنید.",
      "جوجه کباب‌ها را روی منقل با زغال داغ و حرارت متوسط (یا روی گریل برقی/تابه گریل) بپزید.",
      "مرتب سیخ‌ها را بچرخانید تا مرغ یکنواخت پخته و طلایی شود و آبدار بماند.",
      "پخت جوجه کباب معمولا ۱۵ تا ۲۰ دقیقه طول می‌کشد.",
      "جوجه کباب را با برنج زعفرانی, کره ذوب شده و سبزیجات تازه سرو کنید."
    ],
    "category": "kabab",
    "name": "جوجه‌کباب زعفرانی",
    "id": "dish-1765151410989-302te-3",
    "ingredients": [
      {
        "item": "فیله مرغ یا سینه مرغ بدون استخوان و پوست",
        "unit": "گرم",
        "amount": 800
      },
      {
        "amount": 2,
        "item": "پیاز متوسط (خلالی خرد شده)",
        "unit": "عدد"
      },
      {
        "item": "آب لیموترش تازه",
        "unit": "قاشق غذاخوری",
        "amount": 3
      },
      {
        "amount": 4,
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع (یا روغن زیتون)"
      },
      {
        "amount": 4,
        "item": "زعفران دم‌کرده غلیظ",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "ماست پرچرب (اختیاری، برای نرمی بیشتر)",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      }
    ],
    "calories": 400,
    "cookTime": 70,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "category": "kabab",
    "name": "جوجه‌کباب ترش",
    "description": "جوجه‌کباب ترش",
    "ingredients": [
      {
        "item": "فیله مرغ یا سینه مرغ بدون استخوان و پوست",
        "amount": 800,
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط (خلالی خرد شده)",
        "amount": 1
      },
      {
        "item": "سیر (رنده شده)",
        "amount": 3,
        "unit": "حبه"
      },
      {
        "unit": "گرم",
        "item": "سبزیجات معطر (گشنیز، جعفری، نعناع، ترخون، مرزه - ساطوری)",
        "amount": 100
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 3.5,
        "item": "رب انار ملس یا ترش"
      },
      {
        "amount": 3,
        "unit": "قاشق غذاخوری",
        "item": "گردوی چرخ‌کرده"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن زیتون",
        "amount": 3
      },
      {
        "item": "آب لیموترش تازه",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "زعفران دم‌کرده (اختیاری)"
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "تکه‌های مرغ را در یک کاسه بزرگ بریزید.",
      "پیاز خلالی، سیر رنده شده، سبزیجات ساطوری، رب انار، گردوی چرخ‌کرده، روغن زیتون، آب لیموترش، نمک و فلفل سیاه را به مرغ اضافه کنید. اگر می‌خواهید کمی زعفران هم اضافه کنید.",
      "مواد را با دست به خوبی مخلوط کنید و ماساژ دهید تا تکه‌های مرغ کاملا به سس آغشته شوند.",
      "روی کاسه را بپوشانید و حداقل ۶ تا ۸ ساعت (یا بهتر است یک شب) در یخچال قرار دهید تا مرغ مزه‌دار شود.",
      "قبل از سیخ کشیدن، تکه‌های مرغ را از پیاز و سبزیجات جدا نکنید زیرا این مواد طعم خوبی به کباب می‌دهند.",
      "تکه‌های مرغ را به سیخ‌های فلزی یا چوبی بکشید.",
      "جوجه کباب‌ها را روی منقل با زغال داغ و حرارت متوسط (یا روی گریل برقی/تابه گریل) بپزید.",
      "مرتب سیخ‌ها را بچرخانید تا مرغ یکنواخت پخته و طلایی شود. مراقب باشید رب انار باعث سوختن سریع‌تر کباب می‌شود، پس حرارت را تنظیم کنید.",
      "پخت جوجه کباب ترش معمولا ۱۵ تا ۲۰ دقیقه طول می‌کشد.",
      "جوجه کباب ترش را با برنج سفید یا کته و سبزی خوردن سرو کنید."
    ],
    "id": "dish-1765151410989-sq5cn-4",
    "calories": 370,
    "cookTime": 20,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "جوجه‌کباب خیلی‌تند",
    "recipeSteps": [
      "تکه‌های مرغ را در یک کاسه بزرگ بریزید.",
      "پیاز خلالی، سیر رنده شده، فلفل قرمز تازه ساطوری/پوره شده، پودر فلفل قرمز، پاپریکا، آب لیموترش، روغن زیتون، رب گوجه‌فرنگی (اگر استفاده می‌کنید)، نمک و ماست را به مرغ اضافه کنید.",
      "مواد را با دست به خوبی مخلوط کنید و ماساژ دهید تا تکه‌های مرغ کاملا به سس تند آغشته شوند. حتما از دستکش استفاده کنید تا دستتان با فلفل تند در تماس نباشد.",
      "روی کاسه را بپوشانید و حداقل ۴ تا ۶ ساعت (یا بهتر است یک شب) در یخچال قرار دهید تا مرغ مزه‌دار شود.",
      "قبل از سیخ کشیدن، تکه‌های مرغ را از پیازها جدا کنید تا هنگام پخت نسوزند.",
      "تکه‌های مرغ را به سیخ‌های فلزی یا چوبی بکشید.",
      "جوجه کباب‌ها را روی منقل با زغال داغ و حرارت متوسط (یا روی گریل برقی/تابه گریل) بپزید.",
      "مرتب سیخ‌ها را بچرخانید تا مرغ یکنواخت پخته و طلایی شود.",
      "پخت جوجه کباب معمولا ۱۵ تا ۲۰ دقیقه طول می‌کشد.",
      "جوجه کباب خیلی تند را با برنج سفید یا کته و سالاد فصل یا ماست خیار سرو کنید."
    ],
    "description": "جوجه‌کباب خیلی‌تند",
    "id": "dish-1765151410989-5vbla-5",
    "ingredients": [
      {
        "item": "فیله مرغ یا سینه مرغ بدون استخوان و پوست",
        "unit": "گرم",
        "amount": 800
      },
      {
        "amount": 2,
        "item": "پیاز متوسط (خلالی خرد شده)",
        "unit": "عدد"
      },
      {
        "unit": "حبه",
        "item": "سیر (رنده شده)",
        "amount": 4
      },
      {
        "amount": 2.5,
        "item": "فلفل قرمز تازه (تند) (پوره شده)",
        "unit": "عدد"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "پودر فلفل قرمز",
        "amount": 1.25
      },
      {
        "item": "پاپریکا",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "آب لیموترش تازه",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 4,
        "item": "روغن زیتون",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "رب گوجه‌فرنگی (اختیاری)"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک",
        "amount": 1
      },
      {
        "item": "ماست پرچرب (برای تعدیل تندی)",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      }
    ],
    "category": "kabab",
    "hasRealData": true,
    "calories": 400,
    "cookTime": 40,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "id": "dish-1765151418345-jj4rt-1",
    "category": "kabab",
    "description": "چنجه کباب",
    "name": "چنجه کباب",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "فیله یا راسته گوسفندی",
        "amount": 600
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز بزرگ (رنده شده و آب گرفته شده)"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "ماست پرچرب"
      },
      {
        "amount": 4,
        "item": "روغن زیتون",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "آبلیمو تازه"
      },
      {
        "amount": 2,
        "item": "زعفران دم‌کرده غلیظ",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک (یا به میزان لازم)",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "فلفل سیاه (یا به میزان لازم)",
        "unit": "قاشق چای‌خوری"
      }
    ],
    "recipeSteps": [
      "ابتدا پیازها را رنده ریز کرده، آب آن‌ها را کاملا بگیرید و فقط پوره پیاز را استفاده کنید",
      "گوشت‌های خرد شده را در یک کاسه بزرگ بریزید",
      "پوره پیاز، ماست، روغن زیتون، آبلیمو، زعفران دم‌کرده و فلفل سیاه را به گوشت اضافه کنید",
      "مواد را با دست به خوبی مخلوط کنید تا تمام تکه‌های گوشت به مواد آغشته شوند",
      "روی کاسه را با سلفون بپوشانید و حداقل ۴ تا ۶ ساعت (بهتر است یک شب) در یخچال قرار دهید تا گوشت مزه‌دار شود",
      "۳۰ دقیقه قبل از پخت، نمک را به گوشت اضافه کنید و مجدداً مخلوط کنید (اضافه کردن زودتر نمک باعث سفت شدن گوشت می‌شود)",
      "گوشت‌ها را به سیخ بکشید، به طوری که فاصله مناسبی بین آن‌ها باشد",
      "کباب‌ها را روی منقل با حرارت متوسط یا کباب‌پز گازی گریل کنید",
      "در حین کباب کردن، سیخ‌ها را مرتب بچرخانید تا گوشت به طور یکنواخت بپزد و خشک نشود",
      "چنجه کباب آماده را بلافاصله با برنج کته یا چلو، گوجه کبابی و فلفل سبز سرو کنید"
    ],
    "hasRealData": true,
    "calories": 450,
    "cookTime": 40,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "name": "کباب بختیاری",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 300,
        "item": "فیله گوسفندی یا راسته گوساله"
      },
      {
        "item": "سینه مرغ",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "پیاز بزرگ (آب گرفته شده برای گوشت قرمز)",
        "unit": "عدد"
      },
      {
        "item": "پیاز متوسط (آب گرفته شده برای مرغ)",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "ماست پرچرب (برای گوشت)",
        "unit": "قاشق غذاخوری",
        "amount": 4
      },
      {
        "item": "ماست پرچرب (برای مرغ)",
        "unit": "قاشق غذاخوری",
        "amount": 4
      },
      {
        "item": "روغن زیتون (مجموع برای هر دو)",
        "unit": "قاشق غذاخوری",
        "amount": 6
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 6,
        "item": "آبلیمو تازه (مجموع برای هر دو)"
      },
      {
        "item": "زعفران دم‌کرده غلیظ (مجموع برای هر دو)",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "نمک"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه"
      }
    ],
    "hasRealData": true,
    "description": "کباب بختیاری",
    "category": "kabab",
    "recipeSteps": [
      "گوشت گوسفندی (یا گوساله) را با آب پیاز رنده شده، ۳ قاشق ماست، ۳ قاشق روغن زیتون، ۳ قاشق آبلیمو، ۱.۵ قاشق زعفران دم‌کرده و نصف قاشق چای‌خوری فلفل سیاه در یک کاسه جداگانه مخلوط کنید و حداقل ۴ ساعت در یخچال قرار دهید",
      "سینه مرغ خرد شده را با آب پیاز رنده شده، ۴ قاشق ماست، ۳ قاشق روغن زیتون، ۳ قاشق آبلیمو، ۱.۵ قاشق زعفران دم‌کرده و نصف قاشق چای‌خوری فلفل سیاه در کاسه‌ای دیگر مخلوط کنید و حداقل ۴ ساعت در یخچال بگذارید",
      "۳۰ دقیقه قبل از پخت، نصف قاشق چای‌خوری نمک به هر کدام از مواد گوشت و مرغ اضافه کنید و خوب مخلوط کنید",
      "تکه‌های گوشت و مرغ را به صورت یکی در میان روی سیخ‌های کباب بکشید",
      "می‌توانید بین تکه‌های گوشت و مرغ، از تکه‌های کوچک فلفل دلمه‌ای و پیاز استفاده کنید",
      "سیخ‌ها را روی حرارت متوسط منقل یا کباب‌پز گازی قرار دهید",
      "سیخ‌ها را مرتب بچرخانید تا گوشت و مرغ به طور یکنواخت و کامل پخته و طلایی شوند",
      "کباب بختیاری را با چلو، کره، سماق و گوجه‌فرنگی کبابی سرو کنید"
    ],
    "id": "dish-1765151418345-e3d3j-2",
    "calories": 400,
    "cookTime": 40,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "id": "dish-1765151418345-3hxbv-3",
    "hasRealData": true,
    "ingredients": [
      {
        "amount": 500,
        "item": "فیله گوسفندی یا راسته گوساله (برای برگ)",
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "پیاز بزرگ (آب رنده شده برای برگ)"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "روغن زیتون (برای برگ)"
      },
      {
        "item": "زعفران دم‌کرده غلیظ (برای برگ)",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک (برای برگ)",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل سیاه (برای برگ)",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "گرم",
        "amount": 600,
        "item": "گوشت چرخ‌کرده مخلوط (برای کوبیده)"
      },
      {
        "unit": "عدد",
        "item": "پیاز بزرگ (آب گرفته شده برای کوبیده)",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1.5,
        "item": "نمک (برای کوبیده)"
      },
      {
        "amount": 1,
        "item": "فلفل سیاه (برای کوبیده)",
        "unit": "قاشق چای‌خوری"
      }
    ],
    "category": "kabab",
    "recipeSteps": [
      "برای کباب برگ: ابتدا گوشت برگ را با چاقو به برش‌های نازک و یکنواخت به ابعاد حدود ۸x۴ سانتی‌متر برش دهید و کمی با بیفتک‌کوب بکوبید تا نازک‌تر شود",
      "در یک کاسه، آب پیاز، روغن زیتون، زعفران دم‌کرده و فلفل سیاه را با گوشت‌های برش خورده مخلوط کنید",
      "روی کاسه را بپوشانید و حداقل ۴ تا ۶ ساعت (یا یک شب) در یخچال قرار دهید",
      "۳۰ دقیقه قبل از پخت، نمک را به گوشت برگ اضافه کرده و مخلوط کنید",
      "برای کباب کوبیده: پیاز را رنده ریز کنید و آب آن را کاملا بگیرید",
      "گوشت چرخ‌کرده را با پیاز آب گرفته، نمک و فلفل سیاه به مدت ۱۰ تا ۱۵ دقیقه خوب ورز دهید تا حالت چسبندگی پیدا کند",
      "می‌توانید ۱ قاشق زعفران دم‌کرده هم به مایه کوبیده اضافه کنید",
      "مایه کوبیده را برای حداقل ۱ ساعت در یخچال قرار دهید تا منسجم شود",
      "به سیخ کشیدن: گوشت برگ را به سیخ‌های پهن بکشید، به طوری که تمام سیخ را بپوشاند",
      "مایه کوبیده را به اندازه یک پرتقال بردارید و با فشار دست روی سیخ پهن کنید و به آن فرم دهید",
      "کباب کردن: کباب‌ها را روی منقل با حرارت متوسط و یکنواخت یا کباب‌پز گازی قرار دهید",
      "سیخ‌ها را به سرعت بچرخانید تا گوشت به سیخ بچسبد و نریزد",
      "سپس با حرارت ملایم‌تر، کباب‌ها را بچرخانید تا پخته و طلایی شوند",
      "کباب سلطانی را بلافاصله با چلو, کره, سماق و ریحان تازه سرو کنید"
    ],
    "description": "کباب سلطانی",
    "name": "کباب سلطانی",
    "calories": 450,
    "cookTime": 40,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "hasRealData": true,
    "recipeSteps": [
      "پیازها را رنده ریز کنید و آب آن‌ها را با فشار دست کاملا بگیرید (مهم است که مایه کباب آب نداشته باشد)",
      "گوشت چرخ‌کرده را در یک کاسه بزرگ بریزید",
      "پیاز آب گرفته شده، نمک، فلفل سیاه، زردچوبه (در صورت تمایل) و زعفران دم‌کرده (در صورت تمایل) را به گوشت اضافه کنید",
      "مواد را به مدت ۱۵ تا ۲۰ دقیقه با دست به خوبی ورز دهید تا کاملاً حالت چسبندگی پیدا کند و یکدست شود (این مرحله برای نریختن کباب از سیخ بسیار مهم است)",
      "روی کاسه را بپوشانید و مایه کباب را حداقل ۱ تا ۲ ساعت در یخچال قرار دهید تا استراحت کرده و خودش را بگیرد",
      "سیخ‌ها را با آب سرد خیس کنید",
      "مقداری از مایه کباب را بردارید (حدود ۱۰۰ گرم برای هر لقمه) و با دست روی سیخ‌های پهن یا باریک فلزی به شکل لقمه‌ای یا انگشتی (حدود ۱۰-۱۲ سانتی‌متر طول) فرم دهید",
      "می‌توانید با انگشتان خود روی کباب شیار ایجاد کنید",
      "کباب‌ها را روی حرارت متوسط منقل ذغالی یا کباب‌پز گازی قرار دهید",
      "سیخ‌ها را مرتب و سریع بچرخانید تا کباب نریزد و همه طرف آن به طور یکنواخت پخته و کمی برشته شود",
      "گوجه‌فرنگی‌ها را از وسط نصف کرده و کباب کنید",
      "کباب لقمه را با نان داغ، چلو، سماق، ریحان و گوجه کبابی سرو کنید"
    ],
    "name": "کباب لقمه",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده مخلوط (۵۰% گوسفند، ۵۰% گوساله)",
        "amount": 700
      },
      {
        "item": "پیاز بزرگ (رنده شده و آب گرفته شده)",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک (یا به میزان لازم)",
        "amount": 2
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه"
      },
      {
        "amount": 0.5,
        "item": "زردچوبه (اختیاری)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم‌کرده غلیظ (اختیاری)",
        "amount": 1
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "گوجه فرنگی"
      },
      {
        "item": "فلفل سبز تند (برای کباب کردن)",
        "unit": "عدد",
        "amount": 4
      }
    ],
    "description": "کباب لقمه",
    "category": "kabab",
    "id": "dish-1765151418345-ofdsd-4",
    "calories": 450,
    "cookTime": 20,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "hasRealData": true,
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "گوشت چرخ‌کرده گوسفندی (پرچرب)"
      },
      {
        "unit": "گرم",
        "amount": 400,
        "item": "گوشت چرخ‌کرده گوساله (کم‌چرب)"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "پیاز بسیار بزرگ (رنده شده و آب آن گرفته شده)"
      },
      {
        "amount": 2,
        "unit": "قاشق چای‌خوری",
        "item": "نمک (یا به میزان لازم)"
      },
      {
        "item": "فلفل سیاه",
        "amount": 1.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "سماق (برای سرو)"
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "گوجه فرنگی (برای کباب کردن)"
      },
      {
        "amount": 4,
        "item": "فلفل سبز (برای کباب کردن)",
        "unit": "عدد"
      }
    ],
    "name": "کباب بناب",
    "recipeSteps": [
      "پیازها را رنده ریز کنید و آب آن‌ها را با دست فشار دهید تا کاملاً خارج شود",
      "گوشت‌های چرخ‌کرده گوسفندی و گوساله را در یک کاسه بزرگ بریزید",
      "پیاز آب گرفته شده، نمک و فلفل سیاه را به گوشت‌ها اضافه کنید",
      "مایه کباب را به مدت ۲۰ تا ۳۰ دقیقه با قدرت و به خوبی ورز دهید تا کاملاً چسبنده و یکدست شود (ورز دادن طولانی و صحیح راز کباب بناب است)",
      "پس از ورز دادن، روی کاسه را بپوشانید و مایه کباب را حداقل ۲ تا ۳ ساعت (و ترجیحا یک شب) در یخچال قرار دهید تا استراحت کند و سفت شود",
      "سیخ‌های کباب بناب معمولاً پهن‌تر و بلندتر از سیخ‌های معمولی هستند",
      "دست خود را با کمی آب سرد خیس کنید",
      "مقدار زیادی از مایه کباب (حدود ۲۰۰-۲۵۰ گرم برای هر سیخ) را بردارید و با فشار دست و انگشتان روی سیخ پهن کنید و به آن شکل دهید، به طوری که ضخامت کباب در همه جای سیخ یکسان باشد",
      "کباب‌ها را روی منقل با حرارت ملایم و یکنواخت زغال یا کباب‌پز گازی قرار دهید",
      "سیخ‌ها را به سرعت و مرتب بچرخانید تا کباب‌ها از سیخ نریزند و هر دو طرف به آرامی و یکدست پخته شوند",
      "هنگام پخت، ممکن است کمی چربی از کباب خارج شود که باعث شعله‌ور شدن زغال می‌شود؛ مراقب باشید کباب نسوزد",
      "گوجه‌فرنگی و فلفل سبز را نیز کباب کنید",
      "کباب بناب را بلافاصله با نان داغ یا چلو، سماق فراوان, ریحان و سبزیجات کبابی سرو کنید"
    ],
    "category": "kabab",
    "id": "dish-1765151418345-h83ir-5",
    "description": "کباب بناب",
    "calories": 450,
    "cookTime": 100,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "کباب شاندیزی",
    "recipeSteps": [
      "گوشت را به قطعات حدود ۵ سانتی‌متری برش بزنید (اگر دنده است، برش نزنید و به همان شکل استفاده کنید)",
      "پیازها را پوست گرفته و رنده کنید یا بسیار ریز خرد کنید و آب آن‌ها را با دست بگیرید و آب پیاز را دور بریزید، فقط تفاله پیاز را استفاده کنید",
      "در یک ظرف بزرگ، گوشت را به همراه تفاله پیاز، ماست چکیده، روغن زیتون، آب لیموترش، نیمی از زعفران دم‌کرده، نمک و فلفل سیاه مخلوط کنید",
      "مواد را به خوبی با دست ماساژ دهید تا گوشت کاملاً به مواد آغشته شود",
      "روی ظرف را با سلفون بپوشانید و حداقل ۲۴ تا ۴۸ ساعت در یخچال قرار دهید تا گوشت خوب مزه‌دار و نرم شود",
      "قبل از سیخ کشیدن، گوشت‌ها را از مواد مرینیت خارج کرده و کمی از پیازهای چسبیده به آن را جدا کنید",
      "گوشت‌ها را به ترتیب و با فاصله مناسب به سیخ بکشید (اگر از دنده استفاده می‌کنید، هر دنده را به یک سیخ مجزا بکشید)",
      "منقل ذغالی را آماده کنید و اجازه دهید ذغال‌ها کاملاً داغ و یکدست شوند و شعله مستقیم نداشته باشند",
      "سیخ‌ها را روی حرارت متوسط ذغال قرار دهید و مرتباً بچرخانید تا کباب‌ها به صورت یکنواخت پخته و طلایی شوند",
      "در حین پخت، با قلم‌مو کمی از بقیه زعفران دم‌کرده روی کباب‌ها بمالید تا خوش‌رنگ‌تر شوند",
      "کباب‌ها را زمانی که پخته و نرم شدند، از روی حرارت بردارید و بلافاصله با برنج زعفرانی، گوجه کبابی و پیاز و جعفری سرو کنید"
    ],
    "hasRealData": true,
    "name": "کباب شاندیزی",
    "category": "kabab",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت راسته گوسفندی یا دنده گوسفندی",
        "amount": 1200
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز بزرگ"
      },
      {
        "item": "ماست چکیده",
        "amount": 4,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "روغن زیتون"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "آب لیموترش تازه",
        "amount": 2
      },
      {
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 4,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1.5,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      }
    ],
    "id": "dish-1765151426321-etx5e-1",
    "calories": 450,
    "cookTime": 40,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "id": "dish-1765151426321-rsbb5-2",
    "description": "کباب نگین‌دار",
    "ingredients": [
      {
        "amount": 600,
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده گوسفندی و گوساله (۵۰-۵۰)"
      },
      {
        "item": "پیاز متوسط",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "item": "نمک",
        "amount": 1.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 2
      },
      {
        "amount": 200,
        "item": "سینه مرغ",
        "unit": "گرم"
      },
      {
        "amount": 0.5,
        "item": "فلفل دلمه‌ای سبز (اختیاری)",
        "unit": "عدد"
      },
      {
        "item": "فلفل دلمه‌ای قرمز (اختیاری)",
        "amount": 0.5,
        "unit": "عدد"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "کره آب‌شده"
      }
    ],
    "hasRealData": true,
    "name": "کباب نگین‌دار",
    "category": "kabab",
    "recipeSteps": [
      "برای آماده کردن مایه کباب کوبیده: پیازها را پوست گرفته و رنده ریز کنید",
      "آب پیاز رنده شده را کاملاً با دست بگیرید (خیلی مهم است که آب پیاز خارج شود)",
      "گوشت چرخ‌کرده را در یک کاسه بزرگ با پیاز رنده شده بدون آب، نمک و فلفل سیاه مخلوط کنید",
      "مایه کباب را به مدت حداقل ۱۵ تا ۲۰ دقیقه با دست ورز دهید تا کاملاً چسبندگی پیدا کند (این مرحله برای نریختن کباب از سیخ بسیار مهم است)",
      "روی مایه کباب را پوشانده و حداقل ۱ تا ۲ ساعت در یخچال استراحت دهید",
      "برای آماده کردن نگین‌ها: سینه مرغ را به تکه‌های بسیار کوچک و مکعبی (حدود ۰.۵ تا ۱ سانتی‌متر) خرد کنید",
      "در یک کاسه کوچک، تکه‌های مرغ را با یک قاشق غذاخوری زعفران دم‌کرده، کمی نمک و فلفل سیاه مخلوط کنید",
      "اگر از فلفل دلمه‌ای استفاده می‌کنید، آن را هم ریز مکعبی خرد کنید و با مرغ مخلوط کنید",
      "مایه کباب کوبیده را از یخچال خارج کرده و مجدداً کمی ورز دهید",
      "مقدار مناسبی از مایه کباب را برداشته و به سیخ بکشید و روی سیخ پهن کنید و فرم دهید (مانند کباب کوبیده)",
      "سپس، نگین‌های مرغ مزه‌دار شده را به آرامی و با فشار ملایم روی سطح کباب چسبانده و کمی فشار دهید تا به گوشت بچسبند",
      "منقل ذغالی با حرارت متوسط آماده کنید",
      "سیخ‌های کباب نگین‌دار را روی منقل قرار دهید و مرتباً بچرخانید تا کباب‌ها پخته و طلایی شوند",
      "در حین پخت، با قلم‌مو از بقیه زعفران دم‌کرده و کره آب‌شده روی کباب‌ها بمالید",
      "وقتی کباب‌ها کاملاً پختند و مرغ‌ها نیز طلایی شدند، از روی حرارت بردارید و با برنج، پیاز و جعفری و سماق سرو کنید"
    ],
    "calories": 520,
    "cookTime": 70,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "گوشت را به تکه‌های مکعبی یا مستطیلی متوسط (حدود ۲ در ۳ سانتی‌متر) برش بزنید",
      "پیاز را رنده کرده و آب آن را بگیرید و تفاله آن را استفاده کنید",
      "سیرها را رنده یا له کنید",
      "سبزیجات را ریز ساطوری کنید",
      "در یک ظرف بزرگ، گوشت خرد شده را با مغز گردوی چرخ‌کرده، رب انار، تفاله پیاز، سیر له شده، سبزیجات ساطوری، روغن زیتون، آب لیموترش، نمک و فلفل سیاه مخلوط کنید",
      "مواد را به خوبی با دست ماساژ دهید تا گوشت کاملاً به مواد آغشته شود",
      "روی ظرف را با سلفون بپوشانید و حداقل ۶ تا ۸ ساعت (ترجیحاً یک شب) در یخچال قرار دهید تا گوشت مزه‌دار شود",
      "پس از مزه‌دار شدن، گوشت‌ها را به سیخ بکشید (اگر از سیخ چوبی استفاده می‌کنید، آن‌ها را از نیم ساعت قبل در آب خیس کنید)",
      "منقل ذغالی با حرارت متوسط رو به بالا را آماده کنید (کباب ترش نیاز به حرارت کمی بیشتر دارد تا مغز پخت شود اما خشک نشود)",
      "سیخ‌ها را روی حرارت قرار دهید و مرتباً بچرخانید تا کباب‌ها از همه طرف پخته و کمی برشته شوند و رنگ تیره‌تری به خود بگیرند",
      "مراقب باشید به دلیل وجود رب انار، کباب نسوزد",
      "کباب‌ها را زمانی که پختند، از روی حرارت بردارید و بلافاصله با کته قالبی و ترشی یا زیتون پرورده گیلانی سرو کنید"
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 800,
        "item": "گوشت راسته گوساله یا گوسفندی"
      },
      {
        "unit": "گرم",
        "amount": 100,
        "item": "مغز گردوی چرخ‌کرده"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "رب انار ترش",
        "amount": 4
      },
      {
        "amount": 4,
        "unit": "حبه",
        "item": "سیر"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "پیاز متوسط"
      },
      {
        "unit": "گرم",
        "item": "سبزیجات معطر (ساطوری شده)",
        "amount": 100
      },
      {
        "item": "روغن زیتون",
        "amount": 4,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "آب لیموترش تازه",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      }
    ],
    "category": "kabab",
    "description": "کباب ترش گیلانی",
    "name": "کباب ترش گیلانی",
    "hasRealData": true,
    "id": "dish-1765151426321-dtp79-3",
    "calories": 420,
    "cookTime": 70,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1765151426321-fpuqo-4",
    "hasRealData": true,
    "name": "ریحان‌کباب",
    "description": "ریحان‌کباب",
    "recipeSteps": [
      "پیاز را رنده ریز کرده و آب آن را کاملاً بگیرید",
      "سیر را رنده یا له کنید",
      "ریحان‌های تازه را پس از شستن و خشک کردن، بسیار ریز ساطوری کنید",
      "در یک کاسه بزرگ، گوشت چرخ‌کرده را با پیاز رنده شده بدون آب، سیر له شده، ریحان ساطوری، نمک، فلفل سیاه و پودر سماق مخلوط کنید",
      "مایه کباب را به مدت ۱۰ تا ۱۵ دقیقه با دست خوب ورز دهید تا کاملاً چسبندگی پیدا کند و مواد به خورد هم بروند",
      "روی کاسه را با سلفون پوشانده و حداقل ۱ تا ۲ ساعت در یخچال قرار دهید تا مایه کباب استراحت کند و مزه‌ها با هم ترکیب شوند",
      "پس از استراحت, مایه کباب را از یخچال خارج کرده و به اندازه‌های دلخواه (مانند کباب لقمه یا کوبیده کوچک) فرم دهید و به سیخ بکشید",
      "می‌توانید از سیخ چوبی یا فلزی استفاده کنید",
      "منقل ذغالی با حرارت متوسط را آماده کنید",
      "سیخ‌های ریحان‌کباب را روی منقل قرار دهید و مرتباً بچرخانید تا کباب‌ها پخته و طلایی شوند و ریحان‌ها نسوزند",
      "می‌توانید در حین پخت کمی روغن زیتون روی کباب‌ها بمالید تا خشک نشوند",
      "زمانی که کباب‌ها کاملاً پختند، از روی حرارت بردارید و با نان داغ، پیاز، گوجه و لیموترش سرو کنید"
    ],
    "category": "kabab",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده گوسفندی و گوساله (۵۰-۵۰)",
        "amount": 600
      },
      {
        "amount": 150,
        "unit": "گرم",
        "item": "ریحان تازه (پاک کرده و ساطوری شده)"
      },
      {
        "item": "پیاز بزرگ",
        "unit": "عدد",
        "amount": 1
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 2
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک",
        "amount": 1
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "پودر سماق"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "روغن زیتون"
      }
    ],
    "calories": 450,
    "cookTime": 40,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "فیله یا راسته گوساله (برای برگ)",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "item": "پیاز بزرگ",
        "amount": 1
      },
      {
        "amount": 3,
        "unit": "قاشق غذاخوری",
        "item": "روغن زیتون (برای برگ)"
      },
      {
        "item": "زعفران دم‌کرده غلیظ (برای برگ)",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "نمک (برای برگ)"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه (برای برگ)",
        "amount": 0.5
      },
      {
        "amount": 400,
        "item": "گوشت چرخ‌کرده مخلوط (برای کوبیده)",
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "پیاز متوسط (آب گرفته برای کوبیده)",
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "نمک (برای کوبیده)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه (برای کوبیده)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "پیمانه",
        "item": "برنج ایرانی",
        "amount": 4
      },
      {
        "unit": "گرم",
        "amount": 100,
        "item": "کره"
      },
      {
        "item": "زعفران دم‌کرده (برای پلو)",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 4,
        "item": "گوجه‌فرنگی",
        "unit": "عدد"
      },
      {
        "unit": "به میزان لازم",
        "item": "سماق",
        "amount": 0
      }
    ],
    "hasRealData": true,
    "description": "چلوکباب سلطانی",
    "recipeSteps": [
      "آماده‌سازی کباب برگ: فیله یا راسته گوساله را به صورت ورقه‌های نازک (ضخامت حدود ۰.۵ تا ۰.۷ سانتی‌متر) برش بزنید و با بیفتک‌کوب کمی بکوبید تا نرم‌تر شوند",
      "پیاز را رنده کرده و آب آن را بگیرید. گوشت را با تفاله پیاز، روغن زیتون، نیمی از زعفران دم‌کرده, نمک و فلفل سیاه مخلوط کنید",
      "گوشت را به خوبی ماساژ داده و حداقل ۶ ساعت (ترجیحاً یک شب) در یخچال قرار دهید",
      "آماده‌سازی کباب کوبیده: پیاز را رنده ریز کرده و آب آن را کاملاً بگیرید",
      "گوشت چرخ‌کرده را با پیاز رنده شده بدون آب، نمک و فلفل سیاه در یک کاسه بزرگ مخلوط کنید",
      "مایه کوبیده را به مدت ۱۵ تا ۲۰ دقیقه با دست ورز دهید تا کاملاً چسبندگی پیدا کند",
      "روی مایه را پوشانده و حداقل ۱ ساعت در یخچال استراحت دهید",
      "سیخ کشیدن کباب‌ها: گوشت برگ را به سیخ‌های پهن فلزی بکشید. گوشت را به آرامی و با دقت روی سیخ پهن کنید و مطمئن شوید که به خوبی به سیخ چسبیده است",
      "مایه کوبیده را از یخچال خارج کرده و مجدداً کمی ورز دهید. مقداری از مایه را برداشته و به سیخ‌های پهن مخصوص کوبیده بکشید و فرم دهید",
      "کباب کردن: منقل ذغالی با حرارت متوسط رو به بالا را آماده کنید",
      "ابتدا سیخ‌های برگ را روی حرارت قرار دهید و مرتباً بچرخانید تا پخته و طلایی شوند (حدود ۱۰-۱۵ دقیقه)",
      "سپس سیخ‌های کوبیده را روی منقل قرار داده و مرتباً بچرخانید تا کباب‌ها پخته و از سیخ نریزند و کاملاً برشته شوند",
      "گوجه‌فرنگی‌ها را نیز به سیخ کشیده و روی حرارت کباب کنید تا نرم و پخته شوند",
      "آماده‌سازی چلو: برنج را از ۲-۳ ساعت قبل با آب و نمک خیس کنید",
      "آب را در قابلمه جوش آورده و برنج خیس خورده را اضافه کنید. وقتی برنج نیم‌پز شد (اطراف نرم و مغز کمی سفت), آبکش کنید",
      "کف قابلمه کمی روغن ریخته و ته دیگ دلخواه (نان یا سیب‌زمینی) قرار دهید",
      "برنج آبکش شده را به قابلمه برگردانید و با ته قاشق چند سوراخ روی برنج ایجاد کنید. بقیه زعفران دم‌کرده را روی برنج بریزید و کره آب شده را نیز اضافه کنید",
      "درب قابلمه را با دم‌کنی بپوشانید و برنج را به مدت ۴۵ دقیقه تا ۱ ساعت با حرارت ملایم دم کنید",
      "سرو: چلوکباب سلطانی را با یک سیخ کباب برگ و یک سیخ کباب کوبیده، همراه با برنج زعفرانی، گوجه کبابی، پیاز و سماق فراوان سرو کنید"
    ],
    "category": "kabab",
    "id": "dish-1765151426321-81aaa-5",
    "name": "چلوکباب سلطانی",
    "calories": 570,
    "cookTime": 100,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1765151431308-jgnvc-1",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده (مخلوط گوسفند و گوساله)",
        "amount": 600
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط (رنده شده و آب گرفته شده)",
        "amount": 2
      },
      {
        "item": "آرد سوخاری یا آرد نخودچی",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "item": "نمک",
        "amount": 1.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "زردچوبه",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "روغن مایع (برای کباب کردن)"
      },
      {
        "item": "گوجه فرنگی",
        "amount": 4,
        "unit": "عدد"
      },
      {
        "amount": 4,
        "item": "فلفل سبز قلمی (اختیاری)",
        "unit": "عدد"
      },
      {
        "unit": "گرم",
        "item": "کره (برای روی کباب‌ها)",
        "amount": 50
      },
      {
        "item": "برنج ایرانی",
        "unit": "پیمانه",
        "amount": 4
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک و روغن (برای برنج)"
      }
    ],
    "category": "kabab",
    "description": "چلوکباب لقمه",
    "recipeSteps": [
      "پیازها را رنده کرده و آب آن‌ها را کاملا بگیرید و دور بریزید",
      "گوشت چرخ‌کرده را در یک کاسه بزرگ بریزید",
      "پیاز رنده شده و آب‌گرفته، آرد سوخاری یا نخودچی، نمک، فلفل سیاه، زردچوبه و ۱ قاشق غذاخوری زعفران دم‌کرده را به گوشت اضافه کنید",
      "مواد را به مدت حداقل ۱۰ دقیقه با دست خوب ورز دهید تا کاملا چسبندگی پیدا کند و از هم باز نشود",
      "روی ظرف را بپوشانید و حداقل ۲ ساعت در یخچال استراحت دهید تا مزه‌ها به خورد هم بروند",
      "پس از استراحت, از مایه کباب به اندازه یک نارنگی کوچک بردارید و به شکل مستطیل یا نواری روی سیخ‌های پهن کباب‌کوبیده یا سیخ چوبی (که از قبل در آب خیسانده‌اید) فرم دهید و به آرامی فشار دهید تا روی سیخ بچسبد",
      "اگر از سیخ چوبی استفاده می‌کنید، قبل از استفاده ۱۵ دقیقه در آب خیس کنید تا نسوزند",
      "کباب‌ها را روی منقل زغال, کباب‌پز گازی یا در تابه چدنی با کمی روغن داغ و حرارت متوسط کباب کنید",
      "در حین کباب کردن، سیخ‌ها را مرتب بچرخانید تا کباب‌ها یکنواخت بپزند، مغز پخت شوند و خشک نشوند",
      "گوجه فرنگی‌ها را از وسط نصف کرده و سیخ بزنید یا در کنار کباب‌ها روی منقل یا در تابه کباب کنید",
      "کره را با ۱ قاشق غذاخوری باقیمانده زعفران دم‌کرده مخلوط کرده و پس از پخت، روی کباب‌های داغ بمالید تا براق و خوش‌عطر شوند",
      "برنج را از قبل به مدت ۱ تا ۲ ساعت با آب و نمک خیس کنید",
      "برای تهیه چلو، برنج را آبکش کرده و دم بگذارید تا پخته شود",
      "چلوکباب لقمه را با چلو، گوجه کبابی، پیاز و جعفری خرد شده و سماق سرو کنید."
    ],
    "name": "چلوکباب لقمه",
    "hasRealData": true,
    "calories": 570,
    "cookTime": 100,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1765153056543-tmrue-5",
    "recipeSteps": [
      "فیله ماهی را به تکه‌های درشت برش دهید و با کمی نمک و زردچوبه مزه‌دار کنید",
      "پیاز را نگینی ریز خرد کنید و سیر را له کنید",
      "گشنیز و شنبلیله تازه را ریز خرد کنید",
      "رب تمر هندی را در نصف پیمانه آب گرم حل کرده و از صافی رد کنید تا تفاله آن جدا شود",
      "در یک قابلمه مناسب، روغن مایع را روی حرارت متوسط گرم کنید",
      "پیاز خرد شده را اضافه کرده و ۵-۷ دقیقه تفت دهید تا سبک و طلایی شود",
      "سیر له شده را اضافه کرده و ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود",
      "زردچوبه و فلفل قرمز را اضافه کرده و ۱ دقیقه تفت دهید تا عطر ادویه‌ها بلند شود",
      "ماهی‌های مزه‌دار شده را به قابلمه اضافه کنید و هر طرف را برای ۲ دقیقه با حرارت ملایم تفت دهید تا کمی رنگ بگیرند",
      "گشنیز و شنبلیله خرد شده را اضافه کنید و ۲ دقیقه تفت دهید",
      "آب و عصاره تمر هندی صاف شده را به قابلمه اضافه کنید. در صورت تمایل، لیمو عمانی‌های سوراخ شده را نیز اضافه کنید",
      "اجازه دهید سوپ به جوش آید، سپس حرارت را کم کرده، درب قابلمه را بگذارید و برای ۲۵ تا ۳۰ دقیقه بپزید تا ماهی کاملاً پخته و طعم‌ها به خوبی با هم ترکیب شوند",
      "نمک سوپ را تنظیم کنید. ماهی جنوب ممکن است به نمک کمتری نیاز داشته باشد",
      "سوپ ماهی جنوبی را گرم، همراه با برنج سفید یا نان، سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 400,
        "unit": "گرم",
        "item": "فیله ماهی سفید جنوب (مانند هامور یا شیر ماهی)"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 4
      },
      {
        "unit": "گرم",
        "amount": 50,
        "item": "گشنیز تازه (نصف دسته)"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "شنبلیله تازه (یا نصف قاشق چای‌خوری خشک)"
      },
      {
        "amount": 3,
        "unit": "قاشق غذاخوری",
        "item": "رب تمر هندی"
      },
      {
        "item": "آب گرم (برای رقیق کردن تمر هندی)",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری",
        "amount": 3
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "فلفل قرمز (یا بیشتر به دلخواه)",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "زردچوبه"
      },
      {
        "amount": 6,
        "unit": "پیمانه",
        "item": "آب (۱.۵ لیتر)"
      },
      {
        "item": "لیمو عمانی (اختیاری)",
        "unit": "عدد",
        "amount": 2
      }
    ],
    "hasRealData": true,
    "description": "سوپ ماهی جنوبی (مفطح ماهی)",
    "name": "سوپ ماهی جنوبی (مفطح ماهی)",
    "category": "soup",
    "calories": 300,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "category": "ash",
    "recipeSteps": [
      "حبوبات را بپزید.",
      "سبزی را اضافه کنید.",
      "رشته را ریخته و بگذارید جا بیفتد.",
      "با کشک و پیازداغ تزیین کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "نخود"
      },
      {
        "item": "لوبیا چیتی",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "amount": 0.5,
        "item": "عدس",
        "unit": "پیمانه"
      },
      {
        "amount": 250,
        "item": "رشته آش",
        "unit": "گرم"
      },
      {
        "item": "سبزی آش",
        "unit": "گرم",
        "amount": 500
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "کشک"
      },
      {
        "amount": 5,
        "unit": "قاشق",
        "item": "پیاز داغ و سیر داغ"
      }
    ],
    "id": "ash-1",
    "description": "آش رشته مجلسی با بنشن کامل و کشک فراوان",
    "name": "آش رشته سنتی",
    "calories": 300,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "ash-2",
    "description": "آش جو غلیظ با کشک و گوشت (اختیاری)",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "جو پوست کنده",
        "amount": 2
      },
      {
        "item": "نخود و لوبیا",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 400,
        "item": "سبزی آش",
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "کشک"
      }
    ],
    "recipeSteps": [
      "جو را از شب قبل خیس کنید.",
      "جو و حبوبات را کامل بپزید تا لعاب بیندازد.",
      "سبزی را اضافه کنید.",
      "در انتها کشک را مخلوط کنید."
    ],
    "category": "ash",
    "name": "آش جو (رستورانی)",
    "calories": 300,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "آش سفید و خنک با دوغ محلی",
    "ingredients": [
      {
        "unit": "لیتر",
        "item": "دوغ محلی ترش",
        "amount": 2
      },
      {
        "item": "برنج",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "unit": "پیمانه",
        "item": "نخود پخته",
        "amount": 1
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "سبزی (گشنیز و تره)"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "تخم مرغ"
      }
    ],
    "recipeSteps": [
      "تخم مرغ و برنج را با دوغ مخلوط کرده و مدام هم بزنید تا بجوشد.",
      "سبزی و نخود را اضافه کنید.",
      "سیر خام له شده را در انتها اضافه کنید."
    ],
    "name": "آش دوغ اردبیل",
    "category": "ash",
    "id": "ash-3",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "description": "آش مقوی با گوشت و حبوبات فراوان",
    "name": "آش شله قلمکار",
    "ingredients": [
      {
        "item": "گوشت گوسفندی",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "گندم",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "انواع حبوبات",
        "amount": 2
      },
      {
        "amount": 500,
        "item": "سبزی آش",
        "unit": "گرم"
      }
    ],
    "recipeSteps": [
      "گوشت را جداگانه بپزید و ریش کنید.",
      "گندم و حبوبات را بپزید تا کاملا له شوند.",
      "گوشت و سبزی را اضافه کرده و آنقدر هم بزنید تا کشدار شود."
    ],
    "category": "ash",
    "id": "ash-4",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "آش ملس و لذیذ ویژه شب یلدا",
    "recipeSteps": [
      "لپه و برنج را بپزید.",
      "گوشت قلقلی‌ها را سرخ کرده و اضافه کنید.",
      "آب انار و رب انار را ریخته و بگذارید جا بیفتد."
    ],
    "category": "ash",
    "name": "آش انار",
    "id": "ash-5",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "برنج"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "لپه"
      },
      {
        "item": "آب انار",
        "unit": "پیمانه",
        "amount": 4
      },
      {
        "amount": 200,
        "item": "گوشت قلقلی",
        "unit": "گرم"
      },
      {
        "item": "نعناع داغ",
        "amount": 2,
        "unit": "قاشق"
      }
    ],
    "calories": 300,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "برنج"
      },
      {
        "amount": 0.5,
        "item": "لپه",
        "unit": "پیمانه"
      },
      {
        "item": "گوجه فرنگی پوره شده",
        "unit": "کیلوگرم",
        "amount": 1
      },
      {
        "item": "سبزی (تره و جعفری)",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "item": "آبغوره",
        "amount": 0.5
      }
    ],
    "id": "ash-6",
    "name": "آش گوجه‌فرنگی (تبریز)",
    "recipeSteps": [
      "لپه و برنج را بپزید.",
      "سبزی و پوره گوجه را اضافه کنید.",
      "در انتها آبغوره و نمک را تنظیم کنید."
    ],
    "description": "آش ترش و خوشرنگ با گوجه و آبغوره",
    "category": "ash",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "نخود"
      },
      {
        "amount": 1,
        "item": "برنج نیم دانه",
        "unit": "پیمانه"
      },
      {
        "item": "گوشت",
        "unit": "گرم",
        "amount": 200
      },
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "کشک"
      }
    ],
    "name": "آش ماسوا (لرستان)",
    "recipeSteps": [
      "نخود و برنج را بپزید.",
      "گوشت پخته را اضافه کنید.",
      "کشک را در انتها ریخته و با پیازداغ فراوان میل کنید."
    ],
    "description": "آش سنتی با کشک و برنج",
    "id": "ash-7",
    "category": "ash",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "ash-8",
    "category": "ash",
    "name": "آش ترخینه کرمانشاه",
    "description": "آش درمانی و مقوی با ترخینه محلی",
    "recipeSteps": [
      "ترخینه را خیس کنید.",
      "با حبوبات بپزید.",
      "سبزی و نعناع داغ بزنید."
    ],
    "ingredients": [
      {
        "item": "ترخینه",
        "unit": "عدد",
        "amount": 3
      },
      {
        "item": "حبوبات",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "item": "سبزی آش",
        "amount": 300,
        "unit": "گرم"
      }
    ],
    "calories": 300,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "حبوبات را بپزید.",
      "میوه‌ها و چغندر را اضافه کنید.",
      "در آخر رشته را بریزید."
    ],
    "name": "آش میوه (همدان)",
    "category": "ash",
    "ingredients": [
      {
        "amount": 1,
        "item": "انواع میوه خشک",
        "unit": "پیمانه"
      },
      {
        "unit": "گرم",
        "item": "رشته آش",
        "amount": 100
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "چغندر"
      }
    ],
    "id": "ash-9",
    "description": "آش ملس با انواع آلوی خشک",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "عدس را بپزید.",
      "اماج‌ها را درست کرده و در آش بریزید.",
      "با پیازداغ فراوان سرو کنید."
    ],
    "id": "ash-10",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "آرد گندم (برای اماج)"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "عدس"
      },
      {
        "unit": "گرم",
        "item": "سبزی (صحرایی)",
        "amount": 400
      }
    ],
    "category": "ash",
    "name": "آش اماج",
    "description": "آش قدیمی با دانه‌های خمیری",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "ash-11",
    "description": "آش ترش و مقوی اصفهانی",
    "ingredients": [
      {
        "amount": 100,
        "unit": "گرم",
        "item": "سماق خشک"
      },
      {
        "amount": 1,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "گوشت قلقلی"
      }
    ],
    "category": "ash",
    "recipeSteps": [
      "آب سماق را بگیرید.",
      "با برنج و سبزی بپزید.",
      "گوشت قلقلی را در انتها اضافه کنید."
    ],
    "name": "آش سماق",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "ash",
    "id": "ash-12",
    "ingredients": [
      {
        "amount": 200,
        "unit": "گرم",
        "item": "زرشک تازه"
      },
      {
        "unit": "پیمانه",
        "item": "حبوبات",
        "amount": 1
      },
      {
        "item": "رشته آش",
        "unit": "گرم",
        "amount": 100
      }
    ],
    "description": "آش خوشرنگ و کوهستانی",
    "recipeSteps": [
      "آب زرشک را به آش پخته شده اضافه کنید.",
      "بگذارید رنگ بیندازد."
    ],
    "name": "آش زرشک",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "آش شیرین و مقوی زمستانی",
    "name": "آش کدو حلوایی",
    "category": "ash",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "کدو حلوایی له شده"
      },
      {
        "amount": 0.5,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "ماش"
      }
    ],
    "id": "ash-13",
    "recipeSteps": [
      "ماش و برنج را بپزید.",
      "کدو را اضافه کنید تا یکدست شود.",
      "با دارچین سرو کنید."
    ],
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "گندم پوست کنده"
      },
      {
        "item": "نخود و پیاز",
        "unit": "پیمانه",
        "amount": 1
      }
    ],
    "category": "ash",
    "recipeSteps": [
      "گندم و حبوبات را طولانی بپزید.",
      "پیازداغ فراوان بزنید."
    ],
    "name": "آش گندم (یزد)",
    "id": "ash-14",
    "description": "آش غلیظ و سیرکننده بدون سبزی",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "ash-15",
    "ingredients": [
      {
        "item": "ماش",
        "unit": "پیمانه",
        "amount": 1.5
      },
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 0.5
      },
      {
        "item": "شلغم",
        "unit": "عدد",
        "amount": 2
      }
    ],
    "category": "ash",
    "name": "آش ماش",
    "description": "آش سبک و زودهضم",
    "recipeSteps": [
      "ماش و برنج را بپزید.",
      "شلغم خرد شده را اضافه کنید.",
      "با نعناع داغ سرو کنید."
    ],
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "کوکو سبزی با مغز گردو و زرشک",
    "id": "kuku-1",
    "name": "کوکو سبزی مجلسی",
    "ingredients": [
      {
        "item": "سبزی کوکو",
        "unit": "گرم",
        "amount": 500
      },
      {
        "amount": 5,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "unit": "قاشق",
        "amount": 3,
        "item": "گردو خرد شده"
      },
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "زرشک"
      }
    ],
    "category": "kuku",
    "recipeSteps": [
      "سبزی را با تخم مرغ و ادویه بزنید.",
      "گردو و زرشک را اضافه کنید.",
      "در تابه با روغن داغ سرخ کنید."
    ],
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "kuku-2",
    "name": "کوکو سیب‌زمینی (پخته)",
    "description": "کوکو سیب‌زمینی سنتی و نرم",
    "recipeSteps": [
      "سیب زمینی را له کنید.",
      "با پیاز و تخم مرغ مخلوط کنید.",
      "به شکل دایره سرخ کنید."
    ],
    "ingredients": [
      {
        "unit": "عدد",
        "item": "سیب زمینی پخته",
        "amount": 4
      },
      {
        "item": "تخم مرغ",
        "amount": 3,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز رنده شده"
      }
    ],
    "category": "kuku",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "کتلت ترد با گوشت و سیب زمینی خام",
    "category": "kuku",
    "recipeSteps": [
      "آب سیب زمینی و پیاز را بگیرید.",
      "با گوشت و ادویه ورز دهید.",
      "در روغن سرخ کنید."
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گوشت چرخ‌کرده"
      },
      {
        "item": "سیب زمینی خام رنده شده",
        "unit": "عدد",
        "amount": 3
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز"
      },
      {
        "item": "آرد نخودچی",
        "unit": "قاشق",
        "amount": 2
      }
    ],
    "id": "kuku-3",
    "name": "کتلت گوشت کلاسیک",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "item": "مایه کوکو سبزی",
        "amount": 1,
        "unit": "واحد"
      },
      {
        "unit": "واحد",
        "amount": 1,
        "item": "مایه کوکو سیب زمینی"
      }
    ],
    "description": "ترکیب زیبای کوکو سبزی و کوکو سیب زمینی",
    "category": "kuku",
    "recipeSteps": [
      "ابتدا یک لایه را سرخ کنید.",
      "لایه دوم را روی آن بریزید و درب تابه را بگذارید."
    ],
    "name": "کوکو دورنگ",
    "id": "kuku-4",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "لوبیا سبز خرد شده",
        "amount": 2
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "هویج نگینی"
      },
      {
        "amount": 0.5,
        "item": "سیب زمینی نگینی",
        "unit": "پیمانه"
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "تخم مرغ"
      }
    ],
    "recipeSteps": [
      "همه مواد را جدا پخته یا سرخ کنید.",
      "با تخم مرغ مخلوط و سرخ کنید."
    ],
    "description": "کوکو مجلسی و بسیار مقوی",
    "name": "کوکو لوبیا سبز (تبریزی)",
    "category": "kuku",
    "id": "kuku-5",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "کوکو رژیمی و سبک",
    "name": "کوکو کدو سبز",
    "category": "kuku",
    "recipeSteps": [
      "آب کدو را بگیرید.",
      "با مواد مخلوط و سرخ کنید."
    ],
    "ingredients": [
      {
        "unit": "عدد",
        "item": "کدو سبز رنده شده",
        "amount": 4
      },
      {
        "unit": "عدد",
        "amount": 3,
        "item": "تخم مرغ"
      },
      {
        "unit": "قاشق",
        "item": "شوید",
        "amount": 2
      }
    ],
    "id": "kuku-6",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "شامی ترد با لپه و گوشت",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت پخته",
        "amount": 200
      },
      {
        "amount": 200,
        "item": "لپه پخته",
        "unit": "گرم"
      },
      {
        "item": "تخم مرغ",
        "amount": 2,
        "unit": "عدد"
      }
    ],
    "name": "شامی پوک (گیلانی)",
    "id": "kuku-7",
    "category": "kuku",
    "recipeSteps": [
      "گوشت و لپه را چرخ کنید.",
      "با تخم مرغ ورز داده و در روغن سرخ کنید."
    ],
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "کوکو بادمجان",
    "category": "kuku",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "بادمجان کبابی",
        "amount": 3
      },
      {
        "amount": 3,
        "item": "تخم مرغ",
        "unit": "عدد"
      },
      {
        "item": "سیر",
        "amount": 2,
        "unit": "حبه"
      }
    ],
    "recipeSteps": [
      "بادمجان را ساطوری کنید.",
      "با سیر و تخم مرغ سرخ کنید."
    ],
    "id": "kuku-8",
    "description": "کوکو با طعم بادمجان کبابی",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "گوجه را سرخ کنید تا آبش کشیده شود.",
      "رب را تفت دهید.",
      "تخم مرغ را اضافه کنید."
    ],
    "category": "kuku",
    "id": "kuku-9",
    "name": "املت گوجه‌فرنگی (قهوه‌خانه‌ای)",
    "description": "املت اصیل با رب و گوجه فراوان",
    "ingredients": [
      {
        "amount": 4,
        "unit": "عدد",
        "item": "گوجه فرنگی"
      },
      {
        "amount": 1,
        "item": "رب گوجه",
        "unit": "قاشق"
      },
      {
        "unit": "عدد",
        "item": "تخم مرغ",
        "amount": 3
      }
    ],
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "kuku",
    "ingredients": [
      {
        "item": "اسفناج تازه",
        "unit": "گرم",
        "amount": 500
      },
      {
        "amount": 3,
        "unit": "قاشق",
        "item": "پیاز داغ"
      },
      {
        "item": "تخم مرغ",
        "amount": 2,
        "unit": "عدد"
      }
    ],
    "description": "املت اسفناج و پیاز داغ",
    "name": "نرگسی اسفناج",
    "recipeSteps": [
      "اسفناج را بپزید.",
      "با پیازداغ تفت دهید.",
      "تخم مرغ را روی آن بشکنید."
    ],
    "id": "kuku-10",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "کوکو والک",
    "description": "کوکو بهاری با سبزی والک",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "سبزی والک"
      },
      {
        "amount": 4,
        "unit": "عدد",
        "item": "تخم مرغ"
      }
    ],
    "id": "kuku-11",
    "recipeSteps": [
      "والک را خرد کنید.",
      "مانند کوکو سبزی بپزید."
    ],
    "category": "kuku",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "item": "سینه مرغ چرخ شده",
        "amount": 300
      },
      {
        "item": "سیب زمینی پخته",
        "unit": "عدد",
        "amount": 2
      }
    ],
    "recipeSteps": [
      "مواد را مخلوط و سرخ کنید."
    ],
    "description": "کتلت سبک با سینه مرغ",
    "id": "kuku-12",
    "category": "kuku",
    "name": "کتلت مرغ",
    "calories": 330,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "شامی با سس رب انار و گردو",
    "name": "شامی کباب (لرستان)",
    "recipeSteps": [
      "کتلت‌ها را سرخ کنید.",
      "در سس رب انار و گردو غوطه‌ور کنید تا بپزد."
    ],
    "ingredients": [
      {
        "amount": 300,
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم"
      },
      {
        "amount": 0.5,
        "item": "رب انار",
        "unit": "پیمانه"
      },
      {
        "unit": "گرم",
        "amount": 50,
        "item": "گردو"
      }
    ],
    "category": "kuku",
    "id": "kuku-13",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "کوکو لطیف و خوشمزه",
    "category": "kuku",
    "recipeSteps": [
      "گل کلم را نیم‌پز کنید.",
      "با تخم مرغ سرخ کنید."
    ],
    "id": "kuku-14",
    "ingredients": [
      {
        "unit": "عدد کوچک",
        "amount": 1,
        "item": "گل کلم ریز شده"
      },
      {
        "item": "تخم مرغ",
        "amount": 3,
        "unit": "عدد"
      }
    ],
    "name": "کوکو گل کلم",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "املت را کنار خوراک لوبیا سرو کنید."
    ],
    "category": "kuku",
    "name": "املت شاپوری",
    "id": "kuku-15",
    "description": "املت گیلانی با لوبیا چیتی",
    "ingredients": [
      {
        "amount": 1,
        "item": "املت ساده",
        "unit": "واحد"
      },
      {
        "amount": 1,
        "unit": "کاسه",
        "item": "خوراک لوبیا"
      }
    ],
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "مواد میانی را نیم‌پز و تفت دهید.",
      "داخل برگ‌ها بپیچید.",
      "با سس سرکه و شیره بپزید."
    ],
    "description": "دلمه با چاشنی ملس سرکه و شیره",
    "category": "dolma",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "برگ مو تازه",
        "amount": 50
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "برنج"
      },
      {
        "item": "لپه",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم",
        "amount": 200
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "سبزی دلمه"
      }
    ],
    "name": "دلمه برگ مو (مجلسی)",
    "id": "dolma-1",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dolma-2",
    "category": "dolma",
    "recipeSteps": [
      "مواد را بسیار ورز دهید تا چسبنده شود.",
      "گلوله‌های بزرگ درست کرده و مغز بگذارید.",
      "در سس گوجه به آرامی بپزید."
    ],
    "description": "کوفته بزرگ با مغز آلو، گردو و پیاز داغ",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده",
        "amount": 500
      },
      {
        "amount": 1,
        "item": "لپه و برنج له شده",
        "unit": "پیمانه"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "تخم مرغ"
      },
      {
        "unit": "گرم",
        "item": "سبزی کوفته",
        "amount": 200
      }
    ],
    "name": "کوفته تبریزی اصیل",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "dolma",
    "id": "dolma-3",
    "description": "دلمه رنگارنگ فلفل دلمه‌ای، بادمجان و گوجه",
    "recipeSteps": [
      "داخل سبزیجات را خالی کنید.",
      "با مایه دلمه پر کنید.",
      "در سس رب گوجه بپزید."
    ],
    "ingredients": [
      {
        "amount": 6,
        "unit": "عدد",
        "item": "بادمجان و فلفل و گوجه"
      },
      {
        "unit": "واحد",
        "amount": 1,
        "item": "مایه دلمه"
      }
    ],
    "name": "دلمه بادمجان و فلفل",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "dolma",
    "id": "dolma-4",
    "ingredients": [
      {
        "item": "برنج",
        "unit": "پیمانه",
        "amount": 2
      },
      {
        "amount": 200,
        "item": "گوشت",
        "unit": "گرم"
      }
    ],
    "recipeSteps": [
      "مواد را مخلوط و گرد کنید.",
      "بپزید."
    ],
    "description": "کوفته سنتی با برنج فراوان",
    "name": "کوفته برنجی",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "دلمه سبک و تابستانی",
    "id": "dolma-5",
    "recipeSteps": [
      "کدو را خالی و پر کنید."
    ],
    "name": "دلمه کدو سبز",
    "category": "dolma",
    "ingredients": [
      {
        "amount": 5,
        "item": "کدو سبز درشت",
        "unit": "عدد"
      },
      {
        "unit": "واحد",
        "amount": 1,
        "item": "مایه دلمه"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "سبزی را با گوشت و برنج ورز دهید.",
      "بپزید."
    ],
    "ingredients": [
      {
        "item": "سبزی معطر",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "item": "برنج و نخودچی",
        "unit": "پیمانه",
        "amount": 1
      }
    ],
    "name": "کوفته سبزی شیرازی",
    "category": "dolma",
    "id": "dolma-6",
    "description": "کوفته معطر با سبزیجات فراوان",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "dolma",
    "recipeSteps": [
      "کلم را در آب جوش نرم کنید.",
      "بپیچید و بپزید."
    ],
    "ingredients": [
      {
        "item": "کلم برگ",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "مایه دلمه",
        "amount": 1,
        "unit": "واحد"
      }
    ],
    "description": "دلمه شیرین یا ملس با کلم سفید",
    "id": "dolma-7",
    "name": "دلمه کلم برگ",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "dolma",
    "name": "کوفته نخودچی (اراک)",
    "description": "کوفته ساده با آرد نخودچی",
    "recipeSteps": [
      "ورز دهید و در سس بپزید."
    ],
    "id": "dolma-8",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت",
        "amount": 300
      },
      {
        "item": "آرد نخودچی",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "دلمه پیاز",
    "id": "dolma-9",
    "description": "دلمه متفاوت و لذیذ با پیاز سفید",
    "recipeSteps": [
      "لایه‌های پیاز را جدا کنید.",
      "پر کرده و بپزید."
    ],
    "ingredients": [
      {
        "item": "پیاز بزرگ",
        "unit": "عدد",
        "amount": 4
      },
      {
        "amount": 1,
        "unit": "واحد",
        "item": "مایه دلمه"
      }
    ],
    "category": "dolma",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "کوفته هلو (شیراز)",
    "recipeSteps": [
      "مانند کوفته بپزید."
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت",
        "amount": 300
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "هویج رنده شده"
      }
    ],
    "description": "کوفته با طعم ملس و گوشت مرغ یا گوسفند",
    "id": "dolma-10",
    "category": "dolma",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 400,
        "unit": "گرم",
        "item": "سوسیس"
      },
      {
        "unit": "عدد",
        "amount": 3,
        "item": "پیاز فراوان"
      },
      {
        "unit": "قاشق",
        "item": "رب گوجه",
        "amount": 2
      }
    ],
    "category": "fastfood",
    "id": "mix-1",
    "name": "خوراک سوسیس بندری",
    "recipeSteps": [
      "پیاز را خلالی سرخ کنید.",
      "سوسیس را اضافه کنید.",
      "رب و ادویه تند بزنید."
    ],
    "description": "خوراک تند سوسیس و پیاز",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 500,
        "unit": "گرم",
        "item": "کشک"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "گردو خرد شده"
      },
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "نعناع داغ"
      }
    ],
    "description": "غذای فوری با کشک و گردو",
    "category": "nani",
    "id": "mix-2",
    "recipeSteps": [
      "پیاز و گردو و نعناع را تفت دهید.",
      "کشک رقیق شده را اضافه کنید و قبل از جوش آمدن بردارید."
    ],
    "name": "کله‌جوش اصفهانی",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "mix-3",
    "description": "خوراک مجلسی و لذیذ",
    "category": "nani",
    "name": "خوراک زبان با سس قارچ",
    "recipeSteps": [
      "زبان را بپزید.",
      "با سس قارچ و خامه تفت دهید."
    ],
    "ingredients": [
      {
        "amount": 1,
        "unit": "عدد",
        "item": "زبان گوساله"
      },
      {
        "amount": 200,
        "item": "قارچ",
        "unit": "گرم"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 5,
        "unit": "عدد",
        "item": "بادمجان"
      },
      {
        "item": "کشک",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "id": "mix-4",
    "name": "کشک بادمجان",
    "category": "local",
    "recipeSteps": [
      "بادمجان را سرخ یا کبابی کنید.",
      "با کشک و سیرداغ مخلوط کنید."
    ],
    "description": "غذای محبوب ایرانی",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "mix-5",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 5,
        "item": "بادمجان کبابی"
      },
      {
        "amount": 3,
        "item": "گوجه",
        "unit": "عدد"
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 5
      }
    ],
    "name": "میرزا قاسمی",
    "recipeSteps": [
      "بادمجان و گوجه را تفت دهید.",
      "تخم مرغ بزنید."
    ],
    "description": "غذای شمالی با بادمجان کبابی",
    "category": "local",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "لوبیا را بپزید تا لعاب بیندازد."
    ],
    "id": "mix-6",
    "name": "خوراک لوبیا چیتی",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "لوبیا چیتی"
      },
      {
        "unit": "گرم",
        "item": "قارچ",
        "amount": 100
      }
    ],
    "description": "خوراک گرم زمستانی",
    "category": "nani",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "عدسی",
    "id": "mix-7",
    "description": "صبحانه مقوی ایرانی",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "عدس"
      },
      {
        "amount": 2,
        "unit": "قاشق",
        "item": "پیاز داغ"
      }
    ],
    "recipeSteps": [
      "عدس را با پیازداغ و گلپر بپزید."
    ],
    "category": "nani",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "unit": "عدد",
        "item": "سینه مرغ",
        "amount": 1
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "کدو و هویج"
      }
    ],
    "recipeSteps": [
      "مواد را بخارپز یا گریل کنید."
    ],
    "description": "خوراک سالم و رژیمی",
    "id": "mix-8",
    "category": "nani",
    "name": "خوراک مرغ و سبزیجات",
    "calories": 350,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "واویشکا گوشت",
    "description": "خوراک شمالی سریع",
    "category": "local",
    "id": "mix-9",
    "ingredients": [
      {
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم",
        "amount": 200
      },
      {
        "unit": "عدد",
        "item": "پیاز و گوجه",
        "amount": 2
      }
    ],
    "recipeSteps": [
      "مواد را تفت دهید و با نان سرو کنید."
    ],
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "غذای گیاهی و ساده",
    "id": "mix-10",
    "category": "nani",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "بادمجان",
        "amount": 3
      },
      {
        "unit": "عدد",
        "item": "کدو و سیب زمینی",
        "amount": 2
      }
    ],
    "name": "یتیمچه",
    "recipeSteps": [
      "همه سبزیجات را نگینی خرد کرده و با گوجه بپزید."
    ],
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "mix-11",
    "description": "جگر گوسفند با پیاز و رب",
    "recipeSteps": [
      "با پیاز زیاد تفت دهید."
    ],
    "category": "nani",
    "name": "خوراک جگر (جغور بغور)",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "جگر گوسفند",
        "amount": 300
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "mix-12",
    "description": "سمبوسه تند با نان لواش",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "نان لواش",
        "amount": 4
      }
    ],
    "category": "fastfood",
    "name": "سمبوسه آبادانی",
    "recipeSteps": [
      "سیب زمینی را لای نان پیچیده و سرخ کنید."
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "mix-13",
    "category": "fastfood",
    "name": "فلافل خانگی",
    "description": "نخود چرخ شده سرخ شده",
    "recipeSteps": [
      "نخود را چرخ کرده و سرخ کنید."
    ],
    "ingredients": [
      {
        "item": "نخود",
        "unit": "پیمانه",
        "amount": 2
      }
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "unit": "عدد",
        "item": "مغز گوسفند",
        "amount": 2
      }
    ],
    "id": "mix-14",
    "recipeSteps": [
      "بپزید و با آبلیمو تفت دهید."
    ],
    "category": "nani",
    "name": "خوراک مغز",
    "description": "مغز گوسفند با جعفری و لیمو",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "گوشت چرخ شده در خمیر",
    "name": "پیراشکی گوشت فرز",
    "ingredients": [
      {
        "amount": 10,
        "unit": "عدد",
        "item": "خمیر پیراشکی"
      }
    ],
    "id": "mix-15",
    "category": "fastfood",
    "recipeSteps": [
      "پر کرده و سرخ کنید."
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خوراک کالباس با قارچ",
    "category": "fastfood",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 200,
        "item": "کالباس"
      }
    ],
    "description": "تفت داده کالباس و قارچ",
    "id": "mix-16",
    "recipeSteps": [
      "با قارچ و پیاز تفت دهید."
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "غذای سنتی سریع",
    "category": "nani",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 3,
        "item": "تخم مرغ"
      }
    ],
    "id": "mix-17",
    "recipeSteps": [
      "پیاز را سرخ کرده و آب بریزید."
    ],
    "name": "اشکنه تخم مرغ",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "item": "لوبیا قرمز",
        "unit": "پیمانه"
      }
    ],
    "description": "خوراک لوبیا تند و غلیظ",
    "id": "mix-18",
    "recipeSteps": [
      "با رب و سیر بپزید."
    ],
    "category": "nani",
    "name": "خوراک لوبیا قرمز",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 400,
        "item": "مرغ چرخ شده",
        "unit": "گرم"
      }
    ],
    "recipeSteps": [
      "در تابه پهن کرده و سرخ کنید."
    ],
    "id": "mix-19",
    "category": "kabab",
    "name": "کباب تابه ای مرغ",
    "description": "مرغ چرخ شده سرخ شده",
    "calories": 450,
    "cookTime": 40,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "mix-20",
    "category": "fastfood",
    "name": "خوراک قارچ و پنیر",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "قارچ"
      }
    ],
    "recipeSteps": [
      "قارچ را تفت داده و پنیر بزنید."
    ],
    "description": "قارچ تفت داده با پنیر پیتزا",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "اسفناج با تخم مرغ و پیازداغ",
    "category": "nani",
    "name": "نرگسی اسفناج مجلسی",
    "id": "mix-21",
    "recipeSteps": [
      "اسفناج را بپزید و تخم مرغ بزنید."
    ],
    "ingredients": [
      {
        "amount": 500,
        "item": "اسفناج",
        "unit": "گرم"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "mix-22",
    "recipeSteps": [
      "با پیاز و سیر طولانی بپزید."
    ],
    "ingredients": [
      {
        "item": "سیرابی",
        "amount": 1,
        "unit": "کیلو"
      }
    ],
    "description": "سیرابی پخته شده مقوی",
    "name": "خوراک سیرابی با سیر",
    "category": "local",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "سیب زمینی را بکوبید و کشک بزنید."
    ],
    "id": "mix-23",
    "category": "local",
    "description": "سیب زمینی پخته با کشک",
    "ingredients": [
      {
        "amount": 1,
        "unit": "لیوان",
        "item": "کشک"
      }
    ],
    "name": "کشک سیب زمینی کرمان",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "fastfood",
    "recipeSteps": [
      "مرغ را خرد کرده و تند تفت دهید."
    ],
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "سینه مرغ"
      }
    ],
    "id": "mix-24",
    "description": "مرغ تند با پیاز و فلفل",
    "name": "خوراک مرغ بندری",
    "calories": 700,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "mix-25",
    "category": "nani",
    "ingredients": [
      {
        "amount": 3,
        "unit": "عدد",
        "item": "کدو سبز"
      }
    ],
    "recipeSteps": [
      "با گوجه فرنگی بپزید."
    ],
    "description": "سبزیجات بخارپز با گوجه",
    "name": "خوراک بادمجان و کدو",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "مواد را چرخ کرده و سرخ کنید."
    ],
    "description": "شامی ترد با لپه و گوشت",
    "ingredients": [
      {
        "item": "لپه پخته",
        "unit": "پیمانه",
        "amount": 1
      }
    ],
    "id": "mix-26",
    "category": "kuku",
    "name": "شامی لپه",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "دل را با پیاز و رب تفت دهید."
    ],
    "name": "خوراک دل مرغ تند",
    "id": "mix-27",
    "description": "دل مرغ تفت داده با پیاز",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "دل مرغ",
        "amount": 300
      }
    ],
    "category": "nani",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "سیب زمینی و ذرت در خمیر",
    "recipeSteps": [
      "با سبزیجات پر کرده و سرخ کنید."
    ],
    "category": "fastfood",
    "name": "پیراشکی سبزیجات",
    "id": "mix-28",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 10,
        "item": "خمیر پیراشکی"
      }
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "خوراک لوبیا چشم بلبلی",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "لوبیا چشم بلبلی"
      }
    ],
    "category": "nani",
    "description": "لوبیا با شوید و سیر",
    "id": "mix-29",
    "recipeSteps": [
      "با شوید و پیازداغ بپزید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "fastfood",
    "id": "mix-30",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 300,
        "item": "سوسیس"
      }
    ],
    "recipeSteps": [
      "سوسیس را سرخ کرده و پنیر بزنید."
    ],
    "description": "سوسیس سرخ شده با پنیر گودا",
    "name": "خوراک سوسیس و پنیر",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "جو و هویج را بپزید.",
      "رب تفت داده و مرغ را اضافه کنید.",
      "با جعفری تزیین کنید."
    ],
    "name": "سوپ جو قرمز",
    "description": "سوپ جو کلاسیک رستورانی با رب گوجه",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "جو پرک",
        "amount": 1
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "هویج رنده شده"
      },
      {
        "unit": "پیمانه",
        "item": "مرغ پخته ریش شده",
        "amount": 0.5
      },
      {
        "item": "رب گوجه",
        "amount": 2,
        "unit": "قاشق"
      }
    ],
    "id": "soup-1",
    "category": "soup",
    "calories": 300,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "سوپ شیر و خامه",
    "category": "soup",
    "id": "soup-2",
    "description": "سوپ سفید غلیظ و مجلسی",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "جو پوست کنده پخته"
      },
      {
        "unit": "لیتر",
        "item": "شیر",
        "amount": 1
      },
      {
        "item": "خامه",
        "amount": 2,
        "unit": "قاشق"
      },
      {
        "amount": 100,
        "item": "قارچ",
        "unit": "گرم"
      }
    ],
    "recipeSteps": [
      "جو و قارچ را در شیر بپزید.",
      "در انتها خامه را اضافه کرده و هم نزنید تا نبرد."
    ],
    "calories": 420,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "soup",
    "recipeSteps": [
      "سبزیجات را بپزید.",
      "رشته را در ۱۰ دقیقه آخر اضافه کنید."
    ],
    "ingredients": [
      {
        "amount": 1,
        "item": "رشته سوپی",
        "unit": "پیمانه"
      },
      {
        "unit": "عدد",
        "item": "سیب زمینی و هویج",
        "amount": 1
      }
    ],
    "id": "soup-3",
    "description": "سوپ رشته فرنگی سریع",
    "name": "سوپ ورمیشل",
    "calories": 300,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "عدس را بپزید تا له شود.",
      "با پیازداغ و فلفل فراوان میل کنید."
    ],
    "description": "سوپ تند و مقوی جنوبی",
    "category": "soup",
    "id": "soup-4",
    "name": "سوپ عدس (دال عدس)",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "دال عدس"
      },
      {
        "item": "سیر و پیاز",
        "amount": 2,
        "unit": "حبه"
      }
    ],
    "calories": 300,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "soup-5",
    "ingredients": [
      {
        "amount": 2,
        "item": "کدو حلوایی پوره شده",
        "unit": "پیمانه"
      },
      {
        "item": "سیب زمینی",
        "unit": "عدد",
        "amount": 1
      }
    ],
    "recipeSteps": [
      "مواد را بپزید و میکس کنید.",
      "با خامه سرو کنید."
    ],
    "description": "سوپ خامه‌ای و نارنجی",
    "name": "سوپ کدو حلوایی",
    "category": "soup",
    "calories": 300,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "soup",
    "recipeSteps": [
      "قارچ را تفت دهید.",
      "با آرد و شیر غلیظ کنید."
    ],
    "id": "soup-6",
    "name": "سوپ قارچ",
    "ingredients": [
      {
        "item": "قارچ",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "amount": 2,
        "item": "شیر",
        "unit": "پیمانه"
      }
    ],
    "description": "سوپ غلیظ با طعم قارچ فراوان",
    "calories": 300,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "سوپ پیاز فرانسوی",
    "description": "سوپ پیاز کاراملی با پنیر",
    "category": "soup",
    "recipeSteps": [
      "پیاز را طولانی تفت دهید.",
      "با آب گوشت بپزید و روی آن پنیر بریزید."
    ],
    "ingredients": [
      {
        "item": "پیاز فراوان",
        "amount": 5,
        "unit": "عدد"
      },
      {
        "amount": 100,
        "unit": "گرم",
        "item": "پنیر پیتزا"
      }
    ],
    "id": "soup-7",
    "calories": 300,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "soup",
    "ingredients": [
      {
        "amount": 1,
        "unit": "کیلوگرم",
        "item": "انواع سبزیجات"
      }
    ],
    "id": "soup-8",
    "recipeSteps": [
      "همه را با آب مرغ بپزید."
    ],
    "name": "سوپ سبزیجات رژیمی",
    "description": "ترکیب کلم، هویج و کرفس",
    "calories": 270,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "سوپ چینی لذیذ",
    "name": "سوپ مرغ و ذرت",
    "category": "soup",
    "id": "soup-9",
    "ingredients": [
      {
        "item": "ذرت",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "item": "مرغ",
        "amount": 1,
        "unit": "تکه"
      }
    ],
    "recipeSteps": [
      "مرغ و ذرت را بپزید.",
      "با تخم مرغ غلیظ کنید."
    ],
    "calories": 300,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "کلم بروکلی",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "unit": "قاشق",
        "item": "خامه",
        "amount": 1
      }
    ],
    "id": "soup-10",
    "description": "سوپ سبز و سالم",
    "recipeSteps": [
      "بروکلی را بپزید و میکس کنید."
    ],
    "name": "سوپ بروکلی",
    "category": "soup",
    "calories": 420,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "local",
    "description": "دیزی اصیل با گوشت گوسفندی، نخود، لوبیا و دنبه",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت گوسفندی با استخوان و دنبه",
        "amount": 500
      },
      {
        "item": "نخود و لوبیا سفید (خیس شده)",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "item": "پیاز",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "سیب زمینی"
      },
      {
        "unit": "عدد",
        "item": "گوجه فرنگی",
        "amount": 2
      },
      {
        "amount": 2,
        "item": "رب گوجه فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 2,
        "item": "لیمو عمانی",
        "unit": "عدد"
      },
      {
        "amount": 2,
        "item": "سیر",
        "unit": "حبه"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "مرزه خشک"
      }
    ],
    "recipeSteps": [
      "نخود و لوبیا را از شب قبل خیس کنید.",
      "گوشت، دنبه، حبوبات، یک پیاز درسته و گوجه فرنگی‌ها را با آب در قابلمه (یا ظرف سنگی) بگذارید تا کاملا بپزد (حدود ۳-۴ ساعت).",
      "سیب زمینی‌ها را شسته و اضافه کنید.",
      "دنبه را خارج کرده، با پیاز دیگر و رب گوجه و ادویه بکوبید یا تفت دهید و به آبگوشت برگردانید.",
      "لیمو عمانی و مرزه را در نیم ساعت آخر اضافه کنید.",
      "آب غذا را جداگانه با نان تلیت کنید و مواد جامد را به عنوان گوشت‌کوبیده سرو نمایید."
    ],
    "id": "dish-abgoosht-1",
    "hasRealData": true,
    "name": "آبگوشت سنتی (دیزی سنگی)",
    "calories": 550,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "dish-abgoosht-2",
    "name": "آبگوشت بزباش",
    "recipeSteps": [
      "گوشت و لوبیا و پیاز را بپزید.",
      "سبزی‌ها را خرد کرده و تفت دهید و به آبگوشت اضافه کنید.",
      "لیمو عمانی و سیب زمینی را در ساعت آخر اضافه کنید.",
      "این غذا شبیه قرمه سبزی اما آبدارتر و با سیب زمینی است."
    ],
    "ingredients": [
      {
        "item": "گوشت گوسفندی",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "item": "لوبیا قرمز (یا چشم بلبلی)",
        "amount": 1
      },
      {
        "amount": 300,
        "unit": "گرم",
        "item": "سبزی (تره، جعفری، شنبلیله)"
      },
      {
        "unit": "عدد",
        "item": "پیاز",
        "amount": 1
      },
      {
        "unit": "عدد",
        "item": "لیمو عمانی",
        "amount": 3
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "سیب زمینی"
      }
    ],
    "description": "آبگوشت سبزی‌دار سنتی",
    "category": "local",
    "hasRealData": true,
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "گوشت و حبوبات را بپزید.",
      "بادمجان‌های سرخ شده را اضافه کنید تا له شوند.",
      "در انتها کشک را اضافه کرده و با نعناع داغ و سیر داغ تزیین و سرو کنید."
    ],
    "hasRealData": true,
    "description": "آبگوشت سفید مقوی با کشک",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت گوسفندی",
        "amount": 400
      },
      {
        "amount": 1,
        "item": "نخود و لوبیا سفید",
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "item": "بادمجان سرخ شده",
        "unit": "عدد"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "کشک غلیظ"
      },
      {
        "item": "پیاز و سیر داغ",
        "amount": 0,
        "unit": "به میزان لازم"
      },
      {
        "amount": 2,
        "unit": "قاشق",
        "item": "نعناع داغ"
      }
    ],
    "category": "local",
    "id": "dish-abgoosht-3",
    "name": "آبگوشت کشک (لرستان/اراک)",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "local",
    "name": "آبگوشت قنبید (قم)",
    "description": "آبگوشت سنتی قم با کلم قمری",
    "recipeSteps": [
      "گوشت و حبوبات را بپزید.",
      "کلم قمری‌ها را پوست گرفته و مکعبی خرد کنید و به غذا اضافه کنید.",
      "رب گوجه تفت داده شده و ادویه را اضافه کرده و بگذارید جا بیفتد."
    ],
    "ingredients": [
      {
        "item": "گوشت گوسفندی",
        "unit": "گرم",
        "amount": 500
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "کلم قمری (قنبید) (درشت)"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "نخود و لوبیا سفید"
      },
      {
        "amount": 2,
        "item": "رب گوجه",
        "unit": "قاشق"
      },
      {
        "amount": 1,
        "item": "پیاز",
        "unit": "عدد"
      }
    ],
    "id": "dish-abgoosht-4",
    "hasRealData": true,
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "local",
    "name": "آبگوشت مرغ",
    "id": "dish-abgoosht-5",
    "hasRealData": true,
    "description": "دیزی سبک با گوشت مرغ",
    "ingredients": [
      {
        "amount": 800,
        "unit": "گرم",
        "item": "مرغ کامل یا ران و سینه"
      },
      {
        "unit": "پیمانه",
        "item": "نخود و لوبیا چیتی",
        "amount": 1
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "سیب زمینی"
      },
      {
        "item": "پیاز",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "رب گوجه",
        "unit": "قاشق",
        "amount": 2
      }
    ],
    "recipeSteps": [
      "حبوبات را جداگانه نیم‌پز کنید.",
      "مرغ را با پیاز و ادویه تفت داده و با حبوبات و آب بپزید.",
      "سیب زمینی و رب گوجه را اضافه کنید تا جا بیفتد."
    ],
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "آبگوشت با طعم ترش غوره",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "گوشت گوسفندی",
        "unit": "گرم",
        "amount": 500
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "نخود و لوبیا"
      },
      {
        "item": "غوره تازه یا فریز شده",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "سیب زمینی",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "قاشق",
        "item": "رب گوجه"
      }
    ],
    "recipeSteps": [
      "مانند آبگوشت سنتی گوشت و حبوبات را بپزید.",
      "در 45 دقیقه آخر غوره و سیب زمینی را اضافه کنید تا طعم ترشی به خورد غذا برود."
    ],
    "id": "dish-abgoosht-6",
    "name": "آبگوشت غوره",
    "category": "local",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "آبگوشت لپه و لیمو",
    "description": "آبگوشت سریع و خوش‌عطر",
    "category": "local",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "گوشت گوسفندی"
      },
      {
        "item": "لپه",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "لیمو عمانی"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "سیب زمینی"
      },
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "رب گوجه"
      }
    ],
    "recipeSteps": [
      "گوشت و پیاز را تفت دهید و بپزید.",
      "لپه خیس خورده را اضافه کنید (لپه زودتر از نخود می‌پزد).",
      "لیمو عمانی و سیب زمینی را اضافه کرده و نمک و فلفل بزنید."
    ],
    "hasRealData": true,
    "id": "dish-abgoosht-7",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "گوشت و حبوبات را بپزید.",
      "میوه‌های خشک را شسته و در ساعت آخر پخت اضافه کنید تا طعم ملس و لذیذی به آبگوشت بدهد."
    ],
    "hasRealData": true,
    "category": "local",
    "name": "آبگوشت باغی (کرمانشاه)",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "گوشت گوسفندی"
      },
      {
        "unit": "پیمانه",
        "item": "نخود و لوبیا",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "میوه خشک (آلو، زردآلو، سیب، گیلاس)",
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز"
      }
    ],
    "id": "dish-abgoosht-8",
    "description": "آبگوشت با انواع میوه‌های خشک",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "خوراک لایه‌ای گوشت و سبزیجات",
    "hasRealData": true,
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 400,
        "item": "گوشت گوسفندی ورقه شده"
      },
      {
        "item": "پیاز حلقه شده",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "سیب زمینی حلقه شده"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "هویج حلقه شده"
      },
      {
        "amount": 1,
        "item": "به حلقه شده",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "item": "آلو بخارا",
        "amount": 10
      },
      {
        "item": "رب گوجه",
        "unit": "قاشق",
        "amount": 2
      }
    ],
    "recipeSteps": [
      "کف قابلمه کمی روغن ریخته و به ترتیب: پیاز، گوشت، هویج، به، آلو و سیب زمینی را لایه لایه بچینید.",
      "سس شامل آب، رب گوجه، نمک، فلفل و دارچین را روی مواد بریزید.",
      "درب قابلمه را بسته و اجازه دهید با حرارت ملایم ۳-۴ ساعت بپزد تا آب آن غلیظ شود."
    ],
    "id": "dish-nani-1",
    "name": "تاس‌کباب",
    "category": "nani",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "پیاز داغ، سیر داغ، نعناع و گردو را کمی تفت دهید.",
      "کشک را با کمی آب رقیق کرده و اضافه کنید.",
      "اجازه دهید ۱۵ دقیقه بجوشد (نباید زیاد بجوشد که کشک ببرد). با نان سنگک خشک سرو کنید."
    ],
    "category": "nani",
    "description": "غذای فوری و مقوی با کشک و گردو",
    "id": "dish-nani-2",
    "ingredients": [
      {
        "amount": 2,
        "item": "کشک غلیظ",
        "unit": "پیمانه"
      },
      {
        "item": "گردو خرد شده",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "amount": 3,
        "unit": "قاشق",
        "item": "پیاز داغ فراوان"
      },
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "نعناع خشک"
      },
      {
        "item": "سیر داغ",
        "amount": 1,
        "unit": "قاشق"
      }
    ],
    "name": "کله‌جوش",
    "hasRealData": true,
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "nani",
    "id": "dish-nani-3",
    "hasRealData": true,
    "recipeSteps": [
      "پیاز را خلالی کرده و طلایی کنید. آرد و شنبلیله را تفت دهید.",
      "آب و سیب زمینی را اضافه کنید تا سیب زمینی بپزد.",
      "تخم مرغ‌ها را داخل غذا بشکنید و هم نزنید تا خودش را بگیرد."
    ],
    "ingredients": [
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز (درشت)"
      },
      {
        "item": "تخم مرغ",
        "amount": 3,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "قاشق",
        "item": "شنبلیله خشک"
      },
      {
        "item": "آرد",
        "amount": 1,
        "unit": "قاشق"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "سیب زمینی نگینی"
      },
      {
        "unit": "قاشق",
        "amount": 1,
        "item": "رب گوجه (اختیاری)"
      }
    ],
    "name": "اشکنه سنتی (پیاز)",
    "description": "غذای قدیمی و سریع ایرانی",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "اشکنه با طعم کشک",
    "ingredients": [
      {
        "unit": "قاشق",
        "item": "پیاز داغ",
        "amount": 3
      },
      {
        "item": "کشک ساییده",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "item": "تخم مرغ",
        "unit": "عدد",
        "amount": 2
      },
      {
        "amount": 1,
        "item": "نعناع خشک",
        "unit": "قاشق"
      },
      {
        "unit": "به میزان دلخواه",
        "amount": 0,
        "item": "گردو"
      }
    ],
    "id": "dish-nani-4",
    "recipeSteps": [
      "پیاز داغ و نعناع را تفت دهید. آب اضافه کنید.",
      "کشک را اضافه کرده و قبل از جوشیدن زیاد، تخم مرغ‌ها را اضافه کنید تا سفت شوند."
    ],
    "hasRealData": true,
    "category": "nani",
    "name": "اشکنه کشک",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "خوراک شمالی تند و لذیذ",
    "ingredients": [
      {
        "item": "گوشت چرخ‌کرده یا تکه‌ای ریز",
        "unit": "گرم",
        "amount": 300
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز"
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "گوجه فرنگی"
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 2
      },
      {
        "amount": 1,
        "unit": "قاشق",
        "item": "رب گوجه"
      },
      {
        "unit": "عدد",
        "item": "تخم مرغ (اختیاری)",
        "amount": 2
      }
    ],
    "id": "dish-nani-5",
    "hasRealData": true,
    "recipeSteps": [
      "پیاز و سیر را تفت دهید. گوشت را اضافه کرده و سرخ کنید.",
      "گوجه خرد شده و رب را اضافه کنید و در ظرف را بگذارید تا جا بیفتد.",
      "در انتها می‌توانید تخم مرغ را روی آن بشکنید."
    ],
    "category": "nani",
    "name": "واویشکا گوشت",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "nani",
    "description": "واویشکا با سینه مرغ",
    "id": "dish-nani-6",
    "hasRealData": true,
    "ingredients": [
      {
        "amount": 400,
        "item": "سینه مرغ نگینی",
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "item": "پیاز",
        "amount": 2
      },
      {
        "amount": 1,
        "item": "فلفل دلمه‌ای",
        "unit": "عدد"
      },
      {
        "amount": 3,
        "unit": "عدد",
        "item": "گوجه فرنگی"
      },
      {
        "item": "زعفران",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "name": "واویشکا مرغ",
    "recipeSteps": [
      "مرغ نگینی را با پیاز تفت دهید. فلفل دلمه‌ای را اضافه کنید.",
      "گوجه و ادویه را اضافه کرده و بگذارید با آب گوجه بپزد و به روغن بیفتد."
    ],
    "calories": 350,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "جگر سفید را دیرپزتر است، ابتدا با کمی آب بپزید و خرد کنید.",
      "پیاز را تفت دهید، جگر سیاه و سفید خرد شده را اضافه کنید و تفت دهید.",
      "ادویه و رب را اضافه کنید. سیب زمینی سرخ شده را کنار آن سرو کنید."
    ],
    "hasRealData": true,
    "category": "nani",
    "ingredients": [
      {
        "item": "جگر سفید و سیاه گوسفندی",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "item": "پیاز فراوان",
        "amount": 3,
        "unit": "عدد"
      },
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "رب گوجه یا گوجه فرنگی"
      },
      {
        "item": "سیب زمینی نگینی (اختیاری)",
        "amount": 2,
        "unit": "عدد"
      }
    ],
    "name": "جغور بغور",
    "id": "dish-nani-7",
    "description": "خوراک جگر سنتی (حسرت‌الملوک)",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "hasRealData": true,
    "category": "nani",
    "description": "خوراک لوبیا گرم و غلیظ",
    "recipeSteps": [
      "لوبیا را که خیس کرده‌اید بپزید.",
      "پیاز داغ و رب تفت داده شده را اضافه کنید.",
      "سیب زمینی و قارچ را اضافه کرده و بگذارید لعاب بیندازد. با گلپر سرو کنید."
    ],
    "name": "خوراک لوبیا چیتی",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "لوبیا چیتی"
      },
      {
        "unit": "عدد",
        "item": "پیاز",
        "amount": 1
      },
      {
        "item": "رب گوجه",
        "unit": "قاشق",
        "amount": 2
      },
      {
        "unit": "عدد",
        "amount": 5,
        "item": "قارچ (اختیاری)"
      },
      {
        "unit": "عدد",
        "item": "سیب زمینی (اختیاری)",
        "amount": 1
      },
      {
        "item": "آبلیمو و گلپر",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "id": "dish-nani-8",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "عدس"
      },
      {
        "item": "پیاز داغ",
        "unit": "قاشق",
        "amount": 3
      },
      {
        "unit": "قاشق",
        "amount": 1,
        "item": "آرد (برای لعاب)"
      },
      {
        "item": "سیب زمینی",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "گلپر و نمک"
      }
    ],
    "hasRealData": true,
    "description": "خوراک عدس مقوی (صبحانه یا شام)",
    "category": "nani",
    "id": "dish-nani-9",
    "name": "عدسی",
    "recipeSteps": [
      "عدس را بپزید. سیب زمینی را نگینی یا درسته (برای له کردن) اضافه کنید.",
      "پیاز داغ و آرد تفت داده شده را اضافه کنید تا غلیظ شود."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 500,
        "item": "اسفناج تازه",
        "unit": "گرم"
      },
      {
        "item": "پیاز",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "amount": 3,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "amount": 2,
        "unit": "حبه",
        "item": "سیر"
      }
    ],
    "recipeSteps": [
      "پیاز را تفت دهید. اسفناج خرد شده را اضافه کنید تا آبش کشیده شود.",
      "سیر را اضافه کنید. تخم مرغ‌ها را روی اسفناج بشکنید و درب تابه را بگذارید تا ببندد."
    ],
    "name": "نرگسی اسفناج",
    "description": "خوراک اسفناج و تخم مرغ",
    "category": "nani",
    "hasRealData": true,
    "id": "dish-nani-10",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "دوپیازه آلو شیرازی",
    "category": "nani",
    "hasRealData": true,
    "ingredients": [
      {
        "unit": "عدد",
        "item": "سیب زمینی (آلو)",
        "amount": 4
      },
      {
        "item": "پیاز",
        "amount": 3,
        "unit": "عدد"
      },
      {
        "unit": "قاشق",
        "amount": 1,
        "item": "رب گوجه"
      },
      {
        "amount": 1,
        "item": "نعناع خشک",
        "unit": "قاشق"
      }
    ],
    "recipeSteps": [
      "سیب زمینی‌ها را آب‌پز و مکعبی خرد کنید.",
      "پیاز خلالی فراوان را طلایی کنید. رب و نعناع را تفت دهید.",
      "سیب زمینی را اضافه کرده و مخلوط کنید."
    ],
    "description": "خوراک سیب زمینی و پیاز",
    "id": "dish-nani-11",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "dish-nani-12",
    "hasRealData": true,
    "description": "خوراک تند عدس قرمز",
    "category": "nani",
    "recipeSteps": [
      "پیاز و سیر را تفت دهید. دال عدس شسته شده و سیب زمینی را اضافه کنید.",
      "آب بریزید تا بپزد و له شود. رب و تمر هندی و فلفل را اضافه کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1.5,
        "item": "عدس قرمز (دال)"
      },
      {
        "amount": 4,
        "item": "سیر",
        "unit": "حبه"
      },
      {
        "unit": "عدد",
        "item": "پیاز",
        "amount": 1
      },
      {
        "unit": "قاشق",
        "item": "رب گوجه",
        "amount": 2
      },
      {
        "amount": 0.25,
        "item": "تمر هندی",
        "unit": "پیمانه"
      },
      {
        "item": "سیب زمینی",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "فراوان",
        "item": "فلفل قرمز",
        "amount": 0
      }
    ],
    "name": "دال عدس (جنوبی)",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "سوسیس بندری",
    "recipeSteps": [
      "پیاز را خلالی درشت خرد و تفت دهید. سوسیس حلقه‌ای را اضافه و سرخ کنید.",
      "رب و ادویه‌ها را تفت دهید. سیب زمینی سرخ شده را اضافه کرده و مخلوط کنید."
    ],
    "category": "fastfood",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "سوسیس کوکتل یا آلمانی",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "amount": 3,
        "unit": "عدد",
        "item": "پیاز (درشت)"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "سیب زمینی (نگینی سرخ شده)"
      },
      {
        "amount": 3,
        "item": "رب گوجه",
        "unit": "قاشق"
      },
      {
        "amount": 0,
        "item": "فلفل قرمز و سیاه",
        "unit": "فراوان"
      }
    ],
    "id": "dish-nani-13",
    "description": "خوراک سوسیس و سیب زمینی تند",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "nani",
    "id": "dish-nani-14",
    "hasRealData": true,
    "description": "سمبوسه سیب زمینی جنوبی",
    "name": "سمبوسه",
    "ingredients": [
      {
        "unit": "تکه",
        "amount": 10,
        "item": "نان لواش"
      },
      {
        "amount": 4,
        "item": "سیب زمینی پخته",
        "unit": "عدد"
      },
      {
        "item": "جعفری خرد شده",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "unit": "عدد",
        "item": "پیاز",
        "amount": 2
      },
      {
        "amount": 0,
        "item": "تمرهندی یا سرکه",
        "unit": "کمی برای مزه"
      },
      {
        "item": "فلفل قرمز",
        "amount": 0,
        "unit": "فراوان"
      }
    ],
    "recipeSteps": [
      "سیب زمینی پخته را له کنید. با پیاز سرخ شده، جعفری و ادویه تند مخلوط کنید.",
      "مواد را لای نان لواش پیچیده و در روغن فراوان سرخ کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "بریانی اصفهان",
    "recipeSteps": [
      "گوشت را با پیاز بپزید و چرخ کنید. با ادویه‌ها ورز دهید.",
      "جگر سفید را جدا بپزید و چرخ کنید.",
      "کف کفگیر مخصوص روغن و دارچین ریخته، گوشت را پهن کنید و روی حرارت بگیرید تا سرخ شود. روی نان سنگک برگردانید."
    ],
    "hasRealData": true,
    "category": "nani",
    "id": "dish-nani-15",
    "description": "بریان سنتی اصفهان",
    "ingredients": [
      {
        "amount": 500,
        "item": "گوشت سردست و دنده",
        "unit": "گرم"
      },
      {
        "amount": 200,
        "item": "جگر سفید (شش)",
        "unit": "گرم"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز"
      },
      {
        "item": "ادویه‌جات (دارچین، نعناع خشک، زعفران)",
        "amount": 0,
        "unit": "به میزان لازم"
      },
      {
        "unit": "به میزان لازم",
        "item": "گردو و خلال بادام (برای تزیین)",
        "amount": 0
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "کله و پاچه گوسفند (کامل)",
        "amount": 1,
        "unit": "دست"
      },
      {
        "item": "پیاز",
        "amount": 3,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "بوته",
        "item": "سیر (بوته)"
      },
      {
        "item": "ادویه‌جات (زردچوبه، فلفل سیاه، دارچین)",
        "amount": 0,
        "unit": "به میزان لازم"
      },
      {
        "item": "نخود (اختیاری)",
        "unit": "پیمانه",
        "amount": 0.5
      }
    ],
    "category": "local",
    "hasRealData": true,
    "recipeSteps": [
      "کله پاچه را بسیار تمیز بشویید.",
      "با پیاز، سیر و آب فراوان از شب تا صبح با حرارت خیلی ملایم بپزید.",
      "در انتها نمک و دارچین بزنید و با نان سنگک و آبلیمو/نارنج سرو کنید."
    ],
    "name": "کله پاچه",
    "id": "dish-nani-16",
    "description": "غذای سنتی و سنگین",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-nani-17",
    "hasRealData": true,
    "category": "local",
    "ingredients": [
      {
        "item": "سیرابی و شیردان تمیز شده",
        "unit": "دست",
        "amount": 1
      },
      {
        "item": "پیاز",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "unit": "حبه",
        "amount": 5,
        "item": "سیر"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "زردچوبه و نمک"
      }
    ],
    "recipeSteps": [
      "سیرابی را برش زده و با پیاز و سیر و آب فراوان بپزید (زمان پخت طولانی).",
      "معمولاً با سرکه و سیر کوبیده سرو می‌شود."
    ],
    "name": "سیرابی و شیردان",
    "description": "خوراک سیرابی مقوی",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "name": "خوراک زبان",
    "description": "خوراک زبان گوساله با سس قارچ",
    "id": "dish-nani-18",
    "category": "nani",
    "recipeSteps": [
      "زبان را با پیاز و برگ بو کامل بپزید (چندین ساعت). پوست آن را بکنید و حلقه کنید.",
      "سس قارچ و رب را آماده کرده و زبان‌ها را در آن تفت دهید."
    ],
    "ingredients": [
      {
        "item": "زبان گوساله",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 0,
        "item": "پیاز و سیر و برگ بو (برای پخت)",
        "unit": "به میزان لازم"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "قارچ"
      },
      {
        "unit": "قاشق",
        "item": "رب گوجه",
        "amount": 1
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "id": "dish-nani-19",
    "description": "خوراک مغز لذیذ",
    "category": "nani",
    "name": "خوراک مغز",
    "recipeSteps": [
      "مغز را در آب جوش انداخته و رگ و ریشه را بگیرید.",
      "با پیاز و ادویه و کمی آب بپزید (سریع می‌پزد).",
      "می‌توانید بعد از پخت، در کره تفت دهید و با آبلیمو سرو کنید."
    ],
    "ingredients": [
      {
        "item": "مغز گوسفند یا گوساله",
        "unit": "عدد",
        "amount": 2
      },
      {
        "amount": 1,
        "item": "پیاز",
        "unit": "عدد"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "آبلیمو و جعفری (برای سرو)"
      },
      {
        "item": "نمک و زردچوبه",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-nani-20",
    "category": "nani",
    "name": "سالاد الویه",
    "description": "سالاد الویه کلاسیک",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 4,
        "item": "سیب زمینی پخته"
      },
      {
        "unit": "عدد",
        "item": "تخم مرغ پخته",
        "amount": 3
      },
      {
        "amount": 1,
        "item": "سینه مرغ پخته",
        "unit": "عدد"
      },
      {
        "amount": 200,
        "unit": "گرم",
        "item": "خیارشور"
      },
      {
        "item": "نخود فرنگی",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "سس مایونز",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "سیب زمینی و تخم مرغ را رنده کنید. مرغ را ریش کنید.",
      "خیارشور نگینی و نخود فرنگی را اضافه کنید.",
      "با سس مایونز، آب مرغ غلیظ شده، نمک و فلفل مخلوط کنید."
    ],
    "calories": 350,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "local",
    "description": "کشک بادمجان مجلسی",
    "id": "dish-nani-21",
    "recipeSteps": [
      "بادمجان‌ها را پوست گرفته و سرخ کنید.",
      "سپس آن‌ها را کوبیده و با پیاز داغ، سیر داغ و نعناع داغ مخلوط کنید.",
      "کشک را اضافه کرده و اجازه دهید چند دقیقه بجوشد تا جا بیفتد."
    ],
    "hasRealData": true,
    "ingredients": [
      {
        "item": "بادمجان",
        "unit": "عدد",
        "amount": 5
      },
      {
        "unit": "پیمانه",
        "item": "کشک",
        "amount": 1
      },
      {
        "item": "پیاز داغ",
        "amount": 4,
        "unit": "قاشق"
      },
      {
        "amount": 2,
        "unit": "قاشق",
        "item": "سیر داغ"
      },
      {
        "item": "نعناع داغ",
        "amount": 2,
        "unit": "قاشق"
      },
      {
        "item": "گردو",
        "amount": 0,
        "unit": "به میزان دلخواه"
      }
    ],
    "name": "کشک بادمجان",
    "calories": 500,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "میرزا قاسمی",
    "id": "dish-nani-22",
    "hasRealData": true,
    "recipeSteps": [
      "بادمجان‌ها را کبابی کنید و پوست بگیرید.",
      "سیر کوبیده را در روغن تفت دهید، بادمجان و گوجه پوست گرفته و خرد شده را اضافه کنید.",
      "تخم مرغ‌ها را اضافه کرده و مخلوط کنید تا بپزد."
    ],
    "category": "local",
    "ingredients": [
      {
        "amount": 5,
        "unit": "عدد",
        "item": "بادمجان"
      },
      {
        "amount": 3,
        "unit": "عدد",
        "item": "گوجه فرنگی"
      },
      {
        "unit": "بوته",
        "item": "سیر (بوته)",
        "amount": 1
      },
      {
        "unit": "عدد",
        "amount": 3,
        "item": "تخم مرغ"
      },
      {
        "item": "روغن و نمک و زردچوبه",
        "unit": "به میزان لازم",
        "amount": 0
      }
    ],
    "description": "میرزا قاسمی گیلانی با بادمجان کبابی",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "سیر و شوید را تفت دهید، باقلا پوست گرفته را اضافه کنید.",
      "آب بریزید تا بپزد. در انتها تخم مرغ را اضافه کنید تا خودش را بگیرد."
    ],
    "category": "local",
    "id": "dish-nani-23",
    "hasRealData": true,
    "name": "باقلاقاتق",
    "ingredients": [
      {
        "item": "لوبیا کشاورزی (پاچ باقلا)",
        "unit": "پیمانه",
        "amount": 2
      },
      {
        "amount": 2,
        "item": "شوید خشک",
        "unit": "قاشق"
      },
      {
        "item": "تخم مرغ",
        "unit": "عدد",
        "amount": 2
      },
      {
        "amount": 4,
        "item": "سیر",
        "unit": "حبه"
      },
      {
        "unit": "گرم",
        "amount": 50,
        "item": "کره یا روغن"
      }
    ],
    "description": "خورشت باقلاقاتق گیلانی",
    "calories": 520,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "کوکو سیب‌زمینی شکم‌پر",
    "recipeSteps": [
      "مایه گوشتی (مانند مایه ماکارونی) تهیه کنید.",
      "سیب زمینی پخته و له شده را با تخم مرغ مخلوط کنید.",
      "از خمیر سیب زمینی برداشته، داخلش مایه گوشتی بگذارید و ببندید، سپس سرخ کنید."
    ],
    "ingredients": [
      {
        "amount": 4,
        "item": "سیب زمینی پخته",
        "unit": "عدد"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "amount": 200,
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم"
      },
      {
        "item": "قارچ و فلفل دلمه‌ای",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "item": "پنیر پیتزا (اختیاری)",
        "amount": 0,
        "unit": "به میزان دلخواه"
      }
    ],
    "description": "کوکو سیب‌زمینی با مغز گوشت و قارچ",
    "hasRealData": true,
    "category": "kuku",
    "id": "dish-nani-24",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "nani",
    "id": "dish-nani-25",
    "description": "پیراشکی گوشت خانگی",
    "name": "پیراشکی گوشت",
    "ingredients": [
      {
        "unit": "بسته",
        "item": "خمیر پیراشکی",
        "amount": 1
      },
      {
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم",
        "amount": 300
      },
      {
        "item": "قارچ",
        "amount": 200,
        "unit": "گرم"
      },
      {
        "item": "فلفل دلمه‌ای",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "قاشق",
        "amount": 2,
        "item": "رب گوجه"
      },
      {
        "item": "پنیر پیتزا",
        "amount": 0,
        "unit": "به میزان دلخواه"
      }
    ],
    "recipeSteps": [
      "مایه گوشتی را با پیاز، قارچ و فلفل دلمه تفت دهید.",
      "مواد را داخل خمیر گذاشته، بپیچید و در روغن سرخ کنید یا در فر بپزید."
    ],
    "hasRealData": true,
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
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
    "category": "local",
    "description": "نان برنجی گیلانی (نسخه غذایی با تخم‌مرغ)",
    "name": "نان برنجی گیلانی (نسخه غذایی با تخم‌مرغ)",
    "hasRealData": true,
    "id": "dish-1765580062996-h4sdy-2",
    "ingredients": [
      {
        "item": "آرد برنج",
        "amount": 2,
        "unit": "پیمانه"
      },
      {
        "item": "تخم مرغ (بزرگ)",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "amount": 0.5,
        "item": "ماست پرچرب",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "روغن مایع یا کره ذوب شده",
        "amount": 0.25
      },
      {
        "item": "شکر",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "نمک"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "بیکینگ پودر"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "آب ولرم (در صورت نیاز)",
        "amount": 3
      },
      {
        "amount": 1,
        "item": "کنجد یا سیاه‌دانه (اختیاری)",
        "unit": "قاشق غذاخوری"
      }
    ],
    "calories": 600,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "پیاز را تفت دهید.",
      "سوسیس و رب و فلفل بزنید."
    ],
    "id": "fast-1",
    "name": "ساندویچ بندری تند",
    "description": "سوسیس بندری با پیاز و رب فراوان",
    "ingredients": [
      {
        "item": "سوسیس",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "item": "پیاز",
        "amount": 3,
        "unit": "عدد"
      }
    ],
    "category": "fastfood",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "خمیر را پهن کنید.",
      "پپرونی و پنیر بریزید و در فر بپزید."
    ],
    "category": "fastfood",
    "id": "fast-2",
    "description": "پیتزا تند با کالباس پپرونی",
    "name": "پیتزا پپرونی ایتالیایی",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 100,
        "item": "پپرونی"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "پنیر"
      }
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گوشت را بپزید و ریش کنید.",
      "با پنیر در نان داغ کنید."
    ],
    "id": "fast-3",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گوشت گوساله"
      },
      {
        "amount": 2,
        "unit": "ورق",
        "item": "پنیر گودا"
      }
    ],
    "name": "ساندویچ رست bیف",
    "description": "گوشت گوساله ریش شده با پنیر",
    "category": "fastfood",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "سبزیجات را روی خمیر بچینید و بپزید."
    ],
    "ingredients": [
      {
        "item": "ذرت و قارچ",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 50,
        "unit": "گرم",
        "item": "بروکلی"
      }
    ],
    "description": "سالم و رنگارنگ",
    "category": "fastfood",
    "id": "fast-4",
    "name": "پیتزا سبزیجات مخصوص",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "description": "گوشت خالص با ادویه مخصوص",
    "category": "fastfood",
    "recipeSteps": [
      "گوشت را گرد کرده و گریل کنید."
    ],
    "name": "همبرگر ذغالی خانگی",
    "id": "fast-5",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "راسته گوساله با سس قارچ",
    "recipeSteps": [
      "گوشت را بیفتک کرده و سرخ کنید."
    ],
    "name": "ساندویچ فیله استیک",
    "ingredients": [
      {
        "item": "راسته گوساله",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "category": "fastfood",
    "id": "fast-6",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "مرغ را چرخ کرده، قالب بزنید و سرخ کنید."
    ],
    "id": "fast-7",
    "description": "مرغ چرخ شده سوخاری",
    "category": "fastfood",
    "name": "ناگت مرغ خانگی",
    "ingredients": [
      {
        "item": "سینه مرغ",
        "unit": "گرم",
        "amount": 300
      },
      {
        "amount": 1,
        "item": "پودر سوخاری",
        "unit": "پیمانه"
      }
    ],
    "calories": 700,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "فیله ماهی سوخاری در نان برگر",
    "id": "fast-8",
    "category": "fastfood",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 200,
        "item": "فیله ماهی"
      }
    ],
    "name": "فیش bرگر ترد",
    "recipeSteps": [
      "ماهی را سوخاری کرده و در نان بگذارید."
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "id": "fast-9",
    "name": "چیزbرگر دوبل",
    "category": "fastfood",
    "recipeSteps": [
      "کباب کنید و لایه لایه بچینید."
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت",
        "amount": 400
      },
      {
        "amount": 4,
        "item": "پنیر",
        "unit": "ورق"
      }
    ],
    "description": "دو لایه گوشت و دو لایه پنیر",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "هات‌داگ با مغز پنیر ذوب شده",
    "id": "fast-10",
    "category": "fastfood",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "هات داگ",
        "amount": 2
      }
    ],
    "name": "هات‌داگ پنیری",
    "recipeSteps": [
      "سرخ کنید و در نان باگت بگذارید."
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "مواد را لای نان گذاشته و پرس کنید."
    ],
    "description": "میان وعده سریع با دستگاه ساندویچ ساز",
    "category": "fastfood",
    "name": "اسنک کالباس و قارچ",
    "id": "fast-11",
    "ingredients": [
      {
        "item": "نان تست",
        "amount": 4,
        "unit": "عدد"
      }
    ],
    "calories": 750,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "با قارچ و پنیر و سس سفید",
    "ingredients": [
      {
        "amount": 1,
        "unit": "کنسرو",
        "item": "ذرت"
      }
    ],
    "id": "fast-12",
    "name": "ذرت مکزیکی خانگی",
    "recipeSteps": [
      "بخارپز کنید و پنیر و سس بزنید."
    ],
    "category": "fastfood",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "باقالی را بپزید.",
      "برنج را اضافه کرده و کته کنید.",
      "با نیمرو سرو کنید."
    ],
    "description": "دمپختک زرد و سنتی با نیمرو",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "unit": "پیمانه",
        "item": "باقالی زرد خشک",
        "amount": 1.5
      },
      {
        "amount": 2,
        "item": "زردچوبه فراوان",
        "unit": "قاشق"
      }
    ],
    "category": "polo",
    "name": "دمپختک باقالی",
    "id": "user-1",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "آبگوشت با سبزی قرمه",
    "category": "local",
    "name": "آبگوشت بزباش",
    "id": "user-2",
    "ingredients": [
      {
        "amount": 400,
        "item": "گوشت گوسفندی",
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "item": "لوبیا قرمز",
        "amount": 0.5
      },
      {
        "item": "سبزی قرمه",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "recipeSteps": [
      "گوشت و لوبیا را بپزید.",
      "سبزی تفت داده را اضافه کنید.",
      "سیب زمینی بریزید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 300,
        "item": "گوشت",
        "unit": "گرم"
      },
      {
        "item": "به",
        "unit": "عدد",
        "amount": 2
      }
    ],
    "id": "user-3",
    "name": "خورشت به آلو",
    "recipeSteps": [
      "به را تفت دهید و در اواخر پخت گوشت اضافه کنید."
    ],
    "category": "stew",
    "description": "خورشت پاییزه ملس",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 200,
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده"
      },
      {
        "amount": 2,
        "item": "سیب زمینی",
        "unit": "عدد"
      }
    ],
    "id": "user-4",
    "name": "خوراک کله گنجشکی",
    "recipeSteps": [
      "قلقلی‌ها را با سیب زمینی مکعبی در سس بپزید."
    ],
    "category": "nani",
    "description": "گوشت قلقلی با سیب زمینی",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 3,
        "unit": "پیمانه",
        "item": "برنج"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "مرغ"
      }
    ],
    "category": "polo",
    "name": "پلو یونانی",
    "id": "user-5",
    "description": "پلو مخلوط با ذرت و فلفل دلمه",
    "recipeSteps": [
      "مرغ و سبزیجات را با برنج دم کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "بامیه را تفت داده و در سس گوجه و سیر بپزید."
    ],
    "category": "stew",
    "ingredients": [
      {
        "item": "بامیه",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "item": "گوشت",
        "amount": 300,
        "unit": "گرم"
      }
    ],
    "name": "خورشت بامیه",
    "description": "خورشت لذیذ جنوبی",
    "id": "user-6",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "پیاز",
        "unit": "عدد",
        "amount": 2
      },
      {
        "unit": "عدد",
        "item": "تخم مرغ",
        "amount": 2
      }
    ],
    "category": "nani",
    "id": "user-7",
    "description": "غذای سریع و قدیمی",
    "recipeSteps": [
      "پیاز را سرخ کرده، آب بریزید و تخم مرغ بزنید."
    ],
    "name": "اشکنه پیاز",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "user-8",
    "name": "کته کباب شمالی",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت",
        "amount": 300
      },
      {
        "item": "برنج",
        "amount": 3,
        "unit": "پیمانه"
      }
    ],
    "recipeSteps": [
      "کباب را در تابه درست کرده و با کته سرو کنید."
    ],
    "category": "kabab",
    "description": "کباب تابه ای با کته کره ای",
    "calories": 450,
    "cookTime": 40,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "local",
    "name": "ماهی گردبیج",
    "recipeSteps": [
      "شکم ماهی را پر کرده و در فر یا قابلمه بپزید."
    ],
    "ingredients": [
      {
        "item": "ماهی سفید",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "گردو و رب انار",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "id": "user-9",
    "description": "ماهی شکم پر شمالی",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "ingredients": [
      {
        "amount": 3,
        "unit": "پیمانه",
        "item": "برنج"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "گوشت"
      }
    ],
    "category": "polo",
    "id": "user-10",
    "description": "پلو با گوشت قلقلی و کشمش",
    "recipeSteps": [
      "قلقلی و کشمش و رب انار را لای برنج دم کنید."
    ],
    "name": "قنبر پلو شیرازی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "یخنی سیب‌زمینی",
    "category": "local",
    "recipeSteps": [
      "گوشت را به قطعات متوسط خرد کنید",
      "پیاز را نگینی خرد کنید",
      "در یک قابلمه مناسب، روغن را داغ کرده و پیاز خرد شده را تفت دهید تا سبک و طلایی شود",
      "سیر رنده شده (در صورت استفاده) را اضافه کرده و یک دقیقه تفت دهید",
      "گوشت خرد شده را به پیاز اضافه کنید و حرارت را کمی زیاد کنید تا گوشت تغییر رنگ دهد و قهوه‌ای شود، حدود ۱۰-۱۵ دقیقه",
      "زردچوبه، نمک و فلفل سیاه را اضافه کرده و به مدت ۲ دقیقه دیگر تفت دهید تا بوی خامی ادویه‌ها گرفته شود",
      "رب گوجه‌فرنگی را اضافه کنید و برای ۳-۴ دقیقه خوب تفت دهید تا رب رنگ باز کند و خوش‌رنگ شود",
      "آب را به قابلمه اضافه کنید، هم بزنید و اجازه دهید به جوش آید",
      "پس از جوش آمدن، حرارت را کم کنید، درب قابلمه را بگذارید و اجازه دهید گوشت به مدت ۲ تا ۲.۵ ساعت بپزد تا نیم‌پز شود",
      "سیب‌زمینی‌ها را پوست بگیرید و درشت خرد کنید یا درسته نگه دارید (اگر کوچک هستند)",
      "پس از نیم‌پز شدن گوشت، سیب‌زمینی‌ها را به خوراک اضافه کنید",
      "اجازه دهید خوراک برای ۱ تا ۱.۵ ساعت دیگر روی حرارت ملایم بپزد تا سیب‌زمینی‌ها کاملا پخته و نرم شوند و آب خوراک غلیظ‌تر شود",
      "در صورت نیاز، نمک و فلفل خوراک را تنظیم کنید",
      "یخنی سیب‌زمینی را داغ با نان تازه و ترشی سرو کنید."
    ],
    "hasRealData": true,
    "id": "dish-1765482271064-m1icj-1",
    "description": "یخنی سیب‌زمینی",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت گوسفندی یا گوساله (ترجیحا با استخوان)",
        "amount": 400
      },
      {
        "amount": 4,
        "unit": "عدد",
        "item": "سیب‌زمینی متوسط"
      },
      {
        "amount": 1,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "amount": 3,
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه",
        "amount": 0.5
      },
      {
        "amount": 4,
        "item": "آب",
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "unit": "حبه (اختیاری)",
        "item": "سیر"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "یخنی شلغم",
    "hasRealData": true,
    "description": "یخنی شلغم",
    "id": "dish-1765482271064-3rpcn-2",
    "recipeSteps": [
      "گوشت را به قطعات کوچک مکعبی خرد کنید",
      "پیاز را نگینی خرد کنید",
      "شلغم‌ها را پوست گرفته و به صورت درشت خرد کنید (حدود ۴-۶ قسمت هر شلغم)",
      "در یک قابلمه، روغن را داغ کرده و پیاز را تفت دهید تا سبک و طلایی شود",
      "گوشت را به پیاز اضافه کرده و با حرارت متوسط تفت دهید تا گوشت تغییر رنگ دهد و آب آن کشیده شود",
      "زردچوبه، نمک و فلفل را اضافه کرده و برای ۲ دقیقه دیگر تفت دهید",
      "رب گوجه‌فرنگی را اضافه کنید و خوب تفت دهید تا رنگ رب باز شود و بوی خامی آن گرفته شود، حدود ۳-۴ دقیقه",
      "۶ پیمانه آب به قابلمه اضافه کنید، هم بزنید و اجازه دهید به جوش آید",
      "پس از جوش آمدن، حرارت را کم کنید، درب قابلمه را بگذارید و اجازه دهید گوشت به مدت ۱.۵ تا ۲ ساعت بپزد تا نیم‌پز شود",
      "شلغم‌های خرد شده را به قابلمه اضافه کنید و هم بزنید",
      "در صورت تمایل، آبغوره یا آبلیمو را در این مرحله اضافه کنید تا طعم ملس‌تری داشته باشد",
      "اجازه دهید خوراک برای ۴۵ دقیقه تا ۱ ساعت دیگر روی حرارت ملایم بپزد تا شلغم‌ها کاملا نرم شوند و خوراک جا بیفتد",
      "نمک و فلفل خوراک را تنظیم کنید",
      "یخنی شلغم را در ظرف سرو کشیده و با کمی جعفری خرد شده تزیین کرده و داغ با نان تازه سرو کنید."
    ],
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (ترجیحا بدون چربی زیاد)",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 5,
        "unit": "عدد",
        "item": "شلغم متوسط"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "amount": 1.5,
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری",
        "amount": 3
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "item": "آبغوره یا آبلیمو",
        "unit": "قاشق غذاخوری (اختیاری)",
        "amount": 2
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "جعفری خرد شده"
      }
    ],
    "category": "local",
    "calories": 550,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "item": "آرد گندم",
        "unit": "پیمانه"
      },
      {
        "amount": 150,
        "item": "کره حیوانی یا روغن جامد",
        "unit": "گرم"
      },
      {
        "item": "شکر",
        "amount": 1.5,
        "unit": "پیمانه"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "گلاب"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "زعفران دم‌کرده غلیظ"
      },
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "آب"
      },
      {
        "unit": "برای تزیین",
        "item": "مغز پسته یا بادام (اختیاری)",
        "amount": 0
      }
    ],
    "id": "dish-1765482271064-zenla-3",
    "name": "کاچی",
    "hasRealData": true,
    "category": "dessert",
    "description": "کاچی",
    "recipeSteps": [
      "ابتدا شربت کاچی را آماده کنید: آب و شکر را در قابلمه‌ای روی حرارت ملایم قرار دهید و هم بزنید تا شکر کاملا حل شود، نیازی به جوشاندن زیاد نیست",
      "پس از حل شدن شکر، گلاب و زعفران دم‌کرده را اضافه کنید، هم بزنید و از روی حرارت بردارید و کنار بگذارید",
      "در یک قابلمه یا تابه بزرگ، کره را روی حرارت ملایم ذوب کنید",
      "آرد را الک کرده و به کره اضافه کنید",
      "آرد را به مدت ۱۵ تا ۲۰ دقیقه روی حرارت ملایم و با هم زدن مداوم تفت دهید تا رنگ آرد کمی تغییر کند و بوی خامی آن گرفته شود (بسته به ذائقه می‌توانید کمتر یا بیشتر تفت دهید)",
      "پس از اینکه آرد به حد کافی تفت خورد و طلایی شد، قابلمه را از روی حرارت برداشته و بلافاصله شربت آماده شده را (که از قبل کمی ولرم شده است) به تدریج به آرد اضافه کنید و همزمان و به سرعت با همزن دستی یا قاشق چوبی مرتب هم بزنید تا آرد گلوله نشود و حلوا جمع شود",
      "قابلمه را دوباره روی حرارت ملایم قرار دهید و به هم زدن ادامه دهید",
      "کاچی کم‌کم غلیظ می‌شود و از کناره‌های ظرف جمع می‌شود",
      "وقتی کاچی به غلظت دلخواه رسید (مانند فرنی غلیظ)، از روی حرارت بردارید",
      "کاچی را در ظرف سرو کشیده و در صورت تمایل با پودر پسته یا بادام تزیین کنید",
      "کاچی را گرم یا سرد می‌توانید میل کنید."
    ],
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765482271064-k9s80-4",
    "category": "local",
    "hasRealData": true,
    "description": "آبخورشت",
    "recipeSteps": [
      "نخود را که از شب قبل خیس کرده‌اید، آبکش کنید",
      "گوشت را به قطعات درشت (تقریبا اندازه یک پرتقال کوچک) خرد کنید",
      "پیازها را پوست گرفته و به صورت درسته یا درشت خرد کنید",
      "لیمو عمانی‌ها را با چنگال چند سوراخ کنید و حدود ۱۵ دقیقه در آب ولرم خیس کنید",
      "در یک قابلمه بزرگ یا دیزی، روغن را داغ کرده و گوشت را به همراه پیاز تفت دهید تا گوشت تغییر رنگ دهد و پیاز سبک شود",
      "نخود را اضافه کرده و برای ۵ دقیقه دیگر با گوشت تفت دهید",
      "زردچوبه، نمک و فلفل سیاه را اضافه کنید و خوب هم بزنید",
      "گوجه‌فرنگی‌ها را رنده کرده یا رب گوجه‌فرنگی را اضافه کنید و برای ۵ دقیقه تفت دهید تا بوی خامی آن گرفته شود و رنگ باز کند",
      "۷-۸ پیمانه آب به قابلمه اضافه کنید و اجازه دهید به جوش آید",
      "پس از جوش آمدن، لیمو عمانی‌های خیس شده را اضافه کنید",
      "حرارت را کاملا کم کنید، درب قابلمه را بگذارید و اجازه دهید آبخورشت به مدت ۳ تا ۴ ساعت به آرامی بپزد تا گوشت و نخود کاملا نرم شوند و آب آن جا بیفتد",
      "یک ساعت آخر پخت، سیب‌زمینی‌ها را پوست بگیرید و به صورت درسته یا دو نیم شده به آبخورشت اضافه کنید و اجازه دهید تا سیب‌زمینی‌ها نیز پخته و نرم شوند",
      "در انتها، نمک و فلفل آبخورشت را تنظیم کنید",
      "آبخورشت را می‌توان به دو شیوه سرو کرد: ابتدا آب آن را جدا کرده و با تکه‌های نان تلیت کرده و میل کنید؛ سپس مواد جامد (گوشت، نخود، سیب‌زمینی، پیاز و لیمو) را با گوشت‌کوب بکوبید و با سبزی خوردن و پیاز و نان سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 500,
        "item": "گوشت گوسفندی (ترجیحا سردست یا گردن با استخوان)",
        "unit": "گرم"
      },
      {
        "amount": 0.5,
        "item": "نخود",
        "unit": "پیمانه (از شب قبل خیس شده)"
      },
      {
        "item": "پیاز بزرگ",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "item": "سیب‌زمینی متوسط",
        "amount": 3,
        "unit": "عدد"
      },
      {
        "amount": 2,
        "item": "گوجه‌فرنگی",
        "unit": "عدد"
      },
      {
        "item": "لیمو عمانی",
        "unit": "عدد",
        "amount": 3
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1.5,
        "item": "زردچوبه"
      },
      {
        "amount": 1.5,
        "item": "نمک",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "روغن مایع"
      },
      {
        "amount": 7.5,
        "item": "آب",
        "unit": "پیمانه"
      }
    ],
    "name": "آبخورشت",
    "calories": 400,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "شوربا",
    "recipeSteps": [
      "مرغ یا گوشت را به قطعات کوچک و مکعبی خرد کنید",
      "پیاز را نگینی خرد کنید",
      "هویج و سیب‌زمینی را پوست گرفته و به صورت نگینی ریز خرد کنید",
      "برنج نیم‌دانه را بشویید (در صورت استفاده از ورمیشل، آن را نشویید)",
      "در یک قابلمه مناسب، روغن را داغ کرده و پیاز خرد شده را تفت دهید تا سبک و شفاف شود",
      "مرغ یا گوشت خرد شده را به پیاز اضافه کرده و تفت دهید تا تغییر رنگ دهد و قهوه‌ای شود",
      "زردچوبه، نمک و فلفل را اضافه کرده و برای ۲ دقیقه دیگر تفت دهید",
      "رب گوجه‌فرنگی را اضافه کنید و برای ۳-۴ دقیقه خوب تفت دهید تا رب رنگ باز کند و بوی خامی آن گرفته شود",
      "هویج خرد شده را اضافه کرده و برای ۵ دقیقه با مواد تفت دهید",
      "۶ پیمانه آب به قابلمه اضافه کنید، هم بزنید و اجازه دهید به جوش آید",
      "پس از جوش آمدن، حرارت را کم کنید، درب قابلمه را بگذارید و اجازه دهید مواد به مدت ۴۵ دقیقه تا ۱ ساعت بپزند",
      "برنج نیم‌دانه یا ورمیشل را به سوپ اضافه کنید",
      "سیب‌زمینی خرد شده را نیز در این مرحله اضافه کنید",
      "اجازه دهید سوپ برای ۳۰-۴۰ دقیقه دیگر روی حرارت ملایم بپزد تا برنج یا ورمیشل و سیب‌زمینی کاملا پخته و نرم شوند و سوپ غلیظ شود",
      "در صورت نیاز، نمک و فلفل سوپ را تنظیم کنید",
      "شوربا را در ظرف سرو کشیده، با جعفری تازه خرد شده تزیین کنید و داغ میل کنید."
    ],
    "id": "dish-1765482271064-d1le4-5",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 300,
        "item": "سینه مرغ یا گوشت گوسفندی (خورشتی)"
      },
      {
        "item": "پیاز متوسط",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 2,
        "item": "هویج متوسط",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "item": "سیب‌زمینی کوچک",
        "amount": 2
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "برنج نیم‌دانه یا ورمیشل"
      },
      {
        "item": "رب گوجه‌فرنگی",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 2,
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "item": "آب",
        "amount": 6,
        "unit": "پیمانه"
      },
      {
        "item": "جعفری تازه خرد شده",
        "unit": "قاشق غذاخوری",
        "amount": 3
      }
    ],
    "category": "soup",
    "hasRealData": true,
    "name": "شوربا",
    "calories": 250,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1765482274789-gm6cb-1",
    "category": "soup",
    "name": "شوربا بلغور",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه (حدود ۲۰۰ گرم)",
        "item": "بلغور گندم"
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط",
        "amount": 1
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 2
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی",
        "amount": 1
      },
      {
        "item": "روغن مایع یا کره",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نعناع خشک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 6,
        "unit": "پیمانه",
        "item": "آب مرغ یا سبزیجات"
      },
      {
        "amount": 1,
        "item": "آب",
        "unit": "پیمانه"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "آبلیمو تازه",
        "amount": 1,
        "unit": "قاشق غذاخوری (اختیاری)"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "جعفری تازه خرد شده"
      }
    ],
    "hasRealData": true,
    "description": "شوربا بلغور",
    "recipeSteps": [
      "بلغور را بشویید و به مدت ۳۰ دقیقه در آب سرد خیس کنید",
      "پیاز را ریز خرد کنید و سیر را له کنید",
      "در یک قابلمه متوسط، روغن را روی حرارت ملایم داغ کنید و پیاز خرد شده را اضافه کرده و تفت دهید تا نرم و شفاف شود (حدود ۵-۷ دقیقه)",
      "سیر له شده را اضافه کنید و ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود",
      "رب گوجه‌فرنگی و زردچوبه را اضافه کنید و برای ۲-۳ دقیقه دیگر تفت دهید تا رب رنگ باز کند و بوی خامی آن گرفته شود",
      "آب مرغ (یا سبزیجات) و آب را به قابلمه اضافه کنید و اجازه دهید به جوش آید",
      "بلغور خیس خورده را آبکش کرده و به قابلمه اضافه کنید",
      "نمک و فلفل سیاه را اضافه کنید",
      "حرارت را کم کرده و درب قابلمه را نیمه باز بگذارید تا بلغور به آرامی بپزد و نرم شود و سوپ غلیظ شود (حدود ۲۵-۳۵ دقیقه)، هر از گاهی هم بزنید تا ته نگیرد",
      "در یک تابه کوچک، ۱ قاشق غذاخوری روغن (یا کره) را داغ کنید و نعناع خشک را برای ۳۰ ثانیه تفت دهید تا عطر آن بلند شود (مراقب باشید نسوزد)",
      "پس از پخت کامل بلغور، نعناع داغ را به سوپ اضافه کنید و هم بزنید",
      "در صورت تمایل، آبلیمو تازه را اضافه کرده و طعم سوپ را تنظیم کنید",
      "سوپ را در کاسه‌های سرو ریخته و با جعفری تازه خرد شده تزیین کنید و گرم سرو کنید"
    ],
    "calories": 390,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "عدس قرمز را بشویید و به مدت ۱۵ دقیقه در آب سرد خیس کنید",
      "پیاز را ریز خرد کنید، سیر را له کنید، هویج و سیب‌زمینی را مکعبی کوچک خرد کنید",
      "در یک قابلمه بزرگ، روغن را روی حرارت متوسط داغ کنید و پیاز خرد شده را اضافه کرده و تفت دهید تا نرم و طلایی شود (حدود ۷-۱۰ دقیقه)",
      "سیر له شده را اضافه کنید و ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود",
      "رب گوجه‌فرنگی، زردچوبه و پودر آویشن (در صورت استفاده) را اضافه کرده و برای ۳-۴ دقیقه تفت دهید تا رب رنگ باز کند و بوی خامی آن گرفته شود",
      "هویج و سیب‌زمینی خرد شده را به قابلمه اضافه کنید و ۲-۳ دقیقه دیگر تفت دهید",
      "عدس خیس خورده و آبکش شده را اضافه کنید و کمی هم بزنید",
      "آب مرغ (یا سبزیجات) و آب را به قابلمه اضافه کنید و اجازه دهید به جوش آید",
      "نمک و فلفل سیاه را اضافه کنید",
      "حرارت را کم کرده و درب قابلمه را بگذارید و اجازه دهید عدس و سبزیجات به آرامی بپزند و نرم شوند و سوپ غلیظ شود (حدود ۳۰-۴۰ دقیقه)، هر از گاهی هم بزنید تا ته نگیرد",
      "پس از پخت کامل، با گوشت‌کوب دستی یا بلندر بخشی از سوپ را له کنید تا قوام و غلظت دلخواه را پیدا کند (کاملاً له نکنید تا بافت داشته باشد)",
      "آبلیمو تازه را اضافه کنید و طعم سوپ را تنظیم کنید",
      "سوپ را در کاسه‌های سرو ریخته و با گشنیز یا جعفری تازه خرد شده تزیین کنید و گرم سرو کنید"
    ],
    "name": "شوربا عدس",
    "ingredients": [
      {
        "amount": 1.5,
        "unit": "پیمانه (حدود ۳۰۰ گرم)",
        "item": "عدس قرمز (دال عدس)"
      },
      {
        "item": "پیاز بزرگ",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 3
      },
      {
        "item": "هویج متوسط",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "سیب‌زمینی کوچک"
      },
      {
        "item": "رب گوجه‌فرنگی",
        "amount": 1.5,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 3,
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "پیمانه",
        "item": "آب مرغ یا سبزیجات",
        "amount": 6
      },
      {
        "item": "آب",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "نمک"
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "پودر آویشن",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 2,
        "item": "آبلیمو تازه",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 3,
        "unit": "قاشق غذاخوری",
        "item": "گشنیز یا جعفری تازه خرد شده"
      }
    ],
    "category": "soup",
    "description": "شوربا عدس",
    "hasRealData": true,
    "id": "dish-1765482274789-b1o2r-2",
    "calories": 270,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "soup",
    "ingredients": [
      {
        "unit": "گرم (مکعبی خرد شده)",
        "amount": 300,
        "item": "سینه یا ران بوقلمون"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز بزرگ"
      },
      {
        "item": "هویج متوسط",
        "unit": "عدد",
        "amount": 2
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "ساقه کرفس"
      },
      {
        "item": "سیب‌زمینی متوسط",
        "unit": "عدد",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی"
      },
      {
        "item": "روغن مایع",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 8,
        "item": "آب مرغ یا آب",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "رشته سوپی"
      },
      {
        "amount": 1.5,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.75
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "برگ بو",
        "amount": 1,
        "unit": "عدد (اختیاری)"
      },
      {
        "item": "جعفری تازه خرد شده",
        "amount": 4,
        "unit": "قاشق غذاخوری"
      }
    ],
    "description": "شوربا بوقلمون",
    "hasRealData": true,
    "name": "شوربا بوقلمون",
    "recipeSteps": [
      "گوشت بوقلمون را مکعبی به اندازه ۱.۵ تا ۲ سانتی‌متر خرد کنید",
      "پیاز را ریز خرد کنید، هویج و کرفس و سیب‌زمینی را نیز مکعبی کوچک (نیم سانتی‌متری) خرد کنید",
      "در یک قابلمه بزرگ، روغن را روی حرارت متوسط داغ کنید و تکه‌های بوقلمون را اضافه کرده و تفت دهید تا از هر طرف کمی قهوه‌ای شود و آب آن کشیده شود (حدود ۷-۱۰ دقیقه)، سپس بوقلمون‌ها را از قابلمه خارج کنید و کنار بگذارید",
      "پیاز خرد شده را به همان روغن در قابلمه اضافه کرده و تفت دهید تا نرم و شفاف شود (حدود ۵-۷ دقیقه)",
      "هویج و کرفس خرد شده را اضافه کنید و برای ۵ دقیقه دیگر تفت دهید",
      "رب گوجه‌فرنگی و زردچوبه را اضافه کرده و ۲-۳ دقیقه دیگر تفت دهید تا رب رنگ باز کند",
      "گوشت بوقلمون را به همراه آب مرغ (یا آب)، نمک، فلفل سیاه و برگ بو (در صورت استفاده) به قابلمه بازگردانید",
      "اجازه دهید سوپ به جوش آید، سپس حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید بوقلمون و سبزیجات برای ۴۵-۶۰ دقیقه بپزند تا بوقلمون کاملاً نرم شود",
      "سیب‌زمینی خرد شده را اضافه کنید و اجازه دهید ۱۵ دقیقه دیگر بپزد",
      "رشته سوپی را اضافه کنید و ۱۰-۱۵ دقیقه دیگر اجازه دهید بپزد تا رشته نرم شود و سوپ کمی غلیظ شود، هر از گاهی هم بزنید تا ته نگیرد",
      "برگ بو را خارج کنید (در صورت استفاده)",
      "طعم سوپ را بچشید و در صورت نیاز نمک و فلفل آن را تنظیم کنید",
      "سوپ را در کاسه‌های سرو ریخته و با جعفری تازه خرد شده تزیین کنید و گرم سرو کنید"
    ],
    "id": "dish-1765482274789-kq3jb-3",
    "calories": 300,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "nani",
    "id": "dish-1765484110332-6dej0-1",
    "description": "کله‌جوش",
    "hasRealData": true,
    "ingredients": [
      {
        "amount": 1,
        "item": "کشک غلیظ",
        "unit": "پیمانه (۲۵۰ گرم)"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "پیاز متوسط"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "نعناع خشک"
      },
      {
        "unit": "پیمانه (۵۰ گرم)",
        "amount": 0.5,
        "item": "گردو خرد شده"
      },
      {
        "item": "سیر",
        "amount": 4,
        "unit": "حبه"
      },
      {
        "amount": 4,
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع یا کره"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "نمک"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه"
      },
      {
        "item": "زردچوبه",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "آب",
        "unit": "پیمانه (۴۸۰ میلی‌لیتر)",
        "amount": 2
      }
    ],
    "name": "کله‌جوش",
    "recipeSteps": [
      "پیازها را به صورت نگینی ریز خرد کنید",
      "در یک قابلمه متوسط، ۴ قاشق غذاخوری روغن (یا کره) را روی حرارت متوسط داغ کنید",
      "پیازهای خرد شده را به روغن اضافه کنید و حدود ۷-۱۰ دقیقه تفت دهید تا طلایی و سبک شوند",
      "سیرها را له کرده و به پیازها اضافه کنید، ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود",
      "زردچوبه را اضافه کرده و ۳۰ ثانیه تفت دهید تا بوی خامی آن گرفته شود",
      "نعناع خشک را اضافه کنید و بلافاصله حرارت را کم کنید، حدود ۱۵-۲۰ ثانیه تفت دهید تا عطر آن آزاد شود (مراقب باشید نسوزد)",
      "گردوهای خرد شده را به مواد اضافه کنید و ۱ دقیقه دیگر تفت دهید",
      "آب را به قابلمه اضافه کنید و اجازه دهید به جوش آید",
      "کشک را در یک کاسه با کمی آب (در صورت نیاز) رقیق کنید تا یکدست شود",
      "پس از به جوش آمدن آب، حرارت را کاملاً کم کنید و کشک رقیق شده را به تدریج و با هم زدن مداوم به قابلمه اضافه کنید",
      "نمک و فلفل را به میزان لازم اضافه کنید، مراقب باشید چون کشک خودش شور است",
      "اجازه دهید کله‌جوش روی حرارت بسیار ملایم به مدت ۱۰-۱۵ دقیقه جا بیفتد و غلیظ شود، در این مدت گهگاه هم بزنید تا ته نگیرد",
      "کله‌جوش را در کاسه سرو کرده و در صورت تمایل با کمی نعناع داغ، پیاز داغ یا گردو تزیین کنید و با نان تازه سرو نمایید."
    ],
    "calories": 520,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "کشک‌بادمجان",
    "recipeSteps": [
      "بادمجان‌ها را پوست بگیرید (یا نواری پوست بگیرید) و به صورت طولی یا حلقه‌ای برش بزنید",
      "روی بادمجان‌ها کمی نمک بپاشید و اجازه دهید ۳۰ دقیقه بمانند تا آب سیاه آن‌ها خارج شود، سپس با دستمال آشپزخانه خشک کنید",
      "در یک تابه بزرگ، روغن را روی حرارت متوسط داغ کنید و بادمجان‌ها را از دو طرف سرخ کنید تا طلایی و نرم شوند، سپس روی دستمال کاغذی قرار دهید تا روغن اضافی‌شان گرفته شود",
      "(به جای سرخ کردن می‌توانید بادمجان‌ها را در فر با کمی روغن زیتون کبابی کنید)",
      "پیازها را نگینی ریز خرد کنید و در کمی روغن باقی‌مانده از بادمجان‌ها یا روغن تازه، تفت دهید تا طلایی و کاراملی شوند (پیاز داغ)؛ نیمی از پیاز داغ را برای تزیین کنار بگذارید",
      "سیرها را له کرده و به بقیه پیاز داغ اضافه کنید، ۱ دقیقه تفت دهید تا عطر آن بلند شود",
      "زردچوبه را اضافه کرده و ۳۰ ثانیه دیگر تفت دهید",
      "در یک قابلمه دیگر یا باقیمانده روغن، نعناع خشک را روی حرارت ملایم حدود ۱۵-۲۰ ثانیه تفت دهید تا عطر آن بلند شود (مراقب باشید نسوزد)؛ نیمی از نعناع داغ را برای تزیین کنار بگذارید",
      "بادمجان‌های سرخ شده را با گوشت‌کوب یا چنگال کاملاً له کنید",
      "بادمجان‌های له شده را به ترکیب پیاز و سیر اضافه کنید و خوب مخلوط کنید",
      "آب جوش را اضافه کنید و اجازه دهید حدود ۵ دقیقه بپزد تا بادمجان‌ها کاملاً نرم شوند",
      "کشک را در کاسه‌ای با کمی آب (در صورت نیاز) رقیق کنید تا یکدست شود",
      "کشک رقیق شده را به بادمجان‌ها اضافه کنید و هم بزنید",
      "نمک و فلفل را به میزان لازم اضافه کنید و اجازه دهید کشک‌بادمجان روی حرارت ملایم ۱۰-۱۵ دقیقه جا بیفتد و آب آن کشیده شود، گهگاه هم بزنید",
      "در ۵ دقیقه پایانی، نیمی از گردوهای خرد شده را اضافه کنید و مخلوط کنید",
      "کشک‌بادمجان را در ظرف سرو بکشید و با پیاز داغ، نعناع داغ، سیر داغ، کشک و گردو تزیین کنید و با نان سرو نمایید."
    ],
    "category": "nani",
    "name": "کشک‌بادمجان",
    "hasRealData": true,
    "ingredients": [
      {
        "unit": "عدد متوسط (حدود ۱ کیلوگرم)",
        "item": "بادمجان قلمی یا دلمه‌ای",
        "amount": 7
      },
      {
        "unit": "پیمانه (۲۵۰ گرم)",
        "item": "کشک غلیظ",
        "amount": 1
      },
      {
        "amount": 2,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "unit": "حبه",
        "amount": 7,
        "item": "سیر"
      },
      {
        "item": "نعناع خشک",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0.5,
        "item": "گردو خرد شده",
        "unit": "پیمانه (۵۰ گرم)"
      },
      {
        "unit": "به میزان لازم (حدود ۱ پیمانه)",
        "amount": 0,
        "item": "روغن سرخ کردنی"
      },
      {
        "amount": 1,
        "item": "نمک",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "amount": 0.5,
        "item": "آب جوش",
        "unit": "پیمانه (۱۲۰ میلی‌لیتر)"
      }
    ],
    "id": "dish-1765484110332-bvkgn-2",
    "calories": 500,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "nani",
    "name": "کشک‌سیب‌زمینی",
    "id": "dish-1765484110332-hkaen-3",
    "recipeSteps": [
      "سیب‌زمینی‌ها را بشویید و با پوست در قابلمه‌ای با آب کافی بپزید تا کاملاً نرم شوند (حدود ۳۰-۴۰ دقیقه پس از جوش آمدن آب)",
      "پس از پخت، پوست سیب‌زمینی‌ها را بگیرید و آن‌ها را با گوشت‌کوب کاملاً له کنید تا هیچ تکه درشتی باقی نماند",
      "پیازها را نگینی ریز خرد کنید و در یک تابه با ۴-۵ قاشق غذاخوری روغن، تفت دهید تا طلایی و کاراملی شوند (پیاز داغ)؛ نیمی از پیاز داغ را برای تزیین کنار بگذارید",
      "سیرها را له کرده و به بقیه پیاز داغ اضافه کنید، ۱ دقیقه تفت دهید تا عطر آن بلند شود",
      "زردچوبه را اضافه کرده و ۳۰ ثانیه دیگر تفت دهید",
      "در تابه کوچک دیگری، ۲ قاشق غذاخوری روغن را داغ کنید و نعناع خشک را روی حرارت ملایم حدود ۱۵-۲۰ ثانیه تفت دهید تا عطر آن بلند شود (مراقب باشید نسوزد)؛ نیمی از نعناع داغ را برای تزیین کنار بگذارید",
      "سیب‌زمینی‌های له شده را به ترکیب پیاز و سیر اضافه کنید و خوب مخلوط کنید",
      "کشک را در کاسه‌ای با کمی آب (در صورت نیاز) رقیق کنید تا یکدست شود",
      "کشک رقیق شده را به سیب‌زمینی‌ها اضافه کنید و کاملاً هم بزنید تا یکدست شوند",
      "نمک و فلفل را به میزان لازم اضافه کنید و اجازه دهید کشک‌سیب‌زمینی روی حرارت ملایم ۱۰-۱۵ دقیقه جا بیفتد و مزه‌ها به خورد هم بروند، گهگاه هم بزنید",
      "کشک‌سیب‌زمینی را در ظرف سرو بکشید و با پیاز داغ، نعناع داغ، سیر داغ و کمی کشک تزیین کنید و با نان سرو نمایید."
    ],
    "ingredients": [
      {
        "unit": "عدد (حدود ۱ کیلوگرم)",
        "amount": 5.5,
        "item": "سیب‌زمینی متوسط"
      },
      {
        "item": "کشک غلیظ",
        "unit": "پیمانه (۲۵۰ گرم)",
        "amount": 1
      },
      {
        "amount": 2,
        "item": "پیاز متوسط",
        "unit": "عدد"
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 4.5
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "نعناع خشک",
        "amount": 2
      },
      {
        "item": "روغن مایع",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      }
    ],
    "hasRealData": true,
    "description": "کشک‌سیب‌زمینی",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "کشک‌کدو",
    "ingredients": [
      {
        "amount": 7,
        "item": "کدو سبز متوسط",
        "unit": "عدد (حدود ۱ کیلوگرم)"
      },
      {
        "item": "کشک غلیظ",
        "amount": 1,
        "unit": "پیمانه (۲۵۰ گرم)"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "amount": 5.5,
        "unit": "حبه",
        "item": "سیر"
      },
      {
        "item": "نعناع خشک",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "item": "گردو خرد شده",
        "amount": 0.25,
        "unit": "پیمانه (۲۵ گرم) (اختیاری)"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن سرخ کردنی"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 1,
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.25,
        "unit": "پیمانه (۶۰ میلی‌لیتر)",
        "item": "آب جوش"
      }
    ],
    "recipeSteps": [
      "کدو سبزها را بشویید، پوست بگیرید (یا نواری پوست بگیرید) و به صورت حلقه‌ای یا مکعبی خرد کنید",
      "در یک تابه بزرگ، روغن را روی حرارت متوسط داغ کنید و کدوها را از دو طرف سرخ کنید تا طلایی و نرم شوند، سپس روی دستمال کاغذی قرار دهید تا روغن اضافی‌شان گرفته شود",
      "(به جای سرخ کردن می‌توانید کدوها را در فر با کمی روغن زیتون کبابی کنید)",
      "پیازها را نگینی ریز خرد کنید و در کمی روغن باقی‌مانده از کدو یا روغن تازه، تفت دهید تا طلایی و کاراملی شوند (پیاز داغ)؛ نیمی از پیاز داغ را برای تزیین کنار بگذارید",
      "سیرها را له کرده و به بقیه پیاز داغ اضافه کنید، ۱ دقیقه تفت دهید تا عطر آن بلند شود",
      "زردچوبه را اضافه کرده و ۳۰ ثانیه دیگر تفت دهید",
      "در تابه کوچک دیگری، ۲ قاشق غذاخوری روغن را داغ کنید و نعناع خشک را روی حرارت ملایم حدود ۱۵-۲۰ ثانیه تفت دهید تا عطر آن بلند شود (مراقب باشید نسوزد)؛ نیمی از نعناع داغ را برای تزیین کنار بگذارید",
      "کدوهای سرخ شده را با گوشت‌کوب یا چنگال کمی له کنید (نه کاملاً پوره)",
      "کدوهای له شده را به ترکیب پیاز و سیر اضافه کنید و خوب مخلوط کنید",
      "آب جوش را اضافه کنید و اجازه دهید حدود ۵ دقیقه بپزد تا کدوها کاملاً نرم شوند",
      "کشک را در کاسه‌ای با کمی آب (در صورت نیاز) رقیق کنید تا یکدست شود",
      "کشک رقیق شده را به کدوها اضافه کنید و هم بزنید",
      "نمک و فلفل را به میزان لازم اضافه کنید و اجازه دهید کشک‌کدو روی حرارت ملایم ۱۰-۱۵ دقیقه جا بیفتد و آب آن کشیده شود، گهگاه هم بزنید",
      "در صورت تمایل، در ۵ دقیقه پایانی، نیمی از گردوهای خرد شده را اضافه کنید و مخلوط کنید",
      "کشک‌کدو را در ظرف سرو بکشید و با پیاز داغ، نعناع داغ، سیر داغ، کشک و گردو تزیین کنید و با نان سرو نمایید."
    ],
    "category": "nani",
    "description": "کشک‌کدو",
    "hasRealData": true,
    "id": "dish-1765484110332-daldg-4",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "کشک‌پاجوش",
    "description": "کشک‌پاجوش",
    "ingredients": [
      {
        "amount": 1,
        "item": "کشک غلیظ",
        "unit": "پیمانه (۲۵۰ گرم)"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "amount": 2,
        "item": "آرد گندم",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 4.5
      },
      {
        "amount": 2,
        "item": "نعناع خشک",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 4,
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک",
        "amount": 1
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "amount": 3,
        "unit": "پیمانه (۷۲۰ میلی‌لیتر)",
        "item": "آب"
      },
      {
        "item": "گردو خرد شده",
        "unit": "پیمانه (۲۵ گرم) (اختیاری)",
        "amount": 0.25
      }
    ],
    "recipeSteps": [
      "پیازها را به صورت نگینی ریز خرد کنید",
      "در یک قابلمه متوسط، ۴ قاشق غذاخوری روغن را روی حرارت متوسط داغ کنید",
      "پیازهای خرد شده را به روغن اضافه کنید و حدود ۷-۱۰ دقیقه تفت دهید تا طلایی و سبک شوند",
      "سیرها را له کرده و به پیازها اضافه کنید، ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود",
      "زردچوبه را اضافه کرده و ۳۰ ثانیه تفت دهید",
      "آرد گندم را اضافه کنید و به مدت ۲-۳ دقیقه تفت دهید تا بوی خامی آرد گرفته شود و کمی طلایی شود (مراقب باشید نسوزد)",
      "نعناع خشک را اضافه کنید و بلافاصله حرارت را کم کنید، حدود ۱۵-۲۰ ثانیه تفت دهید تا عطر آن آزاد شود",
      "آب را به تدریج به مواد اضافه کنید و همزمان مرتب هم بزنید تا آرد گلوله نشود",
      "حرارت را کمی زیاد کنید و اجازه دهید مایع به جوش آید، سپس حرارت را ملایم کنید و اجازه دهید ۵-۷ دقیقه بجوشد تا کمی غلیظ شود",
      "کشک را در یک کاسه با کمی آب (در صورت نیاز) رقیق کنید تا یکدست شود",
      "کشک رقیق شده را به تدریج به قابلمه اضافه کنید و مرتب هم بزنید",
      "نمک و فلفل را به میزان لازم اضافه کنید، مراقب باشید چون کشک خودش شور است",
      "اجازه دهید کشک‌پاجوش روی حرارت بسیار ملایم به مدت ۱۵-۲۰ دقیقه جا بیفتد و غلیظ شود، در این مدت گهگاه هم بزنید تا ته نگیرد",
      "کشک‌پاجوش را در کاسه سرو کرده و در صورت تمایل با کمی نعناع داغ، پیاز داغ یا گردو تزیین کنید و با نان تازه سرو نمایید."
    ],
    "hasRealData": true,
    "category": "nani",
    "id": "dish-1765484110332-so2ve-5",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "بادمجان‌ها را پوست بکنید، از طول دو نیم کنید، کمی نمک بپاشید و برای ۳۰ دقیقه کنار بگذارید تا تلخی آن خارج شود",
      "بادمجان‌ها را با دست فشار دهید تا آب اضافی آنها خارج شود، سپس با دستمال آشپزخانه خشک کنید",
      "در یک تابه گود، روغن مایع را داغ کنید و بادمجان‌ها را از هر دو طرف تا زمانی که طلایی و نرم شوند، سرخ کنید. سپس روی دستمال روغن‌گیر قرار دهید",
      "پیازها را خلالی نازک خرد کنید و در کمی روغن باقی‌مانده در تابه با حرارت ملایم تفت دهید تا طلایی و کاراملی شوند. نیمی از پیازداغ را برای تزیین کنار بگذارید",
      "سیرها را له کرده یا ریز خرد کنید و به پیازداغ اضافه کنید، برای ۱ دقیقه تفت دهید تا عطر آن بلند شود",
      "زردچوبه را اضافه کرده و ۳۰ ثانیه دیگر تفت دهید",
      "در یک قابلمه دیگر یا باقیمانده روغن، نعناع خشک را روی حرارت ملایم حدود ۱۵-۲۰ ثانیه تفت دهید تا عطر آن بلند شود (مراقب باشید نسوزد)؛ نیمی از نعناع داغ را برای تزیین کنار بگذارید",
      "بادمجان‌های سرخ شده را به پیاز و سیر اضافه کنید و با پشت قاشق له کنید",
      "آب را اضافه کنید، در تابه را بگذارید و اجازه دهید بادمجان‌ها برای ۱۰ دقیقه روی حرارت ملایم بپزند تا کاملا نرم شوند و آب آن کشیده شود",
      "کشک را با ۱/۴ پیمانه آب یا آب بادمجان مخلوط کنید تا کمی رقیق شود (اگر نیاز بود)",
      "کشک رقیق شده را به مخلوط بادمجان اضافه کنید و خوب هم بزنید. برای ۵ تا ۱۰ دقیقه روی حرارت ملایم اجازه دهید بجوشد تا طعم‌ها با هم ترکیب شوند، مراقب باشید ته نگیرد",
      "در یک تابه کوچک، ۱ قاشق غذاخوری روغن داغ کنید و نعنا خشک را برای ۳۰ ثانیه تفت دهید تا عطر آن بلند شود. مراقب باشید نسوزد",
      "کشک‌بادمجان را در ظرف سرو بکشید و با نعناداغ، بقیه پیازداغ و گردوی خرد شده تزیین کنید",
      "با نان سنگک یا بربری تازه سرو کنید"
    ],
    "category": "nani",
    "name": "کشک‌بادنجان",
    "description": "کشک‌بادنجان",
    "hasRealData": true,
    "ingredients": [
      {
        "amount": 8,
        "unit": "عدد (حدود ۱ کیلوگرم)",
        "item": "بادمجان قلمی"
      },
      {
        "unit": "پیمانه (۲۵۰ گرم)",
        "amount": 1,
        "item": "کشک غلیظ"
      },
      {
        "amount": 2,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "amount": 6,
        "unit": "حبه",
        "item": "سیر"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "نعنا خشک",
        "amount": 2
      },
      {
        "item": "گردوی خرد شده",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "item": "زردچوبه",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0,
        "item": "روغن مایع",
        "unit": "به میزان لازم"
      },
      {
        "amount": 0.5,
        "item": "آب",
        "unit": "پیمانه"
      }
    ],
    "id": "dish-1765484114392-x0iox-1",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "در یک قابلمه یا تابه عمیق، ۲ قاشق غذاخوری روغن را داغ کنید و تکه‌های گوشت را در آن بریزید و با حرارت بالا تفت دهید تا از هر طرف قهوه‌ای شوند و آب بیندازند",
      "گوشت را از قابلمه خارج کرده و کنار بگذارید",
      "۲ قاشق غذاخوری روغن باقیمانده را در همان قابلمه بریزید و پیازهای خلالی را اضافه کنید. با حرارت ملایم-متوسط پیازها را تفت دهید تا کاملا طلایی و نرم شوند (حدود ۱۵-۲۰ دقیقه)",
      "سیر له شده (اگر استفاده می‌کنید) و زردچوبه را به پیازها اضافه کنید و ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود",
      "رب گوجه‌فرنگی را اضافه کنید و برای ۳-۴ دقیقه روی حرارت ملایم تفت دهید تا رنگ آن باز شود و بوی خامی آن گرفته شود",
      "گوشت‌های تفت داده شده را به قابلمه برگردانید",
      "نمک و فلفل سیاه را اضافه کنید و خوب هم بزنید",
      "آب جوش را به اندازه‌ای اضافه کنید که روی گوشت‌ها را بپوشاند",
      "حرارت را زیاد کنید تا به جوش آید، سپس حرارت را کم کرده، در قابلمه را بگذارید و اجازه دهید گوشت برای ۲ تا ۳ ساعت (بسته به نوع گوشت) به آرامی بپزد تا کاملا نرم و جا افتاده شود",
      "در اواخر پخت، طعم خورش را بچشید و در صورت نیاز نمک و فلفل آن را تنظیم کنید. آب خورش باید کم و غلیظ باشد",
      "این خوراک را می‌توان با برنج سفید یا نان سرو کرد"
    ],
    "id": "dish-1765484114392-4p770-2",
    "name": "خوراک قورمه آذری (گوشت و پیاز)",
    "description": "خوراک قورمه آذری (گوشت و پیاز)",
    "hasRealData": true,
    "category": "nani",
    "ingredients": [
      {
        "unit": "گرم (مکعبی ۳-۴ سانتی‌متری خرد شده)",
        "item": "گوشت گوسفندی یا گوساله (ترجیحا ران یا سردست)",
        "amount": 500
      },
      {
        "unit": "عدد",
        "amount": 3,
        "item": "پیاز بزرگ"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "روغن حیوانی یا مایع"
      },
      {
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "فلفل سیاه"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "unit": "پیمانه",
        "amount": 3.5,
        "item": "آب جوش"
      },
      {
        "item": "سیر",
        "unit": "حبه (له شده)",
        "amount": 4
      }
    ],
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "polo",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج ایرانی"
      },
      {
        "item": "گوشت چرخ کرده",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "لپه"
      },
      {
        "item": "پیاز متوسط",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی"
      },
      {
        "amount": 2,
        "unit": "قاشق چای‌خوری (تقریبی)",
        "item": "نمک"
      },
      {
        "amount": 1,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "زردچوبه"
      },
      {
        "item": "دارچین",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "unit": "به میزان لازم",
        "item": "روغن مایع",
        "amount": 0
      },
      {
        "unit": "به میزان لازم",
        "item": "آب",
        "amount": 0
      }
    ],
    "recipeSteps": [
      "برنج را حداقل ۲ ساعت قبل با کمی نمک خیس کنید",
      "لپه را جداگانه از شب قبل خیس کنید و آب آن را چند بار عوض کنید. سپس لپه را در قابلمه با آب بپزید تا نرم شود اما له نشود (حدود ۳۰-۴۰ دقیقه)، آبکش کنید و کنار بگذارید",
      "پیاز اول را ریز خرد کنید و در کمی روغن تفت دهید تا سبک شود",
      "گوشت چرخ‌کرده را به پیاز اضافه کنید و با حرارت متوسط تفت دهید تا رنگ گوشت تغییر کند و آب آن کشیده شود",
      "زردچوبه، نمک و فلفل سیاه را اضافه کنید و خوب تفت دهید",
      "رب گوجه‌فرنگی را اضافه کرده و برای ۳-۴ دقیقه دیگر تفت دهید تا رنگ باز کند و بوی خامی آن گرفته شود",
      "لپه پخته شده را به مخلوط گوشت اضافه کرده و خوب هم بزنید. اگر استفاده می‌کنید، دارچین را اضافه کنید و مواد را برای ۵ دقیقه روی حرارت ملایم با هم تفت دهید. این مایه گوشتی پلو آماده است",
      "برنج خیس شده را آبکش کنید (آب و نمک آن را دور بریزید)",
      "در یک قابلمه بزرگ، آب را به جوش آورید و برنج را اضافه کنید. اجازه دهید برنج به مدت ۷-۱۰ دقیقه بجوشد تا مغز آن کمی نرم شود و اطراف آن پخته شود (دندان‌گیر باشد). سپس آبکش کنید",
      "ته قابلمه مورد نظر کمی روغن بریزید و ته دیگ دلخواه (نان، سیب‌زمینی یا خود برنج) را بچینید",
      "یک لایه برنج آبکش شده روی ته دیگ بریزید",
      "سپس یک لایه از مایه گوشتی و لپه را روی برنج پخش کنید",
      "این کار را لایه لایه تکرار کنید تا مواد تمام شود. لایه آخر باید برنج باشد",
      "با ته قاشق چند سوراخ روی برنج ایجاد کنید و نصف پیمانه آب و کمی روغن داغ را روی برنج بریزید",
      "در قابلمه را با دم‌کنی بپوشانید و روی حرارت زیاد قرار دهید تا بخار کند (حدود ۵-۱۰ دقیقه)",
      "سپس حرارت را بسیار کم کنید و اجازه دهید پلو به مدت ۴۵ دقیقه تا ۱ ساعت دم بکشد و جا بیفتد",
      "تتک‌پلو را به آرامی در دیس بکشید و سرو کنید"
    ],
    "name": "تتک‌پلو (لپه پلو با گوشت)",
    "description": "تتک‌پلو (لپه پلو با گوشت)",
    "id": "dish-1765484114392-36uy9-3",
    "hasRealData": true,
    "calories": 650,
    "cookTime": 120,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "ash",
    "recipeSteps": [
      "سیرابی را با آب سرد خوب بشویید و چندین بار آب آن را عوض کنید",
      "سیرابی خرد شده را با ۱ عدد پیاز درسته، کمی نمک و ۳-۴ پیمانه آب در قابلمه بریزید. روی حرارت زیاد قرار دهید تا به جوش آید، سپس حرارت را کم کرده و اجازه دهید برای حداقل ۳-۴ ساعت (یا تا زمانی که کاملا نرم شود) بپزد. پس از پخت، پیاز را دور بیندازید و سیرابی را آبکش کنید (آب آن را نگه دارید)",
      "در یک قابلمه جداگانه، نخود و عدس خیس شده را با آب بپزید تا کاملا نرم شوند. آبکش کنید و کنار بگذارید",
      "پیاز دوم را خلالی نازک خرد کرده و در کمی روغن تفت دهید تا طلایی شود (پیازداغ). نیمی از آن را برای تزیین کنار بگذارید",
      "سیر له شده و زردچوبه را به پیازداغ باقیمانده اضافه کنید و برای ۱ دقیقه تفت دهید تا عطر آن بلند شود",
      "سیرابی پخته شده، نخود و عدس پخته شده را به قابلمه اضافه کنید و خوب هم بزنید",
      "۳ پیمانه از آب سیرابی یا آب ساده به مواد اضافه کنید. نمک و فلفل سیاه را تنظیم کنید. اجازه دهید برای ۱۰-۱۵ دقیقه بجوشد تا طعم‌ها با هم ترکیب شوند",
      "در این مرحله، دوغ یا ماست رقیق شده را با آرد خوب مخلوط کنید تا یکدست شود و هیچ گلوله‌ای نداشته باشد",
      "حرارت زیر آش را کم کنید، مخلوط دوغ/ماست را به آرامی و در حالی که مرتب هم می‌زنید به آش اضافه کنید. هم زدن مداوم ضروری است تا دوغ نبرد",
      "پس از اضافه کردن دوغ، به هم زدن ادامه دهید تا آش دوباره به نقطه جوش برسد. سپس حرارت را ملایم کرده و برای ۵-۱۰ دقیقه دیگر بجوشانید تا آش غلیظ شود و جا بیفتد",
      "در یک تابه کوچک، کمی روغن داغ کنید و نعنا خشک را برای ۳۰ ثانیه تفت دهید تا عطر آن بلند شود (نعناداغ)",
      "آش سیرابی را در ظرف سرو بکشید و با نعناداغ و پیازداغ تزیین کنید",
      "این آش را می‌توان به عنوان یک وعده غذایی کامل سرو کرد"
    ],
    "ingredients": [
      {
        "unit": "گرم (پاک شده و خرد شده)",
        "amount": 500,
        "item": "سیرابی گوسفندی"
      },
      {
        "item": "نخود",
        "unit": "پیمانه (از شب قبل خیس شده)",
        "amount": 0.5
      },
      {
        "unit": "پیمانه (از شب قبل خیس شده)",
        "item": "عدس",
        "amount": 0.25
      },
      {
        "amount": 2,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "item": "سیر",
        "amount": 6,
        "unit": "حبه"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "نعنا خشک"
      },
      {
        "unit": "پیمانه",
        "item": "دوغ غلیظ یا ماست پرچرب",
        "amount": 2
      },
      {
        "unit": "قاشق غذاخوری (برای غلظت ماست/دوغ)",
        "item": "آرد سفید",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "amount": 0,
        "unit": "به میزان لازم"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "item": "روغن مایع",
        "amount": 0
      }
    ],
    "name": "آش سیرابی",
    "description": "آش سیرابی",
    "id": "dish-1765484114392-nmfvf-4",
    "hasRealData": true,
    "calories": 300,
    "cookTime": 120,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "name": "آش ترخینه دوغ",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 4,
        "item": "ترخینه"
      },
      {
        "unit": "پیمانه (از شب قبل خیس شده)",
        "item": "نخود",
        "amount": 0.5
      },
      {
        "item": "لوبیا چیتی",
        "amount": 0.5,
        "unit": "پیمانه (از شب قبل خیس شده)"
      },
      {
        "unit": "پیمانه (از شب قبل خیس شده)",
        "amount": 0.25,
        "item": "عدس"
      },
      {
        "unit": "گرم",
        "item": "سبزی آش (تره، جعفری، گشنیز، اسفناج یا برگ چغندر)",
        "amount": 500
      },
      {
        "item": "پیاز بزرگ",
        "unit": "عدد",
        "amount": 2
      },
      {
        "unit": "حبه",
        "amount": 6,
        "item": "سیر"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "نعنا خشک",
        "amount": 3
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک"
      },
      {
        "unit": "به میزان لازم",
        "item": "فلفل سیاه",
        "amount": 0
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "unit": "پیمانه",
        "amount": 9,
        "item": "آب"
      }
    ],
    "hasRealData": true,
    "category": "ash",
    "recipeSteps": [
      "ترخینه را از چند ساعت قبل (یا از شب قبل) در آب خیس کنید تا نرم شود",
      "نخود و لوبیا را که از شب قبل خیس کرده‌اید، با آب تازه در قابلمه جداگانه بپزید تا نیم‌پز شوند",
      "پیازها را خلالی خرد کنید و در کمی روغن تفت دهید تا طلایی شوند (پیازداغ). نیمی از پیازداغ را برای تزیین کنار بگذارید",
      "سیر له شده و زردچوبه را به پیازداغ باقیمانده اضافه کنید و برای ۱ دقیقه تفت دهید",
      "حبوبات نیم‌پز (نخود و لوبیا) را به قابلمه اضافه کنید",
      "ترخینه‌های خیس خورده (با آب آن) را اضافه کنید",
      "آب (یا آب مرغ/گوشت) را به میزان لازم اضافه کنید تا روی مواد را بپوشاند و مقداری اضافه باشد",
      "حرارت را زیاد کنید تا به جوش آید، سپس حرارت را کم کرده و اجازه دهید مواد برای ۱ ساعت بپزند تا حبوبات کاملا نرم شوند و ترخینه باز شود",
      "در این مرحله، عدس خیس شده را اضافه کنید و اجازه دهید ۲۰-۳۰ دقیقه دیگر بپزد",
      "سبزی آش خرد شده را به آش اضافه کنید و برای ۱۵-۲۰ دقیقه دیگر بپزید تا سبزی نرم شود و رنگ آن تغییر کند. در این مرحله نمک و فلفل آش را تنظیم کنید",
      "در یک تابه کوچک، کمی روغن داغ کنید و نعنا خشک را برای ۳۰ ثانیه تفت دهید تا عطر آن بلند شود (نعناداغ). مراقب باشید نسوزد",
      "آش ترخینه دوغ را در ظرف سرو بکشید و با نعناداغ، پیازداغ و کمی کشک (اختیاری) تزیین کنید",
      "این آش معمولا با کشک سرو می‌شود"
    ],
    "description": "آش ترخینه دوغ",
    "id": "dish-1765484114392-kyr5o-5",
    "calories": 300,
    "cookTime": 120,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "نخود را از شب قبل خیس کرده و چند بار آب آن را عوض کنید",
      "گوشت را به قطعات متوسط خرد کنید",
      "یک پیاز را نگینی خرد کرده و با کمی روغن در قابلمه تفت دهید تا سبک شود",
      "گوشت را اضافه کرده و با پیاز تفت دهید تا رنگ آن تغییر کند",
      "زردچوبه و فلفل سیاه را اضافه کرده و کمی تفت دهید",
      "نخود خیس خورده را به همراه حدود ۶-۸ پیمانه آب به گوشت اضافه کنید",
      "حرارت را زیاد کنید تا به جوش آید، سپس کف روی آن را بگیرید و حرارت را کم کنید",
      "درب قابلمه را بگذارید و اجازه دهید برای ۲.۵ تا ۳ ساعت بپزد تا گوشت و نخود کاملاً نرم شوند",
      "در اواسط پخت نمک را اضافه کنید",
      "بعد از پخت، گوشت را از قابلمه خارج کرده و ریش‌ریش کنید",
      "نخود و آب باقیمانده را کمی با گوشت‌کوب بکوبید تا کمی له شوند اما کاملاً پوره نشوند",
      "گوشت ریش شده را به همراه کشک به قابلمه برگردانید",
      "دو حبه سیر را ریز خرد کرده و در کمی روغن تفت دهید تا طلایی شود، سپس نعناع خشک را اضافه کرده و یک تفت کوچک بدهید (مراقب باشید نسوزد)",
      "این نعناع داغ و سیر داغ را به خوراک اضافه کنید",
      "اجازه دهید خوراک برای ۱۵-۲۰ دقیقه دیگر روی حرارت ملایم جا بیفتد و غلیظ شود و طعم‌ها به خورد هم بروند",
      "در این مرحله غلظت خوراک را با اضافه کردن کمی آب جوش یا کشک بیشتر تنظیم کنید",
      "بزقرمه را در کاسه سرو کرده و با پیاز داغ، سیر داغ و نعناع داغ تزیین کنید",
      "این خوراک را معمولاً با نان خشک یا نان سنگک میل می‌کنند"
    ],
    "name": "بزقرمه کرمانی",
    "description": "بزقرمه کرمانی",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "گوشت گوسفندی (ترجیحاً گردن یا سردست)",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "نخود",
        "amount": 1,
        "unit": "پیمانه (حدود ۲۰۰ گرم)"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز بزرگ"
      },
      {
        "amount": 4,
        "item": "سیر",
        "unit": "حبه"
      },
      {
        "item": "کشک غلیظ",
        "unit": "پیمانه",
        "amount": 1.75
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "نعناع خشک",
        "amount": 2
      },
      {
        "item": "زردچوبه",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0,
        "item": "نمک و فلفل سیاه",
        "unit": "به میزان لازم"
      },
      {
        "amount": 0,
        "item": "روغن مایع یا حیوانی",
        "unit": "به میزان لازم"
      },
      {
        "unit": "پیمانه",
        "item": "آب",
        "amount": 7
      },
      {
        "item": "نان خشک یا نان سنگک برای سرو",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "پیاز داغ، سیر داغ، نعناع داغ برای تزیین (اختیاری)"
      }
    ],
    "category": "nani",
    "id": "dish-1765484117563-c85t2-1",
    "calories": 400,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "چنگمال کردستان",
    "hasRealData": true,
    "id": "dish-1765484117563-b00od-2",
    "recipeSteps": [
      "نان را با دست به قطعات کوچک و نامنظم خرد یا چنگال بزنید",
      "هسته خرماها را خارج کرده و خرما را به قطعات کوچک‌تر تقسیم کنید یا با چنگال له کنید تا نرم شود",
      "روغن حیوانی (یا کره) را در یک تابه روی حرارت ملایم آب کنید",
      "نان‌های خرد شده را به روغن اضافه کنید و برای چند دقیقه تفت دهید تا کمی نرم و معطر شوند (مراقب باشید نسوزند)",
      "خرماهای هسته گرفته و خرد شده را به نان و روغن اضافه کنید",
      "مواد را با پشت قاشق یا با دست (بعد از اینکه کمی خنک شد) به خوبی با هم مخلوط و له کنید تا خرماها کاملاً با نان ترکیب شوند و یکدست شوند",
      "اگر تلوع دارید، گردوی خرد شده را در این مرحله اضافه کنید و مخلوط کنید",
      "چنگمال آماده را در ظرف سرو کرده و می‌توانید با کنجد تزیین کنید",
      "این دسر را می‌توان هم گرم و هم سرد سرو کرد"
    ],
    "category": "dessert",
    "description": "چنگمال کردستان",
    "ingredients": [
      {
        "amount": 275,
        "item": "نان سنتی یا نان لواش تازه و کمی خشک",
        "unit": "گرم"
      },
      {
        "item": "خرما (ترجیحاً رطب یا خرمای نرم)",
        "amount": 250,
        "unit": "گرم"
      },
      {
        "amount": 100,
        "unit": "گرم",
        "item": "روغن حیوانی (کرمانشاهی یا محلی) یا کره"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه (۵۰ گرم)",
        "item": "گردو خرد شده"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "کنجد برای تزیین (اختیاری)"
      }
    ],
    "calories": 620,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "dessert",
    "ingredients": [
      {
        "amount": 1.5,
        "item": "آرد گندم",
        "unit": "پیمانه (حدود ۲۰۰ گرم)"
      },
      {
        "unit": "پیمانه (۲۰۰ گرم)",
        "amount": 1,
        "item": "شکر"
      },
      {
        "unit": "پیمانه (۲۵۰ میلی‌لیتر)",
        "amount": 1,
        "item": "آب"
      },
      {
        "amount": 0.25,
        "item": "گلاب",
        "unit": "پیمانه (۶۰ میلی‌لیتر)"
      },
      {
        "item": "روغن مایع یا کره/روغن حیوانی",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "item": "زعفران دم کرده غلیظ",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری (اختیاری)",
        "item": "پودر هل",
        "amount": 0.5
      }
    ],
    "name": "چنگ‌دانه",
    "id": "dish-1765484117563-9035e-3",
    "recipeSteps": [
      "ابتدا شربت را آماده کنید: آب و شکر را در قابلمه‌ای کوچک بریزید و روی حرارت ملایم قرار دهید",
      "اجازه دهید شکر کاملاً حل شود، نیازی به جوشاندن زیاد نیست",
      "پس از حل شدن شکر، گلاب و زعفران دم کرده و پودر هل (در صورت استفاده) را اضافه کنید و از روی حرارت بردارید",
      "آرد را در یک تابه مناسب و روی حرارت ملایم بریزید و بدون روغن برای ۱۰-۱۵ دقیقه تفت دهید تا بوی خامی آرد گرفته شود و کمی تغییر رنگ دهد",
      "روغن را به آرد تفت داده شده اضافه کنید و هم بزنید تا آرد با روغن مخلوط شود",
      "برای حدود ۱۰-۱۵ دقیقه دیگر آرد را با روغن تفت دهید تا رنگ آن کمی تیره‌تر و طلایی شود (میزان تیرگی به سلیقه شما بستگی دارد)",
      "حالا شربت آماده شده را به آرامی و کم کم به مخلوط آرد و روغن اضافه کنید",
      "همزمان با اضافه کردن شربت، مواد را به سرعت و پیوسته هم بزنید تا آرد گلوله نشود و حلوا جمع شود",
      "به هم زدن ادامه دهید تا حلوا از دیواره‌های تابه جدا شود و به صورت یک گوله در وسط تابه جمع شود",
      "چنگ‌دانه را در دیس سرو کشیده و می‌توانید با پودر پسته یا نارگیل تزیین کنید",
      "معمولاً این دسر به صورت گرم سرو می‌شود"
    ],
    "description": "چنگ‌دانه",
    "hasRealData": true,
    "calories": 700,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765484117563-qheg5-4",
    "ingredients": [
      {
        "unit": "عدد (حدود ۱ کیلوگرم)",
        "amount": 4,
        "item": "بادمجان قلمی بزرگ"
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گوشت چرخ کرده (مخلوط گوسفند و گوساله)"
      },
      {
        "item": "پیاز متوسط",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "گوجه فرنگی متوسط",
        "unit": "عدد",
        "amount": 2
      },
      {
        "unit": "حبه",
        "amount": 3,
        "item": "سیر"
      },
      {
        "amount": 1,
        "item": "رب گوجه فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک، فلفل سیاه، زردچوبه",
        "amount": 0,
        "unit": "به میزان لازم"
      },
      {
        "amount": 0,
        "item": "روغن مایع برای سرخ کردن",
        "unit": "به میزان لازم"
      },
      {
        "item": "آب لیمو ترش تازه",
        "amount": 1,
        "unit": "قاشق غذاخوری (اختیاری)"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "جعفری خرد شده برای تزیین (اختیاری)"
      }
    ],
    "category": "kabab",
    "hasRealData": true,
    "description": "بادمجان‌کباب محلی",
    "recipeSteps": [
      "بادمجان‌ها را پوست بگیرید (یا یک در میان پوست بگیرید)، سپس به صورت ورقه‌های طولی با ضخامت حدود نیم سانت برش دهید",
      "روی ورقه‌های بادمجان نمک بپاشید و برای ۳۰ دقیقه کنار بگذارید تا آب اضافی آن خارج شود و تلخی آن گرفته شود",
      "پس از ۳۰ دقیقه، بادمجان‌ها را با آب سرد بشویید و کاملاً خشک کنید (این مرحله برای جلوگیری از جذب زیاد روغن مهم است)",
      "در یک تابه، کمی روغن ریخته و ورقه‌های بادمجان را از هر دو طرف سرخ کنید تا طلایی و نرم شوند، سپس روی دستمال آشپزخانه قرار دهید تا روغن اضافی‌شان گرفته شود",
      "برای مواد میانی: پیاز را رنده کرده و آب آن را بگیرید",
      "پیاز رنده شده را با گوشت چرخ کرده، نمک، فلفل سیاه و کمی زردچوبه مخلوط کنید و خوب ورز دهید",
      "از مواد گوشتی کوفته قلقلی‌های کوچک درست کنید و در کمی روغن تفت دهید تا نیم‌پز شوند",
      "در همان تابه یا تابه دیگری، یک پیاز کوچک را نگینی خرد کرده و تفت دهید تا سبک شود",
      "سیر رنده شده را اضافه کرده و کمی تفت دهید",
      "رب گوجه فرنگی را اضافه کرده و برای چند دقیقه تفت دهید تا رنگ باز کند",
      "گوجه فرنگی‌ها را خرد کرده و به سس اضافه کنید",
      "نمک و فلفل سس را اندازه کنید",
      "اجازه دهید سس کمی جا بیفتد",
      "برای مونتاژ بادمجان‌کباب: یک ورقه بادمجان سرخ شده را بردارید، یک یا دو عدد کوفته قلقلی را روی آن قرار دهید و بادمجان را رول کنید",
      "این رول‌ها را در یک ظرف پیرکس یا تابه مناسب که بتوانید درب آن را بگذارید، بچینید",
      "سس آماده شده را روی رول‌های بادمجان بریزید",
      "ظرف را روی حرارت ملایم قرار دهید یا در فر از قبل گرم شده با دمای ۱۸۰ درجه سانتی‌گراد (۳۵۰ درجه فارنهایت) برای ۲۰-۳۰ دقیقه بگذارید تا کاملاً جا بیفتد و طعم‌ها به خورد هم بروند",
      "در صورت تمایل، در ۵ دقیقه آخر پخت، کمی آب لیمو ترش روی آن بریزید",
      "بادمجان‌کباب را با برنج یا نان سرو کرده و با جعفری تازه تزیین کنید"
    ],
    "name": "بادمجان‌کباب محلی",
    "calories": 550,
    "cookTime": 70,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "kabab",
    "name": "سوزی‌کباب",
    "id": "dish-1765484117563-cty6z-5",
    "recipeSteps": [
      "پیاز را رنده ریز کنید و آب اضافی آن را با فشار دست بگیرید",
      "سیر را نیز رنده ریز کنید",
      "سبزیجات معطر (جعفری، گشنیز، شوید، تره) را کاملاً ریز خرد کنید",
      "گوشت چرخ کرده را در یک کاسه بزرگ بریزید",
      "پیاز رنده شده، سیر رنده شده، سبزیجات خرد شده، نمک، فلفل سیاه، زردچوبه و سماق (در صورت تمایل) را به گوشت اضافه کنید",
      "مواد را با دست به مدت ۱۰-۱۵ دقیقه خوب ورز دهید تا کاملاً چسبناک و یکدست شوند (ورز دادن کافی برای نچسبیدن کباب به سیخ یا نریختن آن در تابه بسیار مهم است)",
      "روی کاسه را با سلفون بپوشانید و برای حداقل ۱ ساعت در یخچال قرار دهید تا مواد استراحت کرده و مزه‌دار شوند",
      "پس از استراحت، دوباره کمی ورز دهید",
      "اگر می‌خواهید کباب را روی منقل درست کنید، دست‌ها را کمی با آب یا روغن خیس کنید و از مایه کباب به اندازه یک نارنگی بردارید",
      "آن را به سیخ مخصوص کباب کوبیده بکشید و فرم دهید",
      "سیخ‌ها را روی منقل با حرارت متوسط کباب کنید، مرتب بچرخانید تا یکدست بپزند و نسوزند",
      "اگر می‌خواهید در تابه درست کنید، در یک تابه نچسب کمی روغن بریزید و روی حرارت متوسط گرم کنید",
      "از مایه کباب به اندازه دلخواه بردارید و به شکل کباب مستطیلی یا گرد فرم دهید و در تابه بچینید",
      "درب تابه را بگذارید و اجازه دهید یک طرف کباب‌ها بپزد و طلایی شود، سپس برگردانید تا طرف دیگر نیز بپزد",
      "سوزی‌کباب را با برنج زعفرانی، گوجه کبابی، پیاز و جعفری و نان تازه سرو کنید"
    ],
    "ingredients": [
      {
        "amount": 500,
        "item": "گوشت چرخ کرده (مخلوط گوسفند و گوساله)",
        "unit": "گرم"
      },
      {
        "item": "پیاز بزرگ",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 2
      },
      {
        "item": "سبزی معطر (جعفری، گشنیز، شوید، تره)",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 1.5,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "زردچوبه"
      },
      {
        "amount": 0.5,
        "item": "پودر سیر یا پیاز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری (اختیاری)",
        "item": "سماق",
        "amount": 1
      },
      {
        "amount": 0,
        "item": "روغن مایع (برای چرب کردن)",
        "unit": "به میزان لازم"
      }
    ],
    "hasRealData": true,
    "description": "سوزی‌کباب",
    "calories": 450,
    "cookTime": 70,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "پلو شوشتری",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "برنج",
        "amount": 3,
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "item": "لوبیا چشم بلبلی",
        "unit": "پیمانه"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "شوید خشک",
        "amount": 3
      },
      {
        "unit": "عدد",
        "item": "پیاز بزرگ",
        "amount": 1
      },
      {
        "unit": "گرم",
        "item": "گوشت چرخ کرده",
        "amount": 300
      },
      {
        "amount": 1,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه فرنگی"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک",
        "amount": 1
      },
      {
        "item": "فلفل سیاه",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "دارچین"
      },
      {
        "item": "زعفران دم کرده غلیظ",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      }
    ],
    "description": "پلو شوشتری",
    "category": "polo",
    "id": "dish-1765484120785-igjvv-1",
    "recipeSteps": [
      "برنج را از ۲-۳ ساعت قبل با آب و کمی نمک خیس کنید",
      "لوبیا چشم بلبلی را از شب قبل خیس کنید و آب آن را چند بار عوض کنید. سپس با مقداری آب و کمی نمک بپزید تا نیم‌پز شود (حدود ۳۰-۴۰ دقیقه). نباید له شود. آبکش کنید",
      "پیاز را نگینی خرد کرده و در مقداری روغن تفت دهید تا سبک و طلایی شود",
      "گوشت چرخ کرده را به پیاز اضافه کنید و تفت دهید تا رنگ گوشت تغییر کند",
      "زردچوبه، نمک، فلفل سیاه و دارچین را اضافه کرده و کمی تفت دهید تا عطر ادویه‌ها بلند شود",
      "رب گوجه فرنگی را اضافه کرده و ۱-۲ دقیقه دیگر تفت دهید تا بوی خامی رب گرفته شود و رنگ باز کند",
      "لوبیا چشم بلبلی نیم‌پز شده و شوید خشک (یا تازه) را به مواد گوشتی اضافه کرده و به آرامی مخلوط کنید. حرارت را خاموش کنید",
      "در یک قابلمه مناسب، آب و کمی نمک را به جوش آورید. برنج خیس خورده را اضافه کنید و اجازه دهید ۸-۱۰ دقیقه بجوشد تا برنج نیم‌پز شود (مغز آن کمی سفت باشد). آبکش کنید",
      "ته قابلمه ته دیگ دلخواه (نان، سیب زمینی یا برنج) قرار دهید",
      "یک لایه برنج آبکش شده روی ته دیگ بریزید، سپس یک لایه از مخلوط گوشت و لوبیا و شوید. این کار را لایه لایه تکرار کنید تا مواد تمام شود. لایه آخر باید برنج باشد",
      "با ته قاشق چند سوراخ روی برنج ایجاد کنید. زعفران دم کرده را روی برنج بریزید",
      "۱/۴ پیمانه آب و ۲-۳ قاشق غذاخوری روغن روی برنج بریزید",
      "درب قابلمه را با دم‌کنی بپوشانید و روی حرارت ملایم قرار دهید. ابتدا ۵-۷ دقیقه حرارت را کمی بیشتر کنید تا بخار کند، سپس حرارت را بسیار کم کنید و اجازه دهید پلو به مدت ۴۵-۶۰ دقیقه دم بکشد"
    ],
    "calories": 650,
    "cookTime": 120,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "پلوچه کردی (لوبیا پلو کردی)",
    "description": "پلوچه کردی (لوبیا پلو کردی)",
    "recipeSteps": [
      "برنج را از ۲-۳ ساعت قبل با آب و کمی نمک خیس کنید",
      "پیاز را نگینی خرد کرده و در مقداری روغن تفت دهید تا سبک و طلایی شود",
      "گوشت مکعبی خرد شده را اضافه کنید و تفت دهید تا رنگ گوشت تغییر کند و آب آن کشیده شود",
      "زردچوبه، نمک و فلفل سیاه را اضافه کرده و کمی تفت دهید تا عطر ادویه‌ها بلند شود",
      "لوبیا سبز خرد شده را به گوشت اضافه کرده و ۵-۷ دقیقه تفت دهید تا کمی نرم شود",
      "رب گوجه فرنگی و پوره گوجه فرنگی را اضافه کنید و حدود ۵ دقیقه تفت دهید تا بوی خامی رب گرفته شود و رنگ باز کند",
      "۱/۲ پیمانه آب جوش به مواد اضافه کنید، درب قابلمه را بگذارید و اجازه دهید گوشت با حرارت ملایم حدود ۱ تا ۱.۵ ساعت بپزد تا نیم‌پز شود و آب آن کم شود",
      "در یک قابلمه مناسب، آب و کمی نمک را به جوش آورید. برنج خیس خورده را اضافه کنید و اجازه دهید ۸-۱۰ دقیقه بجوشد تا برنج نیم‌پز شود. آبکش کنید",
      "ته قابلمه ته دیگ دلخواه قرار دهید",
      "یک لایه برنج آبکش شده روی ته دیگ بریزید، سپس یک لایه از مخلوط گوشت و لوبیا. این کار را لایه لایه تکرار کنید تا مواد تمام شود. لایه آخر باید برنج باشد",
      "با ته قاشق چند سوراخ روی برنج ایجاد کنید. زعفران دم کرده و دارچین را روی برنج بریزید",
      "۱/۴ پیمانه آب و ۲-۳ قاشق غذاخوری روغن روی برنج بریزید",
      "درب قابلمه را با دم‌کنی بپوشانید و روی حرارت ملایم قرار دهید. ابتدا ۵-۷ دقیقه حرارت را کمی بیشتر کنید تا بخار کند، سپس حرارت را بسیار کم کنید و اجازه دهید پلو به مدت ۴۵-۶۰ دقیقه دم بکشد"
    ],
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی)",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "item": "لوبیا سبز",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "پیاز بزرگ"
      },
      {
        "item": "رب گوجه فرنگی",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "گوجه فرنگی متوسط",
        "unit": "عدد",
        "amount": 2
      },
      {
        "item": "روغن مایع",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "زردچوبه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "دارچین"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم کرده غلیظ"
      }
    ],
    "id": "dish-1765484120785-u4h9t-2",
    "hasRealData": true,
    "category": "polo",
    "calories": 650,
    "cookTime": 90,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1765484120785-znfay-3",
    "recipeSteps": [
      "لپه را از شب قبل خیس کنید و آب آن را چند بار عوض کنید. سپس با مقداری آب نیم‌پز کنید (حدود ۳۰ دقیقه) و آبکش کنید",
      "پیاز را نگینی خرد کرده و در قابلمه با مقداری روغن تفت دهید تا سبک و طلایی شود",
      "گوشت را به پیاز اضافه کنید و تفت دهید تا رنگ گوشت تغییر کند",
      "زردچوبه و فلفل سیاه را اضافه کرده و کمی تفت دهید",
      "رب گوجه فرنگی را اضافه کنید و ۱-۲ دقیقه دیگر تفت دهید",
      "۳-۴ پیمانه آب جوش به گوشت اضافه کنید، درب قابلمه را ببندید و اجازه دهید گوشت روی حرارت ملایم حدود ۱.۵ ساعت بپزد تا نیم‌پز شود",
      "در همین حین، برگ چغندر خرد شده را در تابه‌ای جداگانه با کمی روغن تفت دهید تا آب آن کشیده شود و کمی نرم شود. (اختیاری: سیر رنده شده را در اواخر تفت دادن برگ چغندر اضافه کنید و کمی تفت دهید تا عطر آن بلند شود)",
      "پس از اینکه گوشت نیم‌پز شد، لپه نیم‌پز شده و برگ چغندر تفت داده شده (و سیر) را به خورش اضافه کنید",
      "نمک و آبغوره یا آب نارنج را نیز اضافه کنید",
      "اجازه دهید خورش روی حرارت ملایم حدود ۴۵ دقیقه تا ۱ ساعت دیگر بپزد تا گوشت کاملا نرم شود، لپه پخته شود و خورش جا بیفتد. در صورت نیاز می‌توانید کمی آب جوش اضافه کنید",
      "خورش را همراه با برنج سرو کنید"
    ],
    "name": "خورش برگ چغندر",
    "description": "خورش برگ چغندر",
    "category": "stew",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی)",
        "unit": "گرم",
        "amount": 400
      },
      {
        "amount": 500,
        "unit": "گرم",
        "item": "برگ چغندر"
      },
      {
        "item": "پیاز بزرگ",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "unit": "حبه",
        "amount": 3.5,
        "item": "سیر"
      },
      {
        "unit": "پیمانه",
        "item": "لپه",
        "amount": 0.5
      },
      {
        "amount": 1,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه فرنگی"
      },
      {
        "item": "آبغوره یا آب نارنج",
        "unit": "قاشق غذاخوری",
        "amount": 3.5
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک"
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "item": "روغن مایع",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "calories": 550,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "unit": "دست",
        "item": "کله پاچه"
      }
    ],
    "description": "صبحانه اصیل ایرانی با آب لیمو",
    "id": "rec-101",
    "recipeSteps": [
      "طولانی بپزید.",
      "با دارچین سرو کنید."
    ],
    "category": "local",
    "name": "کله‌پاچه کامل مجلسی",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "سیرابی",
        "amount": 1,
        "unit": "کیلو"
      }
    ],
    "id": "rec-102",
    "category": "local",
    "name": "خوراک سیرابی و شیردان",
    "description": "غذای درمانی و مقوی با سیر",
    "recipeSteps": [
      "با پیاز و سیر فراوان بپزید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "rec-103",
    "category": "dolma",
    "recipeSteps": [
      "ورز دهید و در سس بپزید."
    ],
    "name": "کوفته نخودچی اراک",
    "description": "کوفته‌های ریز و لذیذ",
    "ingredients": [
      {
        "item": "آرد نخودچی",
        "unit": "پیمانه",
        "amount": 1
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "nani",
    "ingredients": [
      {
        "amount": 3,
        "item": "بادمجان",
        "unit": "عدد"
      }
    ],
    "id": "rec-104",
    "name": "یتیمچه bادمجان",
    "recipeSteps": [
      "با گوجه و پیاز بپزید."
    ],
    "description": "غذای گیاهی و ارزان",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "local",
    "id": "rec-105",
    "name": "آبگوشت قنبید قم",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 2,
        "item": "کلم قمری"
      }
    ],
    "recipeSteps": [
      "مانند دیزی بپزید."
    ],
    "description": "با کلم قمری و نخود",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "nani",
    "id": "rec-106",
    "recipeSteps": [
      "ماست را در آخر اضافه کنید."
    ],
    "description": "غذای فوری با تخم مرغ و ماست",
    "ingredients": [
      {
        "item": "ماست",
        "unit": "لیوان",
        "amount": 1
      }
    ],
    "name": "اشکنه ماست",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "چرخ کنید و سرخ کنید."
    ],
    "id": "rec-107",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "لپه پخته",
        "amount": 1
      }
    ],
    "description": "با لپه و گوشت و سوراخی در وسط",
    "category": "kuku",
    "name": "شامی پوک رشتی",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "fastfood",
    "ingredients": [
      {
        "item": "خمیر پیراشکی",
        "unit": "عدد",
        "amount": 10
      }
    ],
    "description": "فست فود خانگی محبوب",
    "name": "پیراشکی مرغ و قارچ",
    "id": "rec-108",
    "recipeSteps": [
      "داخل خمیر را پر کرده و سرخ کنید."
    ],
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "در تابه پهن کرده و سرخ کنید."
    ],
    "category": "kabab",
    "description": "غذای سریع با گوشت چرخ کرده",
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "گوشت"
      }
    ],
    "id": "rec-109",
    "name": "کباب تابه ای زعفرانی",
    "calories": 450,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "غذای محلی کرمانی",
    "recipeSteps": [
      "سیب زمینی را بپزید و با کشک مخلوط کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "کشک"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "سیب زمینی"
      }
    ],
    "name": "کشک سیب‌زمینی کرمان",
    "category": "local",
    "id": "rec-110",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "گوشت پخته شده در دل برنج",
    "recipeSteps": [
      "گوشت را لابلای برنج دم کنید."
    ],
    "category": "polo",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "گوشت سردست"
      }
    ],
    "id": "rec-111",
    "name": "دمپخت لای پلو",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "نرگسی اسفناج",
    "description": "املت اسفناج و پیازداغ",
    "recipeSteps": [
      "اسفناج را بپزید و تخم مرغ بزنید."
    ],
    "ingredients": [
      {
        "item": "اسفناج",
        "unit": "گرم",
        "amount": 500
      }
    ],
    "category": "kuku",
    "id": "rec-112",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "rec-113",
    "ingredients": [
      {
        "item": "بادمجان کبابی",
        "unit": "عدد",
        "amount": 4
      }
    ],
    "name": "میرزا قاسمی اصیل",
    "description": "با بادمجان کبابی و سیر فراوان",
    "recipeSteps": [
      "با گوجه و سیر تفت دهید."
    ],
    "category": "local",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "بادمجان سرخ شده را با کشک بکوبید."
    ],
    "name": "کاشک bادمجان مجلسی",
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "کشک"
      }
    ],
    "category": "nani",
    "id": "rec-114",
    "description": "با گردو و نعناع داغ",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "fastfood",
    "recipeSteps": [
      "سیب زمینی را لای نان پیچیده و سرخ کنید."
    ],
    "id": "rec-115",
    "description": "میان وعده تند جنوبی",
    "ingredients": [
      {
        "amount": 5,
        "item": "نان لواش",
        "unit": "عدد"
      }
    ],
    "name": "سمبوسه سیب‌زمینی تند",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "rec-116",
    "name": "فلافل اهوازی",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "نخود خیس شده",
        "amount": 2
      }
    ],
    "recipeSteps": [
      "چرخ کنید و در روغن فراوان سرخ کنید."
    ],
    "category": "fastfood",
    "description": "نخود چرخ شده با ادویه تند",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "آش دندونی",
    "recipeSteps": [
      "همه حبوبات را با هم بپزید."
    ],
    "category": "ash",
    "id": "rec-117",
    "ingredients": [
      {
        "item": "انواع حبوبات",
        "amount": 2,
        "unit": "پیمانه"
      }
    ],
    "description": "آش سنتی برای دندان درآوردن نوزاد",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "شله مشهدی",
    "description": "آش غلیظ و کشدار گوشت",
    "ingredients": [
      {
        "amount": 400,
        "item": "گوشت گوسفندی",
        "unit": "گرم"
      }
    ],
    "id": "rec-118",
    "category": "ash",
    "recipeSteps": [
      "آنقدر هم بزنید تا گوشت له شود."
    ],
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "گوشت گردن",
        "unit": "گرم",
        "amount": 300
      }
    ],
    "category": "local",
    "recipeSteps": [
      "بکوبید تا کش بیاید."
    ],
    "description": "با گوشت گردن و بادمجان",
    "name": "حلیم bادمجان اصفهان",
    "id": "rec-119",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "item": "زبان گوساله",
        "unit": "عدد"
      }
    ],
    "description": "غذای مجلسی و شیک",
    "id": "rec-120",
    "recipeSteps": [
      "زبان را بپزید و با سس قارچ تفت دهید."
    ],
    "category": "nani",
    "name": "خوراک زبان با سس قارچ",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "local",
    "name": "قلیه ماهی bوشهری",
    "ingredients": [
      {
        "amount": 500,
        "item": "ماهی جنوب",
        "unit": "گرم"
      },
      {
        "amount": 300,
        "item": "سبزی قلیه",
        "unit": "گرم"
      }
    ],
    "recipeSteps": [
      "سبزی را سرخ کنید.",
      "ماهی را با تمر هندی بپزید."
    ],
    "id": "rec-131",
    "description": "خورش تند ماهی با تمبر هندی",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "id": "rec-132",
    "recipeSteps": [
      "طولانی بپزید تا له شود."
    ],
    "description": "آبگوشت اصیل در ظرف سنگی",
    "ingredients": [
      {
        "amount": 400,
        "item": "گوشت گوسفند",
        "unit": "گرم"
      }
    ],
    "category": "local",
    "name": "دیزی سنگی مشهدی",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "انواع حبوبات"
      }
    ],
    "recipeSteps": [
      "حبوبات را بپزید و لای برنج بدهید."
    ],
    "description": "پلو مخلوط با ۷ نوع حبوبات",
    "id": "rec-133",
    "name": "پلو اسفندی (آباده)",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "مانند کوفته تبریزی بپزید."
    ],
    "name": "کوفته هویج کرمانشاه",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 2,
        "item": "هویج"
      }
    ],
    "description": "کوفته ملس با هویج و رب انار",
    "category": "dolma",
    "id": "rec-134",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 300,
        "item": "میگو",
        "unit": "گرم"
      }
    ],
    "name": "خوراک میگو سوخاری",
    "recipeSteps": [
      "میگو را در پودر زده و سرخ کنید."
    ],
    "description": "میگو ترد با پودر سوخاری",
    "id": "rec-135",
    "category": "fastfood",
    "calories": 750,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "دمی ماهی با سبزی معطر",
    "category": "local",
    "name": "دمی لخ‌لخ bوشهری",
    "ingredients": [
      {
        "amount": 300,
        "item": "ماهی",
        "unit": "گرم"
      }
    ],
    "id": "rec-136",
    "recipeSteps": [
      "ماهی را لای برنج دم کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "recipeSteps": [
      "بنه را بکوبید و با پیازداغ بپزید."
    ],
    "category": "local",
    "name": "اشکنه bنه (ایلام)",
    "description": "غذای سنتی با دانه بنه کوهی",
    "id": "rec-137",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 100,
        "item": "بنه"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "polo",
    "name": "چلو گوشت سمنانی اصل",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت سردست",
        "amount": 500
      }
    ],
    "description": "گوشت پخته شده در دل برنج خام",
    "recipeSteps": [
      "گوشت را لای برنج دم کنید."
    ],
    "id": "rec-138",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "زردک را رنده کرده و سرخ کنید."
    ],
    "ingredients": [
      {
        "unit": "عدد",
        "item": "زردک",
        "amount": 2
      }
    ],
    "category": "kabab",
    "id": "rec-139",
    "name": "کباب زردک اصفهان",
    "description": "شامی ملس با هویج زردک",
    "calories": 450,
    "cookTime": 40,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "خورشت پاییزی با کنگر و گوشت",
    "category": "stew",
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "کنگر"
      }
    ],
    "name": "خورشت کنگر مشهدی",
    "recipeSteps": [
      "کنگر را سرخ کرده و بپزید."
    ],
    "id": "rec-140",
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "پلو با لپه، زرشک و رشته",
    "name": "مانی پلو دامغان",
    "category": "polo",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 100,
        "item": "رشته پلویی"
      }
    ],
    "id": "rec-141",
    "recipeSteps": [
      "مواد را با برنج مخلوط و دم کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "با گردو و پیازداغ تفت دهید."
    ],
    "name": "خوراک کله جوش کرمانی",
    "ingredients": [
      {
        "amount": 2,
        "item": "کشک محلی",
        "unit": "پیمانه"
      }
    ],
    "category": "local",
    "id": "rec-142",
    "description": "کله جوش با کشک و گردوی فراوان",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "polo",
    "ingredients": [
      {
        "item": "رب انار",
        "amount": 2,
        "unit": "قاشق"
      }
    ],
    "name": "قنبر پلو شیرازی",
    "description": "پلو با گوشت قلقلی و کشمش و شیره",
    "id": "rec-143",
    "recipeSteps": [
      "قلقلی و کشمش را لای برنج بدهید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "قلقلی‌ها را در سس آلبالو بپزید."
    ],
    "id": "rec-144",
    "name": "کوفته قلقلی با سس آلبالو",
    "category": "nani",
    "description": "گوشت قلقلی در سس آلبالوی ملس",
    "ingredients": [
      {
        "amount": 100,
        "item": "آلبالو",
        "unit": "گرم"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خوراک مرغ ترش مازندرانی",
    "description": "مرغ با رب انار و گردو (بدون برنج)",
    "category": "local",
    "recipeSteps": [
      "مرغ را در سس گردو و انار بپزید."
    ],
    "id": "rec-145",
    "ingredients": [
      {
        "unit": "قاشق",
        "item": "رب انار ترش",
        "amount": 3
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "آش ملس با آب انار و عدس",
    "id": "rec-146",
    "name": "آش انار یزدی",
    "category": "ash",
    "ingredients": [
      {
        "amount": 2,
        "item": "آب انار",
        "unit": "لیوان"
      }
    ],
    "recipeSteps": [
      "با حبوبات و سبزی بپزید."
    ],
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "stew",
    "recipeSteps": [
      "تره را سرخ کرده و با گوشت بپزید."
    ],
    "id": "rec-147",
    "description": "خورشت تره و گوشت (شبیه قورمه)",
    "name": "خورشت تره سنندجی",
    "ingredients": [
      {
        "item": "تره",
        "unit": "گرم",
        "amount": 500
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "خوراک لوبیا گرم مجلسی",
    "recipeSteps": [
      "با قارچ و پیازداغ بپزید."
    ],
    "category": "nani",
    "id": "rec-148",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "لوبیا چیتی",
        "amount": 1
      }
    ],
    "description": "لوبیا با قارچ و گلپر فراوان",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "عدس و برنج را دم کرده، قلقلی بزنید."
    ],
    "id": "rec-149",
    "description": "عدس پلو کلاسیک با گوشت قلقلی",
    "ingredients": [
      {
        "item": "عدس",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "name": "عدس پلو با کوفته ریزه",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "nani",
    "id": "rec-150",
    "name": "خوراک تاس کباب به",
    "ingredients": [
      {
        "item": "میوه به",
        "amount": 2,
        "unit": "عدد"
      }
    ],
    "description": "خوراک لایه ای گوشت و به و آلو",
    "recipeSteps": [
      "مواد را لایه لایه چیده و بپزید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "دلمه bرگ مو تبریزی",
    "category": "dolma",
    "recipeSteps": [
      "مواد را لای برگ بپیچید و با شیره بپزید."
    ],
    "ingredients": [
      {
        "item": "برگ مو",
        "unit": "عدد",
        "amount": 50
      }
    ],
    "id": "rec-181",
    "description": "دلمه کوچک و ملس با سبزی معطر",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "شامی با گوشت و آرد نخودچی",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "آرد نخودچی"
      }
    ],
    "name": "شامی کباب اصفهانی",
    "category": "kabab",
    "recipeSteps": [
      "گوشت و آرد را ورز دهید و سرخ کنید."
    ],
    "id": "rec-182",
    "calories": 450,
    "cookTime": 40,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "آش دوغ قزوینی",
    "ingredients": [
      {
        "item": "دوغ",
        "amount": 1,
        "unit": "لیتر"
      }
    ],
    "category": "ash",
    "id": "rec-183",
    "description": "آش سفید با حبوبات کامل",
    "recipeSteps": [
      "حبوبات را بپزید و دوغ را اضافه کنید."
    ],
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "name": "شامی ترشه گیلانی",
    "id": "rec-184",
    "recipeSteps": [
      "شامی‌ها را سرخ کرده و در سس بپزید."
    ],
    "description": "شامی در سس انار و آبغوره",
    "category": "kuku",
    "ingredients": [
      {
        "amount": 2,
        "item": "رب انار",
        "unit": "قاشق"
      }
    ],
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "فسنجان با آهن داغ برای رنگ سیاه",
    "id": "rec-185",
    "recipeSteps": [
      "گردو را طولانی بپزید تا کاملا سیاه شود."
    ],
    "category": "stew",
    "name": "خورش گردو (فسنجان سیاه)",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گردو",
        "amount": 300
      }
    ],
    "calories": 550,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "برگ سیر را تفت دهید و با لپه بپزید."
    ],
    "name": "سیر قلیه گیلانی",
    "description": "خورش با برگ سیر و مرغ",
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "برگ سیر"
      }
    ],
    "id": "rec-186",
    "category": "local",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 50,
        "item": "گردو",
        "unit": "گرم"
      }
    ],
    "name": "اشکنه اودوگ (یزد)",
    "description": "اشکنه سنتی یزدی",
    "category": "nani",
    "id": "rec-187",
    "recipeSteps": [
      "با پیازداغ و تخم مرغ بپزید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "local",
    "description": "کشدار و مقوی با برنج و گوشت",
    "name": "حلیم bادمجان اصفهان اصل",
    "ingredients": [
      {
        "amount": 0.5,
        "item": "برنج",
        "unit": "پیمانه"
      }
    ],
    "recipeSteps": [
      "مواد را بکوبید تا کاملا کش بیاید."
    ],
    "id": "rec-188",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "آرد برنج",
        "unit": "پیمانه",
        "amount": 1
      }
    ],
    "description": "حلوای نرم و زعفرانی",
    "category": "dessert",
    "recipeSteps": [
      "با شیر و زعفران بپزید."
    ],
    "id": "rec-189",
    "name": "ترحلوا شیرازی",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "ترکیب عجیب و لذیذ اصفهانی",
    "category": "dessert",
    "name": "گوشفیل با دوغ",
    "recipeSteps": [
      "گوشفیل را با دوغ غلیظ محلی میل کنید."
    ],
    "ingredients": [
      {
        "unit": "بشقاب",
        "amount": 1,
        "item": "گوشفیل"
      }
    ],
    "id": "rec-190",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "داخل خمیر را پر کرده و در فر بپزید."
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گردو",
        "amount": 100
      }
    ],
    "description": "کلوچه مغزدار شمالی",
    "id": "rec-191",
    "name": "کلوچه فومن خانگی",
    "category": "dessert",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "در قالب مخصوص و روغن داغ سرخ کنید."
    ],
    "category": "dessert",
    "ingredients": [
      {
        "item": "نشاسته",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "id": "rec-192",
    "description": "شیرینی ترد و نوستالژیک",
    "name": "نان پنجره‌ای",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "خرما"
      }
    ],
    "name": "رنگینک bوشهری",
    "category": "dessert",
    "description": "دسر خرما و آرد تفت داده شده",
    "recipeSteps": [
      "آرد را تفت دهید و روی خرما بریزید."
    ],
    "id": "rec-193",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 2,
        "item": "آرد برنج",
        "unit": "پیمانه"
      }
    ],
    "category": "dessert",
    "id": "rec-194",
    "name": "نان برنجی کرمانشاهی",
    "recipeSteps": [
      "خمیر را استراحت داده و در فر بپزید."
    ],
    "description": "شیرینی ترد با روغن کرمانشاهی",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "dessert",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "نشاسته"
      }
    ],
    "recipeSteps": [
      "طولانی هم بزنید تا شفاف شود."
    ],
    "name": "مسقطی لاری اصل",
    "id": "rec-195",
    "description": "مسقطی کشدار با لاری",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "پولکی کنجدی",
    "id": "rec-196",
    "category": "dessert",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "شکر",
        "amount": 1
      }
    ],
    "recipeSteps": [
      "شکر را ذوب کرده و کنجد بزنید."
    ],
    "description": "شیرینی نازک اصفهانی",
    "calories": 580,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "شیرینی ترد با خلال بادام",
    "id": "rec-197",
    "ingredients": [
      {
        "item": "عسل",
        "unit": "قاشق",
        "amount": 2
      }
    ],
    "name": "سوهان عسلی",
    "recipeSteps": [
      "با شکر و بادام بجوشانید و روی سینی بریزید."
    ],
    "category": "dessert",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "dessert",
    "description": "شیرینی ترد کنار چای",
    "ingredients": [
      {
        "item": "ماست",
        "unit": "پیمانه",
        "amount": 0.5
      }
    ],
    "id": "rec-198",
    "recipeSteps": [
      "خمیر را پهن کرده و در فر بپزید."
    ],
    "name": "نان چایی قزوین",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "id": "rec-199",
    "recipeSteps": [
      "مایه را با قاشق روی سینی بریزید."
    ],
    "description": "کلاسیک و لذیذ",
    "name": "شیرینی کشمشی خانگی",
    "category": "dessert",
    "ingredients": [
      {
        "amount": 0.5,
        "item": "کشمش",
        "unit": "پیمانه"
      }
    ],
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "rec-200",
    "recipeSteps": [
      "با سفیده تخم مرغ فرم دهید."
    ],
    "name": "گز آردی خانگی",
    "category": "dessert",
    "ingredients": [
      {
        "item": "گلوکز",
        "amount": 1,
        "unit": "پیمانه"
      }
    ],
    "description": "گز با پسته و آرد",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "rec-201",
    "category": "dessert",
    "ingredients": [
      {
        "amount": 100,
        "unit": "گرم",
        "item": "پودر بادام"
      }
    ],
    "recipeSteps": [
      "داخل خمیر را پر کرده و سرخ کنید."
    ],
    "name": "قطاب یزدی اصل",
    "description": "شیرینی مغزدار با پودر قند",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 2,
        "item": "پودر نارگیل",
        "unit": "پیمانه"
      }
    ],
    "recipeSteps": [
      "با شربت مخلوط کرده و برش بزنید."
    ],
    "description": "شیرینی بدون پخت نارگیلی",
    "name": "لوز نارگیل (یزد)",
    "category": "dessert",
    "id": "rec-202",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "rec-203",
    "recipeSteps": [
      "قلقلی‌های ریز را در سس قیمه بپزید."
    ],
    "category": "dolma",
    "ingredients": [
      {
        "item": "گوشت",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "description": "کوفته‌های بسیار ریز در سس",
    "name": "کوفته ریزه قیمه",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "ترکیب مقوی آش و سیرابی",
    "category": "ash",
    "name": "آش جو با سیرابی",
    "id": "rec-204",
    "recipeSteps": [
      "سیرابی پخته را به آش جو اضافه کنید."
    ],
    "ingredients": [
      {
        "amount": 1,
        "item": "جو",
        "unit": "پیمانه"
      }
    ],
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "شامی ترد با لپه فراوان",
    "id": "rec-205",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "لپه پخته"
      }
    ],
    "category": "kabab",
    "recipeSteps": [
      "لپه و گوشت را چرخ کرده و سرخ کنید."
    ],
    "name": "شامی لپه قزوینی",
    "calories": 450,
    "cookTime": 40,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "با گردو و شیره انگور بپزید."
    ],
    "name": "خوراک کدو حلوایی و گردو",
    "category": "nani",
    "ingredients": [
      {
        "amount": 300,
        "item": "کدو حلوایی",
        "unit": "گرم"
      }
    ],
    "id": "rec-206",
    "description": "خوراک شیرین و گرم",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 4,
        "item": "شلغم",
        "unit": "عدد"
      }
    ],
    "id": "rec-207",
    "category": "ash",
    "recipeSteps": [
      "با ماش و برنج و شلغم بپزید."
    ],
    "description": "مناسب سرماخوردگی",
    "name": "آش شلغم (درمانی)",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "rec-208",
    "name": "خوراک زبان با سس bشامل",
    "description": "نسخه فرانسوی خوراک زبان",
    "ingredients": [
      {
        "amount": 1,
        "unit": "لیوان",
        "item": "شیر"
      }
    ],
    "recipeSteps": [
      "زبان را بپزید و با سس سفید تفت دهید."
    ],
    "category": "nani",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "داخل خمیر را با بادمجان و پنیر پر کنید."
    ],
    "description": "فست فود گیاهی",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 2,
        "item": "بادمجان"
      }
    ],
    "category": "fastfood",
    "id": "rec-209",
    "name": "پیراشکی bادمجان و پنیر",
    "calories": 850,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "rec-210",
    "description": "با بادمجان‌های تپل و بنفش",
    "recipeSteps": [
      "داخل بادمجان را خالی و پر کنید."
    ],
    "ingredients": [
      {
        "amount": 3,
        "item": "بادمجان دلمه ای",
        "unit": "عدد"
      }
    ],
    "name": "دلمه bادمجان دلمه ای",
    "category": "dolma",
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "اسکندر کباب (ترکیه)",
    "hasRealData": true,
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت گوسفندی یا گوساله (برش‌های نازک دونری)",
        "amount": 500
      },
      {
        "amount": 4,
        "unit": "عدد",
        "item": "نان پیده"
      },
      {
        "amount": 2,
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "گوجه‌فرنگی له شده یا رنده شده"
      },
      {
        "unit": "گرم",
        "amount": 100,
        "item": "کره"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "ماست ساده"
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 2
      },
      {
        "item": "فلفل سبز",
        "unit": "عدد متوسط",
        "amount": 2
      },
      {
        "amount": 2,
        "unit": "عدد متوسط (برای تزئین)",
        "item": "گوجه‌فرنگی"
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل قرمز پرک (پول بیبر)",
        "amount": 1
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع"
      }
    ],
    "nationality": "tr",
    "id": "dish-1765504061082-rzjmu-1",
    "category": "international",
    "description": "اسکندر کباب اصیل ترکی",
    "recipeSteps": [
      "ابتدا گوشت را آماده کنید. اگر گوشت از قبل برش خورده نیست، آن را بسیار نازک برش دهید و در تابه با ۲ قاشق روغن مایع تفت دهید تا کاملا پخته و کمی برشته شود.",
      "سس گوجه‌فرنگی را آماده کنید: در یک قابلمه کوچک، ۲ قاشق کره را ذوب کنید، ۲ قاشق رب گوجه‌فرنگی را اضافه کرده و ۱ دقیقه تفت دهید.",
      "گوجه‌فرنگی‌های له شده یا رنده شده را اضافه کنید، ۱/۲ پیمانه آب، ۱/۲ قاشق چای‌خوری نمک و ۱/۴ قاشق چای‌خوری فلفل سیاه را اضافه کنید.",
      "سس را ۱۰ دقیقه روی حرارت ملایم بجوشانید تا کمی غلیظ شود.",
      "نان پیده یا لواش را به صورت مربع‌های کوچک (حدود ۲*۲ سانتی‌متر) برش دهید و در تابه بدون روغن یا در فر کمی تست کنید تا گرم و کمی ترد شود.",
      "در یک کاسه کوچک، ماست را با سیر له شده و کمی نمک مخلوط کنید.",
      "برای سرو، تکه‌های نان تست شده را در کف ۴ بشقاب قرار دهید.",
      "مقداری از سس گوجه‌فرنگی داغ را روی نان‌ها بریزید.",
      "گوشت پخته و داغ را روی سس و نان قرار دهید.",
      "۱/۴ پیمانه از ماست سیردار را در کنار گوشت روی هر بشقاب بگذارید.",
      "در یک تابه کوچک، ۸۰ گرم کره باقی‌مانده را ذوب کنید تا داغ شود (تا حدی که بوی عطر کره بلند شود اما نسوزد).",
      "کمی فلفل قرمز پرک را به کره داغ اضافه کنید (اختیاری).",
      "کره داغ را با احتیاط روی گوشت و سس در هر بشقاب بریزید.",
      "با برش‌های فلفل سبز تفت داده شده (با کمی روغن) و گوجه‌فرنگی گیلاسی یا برش‌های گوجه‌فرنگی تازه تزئین و بلافاصله سرو کنید."
    ],
    "calories": 520,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "hasRealData": true,
    "description": "لاهماجون، نان نازک و ترد با روکش گوشت",
    "recipeSteps": [
      "ابتدا خمیر را آماده کنید: در یک کاسه کوچک، شکر و مخمر را به آب ولرم اضافه کنید، هم بزنید و ۱۰ دقیقه بگذارید تا فعال شود.",
      "در یک کاسه بزرگ، آرد و نمک را مخلوط کنید. مخلوط مخمر فعال شده و روغن زیتون را به آرد اضافه کنید و ورز دهید تا خمیر نرم و یکدستی به دست آید.",
      "خمیر را در کاسه‌ای چرب شده قرار دهید، روی آن را بپوشانید و ۱ ساعت در جای گرم بگذارید تا حجم آن دو برابر شود.",
      "در این فاصله، مواد رویه را آماده کنید: در یک کاسه بزرگ، گوشت چرخ‌کرده، پیاز، فلفل‌ها، رب، گوجه‌فرنگی، سیر، جعفری و ادویه‌ها را با دست خوب مخلوط کنید.",
      "۲-۳ قاشق غذاخوری آب اضافه کنید تا مخلوط کمی نرم‌تر شود.",
      "فر را با بالاترین دما (۲۲۰-۲۵۰ درجه سانتی‌گراد) گرم کنید.",
      "خمیر ور آمده را به ۴-۶ چانه تقسیم کنید. هر چانه را بسیار نازک باز کنید.",
      "مخلوط گوشت را روی خمیر به طور یکنواخت و نازک پخش کنید.",
      "لاهماجون‌ها را روی سینی داغ در فر قرار دهید و ۸-۱۲ دقیقه بپزید تا ترد شوند.",
      "با لیمو تازه و جعفری سرو کنید."
    ],
    "name": "لاهماجون (پیتزا ترکی)",
    "id": "dish-1765504061082-wa88j-2",
    "category": "international",
    "nationality": "tr",
    "ingredients": [
      {
        "item": "آرد گندم",
        "unit": "گرم",
        "amount": 360
      },
      {
        "unit": "میلی‌لیتر",
        "item": "آب ولرم",
        "amount": 240
      },
      {
        "item": "خمیرمایه فوری",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "شکر",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 1,
        "item": "نمک",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 2,
        "item": "روغن زیتون",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "گرم",
        "amount": 250,
        "item": "گوشت چرخ‌کرده (گاو یا گوسفند با چربی متوسط)"
      },
      {
        "item": "پیاز",
        "unit": "عدد متوسط",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "فلفل سبز",
        "unit": "عدد متوسط"
      },
      {
        "item": "فلفل قرمز",
        "amount": 0.5,
        "unit": "عدد متوسط"
      },
      {
        "item": "رب گوجه‌فرنگی",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "گوجه‌فرنگی له شده",
        "amount": 0.5,
        "unit": "پیمانه (۱۲۰ گرم)"
      },
      {
        "amount": 2,
        "item": "سیر",
        "unit": "حبه"
      },
      {
        "item": "جعفری تازه",
        "amount": 0.25,
        "unit": "پیمانه"
      },
      {
        "unit": "به میزان لازم",
        "item": "ادویه‌جات (نمک، فلفل، زیره، پاپریکا)",
        "amount": 0
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل قرمز پرک (پول بیبر)",
        "amount": 0.5
      }
    ],
    "calories": 630,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "amount": 2,
        "item": "آرد گندم",
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "unit": "عدد بزرگ",
        "item": "تخم‌مرغ"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "آب"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "گوشت چرخ‌کرده"
      },
      {
        "amount": 1,
        "unit": "عدد کوچک",
        "item": "پیاز"
      },
      {
        "item": "ماست ساده",
        "unit": "پیمانه",
        "amount": 1.5
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 2
      },
      {
        "unit": "گرم",
        "amount": 60,
        "item": "کره"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی",
        "amount": 1
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نعناع خشک و پول بیبر"
      }
    ],
    "recipeSteps": [
      "خمیر را با مخلوط کردن آرد، تخم‌مرغ، آب و نمک آماده کنید و ورز دهید. ۳۰ دقیقه استراحت دهید.",
      "مواد میانی (گوشت، پیاز، ادویه) را مخلوط کنید.",
      "خمیر را بسیار نازک باز کنید و به مربع‌های ۲ سانتی‌متری برش دهید.",
      "کمی از مواد گوشتی را وسط هر مربع گذاشته و چهار گوشه را به هم بچسبانید.",
      "مانتی‌ها را در آب جوش و نمک ۸-۱۰ دقیقه بپزید و آبکش کنید.",
      "سس ماست (ماست و سیر) و سس کره (کره ذوب شده، رب، نعناع و فلفل) را آماده کنید.",
      "مانتی‌ها را با سس ماست و سپس سس کره سرو کنید."
    ],
    "category": "international",
    "hasRealData": true,
    "id": "dish-1765504061083-ilv33-3",
    "description": "مانتی، دامپلینگ‌های کوچک گوشتی با سس ماست",
    "name": "مانتی (بقچه گوشت ترکی)",
    "nationality": "tr",
    "calories": 520,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "nationality": "tr",
    "name": "منمن (املت ترکی)",
    "hasRealData": true,
    "recipeSteps": [
      "پیاز و فلفل سبز را خرد کرده و در روغن زیتون تفت دهید تا نرم شوند.",
      "گوجه‌فرنگی‌های خرد شده را اضافه کنید و بپزید تا آب آن کشیده و سس غلیظ شود.",
      "ادویه‌ها را اضافه کنید.",
      "تخم‌مرغ‌ها را روی مخلوط بشکنید. می‌توانید کمی هم بزنید یا بگذارید عسلی بماند.",
      "با نان تازه سرو کنید."
    ],
    "id": "dish-1765504061083-decli-4",
    "ingredients": [
      {
        "unit": "عدد متوسط",
        "item": "گوجه‌فرنگی",
        "amount": 4
      },
      {
        "item": "فلفل سبز",
        "amount": 2,
        "unit": "عدد متوسط"
      },
      {
        "item": "پیاز",
        "amount": 1,
        "unit": "عدد متوسط"
      },
      {
        "item": "تخم‌مرغ",
        "unit": "عدد",
        "amount": 6
      },
      {
        "item": "روغن زیتون",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک و فلفل سیاه"
      },
      {
        "item": "پول بیبر",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      }
    ],
    "description": "منمن، املت گوجه و فلفل محبوب صبحانه",
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "recipeSteps": [
      "لوبیاها را نیم‌پز کنید.",
      "پیاز را تفت دهید، گوشت را اضافه کرده و سرخ کنید.",
      "رب و پوره گوجه را اضافه کرده و تفت دهید.",
      "لوبیا و آب را اضافه کنید و اجازه دهید با حرارت ملایم جا بیفتد و لعاب بیندازد.",
      "با برنج ترکی (پیلاو) سرو کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه (خیس شده)",
        "item": "لوبیا سفید",
        "amount": 1.5
      },
      {
        "amount": 300,
        "unit": "گرم",
        "item": "گوشت خورشتی"
      },
      {
        "item": "پیاز",
        "unit": "عدد بزرگ",
        "amount": 1
      },
      {
        "item": "رب گوجه‌فرنگی",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "پیمانه",
        "item": "گوجه‌فرنگی پوره شده",
        "amount": 0.5
      },
      {
        "amount": 3,
        "item": "روغن",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "item": "فلفل سبز (اختیاری)",
        "unit": "عدد"
      }
    ],
    "category": "international",
    "nationality": "tr",
    "name": "کورو فاسولیه (خوراک لوبیا ترکی)",
    "description": "خوراک لوبیا سفید غلیظ و جاافتاده",
    "id": "dish-1765504061083-d6cm9-5",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 600,
        "item": "گوشت خورشتی",
        "unit": "گرم"
      },
      {
        "item": "پیاز، فلفل سبز، گوجه‌فرنگی",
        "amount": 2,
        "unit": "عدد از هر کدام"
      },
      {
        "amount": 4,
        "item": "سیر",
        "unit": "حبه"
      },
      {
        "item": "قارچ",
        "unit": "گرم",
        "amount": 200
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی"
      },
      {
        "item": "کره",
        "unit": "گرم",
        "amount": 50
      }
    ],
    "nationality": "tr",
    "category": "international",
    "hasRealData": true,
    "recipeSteps": [
      "تمام مواد را خرد کرده و با ادویه و رب مخلوط کنید.",
      "مواد را داخل کوزه سفالی بریزید و درب آن را با خمیر بپوشانید.",
      "در فر یا تنور به مدت ۲-۳ ساعت بپزید.",
      "هنگام سرو درب کوزه را بشکنید."
    ],
    "description": "کباب پخته شده در کوزه سفالی",
    "name": "تستی کباب (کباب کوزه‌ای)",
    "id": "dish-1765504061083-bzx57-6",
    "calories": 520,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "hasRealData": true,
    "name": "هونکار بگنتی (شاه پسند)",
    "description": "خوراک گوشت روی پوره بادمجان خامه‌ای",
    "recipeSteps": [
      "خوراک گوشت را با پیاز و رب گوجه تهیه کنید.",
      "بادمجان‌ها را کبابی کرده و ساطوری کنید.",
      "سس بشامل (کره، آرد، شیر) درست کنید و بادمجان و پنیر را به آن اضافه کنید.",
      "پوره بادمجان را در بشقاب ریخته و خوراک گوشت را روی آن بریزید."
    ],
    "nationality": "tr",
    "category": "international",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "گوشت خورشتی"
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "بادمجان"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "شیر"
      },
      {
        "item": "آرد",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "item": "پنیر پیتزا یا کاشار",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "item": "کره",
        "unit": "قاشق غذاخوری",
        "amount": 2
      }
    ],
    "id": "dish-1765504061083-lnghg-7",
    "calories": 620,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "nationality": "tr",
    "description": "پیده گوشت یا پنیر",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "خمیر نان (آرد، آب، مخمر)"
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "گوشت چرخ‌کرده"
      },
      {
        "item": "پیاز و فلفل دلمه‌ای",
        "unit": "عدد از هر کدام",
        "amount": 1
      },
      {
        "amount": 200,
        "item": "پنیر پیتزا",
        "unit": "گرم"
      },
      {
        "unit": "مقداری",
        "amount": 0,
        "item": "جعفری"
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "خمیر را آماده کرده و به شکل بیضی باز کنید.",
      "مواد گوشتی تفت داده شده یا پنیر را وسط خمیر بریزید.",
      "لبه‌های خمیر را به داخل برگردانید تا شکل قایق شود.",
      "در فر داغ بپزید تا طلایی شود."
    ],
    "id": "dish-1765504061084-r8t7h-8",
    "name": "پیده (پیتزا قایقی)",
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765504064913-src5s-1",
    "description": "خوراک سنتی در ظرف سفالی",
    "name": "اَتلی گووِچ (خوراک گوشت و سبزیجات)",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "گوشت خورشتی",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "unit": "عدد از هر کدام",
        "amount": 2,
        "item": "بادمجان، کدو، سیب‌زمینی"
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "لوبیا سبز"
      },
      {
        "amount": 0,
        "item": "سیر و پیاز",
        "unit": "به میزان لازم"
      }
    ],
    "category": "international",
    "nationality": "tr",
    "recipeSteps": [
      "گوشت را تفت دهید.",
      "سبزیجات را خرد کرده و لایه لایه با گوشت در ظرف سفالی (گووچ) بچینید.",
      "سس رب و آب را روی آن ریخته و در فر بپزید."
    ],
    "calories": 500,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده",
        "amount": 600
      },
      {
        "amount": 4,
        "item": "نان لواش",
        "unit": "عدد"
      },
      {
        "amount": 0,
        "unit": "مقداری",
        "item": "سیر و جعفری"
      },
      {
        "item": "سس گوجه‌فرنگی",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "item": "ماست چکیده",
        "amount": 0,
        "unit": "برای سرو"
      }
    ],
    "nationality": "tr",
    "category": "international",
    "name": "بِیتی کباب",
    "id": "dish-1765504064913-1shp1-2",
    "description": "کباب پیچیده شده در نان با سس گوجه",
    "recipeSteps": [
      "کباب کوبیده را با سیر و جعفری مزه‌دار کرده و به سیخ بکشید و کباب کنید.",
      "کباب‌ها را لای نان لواش بپیچید و برش بزنید.",
      "در ظرف چیده، روی آن سس گوجه و کره داغ بریزید و با ماست سرو کنید."
    ],
    "hasRealData": true,
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "name": "Hummus (حموس لبنانی)",
    "category": "international",
    "description": "دیپ لذیذ نخود و ارده",
    "recipeSteps": [
      "نخود را با ارده و سیر و آبلیمو میکس کنید.",
      "روغن زیتون فراوان بریزید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "نخود پخته",
        "amount": 2
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "ارده"
      }
    ],
    "id": "ar-1",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "Mansaf (منسف اردنی)",
    "description": "گوشت پخته شده در سس ماست خشک روی برنج",
    "recipeSteps": [
      "گوشت را با ماست بپزید.",
      "روی پلوی زعفرانی سرو کنید."
    ],
    "category": "international",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت گوسفند",
        "amount": 500
      },
      {
        "amount": 2,
        "item": "ماست",
        "unit": "لیوان"
      }
    ],
    "id": "ar-2",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "مرغ را با ادویه بپزید.",
      "برنج را در آب مرغ کته کنید."
    ],
    "id": "ar-3",
    "name": "Majboos (مجبوس خلیجی)",
    "category": "international",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "unit": "قاشق",
        "amount": 1,
        "item": "ادویه بهارات"
      }
    ],
    "description": "پلوی ادویه‌دار عربی با مرغ یا گوشت",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "بلغور را خمیر کنید.",
      "داخلش گوشت بگذارید و سرخ کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "بلغور گندم",
        "amount": 2
      },
      {
        "unit": "گرم",
        "amount": 200,
        "item": "گوشت چرخ‌کرده"
      }
    ],
    "category": "international",
    "name": "Kibbeh (کبه مقلی عراقی)",
    "description": "گلوله‌های بلغور پر شده با گوشت و گردو",
    "id": "ar-4",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "نخود خیس شده",
        "unit": "پیمانه",
        "amount": 2
      },
      {
        "amount": 50,
        "unit": "گرم",
        "item": "جعفری"
      }
    ],
    "recipeSteps": [
      "نخود و سیر و سبزی را چرخ کنید.",
      "قالب بزنید و در روغن فراوان سرخ کنید."
    ],
    "name": "Falafel (فلافل لبنانی اصل)",
    "category": "international",
    "description": "نخود چرخ شده با سبزیجات معطر",
    "id": "ar-5",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "همه را ریز خرد کرده و با روغن زیتون مخلوط کنید."
    ],
    "category": "international",
    "description": "سالاد معطر با جعفری فراوان و بلغور",
    "name": "Tabbouleh (سالاد تبوله لبنانی)",
    "id": "ar-6",
    "ingredients": [
      {
        "item": "جعفری ساطوری",
        "unit": "گرم",
        "amount": 300
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "بلغور خیس شده"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "دیپ بادمجان کبابی و ارده",
    "name": "Baba Ganoush (بابا غنوج)",
    "ingredients": [
      {
        "amount": 3,
        "item": "بادمجان کبابی",
        "unit": "عدد"
      },
      {
        "item": "ارده",
        "amount": 3,
        "unit": "قاشق"
      }
    ],
    "id": "ar-7",
    "category": "international",
    "recipeSteps": [
      "بادمجان را له کرده و با ارده و سیر مخلوط کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "مخلوط کنید و با دانه انار تزیین کنید."
    ],
    "ingredients": [
      {
        "unit": "لیوان",
        "amount": 1,
        "item": "ماست چکیده"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "بادمجان کبابی"
      }
    ],
    "id": "ar-8",
    "category": "international",
    "name": "Moutabal (متبل لبنانی)",
    "description": "نسخه خامه‌ای‌تر بابا غنوج با ماست",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "id": "ar-9",
    "ingredients": [
      {
        "amount": 400,
        "item": "سینه مرغ",
        "unit": "گرم"
      },
      {
        "unit": "لیوان",
        "item": "سس تاتار",
        "amount": 0.5
      }
    ],
    "name": "Shawarma (شاورما مرغ)",
    "recipeSteps": [
      "مرغ را نازک بریده و سرخ کنید.",
      "در نان پیتا با سس سیر بپیچید."
    ],
    "category": "international",
    "description": "مرغ مزه‌دار شده به سبک عربی",
    "calories": 350,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "نان را سرخ کنید.",
      "نخود و سس ماست و ارده را روی آن بریزید."
    ],
    "id": "ar-10",
    "category": "international",
    "ingredients": [
      {
        "item": "نان مدیترانه‌ای",
        "unit": "عدد",
        "amount": 2
      },
      {
        "unit": "لیوان",
        "amount": 1,
        "item": "نخود"
      }
    ],
    "description": "لایه‌های نان سوخاری، نخود و ماست",
    "name": "Fatteh (فته حمص)",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "category": "international",
    "recipeSteps": [
      "برای سس بولونزه، پیاز، هویج و کرفس را ریز خرد کنید",
      "در یک قابلمه بزرگ، ۲ قاشق غذاخوری روغن زیتون را گرم کرده و پیاز را تفت دهید تا نرم شود (حدود ۵ دقیقه)",
      "هویج و کرفس خرد شده را اضافه کرده و ۵-۷ دقیقه دیگر تفت دهید تا نرم شوند",
      "سیر رنده شده را اضافه کرده و ۱ دقیقه تفت دهید",
      "گوشت چرخ‌کرده را اضافه کرده و با حرارت متوسط تفت دهید تا قهوه‌ای شود و آب آن کشیده شود",
      "رب گوجه‌فرنگی را اضافه کرده و ۲ دقیقه دیگر تفت دهید تا رنگ آن باز شود",
      "پوره گوجه‌فرنگی، شیر (۲۵۰ میلی‌لیتر)، نمک، فلفل و آویشن را اضافه کنید",
      "حرارت را کم کرده و اجازه دهید سس به مدت حداقل ۱.۵ تا ۲ ساعت آرام بجوشد و غلیظ شود، هر از گاهی هم بزنید",
      "برای سس بشامل، در یک قابلمه کوچک، کره را ذوب کنید و آرد را اضافه کرده و حدود ۱-۲ دقیقه تفت دهید تا خامی آرد گرفته شود (رنگ آن تغییر نکند)",
      "شیر (۵۰۰ میلی‌لیتر) را کم کم و در حین هم زدن اضافه کنید تا گلوله نشود",
      "حرارت را متوسط کرده و مرتب هم بزنید تا سس غلیظ شود",
      "نمک و جوز هندی رنده شده را اضافه کنید و از روی حرارت بردارید",
      "فر را با دمای ۱۸۰ درجه سانتی‌گراد گرم کنید",
      "ورقه‌های لازانیا را طبق دستورالعمل روی بسته‌بندی در آب جوش و نمک دار نیم‌پز کنید و سپس آبکش کرده و با آب سرد آبکشی کنید تا به هم نچسبند",
      "در یک ظرف پیرکس مستطیلی، ابتدا یک لایه نازک سس بشامل بریزید",
      "یک لایه ورقه لازانیا بچینید",
      "روی لازانیا یک لایه سس بولونزه بریزید و سپس کمی سس بشامل و کمی پنیر پارمزان بپاشید",
      "این لایه‌بندی را تا جایی که مواد تمام شود تکرار کنید (معمولاً ۳-۴ لایه)",
      "لایه آخر را با لازانیا بپوشانید و روی آن مقدار زیادی سس بشامل و پنیر پارمزان رنده شده بریزید",
      "ظرف را به مدت ۳۰-۴۰ دقیقه در فر از قبل گرم شده قرار دهید تا پنیر طلایی و حباب‌دار شود",
      "قبل از سرو، ۱۰-۱۵ دقیقه اجازه دهید لازانیا استراحت کند تا برش‌های تمیزتری داشته باشید."
    ],
    "nationality": "it",
    "ingredients": [
      {
        "amount": 400,
        "item": "گوشت چرخ‌کرده گوسفند و گوساله (ترکیبی)",
        "unit": "گرم"
      },
      {
        "item": "پیاز متوسط",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "هویج متوسط"
      },
      {
        "item": "ساقه کرفس",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "سیر",
        "amount": 2,
        "unit": "حبه"
      },
      {
        "item": "گوجه‌فرنگی پوره شده",
        "unit": "گرم (۲ قوطی ۴۰۰ گرمی)",
        "amount": 800
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "رب گوجه‌فرنگی"
      },
      {
        "unit": "میلی‌لیتر",
        "item": "شیر پرچرب",
        "amount": 250
      },
      {
        "item": "روغن زیتون",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "پنیر پارمزان رنده شده",
        "unit": "گرم",
        "amount": 100
      },
      {
        "unit": "تا ۱۵ ورق",
        "item": "برگ لازانیا",
        "amount": 12
      },
      {
        "unit": "گرم",
        "item": "کره",
        "amount": 50
      },
      {
        "item": "آرد گندم",
        "amount": 50,
        "unit": "گرم"
      },
      {
        "unit": "میلی‌لیتر (برای سس بشامل)",
        "amount": 500,
        "item": "شیر"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "جوز هندی",
        "amount": 0.25
      },
      {
        "amount": 0,
        "item": "نمک",
        "unit": "به میزان لازم"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "فلفل سیاه"
      },
      {
        "item": "آویشن خشک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      }
    ],
    "description": "لازانیا آلا بولونزه",
    "id": "dish-1765505214189-ze0q1-1",
    "name": "لازانیا آلا بولونزه",
    "calories": 520,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "گوانچاله یا بیکن را به مکعب‌های کوچک یا نواری برش دهید",
      "در یک تایه نچسب، گوانچاله را بدون روغن (اگر گوانچاله است) یا با کمی روغن زیتون (اگر بیکن کم چرب است) با حرارت ملایم تا متوسط تفت دهید تا ترد و طلایی شود و چربی آن خارج شود (حدود ۸-۱۰ دقیقه)",
      "گوانچاله ترد شده را از تایه خارج کرده و چربی باقیمانده در تایه را نگه دارید",
      "در یک کاسه بزرگ، تخم‌مرغ‌های کامل و زرده تخم‌مرغ را با نصف پنیر رنده شده و مقدار زیادی فلفل سیاه تازه آسیاب شده با چنگال خوب هم بزنید تا یکدست شود",
      "اسپاگتی را طبق دستورالعمل روی بسته‌بندی در آب جوش و نمک‌دار بپزید تا آل دنته شود",
      "قبل از آبکش کردن اسپاگتی، حدود ۱ فنجان (۲۴۰ میلی‌لیتر) از آب پاستا را کنار بگذارید",
      "اسپاگتی آبکش شده را بلافاصله (داغ) به تایه حاوی چربی گوانچاله (حرارت خاموش) اضافه کنید",
      "سریعاً مخلوط تخم‌مرغ و پنیر را به اسپاگتی داغ اضافه کرده و به سرعت و مداوم هم بزنید تا سس یکدست و خامه‌ای شود و تخم‌مرغ نپزد (حرارت اسپاگتی باید کافی باشد)",
      "اگر سس خیلی غلیظ شد، کم کم از آب پاستای کنار گذاشته شده اضافه کنید تا به غلظت دلخواه برسد",
      "گوانچاله ترد شده را اضافه کرده و با اسپاگتی مخلوط کنید",
      "اسپاگتی کاربونارا را بلافاصله سرو کنید و روی هر پرس باقیمانده پنیر رنده شده و فلفل سیاه تازه آسیاب شده بپاشید."
    ],
    "name": "اسپاگتی کاربونارا",
    "category": "international",
    "nationality": "it",
    "id": "dish-1765505214189-73qdk-2",
    "ingredients": [
      {
        "item": "اسپاگتی",
        "amount": 350,
        "unit": "گرم"
      },
      {
        "unit": "عدد (۲ عدد کامل، ۱ عدد زرده تنها)",
        "amount": 3,
        "item": "تخم‌مرغ بزرگ"
      },
      {
        "item": "پنیر پکورینو رومانو (یا پارمزان)",
        "unit": "گرم رنده شده",
        "amount": 100
      },
      {
        "unit": "گرم (گوانچاله طعم بهتری می‌دهد)",
        "item": "گوانچاله یا بیکن",
        "amount": 150
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری (یا بیشتر)",
        "item": "فلفل سیاه تازه آسیاب شده"
      },
      {
        "unit": "به میزان لازم",
        "item": "نمک",
        "amount": 0
      },
      {
        "item": "روغن زیتون",
        "unit": "قاشق غذاخوری (اختیاری، اگر بیکن چربی کمی دارد)",
        "amount": 1
      }
    ],
    "description": "اسپاگتی کاربونارا",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "item": "برنج آربوریو (یا برنج مخصوص ریزوتو)",
        "amount": 300
      },
      {
        "item": "قارچ تازه (مانند کرمینی یا شیتاکه)",
        "unit": "گرم",
        "amount": 300
      },
      {
        "unit": "عدد",
        "item": "پیاز کوچک",
        "amount": 1
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 2
      },
      {
        "amount": 50,
        "unit": "گرم",
        "item": "کره بدون نمک"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "روغن زیتون"
      },
      {
        "item": "پنیر پارمزان رنده شده",
        "unit": "گرم",
        "amount": 100
      },
      {
        "unit": "تا ۱.۵ لیتر",
        "amount": 1.2,
        "item": "آب مرغ یا سبزیجات داغ"
      },
      {
        "item": "شراب سفید خشک",
        "amount": 100,
        "unit": "میلی‌لیتر (اختیاری)"
      },
      {
        "unit": "قاشق غذاخوری (برای تزیین)",
        "amount": 2,
        "item": "جعفری تازه خرد شده"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "به میزان لازم",
        "amount": 0
      }
    ],
    "category": "international",
    "id": "dish-1765505214189-d3gfn-3",
    "name": "ریزوتو قارچ",
    "description": "ریزوتو قارچ",
    "nationality": "it",
    "recipeSteps": [
      "آب مرغ یا سبزیجات را در یک قابلمه گرم کنید و آن را داغ نگه دارید (نباید بجوشد)",
      "قارچ‌ها را تمیز کرده و برش‌های نازک بزنید",
      "پیاز و سیر را بسیار ریز خرد کنید",
      "در یک قابلمه بزرگ و سنگین، ۱ قاشق غذاخوری روغن زیتون و نصف کره (۲۵ گرم) را روی حرارت متوسط گرم کنید",
      "قارچ‌ها را اضافه کرده و تفت دهید تا نرم شوند و آبشان کشیده شود و کمی طلایی شوند (حدود ۷-۱۰ دقیقه)، سپس آن‌ها را از قابلمه خارج کرده و کنار بگذارید",
      "۱ قاشق غذاخوری روغن زیتون و باقیمانده کره را به همان قابلمه اضافه کنید",
      "پیاز خرد شده را اضافه کرده و به مدت ۵-۷ دقیقه تفت دهید تا شفاف شود و نرم شود",
      "سیر خرد شده را اضافه کرده و ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود",
      "برنج آربوریو را اضافه کرده و به مدت ۱-۲ دقیقه تفت دهید تا دانه‌های برنج شفاف شوند و کناره‌هایشان کمی سرخ شود",
      "اگر از شراب سفید استفاده می‌کنید، آن را اضافه کرده و هم بزنید تا کاملاً جذب برنج شود و الکل آن تبخیر شود",
      "یک ملاقه از آب مرغ داغ را به برنج اضافه کنید و مرتب هم بزنید تا کاملاً جذب برنج شود",
      "این فرآیند را تکرار کنید: هر بار یک ملاقه آب مرغ اضافه کنید و هم بزنید تا جذب شود، سپس ملاقه بعدی را اضافه کنید",
      "این کار حدود ۱۸-۲۰ دقیقه طول می‌کشد تا برنج آل دنته شود (مغز پخت اما هنوز کمی ترد باشد)",
      "حدود ۵ دقیقه قبل از اتمام پخت برنج، قارچ‌های تفت داده شده را به قابلمه برگردانید",
      "وقتی برنج به غلظت و پخت دلخواه رسید، قابلمه را از روی حرارت بردارید",
      "پنیر پارمزان رنده شده و باقیمانده کره (۲۵ گرم) را اضافه کنید و خوب هم بزنید تا ریزوتو خامه‌ای شود",
      "نمک و فلفل سیاه را به میزان لازم اضافه کنید و بچشید",
      "ریزوتو را بلافاصله در بشقاب‌های گرم سرو کنید و با جعفری تازه خرد شده و کمی پنیر پارمزان اضافی تزیین کنید."
    ],
    "calories": 490,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "پیتزا مارگاریتا",
    "id": "dish-1765505214189-0dndf-4",
    "description": "پیتزا مارگاریتا",
    "recipeSteps": [
      "برای تهیه خمیر: در یک کاسه کوچک، آب گرم، شکر و مایه خمیر را مخلوط کنید و ۱۰ دقیقه بگذارید بماند تا مایه خمیر فعال شود و روی آن حباب ایجاد شود",
      "در یک کاسه بزرگ، آرد و نمک را مخلوط کنید",
      "مخلوط مایه خمیر فعال شده و روغن زیتون را به آرد اضافه کنید",
      "مواد را با دست یا میکسر با سری خمیرزن مخلوط کنید تا خمیر جمع شود",
      "خمیر را به مدت ۷-۱۰ دقیقه روی سطح آردپاشی شده ورز دهید تا نرم و کشسان شود",
      "خمیر را در یک کاسه چرب شده قرار دهید، روی آن را با سلفون یا پارچه بپوشانید و در جای گرم به مدت ۱-۱.۵ ساعت بگذارید تا حجم آن دو برابر شود",
      "بعد از ور آمدن، خمیر را به دو قسمت تقسیم کنید",
      "فر را به بالاترین دمای ممکن (حدود ۲۲۰-۲۵۰ درجه سانتی‌گراد) گرم کنید و سنگ پیتزا یا سینی فر را داخل آن قرار دهید تا داغ شود",
      "هر قسمت از خمیر را روی سطح آردپاشی شده به شکل دایره‌ای با قطر حدود ۲۵-۳۰ سانتی‌متر باز کنید",
      "خمیر باز شده را روی کاغذ روغنی یا سینی آردپاشی شده قرار دهید",
      "روی خمیر را با سس گوجه‌فرنگی بپوشانید (لبه‌ها را خالی بگذارید)",
      "پنیر موزارلای تازه را به تکه‌های کوچک تقسیم کرده و روی سس پخش کنید",
      "کمی نمک بپاشید",
      "پیتزا را با احتیاط روی سنگ پیتزای داغ یا سینی فر داخل فر قرار دهید",
      "پیتزا را به مدت ۸-۱۲ دقیقه (بسته به دمای فر شما) بپزید تا لبه‌های خمیر طلایی و پف‌دار شوند و پنیر آب شده و کمی حباب‌دار و طلایی شود",
      "پیتزا را از فر خارج کرده، بلافاصله برگ‌های ریحان تازه را روی آن بچینید و کمی روغن زیتون فوق بکر روی آن بپاشید",
      "پیتزا را برش بزنید و گرم سرو کنید."
    ],
    "category": "international",
    "ingredients": [
      {
        "amount": 0,
        "item": "برای خمیر پیتزا (برای دو پیتزای متوسط)",
        "unit": ""
      },
      {
        "item": "آرد نان (یا آرد سفید چند منظوره)",
        "unit": "گرم",
        "amount": 300
      },
      {
        "amount": 200,
        "item": "آب گرم",
        "unit": "میلی‌لیتر"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "شکر",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "مایه خمیر فوری",
        "amount": 7,
        "unit": "گرم (۱ بسته)"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن زیتون",
        "amount": 2
      },
      {
        "item": "برای رویه پیتزا (برای یک پیتزا)",
        "amount": 0,
        "unit": ""
      },
      {
        "unit": "گرم",
        "amount": 100,
        "item": "سس گوجه‌فرنگی ساده"
      },
      {
        "item": "پنیر موزارلا تازه",
        "amount": 125,
        "unit": "گرم"
      },
      {
        "item": "برگ ریحان تازه",
        "unit": "تا ۱۰ عدد",
        "amount": 8
      },
      {
        "item": "روغن زیتون فوق بکر",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "نمک"
      }
    ],
    "nationality": "it",
    "calories": 480,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "it",
    "name": "نیوکی با سس پستو",
    "description": "نیوکی با سس پستو",
    "category": "international",
    "id": "dish-1765505214189-9mzot-5",
    "recipeSteps": [
      "برای تهیه نیوکی: سیب‌زمینی‌ها را با پوست بشویید و در قابلمه‌ای با آب نمک‌دار بپزید تا کاملاً نرم شوند (حدود ۲۵-۳۵ دقیقه)",
      "سیب‌زمینی‌های پخته شده را بلافاصله پوست بگیرید (در حالی که هنوز داغ هستند) و از رنده ریز یا له کن سیب‌زمینی رد کنید تا پوره یکدستی بدست آید",
      "پوره سیب‌زمینی داغ را روی سطح تمیز و آردپاشی شده پخش کنید و اجازه دهید کمی خنک شود تا رطوبت اضافی آن تبخیر شود (حدود ۵ دقیقه)",
      "تخم‌مرغ و نمک را به پوره سیب‌زمینی اضافه کنید",
      "کم کم آرد را اضافه کرده و با نوک انگشتان یا کاردک به آرامی مخلوط کنید تا خمیر لطیفی بدست آید (ورز زیاد ندهید تا نیوکی سفت نشود)",
      "خمیر را به چند قسمت تقسیم کنید",
      "هر قسمت را روی سطح آردپاشی شده به شکل یک نوار بلند و باریک (با قطر حدود ۲ سانتی‌متر) رول کنید",
      "نوارهای خمیر را با چاقو به قطعات ۲ سانتی‌متری برش بزنید",
      "با استفاده از یک چنگال، روی هر قطعه نیوکی با فشار ملایم، شیارهایی ایجاد کنید (این کار به جذب بهتر سس کمک می‌کند)",
      "نیوکی‌های آماده را روی سینی آردپاشی شده قرار دهید تا به هم نچسبند",
      "برای تهیه سس پستو: تمام مواد سس پستو (ریحان، پنیر، دانه کاج، سیر، نمک و فلفل) را در غذاساز بریزید و کم کم روغن زیتون را اضافه کنید تا سس یکدست و غلیظی بدست آید",
      "اگر سس خیلی غلیظ بود، کمی روغن زیتون اضافی اضافه کنید",
      "در یک قابلمه بزرگ، آب را به جوش بیاورید و کمی نمک به آن اضافه کنید",
      "نیوکی‌ها را به آرامی در آب جوش بیندازید (در چند مرحله تا قابلمه شلوغ نشود)",
      "وقتی نیوکی‌ها روی سطح آب آمدند (حدود ۲-۳ دقیقه)، با کفگیر سوراخ‌دار آن‌ها را خارج کرده و به یک کاسه بزرگ منتقل کنید",
      "سس پستو را به نیوکی‌های پخته شده اضافه کرده و به آرامی مخلوط کنید تا تمام نیوکی‌ها به سس آغشته شوند",
      "نیوکی را بلافاصله سرو کنید و در صورت تمایل با کمی پنیر پارمزان اضافی و برگ ریحان تزیین کنید."
    ],
    "ingredients": [
      {
        "item": "برای نیوکی",
        "unit": "",
        "amount": 0
      },
      {
        "amount": 4,
        "unit": "عدد",
        "item": "سیب‌زمینی بزرگ (حدود ۱ کیلوگرم بعد از پوست کندن)"
      },
      {
        "unit": "تا ۲۰۰ گرم",
        "amount": 150,
        "item": "آرد سفید"
      },
      {
        "item": "تخم‌مرغ",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "نمک",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "برای سس پستو",
        "unit": "",
        "amount": 0
      },
      {
        "item": "ریحان تازه",
        "amount": 2,
        "unit": "پیمانه (حدود ۵۰-۷۰ گرم برگ)"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه (۵۰ گرم)",
        "item": "پنیر پارمزان رنده شده"
      },
      {
        "unit": "پیمانه (۳۰ گرم)",
        "item": "دانه کاج (پاین نات)",
        "amount": 0.25
      },
      {
        "item": "سیر",
        "amount": 2,
        "unit": "حبه"
      },
      {
        "item": "روغن زیتون فوق بکر",
        "amount": 0.5,
        "unit": "پیمانه (۱۲۰ میلی‌لیتر)"
      },
      {
        "amount": 0.5,
        "item": "نمک",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل سیاه",
        "amount": 0.25,
        "unit": "قاشق چای‌خوری"
      }
    ],
    "calories": 400,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "فتوچینی آلفردو",
    "nationality": "it",
    "ingredients": [
      {
        "amount": 400,
        "item": "فتوچینی",
        "unit": "گرم"
      },
      {
        "unit": "گرم",
        "amount": 100,
        "item": "کره"
      },
      {
        "unit": "میلی‌لیتر",
        "item": "خامه پرچرب",
        "amount": 250
      },
      {
        "unit": "گرم",
        "item": "پنیر پارمزان رنده شده",
        "amount": 100
      },
      {
        "unit": "حبه (ریز خرد شده)",
        "item": "سیر",
        "amount": 2
      },
      {
        "amount": 1,
        "item": "نمک",
        "unit": "قاشق چای‌خوری (به میزان لازم)"
      },
      {
        "unit": "قاشق چای‌خوری (به میزان لازم)",
        "amount": 0.5,
        "item": "فلفل سیاه تازه آسیاب شده"
      },
      {
        "unit": "قاشق غذاخوری (برای تزیین)",
        "amount": 2,
        "item": "جعفری تازه خرد شده"
      }
    ],
    "recipeSteps": [
      "فتوچینی را طبق دستور روی بسته در آب نمک جوش بپزید تا \"آل دنته\" شود (حدود ۸-۱۰ دقیقه)؛ سپس آبکش کنید و کمی از آب پاستا را نگه دارید.",
      "در یک تابه بزرگ روی حرارت متوسط، کره را ذوب کنید.",
      "سیر ریز خرد شده را به کره اضافه کرده و حدود ۱ دقیقه تفت دهید تا عطر آن بلند شود (مواظب باشید نسوزد).",
      "خامه پرچرب را اضافه کنید و به آرامی هم بزنید تا گرم شود (نباید بجوشد).",
      "پنیر پارمزان رنده شده، نمک و فلفل سیاه را اضافه کنید و هم بزنید تا پنیر ذوب شود و سس غلیظ شود.",
      "فتوچینی آبکش شده را به سس اضافه کنید و به آرامی هم بزنید تا پاستا کاملا به سس آغشته شود. اگر سس خیلی غلیظ بود، ۱-۲ قاشق غذاخوری از آب پاستای نگه داشته شده را اضافه کنید.",
      "بلافاصله سرو کنید و با جعفری تازه خرد شده تزیین نمایید."
    ],
    "name": "فتوچینی آلفردو",
    "id": "dish-1765505218182-3kh52-1",
    "category": "international",
    "calories": 520,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "it",
    "ingredients": [
      {
        "unit": "تکه (حدود ۲۰۰-۲۵۰ گرم هر تکه)",
        "item": "ساق گوساله با استخوان (با مغز استخوان)",
        "amount": 4
      },
      {
        "amount": 0.5,
        "item": "آرد همه کاره",
        "unit": "پیمانه"
      },
      {
        "item": "روغن زیتون",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "عدد (ریز خرد شده)",
        "item": "پیاز متوسط",
        "amount": 1
      },
      {
        "item": "هویج متوسط",
        "unit": "عدد (ریز خرد شده)",
        "amount": 1
      },
      {
        "item": "کرفس",
        "amount": 1,
        "unit": "ساقه (ریز خرد شده)"
      },
      {
        "amount": 3,
        "item": "سیر",
        "unit": "حبه (ریز خرد شده)"
      },
      {
        "unit": "پیمانه (در صورت تمایل، قابل حذف است)",
        "amount": 0.5,
        "item": "شراب سفید خشک"
      },
      {
        "item": "آب گوشت یا مرغ",
        "unit": "پیمانه",
        "amount": 4
      },
      {
        "item": "گوجه فرنگی خرد شده (کنسرو)",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "رزماری تازه",
        "unit": "شاخه"
      },
      {
        "unit": "عدد",
        "item": "برگ بو",
        "amount": 1
      },
      {
        "item": "پوست لیمو رنده شده",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 2,
        "item": "جعفری تازه خرد شده",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری (به میزان لازم)"
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری (به میزان لازم)"
      }
    ],
    "recipeSteps": [
      "ساق گوساله را با نمک و فلفل مزه‌دار کنید و سپس در آرد بغلتانید تا کاملا پوشانده شود و آرد اضافی را بتکانید.",
      "در یک قابلمه چدنی یا گود و سنگین روی حرارت متوسط رو به بالا، روغن زیتون را گرم کنید. تکه‌های گوشت را در آن سرخ کنید تا از همه طرف قهوه‌ای طلایی شوند (حدود ۳-۴ دقیقه برای هر طرف). گوشت‌ها را از قابلمه خارج کرده و کنار بگذارید.",
      "پیاز، هویج و کرفس خرد شده را به همان قابلمه اضافه کنید و به مدت ۸-۱۰ دقیقه تفت دهید تا نرم شوند.",
      "سیر را اضافه کنید و ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود.",
      "اگر از شراب سفید استفاده می‌کنید، آن را اضافه کرده و اجازه دهید ۲-۳ دقیقه بجوشد تا الکل آن تبخیر شود و ته قابلمه را با قاشق چوبی بتراشید.",
      "آب گوشت، گوجه فرنگی خرد شده، رزماری و برگ بو را اضافه کنید. هم بزنید و اجازه دهید به جوش آید.",
      "تکه‌های گوشت را به آرمانی به قابلمه برگردانید. حرارت را کم کنید، درب قابلمه را بگذارید و اجازه دهید برای ۲.۵ تا ۳ ساعت به آرمانی بجوشد تا گوشت کاملا نرم و از استخوان جدا شود.",
      "پس از پخت، شاخه رزماری و برگ بو را خارج کنید. طعم آن را بچشید و در صورت نیاز نمک و فلفل اضافه کنید.",
      "برای سرو، روی اوزوبوکو را با ترکیبی از پوست لیمو رنده شده و جعفری تازه خرد شده (گرمولاتا) تزیین کنید."
    ],
    "id": "dish-1765505218182-f22ry-2",
    "category": "international",
    "name": "اوزوبوکو (ساق گوساله ایتالیایی)",
    "description": "اوزوبوکو (ساق گوساله ایتالیایی)",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "it",
    "ingredients": [
      {
        "amount": 400,
        "unit": "گرم",
        "item": "پنه"
      },
      {
        "unit": "گرم (یا ۲ قوطی کنسرو گوجه فرنگی خرد شده)",
        "item": "گوجه فرنگی رسیده",
        "amount": 800
      },
      {
        "item": "سیر",
        "unit": "حبه (ریز خرد شده)",
        "amount": 4
      },
      {
        "item": "فلفل قرمز خشک (چیلی فلکس)",
        "unit": "تا ۱ قاشق چای‌خوری (به دلخواه)",
        "amount": 0.5
      },
      {
        "item": "روغن زیتون فرابکر",
        "unit": "قاشق غذاخوری",
        "amount": 4
      },
      {
        "item": "جعفری تازه خرد شده",
        "unit": "قاشق غذاخوری",
        "amount": 3
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری (به میزان لازم)"
      },
      {
        "unit": "قاشق چای‌خوری (به میزان لازم)",
        "item": "فلفل سیاه",
        "amount": 0.5
      }
    ],
    "category": "international",
    "id": "dish-1765505218182-t7r9q-3",
    "description": "پنه آلا آرابیاتا",
    "recipeSteps": [
      "پنه را در آب نمک جوش طبق دستور روی بسته بپزید تا \"آل دنته\" شود.",
      "در همین حین، سس آرابیاتا را آماده کنید: در یک تابه بزرگ، روغن زیتون را روی حرارت متوسط گرم کنید.",
      "سیر خرد شده و فلفل قرمز خشک را اضافه کنید و حدود ۱ دقیقه تفت دهید تا عطر آن بلند شود (مواظب باشید نسوزد).",
      "گوجه فرنگی‌های خرد شده (یا کنسرو) را به تابه اضافه کنید. نمک و فلفل سیاه را اضافه کرده و هم بزنید.",
      "اجازه دهید سس به مدت ۱۵-۲۰ دقیقه روی حرارت ملایم بجوشد تا کمی غلیظ شود.",
      "پنه آبکش شده را مستقیما به تابه سس اضافه کنید و خوب هم بزنید تا پاستا کاملا با سس پوشانده شود.",
      "پنه آرابیاتا را بلافاصله سرو کنید و روی آن را با جعفری تازه خرد شده تزیین نمایید."
    ],
    "name": "پنه آلا آرابیاتا",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "international",
    "recipeSteps": [
      "فر را با دمای ۲۰۰ درجه سانتی‌گراد (۴۰۰ درجه فارنهایت) گرم کنید. تکه‌های نان را روی سینی فر بچینید و به مدت ۵-۷ دقیقه در فر بگذارید تا طلایی و تست شوند. می‌توانید از گریل یا توستر نیز استفاده کنید.",
      "در یک کاسه، گوجه فرنگی‌های ریز خرد شده را با سیر ریز خرد شده، ریحان تازه خرد شده، ۳ قاشق غذاخوری روغن زیتون، سرکه بالزامیک (در صورت استفاده)، نمک و فلفل سیاه مخلوط کنید. خوب هم بزنید و اجازه دهید حداقل ۱۰-۱۵ دقیقه در دمای اتاق بماند تا طعم‌ها با هم ترکیب شوند.",
      "پس از تست شدن نان‌ها، در حالی که هنوز گرم هستند، ۱ حبه سیر باقی مانده را از وسط نصف کرده و سطح هر تکه نان را به آرمانی با آن بمالید تا عطر سیر به خورد نان برود.",
      "یک قاشق از مخلوط گوجه فرنگی را روی هر تکه نان تست شده قرار دهید.",
      "بلافاصله سرو کنید و روی هر بروسکتا کمی روغن زیتون فرابکر بریزید."
    ],
    "description": "بروسکتا آلا پومودورو",
    "name": "بروسکتا آلا پومودورو",
    "ingredients": [
      {
        "unit": "عدد (برش خورده به ۸-۱۰ تکه)",
        "amount": 1,
        "item": "نان باگت یا چاباتا"
      },
      {
        "unit": "عدد متوسط (ریز خرد شده)",
        "item": "گوجه فرنگی رسیده و سفت",
        "amount": 4
      },
      {
        "amount": 2,
        "unit": "حبه (۱ حبه برای مالیدن روی نان، ۱ حبه ریز خرد شده)",
        "item": "سیر"
      },
      {
        "amount": 10,
        "item": "ریحان تازه",
        "unit": "تا ۱۲ برگ (ریز خرد شده)"
      },
      {
        "item": "روغن زیتون فرابکر",
        "amount": 4,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "سرکه بالزامیک",
        "unit": "قاشق غذاخوری (اختیاری)",
        "amount": 1
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری (به میزان لازم)",
        "item": "نمک"
      },
      {
        "amount": 0.25,
        "unit": "قاشق چای‌خوری (به میزان لازم)",
        "item": "فلفل سیاه"
      }
    ],
    "nationality": "it",
    "id": "dish-1765505218182-f2tqt-4",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "it",
    "recipeSteps": [
      "در یک کاسه ضد حرارت، زرده‌های تخم مرغ و نیمی از شکر (۳۷.۵ گرم) را با همزن برقی بزنید تا روشن و کرمی شود.",
      "کاسه را روی یک قابلمه آب در حال جوش (روش بن ماری) قرار دهید، مراقب باشید ته کاسه با آب تماس نداشته باشد. به هم زدن ادامه دهید تا مخلوط داغ شود و کمی غلیظ شود (حدود ۵-۷ دقیقه). از روی حرارت بردارید و کنار بگذارید تا خنک شود.",
      "پنیر ماسکارپونه و عصاره وانیل را به مخلوط زرده خنک شده اضافه کرده و به آرمانی با لیسک مخلوط کنید تا یکدست شود.",
      "در یک کاسه تمیز دیگر، سفیده‌های تخم مرغ را با همزن برقی بزنید تا کف کند. سپس باقی مانده شکر (۳۷.۵ گرم) را به تدریج اضافه کرده و به هم زدن ادامه دهید تا سفیده سفت و براق شود و فرم بگیرد (مرنگ).",
      "مرنگ را به آرمانی و در چند مرحله به مخلوط ماسکارپونه اضافه کنید و به صورت دورانی فولد کنید تا پف آن نخوابد و کاملا ترکیب شود.",
      "در یک ظرف کم عمق، اسپرسو سرد شده را با لیکور قهوه یا روم (در صورت استفاده) مخلوط کنید.",
      "بیسکویت‌های لیدی فینگر را یکی یکی و به سرعت در مخلوط قهوه فرو کنید (نباید زیاد خیس شوند) و در کف ظرف پیرکس یا قالب دسر مورد نظر خود بچینید تا یک لایه را بپوشانند.",
      "نیمی از کرم ماسکارپونه را روی لایه بیسکویت‌ها بریزید و به آرمانی پخش کنید.",
      "یک لایه دیگر از بیسکویت‌های خیس شده در قهوه را روی کرم بچینید.",
      "بقیه کرم ماسکارپونه را روی لایه دوم بیسکویت‌ها بریزید و سطح آن را صاف کنید.",
      "ظرف دسر را حداقل ۴-۶ ساعت (ترجیحا یک شب) در یخچال قرار دهید تا تیرامیسو سفت شود و طعم‌ها به خورد هم بروند.",
      "قبل از سرو، روی تیرامیسو را با پودر کاکائو تلخ الک شده بپوشانید."
    ],
    "ingredients": [
      {
        "unit": "عدد (زرده و سفیده جدا شده)",
        "amount": 3,
        "item": "تخم مرغ بزرگ"
      },
      {
        "item": "شکر ریز",
        "amount": 75,
        "unit": "گرم"
      },
      {
        "unit": "گرم",
        "amount": 250,
        "item": "پنیر ماسکارپونه"
      },
      {
        "item": "عصاره وانیل",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 200,
        "item": "اسپرسو یا قهوه غلیظ سرد شده",
        "unit": "میلی‌لیتر"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "لیکور قهوه یا روم (اختیاری)"
      },
      {
        "item": "بیسکویت لیدی فینگر (سافویاردی)",
        "amount": 200,
        "unit": "گرم"
      },
      {
        "unit": "قاشق غذاخوری (برای تزیین)",
        "amount": 2,
        "item": "پودر کاکائو تلخ"
      }
    ],
    "name": "تیرامیسو",
    "category": "international",
    "id": "dish-1765505218182-rbwxw-5",
    "description": "تیرامیسو",
    "calories": 480,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "برنج را به مدت ۳۰ دقیقه در آب نمک خیس کنید و سپس آبکش نمایید",
      "مرغ را با ماست، زنجبیل، سیر، فلفل سبز، پودر گشنیز، پودر زیره، پودر فلفل قرمز، پودر زردچوبه، نمک و نصف مقدار نعناع و گشنیز خرد شده مخلوط کرده و حداقل ۱ ساعت در یخچال استراحت دهید (بهتر است ۴ ساعت یا شب تا صبح بماند)",
      "در یک قابلمه بزرگ، پیازهای خلالی را در روغن داغ سرخ کنید تا کاملا طلایی و ترد شوند (برشته)",
      "نیمی از پیاز داغ را برای تزئین کنار بگذارید",
      "مرغ مزه دار شده را به پیاز داغ باقی‌مانده در قابلمه اضافه کنید و به مدت ۵-۷ دقیقه تفت دهید تا رنگ مرغ تغییر کند",
      "در یک قابلمه دیگر، برنج خیس خورده را با آب زیاد و نمک به همراه هل، دارچین، میخک و برگ بو به مدت حدود ۵-۷ دقیقه بپزید تا نیم‌پز شود (دانه‌دار باشد و کاملا پخته نشود) و سپس آبکش کنید",
      "در قابلمه مرغ، ابتدا یک لایه از برنج نیم‌پز شده را روی مرغ بریزید",
      "سپس مابقی نعناع و گشنیز خرد شده و کمی زعفران دم کرده و نیمی از پیاز داغ برشته را اضافه کنید",
      "بقیه برنج را روی مواد بریزید و روی آن کره یا روغن حیوانی آب شده و بقیه زعفران دم کرده را بریزید",
      "درب قابلمه را با پارچه تمیز پوشانده و محکم ببندید",
      "قابلمه را ابتدا ۱۰ دقیقه روی شعله زیاد قرار دهید تا بخار کند، سپس شعله را کم کرده و به مدت ۳۰-۴۰ دقیقه اجازه دهید تا بریانی با حرارت ملایم دم بکشد",
      "پس از پخت، بریانی را به آرمانی مخلوط کرده و با بقیه پیاز داغ و برگ نعناع تازه تزئین کرده و سرو کنید"
    ],
    "name": "مرغ بریانی هندی",
    "nationality": "in",
    "hasRealData": true,
    "description": "مرغ بریانی هندی",
    "id": "dish-1765505603262-vw2m8-1",
    "category": "international",
    "ingredients": [
      {
        "item": "برنج باسماتی",
        "unit": "پیمانه (حدود ۶۰۰ گرم)",
        "amount": 3
      },
      {
        "amount": 500,
        "unit": "گرم (تکه شده)",
        "item": "مرغ"
      },
      {
        "item": "پیاز بزرگ",
        "unit": "عدد (نازک خلالی شده)",
        "amount": 2
      },
      {
        "item": "ماست پرچرب",
        "amount": 1,
        "unit": "پیمانه (۲۵۰ گرم)"
      },
      {
        "item": "زنجبیل رنده شده",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "item": "سیر له شده",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "فلفل سبز تند",
        "amount": 2,
        "unit": "عدد (ریز خرد شده)"
      },
      {
        "amount": 1,
        "item": "پودر گشنیز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "پودر زیره",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "پودر زردچوبه",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "گرم ماسالا",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "برگ نعناع تازه",
        "unit": "پیمانه (خرد شده)",
        "amount": 0.5
      },
      {
        "unit": "پیمانه (خرد شده)",
        "amount": 0.5,
        "item": "گشنیز تازه"
      },
      {
        "item": "روغن",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "کره یا روغن حیوانی (گی)",
        "amount": 2
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "زعفران دم کرده"
      },
      {
        "unit": "به میزان لازم",
        "item": "نمک",
        "amount": 0
      },
      {
        "amount": 4,
        "item": "هل سبز",
        "unit": "عدد"
      },
      {
        "item": "چوب دارچین",
        "unit": "تکه کوچک (۲ سانتی‌متر)",
        "amount": 1
      },
      {
        "item": "میخک",
        "amount": 4,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "برگ بو",
        "unit": "عدد"
      }
    ],
    "calories": 520,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "ingredients": [
      {
        "item": "مرغ بدون استخوان و پوست",
        "unit": "گرم (تکه های مکعبی ۲-۳ سانتی‌متری)",
        "amount": 600
      },
      {
        "item": "ماست غلیظ",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "زنجبیل رنده شده",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "سیر له شده",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "پودر زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 0.5,
        "item": "گرم ماسالا",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "نمک",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "آبلیمو",
        "amount": 1
      },
      {
        "item": "کره",
        "amount": 4,
        "unit": "قاشق غذاخوری (۶۰ گرم)"
      },
      {
        "unit": "عدد (ریز خرد شده)",
        "item": "پیاز متوسط",
        "amount": 1
      },
      {
        "item": "گوجه فرنگی متوسط",
        "amount": 4,
        "unit": "عدد (پوره شده)"
      },
      {
        "amount": 1,
        "item": "رب گوجه فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0.5,
        "item": "پودر زیره",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "پودر گشنیز",
        "amount": 0.5
      },
      {
        "item": "شکر یا عسل",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "خامه",
        "unit": "پیمانه (۱۲۵ میلی‌لیتر)",
        "amount": 0.5
      },
      {
        "item": "برگ شنبلیله خشک (کاسوری میتی)",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "روغن مایع",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      }
    ],
    "category": "international",
    "id": "dish-1765505603262-93w0c-2",
    "hasRealData": true,
    "recipeSteps": [
      "تکه های مرغ را با ماست، زنجبیل، سیر، پودر فلفل قرمز، پودر زردچوبه، گرم ماسالا، نمک و آبلیمو مخلوط کرده و حداقل ۳۰ دقیقه (یا بهتر است ۲ ساعت) در یخچال مزه دار کنید",
      "در یک تابه بزرگ، ۲ قاشق غذاخوری روغن را گرم کرده و تکه های مرغ مزه دار شده را اضافه کنید و به مدت ۱۰-۱۲ دقیقه تفت دهید تا مرغ از همه طرف قهوه‌ای شود و تقریبا بپزد",
      "مرغ های تفت داده شده را از تابه خارج کرده و کنار بگذارید",
      "در همان تابه، ۲ قاشق غذاخوری کره را اضافه کنید و پیاز خرد شده را به مدت ۵-۷ دقیقه تفت دهید تا نرم و شفاف شود",
      "پوره گوجه فرنگی و رب گوجه فرنگی را اضافه کنید و به مدت ۱۰ دقیقه روی حرارت متوسط تفت دهید تا آب گوجه فرنگی کشیده شود و روغن جدا شود",
      "پودر زیره، پودر گشنیز و بقیه پودر فلفل قرمز را اضافه کرده و ۱ دقیقه دیگر تفت دهید",
      "نمک، شکر (یا عسل) و برگ شنبلیله خشک را اضافه کنید",
      "مرغ های تفت داده شده را به سس اضافه کنید و خوب مخلوط نمایید",
      "درب تابه را بگذارید و اجازه دهید به مدت ۱۵-۲۰ دقیقه روی حرارت ملایم بپزد تا مرغ کاملا نرم شود و طعم ها به خورد هم بروند",
      "در ۵ دقیقه آخر پخت، خامه را اضافه کرده و به آرمانی مخلوط کنید (اجازه ندهید خورش بجوشد)",
      "خورش مرغ کره‌ای را با برنج باسماتی یا نان تازه سرو کنید"
    ],
    "nationality": "in",
    "description": "خورش مرغ کره‌ای (Murgh Makhani)",
    "name": "خورش مرغ کره‌ای (Murgh Makhani)",
    "calories": 600,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "id": "dish-1765505603262-9mtbj-3",
    "category": "international",
    "name": "خورش تیکای مرغ ماسالا",
    "hasRealData": true,
    "description": "خورش تیکای مرغ ماسالا",
    "recipeSteps": [
      "آماده کردن تیکای مرغ: تکه های مرغ را با ماست، زنجبیل (۱ قاشق غذاخوری)، سیر (۱ قاشق غذاخوری)، پودر فلفل قرمز (۱ قاشق چای‌خوری)، پودر زیره (۱/۲ قاشق چای‌خوری)، پودر گشنیز (۱/2 قاشق چای‌خوری)، گرم ماسالا (۱ قاشق چای‌خوری)، پودر زردچوبه، نمک و آبلیمو مخلوط کرده و حداقل ۱ ساعت (یا بهتر است ۴ ساعت) در یخچال مزه دار کنید",
      "مرغ های مزه دار شده را روی سیخ چوبی یا فلزی قرار دهید و در فر از قبل گرم شده با دمای ۲۰۰ درجه سانتی‌گراد (یا گریل) به مدت ۱۵-۲۰ دقیقه بپزید تا طلایی شوند و بپزند. (می‌توانید در تابه با ۲ قاشق غذاخوری روغن هم تفت دهید)",
      "آماده کردن سس ماسالا: در یک قابلمه یا تابه عمیق، کره و روغن را گرم کرده و پیاز خرد شده را به مدت ۵-۷ دقیقه تفت دهید تا نرم و شفاف شود",
      "زنجبیل (۱ قاشق چای‌خوری) و سیر (۱ قاشق چای‌خوری) را اضافه کرده و ۱ دقیقه دیگر تفت دهید تا عطر آن‌ها بلند شود",
      "پوره گوجه فرنگی و رب گوجه فرنگی را اضافه کنید و به مدت ۱۰-۱۵ دقیقه تفت دهید تا آب گوجه فرنگی کشیده شود و روغن جدا شود",
      "پودر فلفل قرمز، پودر زیره، پودر گشنیز و گرم ماسالا (۱ قاشق چای‌خوری) را اضافه کرده و ۱-۲ دقیقه تفت دهید",
      "آب، نمک و شکر را اضافه کنید و اجازه دهید سس به مدت ۵ دقیقه بجوشد",
      "ترکیب خورش: تیکای مرغ پخته شده را به سس اضافه کنید و خوب مخلوط نمایید",
      "درب قابلمه را گذاشته و به مدت ۱۰-۱۵ دقیقه روی حرارت ملایم بپزید تا طعم ها به خورد هم بروند",
      "در ۵ دقیقه آخر پخت، خامه و برگ شنبلیله خشک را اضافه کرده و به آرمانی هم بزنید",
      "خورش تیکای مرغ ماسالا را با برنج باسماتی یا نان سرو کنید و با کمی گشنیز تازه تزئین نمایید"
    ],
    "ingredients": [
      {
        "amount": 600,
        "item": "سینه مرغ بدون استخوان و پوست",
        "unit": "گرم (مکعبی خرد شده)"
      },
      {
        "amount": 0.5,
        "item": "ماست چکیده",
        "unit": "پیمانه"
      },
      {
        "item": "زنجبیل رنده شده",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "item": "سیر له شده",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "item": "پودر زیره",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "پودر گشنیز",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "گرم ماسالا",
        "amount": 1
      },
      {
        "amount": 0.5,
        "item": "پودر زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "نمک"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "آبلیمو"
      },
      {
        "amount": 2,
        "item": "روغن",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "کره",
        "amount": 2
      },
      {
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "item": "پیاز متوسط",
        "unit": "عدد (ریز خرد شده)",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "زنجبیل رنده شده (برای سس)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "سیر له شده (برای سس)",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "گوجه فرنگی متوسط",
        "amount": 4,
        "unit": "عدد (پوره شده)"
      },
      {
        "amount": 1,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه فرنگی"
      },
      {
        "item": "پودر فلفل قرمز (برای سس)",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "item": "پودر زیره (برای سس)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "item": "پودر گشنیز (برای سس)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "گرم ماسالا (برای سس)",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "خامه",
        "unit": "پیمانه (۱۲۵ میلی‌لیتر)",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "برگ شنبلیله خشک (کاسوری میتی)",
        "amount": 1
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک (برای سس)"
      },
      {
        "amount": 0.5,
        "item": "شکر",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "آب",
        "amount": 0.5,
        "unit": "پیمانه (یا بیشتر در صورت نیاز)"
      }
    ],
    "nationality": "in",
    "calories": 550,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "category": "international",
    "nationality": "in",
    "name": "خورش اسفناج و پنیر هندی (Palak Paneer)",
    "id": "dish-1765505603262-il13u-4",
    "ingredients": [
      {
        "item": "پنیر هندی (پانیر) یا پنیر فتا سفت",
        "amount": 250,
        "unit": "گرم (مکعبی خرد شده)"
      },
      {
        "amount": 500,
        "unit": "گرم",
        "item": "اسفناج تازه"
      },
      {
        "item": "پیاز متوسط",
        "unit": "عدد (ریز خرد شده)",
        "amount": 1
      },
      {
        "unit": "عدد (ریز خرد شده)",
        "amount": 1,
        "item": "گوجه فرنگی متوسط"
      },
      {
        "amount": 1,
        "item": "زنجبیل رنده شده",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "سیر له شده"
      },
      {
        "unit": "عدد (ریز خرد شده، اختیاری)",
        "item": "فلفل سبز تند",
        "amount": 1
      },
      {
        "item": "پودر زیره",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "پودر گشنیز"
      },
      {
        "item": "پودر زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "گرم ماسالا"
      },
      {
        "unit": "پیمانه (۶۰ میلی‌لیتر، اختیاری)",
        "item": "خامه",
        "amount": 0.25
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع",
        "amount": 3
      },
      {
        "unit": "به میزان لازم",
        "item": "نمک",
        "amount": 0
      }
    ],
    "recipeSteps": [
      "اسفناج را تمیز شسته و برگ‌ها را جدا کنید",
      "در یک قابلمه آب در حال جوش، اسفناج‌ها را به مدت ۲-۳ دقیقه بلانچ کنید تا نرم شوند",
      "بلافاصله اسفناج‌ها را به آب یخ منتقل کنید تا رنگ سبزشان حفظ شود",
      "اسفناج‌های بلانچ شده را آبکش کرده و فشار دهید تا آب اضافی آن‌ها خارج شود، سپس در غذاساز یا با گوشتکوب برقی پوره کنید",
      "در یک تابه، ۲ قاشق غذاخوری روغن را گرم کرده و تکه های پنیر را به مدت ۲-۳ دقیقه از هر طرف سرخ کنید تا کمی طلایی شوند، سپس خارج کرده و کنار بگذارید",
      "در همان تابه، ۱ قاشق غذاخوری روغن باقی‌مانده را گرم کرده و پیاز خرد شده را به مدت ۵-۷ دقیقه تفت دهید تا نرم و شفاف شود",
      "زنجبیل، سیر و فلفل سبز (در صورت استفاده) را اضافه کرده و ۱ دقیقه دیگر تفت دهید تا عطرشان بلند شود",
      "گوجه فرنگی خرد شده را اضافه کرده و به مدت ۵ دقیقه تفت دهید تا نرم شود",
      "پودر زیره، پودر گشنیز و پودر زردچوبه را اضافه کرده و ۱ دقیقه دیگر تفت دهید",
      "پوره اسفناج را به تابه اضافه کنید و خوب مخلوط نمایید",
      "نمک و گرم ماسالا را اضافه کرده و اجازه دهید سس به مدت ۵-۷ دقیقه روی حرارت ملایم بجوشد تا طعم ها به خورد هم بروند",
      "تکه های پنیر سرخ شده را به خورش اضافه کنید و به آرمانی مخلوط کنید",
      "در صورت تمایل، خامه را اضافه کرده و هم بزنید و بلافاصله از روی حرارت بردارید (اجازه ندهید خورش با خامه زیاد بجوشد)",
      "خورش اسفناج و پنیر را با نان یا برنج سرو کنید"
    ],
    "description": "خورش اسفناج و پنیر هندی (Palak Paneer)",
    "hasRealData": true,
    "calories": 520,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "نخودهای خیس خورده را آبکش کرده و با آب تازه در زودپز یا قابلمه معمولی بپزید تا کاملا نرم شوند (در زودپز حدود ۱۵-۲۰ دقیقه، در قابلمه معمولی حدود ۱-۱.۵ ساعت)",
      "اگر از چای کیسه‌ای استفاده می‌کنید، آن را همراه با نخودها بپزید و پس از پخت خارج کنید (این کار به نخودها رنگ تیره‌تری می‌دهد)",
      "در یک تابه بزرگ، روغن را گرم کرده و پیاز خرد شده را به مدت ۷-۱۰ دقیقه تفت دهید تا طلایی و نرم شود",
      "زنجبیل، سیر و فلفل سبز (در صورت استفاده) را اضافه کرده و ۱-۲ دقیقه دیگر تفت دهید تا عطرشان بلند شود",
      "پوره گوجه فرنگی را اضافه کنید و به مدت ۱۵ دقیقه روی حرارت متوسط تفت دهید تا آب گوجه فرنگی کشیده شود و روغن از سس جدا شود",
      "پودر زیره، پودر گشنیز، پودر فلفل قرمز و پودر زردچوبه را اضافه کرده و ۱-۲ دقیقه دیگر تفت دهید تا عطر ادویه‌ها بلند شود",
      "نخودهای پخته شده را به همراه ۱ پیمانه از آب پختشان به سس اضافه کنید",
      "نمک، پودر آمچور و گرم ماسالا را اضافه کرده و خوب مخلوط نمایید",
      "درب تابه را بگذارید و به مدت ۱۵-۲۰ دقیقه روی حرارت ملایم بجوشانید تا طعم ها به خورد هم بروند و سس غلیظ شود",
      "در صورت لزوم می‌توانید کمی از نخودها را با پشت قاشق له کنید تا سس غلیظ‌تر شود",
      "خورش نخود را با نان (مانند نان بَتوره یا نان لواش) یا برنج سرو کنید و با گشنیز تازه خرد شده تزئین نمایید"
    ],
    "category": "international",
    "hasRealData": true,
    "name": "خورش نخود هندی (Chole Masala)",
    "description": "خورش نخود هندی (Chole Masala)",
    "nationality": "in",
    "ingredients": [
      {
        "amount": 250,
        "unit": "گرم (حدود ۱.۵ پیمانه، از شب قبل خیس شده)",
        "item": "نخود خشک"
      },
      {
        "unit": "عدد (ریز خرد شده)",
        "item": "پیاز متوسط",
        "amount": 2
      },
      {
        "unit": "عدد (پوره شده)",
        "amount": 3,
        "item": "گوجه فرنگی متوسط"
      },
      {
        "item": "زنجبیل رنده شده",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "سیر له شده",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "فلفل سبز تند",
        "unit": "تا ۲ عدد (ریز خرد شده، اختیاری)"
      },
      {
        "amount": 3,
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "پودر زیره",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "item": "پودر گشنیز",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "item": "پودر زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "پودر آمچور (انبه خشک)"
      },
      {
        "amount": 1,
        "item": "پودر گرم ماسالا",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "عدد (اختیاری، برای رنگ)",
        "amount": 1,
        "item": "چای کیسه‌ای"
      },
      {
        "amount": 0,
        "item": "نمک",
        "unit": "به میزان لازم"
      },
      {
        "unit": "پیمانه (خرد شده، برای تزئین)",
        "item": "گشنیز تازه",
        "amount": 0.25
      }
    ],
    "id": "dish-1765505603262-kcd76-5",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1765505606705-p8ckt-1",
    "description": "روگن جوش",
    "nationality": "in",
    "hasRealData": true,
    "category": "international",
    "ingredients": [
      {
        "item": "گوشت گوسفندی (ترجیحاً ران یا گردن)",
        "amount": 750,
        "unit": "گرم (برای ۴ نفر)"
      },
      {
        "unit": "عدد",
        "item": "پیاز بزرگ",
        "amount": 2
      },
      {
        "unit": "پیمانه",
        "item": "ماست پرچرب",
        "amount": 0.5
      },
      {
        "amount": 1,
        "unit": "قاشق غذاخوری",
        "item": "زنجبیل رنده شده"
      },
      {
        "amount": 1,
        "item": "سیر له شده",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "پودر فلفل کشمیری (یا فلفل قرمز ملایم)",
        "amount": 2,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "پودر گشنیز",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "amount": 0.5,
        "item": "پودر زیره سبز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 0.5
      },
      {
        "amount": 1,
        "item": "گرم ماسالا",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "دانه هل سبز",
        "amount": 4,
        "unit": "عدد"
      },
      {
        "item": "چوب دارچین",
        "amount": 1,
        "unit": "تکه کوچک (حدود ۲ سانتی‌متر)"
      },
      {
        "amount": 4,
        "unit": "عدد",
        "item": "میخک"
      },
      {
        "item": "پودر رازیانه",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "روغن نباتی یا حیوانی (گی)",
        "unit": "قاشق غذاخوری",
        "amount": 3
      },
      {
        "item": "نمک",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "تا ۱.۵ پیمانه",
        "amount": 1,
        "item": "آب داغ"
      },
      {
        "amount": 0,
        "item": "گشنیز تازه خرد شده",
        "unit": "برای تزیین"
      }
    ],
    "recipeSteps": [
      "گوشت را به قطعات متوسط خرد کنید و آب آن را بگیرید.",
      "در یک کاسه بزرگ، ماست، زنجبیل، سیر، پودر فلفل کشمیری (یا فلفل قرمز)، پودر گشنیز، پودر زیره، زردچوبه و نمک را مخلوط کنید. گوشت را به این مخلوط اضافه کرده و خوب هم بزنید تا تمام تکه‌های گوشت آغشته شوند. حداقل ۳۰ دقیقه یا ترجیحاً ۲ تا ۴ ساعت در یخچال مزه دار کنید.",
      "پیازها را نگینی خرد کنید.",
      "در یک قابلمه سنگین یا زودپز، روغن را روی حرارت متوسط گرم کنید. پیازهای خرد شده را اضافه کرده و حدود ۸ تا ۱۰ دقیقه تفت دهید تا طلایی و نرم شوند.",
      "هل، دارچین و میخک را اضافه کرده و ۱ دقیقه دیگر تفت دهید تا عطر آن‌ها خارج شود.",
      "گوشت مزه دار شده را به قابلمه اضافه کنید و به مدت ۷ تا ۱۰ دقیقه روی حرارت بالا تفت دهید تا رنگ گوشت تغییر کند و آب آن کشیده شود.",
      "گرم ماسالا و پودر رازیانه را اضافه کرده و ۱ دقیقه دیگر تفت دهید.",
      "آب داغ را به قابلمه اضافه کنید. اگر در زودپز می‌پزید، درب آن را ببندید و به مدت ۲۰ تا ۲۵ دقیقه (بعد از به صدا درآمدن سوپاپ) بپزید تا گوشت نرم شود. اگر در قابلمه معمولی می‌پزید، حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید حدود ۶۰ تا ۹۰ دقیقه بجوشد تا گوشت کاملا نرم و پخته شود و سس غلیظ شود. هر از گاهی هم بزنید تا ته نگیرد و در صورت نیاز کمی آب اضافه کنید.",
      "پس از پخت، چوب دارچین، هل و میخک را خارج کنید. خورشت را بچشید و در صورت نیاز نمک اضافه کنید.",
      "روگن جوش را با گشنیز تازه خرد شده تزیین کرده و با برنج سفید یا نان سرو کنید."
    ],
    "name": "روگن جوش",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "دال تور را خوب بشویید و حداقل ۳۰ دقیقه در آب خیس کنید.",
      "دال خیس شده را آبکش کنید و همراه با ۳ پیمانه آب، پیاز خرد شده، گوجه فرنگی خرد شده، سیر و زنجبیل له شده، فلفل سبز خرد شده (اگر استفاده می‌کنید)، زردچوبه و نمک در یک قابلمه یا زودپز بریزید.",
      "اگر از زودپز استفاده می‌کنید، درب آن را ببندید و به مدت ۱۵ دقیقه (بعد از به صدا درآمدن سوپاپ) بپزید. اگر از قابلمه معمولی استفاده می‌کنید، روی حرارت ملایم به مدت ۴۵ تا ۶۰ دقیقه بپزید تا دال کاملاً نرم شود و به حالت پوره درآید. در حین پخت، اگر لازم بود، کمی آب اضافه کنید.",
      "پس از پخت دال، آن را با گوشت‌کوب یا پشت قاشق له کنید تا یکدست شود. غلظت آن باید مانند حلیم یا سوپ غلیظ باشد. اگر خیلی غلیظ است، کمی آب جوش اضافه کنید.",
      "برای آماده کردن تادکا (مایه تفت داده شده): در یک تابه کوچک، روغن یا گی را روی حرارت متوسط گرم کنید. دانه خردل را اضافه کنید و صبر کنید تا شروع به ترکیدن کند.",
      "سپس دانه زیره، برگ کاری و هینگ (اگر استفاده می‌کنید) را اضافه کنید و ۳۰ ثانیه تفت دهید تا عطرشان خارج شود.",
      "سیر ورقه‌ای شده و فلفل قرمز خشک را اضافه کنید و حدود ۱ دقیقه دیگر تفت دهید تا سیر طلایی شود و فلفل قرمز تیره شود (مراقب باشید نسوزد).",
      "تادکای داغ را بلافاصله روی دال پخته شده بریزید. درب قابلمه دال را به مدت ۱ دقیقه ببندید تا عطر تادکا به خوبی به دال نفوذ کند.",
      "دال تادکا را با گشنیز تازه خرد شده تزیین کرده و با برنج یا نان سرو کنید."
    ],
    "nationality": "in",
    "ingredients": [
      {
        "unit": "پیمانه (۲۰۰ گرم)",
        "amount": 1,
        "item": "دال تور (لپه زرد هندی)"
      },
      {
        "item": "پیاز متوسط",
        "amount": 1,
        "unit": "عدد (نگینی خرد شده)"
      },
      {
        "unit": "عدد (نگینی خرد شده)",
        "item": "گوجه فرنگی متوسط",
        "amount": 1
      },
      {
        "item": "سیر",
        "unit": "حبه (له شده)",
        "amount": 3
      },
      {
        "amount": 1,
        "unit": "تکه کوچک (۱ سانتی‌متری، رنده شده)",
        "item": "زنجبیل"
      },
      {
        "amount": 1,
        "unit": "عدد (خرد شده، اختیاری)",
        "item": "فلفل سبز تند"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "زردچوبه"
      },
      {
        "amount": 0.5,
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری (اختیاری)"
      },
      {
        "item": "نمک",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "تا ۴ پیمانه",
        "amount": 3,
        "item": "آب"
      },
      {
        "item": "گشنیز تازه خرد شده",
        "amount": 2,
        "unit": "قاشق غذاخوری (برای تزیین)"
      },
      {
        "unit": "",
        "item": "برای تادکا (مایه تفت داده شده)",
        "amount": 0
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن نباتی یا گی",
        "amount": 2
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "دانه خردل",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "دانه زیره سبز",
        "amount": 1
      },
      {
        "item": "برگ کاری",
        "unit": "تا ۱۲ عدد",
        "amount": 10
      },
      {
        "item": "سیر",
        "unit": "حبه (نازک ورقه‌ای شده)",
        "amount": 2
      },
      {
        "unit": "عدد",
        "item": "فلفل قرمز خشک",
        "amount": 2
      },
      {
        "item": "هینگ (پودر کتیرا)",
        "unit": "قاشق چای‌خوری (اختیاری)",
        "amount": 0.25
      }
    ],
    "description": "دال تادکا",
    "hasRealData": true,
    "category": "international",
    "name": "دال تادکا",
    "id": "dish-1765505606706-tf3xb-2",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765505606706-1kxia-3",
    "category": "international",
    "ingredients": [
      {
        "item": "برای خمیر دوسا",
        "amount": 0,
        "unit": ""
      },
      {
        "amount": 1.5,
        "item": "برنج خام (برنج باسماتی یا هر برنج دانه بلند دیگر)",
        "unit": "پیمانه"
      },
      {
        "amount": 0.5,
        "item": "دال اوراد (لپه مشکی بدون پوست)",
        "unit": "پیمانه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "دانه شنبلیله",
        "amount": 0.5
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "item": "آب",
        "amount": 0
      },
      {
        "unit": "برای پخت دوسا",
        "amount": 0,
        "item": "روغن"
      },
      {
        "amount": 0,
        "item": "برای فیلینگ سیب‌زمینی (ماسالا)",
        "unit": ""
      },
      {
        "unit": "عدد (پخته و له شده)",
        "item": "سیب‌زمینی متوسط",
        "amount": 4
      },
      {
        "amount": 1,
        "item": "پیاز متوسط",
        "unit": "عدد (نازک خلال شده)"
      },
      {
        "item": "فلفل سبز تند",
        "unit": "عدد (خرد شده، یا کمتر بر اساس ذائقه)",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "زنجبیل",
        "unit": "قاشق چای‌خوری (رنده شده)"
      },
      {
        "unit": "تا ۱۲ عدد",
        "item": "برگ کاری",
        "amount": 10
      },
      {
        "amount": 1,
        "item": "دانه خردل",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "دال اوراد",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "دال چانا (لپه نخود)"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "زردچوبه"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "روغن نباتی"
      },
      {
        "item": "نمک",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "گشنیز تازه خرد شده"
      }
    ],
    "recipeSteps": [
      "برای خمیر دوسا: برنج و دال اوراد را جداگانه بشویید. برنج و دانه شنبلیله را در یک کاسه با آب کافی به مدت ۴-۵ ساعت خیس کنید. دال اوراد را نیز جداگانه به مدت ۲-۳ ساعت خیس کنید.",
      "آب برنج و دال را دور بریزید. ابتدا برنج و شنبلیله را با کمی آب در مخلوط‌کن یا آسیاب برقی (بلندر) له کنید تا خمیر نسبتاً نرمی بدست آید. سپس دال اوراد را با آب کم (حدود ۱/۴ پیمانه) له کنید تا خمیر بسیار نرم و پفکی شود.",
      "هر دو خمیر را در یک کاسه بزرگ مخلوط کرده، نمک را اضافه کنید و خوب هم بزنید. درب کاسه را با یک پارچه تمیز بپوشانید و اجازه دهید در جای گرم (حدود ۲۵-۳۰ درجه سانتی‌گراد) به مدت ۸ تا ۱۲ ساعت تخمیر شود تا حجم آن دو برابر شده و حباب‌دار شود.",
      "برای فیلینگ سیب‌زمینی (ماسالا): در یک تابه، روغن را روی حرارت متوسط گرم کنید. دانه خردل را اضافه کنید و صبر کنید تا شروع به ترکیدن کند.",
      "سپس دال اوراد، دال چانا و برگ کاری را اضافه کنید و حدود ۱ دقیقه تفت دهید تا دال‌ها کمی طلایی شوند.",
      "پیازهای خلال شده، فلفل سبز و زنجبیل رنده شده را اضافه کنید و به مدت ۵-۷ دقیقه تفت دهید تا پیازها نرم و شفاف شوند.",
      "سیب‌زمینی‌های پخته و له شده و زردچوبه را اضافه کنید. نمک را بچشید و در صورت نیاز اضافه کنید. خوب مخلوط کنید و برای ۵ دقیقه روی حرارت ملایم بپزید تا مواد خوب با هم ترکیب شوند. گشنیز تازه خرد شده را اضافه کرده و از روی حرارت بردارید.",
      "برای پخت دوسا: یک تابه نچسب (مثل تابه کرپ‌پزی) را روی حرارت متوسط گرم کنید. چند قطره روغن روی تابه بمالید و با یک دستمال کاغذی آن را پاک کنید.",
      "یک ملاقه از خمیر دوسا را برداشته و در مرکز تابه بریزید. بلافاصله با پشت ملاقه، خمیر را به صورت دورانی و نازک به بیرون پخش کنید تا یک دایره بزرگ و نازک تشکیل شود.",
      "کمی روغن در اطراف و روی دوسا بریزید. اجازه دهید برای ۲-۳ دقیقه بپزد تا لبه‌های آن طلایی و برشته شود و قسمت بالایی خشک شود.",
      "یک یا دو قاشق غذاخوری از فیلینگ سیب‌زمینی را در یک نیمه دوسا قرار دهید. دوسا را تا کرده و بلافاصله سرو کنید. معمولاً با سامبار و چاتنی نارگیل سرو می‌شود."
    ],
    "name": "ماسالا دوسا",
    "hasRealData": true,
    "description": "ماسالا دوسا",
    "nationality": "in",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "برای پوری: سمولینا، آرد سفید، روغن و نمک را در یک کاسه مخلوط کنید. کم‌کم آب اضافه کنید و ورز دهید تا خمیری سفت و یکدست بدست آید (حدود ۵-۷ دقیقه ورز دهید). روی خمیر را با پارچه مرطوب بپوشانید و به مدت ۲۰ دقیقه استراحت دهید.",
      "خمیر را دوباره کمی ورز دهید و به گلوله‌های کوچک تقسیم کنید. هر گلوله را با وردنه به صورت دایره‌های نازک (به قطر حدود ۳-۴ سانتی‌متر) باز کنید. تمام پوری‌ها را باز کرده و زیر یک پارچه تمیز قرار دهید تا خشک نشوند.",
      "روغن را در یک تابه گود روی حرارت متوسط-زیاد گرم کنید. وقتی روغن به اندازه کافی داغ شد، پوری‌ها را یکی یکی داخل روغن بیندازید. با پشت کفگیر روی آن‌ها فشار دهید تا پف کنند. هر طرف را به مدت ۳۰ ثانیه تا ۱ دقیقه سرخ کنید تا طلایی و برشته شوند. پوری‌های سرخ شده را روی دستمال کاغذی قرار دهید تا روغن اضافی‌شان گرفته شود.",
      "برای پانی: نعناع، گشنیز، فلفل سبز، زنجبیل و خمیر تمر هندی را با کمی آب (حدود ۱/۲ پیمانه) در مخلوط‌کن بریزید و کاملاً پوره کنید. این پوره را از یک صافی ریز رد کنید تا مایع یکدست و بدون تفاله بدست آید.",
      "پودر زیره تفت داده شده، چات ماسالا، پودر فلفل قرمز، نمک سیاه، نمک معمولی و شکر (در صورت استفاده) را به مایع صاف شده اضافه کنید. ۳-۴ پیمانه آب سرد اضافه کنید و خوب مخلوط کنید. آن را بچشید و در صورت نیاز نمک یا ادویه اضافه کنید. برای بهترین نتیجه، پانی را برای حداقل ۳۰ دقیقه در یخچال قرار دهید تا خنک شود.",
      "برای فیلینگ: سیب‌زمینی پخته و خرد شده، نخود پخته شده، پیاز خرد شده (در صورت استفاده)، چات ماسالا، پودر فلفل قرمز و نمک را در یک کاسه مخلوط کنید. گشنیز تازه (در صورت استفاده) را اضافه کنید و خوب هم بزنید.",
      "برای سرو: یک پوری را با انگشت شست به آرمانی سوراخ کنید تا یک حفره ایجاد شود. مقداری از فیلینگ سیب‌زمینی و نخود را داخل پوری بریزید. پوری را با پانی خنک پر کنید و بلافاصله سرو کنید."
    ],
    "description": "پانی پوری / گل گپه",
    "hasRealData": true,
    "category": "international",
    "id": "dish-1765505606706-b8ife-4",
    "nationality": "in",
    "ingredients": [
      {
        "unit": "",
        "amount": 0,
        "item": "برای پوری (توپک‌های سرخ شده)"
      },
      {
        "item": "سمولینا (سوجی)",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "آرد سفید",
        "amount": 2
      },
      {
        "item": "روغن نباتی",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "نمک"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "آب"
      },
      {
        "unit": "برای سرخ کردن عمیق",
        "amount": 0,
        "item": "روغن"
      },
      {
        "unit": "",
        "item": "برای پانی (آب مزه‌دار شده)",
        "amount": 0
      },
      {
        "unit": "دسته (حدود ۱ پیمانه فشرده)",
        "amount": 1,
        "item": "برگ نعناع تازه"
      },
      {
        "unit": "دسته (حدود ۱/۲ پیمانه فشرده)",
        "amount": 0.5,
        "item": "گشنیز تازه"
      },
      {
        "amount": 1,
        "unit": "تا ۲ عدد (بر اساس ذائقه)",
        "item": "فلفل سبز تند"
      },
      {
        "item": "زنجبیل",
        "unit": "تکه کوچک (۲ سانتی‌متر)",
        "amount": 1
      },
      {
        "unit": "گرم",
        "amount": 30,
        "item": "تمر هندی"
      },
      {
        "item": "پودر زیره تفت داده شده",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "چات ماسالا"
      },
      {
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک سیاه (کالا نمک)"
      },
      {
        "item": "نمک معمولی",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "amount": 1,
        "item": "شکر یا شیره خرما",
        "unit": "قاشق چای‌خوری (برای بالانس طعم، اختیاری)"
      },
      {
        "item": "آب سرد",
        "amount": 3,
        "unit": "تا ۴ پیمانه"
      },
      {
        "item": "برای فیلینگ (مخلوط داخل پوری)",
        "unit": "",
        "amount": 0
      },
      {
        "item": "سیب‌زمینی متوسط",
        "unit": "عدد (پخته، پوست کنده و مکعبی خرد شده)",
        "amount": 2
      },
      {
        "amount": 0.5,
        "item": "نخود",
        "unit": "پیمانه (پخته شده)"
      },
      {
        "amount": 0.5,
        "item": "پیاز متوسط",
        "unit": "عدد (خیلی ریز خرد شده، اختیاری)"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "چات ماسالا"
      },
      {
        "amount": 0.5,
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "نمک"
      },
      {
        "unit": "قاشق غذاخوری (اختیاری)",
        "item": "گشنیز تازه خرد شده",
        "amount": 2
      }
    ],
    "name": "پانی پوری / گل گپه",
    "calories": 480,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "آلو پاراتا",
    "category": "international",
    "nationality": "in",
    "id": "dish-1765505606706-kz42c-5",
    "ingredients": [
      {
        "unit": "",
        "item": "برای خمیر",
        "amount": 0
      },
      {
        "item": "آرد گندم کامل",
        "amount": 2,
        "unit": "پیمانه"
      },
      {
        "unit": "تا ۱ پیمانه",
        "item": "آب گرم",
        "amount": 0.75
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "item": "روغن نباتی یا گی",
        "amount": 1,
        "unit": "قاشق چای‌خوری (برای خمیر) + برای پخت"
      },
      {
        "item": "برای فیلینگ سیب‌زمینی",
        "amount": 0,
        "unit": ""
      },
      {
        "unit": "عدد (پخته، پوست کنده و له شده)",
        "amount": 4,
        "item": "سیب‌زمینی متوسط"
      },
      {
        "unit": "عدد (بسیار ریز خرد شده، اختیاری)",
        "item": "پیاز متوسط",
        "amount": 0.5
      },
      {
        "item": "فلفل سبز تند",
        "unit": "عدد (ریز خرد شده، یا کمتر بر اساس ذائقه)",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری (رنده شده)",
        "item": "زنجبیل",
        "amount": 1
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری (خرد شده)",
        "item": "گشنیز تازه"
      },
      {
        "amount": 1,
        "item": "پودر زیره سبز",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "پودر گشنیز",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "گرم ماسالا",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری (اختیاری، برای طعم ترش)",
        "amount": 0.5,
        "item": "پودر انبه خشک (آمچور)"
      },
      {
        "item": "پودر فلفل قرمز",
        "unit": "قاشق چای‌خوری (اختیاری)",
        "amount": 0.5
      },
      {
        "amount": 0,
        "item": "نمک",
        "unit": "به میزان لازم"
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "برای خمیر: آرد گندم کامل و نمک را در یک کاسه بزرگ مخلوط کنید. کم‌کم آب گرم را اضافه کنید و ورز دهید تا خمیری نرم و یکدست بدست آید (حدود ۵-۷ دقیقه ورز دهید). ۱ قاشق چای‌خوری روغن را روی خمیر بمالید، روی کاسه را با پارچه تمیز بپوشانید و به مدت ۲۰-۳۰ دقیقه استراحت دهید.",
      "برای فیلینگ سیب‌زمینی: سیب‌زمینی‌های پخته و له شده را در یک کاسه بزرگ بریزید. پیاز خرد شده (در صورت استفاده)، فلفل سبز، زنجبیل، گشنیز، پودر زیره، پودر گشنیز، گرم ماسالا، پودر انبه خشک (در صورت استفاده)، پودر فلفل قرمز و نمک را اضافه کنید. تمام مواد را با دست خوب مخلوط کنید تا یکدست شود و هیچ توده بزرگی از سیب‌زمینی باقی نماند. فیلینگ را به ۴ قسمت مساوی تقسیم کرده و هر قسمت را به شکل گلوله درآورید.",
      "آماده کردن پاراتا: خمیر آماده شده را به ۴ قسمت مساوی تقسیم کرده و هر قسمت را به شکل گلوله درآورید. هر گلوله خمیر را به اندازه یک دایره کوچک (حدود ۱۰ سانتی‌متر) با وردنه باز کنید. یک گلوله از فیلینگ سیب‌زمینی را در مرکز خمیر قرار دهید.",
      "لبه‌های خمیر را جمع کرده و به سمت بالا بیاورید تا فیلینگ کاملاً پوشانده شود و خمیر به صورت یک بسته درآید. محل اتصال خمیر را به آرمانی ببندید.",
      "سطح کار و وردنه را کمی آرد بپاشید. گلوله خمیر پر شده را به آرمانی و با فشار یکنواخت با وردنه باز کنید تا به شکل دایره‌ای به قطر حدود ۱۵-۲۰ سانتی‌متر درآید. مراقب باشید خمیر پاره نشود و فیلینگ بیرون نزند.",
      "پخت پاراتا: یک تابه نچسب یا تابه چدنی را روی حرارت متوسط-زیاد گرم کنید. پاراتای باز شده را روی تابه داغ قرار دهید.",
      "وقتی که روی پاراتا شروع به حباب زدن کرد (حدود ۳۰-۶۰ ثانیه)، آن را برگردانید. کمی روغن یا گی روی سطح پخته شده بمالید.",
      "پس از ۳۰-۶۰ ثانیه دیگر، دوباره پاراتا را برگردانید و کمی روغن یا گی روی سطح دیگر بمالید. با پشت کفگیر به آرمانی روی پاراتا فشار دهید تا به طور یکنواخت بپزد و طلایی و برشته شود. این کار را برای هر طرف تکرار کنید تا هر دو طرف پاراتا پخته و دارای لکه‌های قهوه‌ای طلایی شود.",
      "پاراتا پخته شده را از روی تابه بردارید و در یک ظرف در بسته یا زیر یک پارچه تمیز نگهداری کنید تا گرم بماند. تمام پاراتاها را به همین ترتیب بپزید. آلو پاراتا را گرم با ماست، ترشی یا کره سرو کنید."
    ],
    "name": "آلو پاراتا",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "international",
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده"
      },
      {
        "amount": 4,
        "item": "نان تورتیلا",
        "unit": "عدد"
      },
      {
        "amount": 100,
        "item": "پنیر چدار",
        "unit": "گرم"
      },
      {
        "amount": 1,
        "unit": "قاشق غذاخوری",
        "item": "ادویه تاکو"
      }
    ],
    "id": "dish-mex-1",
    "name": "Beef Taco (تاکو گوشت مکزیکی)",
    "description": "تاکو مکزیکی با گوشت چرخ‌کرده و نان تورتیلا",
    "nationality": "mx",
    "hasRealData": true,
    "recipeSteps": [
      "گوشت را با ادویه تفت دهید.",
      "داخل نان‌ها را پر کنید.",
      "با کاهو و گوجه سرو کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 400,
        "unit": "گرم",
        "item": "گوشت راسته گوساله"
      },
      {
        "item": "فلفل دلمه‌ای رنگی",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "پیاز",
        "unit": "عدد بزرگ"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "آبلیمو تازه"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 1,
        "item": "ادویه مخصوص (زیره، پاپريكا، فلفل)"
      }
    ],
    "nationality": "mx",
    "recipeSteps": [
      "گوشت را به صورت نوارهای باریک (Julienne) برش بزنید و با ادویه و آبلیمو مرینیت کنید.",
      "پیاز و فلفل دلمه‌ای را خلالی خرد کرده و در تابه بسیار داغ تفت دهید تا کمی برشته شوند.",
      "گوشت را اضافه کرده و با حرارت بالا تفت سریع دهید تا آب نیندازد و پخته شود.",
      "در نان تورتیلا به همراه سس سالسا یا خامه ترش سرو کنید."
    ],
    "name": "Beef Fajita (فاهیتای گوشت)",
    "id": "mex-2",
    "description": "نوارهای لذیذ گوشت گوساله مزه‌دار شده با فلفل دلمه‌ای و پیاز کاراملی",
    "hasRealData": true,
    "category": "international",
    "calories": 400,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "سینه مرغ نواری شده با سبزیجات گریل شده به سبک مکزیکی",
    "id": "mex-3",
    "nationality": "mx",
    "recipeSteps": [
      "مرغ را به صورت نواری خرد کرده و با سیر و ادویه‌ها تفت دهید تا کاملاً طلایی و پخته شود.",
      "سبزیجات را خلالی درشت خرد کرده و در همان تابه به صورت جداگانه تفت دهید تا ترد بمانند.",
      "در انتها مرغ و سبزیجات را با هم مخلوط کرده و کمی آب لیمو روی آن بریزید.",
      "با نان لواش یا تورتیلا و گشنیز تازه سرو کنید."
    ],
    "category": "international",
    "hasRealData": true,
    "name": "Chicken Fajita (فاهیتای مرغ)",
    "ingredients": [
      {
        "item": "سینه مرغ",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "فلفل دلمه‌ای",
        "unit": "عدد",
        "amount": 2
      },
      {
        "item": "پیاز",
        "amount": 1,
        "unit": "عدد متوسط"
      },
      {
        "amount": 2,
        "unit": "حبه",
        "item": "سیر"
      },
      {
        "item": "روغن زیتون",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "item": "پودر گشنیز و فلفل قرمز",
        "unit": "قاشق چایخوری"
      }
    ],
    "calories": 350,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "international",
    "hasRealData": true,
    "nationality": "jp",
    "ingredients": [
      {
        "amount": 2,
        "item": "برنج سوشی",
        "unit": "پیمانه"
      },
      {
        "amount": 2.5,
        "item": "آب",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "سرکه برنج",
        "amount": 0.25
      },
      {
        "item": "شکر",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 4.5,
        "item": "جلبک نوری",
        "unit": "ورق"
      },
      {
        "item": "سالمون سوشی گرید",
        "unit": "گرم",
        "amount": 200
      },
      {
        "unit": "عدد",
        "item": "خیار",
        "amount": 1
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "آووکادو"
      },
      {
        "item": "سس سویا",
        "amount": 0,
        "unit": "برای سرو"
      },
      {
        "amount": 0,
        "item": "واسابی",
        "unit": "برای سرو"
      },
      {
        "amount": 0,
        "unit": "برای سرو",
        "item": "زنجبیل ترشی"
      }
    ],
    "id": "dish-1765570471163-l3sgu-2",
    "description": "Sushi (سوشی - ژاپن)",
    "name": "Sushi (سوشی - ژاپن)",
    "recipeSteps": [
      "برنج سوشی را چندین بار با آب سرد بشویید تا آب آن شفاف شود. برنج را برای ۳۰ دقیقه خیس کنید، سپس آبکش کنید.",
      "برنج خیس خورده را با ۲.۵ پیمانه آب در قابلمه‌ای با درب محکم بریزید. به جوش آورید، سپس حرارت را کم کرده و برای ۱۵ دقیقه بپزید تا آب جذب شود. بعد از پخت، برای ۱۰ دقیقه بدون برداشتن درب استراحت دهید.",
      "در یک کاسه کوچک، سرکه برنج، شکر و نمک را مخلوط کنید تا شکر و نمک حل شوند (می‌توانید کمی حرارت دهید تا حل شوند، اما اجازه ندهید بجوشد). این مخلوط را سس سرکه می‌نامند.",
      "برنج پخته شده را به یک کاسه بزرگ چوبی یا پلاستیکی منتقل کنید. سس سرکه را به تدریج روی برنج بریزید و با قاشق چوبی یا کاردک به آرامی مخلوط کنید تا برنج چسبناک و براق شود. برنج را با یک پارچه تمیز بپوشانید تا خشک نشود و بگذارید خنک شود.",
      "یک حصیر بامبو (makisu) را با سلفون بپوشانید.",
      "یک ورق نوری را روی حصیر بامبو قرار دهید. دست‌های خود را کمی با آب خیس کنید و حدود ۱/۲ تا ۳/۴ پیمانه از برنج سوشی را به طور یکنواخت روی نوری پخش کنید و یک سانتی‌متر از لبه بالایی را خالی بگذارید.",
      "در مرکز برنج، یک ردیف از مواد پر کننده (سالمون، خیار، آووکادو) قرار دهید.",
      "با استفاده از حصیر بامبو، رول را به آرامی و محکم از پایین به بالا بپیچید و همزمان مواد را داخل نگه دارید. با هر دور پیچیدن، حصیر را کمی فشار دهید تا رول سفت شود.",
      "لبه خالی نوری را کمی با آب خیس کنید تا رول بچسبد و بسته شود. این کار را برای بقیه ورق‌های نوری و مواد تکرار کنید.",
      "هر رول را با چاقوی تیز و مرطوب به ۶ تا ۸ قطعه برش دهید. چاقو را بین هر برش مرطوب کنید تا برنج نچسبد.",
      "سوشی آماده را بلافاصله با سس سویا، واسابی و زنجبیل ترشی سرو کنید."
    ],
    "calories": 480,
    "cookTime": 105,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "item": "میگوی متوسط",
        "amount": 200
      },
      {
        "unit": "عدد متوسط",
        "item": "کدو سبز",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "سیب‌زمینی شیرین",
        "unit": "عدد متوسط"
      },
      {
        "unit": "عدد",
        "item": "فلفل دلمه‌ای قرمز",
        "amount": 1
      },
      {
        "unit": "عدد",
        "item": "قارچ بزرگ",
        "amount": 4.5
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "آرد همه منظوره"
      },
      {
        "item": "نشاسته ذرت",
        "amount": 0.25,
        "unit": "پیمانه"
      },
      {
        "item": "تخم‌مرغ بزرگ",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 1.5,
        "item": "آب بسیار سرد",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "روغن خنثی (مانند کانولا یا گیاهی)",
        "amount": 4
      },
      {
        "item": "نمک",
        "amount": 0.25,
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "عصاره داشی (برای سس)"
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "میرین (برای سس)"
      },
      {
        "item": "سس سویا (برای سس)",
        "amount": 0.25,
        "unit": "پیمانه"
      }
    ],
    "id": "dish-1765570471164-h20zr-3",
    "name": "Tempura (تمپورا - ژاپن)",
    "nationality": "jp",
    "description": "Tempura (تمپورا - ژاپن)",
    "category": "international",
    "hasRealData": true,
    "recipeSteps": [
      "برای آماده سازی سس دیپینگ (Tentsuyu)، عصاره داشی، میرین و سس سویا را در یک قابلمه کوچک مخلوط کرده و روی حرارت ملایم به جوش بیاورید. بلافاصله از روی حرارت بردارید و کنار بگذارید تا کمی خنک شود.",
      "میگوها را آماده کنید: برای صاف ماندن میگوها هنگام سرخ شدن، با یک چاقوی کوچک چند برش سطحی در قسمت داخلی خمیده میگو (سمت شکم) ایجاد کنید و سپس به آرامی آن را صاف کنید. با دستمال کاغذی خشک کنید.",
      "سبزیجات را بشویید و خشک کنید. به صورت ورقه‌های نازک یا نواری برش دهید. خشک بودن کامل مواد بسیار مهم است تا خمیر به خوبی به آنها بچسبد.",
      "در یک کاسه بزرگ، آرد همه منظوره و نشاسته ذرت را با هم الک کنید.",
      "در یک کاسه جداگانه، تخم‌مرغ را کمی بزنید، سپس آب بسیار سرد را به آن اضافه کنید و به آرامی مخلوط کنید. نیازی نیست کاملاً یکدست شود، کمی گلوله آرد اشکالی ندارد.",
      "مخلوط تخم‌مرغ و آب سرد را به آرده اضافه کنید و فقط در حد ترکیب شدن هم بزنید. خمیر باید کمی گلوله‌ای و روان باشد. بیش از حد هم نزنید، چون تمپورا ترد نخواهد شد.",
      "در یک قابلمه سنگین یا سرخ‌کن عمیق، روغن را تا دمای ۱۷۰-۱۷۵ درجه سانتی‌گراد (۳۴۰-۳۵۰ درجه فارنهایت) گرم کنید.",
      "مواد آماده شده (میگو، سبزیجات) را یکی یکی به آرده تمپورا بزنید تا کاملاً پوشیده شوند. اضافه آرد را بتکانید.",
      "مواد آغشته به خمیر را به آرامی و با احتیاط در روغن داغ قرار دهید. همزمان زیاد از حد مواد در روغن نریزید تا دمای روغن افت نکند و تمپورا چرب نشود. به صورت دسته‌ای سرخ کنید.",
      "هر دسته را برای ۲ تا ۳ دقیقه سرخ کنید تا طلایی روشن و ترد شوند. میگوها باید صورتی و سبزیجات نرم شوند.",
      "تمپوراهای سرخ شده را با کفگیر سوراخ‌دار خارج کرده و روی دستمال کاغذی آشپزخانه قرار دهید تا روغن اضافی آنها گرفته شود. کمی نمک روی آنها بپاشید.",
      "بلافاصله تمپورای داغ را با سس دیپینگ (Tentsuyu) سرو کنید."
    ],
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "dish-1765570471164-pj1eu-4",
    "hasRealData": true,
    "name": "Ratatouille (رتاتویی - فرانسه)",
    "category": "international",
    "description": "Ratatouille (رتاتویی - فرانسه)",
    "recipeSteps": [
      "پیاز خرد شده را با ۲ قاشق غذاخوری روغن زیتون در یک قابلمه بزرگ و سنگین روی حرارت متوسط تفت دهید تا نرم و شفاف شود، حدود ۸-۱۰ دقیقه.",
      "سیر خرد شده را اضافه کنید و به مدت ۱ دقیقه دیگر تفت دهید تا عطر آن بلند شود.",
      "فلفل دلمه‌ای‌های قرمز و زرد مکعبی خرد شده را به قابلمه اضافه کنید و برای ۵-۷ دقیقه تفت دهید تا کمی نرم شوند.",
      "بادمجان و کدو سبز مکعبی خرد شده را به سبزیجات اضافه کنید. برای ۱۰-۱۵ دقیقه دیگر تفت دهید و گهگاه هم بزنید تا سبزیجات کمی قهوه‌ای و نرم شوند.",
      "رب گوجه‌فرنگی را اضافه کنید و برای ۲ دقیقه تفت دهید تا رنگ آن باز شود و بوی خامی آن گرفته شود.",
      "گوجه‌فرنگی خرد شده (کنسروی یا تازه)، آویشن خشک، برگ بو، نمک و فلفل سیاه را به قابلمه اضافه کنید. هم بزنید تا مواد با هم ترکیب شوند.",
      "مخلوط را به جوش آورید، سپس حرارت را کم کرده و درب قابلمه را بگذارید. اجازه دهید برای ۳۰-۴۵ دقیقه به آرامی بپزد تا سبزیجات کاملاً نرم شوند و طعم‌ها به خوبی با هم ترکیب شوند. هر از گاهی هم بزنید تا ته نگیرد.",
      "برگ بو را از خوراک خارج کنید. رتاتویی را بچشید و در صورت نیاز نمک و فلفل آن را تنظیم کنید.",
      "رتاتویی را گرم، به عنوان غذای اصلی یا کنار غذاهای گوشتی و مرغ، سرو کنید. روی آن با برگ‌های تازه ریحان تزئین کنید."
    ],
    "ingredients": [
      {
        "unit": "عدد متوسط",
        "amount": 1,
        "item": "بادمجان"
      },
      {
        "unit": "عدد متوسط",
        "item": "کدو سبز",
        "amount": 2
      },
      {
        "item": "فلفل دلمه‌ای قرمز",
        "unit": "عدد بزرگ",
        "amount": 1
      },
      {
        "item": "فلفل دلمه‌ای زرد",
        "amount": 1,
        "unit": "عدد بزرگ"
      },
      {
        "unit": "عدد بزرگ",
        "item": "پیاز",
        "amount": 1
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 4
      },
      {
        "unit": "گرم",
        "item": "گوجه‌فرنگی خرد شده کنسروی",
        "amount": 800
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی",
        "amount": 2
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "روغن زیتون فرابکر"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 1,
        "item": "آویشن خشک"
      },
      {
        "item": "برگ بو",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "قاشق چایخوری",
        "item": "نمک"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چایخوری",
        "item": "فلفل سیاه"
      },
      {
        "amount": 0,
        "item": "ریحان تازه",
        "unit": "برای تزیین"
      }
    ],
    "nationality": "fr",
    "calories": 500,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "گوشت گوساله را با 1 قاشق چایخوری نمک و 0.25 قاشق چایخوری فلفل سیاه مزه‌دار کنید و کنار بگذارید.",
      "در یک قابلمه چدنی سنگین یا قابلمه گود با شعله متوسط, بیکن‌های خرد شده را بدون روغن اضافه کنید و تا زمانی که برشته شوند و چربی آن‌ها آزاد شود، بپزید (حدود 8-10 دقیقه).",
      "بیکن‌های پخته شده را با کفگیر سوراخ‌دار از قابلمه خارج کرده و روی دستمال کاغذی قرار دهید تا روغن اضافی آن جذب شود. حدود 2 قاشق غذاخوری از چربی بیکن را در قابلمه نگه دارید و باقی را دور بریزید.",
      "گوشت گوساله مزه‌دار شده را در قابلمه روی حرارت متوسط رو به بالا در چربی بیکن یا روغن زیتون داغ، در چند نوبت تفت دهید تا از هر طرف قهوه‌ای شود. گوشت‌ها را پس از تفت دادن از قابلمه خارج کنید و کنار بگذارید.",
      "حرارت را کمی پایین بیاورید. پیازهای کوچک و هویج‌های حلقه شده را به قابلمه اضافه کنید و به مدت 5-7 دقیقه تفت دهید تا کمی نرم شوند.",
      "سیر رنده شده را اضافه کرده و 1 دقیقه دیگر تفت دهید تا عطر آن بلند شود.",
      "آرد و رب گوجه فرنگی را به سبزیجات اضافه کنید و 2-3 دقیقه هم بزنید تا کاملا مخلوط شوند و بوی خامی آرد گرفته شود.",
      "مایع (جایگزین شراب یا آب انار) را به قابلمه اضافه کنید و کف قابلمه را با قاشق چوبی بتراشید تا مواد چسبیده جدا شوند. اجازه دهید به مدت 5 دقیقه بجوشد تا حجم آن کمی کاهش یابد.",
      "آب گوشت گرم، برگ بو و شاخه‌های آویشن را اضافه کنید. گوشت‌های تفت داده شده و بیکن‌های پخته شده را به قابلمه برگردانید.",
      "نمک و فلفل باقی‌مانده را اضافه کنید و خوب هم بزنید. وقتی خورش به جوش آمد، حرارت را کم کرده، درب قابلمه را بگذارید و به مدت 2.5 تا 3 ساعت یا تا زمانی که گوشت کاملا نرم شود، با حرارت ملایم بپزید.",
      "در 30 دقیقه پایانی پخت، در یک تابه جداگانه، 2 قاشق غذاخوری کره را ذوب کنید. قارچ‌ها را به تابه اضافه کرده و به مدت 5-7 دقیقه تفت دهید تا طلایی و نرم شوند.",
      "قارچ‌های تفت داده شده را به خورش اضافه کنید و 15 دقیقه دیگر بپزید.",
      "قبل از سرو، برگ بو و شاخه‌های آویشن را از خورش خارج کنید. خورش را با جعفری تازه خرد شده تزئین کرده و همراه با پوره سیب‌زمینی، نان باگت یا نودل سرو کنید."
    ],
    "description": "Beef Bourguignon (خوراک گوشت قرمز فرانسوی - فرانسه)",
    "nationality": "fr",
    "hasRealData": true,
    "name": "Beef Bourguignon (بیف بورگینیون - فرانسه)",
    "ingredients": [
      {
        "item": "گوشت گوساله (مکعبی خرد شده، از ران یا سینه)",
        "amount": 700,
        "unit": "گرم"
      },
      {
        "unit": "گرم",
        "amount": 150,
        "item": "بیکن (خرد شده)"
      },
      {
        "amount": 14,
        "item": "پیاز کوچک (صدفی یا مرواریدی، پوست کنده)",
        "unit": "عدد"
      },
      {
        "item": "هویج (متوسط، پوست کنده و حلقه شده)",
        "unit": "عدد",
        "amount": 2
      },
      {
        "unit": "حبه",
        "amount": 4,
        "item": "سیر (رنده شده)"
      },
      {
        "amount": 250,
        "item": "قارچ (کوچک، درسته یا نصف شده)",
        "unit": "گرم"
      },
      {
        "item": "آرد سفید",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "amount": 1,
        "item": "رب گوجه فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 2.5,
        "item": "آب گوشت (گرم)",
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "unit": "پیمانه",
        "item": "شراب قرمز خشک (یا جایگزین: آب انار ترش رقیق شده)"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "روغن زیتون"
      },
      {
        "item": "کره",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "برگ بو",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "unit": "شاخه",
        "amount": 4,
        "item": "آویشن تازه (شاخه)"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "جعفری تازه (خرد شده، برای تزئین)",
        "amount": 2
      },
      {
        "amount": 1.5,
        "item": "نمک",
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چایخوری",
        "item": "فلفل سیاه (تازه آسیاب شده)"
      }
    ],
    "category": "international",
    "id": "dish-1765570480557-ix8gg-1",
    "calories": 520,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "تکه",
        "amount": 4,
        "item": "فیله ماهی سفید (کاد، هادوک یا تیلاپیا، بدون پوست و استخوان)"
      },
      {
        "item": "آرد سفید",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 1,
        "item": "بیکینگ پودر"
      },
      {
        "amount": 0.5,
        "item": "نمک",
        "unit": "قاشق چایخوری"
      },
      {
        "item": "فلفل سیاه",
        "amount": 0.25,
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "آبجو سرد (لاگر) یا آب گازدار سرد"
      },
      {
        "amount": 1.25,
        "item": "روغن نباتی یا کانولا (برای سرخ کردن عمیق)",
        "unit": "لیتر"
      },
      {
        "unit": "عدد",
        "item": "سیب‌زمینی (متوسط تا بزرگ، مناسب سرخ کردن)",
        "amount": 4
      },
      {
        "amount": 0,
        "item": "نمک (برای چیپس)",
        "unit": "به میزان لازم"
      },
      {
        "amount": 0,
        "item": "سرکه مالت (برای سرو)",
        "unit": "به میزان لازم"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "لیمو ترش (برش خورده، برای سرو)"
      }
    ],
    "hasRealData": true,
    "nationality": "uk",
    "recipeSteps": [
      "سیب‌زمینی‌ها را پوست کنده و به شکل خلال‌های ضخیم (حدود 1 سانتی‌متر) برش دهید.",
      "خلال‌های سیب‌زمینی را در یک کاسه آب سرد قرار دهید و به مدت حداقل 30 دقیقه بگذارید. سپس آبکش کرده و با دستمال تمیز کاملاً خشک کنید.",
      "روغن را در یک قابلمه بزرگ و عمیق یا سرخ‌کن به دمای 130 درجه سانتی‌گراد (265 درجه فارنهایت) برسانید.",
      "سیب‌زمینی‌ها را در چند نوبت (حدود نیمی از آنها در هر نوبت) به مدت 5-7 دقیقه در روغن نیمه‌گرم سرخ کنید تا نرم شوند اما رنگ نگیرند. آنها را از روغن خارج کرده و روی توری سیمی قرار دهید.",
      "دمای روغن را به 180-190 درجه سانتی‌گراد (350-375 درجه فارنهایت) برسانید.",
      "در یک کاسه بزرگ، آرد, بیکینگ پودر، نمک و فلفل سیاه را با هم مخلوط کنید.",
      "آبجو سرد یا آب گازدار را به تدریج اضافه کرده و با همزن دستی هم بزنید تا یک خمیر صاف و یکدست بدست آید (شبیه به غلظت خمیر پنکیک).",
      "فیله‌های ماهی را با دستمال کاغذی کاملاً خشک کنید و کمی نمک بپاشید.",
      "هر تکه فیله ماهی را ابتدا به کمی آرد خشک آغشته کنید، سپس کاملاً در خمیر آماده شده فرو ببرید تا تمام سطح ماهی پوشانده شود.",
      "وقتی روغن به دمای دوم رسید (180-190 درجه سانتی‌گراد)، سیب‌زمینی‌های نیم‌پز شده را دوباره به روغن اضافه کنید و به مدت 3-5 دقیقه دیگر سرخ کنید تا طلایی و برشته شوند. آنها را از روغن خارج کرده و بلافاصله نمک بپاشید.",
      "سپس، فیله‌های ماهی آغشته به خمیر را یکی یکی با دقت در روغن داغ قرار دهید (بیش از 2 تکه ماهی را همزمان سرخ نکنید).",
      "ماهی‌ها را به مدت 6-8 دقیقه سرخ کنید، هر چند دقیقه یک بار برگردانید تا از هر دو طرف طلایی و برشته شوند و ماهی کاملاً بپزد.",
      "ماهی‌های سرخ شده را از روغن خارج کرده و روی توری سیمی قرار دهید تا روغن اضافی آن خارج شود.",
      "ماهی و چیپس داغ را بلافاصله سرو کنید. همراه با لیمو ترش تازه و سرکه مالت سرو کنید."
    ],
    "name": "Fish and Chips (ماهی و چیپس - انگلستان)",
    "description": "Fish and Chips (ماهی و چیپس - انگلستان)",
    "id": "dish-1765570480557-ct19c-2",
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "name": "Biryani (بریانی پاکستانی)",
    "recipeSteps": [
      "برنج باسماتی را به مدت 30 دقیقه در آب سرد خیس کنید، سپس آبکش کرده و کنار بگذارید.",
      "در یک قابلمه بزرگ، آب را به همراه 1.5 قاشق غذاخوری نمک، هل، دارچین و برگ بو به جوش بیاورید. برنج خیس خورده را به آب جوش اضافه کنید و به مدت 5-7 دقیقه بپزید تا برنج حدود 70-80 درصد پخته شود. آبکش کنید و کنار بگذارید.",
      "در یک قابلمه بزرگ و گود، 0.5 پیمانه روغن را روی حرارت متوسط داغ کنید. پیازهای خلال شده را اضافه کرده و به مدت 10-15 دقیقه سرخ کنید تا طلایی و قهوه‌ای شوند. نیمی از پیازهای سرخ شده را برای تزئین بردارید و کنار بگذارید.",
      "مرغ را به پیازهای باقی‌مانده در قابلمه اضافه کنید و به مدت 5-7 دقیقه تفت دهید تا رنگ آن تغییر کند.",
      "خمیر زنجبیل و سیر را اضافه کرده و 2 دقیقه دیگر تفت دهید تا عطر آن بلند شود.",
      "گوجه فرنگی‌های خرد شده، فلفل سبز، پودر فلفل قرمز، پودر گشنیز، پودر زیره، پودر زردچوبه، گارام ماسالا و نمک را اضافه کنید. خوب هم بزنید و به مدت 5-7 دقیقه با حرارت متوسط بپزید تا گوجه فرنگی نرم شود و روغن جدا شود.",
      "ماست زده شده را اضافه کنید و بلافاصله هم بزنید تا ماست نبرد. حرارت را کم کرده و به مدت 10-15 دقیقه بپزید تا مرغ کمی نرم شود و سس غلیظ شود.",
      "سیب‌زمینی‌های مکعبی خرد شده (اگر استفاده می‌کنید)، برگ نعناع و گشنیز خرد شده را اضافه کنید و 5 دقیقه دیگر بپزید.",
      "زعفران ساییده شده را در 2 قاشق غذاخوری شیر گرم حل کنید و کنار بگذارید.",
      "در یک قابلمه سنگین و نسوز با ته ضخیم، ابتدا 1/3 از برنج نیم‌پز شده را در کف قابلمه پهن کنید. سپس نیمی از مایه مرغ را روی برنج بریزید و پخش کنید.",
      "لایه دوم برنج (1/3 باقی‌مانده) را روی مایه مرغ بریزید. سپس باقیمانده مایه مرغ را روی برنج پهن کنید.",
      "در نهایت، آخرین لایه برنج را روی مایه مرغ بریزید. زعفران حل شده در شیر را به آرامی روی لایه بالای برنج پخش کنید. می‌توانید کمی روغن حیوانی یا روغن نباتی هم روی برنج بریزید.",
      "درب قابلمه را با یک پارچه تمیز بپوشانید و محکم ببندید تا بخار خارج نشود. قابلمه را روی حرارت بالا به مدت 5 دقیقه قرار دهید، سپس حرارت را به کمترین درجه ممکن کاهش دهید و به مدت 30-40 دقیقه بریانی را دم کنید تا برنج کاملاً پخته و مرغ نرم شود.",
      "قبل از سرو، بریانی را به آرامی با یک کفگیر از کناره‌ها مخلوط کنید تا لایه‌ها به هم بخورند. با پیاز سرخ شده، برگ نعناع و گشنیز تازه تزئین کرده و با ماست یا سالاد شیرازی سرو کنید."
    ],
    "id": "dish-1765570480557-9rclp-3",
    "nationality": "pk",
    "description": "Biryani (پاکستانی - پاکستان)",
    "ingredients": [
      {
        "item": "برنج باسماتی",
        "unit": "پیمانه",
        "amount": 2.5
      },
      {
        "amount": 5.5,
        "item": "آب (برای برنج)",
        "unit": "پیمانه"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "نمک (برای برنج)",
        "amount": 1.5
      },
      {
        "amount": 3.5,
        "item": "هل سبز",
        "unit": "عدد"
      },
      {
        "unit": "تکه",
        "item": "چوب دارچین",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "برگ بو"
      },
      {
        "amount": 700,
        "unit": "گرم",
        "item": "مرغ (خرد شده)"
      },
      {
        "amount": 2,
        "item": "پیاز (بزرگ، خلال شده)",
        "unit": "عدد"
      },
      {
        "amount": 2,
        "item": "گوجه فرنگی (متوسط، خرد شده)",
        "unit": "عدد"
      },
      {
        "amount": 0.5,
        "item": "ماست پر چرب",
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "item": "خمیر زنجبیل و سیر",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "فلفل سبز تند",
        "amount": 2.5,
        "unit": "عدد"
      },
      {
        "unit": "قاشق چایخوری",
        "item": "پودر فلفل قرمز",
        "amount": 1
      },
      {
        "amount": 1.5,
        "unit": "قاشق چایخوری",
        "item": "پودر گشنیز"
      },
      {
        "unit": "قاشق چایخوری",
        "item": "پودر زیره",
        "amount": 1
      },
      {
        "unit": "قاشق چایخوری",
        "item": "پودر زردچوبه",
        "amount": 0.5
      },
      {
        "item": "گارام ماسالا",
        "amount": 1,
        "unit": "قاشق چایخوری"
      },
      {
        "item": "نمک (برای مایه مرغ)",
        "amount": 1.5,
        "unit": "قاشق چایخوری"
      },
      {
        "unit": "پیمانه",
        "item": "برگ نعناع تازه",
        "amount": 0.25
      },
      {
        "item": "گشنیز تازه",
        "unit": "پیمانه",
        "amount": 0.25
      },
      {
        "amount": 0.5,
        "item": "روغن نباتی یا حیوانی",
        "unit": "پیمانه"
      },
      {
        "item": "سیب‌زمینی (متوسط)",
        "unit": "عدد",
        "amount": 1
      },
      {
        "item": "زعفران",
        "unit": "قاشق چایخوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "شیر گرم"
      },
      {
        "item": "پیاز برشته شده (تزئین)",
        "unit": "پیمانه",
        "amount": 0.25
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "برگ نعناع و گشنیز"
      }
    ],
    "hasRealData": true,
    "category": "international",
    "calories": 400,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "nationality": "pk",
    "ingredients": [
      {
        "item": "گوشت چرخ کرده",
        "unit": "گرم",
        "amount": 700
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز (بسیار ریز خرد شده)"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "گوجه فرنگی (آب گرفته)"
      },
      {
        "amount": 2.5,
        "item": "فلفل سبز تند",
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "سیر (رنده شده)",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "زنجبیل (رنده شده)"
      },
      {
        "amount": 0.25,
        "item": "گشنیز تازه",
        "unit": "پیمانه"
      },
      {
        "item": "تخم گشنیز (کوبیده شده)",
        "unit": "قاشق غذاخوری",
        "amount": 1.5
      },
      {
        "item": "زیره سبز (کوبیده شده)",
        "unit": "قاشق چایخوری",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "قاشق چایخوری",
        "item": "فلفل قرمز خشک (پرک)"
      },
      {
        "item": "نمک",
        "amount": 1.5,
        "unit": "قاشق چایخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 3,
        "item": "آرد ذرت"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "amount": 1,
        "item": "دانه انار (اختیاری)",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "روغن نباتی"
      }
    ],
    "category": "international",
    "description": "Chapli Kebab (کباب چپلی - پاکستان)",
    "id": "dish-1765570480557-qu0gd-4",
    "name": "Chapli Kebab (کباب چپلی - پاکستان)",
    "hasRealData": true,
    "recipeSteps": [
      "در یک کاسه بزرگ، گوشت چرخ کرده را بریزید.",
      "پیاز خرد شده, گوجه فرنگی خرد شده (حتماً آب اضافی آن را بگیرید تا کباب وا نرود)، فلفل سبز خرد شده، سیر و زنجبیل رنده شده، گشنیز تازه خرد شده، تخم گشنیز کوبیده شده، زیره سبز کوبیده شده, پرک فلفل قرمز و نمک را به گوشت اضافه کنید.",
      "آرد ذرت (یا آرد نخودچی) و تخم مرغ زده شده را نیز اضافه کنید. اگر از دانه انار استفاده می‌کنید، در این مرحله اضافه کنید.",
      "تمام مواد را با دست به مدت 5-7 دقیقه به خوبی ورز دهید تا کاملاً با هم مخلوط شوند و حالت چسبندگی پیدا کنند. این کار به انسجام کباب‌ها کمک می‌کند.",
      "کاسه حاوی مایه کباب را با سلفون بپوشانید و به مدت حداقل 30 دقیقه (یا بهتر است 1-2 ساعت) در یخچال قرار دهید تا مواد به خورد هم بروند و مایه کباب سفت‌تر شود.",
      "روغن را در یک تابه بزرگ و نچسب روی حرارت متوسط داغ کنید.",
      "از مایه کباب به اندازه یک نارنگی برداشته و با دست به شکل یک دیسک صاف و نسبتاً نازک (حدود 0.5-1 سانتی‌متر ضخامت) با قطر حدود 8-10 سانتی‌متر فرم دهید. کباب‌های چپلی معمولاً کمی نامنظم و بزرگ هستند.",
      "کباب‌ها را یکی یکی و با فاصله در روغن داغ قرار دهید (بیش از 2-3 کباب همزمان سرخ نکنید تا دما افت نکند).",
      "به مدت 4-6 دقیقه از هر طرف سرخ کنید تا طلایی-قهوه‌ای و کاملاً پخته شوند. ممکن است نیاز باشد حرارت را کمی تنظیم کنید تا کباب‌ها نسوزند و مغز پخت شوند.",
      "کباب‌های سرخ شده را روی دستمال کاغذی قرار دهید تا روغن اضافی آن‌ها جذب شود.",
      "کباب چپلی را داغ و تازه همراه با نان تازه (مانند نان لواش یا چپاتی)، ماست یا سس سالسا و پیاز سرو کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "ru-1",
    "recipeSteps": [
      "چغندر و سبزیجات را بپزید.",
      "با خامه ترش سرو کنید."
    ],
    "name": "Borscht (بورش روسی)",
    "description": "سوپ قرمز با چغندر و خامه ترش",
    "category": "international",
    "nationality": "ru",
    "ingredients": [
      {
        "unit": "عدد",
        "item": "چغندر",
        "amount": 2
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گوشت را تفت دهید.",
      "با سس خامه و قارچ بپزید."
    ],
    "description": "نوارهای گوشت گوساله در سس خامه و قارچ",
    "nationality": "ru",
    "category": "international",
    "ingredients": [
      {
        "amount": 400,
        "item": "فیله گوساله",
        "unit": "گرم"
      }
    ],
    "id": "ru-2",
    "name": "Beef Stroganoff (بیف استروگانف روسی)",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 3,
        "item": "سیب زمینی",
        "unit": "عدد"
      }
    ],
    "id": "ua-1",
    "description": "دامپلینگ‌های پر شده با سیب‌زمینی یا آلبالو",
    "recipeSteps": [
      "سیب زمینی را بپزید و لای خمیر بگذارید.",
      "در آب جوش بپزید."
    ],
    "name": "Vareniki (وارنیکی اوکراینی)",
    "category": "international",
    "nationality": "ua",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "برنج را حداقل ۱ ساعت در آب سرد خیس کنید و سپس آبکش کنید.",
      "در یک قابلمه چدنی سنگین (kazan) یا یک قابلمه ضخیم و بزرگ، روغن را روی حرارت بالا داغ کنید تا کمی دود کند.",
      "تکه‌های گوشت را اضافه کنید و در چند نوبت سرخ کنید تا از همه طرف قهوه‌ای تیره شوند. گوشت‌ها را خارج کنید و کنار بگذارید.",
      "پیازهای خلالی را در همان روغن باقی‌مانده بریزید و روی حرارت متوسط سرخ کنید تا کاملاً طلایی تیره و کاراملی شوند (حدود ۱۰-۱۵ دقیقه). مراقب باشید نسوزند.",
      "گوشت‌های سرخ شده را دوباره به قابلمه برگردانید.",
      "هویج‌های خلالی شده را روی گوشت و پیاز بریزید. زیره سبز، تخم گشنیز و فلفل قرمز خشک را اضافه کنید. نمک (۱.۵ قاشق چایخوری) و فلفل سیاه را بپاشید.",
      "آب جوش را اضافه کنید تا روی مواد را بگیرد (حدود ۳.۵ پیمانه). اجازه دهید به جوش بیاید. حرارت را کم کرده و درب قابلمه را باز بگذارید. اجازه دهید این مخلوط (که به آن زیرواک 'Zirvak' می‌گویند) به مدت ۳۰-۴۰ دقیقه به آرامی بجوشد تا طعم‌ها با هم ترکیب شوند و آب کمی تبخیر شود.",
      "بعد از پخت زیرواک، سر سیر کامل را (بدون جدا کردن حبه‌ها) در مرکز مواد قرار دهید.",
      "برنج آبکش شده را به آرامی و به صورت یکنواخت روی زیرواک پخش کنید. روی برنج نمک (۰.۵ قاشق چایخوری) و کمی زیره سبز اضافه کنید.",
      "به آرامی ۴ پیمانه آب جوش را روی برنج بریزید تا روی برنج را بپوشاند. حرارت را زیاد کنید و اجازه دهید آب تبخیر شود و سطح برنج شروع به حفره حفره شدن کند. مراقب باشید که ته نگیرد.",
      "هنگامی که بیشتر آب جذب برنج شد و سطح برنج حفره حفره شد (حدود ۱۰-۱۵ دقیقه)، حرارت را بسیار کم کنید. با یک کفگیر، برنج را به آرامی از کناره‌ها به سمت مرکز جمع کنید تا یک تپه گنبدی شکل ایجاد شود.",
      "درب قابلمه را با یک پارچه تمیز و سپس با درب اصلی قابلمه محکم بپوشانید تا بخار به خوبی حفظ شود.",
      "پلوف را به مدت ۴۵-۶۰ دقیقه روی حرارت بسیار کم دم بگذارید تا برنج کاملاً پخته و نرم شود.",
      "بعد از دم کشیدن، درب را بردارید، سر سیر را خارج کنید. به آرامی برنج، گوشت و هویج را با یک کفگیر بزرگ مخلوط کنید.",
      "پلوف را بلافاصله در یک دیس بزرگ سرو کنید."
    ],
    "id": "dish-1765570490743-ph40q-4",
    "ingredients": [
      {
        "item": "گوشت گوسفند یا گوساله (مکعبی)",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "amount": 2,
        "unit": "پیمانه",
        "item": "برنج باسماتی"
      },
      {
        "unit": "عدد متوسط",
        "item": "پیاز (خلالی)",
        "amount": 2
      },
      {
        "item": "هویج (خلالی درشت)",
        "amount": 3.5,
        "unit": "عدد"
      },
      {
        "unit": "سر",
        "item": "سیر (سر کامل)",
        "amount": 1
      },
      {
        "unit": "پیمانه",
        "item": "روغن مایع",
        "amount": 1
      },
      {
        "unit": "پیمانه",
        "amount": 4,
        "item": "آب جوش"
      },
      {
        "unit": "قاشق چایخوری",
        "item": "زیره سبز درسته",
        "amount": 2
      },
      {
        "item": "تخم گشنیز درسته (اختیاری)",
        "amount": 1,
        "unit": "قاشق چایخوری"
      },
      {
        "unit": "عدد",
        "item": "فلفل قرمز خشک (چیلی) (اختیاری)",
        "amount": 1
      },
      {
        "amount": 2,
        "item": "نمک",
        "unit": "قاشق چایخوری"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چایخوری",
        "amount": 0.5
      }
    ],
    "nationality": "uz",
    "description": "Plov (پلوف - ازبکستان)",
    "hasRealData": true,
    "category": "international",
    "name": "Plov (پلوف - ازبکستان)",
    "calories": 400,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "recipeSteps": [
      "برنج را از ۸ ساعت قبل با ۴ پیمانه آب خیس کنید.",
      "برنج خیس‌خورده را به همراه آب آن و ۴ پیمانه آب تازه در قابلمه‌ای مناسب بریزید و روی حرارت متوسط قرار دهید.",
      "پس از جوش آمدن آب، حرارت را کم کرده و اجازه دهید برنج به آرامی بپزد تا کاملاً نرم و له شود و آب آن کشیده شود (حدود ۱ تا ۱.۵ ساعت). در طول پخت، هر از گاهی هم بزنید تا ته نگیرد.",
      "زمانی که برنج کاملاً له شد، شکر را اضافه کرده و خوب هم بزنید تا شکر حل شود. پس از افزودن شکر, شله‌زرد کمی رقیق می‌شود، بگذارید با حرارت ملایم به غلظت مطلوب برسد (حدود ۱۵-۲۰ دقیقه).",
      "گلاب، زعفران دم‌کرده و کره را اضافه کنید.",
      "خلال بادام را نیز اضافه کرده و برای ۵ دقیقه دیگر روی حرارت ملایم هم بزنید.",
      "قابلمه را از روی حرارت بردارید. در قابلمه را با دم‌کنی بپوشانید و برای ۱۰ دقیقه اجازه دهید شله‌زرد دم بکشد تا عطر گلاب و زعفران به خوبی در آن پخش شود.",
      "شله‌زرد آماده را در ظرف‌های مورد نظر بکشید و پس از خنک شدن کامل، با پودر دارچین و خلال پسته تزیین و سرو کنید."
    ],
    "hasRealData": true,
    "ingredients": [
      {
        "item": "برنج نیم‌دانه",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 2,
        "unit": "پیمانه",
        "item": "شکر"
      },
      {
        "item": "آب",
        "unit": "پیمانه",
        "amount": 8
      },
      {
        "item": "گلاب",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "زعفران دم‌کرده غلیظ",
        "unit": "قاشق غذاخوری",
        "amount": 4
      },
      {
        "item": "کره",
        "unit": "گرم",
        "amount": 50
      },
      {
        "item": "خلال بادام",
        "amount": 0.25,
        "unit": "پیمانه"
      },
      {
        "amount": 0,
        "item": "پودر دارچین (تزیین)",
        "unit": "به میزان لازم"
      },
      {
        "unit": "به میزان لازم",
        "item": "خلال پسته (تزیین)",
        "amount": 0
      }
    ],
    "id": "dish-1765580035983-c5mkp-1",
    "description": "شله‌زرد",
    "category": "dessert",
    "name": "شله‌زرد",
    "calories": 700,
    "cookTime": 105,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765580035983-ppx3a-2",
    "category": "dessert",
    "name": "فالوده شیرازی",
    "hasRealData": true,
    "description": "فالوده شیرازی",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 250,
        "item": "رشته فالوده"
      },
      {
        "amount": 1.5,
        "item": "شکر",
        "unit": "پیمانه"
      },
      {
        "amount": 3,
        "unit": "پیمانه",
        "item": "آب"
      },
      {
        "unit": "پیمانه",
        "item": "گلاب",
        "amount": 0.5
      },
      {
        "unit": "پیمانه",
        "item": "آبلیمو تازه",
        "amount": 0.25
      },
      {
        "amount": 0,
        "item": "یخ",
        "unit": "به میزان لازم"
      }
    ],
    "recipeSteps": [
      "ابتدا شربت فالوده را آماده کنید. شکر و آب را در قابلمه‌ای بریزید و روی حرارت متوسط قرار دهید. هم بزنید تا شکر کاملاً حل شود.",
      "پس از حل شدن شکر، اجازه دهید شربت برای ۵-۷ دقیقه بجوشد تا کمی غلیظ شود.",
      "قابلمه را از روی حرارت برداشته و گلاب را اضافه کنید، هم بزنید. شربت را کنار بگذارید تا کاملاً خنک شود.",
      "در یک قابلمه دیگر، آب زیادی را به جوش بیاورید. رشته‌های فالوده را به آب جوش اضافه کنید و اجازه دهید برای ۲-۳ دقیقه بپزند تا نرم شوند.",
      "رشته‌ها را بلافاصله آبکش کرده و زیر آب سرد بگیرید تا پخت آن‌ها متوقف شود و به هم نچسبند.",
      "رشته‌های آبکش‌شده و خنک را به شربت سرد شده اضافه کنید.",
      "در مرحله آخر، آبلیمو را به مخلوط اضافه کرده و خوب هم بزنید.",
      "فالوده را در فریزر برای حداقل ۳-۴ ساعت قرار دهید تا یخ بزند و حالت بلوری پیدا کند، اما کاملاً سفت نشود. هر از گاهی با چنگال هم بزنید تا از یکدست یخ زدن آن جلوگیری شود و حالت رشته‌ای حفظ شود.",
      "هنگام سرو، فالوده را در لیوان‌های مناسب بریزید و با کمی آبلیمو و در صورت تمایل، شربت آلبالو یا توت فرنگی سرو کنید."
    ],
    "calories": 580,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "حلوا",
    "name": "حلوا",
    "id": "dish-1765580035983-ict67-3",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "آرد گندم",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "شکر"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "آب"
      },
      {
        "item": "روغن مایع یا کره",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "گلاب"
      },
      {
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.5,
        "item": "پودر هل (اختیاری)"
      }
    ],
    "category": "dessert",
    "recipeSteps": [
      "ابتدا شربت حلوا را آماده کنید. شکر، آب، گلاب و پودر هل (در صورت استفاده) را در قابلمه‌ای بریزید و روی حرارت ملایم قرار دهید. هم بزنید تا شکر حل شود. نیازی به جوشاندن زیاد نیست، فقط گرم شود تا شکر حل شود.",
      "زعفران دم‌کرده را به شربت اضافه کرده و خوب هم بزنید. شربت را کنار بگذارید.",
      "در تابه‌ای با دیواره بلند، آرد را روی حرارت ملایم تفت دهید. به طور مداوم هم بزنید تا آرد از خامی خارج شده و رنگ آن کمی طلایی شود (حدود ۱۵-۲۰ دقیقه). مراقب باشید نسوزد.",
      "پس از اینکه آرد به رنگ دلخواه رسید، روغن مایع یا کره ذوب شده را به آن اضافه کنید و به خوبی هم بزنید تا آرد و روغن کاملاً مخلوط شوند و حالت خمیری پیدا کنند. برای ۵-۷ دقیقه دیگر با حرارت ملایم تفت دهید.",
      "تابه را از روی حرارت برداشته و شربت گرم را به تدریج به مخلوط آرد و روغن اضافه کنید، در حین اضافه کردن به سرعت و مداوم هم بزنید تا حلوا گلوله نشود و کاملاً یکدست شود.",
      "تابه را دوباره روی حرارت ملایم قرار دهید و حدود ۵-۷ دقیقه دیگر به هم زدن ادامه دهید تا حلوا جمع شود و از دیواره تابه جدا شود و به اصطلاح به روغن بیفتد.",
      "حلوا را در ظرف مورد نظر بکشید و با پشت قاشق صاف کنید. می‌توانید با قاشق یا ماسوره آن را تزیین کنید و با پودر پسته یا خلال بادام سرو نمایید."
    ],
    "hasRealData": true,
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "ابتدا ارده را در دمای محیط قرار دهید تا کمی رقیق و قابل مخلوط کردن شود.",
      "ارده را در یک کاسه بزرگ بریزید.",
      "پودر شکر و پودر هل را به ارده اضافه کنید.",
      "با استفاده از قاشق یا لیسک، مواد را به خوبی با هم مخلوط کنید تا یکدست و خمیری شکل شود. این مرحله ممکن است کمی زمان‌بر باشد و نیاز به هم زدن زیاد دارد تا شکر کاملاً در ارده حل شود و مخلوط لطیف و منسجم شود.",
      "نیمی از پسته خرد شده را به مخلوط حلوا ارده اضافه کرده و دوباره هم بزنید.",
      "یک ظرف مستطیلی کوچک (مانند قالب لوف) را با سلفون یا کاغذ روغنی بپوشانید به طوری که از اطراف آویزان باشد.",
      "مخلوط حلوا ارده را داخل قالب ریخته و با پشت قاشق یا دست به خوبی فشار دهید تا فشرده و صاف شود.",
      "باقیمانده پسته خرد شده را روی حلوا ارده بریزید و دوباره کمی فشار دهید تا پسته به سطح بچسبد.",
      "سلفون یا کاغذ روغنی را روی حلوا بپوشانید و قالب را برای حداقل ۴-۶ ساعت (یا یک شب) در یخچال قرار دهید تا حلوا سفت شود و خوب جا بیفتد.",
      "پس از سفت شدن، حلوا ارده را از قالب خارج کرده، سلفون را جدا کنید و به ابعاد دلخواه برش بزنید و سرو کنید."
    ],
    "ingredients": [
      {
        "item": "ارده",
        "amount": 1.5,
        "unit": "پیمانه"
      },
      {
        "item": "پودر شکر",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "پودر هل",
        "unit": "قاشق چایخوری"
      },
      {
        "item": "پسته خرد شده",
        "unit": "پیمانه",
        "amount": 0.25
      }
    ],
    "hasRealData": true,
    "name": "حلوا ارده",
    "id": "dish-1765580035983-v2txt-4",
    "description": "حلوا ارده",
    "category": "dessert",
    "calories": 580,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "description": "مسقطی",
    "recipeSteps": [
      "نشاسته گل را با ۲ پیمانه از آب سرد در یک کاسه بزرگ مخلوط کنید و خوب هم بزنید تا نشاسته کاملاً حل شود و هیچ گلوله‌ای باقی نماند. سپس از صافی رد کنید.",
      "مخلوط نشاسته و آب را به همراه ۳ پیمانه آب باقیمانده و شکر در قابلمه‌ای نچسب بریزید.",
      "قابلمه را روی حرارت ملایم قرار دهید و به طور مداوم و بدون توقف هم بزنید تا مخلوط شروع به غلیظ شدن کند و شفاف شود (حدود ۳۰-۴۰ دقیقه). بسیار مهم است که مدام هم بزنید تا ته نگیرد و گلوله نشود.",
      "زمانی که مسقطی شروع به غلیظ شدن و شفاف شدن کرد، گلاب، زعفران دم‌کرده و کره را اضافه کنید.",
      "خلال بادام یا پسته را نیز به مسقطی اضافه کنید و همچنان به هم زدن ادامه دهید تا مسقطی کاملاً غلیظ شود و از دیواره‌های قابلمه جدا شود (حدود ۱۵-۲۰ دقیقه دیگر).",
      "قابلمه را از روی حرارت بردارید.",
      "مسقطی آماده را بلافاصله در قالب‌های کوچک تک نفره یا یک ظرف پیرکس بزرگ که کمی چرب کرده‌اید، بریزید.",
      "سطح مسقطی را صاف کنید و با خلال پسته یا بادام تزیین کنید.",
      "اجازه دهید مسقطی در دمای محیط خنک شود، سپس آن را برای حداقل ۳-۴ ساعت در یخچال قرار دهید تا کاملاً سفت و جا افتاده شود.",
      "پس از خنک شدن کامل، مسقطی را به صورت لوزی یا مربع برش بزنید و سرو کنید."
    ],
    "id": "dish-1765580035983-ubmed-5",
    "name": "مسقطی",
    "category": "dessert",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 0.75,
        "item": "نشاسته گل (گندم)"
      },
      {
        "amount": 1.5,
        "item": "شکر",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "amount": 5,
        "item": "آب"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "گلاب"
      },
      {
        "amount": 3,
        "item": "زعفران دم‌کرده غلیظ",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 50,
        "unit": "گرم",
        "item": "کره"
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "خلال بادام یا پسته"
      }
    ],
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "مسقطی لاری",
    "name": "مسقطی لاری",
    "hasRealData": true,
    "ingredients": [
      {
        "amount": 100,
        "unit": "گرم",
        "item": "نشاسته گل"
      },
      {
        "amount": 150,
        "item": "شکر",
        "unit": "گرم"
      },
      {
        "item": "آب سرد",
        "unit": "پیمانه",
        "amount": 3
      },
      {
        "item": "گلاب",
        "unit": "پیمانه",
        "amount": 0.25
      },
      {
        "item": "روغن مایع یا کره",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 2
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.5,
        "item": "پودر هل سبز"
      },
      {
        "amount": 2,
        "item": "خلال بادام یا پسته برای تزیین",
        "unit": "قاشق غذاخوری"
      }
    ],
    "category": "dessert",
    "id": "dish-1765580041524-jraaw-1",
    "recipeSteps": [
      "ابتدا نشاسته را در 1 پیمانه از آب سرد حل کنید و خوب هم بزنید تا هیچ گلوله‌ای باقی نماند",
      "شکر و 2 پیمانه آب باقی‌مانده را در قابلمه‌ای نچسب روی حرارت ملایم قرار دهید و هم بزنید تا شکر حل شود",
      "محلول نشاسته را از صافی رد کنید و به مخلوط شکر و آب در قابلمه اضافه کنید",
      "حرارت را ملایم نگه دارید و مرتباً و به آرامی مواد را هم بزنید. این مرحله حدود 30 تا 45 دقیقه زمان می‌برد تا نشاسته کاملاً بپزد و شفاف و غلیظ شود و به اصطلاح از دیواره‌های قابلمه جدا شود",
      "وقتی مسقطی شروع به غلیظ شدن کرد، زعفران دم‌کرده، پودر هل، روغن مایع یا کره و گلاب را اضافه کنید و خوب مخلوط کنید",
      "هم زدن را ادامه دهید تا مسقطی به غلظت دلخواه برسد و شفاف شود. اگر بیش از حد غلیظ شد، کمی آب جوش اضافه کنید",
      "مسقطی آماده شده را در ظرف‌های سرو کوچک یا قالب مورد نظر بریزید و روی آن را با خلال بادام یا پسته تزیین کنید",
      "اجازه دهید در دمای محیط خنک شود، سپس حداقل 2 ساعت در یخچال قرار دهید تا کاملاً بگیرد و سفت شود",
      "سپس مسقطی را سرو کنید."
    ],
    "calories": 700,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "dessert",
    "id": "dish-1765580041524-kxn3t-2",
    "hasRealData": true,
    "ingredients": [
      {
        "amount": 250,
        "unit": "گرم",
        "item": "گندم مخصوص جوانه زدن (گندم بوجاری)"
      },
      {
        "item": "آرد گندم کامل (سبوس‌دار)",
        "unit": "گرم",
        "amount": 200
      },
      {
        "amount": 6,
        "unit": "پیمانه",
        "item": "آب سرد"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "روغن مایع (اختیاری)"
      }
    ],
    "description": "سمنو",
    "recipeSteps": [
      "ابتدا گندم‌ها را به مدت 2 روز در آب خیس کنید و در این مدت چند بار آب آن را عوض کنید",
      "سپس آب گندم‌ها را خالی کرده و آن‌ها را در یک سینی یا پارچه مرطوب پهن کنید. یک پارچه تمیز و مرطوب روی گندم‌ها بیندازید",
      "در طول 3 تا 5 روز آینده، پارچه را مرطوب نگه دارید و اجازه دهید گندم‌ها جوانه بزنند. وقتی جوانه‌ها حدود 1 تا 2 سانتی‌متر شدند، آماده هستند",
      "جوانه‌های گندم را همراه با ریشه‌ها کاملاً شسته و آن‌ها را در غذاساز یا چرخ گوشت بریزید و کاملاً له کنید تا شیره آن‌ها خارج شود",
      "مخلوط له شده گندم را با 3 پیمانه آب سرد مخلوط کنید و برای 15 دقیقه اجازه دهید بماند",
      "سپس این مخلوط را از یک صافی ریز یا پارچه تنظیف رد کنید و با دست فشار دهید تا تمام شیره گندم خارج شود. تفاله‌ها را دور بریزید",
      "آرد گندم را در یک قابلمه نچسب بزرگ ریخته و 3 پیمانه آب باقیمانده را به تدریج اضافه کنید و هم بزنید تا آرد کاملاً حل شود و هیچ گلوله‌ای باقی نماند",
      "شیره گندم صاف شده را به مخلوط آرد و آب در قابلمه اضافه کنید و خوب هم بزنید",
      "قابلمه را روی حرارت ملایم قرار دهید و مرتباً و به آرامی هم بزنید تا سمنو به جوش آید و غلیظ شود. این مرحله ممکن است 4 تا 6 ساعت طول بکشد",
      "هم زدن را ادامه دهید تا سمنو به رنگ قهوه‌ای تیره و غلظت فرنی برسد. ته گرفتن سمنو بسیار مهم است، پس مدام هم بزنید و حرارت را کم نگه دارید",
      "در صورت تمایل، در 15 دقیقه پایانی پخت، 1 قاشق غذاخوری روغن مایع را برای براق شدن سمنو اضافه کنید",
      "وقتی سمنو به غلظت دلخواه رسید، شعله را خاموش کنید و درب قابلمه را ببندید. برای 30 دقیقه روی حرارت کم یا با دم‌کنی اجازه دهید سمنو به آرامی دم بکشد تا جا بیفتد",
      "سمنو را در ظرف سرو بکشید و پس از خنک شدن با پودر پسته یا بادام تزیین کنید."
    ],
    "name": "سمنو",
    "calories": 500,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "ابتدا آرد برنج را در قابلمه‌ای نچسب بریزید",
      "شیر سرد را به تدریج به آرد برنج اضافه کنید و مرتباً هم بزنید تا آرد کاملاً در شیر حل شود و هیچ گلوله‌ای باقی نماند",
      "قابلمه را روی حرارت ملایم قرار دهید و شکر را اضافه کنید",
      "مخلوط را مرتباً و به آرامی هم بزنید تا شکر حل شود و فرنی شروع به غلیظ شدن کند. مهم است که از ته گرفتن فرنی جلوگیری شود",
      "وقتی فرنی به غلظت مناسب رسید (کمی رقیق‌تر از ماست)، گلاب و پودر هل (در صورت استفاده) را اضافه کرده و خوب مخلوط کنید",
      "یک دقیقه دیگر هم بزنید، سپس حرارت را خاموش کنید",
      "فرنی را بلافاصله در ظرف‌های سرو بریزید",
      "اجازه دهید در دمای محیط کمی خنک شود، سپس روی آن را با دارچین یا خلال پسته تزیین کرده و سرو کنید. می‌توانید گرم یا سرد میل کنید."
    ],
    "id": "dish-1765580041524-5edgr-3",
    "description": "فرنی",
    "ingredients": [
      {
        "amount": 4,
        "unit": "قاشق غذاخوری",
        "item": "آرد برنج"
      },
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "شیر سرد"
      },
      {
        "amount": 5,
        "item": "شکر",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "گلاب",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "item": "پودر هل (اختیاری)",
        "unit": "قاشق چایخوری",
        "amount": 0.25
      },
      {
        "unit": "به مقدار لازم",
        "amount": 0,
        "item": "دارچین یا خلال پسته برای تزیین"
      }
    ],
    "name": "فرنی",
    "category": "dessert",
    "hasRealData": true,
    "calories": 580,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "برنج را از حداقل 2 ساعت قبل یا یک شب، در آب خیس کنید",
      "آب برنج را خالی کنید و برنج را به همراه 2 پیمانه آب در قابلمه‌ای نچسب بریزید",
      "قابلمه را روی حرارت متوسط قرار دهید و اجازه دهید برنج بپزد تا آب آن تقریباً تبخیر شود و برنج کاملاً نرم و له شود",
      "شیر را به برنج پخته شده اضافه کنید و حرارت را کم کنید",
      "شکر را اضافه کرده و هم بزنید تا حل شود",
      "اجازه دهید شیربرنج به آرامی بپزد و مرتباً هم بزنید تا ته نگیرد و شیر غلیظ شود و برنج کاملاً با شیر مخلوط شود. این مرحله حدود 45 دقیقه تا 1 ساعت زمان می‌برد",
      "در 10 دقیقه پایانی پخت، گلاب، کره (در صورت استفاده) و پودر هل (در صورت استفاده) را اضافه کنید و خوب مخلوط کنید",
      "هم زدن را ادامه دهید تا شیربرنج به غلظت دلخواه برسد. برای سرو، شیربرنج باید کمی رقیق‌تر از فرنی باشد زیرا بعد از سرد شدن سفت‌تر می‌شود",
      "حرارت را خاموش کنید و شیربرنج را در ظرف‌های سرو بکشید",
      "می‌توانید شیربرنج را گرم یا سرد با دارچین، عسل، مربا یا پودر پسته سرو کنید."
    ],
    "id": "dish-1765580041524-a8mt1-4",
    "name": "شیربرنج",
    "hasRealData": true,
    "description": "شیربرنج",
    "ingredients": [
      {
        "item": "برنج نیم‌دانه یا ایرانی",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "item": "آب",
        "amount": 2,
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "شیر پرچرب",
        "amount": 4
      },
      {
        "unit": "پیمانه",
        "amount": 0.6,
        "item": "شکر"
      },
      {
        "item": "گلاب",
        "unit": "قاشق غذاخوری",
        "amount": 3
      },
      {
        "amount": 1,
        "item": "کره (اختیاری)",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.25,
        "item": "پودر هل (اختیاری)"
      },
      {
        "item": "دارچین، عسل، یا مربا برای سرو",
        "amount": 0,
        "unit": "به مقدار لازم"
      }
    ],
    "category": "dessert",
    "calories": 700,
    "cookTime": 105,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "کاچی",
    "hasRealData": true,
    "category": "dessert",
    "recipeSteps": [
      "ابتدا شربت کاچی را آماده کنید: شکر، آب، زعفران دم‌کرده، زردچوبه، پودر هل و پودر زنجبیل (در صورت استفاده) را در قابلمه‌ای کوچک بریزید و روی حرارت ملایم قرار دهید",
      "هم بزنید تا شکر کاملاً حل شود و مخلوط کمی گرم شود (نیاز به جوش آمدن نیست). سپس گلاب را اضافه کرده و از روی حرارت بردارید",
      "در یک قابلمه نچسب دیگر, کره را روی حرارت ملایم آب کنید",
      "آرد را به کره اضافه کنید و مرتباً و به آرامی هم بزنید. آرد را به مدت 10 تا 15 دقیقه تفت دهید تا بوی خامی آن گرفته شود و کمی تغییر رنگ دهد و طلایی شود (نباید تیره شود)",
      "قابلمه آرد تفت داده شده را از روی حرارت بردارید و شربت آماده شده را به آرامی و کم‌کم به آن اضافه کنید، در حین اضافه کردن مرتباً و با سرعت هم بزنید تا آرد گلوله نشود و کاچی یکدست شود",
      "قابلمه را دوباره روی حرارت ملایم قرار دهید و به هم زدن ادامه دهید تا کاچی غلیظ شود و از دیواره‌های قابلمه جدا شود و به روغن بیفتد. این مرحله حدود 5 تا 10 دقیقه طول می‌کشد",
      "وقتی کاچی به غلظت فرنی غلیظ رسید، حرارت را خاموش کنید",
      "کاچی را بلافاصله در ظرف سرو بکشید و روی آن را با پودر دارچین و در صورت تمایل، خلال بادام یا پسته تزیین کرده و گرم سرو کنید."
    ],
    "ingredients": [
      {
        "item": "آرد گندم کامل یا آرد سفید",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "کره حیوانی یا روغن جامد",
        "amount": 50,
        "unit": "گرم"
      },
      {
        "item": "شکر",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "آب"
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "گلاب"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 2
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چایخوری",
        "amount": 0.5
      },
      {
        "amount": 0.25,
        "unit": "قاشق چایخوری",
        "item": "پودر هل"
      },
      {
        "unit": "قاشق چایخوری",
        "item": "پودر زنجبیل (اختیاری)",
        "amount": 0.25
      },
      {
        "amount": 0,
        "unit": "به مقدار لازم",
        "item": "پودر دارچین (تزیین)"
      }
    ],
    "name": "کاچی",
    "id": "dish-1765580041524-zut0p-5",
    "calories": 700,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "باسلوق",
    "recipeSteps": [
      "ابتدا نشاسته گل را در ۱/۲ پیمانه آب سرد حل کنید تا کاملا یکدست شود و هیچ گلوله‌ای باقی نماند.",
      "باقی‌مانده آب (۱ پیمانه) و شکر را در یک قابلمه نچسب ریخته و روی حرارت ملایم قرار دهید تا شکر حل شود. نیازی به جوشیدن زیاد نیست.",
      "مخلوط نشاسته و آب را به قابلمه شکر و آب اضافه کنید. حرارت را ملایم نگه دارید و مدام هم بزنید تا نشاسته غلیظ شود و به شکل خمیری شفاف درآید. این مرحله حدود ۱۵-۲۰ دقیقه طول می‌کشد.",
      "وقتی خمیر غلیظ و شفاف شد، گلاب و کره را اضافه کنید و خوب هم بزنید تا کره کاملا جذب شود. سپس مغزهای خرد شده را اضافه کرده و برای ۵ دقیقه دیگر هم بزنید.",
      "قابلمه را از روی حرارت بردارید و اجازه دهید باسلوق کمی خنک شود تا قابل فرم دادن باشد.",
      "پودر نارگیل را در یک سینی پهن کنید. از خمیر باسلوق به اندازه یک گردو برداشته، در دست گرد کنید و در پودر نارگیل بغلتانید تا کاملا پوشیده شود. می‌توانید به شکل لوله‌ای نیز فرم دهید.",
      "باسلوق‌های آماده شده را در ظرف دربسته و در یخچال نگهداری کنید تا سفت شوند. حداقل ۴-۵ ساعت یا یک شب در یخچال بمانند تا طعم و بافت بهتری پیدا کنند."
    ],
    "id": "dish-1765580045208-fogau-1",
    "category": "dessert",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "نشاسته گل",
        "unit": "گرم",
        "amount": 100
      },
      {
        "item": "شکر",
        "unit": "گرم",
        "amount": 150
      },
      {
        "unit": "پیمانه",
        "amount": 1.5,
        "item": "آب سرد"
      },
      {
        "unit": "پیمانه",
        "item": "گلاب",
        "amount": 0.25
      },
      {
        "item": "کره",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "unit": "پیمانه",
        "amount": 0.25,
        "item": "خلال بادام یا گردو خرد شده"
      },
      {
        "item": "پودر نارگیل (روکش)",
        "amount": 0,
        "unit": "به مقدار لازم"
      }
    ],
    "name": "باسلوق",
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "رنگینک (خرما و آرد)",
    "ingredients": [
      {
        "item": "خرمای هسته گرفته",
        "unit": "گرم",
        "amount": 300
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "آرد گندم"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "روغن مایع یا کره"
      },
      {
        "amount": 1,
        "unit": "قاشق چایخوری",
        "item": "پودر دارچین"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چایخوری",
        "item": "پودر هل"
      },
      {
        "amount": 0,
        "item": "مغز گردو (داخل خرما)",
        "unit": "به مقدار لازم"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "پودر پسته یا نارگیل (تزئین)",
        "amount": 1
      }
    ],
    "id": "dish-1765580045208-gvsd2-2",
    "recipeSteps": [
      "ابتدا هسته خرماها را خارج کرده و به جای آن یک تکه کوچک مغز گردو قرار دهید. خرماهای آماده شده را کنار بگذارید.",
      "در یک ماهیتابه مناسب، آرد گندم را روی حرارت ملایم تفت دهید. آرد را مرتب هم بزنید تا بوی خامی آن گرفته شود و رنگ آن کمی تغییر کند (حدود ۱۰-۱۵ دقیقه). مواظب باشید نسوزد.",
      "روغن مایع یا کره را به آرد اضافه کنید و هم بزنید. تفت دادن را ادامه دهید تا آرد و روغن به خوبی مخلوط شده و رنگ آرد طلایی مایل به قهوه‌ای شود. این مرحله نیاز به دقت دارد تا آرد نسوزد.",
      "پس از اینکه آرد به رنگ دلخواه رسید، ماهیتابه را از روی حرارت بردارید و پودر دارچین و پودر هل را به آن اضافه کنید و خوب مخلوط نمایید.",
      "یک ظرف مناسب برای سرو انتخاب کنید و کف آن را با کمی از مخلوط آرد و روغن بپوشانید. سپس خرماهای آماده شده را به صورت منظم روی آن بچینید.",
      "باقی‌مانده مخلوط آرد و روغن داغ را به آرامی و به صورت یکنواخت روی خرماها بریزید تا کاملا پوشانده شوند.",
      "اجازه دهید رنگینک کمی خنک شود. سپس روی آن را با پودر پسته یا پودر نارگیل تزئین کرده و برش بزنید. می‌توانید آن را به صورت گرم یا سرد سرو کنید."
    ],
    "hasRealData": true,
    "category": "dessert",
    "name": "رنگینک (خرما و آرد)",
    "calories": 620,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "ابتدا خمیرمایه و ۱ قاشق چایخوری از شکر را به شیر ولرم اضافه کرده، کمی هم بزنید و به مدت ۱۰ دقیقه کنار بگذارید تا خمیرمایه فعال شده و روی آن حباب ظاهر شود.",
      "در یک کاسه بزرگ، آرد، نمک و باقی‌مانده شکر را مخلوط کنید.",
      "تخم مرغ، روغن مایع و مخلوط خمیرمایه فعال شده را به مواد خشک اضافه کنید و خوب ورز دهید تا خمیر لطیف و یکدستی به دست آید. اگر خمیر چسبناک بود، کمی آرد اضافه کنید.",
      "خمیر را در کاسه‌ای که کمی چرب کرده‌اید قرار دهید، روی آن را با سلفون یا پارچه بپوشانید و در جای گرم به مدت ۱ تا ۱.۵ ساعت استراحت دهید تا حجم آن دو برابر شود.",
      "پس از استراحت، پف خمیر را بگیرید و آن را به ۴ قسمت مساوی تقسیم کنید. هر قسمت را به شکل گرد یا بیضی با ضخامت حدود ۱.۵ سانتی‌متر فرم دهید.",
      "کماج‌های فرم داده شده را در سینی فر که با کاغذ روغنی پوشانده‌اید با فاصله بچینید. با یک چاقوی تیز چند برش سطحی روی کماج‌ها ایجاد کنید.",
      "زرده تخم مرغ را با ۱ قاشق چایخوری شیر یا آب مخلوط کرده و با قلمو روی کماج‌ها بمالید. سپس روی آنها کنجد بپاشید.",
      "فر را از قبل با دمای ۱۸۰ درجه سانتی‌گراد گرم کنید. سینی را در فر قرار داده و به مدت ۲۰ تا ۲۵ دقیقه یا تا زمانی که کماج‌ها طلایی و پخته شوند، بپزید. می‌توانید برای طلایی شدن روی کماج، چند دقیقه گریل را روشن کنید.",
      "کماج‌های پخته شده را از فر خارج کرده و روی توری خنک کننده قرار دهید."
    ],
    "hasRealData": true,
    "category": "dessert",
    "name": "کماج سنندجی",
    "id": "dish-1765580045208-y3d5v-3",
    "description": "کماج سنندجی",
    "ingredients": [
      {
        "amount": 2.5,
        "item": "آرد گندم",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "شیر ولرم",
        "amount": 0.5
      },
      {
        "amount": 50,
        "item": "شکر",
        "unit": "گرم"
      },
      {
        "item": "تخم مرغ",
        "unit": "عدد",
        "amount": 1
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "روغن مایع"
      },
      {
        "amount": 1,
        "item": "خمیرمایه فوری",
        "unit": "قاشق چایخوری"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.5,
        "item": "نمک"
      },
      {
        "item": "کنجد (روکش)",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "زرده تخم مرغ (رومال)",
        "amount": 1,
        "unit": "عدد"
      }
    ],
    "calories": 580,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765580045208-4a4q0-4",
    "name": "قطاب",
    "category": "dessert",
    "description": "قطاب",
    "hasRealData": true,
    "recipeSteps": [
      "برای تهیه خمیر: در یک کاسه، تخم مرغ را با چنگال هم بزنید. ماست، روغن جامد آب شده (یا کره نرم) و بیکینگ پودر را اضافه کرده و مخلوط کنید.",
      "آرد را کم کم به مواد اضافه کرده و ورز دهید تا خمیری لطیف و یکدست به دست آید که به دست نمی‌چسبد. بیش از حد ورز ندهید. روی خمیر را با سلفون پوشانده و به مدت ۳۰ دقیقه در دمای محیط استراحت دهید.",
      "برای تهیه مواد میانی: پودر بادام (یا گردو)، پودر قند و پودر هل را در کاسه‌ای مخلوط کنید.",
      "پس از استراحت، خمیر را با وردنه روی سطح آردپاشی شده به ضخامت ۲-۳ میلی‌متر باز کنید. با دهانه لیوان یا کاتر گرد، دایره‌هایی به قطر ۵-۶ سانتی‌متر برش بزنید.",
      "مقدار کمی از مواد میانی را در مرکز هر دایره قرار دهید. لبه‌های خمیر را به هم بچسبانید و به شکل نیم‌دایره یا لوله‌ای فرم دهید و لبه‌ها را با انگشت یا چنگال محکم کنید تا هنگام سرخ شدن باز نشوند.",
      "روغن مایع را در تابه‌ای گود روی حرارت متوسط داغ کنید. قطاب‌ها را به آرامی در روغن داغ قرار دهید و با حرارت ملایم تا متوسط سرخ کنید تا دو طرف آنها طلایی شود.",
      "قطاب‌های سرخ شده را روی دستمال کاغذی قرار دهید تا روغن اضافی آنها گرفته شود. پس از اینکه کمی خنک شدند، آنها را در پودر قند فراوان بغلتانید تا کاملا پوشیده شوند."
    ],
    "ingredients": [
      {
        "amount": 250,
        "item": "آرد گندم",
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "item": "ماست",
        "amount": 0.5
      },
      {
        "item": "روغن جامد یا کره",
        "amount": 50,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "amount": 0.5,
        "item": "بیکینگ پودر",
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 100,
        "item": "پودر بادام",
        "unit": "گرم"
      },
      {
        "unit": "گرم",
        "amount": 50,
        "item": "پودر قند"
      },
      {
        "unit": "قاشق چایخوری",
        "item": "پودر هل",
        "amount": 0.5
      },
      {
        "item": "روغن مایع (سرخ کردن)",
        "unit": "به مقدار لازم",
        "amount": 0
      },
      {
        "amount": 0,
        "unit": "به مقدار لازم",
        "item": "پودر قند (روکش)"
      }
    ],
    "calories": 620,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "category": "dessert",
    "name": "باقلوا یزدی",
    "description": "باقلوا یزدی",
    "recipeSteps": [
      "برای تهیه خمیر: تخم مرغ, شیر، روغن مایع، پودر قند و بیکینگ پودر را در کاسه‌ای مخلوط کنید. آرد را کم کم اضافه کرده و ورز دهید تا خمیری نرم و لطیف به دست آید. خمیر را به ۸-۱۰ قسمت مساوی تقسیم کرده، روی آنها را بپوشانید و ۲۰ دقیقه استراحت دهید.",
      "برای تهیه مواد میانی: پودر بادام (یا پسته)، پودر قند و پودر هل را مخلوط کنید.",
      "برای تهیه شربت: شکر و آب را در قابلمه‌ای روی حرارت قرار دهید. وقتی شکر حل شد و شروع به جوشیدن کرد، گلاب و زعفران دم کرده را اضافه کرده و اجازه دهید ۵ دقیقه دیگر بجوشد. سپس از روی حرارت بردارید و بگذارید خنک شود.",
      "فر را از قبل با دمای ۱۷۰ درجه سانتی‌گراد گرم کنید. یک سینی فر مستطیلی با ابعاد حدود ۱۵x۲۰ سانتی‌متر را با کره آب شده چرب کنید.",
      "هر قسمت از خمیر را روی سطح آردپاشی شده با وردنه بسیار نازک (در حد کاغذ) باز کنید، به طوری که کمی از ابعاد سینی بزرگ‌تر باشد. می‌توانید برای نازک کردن بیشتر از دستگاه پاستا نیز استفاده کنید.",
      "۳-۴ لایه از خمیر باز شده را روی هم در سینی قرار دهید و بین هر لایه را با کره آب شده یا روغن مایع چرب کنید.",
      "یک لایه ضخیم از مواد میانی (پودر بادام/پسته) را روی خمیرها پخش کنید.",
      "۴-۵ لایه دیگر از خمیر باز شده را روی مواد میانی قرار دهید و بین هر لایه را مجددا با کره یا روغن چرب کنید.",
      "باقلوا را به شکل مربع یا لوزی برش بزنید. روی باقلوا را با باقی‌مانده کره آب شده چرب کنید.",
      "سینی را به مدت ۳۰-۴۰ دقیقه در فر از قبل گرم شده بپزید تا باقلوا طلایی و مغز پخت شود.",
      "پس از خارج کردن باقلوا از فر، بلافاصله شربت خنک شده را روی باقلوا داغ بریزید تا جذب شود. اجازه دهید باقلوا کاملا خنک شده و شربت به خورد آن برود (حداقل چند ساعت یا یک شب)."
    ],
    "id": "dish-1765580045208-2liah-5",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 250,
        "item": "آرد گندم"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "amount": 0.25,
        "item": "شیر ولرم",
        "unit": "پیمانه"
      },
      {
        "item": "روغن مایع",
        "amount": 0.25,
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "item": "پودر قند",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چایخوری",
        "item": "بیکینگ پودر"
      },
      {
        "amount": 150,
        "item": "پودر بادام یا پسته",
        "unit": "گرم"
      },
      {
        "item": "پودر قند (میانی)",
        "unit": "گرم",
        "amount": 100
      },
      {
        "item": "پودر هل",
        "amount": 1,
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 200,
        "unit": "گرم",
        "item": "شکر (شربت)"
      },
      {
        "item": "آب",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "گلاب",
        "unit": "پیمانه",
        "amount": 0.25
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم کرده",
        "amount": 1
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "کره آب شده (چرب کردن)"
      }
    ],
    "hasRealData": true,
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765580051029-w4sbw-1",
    "description": "سوتیچ",
    "category": "dessert",
    "ingredients": [
      {
        "amount": 1,
        "item": "شیر پرچرب",
        "unit": "لیتر"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "آرد برنج"
      },
      {
        "item": "شکر",
        "amount": 120,
        "unit": "گرم"
      },
      {
        "amount": 4,
        "item": "گلاب",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چایخوری",
        "item": "پودر هل"
      },
      {
        "amount": 50,
        "item": "کره",
        "unit": "گرم"
      },
      {
        "unit": "به مقدار لازم",
        "amount": 0,
        "item": "پودر دارچین (تزیین)"
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "در یک قابلمه مناسب، شیر سرد را بریزید.",
      "آرد برنج را به شیر اضافه کرده و با همزن دستی خوب مخلوط کنید تا آرد کاملا در شیر حل شود و هیچ گلوله‌ای باقی نماند.",
      "شکر و پودر هل را به مخلوط شیر و آرد اضافه کنید و دوباره هم بزنید.",
      "قابلمه را روی حرارت ملایم قرار دهید و مدام با قاشق چوبی یا لیسک هم بزنید تا ته نگیرد و غلیظ شود.",
      "حدود ۱۵ تا ۲۰ دقیقه زمان می‌برد تا سوتیچ به غلظت فرنی برسد. مهم است که هم زدن را متوقف نکنید تا یکدست بماند.",
      "زمانی که سوتیچ شروع به غلیظ شدن کرد، گلاب و کره را اضافه کنید و هم بزنید تا کره ذوب شود و به خوبی با مواد ترکیب شود.",
      "بعد از اضافه کردن کره و گلاب، ۵ دقیقه دیگر به هم زدن ادامه دهید تا کاملا غلیظ و براق شود.",
      "از روی حرارت بردارید و بلافاصله سوتیچ داغ را در ظرف‌های سرو تک نفره یا یک کاسه بزرگ بریزید.",
      "اجازه دهید به دمای محیط برسد، سپس حداقل ۲ تا ۳ ساعت در یخچال قرار دهید تا کاملا خنک و سفت شود.",
      "قبل از سرو، با پودر دارچین، خلال بادام یا پسته تزیین کنید."
    ],
    "name": "سوتیچ",
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "ابتدا شربت حلوا را آماده کنید: آب و شکر را در یک قابلمه کوچک بریزید و روی حرارت ملایم قرار دهید. هم بزنید تا شکر کاملا حل شود. نیازی به جوشاندن زیاد نیست.",
      "بعد از حل شدن شکر، قابلمه را از روی حرارت بردارید و گلاب و زعفران دم کرده را اضافه کنید و هم بزنید. شربت را کنار بگذارید تا کمی خنک شود.",
      "در یک تابه بزرگ و با کف ضخیم، آرد را الک کنید. تابه را روی حرارت ملایم قرار دهید و آرد را بدون روغن حدود ۱۵ تا ۲۰ دقیقه تفت دهید تا بوی خامی آرد گرفته شود و رنگ آن کمی تغییر کند و کرمی رنگ شود. مراقب باشید نسوزد و مدام هم بزنید.",
      "پس از تفت خوردن آرد، روغن مایع و کره را به آن اضافه کنید و به مدت ۱۵ تا ۲۰ دقیقه دیگر با حرارت ملایم تفت دهید تا آرد کاملا طلایی و خوشرنگ شود. هر چه بیشتر تفت دهید، رنگ حلوا تیره‌تر می‌شود. هم زدن را ادامه دهید تا آرد گلوله نشود.",
      "وقتی آرد به رنگ دلخواه رسید، تابه را از روی حرارت برداشته و شربت ولرم را در سه مرحله به آرد اضافه کنید. هر بار که شربت را اضافه می‌کنید، بلافاصله و به سرعت هم بزنید تا شربت کاملا جذب آرد شود و حلوا گلوله نشود.",
      "پس از اضافه کردن تمام شربت، تابه را دوباره روی حرارت ملایم قرار دهید و به مدت ۵ تا ۱۰ دقیقه دیگر هم بزنید تا حلوا کاملا جمع شود و به دیواره‌های تابه نچسبد (این مرحله را گهواره کردن حلوا می‌گویند).",
      "حلوا را در دیس مورد نظر بکشید و با پشت قاشق یا کاردک آن را صاف کنید. سپس با پشت قاشق یا ماسوره به دلخواه تزیین کنید و با خلال بادام یا پسته تزیین کنید."
    ],
    "description": "حلوای زعفرانی",
    "hasRealData": true,
    "id": "dish-1765580051029-u7mm8-2",
    "category": "dessert",
    "name": "حلوای زعفرانی",
    "ingredients": [
      {
        "amount": 1.5,
        "item": "آرد گندم",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "amount": 1.5,
        "item": "شکر"
      },
      {
        "item": "آب",
        "amount": 2,
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "گلاب"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "زعفران دم کرده غلیظ"
      },
      {
        "unit": "پیمانه",
        "item": "روغن مایع",
        "amount": 1
      },
      {
        "item": "کره",
        "unit": "گرم",
        "amount": 50
      }
    ],
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765580051029-spi7w-3",
    "hasRealData": true,
    "description": "کاچی بادامی",
    "recipeSteps": [
      "ابتدا شربت کاچی را آماده کنید: آب و شکر را در قابلمه ریخته و روی حرارت ملایم قرار دهید تا شکر حل شود. پس از حل شدن شکر، گلاب و زعفران دم کرده را اضافه کرده و هم بزنید. شربت را کنار بگذارید.",
      "در یک قابلمه با کف ضخیم، کره را روی حرارت ملایم ذوب کنید.",
      "آرد را الک کرده و به کره ذوب شده اضافه کنید. با حرارت ملایم به مدت ۱۵ تا ۲۰ دقیقه تفت دهید تا بوی خامی آرد گرفته شده و رنگ آن کمی طلایی شود.",
      "خلال بادام را در ۱۰ دقیقه پایانی تفت دادن آرد، به آن اضافه کرده و همراه با آرد کمی تفت دهید تا خلال بادام نیز عطر و طعم بهتری پیدا کند.",
      "بعد از تفت خوردن آرد و بادام، قابلمه را از روی حرارت بردارید.",
      "شربت ولرم را به آرمانی و در چند مرحله به مخلوط آرد و کره اضافه کنید و بلافاصله و به سرعت هم بزنید تا مواد یکدست شوند و هیچ گلوله‌ای تشکیل نشود.",
      "قابلمه را دوباره روی حرارت ملایم قرار دهید و به مدت ۵ تا ۱۰ دقیقه دیگر به هم زدن ادامه دهید تا کاچی غلیظ شده و به روغن بیفتد و از کناره‌های قابلمه جدا شود.",
      "کاچی آماده شده را در ظرف‌های سرو بکشید. می‌توانید با پودر پسته، نارگیل یا خلال بادام تزیین کنید. بهتر است گرم سرو شود."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "آرد گندم"
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "شکر"
      },
      {
        "item": "آب",
        "amount": 3,
        "unit": "پیمانه"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "گلاب"
      },
      {
        "item": "زعفران دم کرده غلیظ",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "کره",
        "amount": 150,
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "item": "خلال بادام",
        "amount": 0.5
      },
      {
        "amount": 0,
        "unit": "به مقدار لازم",
        "item": "پودر پسته یا نارگیل (تزیین)"
      }
    ],
    "category": "dessert",
    "name": "کاچی بادامی",
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "name": "دسر مشکوفی",
    "id": "dish-1765580051029-3c39y-4",
    "description": "دسر مشکوفی",
    "ingredients": [
      {
        "unit": "لیتر",
        "amount": 1,
        "item": "شیر پرچرب"
      },
      {
        "amount": 6,
        "unit": "قاشق غذاخوری",
        "item": "نشاسته گندم یا ذرت"
      },
      {
        "item": "شکر",
        "amount": 180,
        "unit": "گرم"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 4,
        "item": "گلاب"
      },
      {
        "unit": "گرم",
        "amount": 50,
        "item": "کره"
      },
      {
        "item": "زعفران دم کرده (اختیاری)",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "وانیل (اختیاری)",
        "amount": 0.25,
        "unit": "قاشق چایخوری"
      },
      {
        "item": "خلال پسته (تزیین)",
        "unit": "به مقدار لازم",
        "amount": 0
      }
    ],
    "recipeSteps": [
      "نشاسته را در یک کاسه کوچک با ۱ پیمانه از شیر سرد مخلوط کنید و خوب هم بزنید تا نشاسته کاملا در شیر حل شود و هیچ گلوله‌ای باقی نماند. این کار برای جلوگیری از گلوله شدن نشاسته در هنگام پخت است.",
      "در یک قابلمه مناسب، ۳ پیمانه شیر باقیمانده، شکر، گلاب و در صورت تمایل زعفران دم کرده و وانیل را بریزید.",
      "قابلمه را روی حرارت ملایم قرار دهید و هم بزنید تا شکر حل شود و شیر شروع به گرم شدن کند.",
      "مخلوط شیر و نشاسته حل شده را به آرمانی و در حین هم زدن به شیر داخل قابلمه اضافه کنید.",
      "به طور مداوم و بدون وقفه هم بزنید. از همزن دستی استفاده کنید تا ته نگیرد و یکدست شود.",
      "به هم زدن ادامه دهید تا مشکوفی شروع به غلیظ شدن کند و به غلظتی شبیه فرنی برسد. این فرآیند حدود ۱۵ تا ۲۰ دقیقه طول می‌کشد.",
      "زمانی که مشکوفی به غلظت دلخواه رسید و کمی کشدار شد، کره را اضافه کنید و هم بزنید تا کره ذوب شده و به خوبی با مواد ترکیب شود.",
      "بعد از اضافه کردن کره، حدود ۲ تا ۳ دقیقه دیگر هم بزنید و سپس قابلمه را از روی حرارت بردارید.",
      "بلافاصله مشکوفی را در ظرف‌های سرو تک نفره یا یک کاسه بزرگ بریزید.",
      "اجازه دهید مشکوفی به دمای محیط برسد، سپس حداقل ۴ تا ۶ ساعت در یخچال قرار دهید تا کاملا خنک و سفت شود.",
      "قبل از سرو، با خلال پسته، بادام یا پودر پسته و دارچین تزیین کنید."
    ],
    "category": "dessert",
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "description": "باقلوای تبریزی",
    "ingredients": [
      {
        "amount": 250,
        "unit": "گرم",
        "item": "آرد گندم"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "تخم مرغ"
      },
      {
        "unit": "پیمانه",
        "amount": 0.25,
        "item": "شیر ولرم"
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "روغن مایع"
      },
      {
        "amount": 50,
        "unit": "گرم",
        "item": "کره ذوب شده"
      },
      {
        "item": "پودر قند",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.5,
        "item": "بکینگ پودر"
      },
      {
        "item": "نمک",
        "unit": "قاشق چایخوری",
        "amount": 0.1
      },
      {
        "amount": 1,
        "item": "آب",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "گردوی خرد شده",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "پودر پسته"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.5,
        "item": "پودر هل"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "شکر"
      },
      {
        "item": "گلاب",
        "unit": "پیمانه",
        "amount": 0.25
      },
      {
        "item": "آب لیمو تازه",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "قاشق چایخوری",
        "item": "زعفران دم کرده"
      },
      {
        "item": "خلال پسته (تزیین)",
        "unit": "به مقدار لازم",
        "amount": 0
      }
    ],
    "id": "dish-1765580059330-lmvvd-1",
    "name": "باقلوای تبریزی",
    "category": "dessert",
    "recipeSteps": [
      "برای تهیه خمیر: آرد، بکینگ پودر، پودر قند و نمک را مخلوط کنید.",
      "تخم مرغ، شیر، روغن مایع و آب را اضافه کرده و خوب ورز دهید تا خمیر لطیفی به دست آید.",
      "خمیر را به ۶ چانه مساوی تقسیم کرده و روی آن را پوشانده، ۳۰ دقیقه استراحت دهید.",
      "در این فاصله، برای تهیه شربت: شکر و ۱/۲ پیمانه آب را در قابلمه ریخته و روی حرارت ملایم قرار دهید تا شکر حل شود.",
      "پس از جوش آمدن، گلاب، آبلیمو و زعفران را اضافه کرده و اجازه دهید ۵ دقیقه دیگر بجوشد و کمی غلیظ شود. سپس کنار بگذارید تا خنک شود.",
      "برای تهیه مایه میانی: گردو، پودر پسته و پودر هل را مخلوط کنید.",
      "هر چانه خمیر را با وردنه خیلی نازک باز کنید (به قدری که تقریبا شفاف شود).",
      "کف یک سینی فر مستطیلی کوچک (حدود ۲۰x۱۵ سانتی‌متر) را با کمی کره ذوب شده چرب کنید.",
      "سه لایه خمیر باز شده را روی هم قرار دهید و بین هر لایه را با کره ذوب شده رومال کنید.",
      "نیمی از مخلوط گردو و پسته را روی لایه سوم پخش کنید.",
      "سه لایه خمیر بعدی را نیز به همین ترتیب روی هم قرار داده و بین هر لایه را با کره ذوب شده رومال کنید.",
      "باقلوا را با چاقوی تیز به صورت لوزی یا مربع برش بزنید.",
      "باقیمانده کره ذوب شده را روی باقلوا بریزید و سینی را در فر از قبل گرم شده با دمای ۱۷۰ درجه سانتی‌گراد به مدت ۳۰ تا ۴۰ دقیقه قرار دهید تا روی آن طلایی شود.",
      "پس از خارج کردن باقلوا از فر، بلافاصله شربت خنک شده را روی آن بریزید.",
      "اجازه دهید باقلوا حداقل ۲ ساعت یا بهتر است یک شب در یخچال بماند تا شربت کاملا جذب شود.",
      "قبل از سرو با خلال پسته تزیین کنید."
    ],
    "calories": 700,
    "cookTime": 45,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "حلوای خرمایی",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "خرمای بدون هسته",
        "amount": 250
      },
      {
        "unit": "پیمانه",
        "amount": 1,
        "item": "آرد گندم"
      },
      {
        "item": "روغن مایع یا کره",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "item": "آب",
        "amount": 0.25,
        "unit": "پیمانه"
      },
      {
        "amount": 0.25,
        "item": "گلاب",
        "unit": "پیمانه"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چایخوری",
        "item": "پودر هل"
      },
      {
        "unit": "قاشق چایخوری",
        "item": "پودر دارچین",
        "amount": 1
      },
      {
        "item": "کنجد یا پودر پسته (تزیین)",
        "amount": 0,
        "unit": "به مقدار لازم"
      }
    ],
    "id": "dish-176558059330-spw4b-2",
    "category": "dessert",
    "hasRealData": true,
    "recipeSteps": [
      "هسته خرماها را خارج کرده و خرما را با ۱/۴ پیمانه آب در قابلمه کوچکی روی حرارت ملایم قرار دهید.",
      "با پشت قاشق خرماها را له کنید تا نرم و یکدست شوند. سپس گلاب, پودر هل و پودر دارچین را اضافه کرده و خوب مخلوط کنید.",
      "آرد را در تابه ای جداگانه روی حرارت ملایم تفت دهید تا بوی خامی آن گرفته شود و کمی تغییر رنگ دهد (حدود ۱۵-۲۰ دقیقه). مواظب باشید نسوزد.",
      "روغن یا کره را به آرد تفت داده شده اضافه کرده و به هم زدن ادامه دهید تا آرد کاملا طلایی و یکدست شود.",
      "مخلوط خرمای پخته شده را به آرد و روغن اضافه کنید و مرتب هم بزنید تا حلوا جمع شود و از کناره های تابه جدا شود (حدود ۵-۱۰ دقیقه).",
      "حلوا را از روی حرارت بردارید و کمی ورز دهید تا کاملا یکدست و منسجم شود.",
      "حلوا را در ظرف سرو بکشید و با پشت قاشق صاف کنید.",
      "با قاشق یا چاقو روی حلوا طرح دهید و با کنجد بو داده یا پودر پسته تزیین کنید.",
      "می‌توانید حلوا را در قالب های کوچک فشرده کرده و سپس خارج کنید."
    ],
    "description": "حلوای خرمایی",
    "calories": 620,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "dessert",
    "id": "dish-1765580059330-mdjl1-3",
    "description": "کیک یزدی",
    "hasRealData": true,
    "recipeSteps": [
      "فر را با دمای ۱۸۰ درجه سانتی‌گراد گرم کنید.",
      "قالب‌های مافین یا کیک یزدی را با کپسول کاغذی بپوشانید یا چرب و آردپاشی کنید.",
      "تخم مرغ‌ها و شکر را در یک کاسه بزرگ با همزن برقی به مدت ۵ دقیقه بزنید تا کرم رنگ و کشدار شود.",
      "روغن مایع را اضافه کرده و یک دقیقه دیگر بزنید.",
      "ماست, گلاب, هل و وانیل را اضافه کرده و در حد مخلوط شدن بزنید.",
      "آرد, بکینگ پودر و نمک را سه بار الک کرده و به تدریج به مخلوط مایع اضافه کنید و با لیسک به آرامی و به صورت دورانی هم بزنید تا فقط مواد مخلوط شوند (زیاد هم نزنید).",
      "دو سوم از حجم هر کپسول را با مایه کیک پر کنید.",
      "روی هر کیک کمی کنجد یا پودر پسته بپاشید.",
      "سینی کیک را به مدت ۱۵ تا ۲۰ دقیقه در فر از قبل گرم شده قرار دهید تا روی کیک‌ها طلایی و پخته شوند (با خلال دندان تست کنید).",
      "پس از پخت, کیک‌ها را از فر خارج کرده و اجازه دهید کمی خنک شوند, سپس از قالب جدا کنید و سرو نمایید."
    ],
    "ingredients": [
      {
        "item": "آرد سفید",
        "amount": 2,
        "unit": "پیمانه"
      },
      {
        "item": "شکر",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "item": "تخم مرغ",
        "unit": "عدد",
        "amount": 2
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "ماست پرچرب"
      },
      {
        "amount": 0.5,
        "item": "روغن مایع",
        "unit": "پیمانه"
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "گلاب"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 1,
        "item": "هل سبز پودر شده"
      },
      {
        "amount": 1,
        "item": "بکینگ پودر",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.5,
        "item": "وانیل"
      },
      {
        "amount": 0.1,
        "unit": "قاشق چایخوری",
        "item": "نمک"
      },
      {
        "item": "کنجد یا پودر پسته (تزیین)",
        "amount": 0,
        "unit": "به مقدار لازم"
      }
    ],
    "name": "کیک یزدی",
    "calories": 580,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "هویج‌ها را پوست گرفته و بخارپز یا آب‌پز کنید تا کاملا نرم شوند.",
      "پس از نرم شدن، هویج‌ها را با گوشت‌کوب یا غذاساز کاملا پوره کنید تا هیچ تکه ای باقی نماند.",
      "آرد را در تابه ای جداگانه روی حرارت ملایم تفت دهید تا بوی خامی آن گرفته شود و کمی تغییر رنگ دهد (حدود ۱۵-۲۰ دقیقه). مواظب باشید نسوزد.",
      "کره یا روغن را به آرد تفت داده شده اضافه کرده و به هم زدن ادامه دهید تا آرد کاملا طلایی و یکدست شود.",
      "پوره هویج را به مخلوط آرد و روغن اضافه کنید و خوب هم بزنید تا مواد با هم ترکیب شوند.",
      "در یک قابلمه کوچک، شکر و ۱/۲ پیمانه آب را روی حرارت ملایم قرار دهید تا شکر حل شود.",
      "پس از حل شدن شکر، گلاب، پودر هل و زعفران دم کرده را اضافه کرده و اجازه دهید یک جوش بزند. این شربت را کنار بگذارید.",
      "شربت گرم را کم کم به حلوای هویج اضافه کنید و مرتب هم بزنید تا شربت به خورد حلوا برود و حلوا از دیواره های تابه جدا شود و کاملا جمع و سفت شود (حدود ۱۰-۱۵ دقیقه).",
      "حلوا را از روی حرارت بردارید و کمی ورز دهید تا یکدست شود.",
      "حلوا را در ظرف سرو بکشید و با پشت قاشق صاف کنید یا با ماسوره تزیین کنید.",
      "روی حلوا را با خلال بادام یا پسته تزیین کرده و سرد سرو نمایید."
    ],
    "name": "حلوای هویج تبریزی",
    "ingredients": [
      {
        "amount": 500,
        "item": "هویج",
        "unit": "گرم"
      },
      {
        "item": "آرد سفید",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "شکر"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "کره یا روغن مایع"
      },
      {
        "item": "گلاب",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "item": "پودر هل سبز",
        "amount": 1,
        "unit": "قاشق چایخوری"
      },
      {
        "item": "زعفران دم کرده غلیظ",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "unit": "به مقدار لازم",
        "item": "خلال بادام (تزیین)",
        "amount": 0
      }
    ],
    "id": "dish-1765580059330-6usum-4",
    "category": "dessert",
    "hasRealData": true,
    "description": "حلوای هویج تبریزی",
    "calories": 700,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "حلیم شیر",
    "name": "حلیم شیر",
    "ingredients": [
      {
        "amount": 2,
        "unit": "پیمانه",
        "item": "گندم پوست کنده"
      },
      {
        "item": "شیر پرچرب",
        "unit": "پیمانه",
        "amount": 8
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "شکر"
      },
      {
        "amount": 100,
        "unit": "گرم",
        "item": "کره"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "amount": 1,
        "item": "دارچین (تزیین)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "کنجد (تزیین)",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      }
    ],
    "id": "dish-1765153056543-cz7va-1",
    "hasRealData": true,
    "recipeSteps": [
      "گندم پوست کنده را از شب قبل یا حداقل ۸ ساعت در آب خیس کنید و چند بار آب آن را عوض کنید",
      "گندم خیس خورده را آبکش کرده و با ۸ پیمانه آب در قابلمه بریزید. روی حرارت ملایم قرار دهید تا به جوش آید",
      "پس از جوش آمدن, حرارت را کم کرده و اجازه دهید برای ۳ تا ۴ ساعت به آرامی بپزد تا کاملاً نرم و پخته شود و له شود. هر از گاهی هم بزنید تا ته نگیرد و در صورت نیاز کمی آب جوش اضافه کنید",
      "پس از پخت کامل گندم، آن را با گوشت‌کوب برقی یا دستی کمی له کنید تا حالت کشدار پیدا کند",
      "شیر را به گندم پخته اضافه کنید و نمک را بریزید. حرارت را متوسط کنید و مدام هم بزنید تا شیر به جوش آید و حلیم غلیظ شود",
      "شکر را اضافه کنید و خوب مخلوط کنید. اجازه دهید برای ۳۰ تا ۴۵ دقیقه دیگر با حرارت ملایم بپزد و قوام لازم را پیدا کند. مرتب هم بزنید",
      "در اواخر پخت, ۵۰ گرم از کره را اضافه کنید و هم بزنید تا ذوب شود",
      "حلیم را در ظرف سرو بکشید. ۵۰ گرم کره باقی‌مانده را ذوب کرده و روی حلیم بریزید. سپس با پودر دارچین و در صورت تمایل کنجد تزیین و گرم سرو کنید."
    ],
    "category": "dessert",
    "calories": 700,
    "cookTime": 105,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "it",
    "description": "تیرامیسو کلاسیک ایتالیایی با لایه‌های بیسکویت خیس شده در قهوه و کرم ماسکارپونه",
    "ingredients": [
      {
        "item": "پنیر ماسکارپونه",
        "amount": 250,
        "unit": "گرم"
      },
      {
        "item": "تخم مرغ (زرده)",
        "unit": "عدد",
        "amount": 3
      },
      {
        "unit": "گرم",
        "item": "شکر گرانول",
        "amount": 75
      },
      {
        "item": "اسپرسو سرد شده",
        "unit": "میلی‌لیتر",
        "amount": 300
      },
      {
        "item": "بیسکویت لیدی فینگر",
        "amount": 18,
        "unit": "عدد"
      },
      {
        "amount": 2,
        "item": "پودر کاکائو",
        "unit": "قاشق غذاخوری"
      }
    ],
    "id": "dish-1765580652080-tcety-1",
    "name": "Tiramisu (تیرامیسو - ایتالیا)",
    "hasRealData": true,
    "recipeSteps": [
      "زرده‌های تخم مرغ و شکر را به روش بن‌ماری (روی بخار آب) هم بزنید تا غلیظ و روشن شوند.",
      "پنیر ماسکارپونه را به مخلوط زرده اضافه کرده و تا یکدست شدن فولد کنید.",
      "بیسکویت‌ها را سریع در قهوه سرد فرو کرده و کف ظرف بچینید.",
      "یک لایه کرم روی بیسکویت‌ها ریخته و این کار را تکرار کنید.",
      "برای ۴ ساعت در یخچال قرار دهید و قبل از سرو پودر کاکائو بپاشید."
    ],
    "category": "dessert",
    "calories": 580,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765580652080-f8dvy-2",
    "ingredients": [
      {
        "item": "خامه پر چرب",
        "amount": 500,
        "unit": "میلی‌لیتر"
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "زرده تخم مرغ"
      },
      {
        "amount": 60,
        "item": "شکر",
        "unit": "گرم"
      },
      {
        "item": "وانیل",
        "amount": 1,
        "unit": "قاشق چایخوری"
      }
    ],
    "category": "dessert",
    "hasRealData": true,
    "name": "Crème Brûlée (کرم بروله - فرانسه)",
    "recipeSteps": [
      "خامه و وانیل را گرم کنید تا به نقطه جوش برسد.",
      "زرده‌ها و شکر را هم بزنید و خامه گرم را به آرامی به آن اضافه کنید.",
      "مواد را در قالب‌های کوچک ریخته و به روش بن‌ماری در فر بپزید.",
      "پس از خنک شدن، روی آن شکر بپاشید و با تورچ کاراملی کنید."
    ],
    "description": "دسر خامه‌ای غلیظ با لایه‌ای از شکر کاراملی شده و ترد",
    "nationality": "fr",
    "calories": 700,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "Éclair (اکله - فرانسه)",
    "ingredients": [
      {
        "item": "آب (خمیر شو)",
        "unit": "میلی‌لیتر",
        "amount": 125
      },
      {
        "item": "کره بدون نمک (خمیر شو)",
        "unit": "گرم",
        "amount": 50
      },
      {
        "amount": 75,
        "unit": "گرم",
        "item": "آرد همه‌منظوره (خمیر شو)"
      },
      {
        "amount": 2,
        "item": "تخم‌مرغ بزرگ (خمیر شو)",
        "unit": "عدد"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.25,
        "item": "نمک (خمیر شو)"
      },
      {
        "amount": 250,
        "item": "شیر پرچرب (کرم پاتیسیر)",
        "unit": "میلی‌لیتر"
      },
      {
        "unit": "عدد",
        "item": "زرده تخم‌مرغ (کرم پاتیسیر)",
        "amount": 3
      },
      {
        "amount": 50,
        "item": "شکر دانه‌ریز (کرم پاتیسیر)",
        "unit": "گرم"
      },
      {
        "item": "آرد ذرت (کرم پاتیسیر)",
        "amount": 20,
        "unit": "گرم"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "وانیل (کرم پاتیسیر)"
      },
      {
        "item": "شکلات تلخ (روکش)",
        "unit": "گرم",
        "amount": 100
      },
      {
        "item": "خامه صبحانه (روکش)",
        "amount": 50,
        "unit": "میلی‌لیتر"
      },
      {
        "amount": 10,
        "item": "کره (روکش)",
        "unit": "گرم"
      }
    ],
    "id": "dish-1765580694957-qlt53-1",
    "recipeSteps": [
      "برای خمیر شو: آب، کره و نمک را در یک قابلمه روی حرارت متوسط قرار دهید تا کره ذوب شده و مخلوط به جوش آید.",
      "آرد را یکجا اضافه کرده و بلافاصله با قاشق چوبی هم بزنید تا خمیر از کناره‌های قابلمه جدا شده و به شکل یک توپ درآید.",
      "قابلمه را از روی حرارت بردارید و خمیر را به کاسه همزن منتقل کنید. بگذارید ۵ دقیقه خنک شود.",
      "تخم‌مرغ‌ها را یکی‌یکی اضافه کنید و بعد از هر بار اضافه کردن خوب هم بزنید تا خمیر براق و یکدست شود.",
      "خمیر را داخل قیف ریخته و نوارهای ۱۰ سانتی‌متری روی سینی فر پایپ کنید.",
      "در فر از قبل گرم شده با دمای ۲۰۰ درجه به مدت ۱۵ دقیقه و سپس ۱۸۰ درجه به مدت ۱۰ دقیقه بپزید.",
      "برای کرم پاتیسیر: شیر را گرم کنید تا بخار کند.",
      "زرده‌ها، شکر، آرد ذرت و وانیل را هم بزنید تا یکدست شود.",
      "نیمی از شیر گرم را به مخلوط زرده اضافه کرده و سریع هم بزنید، سپس کل مواد را به قابلمه شیر برگردانید.",
      "روی حرارت ملایم مدام هم بزنید تا کرم غلیظ شود. سپس بگذارید کاملاً خنک شود.",
      "برای گاناش روکش: خامه را گرم کرده و روی شکلات خرد شده بریزید، سپس کره را اضافه کرده و هم بزنید تا براق شود.",
      "اکلرها را از پهلو برش زده یا با ماسوره سوراخ کنید و داخل آن‌ها را با کرم پاتیسیر پر کنید.",
      "روی اکلرها را در گاناش شکلات فرو ببرید و اجازه دهید در یخچال سفت شود."
    ],
    "description": "شیرینی نان خامه‌ای کشیده با فیلینگ کرم پاتیسیر و روکش گاناش شکلات",
    "hasRealData": true,
    "category": "dessert",
    "nationality": "fr",
    "calories": 700,
    "cookTime": 20,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده",
        "amount": 300
      },
      {
        "item": "آرد",
        "amount": 2,
        "unit": "پیمانه"
      }
    ],
    "name": "Dushbara (دوشباره آذری)",
    "id": "aze-1",
    "category": "international",
    "nationality": "az",
    "recipeSteps": [
      "خمیر را نازک باز کنید.",
      "گوشت را لای خمیرهای بسیار ریز بپیچید.",
      "در آب گوشت بپزید."
    ],
    "description": "دامپلینگ‌های بسیار ریز گوشت در سوپ مخصوص آذربایجان",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "Lula Kebab (لوله کباب آذربایجان)",
    "description": "کباب کوبیده تند و تیز به سبک باکو",
    "ingredients": [
      {
        "item": "گوشت گوسفندی",
        "unit": "گرم",
        "amount": 500
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز"
      }
    ],
    "id": "aze-2",
    "nationality": "az",
    "recipeSteps": [
      "گوشت را با ادویه زیاد ورز دهید.",
      "به شکل لوله‌ای به سیخ بکشید و کباب کنید."
    ],
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "ته قابلمه را با نان بپوشانید.",
      "برنج و گوشت و قیسی را داخل نان دم کنید."
    ],
    "id": "aze-3",
    "ingredients": [
      {
        "item": "برنج",
        "unit": "پیمانه",
        "amount": 3
      },
      {
        "unit": "عدد",
        "item": "نان لواش",
        "amount": 4
      }
    ],
    "name": "Shah Plov (شاه پلو آذری)",
    "description": "پلو مجلسی با ته‌دیگ نان لواش و میوه‌های خشک",
    "category": "international",
    "nationality": "az",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "دیزی آذربایجانی با زعفران و آلو",
    "ingredients": [
      {
        "item": "گوشت گوسفند",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "نخود"
      }
    ],
    "nationality": "az",
    "recipeSteps": [
      "در ظرف‌های سفالی تک‌نفره بپزید.",
      "با نان تلیت کنید."
    ],
    "category": "international",
    "id": "aze-4",
    "name": "Piti (پیتی باکو)",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "نان میان‌پر با سبزیجات یا گوشت",
    "name": "Qutab (قطاب آذری)",
    "nationality": "az",
    "recipeSteps": [
      "مواد را لای خمیر بگذارید.",
      "در تابه بدون روغن داغ کنید."
    ],
    "category": "international",
    "ingredients": [
      {
        "item": "خمیر نان",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "item": "سبزیجات معطر",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "id": "aze-5",
    "calories": 370,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "خمیر را لایه لایه کنید.",
      "با بادام پر کرده و در فر بپزید."
    ],
    "nationality": "az",
    "id": "aze-6",
    "description": "شیرینی لایه‌ای با مغز بادام",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "بادام پودر شده",
        "amount": 200
      }
    ],
    "name": "Badambura (بادام‌بوره آذری)",
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "Saj Ichi (ساج ایچی آذربایجان)",
    "id": "aze-7",
    "description": "تفت داده گوشت و سبزیجات روی ساج",
    "recipeSteps": [
      "مواد را روی تابه بزرگ ساج سرخ کنید."
    ],
    "nationality": "az",
    "ingredients": [
      {
        "item": "گوشت و مرغ",
        "unit": "گرم",
        "amount": 500
      }
    ],
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "af",
    "description": "محبوب‌ترین غذای افغانستان با هویج و کشمش",
    "category": "international",
    "name": "Kabuli Pulao (قابلی پلو افغانی)",
    "id": "afg-1",
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "item": "گوشت تکه‌ای",
        "unit": "گرم",
        "amount": 400
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "هویج خلالی"
      }
    ],
    "recipeSteps": [
      "گوشت را بپزید.",
      "هویج و کشمش را تفت دهید.",
      "لابلای برنج دم کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گوشت را لای خمیر بگذارید.",
      "در دستگاه بخارپز بپزید.",
      "با سس ماست و لپه سرو کنید."
    ],
    "id": "afg-2",
    "description": "خمیرهای بخارپز پر شده با گوشت و پیاز",
    "ingredients": [
      {
        "amount": 400,
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده"
      },
      {
        "item": "پیاز فراوان",
        "amount": 4,
        "unit": "عدد"
      }
    ],
    "nationality": "af",
    "name": "Mantu (منتو افغانی)",
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "Bolani (بولانی افغانی)",
    "description": "نان میان‌پر سرخ شده با تره یا سیب‌زمینی",
    "category": "international",
    "recipeSteps": [
      "خمیر را نازک کنید.",
      "تره را داخلش گذاشته و در تابه سرخ کنید."
    ],
    "ingredients": [
      {
        "amount": 3,
        "item": "آرد",
        "unit": "پیمانه"
      },
      {
        "item": "تره",
        "amount": 200,
        "unit": "گرم"
      }
    ],
    "nationality": "af",
    "id": "afg-3",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "نان فتیر",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "لیوان",
        "item": "کشک مایع"
      }
    ],
    "category": "international",
    "id": "taj-1",
    "description": "غذای ملی تاجیکستان با نان فتیر و کشک",
    "recipeSteps": [
      "نان را خرد کنید.",
      "با کشک داغ مخلوط کنید.",
      "با پیاز داغ و روغن زرد سرو کنید."
    ],
    "name": "Qurutob (قروت‌آب تاجیکستان)",
    "nationality": "tj",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "international",
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "item": "سیر بوته‌ای",
        "unit": "عدد",
        "amount": 2
      }
    ],
    "description": "پلو چرب و خوشمزه با گوشت و سیر کامل",
    "recipeSteps": [
      "گوشت و هویج را سرخ کنید.",
      "برنج را روی مواد کته کنید.",
      "سیر را درسته وسط برنج بگذارید."
    ],
    "nationality": "uz",
    "id": "uzb-1",
    "name": "Uzbek Plov (پلو ازبکی اصل)",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "دامپلینگ‌های بزرگ گوشت به سبک مغولی",
    "name": "Buuz (بوز مغولستانی)",
    "id": "mon-1",
    "category": "international",
    "ingredients": [
      {
        "item": "گوشت گوسفند",
        "unit": "گرم",
        "amount": 500
      }
    ],
    "recipeSteps": [
      "گوشت را در خمیر بپیچید و بخارپز کنید."
    ],
    "nationality": "mn",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 300,
        "item": "تره"
      }
    ],
    "name": "Aushak (آشاک افغانی)",
    "nationality": "af",
    "description": "خمیرهای پر شده با سبزی در سس گوشت",
    "category": "international",
    "recipeSteps": [
      "مانند منتو تهیه می‌شود اما داخلش فقط سبزی است."
    ],
    "id": "afg-4",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "گوشت",
        "unit": "گرم",
        "amount": 400
      },
      {
        "unit": "پیمانه",
        "item": "نخود",
        "amount": 0.5
      }
    ],
    "category": "international",
    "recipeSteps": [
      "گوشت و نخود را بپزید و با برنج دم کنید."
    ],
    "nationality": "tj",
    "id": "taj-2",
    "name": "Osh-i-Plov (پلوی تاجیکی)",
    "description": "نسخه تاجیکی پلو با گوشت و حبوبات",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "سوپ گوشت و سبزیجات درشت",
    "name": "Shurpa (شوربا ازبکی)",
    "category": "international",
    "nationality": "uz",
    "id": "uzb-2",
    "recipeSteps": [
      "سیب زمینی و هویج را درشت خرد کنید و با گوشت بپزید."
    ],
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 500,
        "item": "گوشت با استخوان"
      }
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "thai-1",
    "ingredients": [
      {
        "unit": "بسته",
        "item": "نودل برنج",
        "amount": 1
      },
      {
        "item": "میگو",
        "amount": 200,
        "unit": "گرم"
      }
    ],
    "recipeSteps": [
      "نودل را خیس کنید.",
      "با میگو و سس مخصوص تفت دهید."
    ],
    "nationality": "th",
    "name": "Pad Thai (پد تای تایلندی)",
    "description": "نودل سرخ شده با میگو و بادام زمینی",
    "category": "international",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 200,
        "item": "میگو",
        "unit": "گرم"
      }
    ],
    "nationality": "th",
    "name": "Tom Yum Goong (تام یام تایلندی)",
    "id": "thai-2",
    "recipeSteps": [
      "آب را با زنجبیل و لیمو بجوشانید.",
      "میگو را اضافه کنید."
    ],
    "description": "سوپ تند و ترش میگو با قارچ",
    "category": "international",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "خوراک مرغ تند با بادام زمینی",
    "name": "Kung Pao Chicken (مرغ کونگ پائو)",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "سینه مرغ",
        "amount": 300
      }
    ],
    "nationality": "th",
    "id": "chi-1",
    "category": "international",
    "recipeSteps": [
      "مرغ را مکعبی تفت دهید.",
      "با سس سویا مخلوط کنید."
    ],
    "calories": 350,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "th",
    "description": "رول‌های ترد سبزیجات",
    "name": "Spring Rolls (اسپرینگ رول)",
    "ingredients": [
      {
        "unit": "بسته",
        "item": "خمیر یوفکا",
        "amount": 1
      }
    ],
    "id": "chi-2",
    "category": "international",
    "recipeSteps": [
      "سبزیجات را تفت دهید.",
      "لای خمیر بپیچید و سرخ کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ghormeh_sabzi.jpg/640px-Ghormeh_sabzi.jpg",
    "name": "خورش قورمه‌سبزی",
    "description": "خورش قورمه‌سبزی",
    "recipeSteps": [
      "لوبیا قرمز را که از شب قبل خیس کرده‌اید، آب آن را عوض کرده و بگذارید بپزد تا نیم‌پز شود (حدود ۳۰-۴۵ دقیقه).",
      "در یک قابلمه، پیاز نگینی خرد شده را با کمی روغن تفت دهید تا سبک و طلایی شود.",
      "گوشت خرد شده را اضافه کرده و ۱۰-۱۵ دقیقه تفت دهید تا رنگ گوشت تغییر کند و آب آن کشیده شود.",
      "زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید.",
      "سبزی قورمه خرد شده را در تابه‌ای جداگانه با کمی روغن به مدت ۳۰-۴۵ دقیقه با حرارت ملایم تفت دهید تا رنگ آن تیره شود و بوی خامی آن گرفته شود.",
      "سبزی تفت داده شده را به گوشت اضافه کنید.",
      "لوبیا قرمز نیم‌پز شده و لیمو عمانی‌های سوراخ شده را به قابلمه اضافه کنید.",
      "حدود ۴-۵ پیمانه آب جوش به مواد اضافه کنید.",
      "حرارت را زیاد کنید تا خورش به جوش آید، سپس حرارت را کم کرده و درب قابلمه را بگذارید.",
      "اجازه دهید خورش به مدت ۳-۴ ساعت با حرارت ملایم جا بیفتد.",
      "در یک ساعت پایانی پخت، نمک و در صورت تمایل آبغوره یا آبلیمو را اضافه کنید و مزه خورش را تنظیم کنید.",
      "خورش باید غلیظ و کم آب شود و روغن سبز رنگ روی آن بیاید.",
      "با پلو سرو کنید."
    ],
    "category": "stew",
    "id": "dish-1764892643522-3vg07-1",
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی) (مکعبی خرد شده)",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "پیاز بزرگ (نگینی خرد شده)",
        "unit": "عدد"
      },
      {
        "amount": 500,
        "item": "سبزی قورمه (تره، جعفری، گشنیز، شنبلیله، اسفناج) (پاک شده و خرد شده)",
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "لوبیا قرمز (از شب قبل خیس شده)",
        "unit": "پیمانه"
      },
      {
        "unit": "عدد",
        "item": "لیمو عمانی",
        "amount": 4
      },
      {
        "item": "آبغوره یا آبلیمو (اختیاری)",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک (یا به میزان لازم)"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "item": "آب",
        "amount": 4.5,
        "unit": "پیمانه"
      }
    ],
    "calories": 550,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1764892643522-d3bwp-3",
    "category": "stew",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Khoresht_Bademjan.jpg/640px-Khoresht_Bademjan.jpg",
    "name": "خورش قیمه‌بادمجان",
    "description": "خورش قیمه‌بادمجان",
    "recipeSteps": [
      "بادمجان‌ها را پوست بگیرید، از وسط نصف کنید یا به شکل طولی برش دهید، کمی نمک بپاشید و اجازه دهید ۳۰ دقیقه بمانند تا تلخی آن‌ها گرفته شود. سپس با دستمال آشپزخانه خشک کنید.",
      "بادمجان‌ها را در روغن داغ سرخ کنید تا طلایی و نرم شوند. روی دستمال کاغذی قرار دهید تا روغن اضافی‌شان گرفته شود.",
      "لپه را که از شب قبل خیس کرده‌اید، آب آن را عوض کرده و جداگانه با کمی آب بگذارید حدود ۳۰ دقیقه بپزد تا نیم‌پز شود. سپس آبکش کنید.",
      "در یک قابلمه، پیاز نگینی خرد شده را با کمی روغن تفت دهید تا طلایی شود.",
      "گوشت خرد شده را اضافه کرده و ۱۰-۱۵ دقیقه تفت دهید تا رنگ گوشت تغییر کند.",
      "زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید.",
      "رب گوجه فرنگی را اضافه کرده و ۵-۷ دقیقه با حرارت ملایم تفت دهید تا رب رنگ باز کند.",
      "گوجه فرنگی رنده شده یا پوره را اضافه کنید و ۱۰ دقیقه دیگر تفت دهید تا آب آن کشیده شود.",
      "لپه نیم‌پز شده را به قابلمه اضافه کنید.",
      "حدود ۴-۵ پیمانه آب جوش به مواد اضافه کنید.",
      "حرارت را زیاد کنید تا خورش به جوش آید، سپس حرارت را کم کرده و درب قابلمه را بگذارید.",
      "اجازه دهید خورش به مدت ۱.۵ تا ۲ ساعت با حرارت ملایم بپزد.",
      "در نیم ساعت پایانی پخت، نمک، دارچین، زعفران دم کرده و آبغوره یا آبلیمو را اضافه کنید.",
      "بادمجان‌های سرخ شده را در ۳۰ دقیقه پایانی پخت به آرامی به خورش اضافه کنید تا له نشوند.",
      "خورش را مزه کرده و در صورت نیاز چاشنی آن را تنظیم کنید.",
      "با پلو سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 350,
        "item": "گوشت گوسفندی یا گوساله (خورشتی) (مکعبی کوچک خرد شده)",
        "unit": "گرم"
      },
      {
        "item": "بادمجان قلمی یا متوسط",
        "amount": 7,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "لپه (از شب قبل خیس شده)",
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز بزرگ (نگینی خرد شده)"
      },
      {
        "item": "رب گوجه فرنگی سرپر",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "amount": 2,
        "item": "گوجه فرنگی متوسط (رنده شده یا پوره)",
        "unit": "عدد"
      },
      {
        "item": "نمک (یا به میزان لازم)",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "زردچوبه"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "دارچین (اختیاری)"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "زعفران دم کرده غلیظ (اختیاری)"
      },
      {
        "item": "روغن مایع",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "پیمانه",
        "amount": 4.5,
        "item": "آب"
      },
      {
        "item": "آبغوره یا آبلیمو (یا به میزان لازم)",
        "unit": "قاشق غذاخوری",
        "amount": 2
      }
    ],
    "calories": 650,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "category": "stew",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 350,
        "item": "گوشت گوسفندی یا گوساله (خورشتی) (مکعبی کوچک خرد شده)"
      },
      {
        "amount": 1,
        "item": "لپه (از شب قبل خیس شده)",
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز بزرگ (نگینی خرد شده)"
      },
      {
        "amount": 2,
        "item": "رب گوجه فرنگی سرپر",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 3.5,
        "item": "لیمو عمانی",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "سیب‌زمینی متوسط (برای چیپسی کردن و تزیین)"
      },
      {
        "amount": 1,
        "item": "نمک (یا به میزان لازم)",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "دارچین",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "پودر گل محمدی (اختیاری)"
      },
      {
        "item": "روغن مایع",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "پیمانه",
        "item": "آب",
        "amount": 4.5
      }
    ],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Khoresht_Gheimeh.jpg/640px-Khoresht_Gheimeh.jpg",
    "name": "خورش قیمه",
    "description": "خورش قیمه",
    "recipeSteps": [
      "لپه را که از شب قبل خیس کرده‌اید، آب آن را عوض کرده و جداگانه با کمی آب بگذارید حدود ۳۰ دقیقه بپزد تا نیم‌پز شود. سپس آبکش کنید.",
      "در یک قابلمه، پیاز نگینی خرد شده را با کمی روغن تفت دهید تا طلایی شود.",
      "گوشت خرد شده را اضافه کرده و ۱۰-۱۵ دقیقه تفت دهید تا رنگ گوشت تغییر کند.",
      "زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید.",
      "رب گوجه فرنگی را اضافه کرده و ۵-۷ دقیقه با حرارت ملایم تفت دهید تا رب رنگ باز کند و بوی خامی آن گرفته شود.",
      "لپه نیم‌پز شده و لیمو عمانی‌های سوراخ شده را به قابلمه اضافه کنید.",
      "حدود ۴-۵ پیمانه آب جوش به مواد اضافه کنید.",
      "حرارت را زیاد کنید تا خورش به جوش آید، سپس حرارت را کم کرده و درب قابلمه را بگذارید.",
      "اجازه دهید خورش به مدت ۲ تا ۳ ساعت با حرارت ملایم بپزد و جا بیفتد.",
      "در نیم ساعت پایانی پخت، نمک، دارچین و در صورت تمایل پودر گل محمدی را اضافه کنید و مزه خورش را تنظیم کنید.",
      "سیب‌زمینی‌ها را پوست بگیرید و به صورت خلال یا چیپسی خرد کنید. در روغن داغ سرخ کنید تا طلایی و ترد شوند.",
      "خورش را در ظرف سرو کشیده و با سیب‌زمینی‌های سرخ شده تزیین کنید.",
      "با پلو سرو کنید."
    ],
    "id": "dish-1764892643522-jpfe5-2",
    "calories": 550,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "خورش قیمه‌سیب‌زمینی",
    "category": "stew",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Khoresht_Gheimeh.jpg/640px-Khoresht_Gheimeh.jpg",
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی) (مکعبی کوچک خرد شده)",
        "unit": "گرم",
        "amount": 350
      },
      {
        "unit": "پیمانه",
        "item": "لپه (از شب قبل خیس شده)",
        "amount": 1
      },
      {
        "item": "پیاز بزرگ (نگینی خرد شده)",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "رب گوجه فرنگی سرپر"
      },
      {
        "item": "لیمو عمانی",
        "amount": 3.5,
        "unit": "عدد"
      },
      {
        "amount": 3.5,
        "item": "سیب‌زمینی متوسط (برای خلال و سرخ کردن)",
        "unit": "عدد"
      },
      {
        "item": "نمک (یا به میزان لازم)",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "دارچین"
      },
      {
        "item": "پودر گل محمدی (اختیاری)",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0,
        "item": "روغن مایع",
        "unit": "به میزان لازم"
      },
      {
        "unit": "پیمانه",
        "amount": 4.5,
        "item": "آب"
      }
    ],
    "description": "خورش قیمه‌سیب‌زمینی",
    "id": "dish-1764892643522-zggeg-4",
    "recipeSteps": [
      "لپه را که از شب قبل خیس کرده‌اید، آب آن را عوض کرده و جداگانه با کمی آب بگذارید حدود ۳۰ دقیقه بپزد تا نیم‌پز شود. سپس آبکش کنید.",
      "در یک قابلمه، پیاز نگینی خرد شده را با کمی روغن تفت دهید تا طلایی شود.",
      "گوشت خرد شده را اضافه کرده و ۱۰-۱۵ دقیقه تفت دهید تا رنگ گوشت تغییر کند.",
      "زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید.",
      "رب گوجه فرنگی را اضافه کرده و ۵-۷ دقیقه با حرارت ملایم تفت دهید تا رب رنگ باز کند و بوی خامی آن گرفته شود.",
      "لپه نیم‌پز شده و لیمو عمانی‌های سوراخ شده را به قابلمه اضافه کنید.",
      "حدود ۴-۵ پیمانه آب جوش به مواد اضافه کنید.",
      "حرارت را زیاد کنید تا خورش به جوش آید، سپس حرارت را کم کرده و درب قابلمه را بگذارید.",
      "اجازه دهید خورش به مدت ۲ تا ۳ ساعت با حرارت ملایم بپزد و جا بیفتد.",
      "در نیم ساعت پایانی پخت، نمک، دارچین و در صورت تمایل پودر گل محمدی را اضافه کنید و مزه خورش را تنظیم کنید.",
      "سیب‌زمینی‌ها را پوست بگیرید و به صورت خلال‌های باریک و یکدست خرد کنید.",
      "سیب‌زمینی‌های خلال شده را به مدت ۱۵ دقیقه در آب سرد قرار دهید، سپس آبکش کرده و کاملاً خشک کنید.",
      "در یک تابه گود، روغن مایع را داغ کرده و سیب‌زمینی‌های خشک شده را در چند مرحله سرخ کنید تا طلایی و کاملاً ترد شوند.",
      "سیب‌زمینی‌های سرخ شده را روی دستمال کاغذی قرار دهید تا روغن اضافی‌شان گرفته شود.",
      "خورش را در ظرف سرو کشیده و با سیب‌زمینی‌های سرخ شده تزیین کنید.",
      "با پلو سرو کنید."
    ],
    "calories": 550,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "گردوی آسیاب شده را در یک قابلمه با کمی روغن (حدود ۱ قاشق غذاخوری) به مدت ۵-۷ دقیقه با حرارت ملایم تفت دهید تا بوی خامی آن گرفته شود. مراقب باشید نسوزد.",
      "پیاز رنده شده را به گردو اضافه کرده و چند دقیقه تفت دهید تا سبک شود.",
      "زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید.",
      "۴-۵ پیمانه آب سرد به گردو اضافه کنید. اجازه دهید به جوش آید. پس از جوش آمدن، حرارت را کاملاً کم کنید و درب قابلمه را ببندید.",
      "هر ۳۰-۴۵ دقیقه یکبار ۲-۳ تکه یخ به خورش اضافه کنید. این کار به روغن انداختن گردو کمک می‌کند. (این فرآیند باید حداقل ۲-۳ ساعت ادامه یابد تا گردو خوب روغن بیندازد).",
      "در این فاصله، اگر از مرغ استفاده می‌کنید، تکه‌های مرغ را با کمی نمک و فلفل در تابه با کمی روغن تفت دهید تا کمی طلایی شوند. اگر از گوشت قلقلی استفاده می‌کنید، گوشت را با پیاز رنده شده و نمک و فلفل ورز دهید، قلقلی کرده و در کمی روغن سرخ کنید.",
      "پس از ۲-۳ ساعت که گردو خوب روغن انداخت، رب انار را اضافه کنید و خوب هم بزنید.",
      "تکه‌های مرغ یا گوشت قلقلی سرخ شده را به خورش اضافه کنید.",
      "نمک و در صورت تمایل شکر را اضافه کنید. مزه خورش را بچشید و بر اساس ترشی و شیرینی دلخواه تنظیم کنید.",
      "حرارت را همچنان کم نگه دارید و اجازه دهید خورش حداقل ۱.۵ تا ۲ ساعت دیگر جا بیفتد تا طعم‌ها به خوبی با هم ترکیب شوند و خورش به غلظت مطلوب برسد.",
      "در طول پخت، هر از گاهی خورش را هم بزنید تا ته نگیرد.",
      "با پلو سرو کنید."
    ],
    "ingredients": [
      {
        "unit": "تکه",
        "amount": 4,
        "item": "مرغ (ران یا سینه) یا گوشت قلقلی (قلوه گاه گوسفندی)"
      },
      {
        "unit": "گرم",
        "item": "گردو (آسیاب شده)",
        "amount": 300
      },
      {
        "amount": 4.5,
        "unit": "قاشق غذاخوری",
        "item": "رب انار (بر اساس ترشی و غلظت رب)"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز متوسط (رنده شده)"
      },
      {
        "amount": 1.5,
        "item": "شکر (اختیاری، بر اساس ترشی رب انار و ذائقه)",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "نمک (یا به میزان لازم)"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 0.5,
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "item": "آب سرد (به همراه چند تکه یخ)",
        "unit": "پیمانه",
        "amount": 4.5
      }
    ],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Fesenjan_stew.jpg/640px-Fesenjan_stew.jpg",
    "id": "dish-1764892643523-3pwdo-5",
    "description": "خورش فسنجان",
    "category": "stew",
    "name": "خورش فسنجان",
    "calories": 630,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "برای قلقلی: پیاز کوچک رنده شده را آب آن را بگیرید و با گوشت چرخ‌کرده، نمک و فلفل ورز دهید. از مواد قلقلی‌های کوچک به اندازه گردو درست کنید",
      "پیاز متوسط را نگینی ریز خرد کرده و در قابلمه با ۱ قاشق غذاخوری روغن روی حرارت متوسط تفت دهید تا سبک و طلایی شود",
      "اگر از مرغ استفاده می‌کنید: تکه‌های مرغ را به پیاز اضافه کرده، کمی نمک، فلفل و زردچوبه بزنید و هر طرف را حدود ۵ دقیقه تفت دهید تا تغییر رنگ دهد. سپس مرغ را از قابلمه خارج کنید",
      "اگر از قلقلی استفاده می‌کنید: قلقلی‌ها را در کمی روغن سرخ کنید تا طلایی شوند و کنار بگذارید",
      "گردوی چرخ شده را به همان قابلمه اضافه کنید و به مدت ۵ تا ۷ دقیقه روی حرارت ملایم تفت دهید تا بوی خامی آن گرفته شود و کمی تیره‌تر شود",
      "۴ پیمانه آب سرد را به گردو اضافه کنید، حرارت را زیاد کنید تا به جوش آید. سپس حرارت را بسیار کم کنید، درب قابلمه را بگذارید و اجازه دهید گردو به مدت حداقل ۱.5 ساعت با حرارت بسیار ملایم بپزد تا روغن بیندازد. در این مدت هر ۳۰ دقیقه یکبار ۲-۳ تکه یخ به خورشت اضافه کنید",
      "پس از ۱.۵ ساعت، رب انار، شکر و زعفران دم‌کرده (در صورت تمایل) را اضافه کنید و خوب هم بزنید. سپس مرغ یا قلقلی‌های آماده شده را به خورشت اضافه کنید",
      "درب قابلمه را بگذارید و اجازه دهید خورشت حداقل ۲ تا ۳ ساعت دیگر روی حرارت بسیار ملایم جا بیفتد تا مرغ کاملاً پخته شود یا قلقلی‌ها طعم بگیرند و خورشت غلیظ و روغن انداخته شود. در این مدت هر نیم ساعت یکبار خورشت را به آرامی هم بزنید تا ته نگیرد و در صورت نیاز ۱ پیمانه آب جوش اضافه کنید",
      "نمک و فلفل خورشت را تست کرده و در صورت نیاز تنظیم کنید. فسنجان شیرین را با برنج زعفرانی سرو کنید."
    ],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Fesenjan_stew.jpg/640px-Fesenjan_stew.jpg",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده گوسفندی یا مخلوط (برای قلقلی) یا مرغ (۴ تکه)",
        "amount": 300
      },
      {
        "item": "گردوی چرخ شده",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 5.5,
        "item": "رب انار ملس یا شیرین",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "شکر (بسته به ذائقه و میزان شیرینی رب)",
        "amount": 4
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط (برای پیاز داغ + برای قلقلی)",
        "amount": 2
      },
      {
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "amount": 1,
        "item": "نمک",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "زعفران دم‌کرده غلیظ (اختیاری)",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "پیمانه",
        "amount": 4.5,
        "item": "آب سرد"
      }
    ],
    "name": "خورش فسنجان شیرین قزوینی",
    "id": "dish-1764892654695-8jp79-2",
    "description": "فسنجان شیرین قزوینی",
    "category": "stew",
    "calories": 630,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 4,
        "unit": "تکه",
        "item": "مرغ (ران یا سینه)"
      },
      {
        "amount": 500,
        "item": "کدو حلوایی (پوست کنده و مکعبی خرد شده)",
        "unit": "گرم"
      },
      {
        "item": "پیاز بزرگ",
        "unit": "عدد",
        "amount": 1
      },
      {
        "amount": 9,
        "unit": "عدد",
        "item": "آلو بخارا"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "رب گوجه فرنگی"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1.5,
        "item": "شکر (اختیاری، بسته به شیرینی کدو و ذائقه)"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "زعفران دم‌کرده غلیظ (اختیاری)",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "item": "آب جوش",
        "unit": "پیمانه",
        "amount": 3.5
      }
    ],
    "id": "dish-1764892654695-b97t7-5",
    "description": "خورش کدو حلوایی",
    "category": "stew",
    "name": "خورش کدو حلوایی با مرغ",
    "recipeSteps": [
      "آلو بخارا را به مدت ۳۰ دقیقه در آب ولرم خیس کنید",
      "پیاز را نگینی خرد کرده و در قابلمه با ۲ قاشق غذاخوری روغن تفت دهید تا سبک و طلایی شود",
      "تکه‌های مرغ را به پیاز اضافه کرده، کمی نمک، فلفل و زردچوبه بزنید و هر طرف را حدود ۵ دقیقه تفت دهید تا تغییر رنگ دهد و کمی طلایی شود",
      "رب گوجه فرنگی را اضافه کرده و ۲ دقیقه تفت دهید تا رنگ آن باز شود. ۳ پیمانه آب جوش به همراه نمک را به مرغ اضافه کنید. حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید مرغ به مدت ۴۵ دقیقه تا ۱ ساعت بپزد تا نیم‌پز شود",
      "در همین حین، در تابه جداگانه، تکه‌های کدو حلوایی را با کمی روغن (حدود ۲ قاشق غذاخوری) به مدت ۱۰ تا ۱۵ دقیقه تفت دهید تا کمی نرم شوند و رنگ بگیرند (مراقب باشید له نشوند)",
      "پس از اینکه مرغ نیم‌پز شد، کدو حلوایی‌های تفت داده شده، آلو بخارای خیس خورده و در صورت تمایل شکر و زعفران دم‌کرده را به خورش اضافه کنید",
      "درب قابلمه را بگذارید و اجازه دهید خورش به مدت ۳۰ تا ۴۵ دقیقه دیگر روی حرارت ملایم بپزد تا کدو حلوایی کاملاً نرم شود، آلوها پخته و خورش جا بیفتد و طعم‌ها با هم ترکیب شوند. در صورت نیاز کمی آب جوش اضافه کنید",
      "نمک و شیرینی خورش را بچشید و تنظیم کنید. خورش کدو حلوایی را با پلو سرو کنید."
    ],
    "calories": 630,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "خورش بادمجان",
    "description": "خورش بادمجان",
    "id": "dish-1764892654695-rri9u-3",
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی)",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "amount": 7,
        "item": "بادمجان قلمی متوسط",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "amount": 4,
        "item": "گوجه فرنگی متوسط"
      },
      {
        "amount": 2,
        "item": "رب گوجه فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز بزرگ"
      },
      {
        "amount": 0.25,
        "item": "غوره یا آبغوره (یا آبلیمو: ۲ قاشق غذاخوری)",
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "روغن مایع (برای سرخ کردن و پخت)",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "پیمانه",
        "item": "آب جوش",
        "amount": 3.5
      }
    ],
    "category": "stew",
    "recipeSteps": [
      "گوشت را به قطعات مکعبی ۳-۴ سانتی‌متری خرد کنید. بادمجان‌ها را پوست گرفته، از طول دو نیم کنید (یا به صورت درسته اگر کوچک هستند). روی آنها نمک بپاشید و اجازه دهید ۳۰ دقیقه بمانند تا آب سیاه آنها خارج شود، سپس آبکشی کرده و خشک کنید",
      "پیاز را نگینی خرد کرده و در قابلمه با ۲ قاشق غذاخوری روغن تفت دهید تا سبک شود",
      "گوشت را اضافه کرده و ۱۰ دقیقه تفت دهید تا تغییر رنگ دهد. زردچوبه و فلفل را اضافه کرده و ۱ دقیقه دیگر تفت دهید",
      "رب گوجه فرنگی را اضافه کرده و ۲ دقیقه تفت دهید تا رنگ آن باز شود. ۳ پیمانه آب جوش به همراه نمک را اضافه کنید. حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید گوشت به مدت ۱.۵ تا ۲ ساعت بپزد تا نیم‌پز شود",
      "در همین حین، در تابه دیگری بادمجان‌ها را با روغن کافی (حدود ۱/۲ پیمانه) سرخ کنید تا طلایی و نرم شوند، سپس روی دستمال کاغذی قرار دهید تا روغن اضافی‌شان گرفته شود",
      "گوجه فرنگی‌ها را از طول دو نیم کنید و در همان تابه کمی سرخ کنید تا نرم شوند",
      "پس از اینکه گوشت نیم‌پز شد، بادمجان‌های سرخ شده، گوجه فرنگی‌های نیمه‌سرخ شده و غوره یا آبغوره را به خورشت اضافه کنید",
      "درب قابلمه را بگذارید و اجازه دهید خورشت به مدت ۴۵ دقیقه تا ۱ ساعت دیگر بپزد تا بادمجان‌ها کاملاً پخته شوند و خورشت جا بیفتد و غلیظ شود. در صورت نیاز، کمی آب جوش اضافه کنید",
      "نمک و ترشی خورشت را بچشید و تنظیم کنید. خورش بادمجان را با پلو سرو کنید."
    ],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Khoresht_Bademjan_2.jpg/640px-Khoresht_Bademjan_2.jpg",
    "calories": 650,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "description": "خورش کرفس",
    "category": "stew",
    "ingredients": [
      {
        "amount": 400,
        "item": "گوشت گوسفندی یا گوساله (خورشتی)",
        "unit": "گرم"
      },
      {
        "unit": "گرم",
        "item": "ساقه کرفس",
        "amount": 500
      },
      {
        "amount": 100,
        "unit": "گرم",
        "item": "برگ کرفس"
      },
      {
        "item": "جعفری تازه",
        "unit": "گرم",
        "amount": 150
      },
      {
        "item": "نعناع تازه",
        "unit": "گرم",
        "amount": 50
      },
      {
        "unit": "عدد",
        "item": "پیاز بزرگ",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "آبلیمو تازه (یا آبغوره: ۱/۴ پیمانه)",
        "amount": 3.5
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "amount": 4.5,
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع"
      },
      {
        "amount": 4.5,
        "item": "آب جوش",
        "unit": "پیمانه"
      }
    ],
    "id": "dish-1764892654695-ss9j8-4",
    "recipeSteps": [
      "گوشت را به قطعات مکعبی ۳-۴ سانتی‌متری خرد کنید. کرفس‌ها را خوب بشویید، ساقه‌ها را به اندازه ۲-۳ سانتی‌متر خرد کنید و برگ‌های کرفس، جعفری و نعناع را ریز خرد کنید",
      "پیاز را نگینی خرد کرده و در قابلمه با ۲ قاشق غذاخوری روغن تفت دهید تا سبک شود",
      "گوشت را اضافه کرده و ۱۰ دقیقه تفت دهید تا تغییر رنگ دهد. زردچوبه و فلفل را اضافه کرده و ۱ دقیقه دیگر تفت دهید",
      "۴ پیمانه آب جوش به همراه نمک را به گوشت اضافه کنید. حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید گوشت به مدت ۱.۵ تا ۲ ساعت بپزد تا نیم‌پز شود",
      "در تابه جداگانه، ساقه‌های خرد شده کرفس را با ۲ قاشق غذاخوری روغن حدود ۱۵-۲۰ دقیقه روی حرارت ملایم تفت دهید تا کمی نرم شوند و رنگشان تغییر کند",
      "سپس برگ‌های کرفس، جعفری و نعناع خرد شده را به ساقه‌های کرفس اضافه کنید و ۵ تا ۷ دقیقه دیگر تفت دهید تا سبزی‌ها سرخ شوند و رنگشان تیره شود اما نسوزند",
      "پس از نیم‌پز شدن گوشت، سبزیجات سرخ شده را به خورش اضافه کنید",
      "درب قابلمه را بگذارید و اجازه دهید خورش به مدت ۴۵ دقیقه تا ۱ ساعت دیگر بپزد تا گوشت کاملاً نرم شود و خورش جا بیفتد",
      "در ۱۵ دقیقه پایانی پخت، آبلیمو یا آبغوره را اضافه کنید و مزه خورش را تنظیم کنید. خورش کرفس را با پلو سرو کنید."
    ],
    "name": "خورش کرفس",
    "calories": 550,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "خورش فسنجان ترش گیلانی",
    "ingredients": [
      {
        "item": "مرغ (ران یا سینه) یا اردک",
        "amount": 4,
        "unit": "تکه"
      },
      {
        "unit": "گرم",
        "item": "گردوی چرخ شده",
        "amount": 300
      },
      {
        "amount": 4.5,
        "unit": "قاشق غذاخوری",
        "item": "رب انار ترش غلیظ (بسته به میزان ترشی و ذائقه)"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "پیاز بزرگ"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع",
        "amount": 2
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "شکر (اختیاری، برای تعدیل طعم)"
      },
      {
        "amount": 1,
        "item": "نمک",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "item": "زردچوبه",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "آب سرد",
        "unit": "پیمانه",
        "amount": 4.5
      }
    ],
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Fesenjan_stew.jpg/640px-Fesenjan_stew.jpg",
    "recipeSteps": [
      "پیاز را نگینی ریز خرد کرده و در قابلمه با ۱ قاشق غذاخوری روغن روی حرارت متوسط تفت دهید تا سبک و طلایی شود، حدود ۱۰ دقیقه",
      "تکه‌های مرغ یا اردک را به پیاز اضافه کرده، کمی نمک، فلفل و زردچوبه بزنید و هر طرف را حدود ۵ دقیقه تفت دهید تا تغییر رنگ دهد و کمی طلایی شود. سپس مرغ را از قابلمه خارج کنید",
      "گردوی چرخ شده را به همان قابلمه اضافه کنید و به مدت ۵ تا ۷ دقیقه روی حرارت ملایم تفت دهید تا بوی خامی آن گرفته شود و کمی تیره‌تر شود (مراقب باشید نسوزد)",
      "۴ پیمانه آب سرد را به گردو اضافه کنید، حرارت را زیاد کنید تا به جوش آید. سپس حرارت را بسیار کم کنید، درب قابلمه را بگذارید و اجازه دهید گردو به مدت حداقل ۱.۵ ساعت با حرارت بسیار ملایم بپزد تا روغن بیندازد. هر ۳۰ دقیقه یکبار ۲-۳ تکه یخ به خورشت اضافه کنید تا گردو بیشتر روغن بیندازد",
      "پس از ۱.۵ ساعت، رب انار و شکر (در صورت تمایل برای تعدیل ترشی) را اضافه کنید و خوب هم بزنید. سپس تکه‌های مرغ تفت داده شده را به خورشت اضافه کنید",
      "درب قابلمه را بگذارید و اجازه دهید خورشت حداقل ۲ تا ۳ ساعت دیگر روی حرارت بسیار ملایم جا بیفتد تا مرغ کاملاً پخته شود و خورشت غلیظ و روغن انداخته شود. در این مدت هر نیم ساعت یکبار خورشت را به آرامی هم بزنید تا ته نگیرد و در صورت نیاز ۱ پیمانه آب جوش اضافه کنید",
      "نمک و فلفل خورشت را تست کرده و در صورت نیاز تنظیم کنید. خورشت فسنجان را با کته یا پلو سرو کنید."
    ],
    "id": "dish-1764892654695-uo1qu-1",
    "description": "فسنجان ترش گیلانی",
    "category": "stew",
    "calories": 630,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "recipeSteps": [
      "آلو بخارا را به مدت ۳۰ دقیقه در آب ولرم خیس کنید",
      "مرغ‌ها را با نمک، فلفل و زردچوبه مزه‌دار کنید",
      "در یک قابلمه, ۲ قاشق غذاخوری روغن ریخته و مرغ‌ها را از هر دو طرف تفت دهید تا طلایی شوند. مرغ‌ها را از قابلمه خارج کرده و کنار بگذارید",
      "پیاز را نگینی خرد کرده و در همان قابلمه با ۲ قاشق غذاخوری روغن باقی‌مانده تفت دهید تا سبک و طلایی شود",
      "رب گوجه‌فرنگی را به پیاز اضافه کرده و به مدت ۳-۴ دقیقه تفت دهید تا رنگ آن باز شود و بوی خامی آن گرفته شود",
      "نصف زعفران دم‌کرده، نمک، زردچوبه و فلفل را به پیاز و رب اضافه کرده و کمی تفت دهید",
      "مرغ‌های تفت داده شده را به قابلمه برگردانید",
      "آلوهای خیس خورده (بدون آب خیساندن) را به مرغ اضافه کنید",
      "آب را به قابلمه اضافه کرده و حرارت را زیاد کنید تا جوش بیاید",
      "پس از جوش آمدن، حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید خورش به مدت ۴۵ دقیقه تا ۱ ساعت بپزد تا مرغ کاملاً پخته و آلوها نرم شوند",
      "۱۵ دقیقه پایانی پخت، شکر (در صورت تمایل برای طعم ملس)، آبلیمو و مابقی زعفران دم‌کرده را اضافه کنید",
      "اجازه دهید خورش ۱۰-۱۵ دقیقه دیگر بجوشد تا جا بیفتد و غلیظ شود. خورش را همراه با برنج سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 800,
        "item": "سینه و ران مرغ",
        "unit": "گرم"
      },
      {
        "item": "آلو بخارا",
        "unit": "گرم",
        "amount": 200
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز بزرگ"
      },
      {
        "amount": 2,
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "شکر (اختیاری، برای طعم ملس)",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 3
      },
      {
        "amount": 4,
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "amount": 3,
        "item": "آب",
        "unit": "پیمانه"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "آبلیمو تازه (برای تنظیم ترشی)"
      }
    ],
    "id": "dish-1764892678203-1cna2-2",
    "category": "stew",
    "description": "خورش آلو با مرغ",
    "name": "خورش آلو با مرغ",
    "calories": 630,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "stew",
    "ingredients": [
      {
        "amount": 500,
        "unit": "گرم",
        "item": "گوشت گوسفندی یا گوساله (خورشتی) (مکعبی خرد شده)"
      },
      {
        "unit": "گرم",
        "item": "اسفناج تازه",
        "amount": 700
      },
      {
        "item": "آلو بخارا",
        "amount": 150,
        "unit": "گرم"
      },
      {
        "item": "پیاز بزرگ",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "item": "رب گوجه‌فرنگی (اختیاری)",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "آبلیمو تازه یا آبغوره (یا به میزان لازم)",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع",
        "amount": 5
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک",
        "amount": 1.5
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "amount": 2,
        "item": "سیر (له شده)",
        "unit": "حبه"
      },
      {
        "item": "آب",
        "unit": "پیمانه",
        "amount": 4
      }
    ],
    "id": "dish-1764892678203-4o90o-3",
    "name": "خورش آلو اسفناج",
    "description": "خورش آلو اسفناج",
    "recipeSteps": [
      "آلو بخارا را به مدت ۳۰ دقیقه در آب ولرم خیس کنید",
      "اسفناج‌ها را پاک کرده، بشویید و درشت خرد کنید",
      "در یک تابه، ۳ قاشق غذاخوری روغن ریخته و اسفناج خرد شده را با حرارت ملایم تفت دهید تا آب آن کشیده شود و حجمش کم شود. اسفناج را کنار بگذارید",
      "در قابلمه اصلی، ۲ قاشق غذاخوری روغن ریخته و پیاز نگینی خرد شده را تفت دهید تا طلایی شود",
      "گوشت‌های مکعبی را اضافه کرده و تفت دهید تا تغییر رنگ دهند",
      "سیر له شده، نمک، زردچوبه و فلفل سیاه را اضافه کرده و ۲-۳ دقیقه دیگر تفت دهید",
      "در صورت تمایل، رب گوجه‌فرنگی را اضافه کرده و کمی تفت دهید",
      "آب را به قابلمه اضافه کرده، حرارت را زیاد کنید تا جوش بیاید. سپس حرارت را کم کرده، درب قابلمه را ببندید و اجازه دهید گوشت به مدت ۱.۵ تا ۲ ساعت بپزد تا نیم‌پز شود",
      "پس از نیم‌پز شدن گوشت، اسفناج تفت داده شده و آلوهای خیس خورده (بدون آب خیساندن) را به خورش اضافه کنید",
      "آبلیمو یا آبغوره را اضافه کنید",
      "اجازه دهید خورش به مدت ۴۵ دقیقه تا ۱ ساعت دیگر بپزد تا گوشت کاملاً نرم شود، آلوها بپزند و خورش جا بیفتد. در طول پخت، گاهی هم بزنید تا ته نگیرد",
      "نمک و ترشی خورش را بچشید و در صورت نیاز تنظیم کنید. این خورش را معمولاً با برنج سفید سرو می‌کنند."
    ],
    "calories": 550,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 800,
        "item": "مرغ (۴ تکه) یا گوشت خورشتی گوسفندی/گوساله (۵۰۰ گرم)",
        "unit": "گرم"
      },
      {
        "amount": 100,
        "unit": "گرم",
        "item": "آلو بخارا"
      },
      {
        "amount": 100,
        "unit": "گرم",
        "item": "قیصی (برگه زردآلو)"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "پیاز بزرگ"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی"
      },
      {
        "amount": 1.5,
        "unit": "قاشق غذاخوری",
        "item": "شکر (اختیاری، برای شیرین‌تر شدن)"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 3
      },
      {
        "amount": 4,
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "زردچوبه"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری",
        "amount": 0.5
      },
      {
        "amount": 3,
        "item": "آب",
        "unit": "پیمانه"
      },
      {
        "item": "آبلیمو تازه (برای تنظیم ترشی)",
        "amount": 1.5,
        "unit": "قاشق غذاخوری"
      }
    ],
    "category": "stew",
    "description": "خورش آلو قیصی",
    "recipeSteps": [
      "آلو بخارا و قیصی را به مدت ۳۰ دقیقه در آب ولرم خیس کنید",
      "مرغ‌ها را با نمک، فلفل و زردچوبه مزه‌دار کنید (اگر از گوشت استفاده می‌کنید، گوشت را مکعبی خرد کنید و با نمک و فلفل مزه‌دار کنید)",
      "در یک قابلمه, ۲ قاشق غذاخوری روغن ریخته و مرغ‌ها (یا گوشت) را از هر دو طرف تفت دهید تا طلایی شوند. مرغ/گوشت را از قابلمه خارج کرده و کنار بگذارید",
      "پیاز را نگینی خرد کرده و در همان قابلمه با ۲ قاشق غذاخوری روغن باقی‌مانده تفت دهید تا سبک و طلایی شود",
      "رب گوجه‌فرنگی را به پیاز اضافه کرده و به مدت ۳-۴ دقیقه تفت دهید تا رنگ آن باز شود و بوی خامی آن گرفته شود",
      "نصف زعفران دم‌کرده، نمک، زردچوبه و فلفل را به پیاز و رب اضافه کرده و کمی تفت دهید",
      "مرغ‌های تفت داده شده (یا گوشت) را به قابلمه برگردانید",
      "آب را به قابلمه اضافه کرده و حرارت را زیاد کنید تا جوش بیاید",
      "پس از جوش آمدن، حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید مرغ به مدت ۴۵ دقیقه تا ۱ ساعت (اگر گوشت استفاده می‌کنید ۱.۵ تا ۲ ساعت) بپزد تا نیم‌پز شود",
      "آلو و قیصی خیس خورده (بدون آب خیساندن) را به خورش اضافه کنید",
      "شکر (در صورت تمایل) و آبلیمو را اضافه کنید",
      "مابقی زعفران دم‌کرده را نیز در این مرحله اضافه کنید",
      "اجازه دهید خورش ۱۰-۱۵ دقیقه دیگر بجوشد تا کاملاً جا بیفتد، آلو و قیصی نرم شوند و خورش به غلظت دلخواه برسد",
      "طعم خورش را بچشید و در صورت نیاز نمک، شیرینی یا ترشی آن را تنظیم کنید. این خورش را گرم و با برنج سفید سرو کنید."
    ],
    "id": "dish-1764892678203-htcar-5",
    "name": "خورش آلو قیصی",
    "calories": 630,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "پیاز را نگینی خرد کرده و در قابلمه‌ای با ۱ قاشق غذاخوری روغن تفت دهید تا سبک شود",
      "گوشت را به قطعات کوچک تقسیم کرده (حدود ۲ تا ۳ سانتیمتر) و به پیاز اضافه کنید. گوشت را تفت دهید تا تغییر رنگ دهد",
      "نمک، زردچوبه و فلفل سیاه را اضافه کنید و کمی دیگر تفت دهید",
      "آب جوش را به حدی اضافه کنید که روی گوشت را بپوشاند. حرارت را کم کرده و اجازه دهید گوشت به مدت ۲ تا ۳ ساعت کاملاً بپزد و نرم شود",
      "پس از پخت، گوشت را از آب خارج کرده و با گوشت‌کوب بکوبید یا با چنگال ریش ریش کنید تا کاملاً له و کش‌دار شود",
      "آب گوشت باقیمانده را صاف کرده و کنار بگذارید",
      "در یک قابلمه بزرگ و نچسب، ماست چکیده، شکر، نمک و نصف زعفران دم‌کرده را ریخته و روی حرارت ملایم قرار دهید",
      "مخلوط ماست را به آرامی هم بزنید تا شکر حل شود و ماست کمی گرم شود (مراقب باشید ماست نجوشد و نبرد)",
      "گوشت کوبیده یا ریش ریش شده را به ماست اضافه کنید و خوب مخلوط کنید. حدود ۱۵ تا ۲۰ دقیقه روی حرارت ملایم به آرامی هم بزنید تا خورش قوام پیدا کند و کش‌دار شود",
      "در صورت نیاز، کمی از آب گوشت صاف شده را به خورش اضافه کنید تا به غلظت دلخواه برسد",
      "در ۱۰ دقیقه پایانی پخت، باقی‌مانده زعفران دم‌کرده را اضافه کنید",
      "خورش ماست را از روی حرارت بردارید و اجازه دهید کمی خنک شود. سپس آن را به مدت حداقل ۲ ساعت در یخچال قرار دهید تا کاملاً سرد و جا افتاده شود",
      "هنگام سرو، زرشک را در کمی روغن تفت داده و به همراه خلال پسته یا بادام برای تزیین روی خورش استفاده کنید. این خورش معمولاً سرد سرو می‌شود."
    ],
    "name": "خورش ماست اصفهانی",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت گردن گوسفند بدون استخوان",
        "amount": 500
      },
      {
        "unit": "گرم",
        "item": "ماست چکیده شیرین",
        "amount": 500
      },
      {
        "amount": 300,
        "unit": "گرم",
        "item": "شکر"
      },
      {
        "amount": 1,
        "item": "پیاز متوسط",
        "unit": "عدد"
      },
      {
        "amount": 4,
        "item": "زعفران دم‌کرده غلیظ",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "زرشک",
        "unit": "گرم",
        "amount": 50
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "خلال پسته یا بادام (برای تزیین)",
        "amount": 2
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "روغن مایع"
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه"
      },
      {
        "item": "آب (حدود ۴ پیمانه)",
        "unit": "پیمانه",
        "amount": 4
      }
    ],
    "category": "stew",
    "description": "خورش ماست اصفهانی",
    "id": "dish-1764892678203-izkqm-1",
    "calories": 630,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "name": "خورش آلو مسما",
    "category": "stew",
    "recipeSteps": [
      "آلو بخارا را به مدت ۳۰ دقیقه در آب ولرم خیس کنید",
      "مرغ‌ها را با نمک، فلفل و زردچوبه مزه‌دار کنید",
      "در یک قابلمه, ۲ قاشق غذاخوری روغن ریخته و مرغ‌ها را از هر دو طرف تفت دهید تا طلایی شوند. مرغ‌ها را از قابلمه خارج کرده و کنار بگذارید",
      "پیاز را نگینی خرد کرده و در همان قابلمه با ۲ قاشق غذاخوری روغن باقی‌مانده تفت دهید تا سبک و طلایی شود",
      "رب گوجه‌فرنگی را به پیاز اضافه کرده و به مدت ۳-۴ دقیقه تفت دهید تا رنگ آن باز شود و بوی خامی آن گرفته شود",
      "نصف زعفران دم‌کرده، نمک، زردچوبه، فلفل و دارچین را به پیاز و رب اضافه کرده و کمی تفت دهید",
      "مرغ‌های تفت داده شده را به قابلمه برگردانید",
      "آلوهای خیس خورده (بدون آب خیساندن) را اضافه کنید",
      "آب را به قابلمه اضافه کرده و حرارت را زیاد کنید تا جوش بیاید",
      "پس از جوش آمدن، حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید خورش به مدت ۴۵ دقیقه تا ۱ ساعت بپزد تا مرغ کاملاً پخته و آلوها نرم شوند",
      "۱۵ دقیقه پایانی پخت، شکر, آبلیمو و مابقی زعفران دم‌کرده را اضافه کنید",
      "اجازه دهید خورش ۱۰-۱۵ دقیقه دیگر بجوشد تا جا بیفتد و غلیظ شود و طعم‌ها به خوبی با هم ترکیب شوند. این خورش معمولاً با برنج سرو می‌شود."
    ],
    "id": "dish-1764892678203-ud40f-4",
    "description": "خورش آلو مسما",
    "ingredients": [
      {
        "amount": 800,
        "item": "مرغ",
        "unit": "گرم"
      },
      {
        "amount": 200,
        "item": "آلو بخارا",
        "unit": "گرم"
      },
      {
        "item": "پیاز بزرگ",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی",
        "amount": 2
      },
      {
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 3,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 1.5,
        "unit": "قاشق غذاخوری",
        "item": "شکر (بسته به ذائقه و شیرینی آلو)"
      },
      {
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری",
        "amount": 4
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "item": "فلفل سیاه",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "دارچین",
        "amount": 0.5
      },
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "آب"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "آبلیمو تازه (برای تنظیم ترشی)",
        "amount": 1.5
      }
    ],
    "calories": 630,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1764892701016-3z86k-5",
    "recipeSteps": [
      "پیاز را نگینی خرد کرده و در قابلمه‌ای با کمی روغن تفت دهید تا طلایی شود. گوشت را اضافه کرده و ۱۰-۸ دقیقه تفت دهید تا تغییر رنگ دهد. زردچوبه و فلفل سیاه را اضافه کرده و یک دقیقه دیگر تفت دهید. حدود ۳ پیمانه آب جوش به گوشت اضافه کرده و شعله را کم کنید. اجازه دهید گوشت به مدت ۲ تا ۲.۵ ساعت بپزد تا نیم‌پز شود. آلو بخارا را از ۳۰ دقیقه قبل در آب گرم خیس کنید و سپس آبکش نمایید. به‌ها را پوست گرفته، هسته و قسمت‌های سفت وسط آن را جدا کنید و به صورت درشت (مثلاً مکعبی یا هلالی) خرد کنید. در یک تابه جداگانه، تکه‌های به را با کمی روغن به مدت ۱۰-۸ دقیقه تفت دهید تا کمی نرم شوند و رنگشان طلایی شود. پس از نیم‌پز شدن گوشت، آلو بخارا، به‌های تفت داده شده، نمک، شکر، زعفران دم‌کرده و در صورت تمایل آبلیمو یا آبغوره را به خورش اضافه کنید. طعم خورش را بچشید و میزان شکر و آبلیمو را بر اساس ذائقه خود تنظیم کنید (خورش به آلو طعم ملس دارد). اجازه دهید خورش حدود ۱ ساعت دیگر روی حرارت ملایم بپزد تا جا بیفتد، به و آلو کاملاً نرم شوند و غلظت آن مناسب شود. خورش به‌آلو را با برنج سفید سرو کنید."
    ],
    "category": "stew",
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی خرد شده)",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "به متوسط (حدود ۵۰۰ گرم)"
      },
      {
        "item": "آلو بخارا (خشک)",
        "amount": 13.5,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "پیاز متوسط",
        "unit": "عدد"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "شکر (قابل تنظیم)"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 3,
        "item": "زعفران دم‌کرده غلیظ"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "آبلیمو یا آبغوره (اختیاری، برای تعدیل شیرینی)"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "روغن مایع"
      },
      {
        "unit": "به میزان لازم",
        "item": "نمک",
        "amount": 0
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری"
      }
    ],
    "name": "خورش به‌آلو",
    "description": "خورش به‌آلو",
    "calories": 630,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی خرد شده)",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "چغاله‌بادام تازه",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "پیاز متوسط",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 0.5,
        "item": "نعناع تازه خرد شده",
        "unit": "پیمانه"
      },
      {
        "item": "جعفری تازه خرد شده",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "amount": 3,
        "item": "آبغوره یا آبلیمو تازه",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0,
        "item": "روغن مایع",
        "unit": "به میزان لازم"
      },
      {
        "amount": 0,
        "item": "نمک",
        "unit": "به میزان لازم"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      }
    ],
    "id": "dish-1764892701016-f5ok4-4",
    "category": "stew",
    "recipeSteps": [
      "پیاز را نگینی خرد کرده و در قابلمه‌ای با کمی روغن تفت دهید تا طلایی شود. گوشت را اضافه کرده و ۱۰-۸ دقیقه تفت دهید تا تغییر رنگ دهد. زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید. حدود ۳ پیمانه آب جوش به گوشت اضافه کرده و شعله را کم کنید. اجازه دهید گوشت به مدت ۲ تا ۲.۵ ساعت بپزد تا نیم‌پز شود. در این فاصله، چغاله‌بادام‌ها را بشویید و اگر خیلی بزرگ هستند، از وسط نصف کنید. نعناع و جعفری خرد شده را در تابه‌ای جداگانه با کمی روغن به مدت ۵-۴ دقیقه تفت دهید تا رنگ آن‌ها کمی تیره شود و عطرشان بلند شود. پس از نیم‌پز شدن گوشت، چغاله‌بادام‌ها، سبزی‌های تفت داده شده، نمک و آبغوره یا آبلیمو را به خورش اضافه کنید. اجازه دهید خورش حدود ۱ ساعت دیگر روی حرارت ملایم بپزد تا چغاله‌بادام‌ها نرم شوند و خورش جا بیفتد. در طول پخت، گاهی هم بزنید. خورش چغاله‌بادام را با برنج سفید سرو کنید."
    ],
    "description": "خورش چغاله‌بادام",
    "name": "خورش چغاله‌بادام",
    "calories": 550,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "amount": 400,
        "item": "گوشت گوسفندی یا گوساله (مکعبی خرد شده)",
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "amount": 6,
        "item": "هویج متوسط (حدود ۵۰۰ گرم)"
      },
      {
        "unit": "عدد",
        "amount": 11,
        "item": "آلو بخارا (خشک)"
      },
      {
        "unit": "عدد",
        "item": "پیاز بزرگ",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "رب گوجه‌فرنگی"
      },
      {
        "amount": 3,
        "item": "زعفران دم‌کرده غلیظ",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "آبلیمو یا آبغوره"
      },
      {
        "amount": 0,
        "item": "روغن مایع",
        "unit": "به میزان لازم"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "زردچوبه",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      }
    ],
    "id": "dish-1764892701016-ievmn-2",
    "name": "خورش هویج تبریزی",
    "description": "خورش هویج تبریزی",
    "category": "stew",
    "recipeSteps": [
      "پیاز را نگینی خرد کرده و در قابلمه‌ای با کمی روغن تفت دهید تا طلایی شود. گوشت را اضافه کرده و ۱۰-۸ دقیقه تفت دهید تا تغییر رنگ دهد و آب آن کشیده شود. زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید. رب گوجه‌فرنگی را اضافه کرده و ۵-۴ دقیقه تفت دهید تا رنگ آن باز شود. حدود ۳ پیمانه آب جوش به گوشت اضافه کرده و شعله را کم کنید. اجازه دهید گوشت به مدت ۲ تا ۲.۵ ساعت بپزد تا نیم‌پز شود. هویج‌ها را پوست گرفته و به صورت خلالی یا نواری (مانند خلال سیب‌زمینی) خرد کنید. در یک تابه جداگانه، هویج‌های خرد شده را با کمی روغن به مدت ۱۵-۱۰ دقیقه تفت دهید تا نرم شوند و کمی تغییر رنگ دهند. آلو بخارا را از ۳۰ دقیقه قبل در آب گرم خیس کنید و سپس آبکش کنید. پس از نیم‌پز شدن گوشت، هویج‌های تفت داده شده، آلو بخارا، نمک، زعفران دم‌کرده و آبلیمو یا آبغوره را به خورش اضافه کنید. اجازه دهید خورش حدود ۴۵ دقیقه تا ۱ ساعت دیگر روی حرارت ملایم بپزد تا جا بیفتد و گوشت کاملاً نرم شود. در طول پخت، گاهی هم بزنید تا ته نگیرد و غلظت آن مناسب شود. خورش را با برنج سرو کنید."
    ],
    "calories": 550,
    "cookTime": 180,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1764892701016-jmf8h-3",
    "description": "خورش لوبیا سبز",
    "name": "خورش لوبیا سبز",
    "category": "stew",
    "recipeSteps": [
      "پیاز را نگینی خرد کرده و در قابلمه‌ای با کمی روغن تفت دهید تا طلایی شود. گوشت را اضافه کرده و ۱۰-۸ دقیقه تفت دهید تا تغییر رنگ دهد و آب آن کشیده شود. زردچوبه و فلفل سیاه را اضافه کرده و ۱ دقیقه دیگر تفت دهید. رب گوجه‌فرنگی را اضافه کرده و ۵-۴ دقیقه تفت دهید تا رنگ آن باز شود. گوجه‌فرنگی رنده شده را اضافه کرده و ۱۰-۸ دقیقه تفت دهید تا آب آن کشیده شود. حدود ۳ پیمانه آب جوش به گوشت و مواد اضافه کرده و شعله را کم کنید. اجازه دهید گوشت به مدت ۲ تا ۲.۵ ساعت بپزد تا نیم‌پز شود. لوبیا سبزها را پاک کرده و به اندازه ۲-۳ سانتی‌متر خرد کنید. لوبیا سبز خرد شده را در تابه با کمی روغن به مدت ۱۰-۸ دقیقه تفت دهید تا کمی نرم شوند و رنگشان تغییر کند. پس از نیم‌پز شدن گوشت، لوبیا سبز تفت داده شده، نمک و آبلیمو یا آبغوره را به خورش اضافه کنید. اگر مایلید خورش غلیظ‌تر شود و سیب‌زمینی دوست دارید، سیب‌زمینی‌ها را پوست گرفته، مکعبی خرد کرده و در همین مرحله به خورش اضافه کنید. اجازه دهید خورش حدود ۱ ساعت دیگر روی حرارت ملایم بپزد تا جا بیفتد و گوشت و لوبیا کاملاً نرم شوند. خورش را با برنج سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 400,
        "unit": "گرم",
        "item": "گوشت گوسفندی یا گوساله (مکعبی خرد شده)"
      },
      {
        "item": "لوبیا سبز تازه",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "amount": 3,
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "عدد",
        "item": "گوجه‌فرنگی متوسط (رنده شده یا پوره شده)",
        "amount": 2
      },
      {
        "amount": 2.5,
        "item": "آبلیمو یا آبغوره",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "item": "نمک",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "عدد",
        "item": "سیب‌زمینی کوچک (اختیاری)",
        "amount": 2
      }
    ],
    "calories": 550,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Khoresht_Bademjan_2.jpg/640px-Khoresht_Bademjan_2.jpg",
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی) (مکعبی خرد شده)",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 4,
        "item": "بادمجان قلمی",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "item": "گوجه فرنگی",
        "amount": 2
      },
      {
        "amount": 1,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه فرنگی",
        "amount": 2
      },
      {
        "item": "غوره",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "زعفران دم کرده",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "نمک"
      },
      {
        "amount": 0,
        "item": "فلفل",
        "unit": "به میزان لازم"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      }
    ],
    "category": "stew",
    "name": "مسمای بادمجان",
    "id": "dish-1764898223981-bdm7x-2",
    "description": "مسمای بادمجان",
    "recipeSteps": [
      "گوشت را با پیاز و ادویه تفت داده و بپزید.",
      "بادمجان‌ها را سرخ کنید.",
      "رب را تفت داده و به گوشت اضافه کنید.",
      "بادمجان و گوجه و غوره را اضافه کرده و بگذارید جا بیفتد."
    ],
    "calories": 650,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "برنج را شسته و با آب، نمک و روغن در قابلمه بریزید.",
      "روی حرارت قرار دهید تا آب آن تبخیر شود و سوراخ‌هایی روی برنج ایجاد شود.",
      "درب قابلمه را با دم‌کنی بگذارید و شعله را کم کنید تا ۴۵ دقیقه دم بکشد."
    ],
    "category": "polo",
    "name": "برنج کته",
    "id": "dish-1764963746654-7fgau-3",
    "ingredients": [
      {
        "item": "برنج ایرانی",
        "amount": 3,
        "unit": "پیمانه"
      },
      {
        "item": "آب",
        "amount": 4.5,
        "unit": "پیمانه"
      },
      {
        "item": "نمک",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن یا کره",
        "amount": 2
      }
    ],
    "hasRealData": true,
    "description": "برنج کته خانگی",
    "calories": 770,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "item": "برنج ایرانی",
        "unit": "پیمانه",
        "amount": 3
      },
      {
        "item": "زعفران دم‌کرده",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "روغن"
      }
    ],
    "description": "پلو مجلسی زعفرانی",
    "name": "پلو زعفرانی",
    "id": "dish-1764963746654-dz8ed-4",
    "recipeSteps": [
      "برنج را آبکش کرده و دم کنید.",
      "پس از دم کشیدن، مقداری از برنج را با زعفران دم‌کرده مخلوط کنید و روی دیس برنج سفید بریزید."
    ],
    "hasRealData": true,
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "چلوکره",
    "hasRealData": true,
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج ایرانی",
        "amount": 3
      },
      {
        "unit": "گرم",
        "item": "کره حیوانی",
        "amount": 50
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "روغن مایع"
      },
      {
        "item": "نمک",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "category": "polo",
    "id": "dish-1764963746654-n5605-2",
    "recipeSteps": [
      "برنج را آبکش کرده و دم کنید.",
      "در انتهای پخت، کره حیوانی را آب کرده و روی برنج داغ بریزید.",
      "معمولاً با کباب یا خورش سرو می‌شود."
    ],
    "description": "چلوکره اصیل",
    "calories": 770,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1764963746654-vpb9t-5",
    "hasRealData": true,
    "category": "polo",
    "recipeSteps": [
      "سبزی‌ها را خرد کنید. برنج را بجوشانید و در دقیقه آخر سبزی را اضافه کرده و آبکش کنید.",
      "مخلوط برنج و سبزی را دم کنید. لابه‌لای آن می‌توانید سیر تازه خرد شده بریزید."
    ],
    "description": "سبزی‌پلو سنتی",
    "name": "سبزی‌پلو",
    "ingredients": [
      {
        "item": "برنج",
        "amount": 3,
        "unit": "پیمانه"
      },
      {
        "item": "سبزی پلویی (تره، جعفری، شوید، گشنیز)",
        "unit": "گرم",
        "amount": 400
      },
      {
        "unit": "حبه",
        "item": "سیر تازه",
        "amount": 2
      },
      {
        "amount": 0,
        "item": "روغن",
        "unit": "به میزان لازم"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "چلو ساده",
    "category": "polo",
    "id": "dish-1764963746654-wrlds-1",
    "ingredients": [
      {
        "item": "برنج ایرانی",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "unit": "پیمانه",
        "amount": 6,
        "item": "آب"
      },
      {
        "item": "نمک (برای آب جوشاندن برنج)",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "روغن مایع (برای ته دیگ و دم کردن)",
        "amount": 3
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "ابتدا برنج را با آب سرد چندین بار بشویید تا آب آن شفاف شود، سپس برنج را با 3 پیمانه آب ولرم و 1 قاشق چای‌خوری نمک برای حداقل 2 تا 3 ساعت خیس کنید.",
      "در یک قابلمه بزرگ، حدود 6 پیمانه آب و 2 قاشق غذاخوری نمک را به جوش آورید.",
      "آب برنج خیس خورده را خالی کرده و برنج را به آب در حال جوش اضافه کنید. اجازه دهید برنج برای 7 تا 10 دقیقه بجوشد تا مغز آن کمی نرم شود اما هنوز کمی سفت باشد.",
      "برنج را آبکش کنید و کمی آب سرد روی آن بریزید.",
      "در قابلمه مورد نظر برای دم کردن، 2 قاشق غذاخوری روغن بریزید.",
      "برنج آبکش شده را به آرامی و به صورت کوه روی ته دیگ بریزید.",
      "روی برنج 1 قاشق غذاخوری روغن مایع یا کره آب شده بریزید. درب قابلمه را با دم‌کنی بپوشانید.",
      "اجازه دهید برنج برای 45 تا 60 دقیقه دم بکشد."
    ],
    "name": "چلو ساده",
    "calories": 650,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "ingredients": [
      {
        "item": "برنج",
        "unit": "پیمانه",
        "amount": 3
      },
      {
        "item": "سینه مرغ پخته",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "پیمانه",
        "item": "ماست چکیده",
        "amount": 1
      },
      {
        "unit": "عدد",
        "item": "زرده تخم مرغ",
        "amount": 3
      },
      {
        "item": "زعفران",
        "unit": "قاشق غذاخوری",
        "amount": 4
      },
      {
        "item": "روغن",
        "unit": "پیمانه",
        "amount": 0.5
      }
    ],
    "name": "ته‌چین مرغ",
    "hasRealData": true,
    "category": "polo",
    "description": "ته‌چین مرغ کلاسیک",
    "recipeSteps": [
      "برنج را زنده آبکش کنید.",
      "ماست، زرده تخم مرغ، زعفران و روغن را مخلوط کنید و برنج را به آن اضافه کنید.",
      "نیمی از مواد را کف قابلمه یا قالب ریخته، مرغ پخته را وسط آن بگذارید و بقیه برنج را روی آن بریزید و فشرده کنید. دم کنید."
    ],
    "id": "dish-1764963753655-41gk1-4",
    "calories": 600,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "recipeSteps": [
      "مشابه ته‌چین مرغ، اما به جای مرغ از گوشت پخته شده و ریش شده استفاده کنید."
    ],
    "name": "ته‌چین گوشت",
    "hasRealData": true,
    "category": "polo",
    "description": "ته‌چین با گوشت گوسفندی",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج"
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گوشت پخته شده"
      },
      {
        "unit": "طبق دستور ته‌چین",
        "item": "مایه ته‌چین (ماست، تخم مرغ، زعفران)",
        "amount": 0
      }
    ],
    "id": "dish-1764963753655-7wd66-5",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "hasRealData": true,
    "ingredients": [
      {
        "amount": 4,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "amount": 500,
        "item": "سبزی پلویی",
        "unit": "گرم"
      },
      {
        "unit": "تکه",
        "amount": 4,
        "item": "ماهی (قزل‌آلا یا سفید)"
      },
      {
        "unit": "به میزان لازم",
        "item": "آرد و زردچوبه (برای سرخ کردن)",
        "amount": 0
      }
    ],
    "description": "سبزی‌پلو با ماهی سرخ شده",
    "id": "dish-1764963753655-ahley-1",
    "recipeSteps": [
      "سبزی پلو را آماده کنید (مانند دستور سبزی پلو).",
      "ماهی‌ها را مزه‌دار کرده و در روغن سرخ کنید و کنار پلو سرو نمایید."
    ],
    "category": "polo",
    "name": "سبزی‌پلو با ماهی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "name": "ته‌چین ماهی",
    "category": "polo",
    "hasRealData": true,
    "recipeSteps": [
      "ماهی مزه‌دار شده و کمی سرخ شده را وسط ته‌چین قرار دهید."
    ],
    "id": "dish-1764963753655-h2ikp-8",
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "amount": 400,
        "item": "فیله ماهی نیم‌پز",
        "unit": "گرم"
      },
      {
        "amount": 0,
        "unit": "مقداری",
        "item": "سبزی معطر"
      },
      {
        "unit": "طبق دستور",
        "item": "مایه ته‌چین",
        "amount": 0
      }
    ],
    "description": "ته‌چین ماهی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "hasRealData": true,
    "ingredients": [
      {
        "item": "برنج",
        "amount": 4,
        "unit": "پیمانه"
      },
      {
        "item": "مرغ پخته ریش شده",
        "unit": "گرم",
        "amount": 300
      },
      {
        "item": "خلال پسته و بادام",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "زرشک",
        "amount": 0.5
      },
      {
        "item": "خلال پوست پرتقال",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "item": "هویج",
        "unit": "عدد",
        "amount": 2
      }
    ],
    "description": "جواهر پلو",
    "recipeSteps": [
      "برنج را ساده دم کنید.",
      "مواد تزیینی (زرشک، خلال‌ها، هویج تفت داده شده) را آماده کنید.",
      "هنگام سرو، لایه لایه مواد را روی برنج یا لابه‌لای آن بکشید."
    ],
    "id": "dish-1764963753655-pki6g-2",
    "category": "polo",
    "name": "مرصع‌پلو",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "category": "polo",
    "name": "شیرین‌پلو",
    "id": "dish-1764963753655-qcn03-3",
    "ingredients": [
      {
        "item": "برنج",
        "unit": "پیمانه",
        "amount": 4
      },
      {
        "amount": 300,
        "item": "مرغ",
        "unit": "گرم"
      },
      {
        "amount": 1,
        "item": "خلال پرتقال شیرین شده",
        "unit": "پیمانه"
      },
      {
        "amount": 0,
        "item": "شکر",
        "unit": "به میزان دلخواه"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "زعفران"
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "خلال پرتقال را شیرین کنید و با شکر و زعفران تفت دهید.",
      "مرغ را بپزید.",
      "مواد را لابه‌لای برنج آبکش شده داده و دم کنید."
    ],
    "description": "شیرین‌پلو مجلسی",
    "calories": 730,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "ته‌چین بادمجان",
    "hasRealData": true,
    "recipeSteps": [
      "بادمجان‌های حلقه‌ای سرخ شده را در لایه میانی ته‌چین قرار دهید."
    ],
    "id": "dish-1764963753655-rmww9-6",
    "category": "polo",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "unit": "عدد",
        "item": "بادمجان سرخ شده",
        "amount": 3
      },
      {
        "item": "مایه ته‌چین",
        "unit": "طبق دستور",
        "amount": 0
      }
    ],
    "description": "ته‌چین بادمجان و گوشت/مرغ",
    "calories": 750,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "hasRealData": true,
    "name": "ته‌چین اسفناج",
    "description": "ته‌چین اسفناج",
    "recipeSteps": [
      "اسفناج تفت داده شده را لای برنج زعفرانی قرار داده و دم کنید."
    ],
    "ingredients": [
      {
        "item": "برنج",
        "amount": 3,
        "unit": "پیمانه"
      },
      {
        "amount": 500,
        "item": "اسفناج تفت داده شده",
        "unit": "گرم"
      },
      {
        "item": "مایه ته‌چین",
        "unit": "طبق دستور",
        "amount": 0
      }
    ],
    "id": "dish-1764963753655-y6rbu-7",
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1764963758566-0t8dk-3",
    "description": "عدس‌پلو با گوشت",
    "recipeSteps": [
      "مایه گوشتی (گوشت، پیاز، رب و ادویه) را آماده کنید و لای برنج و عدس دم کنید."
    ],
    "hasRealData": true,
    "category": "polo",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "عدس پخته"
      },
      {
        "item": "گوشت چرخ‌کرده",
        "amount": 300,
        "unit": "گرم"
      },
      {
        "amount": 0,
        "item": "پیاز و کشمش",
        "unit": "به میزان لازم"
      }
    ],
    "name": "عدس‌پلو با گوشت چرخ‌کرده",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "recipeSteps": [
      "رشته را در دقیقه آخر جوشیدن برنج اضافه کنید تا نرم شود.",
      "آبکش کرده و دم کنید. با کشمش و خرما سرو کنید."
    ],
    "name": "رشته‌پلو",
    "category": "polo",
    "id": "dish-1764963758566-jmqgf-6",
    "hasRealData": true,
    "ingredients": [
      {
        "item": "برنج",
        "unit": "پیمانه",
        "amount": 3
      },
      {
        "unit": "گرم",
        "item": "رشته پلویی",
        "amount": 150
      },
      {
        "item": "کشمش و خرما (برای تزیین)",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "description": "رشته‌پلو سنتی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "لوبیاپلو با گوشت تکه‌ای",
    "category": "polo",
    "id": "dish-1764963758566-joss6-4",
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "amount": 400,
        "unit": "گرم",
        "item": "لوبیا سبز خرد شده"
      },
      {
        "amount": 300,
        "item": "گوشت خورشتی ریز",
        "unit": "گرم"
      },
      {
        "unit": "قاشق",
        "item": "رب گوجه",
        "amount": 3
      },
      {
        "item": "ادویه پلویی و دارچین",
        "unit": "به میزان لازم",
        "amount": 0
      }
    ],
    "hasRealData": true,
    "name": "لوبیاپلو",
    "recipeSteps": [
      "گوشت و لوبیا را بپزید و با رب تفت دهید.",
      "مواد را لای برنج آبکش شده داده و با دارچین فراوان دم کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "category": "polo",
    "description": "ته‌چین میگو",
    "recipeSteps": [
      "میگوها را با پیاز و ادویه تفت دهید و لای برنج زعفرانی بگذارید."
    ],
    "id": "dish-1764963758566-psc88-1",
    "name": "ته‌چین میگو",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج"
      },
      {
        "amount": 400,
        "unit": "گرم",
        "item": "میگو ریز یا متوسط"
      },
      {
        "unit": "طبق دستور",
        "item": "مایه ته‌چین",
        "amount": 0
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "ماش‌پلو با مرغ یا گوشت",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "item": "ماش پخته",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "item": "گوشت قلقلی یا مرغ ریش شده",
        "unit": "گرم",
        "amount": 300
      }
    ],
    "category": "polo",
    "recipeSteps": [
      "ماش را جدا بپزید. برنج را آبکش کنید و ماش را به آن اضافه کنید.",
      "با گوشت قلقلی یا مرغ سرو کنید."
    ],
    "hasRealData": true,
    "id": "dish-1764963758566-uxndx-5",
    "name": "ماش‌پلو",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "عدس‌پلو با کشمش و خرما",
    "id": "dish-1764963758566-y1ach-2",
    "description": "عدس‌پلو مجلسی",
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "عدس پخته",
        "amount": 1
      },
      {
        "item": "کشمش پلویی",
        "unit": "پیمانه",
        "amount": 0.5
      },
      {
        "amount": 10,
        "item": "خرما",
        "unit": "عدد"
      }
    ],
    "hasRealData": true,
    "recipeSteps": [
      "برنج را با عدس پخته آبکش کنید.",
      "کشمش و خرما را تفت داده و هنگام سرو روی پلو بریزید یا لای پلو دم کنید."
    ],
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "ingredients": [
      {
        "item": "برنج",
        "unit": "پیمانه",
        "amount": 3
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "لوبیا سبز"
      },
      {
        "unit": "گرم",
        "item": "گوشت چرخ کرده",
        "amount": 200
      },
      {
        "amount": 2,
        "item": "رب گوجه",
        "unit": "قاشق"
      }
    ],
    "id": "dish-1764963763030-apvrx-2",
    "category": "polo",
    "hasRealData": true,
    "name": "دمی لوبیا سبز",
    "description": "استانبولی پلو با لوبیا سبز",
    "recipeSteps": [
      "مایه گوشت و لوبیا را آماده کنید.",
      "با برنج به صورت کته (دمی) بپزید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "category": "polo",
    "recipeSteps": [
      "بادمجان را سرخ کنید و با برنج و گوجه دمی کنید."
    ],
    "name": "دمی بادمجان",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج"
      },
      {
        "unit": "عدد",
        "amount": 3,
        "item": "بادمجان نگینی"
      },
      {
        "item": "گوشت چرخ کرده (اختیاری)",
        "unit": "گرم",
        "amount": 200
      }
    ],
    "description": "پلو بادمجان dمی",
    "id": "dish-1764963763030-fstg7-3",
    "calories": 750,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "hasRealData": true,
    "description": "دمی گوجه (استانبولی)",
    "ingredients": [
      {
        "item": "برنج",
        "amount": 3,
        "unit": "پیمانه"
      },
      {
        "item": "گوجه فرنگی",
        "amount": 5,
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "item": "سیب زمینی",
        "amount": 2
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز"
      }
    ],
    "category": "polo",
    "name": "دمی گوجه",
    "id": "dish-1764963763030-kt5bs-1",
    "recipeSteps": [
      "پیاز و سیب زمینی را تفت دهید. پوره گوجه را اضافه کنید.",
      "برنج و آب را اضافه کرده و به صورت کته دم کنید."
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "id": "dish-1764963763030-yn2x6-5",
    "name": "پلو مرغ رشتی",
    "hasRealData": true,
    "category": "polo",
    "description": "پلو با مرغ سرخ شده به سبک رشتی",
    "recipeSteps": [
      "مرغ را با رب انار و ادویه سرخ کرده و بپزید.",
      "با برنج کته نرم سرو کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج کته"
      },
      {
        "unit": "تکه",
        "item": "مرغ",
        "amount": 3
      },
      {
        "amount": 2,
        "item": "رب انار",
        "unit": "قاشق"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "polo",
    "id": "dish-1764963763030-zpsrn-4",
    "name": "دمی سیب‌زمینی",
    "description": "سیب‌زمینی پلو",
    "recipeSteps": [
      "سیب زمینی را با برنج و آب و روغن کته کنید."
    ],
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج"
      },
      {
        "item": "سیب زمینی نگینی",
        "unit": "عدد",
        "amount": 3
      },
      {
        "amount": 2,
        "unit": "قاشق",
        "item": "شوید خشک (اختیاری)"
      }
    ],
    "hasRealData": true,
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "category": "polo",
    "id": "dish-1764963767481-wyzu1-1",
    "name": "زرشک‌پلو با مرغ",
    "description": "زرشک‌پلو با مرغ مجلسی",
    "recipeSteps": [
      "مرغ را با سس رب گوجه و زعفران بپزید.",
      "برنج را دم کنید و با زرشک تفت داده شده تزیین کنید."
    ],
    "ingredients": [
      {
        "amount": 4,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "amount": 4,
        "unit": "تکه",
        "item": "مرغ"
      },
      {
        "item": "زرشک",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "amount": 0,
        "unit": "فراوان",
        "item": "زعفران"
      }
    ],
    "hasRealData": true,
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "گل کلم را تفت دهید و با مایه گوشتی مخلوط کنید.",
      "لابه‌لای برنج دم کنید."
    ],
    "id": "dish-1764963767482-5q23p-3",
    "description": "پلو مخلوط با گل کلم",
    "hasRealData": true,
    "name": "پلو گل‌کلم",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج"
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گل کلم خرد شده"
      },
      {
        "amount": 200,
        "item": "گوشت چرخ کرده",
        "unit": "گرم"
      }
    ],
    "category": "polo",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1764963767482-9dduu-2",
    "name": "پلو هویج تبریزی",
    "recipeSteps": [
      "هویج را سرخ کنید. گوشت را تفت دهید.",
      "لابه‌لای برنج دم کنید."
    ],
    "description": "هویج پلو با گوشت",
    "hasRealData": true,
    "category": "polo",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج"
      },
      {
        "item": "هویج خلالی",
        "unit": "گرم",
        "amount": 500
      },
      {
        "item": "گوشت چرخ کرده",
        "unit": "گرم",
        "amount": 300
      },
      {
        "item": "زعفران",
        "unit": "به میزان لازم",
        "amount": 0
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "amount": 4,
        "item": "بادمجان حلقه ای سرخ شده",
        "unit": "عدد"
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گوشت چرخ کرده"
      }
    ],
    "category": "polo",
    "hasRealData": true,
    "name": "پلو بادمجان",
    "recipeSteps": [
      "بادمجان سرخ شده و سس گوشت را لای برنج آبکش شده بدهید و دم کنید."
    ],
    "description": "پلو بادمجان (غیر از دمی)",
    "id": "dish-1764963767482-hbuhi-4",
    "calories": 750,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 3
      },
      {
        "amount": 1,
        "item": "ماش",
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "عدس",
        "amount": 1
      }
    ],
    "category": "polo",
    "recipeSteps": [
      "حبوبات را بپزید و با برنج آبکش کنید و دم بگذارید."
    ],
    "id": "dish-1764963767482-hhql5-5",
    "description": "پلو مخلوط حبوبات",
    "name": "پلو ماش و عدس",
    "hasRealData": true,
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "recipeSteps": [
      "گشنیز را لای برنج بدهید و دم کنید.",
      "با مرغ یا ماهی سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 3,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گشنیز خرد شده"
      },
      {
        "item": "مرغ یا ماهی",
        "unit": "به میزان لازم",
        "amount": 0
      }
    ],
    "category": "polo",
    "name": "پلو گشنیز",
    "description": "گشنیز پلو با مرغ یا ماهی",
    "hasRealData": true,
    "id": "dish-1764963767482-nrul5-6",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "hasRealData": true,
    "category": "polo",
    "name": "پلو شوید و سبزی",
    "description": "شوید پلو ساده",
    "recipeSteps": [
      "شوید را با برنج مخلوط کرده و دم کنید."
    ],
    "id": "dish-1764963767482-tw3pr-7",
    "ingredients": [
      {
        "item": "برنج",
        "amount": 3,
        "unit": "پیمانه"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "شوید تازه یا خشک"
      }
    ],
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "polo",
    "id": "dish-1764963772275-1b8a4-1",
    "recipeSteps": [
      "سبزی و سیر و پیاز را تفت دهید. میگو را اضافه کنید.",
      "با برنج مخلوط کرده و دم کنید."
    ],
    "hasRealData": true,
    "description": "میگو پلو بوشهری",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 3,
        "item": "برنج"
      },
      {
        "item": "میگو ریز",
        "amount": 400,
        "unit": "گرم"
      },
      {
        "amount": 300,
        "item": "سبزی ماهی (گشنیز و شنبلیله)",
        "unit": "گرم"
      },
      {
        "item": "سیر و پیاز",
        "unit": "فراوان",
        "amount": 0
      },
      {
        "item": "تمرهندی",
        "unit": "بسته",
        "amount": 0.5
      }
    ],
    "name": "پلو میگو جنوبی",
    "calories": 650,
    "cookTime": 60,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "ingredients": [
      {
        "item": "نخود",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "item": "لوبیا چیتی",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "amount": 0.33,
        "unit": "پیمانه",
        "item": "عدس"
      },
      {
        "item": "رشته آش",
        "amount": 250,
        "unit": "گرم"
      },
      {
        "item": "سبزی آش",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "item": "پیاز",
        "amount": 2
      },
      {
        "unit": "پیمانه",
        "item": "کشک",
        "amount": 1
      }
    ],
    "name": "آش رشته",
    "category": "ash",
    "recipeSteps": [
      "حبوبات را بپزید.",
      "سبزی را اضافه کنید.",
      "رشته را ریخته و در انتها پیازداغ و کشک بزنید."
    ],
    "id": "dish-1765153028709-kbamy-1",
    "description": "آش رشته سنتی",
    "calories": 300,
    "cookTime": 90,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "id": "dish-1765154178031-2u1zt-1",
    "name": "کوکو سبزی",
    "description": "کوکو سبزی سنتی",
    "recipeSteps": [
      "سبزی را خرد کرده و با تخم‌مرغ و ادویه مخلوط کنید.",
      "مایه را در تابه داغ ریخته و دو طرف آن را سرخ کنید."
    ],
    "ingredients": [
      {
        "item": "سبزی کوکو",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "item": "تخم‌مرغ",
        "unit": "عدد",
        "amount": 6
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "آرد"
      },
      {
        "item": "بکینگ پودر",
        "amount": 0.5,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زرشک",
        "amount": 2
      },
      {
        "unit": "پیمانه",
        "amount": 0.25,
        "item": "گردو خرد شده"
      }
    ],
    "category": "kuku",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "id": "dish-1765154178031-ax5o7-2",
    "category": "kuku",
    "recipeSteps": [
      "سیب‌زمینی‌ها را پخته و له کنید.",
      "با پیاز رنده شده و تخم‌مرغ مخلوط کرده و سرخ کنید."
    ],
    "name": "کوکو سیب‌زمینی",
    "ingredients": [
      {
        "amount": 4,
        "unit": "عدد",
        "item": "سیب‌زمینی متوسط"
      },
      {
        "amount": 3,
        "item": "تخم‌مرغ",
        "unit": "عدد"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "آرد",
        "amount": 1
      }
    ],
    "description": "کوکو سیب‌زمینی",
    "calories": 380,
    "cookTime": 30,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "ابتدا سینه مرغ را با کمی نمک و زردچوبه آب‌پز کنید تا کاملاً پخته شود، سپس آن را ریش ریش کنید و کنار بگذارید",
      "پیاز را رنده کرده و آب اضافه آن را بگیرید",
      "در یک کاسه بزرگ، تخم مرغ‌ها را بشکنید و با چنگال خوب هم بزنید تا یکدست شوند",
      "مرغ ریش ریش شده، پیاز رنده شده، آرد سفید، زردچوبه، نمک، فلفل سیاه، پودر سیر و زعفران دم کرده را به تخم مرغ‌ها اضافه کنید",
      "تمام مواد را با دست یا قاشق به خوبی مخلوط کنید تا یک خمیر منسجم به دست آید",
      "ماهیتابه‌ای نچسب را روی حرارت متوسط قرار دهید و به میزان کافی روغن در آن بریزید تا داغ شود",
      "مواد کوکو را به صورت یکجا در ماهیتابه بریزید و با پشت قاشق سطح آن را صاف کنید",
      "درب ماهیتابه را بگذارید و اجازه دهید کوکو به مدت ۱۵ تا ۲۰ دقیقه با حرارت ملایم بپزد تا یک طرف آن طلایی شود",
      "کوکو را با دقت برگردانید و طرف دیگر آن را نیز ۱۵ تا ۲۰ دقیقه بپزید تا طلایی و مغز پخت شود",
      "پس از پخت، کوکو را به قطعات دلخواه برش بزنید و با نان, گوجه فرنگی و خیارشور سرو کنید."
    ],
    "category": "kuku",
    "name": "کوکو مرغ",
    "description": "کوکو مرغ",
    "ingredients": [
      {
        "amount": 2,
        "unit": "پیمانه",
        "item": "سینه مرغ پخته و ریش ریش شده"
      },
      {
        "amount": 4,
        "item": "تخم مرغ",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط",
        "amount": 1
      },
      {
        "amount": 2,
        "item": "آفر سفید",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "نمک"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه",
        "amount": 0.5
      },
      {
        "amount": 2,
        "item": "زعفران دم کرده غلیظ",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "پودر سیر"
      },
      {
        "item": "روغن مایع",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "id": "dish-1765154181539-v9jom-1",
    "calories": 330,
    "cookTime": 30,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "local",
    "id": "dish-1765482250688-4oewm-1",
    "recipeSteps": [
      "نخود و لوبیا را خیس کنید.",
      "گوشت و حبوبات را بپزید.",
      "در انتها سیب‌زمینی و رب را اضافه کنید."
    ],
    "ingredients": [
      {
        "amount": 500,
        "unit": "گرم",
        "item": "گوشت گوسفندی"
      },
      {
        "item": "نخود",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "amount": 0.5,
        "unit": "پیمانه",
        "item": "لوبیا سفید"
      },
      {
        "item": "پیاز متوسط",
        "unit": "عدد",
        "amount": 2
      },
      {
        "item": "سیب‌زمینی",
        "amount": 3,
        "unit": "عدد"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه فرنگی",
        "amount": 2
      }
    ],
    "description": "دیزی اصیل ایرانی",
    "name": "آبگوشت سنتی (دیزی)",
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "unit": "گرم",
        "item": "گوشت گوسفندی یا گوساله (خورشتی)",
        "amount": 400
      },
      {
        "amount": 500,
        "unit": "گرم",
        "item": "کنگر پاک شده"
      },
      {
        "amount": 2,
        "item": "نعنا خشک",
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "جعفری تازه خرد شده",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "amount": 3.5,
        "unit": "قاشق غذاخوری",
        "item": "آبغوره یا آب لیمو تازه"
      },
      {
        "item": "نمک",
        "amount": 0,
        "unit": "به میزان لازم"
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 1,
        "item": "زردچوبه"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "آب"
      }
    ],
    "recipeSteps": [
      "پیاز را نگینی خرد کرده و در قابلمه با مقداری روغن تفت دهید تا سبک و طلایی شود",
      "گوشت را به پیاز اضافه کنید و تفت دهید تا رنگ گوشت تغییر کند",
      "زردچوبه و فلفل سیاه را اضافه کرده و کمی تفت دهید",
      "۳-۴ پیمانه آب جوش به گوشت اضافه کنید، درب قابلمه را ببندید و اجازه دهید گوشت روی حرارت ملایم حدود ۱.۵ ساعت بپزد تا نیم‌پز شود",
      "در این فاصله، کنگرها را که شسته و به اندازه دلخواه (معمولاً ۳-۴ سانتی‌متر) خرد کرده‌اید، در تابه‌ای با کمی روغن تفت دهید تا کمی نرم شوند",
      "جعفری خرد شده و نعنا خشک را به کنگر اضافه کرده و ۱-۲ دقیقه دیگر تفت دهید تا عطر سبزی‌ها بلند شود (مراقب باشید نعنا نسوزد)",
      "پس از نیم‌پز شدن گوشت، مخلوط کنگر و سبزیجات را به خورش اضافه کنید",
      "نمک و چاشنی ترشی (آبغوره، آب لیمو یا رب انار) را اضافه کنید",
      "اجازه دهید خورش حدود ۴۵ دقیقه تا ۱ ساعت دیگر روی حرارت ملایم بپزد تا گوشت و کنگر کاملاً نرم شوند و خورش جا بیفتد و غلیظ شود",
      "خورش کنگر محلی را با برنج زعفرانی سرو کنید"
    ],
    "category": "stew",
    "hasRealData": true,
    "id": "dish-1765484120785-kshwn-4",
    "description": "خورش کنگر محلی",
    "name": "خورش کنگر محلی",
    "calories": 550,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "گوشت گوسفندی یا گوساله (خورشتی)",
        "unit": "گرم",
        "amount": 400
      },
      {
        "item": "هویج متوسط",
        "unit": "عدد",
        "amount": 3
      },
      {
        "item": "آلو بخارا",
        "unit": "عدد",
        "amount": 13.5
      },
      {
        "amount": 1,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "سیب‌زمینی متوسط"
      },
      {
        "amount": 2,
        "item": "آبغوره یا آبلیمو",
        "unit": "قاشق غذاخوری (اختیاری)"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 1
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه"
      },
      {
        "item": "روغن مایع",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "item": "آب",
        "unit": "پیمانه",
        "amount": 4.5
      }
    ],
    "description": "تاس‌کباب هویج و آلو",
    "category": "nani",
    "hasRealData": true,
    "name": "تاس‌کباب هویج و آلو",
    "id": "dish-1765493252751-2xj5b-2",
    "recipeSteps": [
      "ابتدا آلو بخارا را به مدت ۳۰ دقیقه در آب ولرم خیس کنید",
      "گوشت را به قطعات مکعبی ۲-۳ سانتی‌متری خرد کنید",
      "پیاز را نگینی خرد کنید",
      "در یک قابلمه مناسب، کمی روغن بریزید و پیاز نگینی را روی حرارت متوسط تفت دهید تا نرم و شفاف شود (حدود ۵-۷ دقیقه)",
      "گوشت خرد شده را به پیاز اضافه کنید و حرارت را کمی زیاد کنید. گوشت را تفت دهید تا تغییر رنگ دهد و آب آن کشیده شود (حدود ۱۰ دقیقه)",
      "زردچوبه و فلفل سیاه را به گوشت اضافه کنید و ۱-۲ دقیقه دیگر تفت دهید تا عطر ادویه‌ها بلند شود",
      "رب گوجه‌فرنگی را اضافه کرده و خوب تفت دهید تا رنگ آن باز شود و خامی آن گرفته شود (حدود ۵ دقیقه)",
      "آب (۴-۵ پیمانه) را به قابلمه اضافه کنید و اجازه دهید بجوشد. سپس حرارت را کم کنید، در قابلمه را بگذارید و اجازه دهید گوشت به مدت ۱.۵ تا ۲ ساعت بپزد تا نیم‌پز شود",
      "در این فاصله، هویج‌ها را پوست بگیرید و به صورت حلقه‌ای یا اریب خرد کنید. سیب‌زمینی‌ها را نیز پوست بگیرید و به صورت مکعبی درشت یا حلقه‌ای خرد کنید",
      "پس از نیم‌پز شدن گوشت، هویج‌های خرد شده و آلو بخارای خیس خورده و آبکش شده را به خوراک اضافه کنید",
      "نمک، آبغوره (یا آبلیمو) و زعفران دم‌کرده را نیز اضافه کنید",
      "اجازه دهید خوراک به مدت ۳۰ دقیقه دیگر با حرارت ملایم بپزد تا هویج‌ها و آلو نرم شوند",
      "در ۱۵ دقیقه پایانی پخت، سیب‌زمینی‌های خرد شده را اضافه کنید و اجازه دهید تاس‌کباب جا بیفتد و سیب‌زمینی‌ها نرم شوند",
      "تاس‌کباب را بچشید و در صورت نیاز نمک و چاشنی آن را تنظیم کنید. این خوراک را می‌توان با نان یا کته سرو کرد."
    ],
    "calories": 400,
    "cookTime": 105,
    "difficulty": "سخت",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "ingredients": [
      {
        "item": "برنج ایرانی",
        "amount": 2.5,
        "unit": "پیمانه (۶۲۵ گرم)"
      },
      {
        "amount": 1,
        "unit": "پیمانه (۲۰۰ گرم)",
        "item": "عدس سبز"
      },
      {
        "amount": 1,
        "item": "پیاز متوسط",
        "unit": "عدد"
      },
      {
        "unit": "عدد",
        "item": "سیب‌زمینی متوسط",
        "amount": 1
      },
      {
        "amount": 0,
        "item": "روغن مایع یا کره",
        "unit": "به میزان لازم"
      },
      {
        "item": "زردچوبه",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "نمک",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "amount": 0.5,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل سیاه"
      },
      {
        "item": "آب",
        "unit": "پیمانه",
        "amount": 3.5
      }
    ],
    "category": "polo",
    "recipeSteps": [
      "برنج را از ۲ ساعت قبل با آب و کمی نمک خیس کنید",
      "عدس را از ۱ ساعت قبل خیس کنید و آب آن را عوض کنید",
      "پیاز را نگینی خرد کنید",
      "در یک قابلمه مناسب، کمی روغن بریزید و پیاز نگینی را روی حرارت متوسط تفت دهید تا نرم و شفاف شود (حدود ۵-۷ دقیقه)",
      "زردچوبه و فلفل سیاه را اضافه کنید و ۱ دقیقه تفت دهید تا عطر ادویه‌ها بلند شود",
      "عدس خیس خورده و آبکش شده را به پیاز اضافه کنید و ۱-۲ دقیقه همراه پیاز تفت دهید",
      "برنج خیس خورده و آبکش شده را به عدس و پیاز اضافه کنید و به آرامی هم بزنید تا مواد مخلوط شوند",
      "نمک و آب را به حدی اضافه کنید که حدود ۱ بند انگشت روی سطح برنج را بپوشاند (برای دمی معمولا آب کمتری نسبت به کته نیاز است)",
      "حرارت را زیاد کنید تا آب برنج بجوشد و سطح آن بخار شود. کف‌های روی برنج را بگیرید",
      "سیب‌زمینی را پوست بگیرید و به صورت حلقه‌ای برش بزنید",
      "وقتی آب برنج کشیده شد و حفره‌هایی روی سطح آن ایجاد شد، حرارت را کم کنید. حلقه‌های سیب‌زمینی را کف قابلمه بچینید (این کار اختیاری است و برای ته‌دیگ است)",
      "برنج را به آرامی روی سیب‌زمینی‌ها بریزید و سطح آن را صاف کنید",
      "دم‌کنی بگذارید و اجازه دهید دمی عدس به مدت ۴۵-۵۰ دقیقه روی حرارت بسیار ملایم دم بکشد و مغز پخت شود",
      "پس از دم کشیدن، دمی عدس را در دیس بکشید و در صورت تمایل با پیاز داغ و کمی دارچین سرو کنید."
    ],
    "description": "دمی عدس محلی",
    "hasRealData": true,
    "id": "dish-1765493252751-c843y-4",
    "name": "دمی عدس محلی",
    "calories": 770,
    "cookTime": 120,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "زعفران، زیره یا شوید"
  },
  {
    "category": "nani",
    "hasRealData": true,
    "name": "خوراک سیرابی لری",
    "ingredients": [
      {
        "item": "سیرابی گوسفند یا گوساله",
        "unit": "کیلوگرم",
        "amount": 1
      },
      {
        "item": "نخود",
        "unit": "پیمانه (۱۰۰ گرم)",
        "amount": 0.5
      },
      {
        "amount": 2,
        "item": "پیاز بزرگ",
        "unit": "عدد"
      },
      {
        "amount": 4,
        "unit": "حبه",
        "item": "سیر"
      },
      {
        "amount": 1.5,
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "item": "نمک",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "amount": 2.5,
        "item": "لیموعمانی خشک",
        "unit": "عدد (اختیاری)"
      },
      {
        "item": "آب",
        "amount": 7,
        "unit": "پیمانه"
      }
    ],
    "recipeSteps": [
      "ابتدا سیرابی را کاملا تمیز کرده و اگر نیاز بود با آب و سرکه یا نمک خیسانده و بشویید. سپس به قطعات کوچک (حدود ۲-۳ سانتی‌متری) خرد کنید",
      "نخود را از شب قبل خیس کنید و چند بار آب آن را عوض کنید",
      "سیرابی خرد شده را به همراه نخود خیس خورده در یک قابلمه بزرگ بریزید و به میزان کافی آب اضافه کنید تا روی سیرابی و نخود را بپوشاند",
      "اجازه دهید آب به جوش بیاید، کف روی آن را بگیرید و سپس حرارت را بسیار کم کنید و در قابلمه را بگذارید. سیرابی را به مدت ۳-۴ ساعت بپزید تا کاملا نرم شود (زمان پخت بسته به نوع و سن سیرابی متفاوت است)",
      "در این فاصله، پیازها را نگینی خرد کنید و سیر را له یا رنده کنید",
      "در یک تابه جداگانه، کمی روغن بریزید و پیاز نگینی را روی حرارت متوسط تفت دهید تا طلایی و سبک شود (حدود ۷-۱۰ دقیقه)",
      "سیر له شده، زردچوبه و فلفل سیاه را به پیاز اضافه کنید و ۱-۲ دقیقه دیگر تفت دهید تا عطرشان بلند شود",
      "اگر از لیموعمانی استفاده می‌کنید، آن را با چنگال سوراخ کرده و در ۳۰ دقیقه پایانی پخت سیرابی به قابلمه اضافه کنید",
      "پس از اینکه سیرابی و نخود کاملا نرم شدند، مخلوط پیاز و سیر تفت داده شده را به قابلمه اضافه کنید",
      "نمک خوراک را نیز در این مرحله تنظیم کنید",
      "اجازه دهید خوراک به مدت ۳۰-۴۵ دقیقه دیگر با حرارت ملایم بجوشد تا طعم‌ها به خوبی با هم ترکیب شوند و خوراک جا بیفتد",
      "خوراک سیرابی لری را داغ با نان سنگک یا بربری تازه سرو کنید."
    ],
    "id": "dish-1765493252751-d8dfw-3",
    "description": "خوراک سیرابی لری",
    "calories": 400,
    "cookTime": 105,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "description": "دمبه‌پلو عشایری",
    "name": "دمبه‌پلو عشایری",
    "hasRealData": true,
    "recipeSteps": [
      "برنج را از ۲ ساعت قبل با آب و نمک خیس کنید و کنار بگذارید",
      "دنبه را به قطعات کوچک (حدود ۱ سانتی‌متر) خرد کنید",
      "دنبه خرد شده را در یک قابلمه مناسب روی حرارت ملایم قرار دهید تا به آرمانی آب شود و روغن آن خارج شود و دنبه‌ها طلایی و برشته شوند (حدود ۱۵-۲۰ دقیقه). چربی‌های برشته شده را از قابلمه خارج کنید و کنار بگذارید (اختیاری)",
      "پیازها را خلالی نازک خرد کنید",
      "پیازهای خلالی را به همان روغن دنبه اضافه کنید و روی حرارت ملایم تفت دهید تا کاملا طلایی و سبک شوند (حدود ۱۰-۱۵ دقیقه)",
      "زردچوبه و فلفل سیاه را به پیازها اضافه کنید و ۱ دقیقه تفت دهید تا عطر ادویه‌ها خارج شود",
      "برنج خیس خورده را آبکش کرده و به مخلوط پیاز و ادویه اضافه کنید و به آرامی هم بزنید تا دانه‌های برنج نشکنند",
      "آب و نمک کافی (نمک را بچشید و تنظیم کنید) را به برنج اضافه کنید تا حدود ۱ بند انگشت روی سطح برنج را بپوشاند",
      "حرارت را زیاد کنید تا آب برنج بجوشد و سطح آن بخار شود",
      "وقتی آب برنج تقریبا کشیده شد و حفره‌هایی روی سطح برنج ایجاد شد، حرارت را کم کنید، دم‌کنی بگذارید و اجازه دهید برنج به مدت ۴۵-۵۰ دقیقه کاملا دم بکشد و مغز پخت شود",
      "پس از دم کشیدن، پلو را در دیس بکشید و در صورت تمایل چربی‌های برشته شده دنبه را روی آن قرار دهید و سرو کنید."
    ],
    "ingredients": [
      {
        "amount": 3,
        "unit": "پیمانه (۷۵۰ گرم)",
        "item": "برنج ایرانی"
      },
      {
        "unit": "گرم",
        "item": "دنبه گوسفندی",
        "amount": 150
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط",
        "amount": 2
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "نمک",
        "unit": "به میزان لازم",
        "amount": 0
      },
      {
        "amount": 4.5,
        "item": "آب",
        "unit": "پیمانه"
      }
    ],
    "category": "polo",
    "id": "dish-1765493252751-mhe21-1",
    "calories": 800,
    "cookTime": 120,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "لپه‌پلو جنوبی",
    "ingredients": [
      {
        "amount": 3,
        "unit": "پیمانه (۷۵۰ گرم)",
        "item": "برنج ایرانی"
      },
      {
        "item": "لپه",
        "amount": 1,
        "unit": "پیمانه (۲۰۰ گرم)"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "item": "رب گوجه‌فرنگی",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "زردچوبه",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "پودر دارچین",
        "amount": 0.5
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "نمک"
      },
      {
        "item": "روغن مایع",
        "amount": 0,
        "unit": "به میزان لازم"
      },
      {
        "unit": "قاشق غذاخوری (اختیاری)",
        "item": "زعفران دم‌کرده غلیظ",
        "amount": 1
      },
      {
        "item": "آب",
        "unit": "به میزان لازم",
        "amount": 0
      }
    ],
    "category": "polo",
    "recipeSteps": [
      "برنج را از ۲ ساعت قبل با آب و نمک خیس کنید",
      "لپه را از شب قبل خیس کنید و آب آن را چند بار عوض کنید تا نفخ آن گرفته شود. سپس لپه را با مقداری آب در قابلمه بپزید تا نیم‌پز شود اما له نشود (حدود ۳۰-۴۰ دقیقه) و آبکش کنید",
      "پیازها را نگینی خرد کنید",
      "در یک قابلمه مناسب، کمی روغن بریزید و پیاز نگینی را روی حرارت متوسط تفت دهید تا طلایی و سبک شود (حدود ۷-۱۰ دقیقه)",
      "زردچوبه و فلفل سیاه را اضافه کنید و ۱ دقیقه تفت دهید",
      "رب گوجه‌فرنگی را اضافه کرده و خوب تفت دهید تا رنگ آن باز شود و خامی آن گرفته شود (حدود ۵ دقیقه)",
      "لپه نیم‌پز شده را به مخلوط پیاز و رب اضافه کنید و ۱-۲ دقیقه تفت دهید",
      "حالا نوبت دم کردن پلو است. برنج خیس خورده را آبکش کرده و به مخلوط لپه اضافه کنید. دارچین و نیمی از زعفران دم‌کرده (اگر استفاده می‌کنید) را نیز اضافه کنید",
      "مواد را به آرامی با هم مخلوط کنید تا دانه‌های برنج نشکنند",
      "کف قابلمه‌ای که برای دم کردن پلو انتخاب کرده‌اید، کمی روغن بریزید. می‌توانید برای ته‌دیگ از نان لواش یا سیب‌زمینی حلقه‌ای استفاده کنید",
      "مخلوط برنج و لپه را روی ته‌دیگ بریزید و سطح آن را صاف کنید",
      "حرارت را زیاد کنید تا بخار در قابلمه جمع شود. سپس حرارت را کم کنید، دم‌کنی بگذارید و اجازه دهید پلو به مدت ۴۵-۵۰ دقیقه دم بکشد و مغز پخت شود",
      "پس از دم کشیدن، پلو را در دیس بکشید و در صورت تمایل با باقیمانده زعفران دم‌کرده تزئین کرده و سرو کنید. این پلو را می‌توان با ماست و خیار یا سالاد شیرازی سرو کرد."
    ],
    "id": "dish-1765493252751-snsly-5",
    "hasRealData": true,
    "name": "لپه‌پلو جنوبی",
    "calories": 650,
    "cookTime": 120,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "name": "قلیه خرچنگ بوشهری",
    "id": "dish-1765493259478-6rgb3-1",
    "description": "قلیه خرچنگ بوشهری",
    "recipeSteps": [
      "ابتدا خرچنگ‌ها را به خوبی تمیز کرده، قسمت‌های اضافی را جدا کرده و به قطعات مناسب تقسیم کنید",
      "تمبر هندی را با ۱ لیوان آب گرم مخلوط کرده و بگذارید ۱۵ دقیقه بماند، سپس از صافی رد کرده و با دست فشار دهید تا عصاره آن خارج شود و تفاله را دور بریزید",
      "پیازها را نگینی خرد کرده و در قابلمه‌ای با روغن داغ تفت دهید تا سبک و طلایی شوند",
      "سیرها را له کرده و به پیاز اضافه کنید، حدود ۲ دقیقه تفت دهید تا عطر آن بلند شود",
      "زردچوبه و فلفل قرمز را اضافه کرده و برای ۳۰ ثانیه تفت دهید",
      "سبزی خرد شده را اضافه کرده و با حرارت متوسط تفت دهید تا آب سبزی کشیده شود و رنگ آن تیره شود (حدود ۱۵-۲۰ دقیقه)",
      "در صورت تمایل رب گوجه فرنگی را اضافه کرده و ۱-۲ دقیقه تفت دهید",
      "عصاره تمبر هندی را به مواد اضافه کنید و هم بزنید",
      "خرچنگ‌ها را به خورش اضافه کنید و اجازه دهید ۵ دقیقه با مواد دیگر تفت بخورند",
      "۳-۴ لیوان آب جوش اضافه کنید (یا تا حدی که روی خرچنگ‌ها را بگیرد)",
      "نمک را اندازه کرده و حرارت را کم کنید، درب قابلمه را گذاشته و اجازه دهید خورش به مدت ۴۵ دقیقه تا ۱ ساعت جا بیفتد و خرچنگ‌ها بپزند و نرم شوند",
      "خورش را با پلو یا نان سرو کنید."
    ],
    "category": "stew",
    "ingredients": [
      {
        "item": "خرچنگ تازه",
        "amount": 8,
        "unit": "عدد متوسط (حدود ۱.۵ کیلوگرم)"
      },
      {
        "amount": 1.1,
        "unit": "کیلوگرم",
        "item": "سبزی قلیه (گشنیز و شنبلیله)"
      },
      {
        "unit": "عدد",
        "amount": 2,
        "item": "پیاز متوسط"
      },
      {
        "item": "سیر",
        "amount": 10,
        "unit": "حبه"
      },
      {
        "unit": "گرم",
        "item": "تمبر هندی",
        "amount": 200
      },
      {
        "item": "رب گوجه فرنگی",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "روغن مایع"
      },
      {
        "amount": 1,
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "فلفل قرمز",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "item": "نمک",
        "amount": 0
      }
    ],
    "hasRealData": true,
    "calories": 550,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "نخود، لوبیا و گندم را از شب قبل خیس کنید و آب آن را چند بار عوض کنید",
      "حبوبات خیس خورده را جداگانه بپزید تا نیم‌پز شوند (عدس زودتر می‌پزد، پس جدا بپزید)",
      "کنجد خام را در تابه روی حرارت ملایم برای ۵-۷ دقیقه تفت دهید تا کمی رنگ بگیرد و عطر آن بلند شود، سپس آن را آسیاب کنید تا پودر شود",
      "یکی از پیازها را نگینی خرد کرده و در قابلمه‌ای با کمی روغن تفت دهید تا طلایی شود",
      "نصف سیرها را له کرده و به پیاز اضافه کنید، ۱ دقیقه تفت دهید",
      "زردچوبه را اضافه کرده و کمی تفت دهید",
      "حبوبات نیم‌پز (به جز عدس) را به پیاز و سیر اضافه کرده و همراه با ۶-۷ پیمانه آب به مدت ۱ ساعت بپزید تا کاملاً نرم شوند",
      "پس از ۱ ساعت، عدس پخته شده و سبزی آش خرد شده را اضافه کنید و اجازه دهید آش برای ۳۰ دقیقه دیگر بپزد",
      "کنجد آسیاب شده را به آش اضافه کنید، هم بزنید و اجازه دهید آش به غلظت دلخواه برسد و جا بیفتد",
      "در این مرحله نمک و فلفل آش را اندازه کنید",
      "در تابه‌ای جداگانه، باقیمانده پیازها را خلالی خرد کرده و سرخ کنید تا پیاز داغ طلایی شود",
      "باقیمانده سیرها را له کرده و به پیاز داغ اضافه کنید، کمی تفت دهید و سپس نعناع خشک را اضافه کرده و ۳۰ ثانیه تفت دهید (نعناع داغ آماده است)",
      "آش را در ظرف سرو کشیده و با کشک، پیاز داغ، نعناع داغ و کمی سیر داغ تزیین کنید."
    ],
    "name": "آش کنجد",
    "id": "dish-1765493259478-7xa89-4",
    "description": "آش کنجد",
    "hasRealData": true,
    "category": "ash",
    "ingredients": [
      {
        "amount": 1,
        "item": "کنجد خام",
        "unit": "پیمانه (۱۵۰ گرم)"
      },
      {
        "item": "گندم پوست کنده (بلغور گندم)",
        "amount": 1,
        "unit": "پیمانه"
      },
      {
        "item": "نخود",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "unit": "پیمانه",
        "item": "لوبیا سفید",
        "amount": 0.5
      },
      {
        "item": "عدس",
        "unit": "پیمانه",
        "amount": 0.25
      },
      {
        "amount": 3,
        "unit": "عدد",
        "item": "پیاز بزرگ"
      },
      {
        "amount": 600,
        "unit": "گرم",
        "item": "سبزی آش"
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 6
      },
      {
        "item": "نعناع خشک",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "کشک",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "amount": 0,
        "item": "نمک و فلفل سیاه",
        "unit": "به میزان لازم"
      }
    ],
    "calories": 300,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "قلیه ماهی سفید کاسپین",
    "category": "stew",
    "hasRealData": true,
    "id": "dish-1765493259478-jkw0h-2",
    "ingredients": [
      {
        "amount": 700,
        "item": "ماهی سفید (فیله شده)",
        "unit": "گرم"
      },
      {
        "item": "سبزی قلیه (گشنیز و شنبلیله)",
        "amount": 1.1,
        "unit": "کیلوگرم"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 10
      },
      {
        "item": "تمبر هندی",
        "unit": "گرم",
        "amount": 200
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه فرنگی"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "amount": 1,
        "unit": "قاشق چای‌خوری",
        "item": "فلفل قرمز"
      },
      {
        "amount": 0,
        "item": "نمک",
        "unit": "به میزان لازم"
      }
    ],
    "recipeSteps": [
      "ابتدا ماهی سفید را فیله کرده، به قطعات ۲-۳ سانتی‌متری برش دهید و با نمک و کمی فلفل مزه‌دار کنید",
      "تمبر هندی را با ۱ لیوان آب گرم مخلوط کرده و بگذارید ۱۵ دقیقه بماند، سپس از صافی رد کرده و با دست فشار دهید تا عصاره آن خارج شود و تفاله را دور بریزید",
      "پیازها را نگینی خرد کرده و در قابلمه‌ای با روغن داغ تفت دهید تا سبک و طلایی شوند",
      "سیرها را له کرده و به پیاز اضافه کنید، حدود ۲ دقیقه تفت دهید تا عطر آن بلند شود",
      "زردچوبه و فلفل قرمز را اضافه کرده و برای ۳۰ ثانیه تفت دهید",
      "سبزی خرد شده را اضافه کرده و با حرارت متوسط تفت دهید تا آب سبزی کشیده شود و رنگ آن تیره شود (حدود ۱۵-۲۰ دقیقه)",
      "در صورت تمایل رب گوجه فرنگی را اضافه کرده و ۱-۲ دقیقه تفت دهید",
      "عصاره تمبر هندی را به مواد اضافه کنید و هم بزنید",
      "۲-۳ لیوان آب جوش اضافه کنید و نمک را اندازه کنید",
      "حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید خورش به مدت ۳۰-۴۰ دقیقه آرام بجوشد و جا بیفتد",
      "در ۱۵ دقیقه آخر پخت، تکه‌های ماهی را به آرامی به خورش اضافه کنید و بگذارید بپزند (زیرا ماهی سفید زود می‌پزد و له می‌شود)",
      "پس از پخت کامل ماهی، خورش را از روی حرارت برداشته و با پلو یا نان سرو کنید."
    ],
    "description": "قلیه ماهی سفید کاسپین",
    "calories": 550,
    "cookTime": 150,
    "difficulty": "سخت",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما یا گردو"
  },
  {
    "category": "nani",
    "name": "کله‌جوش قمی",
    "ingredients": [
      {
        "amount": 1.5,
        "item": "کشک غلیظ",
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "item": "پیاز متوسط",
        "unit": "عدد"
      },
      {
        "item": "گردو",
        "amount": 100,
        "unit": "گرم"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "نعناع خشک",
        "amount": 2
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "روغن مایع یا روغن حیوانی"
      },
      {
        "item": "آب",
        "amount": 3.5,
        "unit": "پیمانه"
      },
      {
        "item": "زردچوبه",
        "unit": "قاشق چای‌خوری",
        "amount": 1
      },
      {
        "item": "نمک و فلفل سیاه",
        "amount": 0,
        "unit": "به میزان لازم"
      }
    ],
    "recipeSteps": [
      "پیازها را خلالی نازک خرد کرده و در قابلمه‌ای با کمی روغن (ترجیحاً روغن حیوانی) تفت دهید تا طلایی و سبک شوند",
      "در حین تفت دادن پیاز، گردوها را ریز خرد کنید یا بکوبید (نباید پودر شوند، کمی زیر دندان بیایند)",
      "وقتی پیازها طلایی شدند، زردچوبه را اضافه کرده و ۳۰ ثانیه دیگر تفت دهید تا عطر زردچوبه بلند شود",
      "گردوهای خرد شده را به پیاز و زردچوبه اضافه کنید و ۲-۳ دقیقه دیگر تفت دهید تا گردوها کمی بوداده شوند",
      "نعناع خشک را به مواد اضافه کنید و فقط برای ۳۰ ثانیه تفت دهید، مراقب باشید نعناع نسوزد",
      "آب را به مواد اضافه کرده و بگذارید به جوش بیاید",
      "در این فاصله، کشک را در کاسه‌ای با کمی آب رقیق کنید و خوب هم بزنید تا یکدست شود",
      "پس از به جوش آمدن آب، حرارت را کم کرده و کشک رقیق شده را به آرامی و در حالی که مرتب هم می‌زنید، به قابلمه اضافه کنید تا کشک نبرد و ته نگیرد",
      "نمک و فلفل را اندازه کنید (توجه داشته باشید که کشک خود شور است، پس نمک را با احتیاط اضافه کنید)",
      "اجازه دهید کله‌جوش به مدت ۱۰-۱۵ دقیقه روی حرارت ملایم به آرامی بجوشد و جا بیفتد و کمی غلیظ شود",
      "کله‌جوش را داغ همراه با نان سنگک یا لواش تازه و سبزی خوردن و پیاز داغ اضافی (در صورت تمایل) سرو کنید."
    ],
    "id": "dish-1765493259478-r7z5n-5",
    "description": "کله‌جوش قمی",
    "hasRealData": true,
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "hasRealData": true,
    "category": "nani",
    "description": "نیمرو با دنبه (بلوچی)",
    "id": "dish-1765493259478-zfxqx-3",
    "name": "نیمرو با دنبه (بلوچی)",
    "ingredients": [
      {
        "amount": 8,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "unit": "گرم",
        "amount": 100,
        "item": "دنبه گوسفندی"
      },
      {
        "amount": 0,
        "unit": "به میزان لازم",
        "item": "نمک"
      },
      {
        "amount": 0,
        "item": "فلفل سیاه",
        "unit": "به میزان لازم"
      }
    ],
    "recipeSteps": [
      "دنبه گوسفندی را به قطعات کوچک (حدود ۱-۲ سانتی‌متری) خرد کنید",
      "دنبه خرد شده را در تابه روی حرارت ملایم قرار دهید تا به آرمانی آب شود و روغن پس دهد",
      "پس از اینکه دنبه‌ها کاملاً آب شدند و به حالت طلایی و ترد درآمدند، قطعات ترد دنبه را از تابه خارج کنید (این قطعات را می‌توانید در کنار نیمرو سرو کنید)",
      "تخم مرغ‌ها را یکی یکی و با دقت در روغنی که از دنبه به دست آمده است، بشکنید",
      "نمک و فلفل سیاه را روی هر تخم مرغ بپاشید",
      "اجازه دهید تخم مرغ‌ها به میزان دلخواه (عسلی یا کاملاً پخته) بپزند",
      "نیمرو با دنبه را بلافاصله و گرم، همراه با نان تازه و ترشی یا سبزی خوردن سرو کنید."
    ],
    "calories": 550,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765493262996-1dx40-3",
    "description": "سیرابی‌پزان تهرانی",
    "recipeSteps": [
      "سیرابی و شیردان را پس از تمیز کردن و شستن کامل، به تکه‌های کوچک ۲ تا ۳ سانتیمتری برش بزنید",
      "سیرابی را همراه با ۱ عدد پیاز کامل و مقداری آب، به مدت ۳۰ دقیقه بجوشانید، سپس آب آن را دور ریخته و سیرابی را آبکشی کنید (این کار برای از بین بردن بوی اولیه است)",
      "در یک قابلمه بزرگ، روغن را گرم کرده و پیاز دیگر را نگینی خرد کرده و در آن تفت دهید تا طلایی شود",
      "سیر له شده و زردچوبه را اضافه کرده و حدود ۱ دقیقه تفت دهید تا عطر سیر بلند شود",
      "سیرابی آبکش شده را به پیاز و سیر اضافه کرده و حدود ۱۰ دقیقه تفت دهید",
      "رب گوجه‌فرنگی را اضافه کرده و به مدت ۵ دقیقه تفت دهید تا رنگ باز کند",
      "نخود خیس خورده را به همراه آب قلم یا آب جوش به قابلمه اضافه کنید، نمک و فلفل را اندازه کنید",
      "اجازه دهید خوراک به جوش آید، سپس حرارت را کم کرده، درب قابلمه را بگذارید و اجازه دهید به مدت ۳ تا ۴ ساعت به آرامی بپزد تا سیرابی کاملا نرم شود و جا بیفتد (ممکن است نیاز به اضافه کردن آب بیشتر باشد)",
      "در نیم ساعت پایانی پخت، سیب‌زمینی‌ها را پوست گرفته و به صورت درسته یا چهار قاچ به خوراک اضافه کنید تا بپزند",
      "در آخر آبلیمو را اضافه کرده و پس از ۵ دقیقه از روی حرارت بردارید. سیرابی‌پزان را با نان سنگک و آب نارنج یا لیمو تازه سرو کنید."
    ],
    "name": "سیرابی‌پزان تهرانی",
    "ingredients": [
      {
        "item": "سیرابی و شیردان گوسفندی پاک شده",
        "unit": "کیلوگرم",
        "amount": 1
      },
      {
        "item": "پیاز متوسط",
        "unit": "عدد",
        "amount": 2
      },
      {
        "item": "نخود آبگوشتی (از شب قبل خیس شده)",
        "amount": 0.5,
        "unit": "پیمانه"
      },
      {
        "amount": 2,
        "item": "سیب‌زمینی متوسط",
        "unit": "عدد"
      },
      {
        "amount": 4,
        "unit": "حبه",
        "item": "سیر"
      },
      {
        "amount": 2,
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زردچوبه",
        "amount": 1
      },
      {
        "unit": "به میزان لازم",
        "item": "نمک و فلفل سیاه",
        "amount": 0
      },
      {
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "item": "آب قلم یا آب جوش",
        "unit": "پیمانه",
        "amount": 7
      },
      {
        "unit": "قاشق چای‌خوری",
        "amount": 0.5,
        "item": "پودر دارچین (اختیاری)"
      },
      {
        "item": "آبلیمو تازه",
        "unit": "قاشق غذاخوری",
        "amount": 2
      }
    ],
    "category": "nani",
    "hasRealData": true,
    "calories": 400,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "name": "حریره بادام",
    "hasRealData": true,
    "id": "dish-1765493262996-cel94-1",
    "description": "حریره بادام",
    "ingredients": [
      {
        "amount": 1,
        "item": "بادام خام پوست کنده",
        "unit": "پیمانه (حدود ۱۵۰ گرم)"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "آرد برنج"
      },
      {
        "amount": 4,
        "item": "شکر",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "پیمانه (۱ لیتر)",
        "item": "شیر پرچرب",
        "amount": 4
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "گلاب"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "پودر هل (اختیاری)",
        "amount": 0.5
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "زعفران دم‌کرده غلیظ (اختیاری)",
        "amount": 1
      }
    ],
    "category": "dessert",
    "recipeSteps": [
      "بادام‌ها را از شب قبل در آب خیس کنید و روز بعد پوست آنها را جدا کنید",
      "بادام‌های پوست کنده را به همراه نصف پیمانه از شیر در مخلوط‌کن بریزید و خوب پوره کنید تا یکدست شود",
      "آرد برنج را با باقیمانده شیر سرد در یک قابلمه مخلوط کنید تا گلوله نشود",
      "پوره بادام، شکر، گلاب و پودر هل (در صورت استفاده) را به مخلوط شیر و آرد برنج اضافه کنید و خوب هم بزنید",
      "قابلمه را روی حرارت ملایم قرار دهید و مدام هم بزنید تا حریره غلیظ شود و به جوش آید (حدود ۲۰ تا ۳۰ دقیقه)",
      "پس از غلیظ شدن و یکدست شدن حریره، اگر از زعفران استفاده می‌کنید، آن را اضافه کرده و یک دقیقه دیگر هم بزنید",
      "حریره آماده را در کاسه‌های کوچک سرو کرده و می‌توانید با خلال بادام یا دارچین تزیین کنید",
      "حریره را می‌توان هم گرم و هم سرد سرو کرد."
    ],
    "calories": 580,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "id": "dish-1765493262996-h4sdy-2",
    "description": "نان برنجی گیلانی (نسخه غذایی با تخم‌مرغ)",
    "category": "other",
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
    "hasRealData": true,
    "name": "نان برنجی گیلانی (نسخه غذایی با تخم‌مرغ)",
    "ingredients": [
      {
        "amount": 2,
        "unit": "پیمانه",
        "item": "آرد برنج"
      },
      {
        "unit": "عدد بزرگ",
        "item": "تخم مرغ",
        "amount": 2
      },
      {
        "amount": 0.5,
        "item": "ماست پرچرب",
        "unit": "پیمانه"
      },
      {
        "amount": 0.25,
        "unit": "پیمانه",
        "item": "روغن مایع یا کره ذوب شده"
      },
      {
        "amount": 2,
        "item": "شکر",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق چای‌خوری",
        "item": "نمک",
        "amount": 1
      },
      {
        "item": "بیکینگ پودر",
        "amount": 1,
        "unit": "قاشق چای‌خوری"
      },
      {
        "item": "آب ولرم (در صورت نیاز)",
        "unit": "قاشق غذاخوری",
        "amount": 3
      },
      {
        "item": "کنجد یا سیاه‌دانه برای تزیین (اختیاری)",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      }
    ],
    "calories": 600,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "نعناع یا گردو"
  },
  {
    "name": "Beef Stroganoff (بیف استروگانف - روسیه)",
    "id": "dish-1765570485710-4bmru-3",
    "ingredients": [
      {
        "item": "فیله گوساله",
        "unit": "گرم",
        "amount": 500
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط",
        "amount": 1
      },
      {
        "amount": 250,
        "unit": "گرم",
        "item": "قارچ تازه"
      },
      {
        "unit": "فنجان",
        "amount": 1,
        "item": "خامه ترش (ساور کریم)"
      },
      {
        "item": "خردل دیژون",
        "amount": 1,
        "unit": "قاشق چایخوری"
      },
      {
        "item": "آرد",
        "unit": "قاشق غذاخوری",
        "amount": 1
      },
      {
        "item": "کره",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "روغن مایع",
        "amount": 1,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "آب گوشت",
        "amount": 0.5,
        "unit": "فنجان"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 1,
        "item": "نمک"
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چایخوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "جعفری تازه خرد شده (تزیین)"
      }
    ],
    "description": "Beef Stroganoff (بیف استروگانف - روسیه)",
    "hasRealData": true,
    "category": "international",
    "recipeSteps": [
      "فیله گوساله را به صورت نوارهای نازک و بلند (حدود ۵ سانتی‌متر) برش دهید.",
      "در یک تابه بزرگ یا وک، ۱ قاشق غذاخوری کره و ۱ قاشق غذاخوری روغن را روی حرارت متوسط رو به بالا گرم کنید.",
      "نوارهای گوشت را در تابه بریزید و در چند مرحله تفت دهید تا قهوه‌ای و کمی برشته شوند. دقت کنید تابه را زیاد پر نکنید تا گوشت آب نیندازد. گوشت‌های تفت داده شده را از تابه خارج کرده و کنار بگذارید.",
      "پیاز را خلالی نازک خرد کنید. قارچ‌ها را نیز ورقه‌ای خرد کنید.",
      "در همان تابه، ۱ قاشق غذاخوری کره باقی‌مانده را اضافه کنید. پیاز را اضافه کرده و ۵-۷ دقیقه تفت دهید تا نرم و شفاف شود.",
      "قارچ‌های ورقه‌ای را به پیاز اضافه کنید و ۱۰-۱۵ دقیقه تفت دهید تا آب قارچ‌ها کشیده شده و طلایی شوند.",
      "آرد را به پیاز و قارچ اضافه کرده و ۱ دقیقه تفت دهید تا بوی خامی آن گرفته شود.",
      "آب گوشت را کم‌کم اضافه کنید و مدام هم بزنید تا سس غلیظ و یکدستی حاصل شود.",
      "خردل دیژون را اضافه کنید و هم بزنید.",
      "حرارت را کم کرده، خامه ترش را اضافه کنید و به آرامی هم بزنید تا با سس مخلوط شود. اجازه ندهید سس بعد از اضافه کردن خامه ترش به جوش بیاید زیرا ممکن است خامه ببرد.",
      "گوشت تفت داده شده را به سس اضافه کنید. نمک و فلفل را تنظیم کنید.",
      "درب تابه را بگذارید و اجازه دهید سس و گوشت ۵-۱۰ دقیقه با حرارت ملایم بجوشد تا طعم‌ها به خورد هم بروند و گوشت کاملاً نرم شود.",
      "بیف استروگانف را بلافاصله گرم سرو کنید. معمولاً با پاستا (فتوچینی یا نودل تخم‌مرغ)، پوره سیب‌زمینی یا برنج سرو می‌شود.",
      "در نهایت با جعفری تازه خرد شده تزیین کنید."
    ],
    "nationality": "ru",
    "calories": 520,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "ru",
    "ingredients": [
      {
        "item": "گوشت گوساله (دنده یا سرسینه)",
        "amount": 500,
        "unit": "گرم"
      },
      {
        "item": "چغندر متوسط",
        "unit": "عدد",
        "amount": 2
      },
      {
        "amount": 0.5,
        "item": "کلم برگ متوسط",
        "unit": "عدد"
      },
      {
        "amount": 3,
        "unit": "عدد",
        "item": "سیب‌زمینی متوسط"
      },
      {
        "item": "هویج متوسط",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 1,
        "item": "پیاز متوسط",
        "unit": "عدد"
      },
      {
        "item": "رب گوجه‌فرنگی",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "item": "سیر",
        "amount": 2,
        "unit": "حبه"
      },
      {
        "amount": 1.5,
        "item": "آب مرغ یا گوشت",
        "unit": "لیتر"
      },
      {
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "سرکه سیب یا آبلیمو"
      },
      {
        "amount": 0.5,
        "item": "شکر",
        "unit": "قاشق چایخوری"
      },
      {
        "item": "نمک",
        "unit": "قاشق چایخوری",
        "amount": 1
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چایخوری",
        "amount": 0.5
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "شوید تازه خرد شده"
      },
      {
        "unit": "برای سرو",
        "item": "خامه ترش (ساور کریم)",
        "amount": 0
      },
      {
        "unit": "عدد",
        "item": "برگ بو",
        "amount": 1
      }
    ],
    "category": "international",
    "id": "dish-1765570485710-4mte0-1",
    "description": "Borscht (بورش - اوکراین)",
    "hasRealData": true,
    "name": "Borscht (بورش - اوکراین)",
    "recipeSteps": [
      "گوشت را به قطعات مکعبی ۲-۳ سانتی‌متری خرد کنید. در یک قابلمه بزرگ، گوشت را با کمی روغن تفت دهید تا تغییر رنگ دهد.",
      "پیاز را نگینی خرد کرده و به گوشت اضافه کنید، حدود ۵ دقیقه تفت دهید تا سبک شود.",
      "هویج را رنده درشت و چغندر را به صورت خلالی نازک خرد کنید. آن‌ها را به قابلمه اضافه کرده و حدود ۱۰-۱۵ دقیقه تفت دهید تا کمی نرم شوند.",
      "رب گوجه‌فرنگی را اضافه کرده و ۲ دقیقه تفت دهید تا بوی خامی آن گرفته شود.",
      "آب مرغ یا گوشت را به همراه برگ بو به قابلمه اضافه کنید. درب قابلمه را گذاشته و اجازه دهید گوشت به مدت ۱ تا ۱.۵ ساعت بپزد تا نیم‌پز شود.",
      "کلم را به صورت خلالی نازک خرد کنید و سیب‌زمینی‌ها را مکعبی خرد کنید.",
      "پس از نیم‌پز شدن گوشت، کلم و سیب‌زمینی را به قابلمه اضافه کنید.",
      "سرکه و شکر (در صورت تمایل) را اضافه کنید تا رنگ چغندر حفظ شود و طعم سوپ متعادل گردد.",
      "سیر را له کرده و به سوپ اضافه کنید. نمک و فلفل را نیز تنظیم کنید.",
      "درب قابلمه را بگذارید و اجازه دهید سوپ ۳۰-۴۵ دقیقه دیگر بپزد تا تمام سبزیجات و گوشت کاملاً نرم شوند.",
      "برگ بو را از سوپ خارج کنید.",
      "سوپ را در کاسه‌های سرو ریخته، با یک قاشق خامه ترش و کمی شوید تازه خرد شده تزیین و گرم سرو کنید."
    ],
    "calories": 600,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "ingredients": [
      {
        "amount": 4,
        "item": "سیب‌زمینی متوسط",
        "unit": "عدد"
      },
      {
        "amount": 2,
        "item": "هویج متوسط",
        "unit": "عدد"
      },
      {
        "unit": "گرم",
        "item": "سینه مرغ پخته",
        "amount": 200
      },
      {
        "unit": "عدد",
        "amount": 3,
        "item": "تخم مرغ آب‌پز"
      },
      {
        "item": "خیارشور",
        "amount": 150,
        "unit": "گرم"
      },
      {
        "amount": 1,
        "unit": "فنجان",
        "item": "نخود فرنگی"
      },
      {
        "item": "سس مایونز",
        "amount": 1,
        "unit": "فنجان"
      },
      {
        "unit": "قاشق چایخوری",
        "item": "نمک",
        "amount": 1
      },
      {
        "item": "فلفل سیاه",
        "amount": 0.5,
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 1,
        "unit": "قاشق غذاخوری",
        "item": "آبلیمو تازه (اختیاری)"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 2,
        "item": "شوید تازه (تزیین)"
      }
    ],
    "category": "international",
    "description": "Olivier Salad (سالاد الویه - روسیه)",
    "nationality": "ru",
    "id": "dish-1765570485710-4zwnq-4",
    "recipeSteps": [
      "سیب‌زمینی‌ها و هویج‌ها را با پوست بشویید و در قابلمه جداگانه با آب بپزید تا نرم شوند. سپس پوست آن‌ها را جدا کرده و اجازه دهید خنک شوند.",
      "سینه مرغ را بپزید، سپس خرد یا ریش ریش کنید و اجازه دهید خنک شود.",
      "تخم مرغ‌ها را آب‌پز کنید، پوست بگیرید و بگذارید خنک شوند.",
      "سیب‌زمینی‌ها، هویج‌ها، تخم مرغ‌ها و خیارشور را به صورت نگینی ریز خرد کنید.",
      "تمام مواد خرد شده (سیب‌زمینی، هویج، مرغ، تخم مرغ، خیارشور) را در یک کاسه بزرگ بریزید.",
      "نخود فرنگی کنسرو شده را آبکش کرده و به مواد اضافه کنید.",
      "سس مایونز، نمک، فلفل سیاه و در صورت تمایل آبلیمو را به مواد اضافه کنید.",
      "تمام مواد را به آرامی و با دقت با هم مخلوط کنید تا سس به طور یکنواخت در تمام سالاد پخش شود. از له کردن مواد خودداری کنید.",
      "سالاد را بچشید و در صورت نیاز نمک و فلفل آن را تنظیم کنید.",
      "روی کاسه را با سلفون بپوشانید و حداقل ۲ ساعت در یخچال قرار دهید تا طعم‌ها به خوبی به خورد هم بروند و سالاد خنک شود.",
      "سالاد الویه را در ظرف سرو بکشید و در صورت تمایل با کمی شوید تازه یا برش‌های خیارشور و گوجه فرنگی تزیین کنید."
    ],
    "name": "Olivier Salad (سالاد الویه - روسیه)",
    "hasRealData": true,
    "calories": 350,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "برای تهیه خمیر: آرد را در یک کاسه بزرگ الک کنید و نمک را اضافه کنید.",
      "تخم مرغ را در مرکز آرد بشکنید و کم‌کم آب را اضافه کرده و با دست ورز دهید تا خمیر یکدست و لطیفی به دست آید. اگر خمیر چسبنده بود کمی آرد و اگر خشک بود کمی آب اضافه کنید.",
      "خمیر را به مدت ۳۰ دقیقه در یک نایلون یا سلفون پیچیده و در دمای اتاق استراحت دهید.",
      "برای تهیه مایه داخل: سیب‌زمینی‌ها را پوست کنده و به قطعات بزرگ خرد کنید. آن‌ها را در آب نمک پخته تا کاملاً نرم شوند.",
      "سیب‌زمینی‌های پخته را آبکش کرده و کاملاً له کنید تا پوره یکدستی حاصل شود.",
      "پیاز را نگینی ریز خرد کنید. در یک تابه، ۲ قاشق غذاخوری روغن مایع را گرم کرده و پیاز را تفت دهید تا طلایی و کاراملی شود.",
      "پنیر فتا را با چنگال له کنید یا رنده کنید.",
      "پوره سیب‌زمینی، پیاز سرخ شده، پنیر له شده، نمک و فلفل سیاه را در یک کاسه با هم مخلوط کنید. خوب هم بزنید تا مایه یکدست شود و مزه‌ها به خورد هم بروند.",
      "پس از استراحت، خمیر را به دو یا سه قسمت تقسیم کنید. هر قسمت را روی سطح آردپاشی شده به قطر ۱-۲ میلی‌متر باز کنید.",
      "با استفاده از یک کاتر گرد یا لبه لیوان با قطر ۶-۷ سانتی‌متر, دایره‌هایی از خمیر برش دهید.",
      "در مرکز هر دایره ۱ قاشق چایخوری از مایه سیب‌زمینی و پنیر قرار دهید.",
      "دایره را از وسط تا کرده و لبه‌ها را محکم به هم بچسبانید تا شکل نیم‌دایره بگیرد. مطمئن شوید که هیچ درزی باز نمانده باشد.",
      "وارنیکی‌های آماده شده را روی سینی آردپاشی شده بچینید تا به هم نچسبند.",
      "در یک قابلمه بزرگ آب را به جوش آورید و کمی نمک به آن اضافه کنید.",
      "وارنیکی‌ها را به آرامی در آب جوش ریخته و هم بزنید تا به کف قابلمه نچسبند.",
      "پس از اینکه وارنیکی‌ها روی آب آمدند، اجازه دهید ۵-۷ دقیقه دیگر بپزند تا مغز پخت شوند.",
      "وارنیکی‌ها را با کفگیر سوراخ‌دار از آب خارج کرده و در ظرف سرو بریزید.",
      "کره را ذوب کرده و روی وارنیکی‌ها بریزید.",
      "وارنیکی را گرم همراه با خامه ترش و شوید تازه خرد شده سرو کنید."
    ],
    "name": "Vareniki (وارنیکی - اوکراین)",
    "category": "international",
    "hasRealData": true,
    "description": "Vareniki (وارنیکی - اوکراین)",
    "id": "dish-1765570485710-73mg9-5",
    "ingredients": [
      {
        "amount": 300,
        "unit": "گرم",
        "item": "آرد گندم"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "تخم مرغ"
      },
      {
        "amount": 100,
        "item": "آب",
        "unit": "میلی‌لیتر"
      },
      {
        "amount": 0.5,
        "item": "نمک",
        "unit": "قاشق چایخوری"
      },
      {
        "item": "سیب‌زمینی متوسط",
        "amount": 4,
        "unit": "عدد"
      },
      {
        "amount": 150,
        "unit": "گرم",
        "item": "پنیر فتا"
      },
      {
        "amount": 1,
        "unit": "عدد",
        "item": "پیاز متوسط"
      },
      {
        "item": "کره",
        "unit": "گرم",
        "amount": 50
      },
      {
        "amount": 1,
        "item": "نمک",
        "unit": "قاشق چایخوری"
      },
      {
        "unit": "قاشق چایخوری",
        "amount": 0.5,
        "item": "فلفل سیاه"
      },
      {
        "item": "روغن مایع (برای پیاز)",
        "unit": "قاشق غذاخوری",
        "amount": 2
      },
      {
        "item": "خامه ترش (ساور کریم)",
        "unit": "برای سرو",
        "amount": 0
      },
      {
        "amount": 0,
        "item": "شوید تازه خرد شده",
        "unit": "برای سرو"
      }
    ],
    "nationality": "ru",
    "calories": 520,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "ru",
    "id": "dish-1765570485710-xp5vl-2",
    "category": "international",
    "ingredients": [
      {
        "unit": "گرم",
        "amount": 300,
        "item": "آرد گندم"
      },
      {
        "item": "تخم مرغ",
        "unit": "عدد",
        "amount": 1
      },
      {
        "unit": "میلی‌لیتر",
        "item": "آب",
        "amount": 100
      },
      {
        "item": "نمک",
        "amount": 0.5,
        "unit": "قاشق چایخوری"
      },
      {
        "unit": "گرم",
        "amount": 300,
        "item": "گوشت چرخ‌کرده"
      },
      {
        "unit": "عدد",
        "item": "پیاز متوسط",
        "amount": 1
      },
      {
        "unit": "حبه",
        "item": "سیر",
        "amount": 1
      },
      {
        "item": "نمک",
        "amount": 1,
        "unit": "قاشق چایخوری"
      },
      {
        "amount": 0.5,
        "unit": "قاشق چایخوری",
        "item": "فلفل سیاه"
      },
      {
        "amount": 2,
        "item": "آب سرد (برای مایه گوشتی)",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 50,
        "item": "کره",
        "unit": "گرم"
      },
      {
        "amount": 0,
        "item": "خامه ترش (ساور کریم)",
        "unit": "برای سرو"
      },
      {
        "item": "شوید تازه خرد شده",
        "amount": 0,
        "unit": "برای سرو"
      }
    ],
    "description": "Pelmeni (پلمنی - روسیه)",
    "recipeSteps": [
      "برای تهیه خمیر: آرد را در یک کاسه بزرگ الک کنید و نمک را اضافه کنید.",
      "تخم مرغ را در مرکز آرد بشکنید و کم‌کم آب را اضافه کرده و با دست ورز دهید تا خمیر یکدست و لطیفی به دست آید. اگر خمیر چسبنده بود کمی آرد و اگر خشک بود کمی آب اضافه کنید.",
      "خمیر را به مدت ۳۰ دقیقه در یک نایلون یا سلفون پیچیده و در دمای اتاق استراحت دهید.",
      "برای تهیه مایه گوشتی: پیاز را بسیار ریز نگینی خرد کنید یا رنده کنید و آب آن را بگیرید. سیر را نیز ریز خرد یا رنده کنید.",
      "گوشت چرخ‌کرده را با پیاز، سیر، نمک، فلفل سیاه و آب سرد مخلوط کنید و خوب ورز دهید تا مایه یکدستی حاصل شود. آب سرد کمک می‌کند مایه آبدارتر و خوش‌طعم‌تر شود.",
      "پس از استراحت، خمیر را به دو یا سه قسمت تقسیم کنید. هر قسمت را روی سطح آردپاشی شده به قطر ۱-۲ میلی‌متر باز کنید.",
      "با استفاده از یک کاتر گرد یا لبه لیوان با قطر ۵-۶ سانتی‌متر, دایره‌هایی از خمیر برش دهید.",
      "در مرکز هر دایره ۱/۲ قاشق چایخوری از مایه گوشتی قرار دهید.",
      "دایره را از وسط تا کرده و لبه‌ها را محکم به هم بچسبانید تا شکل نیم‌دایره بگیرد. سپس دو گوشه نیم‌دایره را به هم وصل کرده و محکم فشار دهید تا شکل سنتی پلمنی (شبیه گوشواره) ایجاد شود.",
      "پلمنی‌های آماده شده را روی سینی آردپاشی شده بچینید تا به هم نچسبند.",
      "در یک قابلمه بزرگ آب را به جوش آورید و کمی نمک به آن اضافه کنید.",
      "پلمنی‌ها را به آرامی در آب جوش ریخته و هم بزنید تا به کف قابلمه نچسبند.",
      "پس از اینکه پلمنی‌ها روی آب آمدند، اجازه دهید ۷-۱۰ دقیقه دیگر بپزند تا مغز پخت شوند.",
      "پلمنی‌ها را با کفگیر سوراخ‌دار از آب خارج کرده و در ظرف سرو بریزید.",
      "بلافاصله روی آن‌ها کره ذوب شده بریزید.",
      "پلمنی را گرم همراه با خامه ترش و شوید تازه خرد شده سرو کنید."
    ],
    "name": "Pelmeni (پلمنی - روسیه)",
    "hasRealData": true,
    "calories": 520,
    "cookTime": 75,
    "difficulty": "سخت",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "nationality": "ru",
    "name": "Chicken Kiev (چیکن کیِف - اوکراین)",
    "description": "Chicken Kiev (چیکن کیِف - اوکراین)",
    "ingredients": [
      {
        "unit": "عدد",
        "amount": 4,
        "item": "سینه مرغ بدون استخوان و پوست"
      },
      {
        "unit": "گرم",
        "item": "کره سرد",
        "amount": 100
      },
      {
        "item": "سیر",
        "unit": "حبه",
        "amount": 2
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "جعفری تازه خرد شده"
      },
      {
        "unit": "قاشق غذاخوری",
        "amount": 1,
        "item": "شوید تازه خرد شده"
      },
      {
        "item": "نمک",
        "unit": "قاشق چایخوری",
        "amount": 1
      },
      {
        "amount": 0.5,
        "item": "فلفل سیاه",
        "unit": "قاشق چایخوری"
      },
      {
        "unit": "پیمانه",
        "amount": 0.5,
        "item": "آرد سفید"
      },
      {
        "amount": 2,
        "unit": "عدد بزرگ",
        "item": "تخم مرغ"
      },
      {
        "amount": 1.5,
        "unit": "پیمانه",
        "item": "پودر سوخاری (پانکو)"
      },
      {
        "unit": "میلی‌لیتر",
        "amount": 750,
        "item": "روغن مایع (سرخ کردن عمیق)"
      }
    ],
    "recipeSteps": [
      "ابتدا کره سیر و سبزیجات را آماده کنید: کره سرد را به مکعب‌های کوچک خرد کنید. سیر له شده، جعفری خرد شده، شوید (در صورت استفاده)، نمک (۰.۵ قاشق چایخوری) و فلفل (۰.۲۵ قاشق چایخوری) را به کره اضافه کنید و با چنگال خوب مخلوط کنید. کره را به ۴ قسمت مساوی تقسیم کرده، به شکل استوانه یا بیضی درآورید و به مدت حداقل ۳۰ دقیقه در فریزر قرار دهید تا کاملاً سفت شود.",
      "هر سینه مرغ را بین دو لایه پلاستیک یا کاغذ روغنی قرار دهید و با گوشت‌کوب یا وردنه به آرامی بکوبید تا ضخامت آن حدود نیم سانتی‌متر شود. مراقب باشید پاره نشود. نمک و فلفل باقی‌مانده را روی هر دو طرف سینه‌ها بپاشید.",
      "یک تکه کره سفت شده را در مرکز هر سینه مرغ قرار دهید. لبه‌های سینه مرغ را به دقت تا کنید تا کره کاملاً پوشانده شود و هیچ درزی باقی نماند. مطمئن شوید که مرغ کاملاً بسته شده باشد تا کره در حین پخت بیرون نریزد. می‌توانید از خلال دندان برای محکم کردن استفاده کنید (که قبل از سرو باید خارج شوند).",
      "یک ظرف برای آرد، یک ظرف برای تخم مرغ‌های همزده و یک ظرف برای پودر سوخاری آماده کنید.",
      "هر قطعه مرغ را ابتدا در آرد بغلتانید تا کاملاً پوشیده شود، سپس در تخم مرغ همزده فرو ببرید و در نهایت در پودر سوخاری بغلتانید. مطمئن شوید که تمام سطح مرغ به خوبی با پودر سوخاری پوشیده شود. این مرحله را می‌توانید برای اطمینان بیشتر، یک بار دیگر تکرار کنید (یعنی دوباره در تخم مرغ و سپس در پودر سوخاری).",
      "مرغ‌های آماده شده را به مدت حداقل ۳۰ دقیقه در یخچال قرار دهید تا پوشش سوخاری به خوبی به مرغ بچسبد و سرد شود.",
      "در یک قابلمه کوچک و گود یا تایه عمیق، روغن مایع را روی حرارت متوسط رو به بالا گرم کنید تا دمای آن به ۱۷۰-۱۷۵ درجه سانتی‌گراد برسد. عمق روغن باید به اندازه‌ای باشد که مرغ‌ها در آن شناور شوند.",
      "مرغ‌ها را به آرامی و به صورت دوتایی (یا تکی، بستگی به اندازه تابه شما دارد) در روغن داغ قرار دهید و هر طرف را به مدت ۶-۸ دقیقه سرخ کنید تا طلایی و برشته شوند و مغز پخت گردند. از دماسنج گوشت برای اطمینان از پخت کامل (دمای داخلی ۷۴ درجه سانتی‌گراد) استفاده کنید.",
      "مرغ‌های سرخ شده را روی دستمال کاغذی قرار دهید تا روغن اضافی‌شان گرفته شود.",
      "چیکن کیِف را بلافاصله پس از پخت، داغ سرو کنید تا کره ذوب شده داخل آن از بین نرود."
    ],
    "category": "international",
    "hasRealData": true,
    "id": "dish-1765570490742-mg2z9-2",
    "calories": 470,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "hasRealData": true,
    "name": "Shchi (شی - روسیه)",
    "recipeSteps": [
      "ابتدا گوشت را همراه با ۱ لیتر آب، کمی نمک و برگ بو در قابلمه‌ای قرار دهید و روی حرارت متوسط بگذارید تا جوش بیاید. کف روی آب را بگیرید و اجازه دهید گوشت به مدت ۱ تا ۱.۵ ساعت بپزد تا نرم شود. سپس گوشت را از آب خارج کرده و آب گوشت را صاف کنید. گوشت را به قطعات کوچک‌تر خرد کنید.",
      "پیاز را نگینی خرد کرده و در یک قابلمه جداگانه با ۱ قاشق غذاخوری روغن مایع روی حرارت متوسط تفت دهید تا نرم و شفاف شود (حدود ۵-۷ دقیقه).",
      "هویج را رنده درشت یا خلالی نازک خرد کنید و به پیاز اضافه کرده، ۵ دقیقه دیگر تفت دهید.",
      "رب گوجه‌فرنگی را اضافه کنید و به مدت ۲ دقیقه دیگر تفت دهید تا رنگ باز کند و بوی خامی آن گرفته شود.",
      "کلم سفید را نازک خرد کنید. سیب‌زمینی‌ها را پوست گرفته و به مکعب‌های ۲ سانتی‌متری خرد کنید.",
      "کلم، سیب‌زمینی و گوشت خرد شده را به قابلمه حاوی پیاز و هویج اضافه کنید.",
      "آب گوشت صاف شده و باقی‌مانده آب (اگر نیاز بود) را به مواد اضافه کنید تا روی مواد را بپوشاند. نمک و فلفل سیاه اضافه کنید.",
      "حرارت را زیاد کنید تا سوپ به جوش بیاید، سپس حرارت را کم کرده و درب قابلمه را بگذارید. اجازه دهید سوپ به مدت ۳۰-۴۰ دقیقه یا تا زمانی که کلم و سیب‌زمینی نرم شوند، به آرامی بپزد.",
      "در ۱۰ دقیقه آخر پخت، شوید تازه خرد شده را به سوپ اضافه کنید.",
      "سوپ را بچشید و در صورت نیاز نمک و فلفل آن را تنظیم کنید.",
      "سوپ شچی را داغ سرو کنید، می‌توانید هر کاسه را با یک قاشق خامه ترش (سمتانا) تزیین کنید."
    ],
    "id": "dish-1765570490742-zh5i1-1",
    "description": "Shchi (شی - روسیه)",
    "ingredients": [
      {
        "amount": 400,
        "unit": "گرم",
        "item": "گوشت گوساله یا گوسفند با استخوان"
      },
      {
        "amount": 500,
        "item": "کلم سفید",
        "unit": "گرم"
      },
      {
        "amount": 2,
        "unit": "عدد",
        "item": "سیب‌زمینی"
      },
      {
        "unit": "عدد بزرگ",
        "item": "هویج",
        "amount": 1
      },
      {
        "amount": 1,
        "item": "پیاز",
        "unit": "عدد متوسط"
      },
      {
        "amount": 2,
        "unit": "قاشق غذاخوری",
        "item": "رب گوجه‌فرنگی"
      },
      {
        "amount": 2,
        "item": "شوید تازه خرد شده",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "عدد",
        "amount": 1,
        "item": "برگ بو"
      },
      {
        "item": "روغن مایع",
        "amount": 2,
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "لیتر",
        "item": "آب یا آب گوشت",
        "amount": 1.5
      },
      {
        "amount": 0,
        "item": "نمک",
        "unit": "به میزان لازم"
      },
      {
        "unit": "به میزان لازم",
        "amount": 0,
        "item": "فلفل سیاه"
      },
      {
        "amount": 0,
        "unit": "برای سرو (اختیاری)",
        "item": "خامه ترش (سمتانا)"
      }
    ],
    "category": "international",
    "nationality": "ru",
    "calories": 520,
    "cookTime": 75,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "برگ‌های کلم را آماده کنید: هسته کلم را با چاقو خارج کنید. کلم را در یک قابلمه بزرگ پر از آب جوش قرار دهید. اجازه دهید برای ۱۰-۱۵ دقیقه بپزد تا برگ‌های بیرونی نرم و قابل جدا شدن شوند. برگ‌ها را با دقت جدا کرده و قسمت ضخیم و سفت هر برگ را با چاقو نازک کنید یا ببرید. (می‌توانید کلم را فریز کنید، سپس در آب گرم بگذارید تا برگ‌ها جدا شوند).",
      "برنج را به مدت ۳۰ دقیقه در آب گرم خیس کنید، سپس آبکش کنید.",
      "مایه گوشتی: در یک کاسه بزرگ، گوشت چرخ کرده، برنج آبکش شده، پیاز رنده شده (آب گرفته شده)، نمک (۰.۵ قاشق چایخوری) و فلفل سیاه را مخلوط کنید. می‌توانید ۱ قاشق غذاخوری رب گوجه‌فرنگی و هویج رنده شده را نیز در این مرحله اضافه کنید. خوب ورز دهید تا مواد یکدست شوند.",
      "دلمه‌ها را بپیچید: یک قاشق از مایه گوشتی را در قسمت پایینی هر برگ کلم قرار دهید. لبه‌های کناری برگ را به سمت داخل تا کنید و سپس برگ را از پایین به بالا محکم بپیچید. این کار را با تمام برگ‌ها و مایه انجام دهید.",
      "سس دلمه را آماده کنید: در یک تابه، ۲ قاشق غذاخوری روغن مایع را گرم کنید. ۳ قاشق غذاخوری رب گوجه‌فرنگی را اضافه کرده و به مدت ۲-۳ دقیقه تفت دهید تا رنگ باز کند. نمک و فلفل باقی‌مانده و پودر پاپریکا را اضافه کنید. آب یا آب گوشت را اضافه کرده و هم بزنید. اجازه دهید سس به جوش بیاید. سپس خامه ترش یا ماست چکیده را به سس اضافه کرده و هم بزنید تا یکدست شود (اگر ماست استفاده می‌کنید، ابتدا آن را با کمی آب رقیق کنید تا نبرد).",
      "دلمه‌ها را بپزید: کف یک قابلمه بزرگ و نسبتاً گود را با چند برگ کلم اضافی (یا برگ‌های پاره شده) بپوشانید تا دلمه‌ها ته نگیرند. دلمه‌های پیچیده شده را به صورت فشرده و منظم کنار هم در قابلمه بچینید.",
      "سس آماده شده را روی دلمه‌ها بریزید تا تقریباً روی آنها را بگیرد. یک بشقاب کوچک یا یک تکه کاغذ روغنی را روی دلمه‌ها قرار دهید تا در حین پخت شناور نشوند.",
      "قابلمه را روی حرارت متوسط رو به بالا قرار دهید تا سس به جوش بیاید, سپس حرارت را بسیار کم کنید، درب قابلمه را محکم بگذارید و اجازه دهید دلمه‌ها به مدت ۱ تا ۱.۵ ساعت به آرامی بپزند تا برنج و گوشت کاملاً پخته و کلم نرم شود.",
      "گولوبتسی را داغ سرو کنید، می‌توانید هر دلمه را با کمی شوید تازه تزیین کنید و با خامه ترش (سمتانا) یا ماست چکیده سرو کنید."
    ],
    "category": "international",
    "ingredients": [
      {
        "unit": "عدد متوسط",
        "item": "کلم برگ سفید",
        "amount": 1
      },
      {
        "item": "گوشت چرخ کرده",
        "unit": "گرم",
        "amount": 400
      },
      {
        "unit": "پیمانه",
        "item": "برنج نیم‌دانه",
        "amount": 0.5
      },
      {
        "amount": 1,
        "item": "پیاز (رنده شده)",
        "unit": "عدد متوسط"
      },
      {
        "unit": "عدد کوچک",
        "amount": 1,
        "item": "هویج (رنده شده)"
      },
      {
        "amount": 4,
        "item": "رب گوجه‌فرنگی",
        "unit": "قاشق غذاخوری"
      },
      {
        "unit": "قاشق غذاخوری",
        "item": "خامه ترش (برای سس)",
        "amount": 2
      },
      {
        "amount": 3,
        "item": "روغن مایع",
        "unit": "قاشق غذاخوری"
      },
      {
        "amount": 4.5,
        "unit": "پیمانه",
        "item": "آب یا آب گوشت"
      },
      {
        "item": "نمک",
        "unit": "قاشق چایخوری",
        "amount": 1.5
      },
      {
        "item": "فلفل سیاه",
        "unit": "قاشق چایخوری",
        "amount": 0.5
      },
      {
        "item": "پودر پاپریکا (اختیاری)",
        "amount": 0.5,
        "unit": "قاشق چایخوری"
      },
      {
        "item": "شوید تازه (تزیین)",
        "unit": "به میزان لازم",
        "amount": 0
      }
    ],
    "name": "Golubtsy (گولوبتسی - روسیه)",
    "nationality": "ru",
    "id": "dish-1765570490742-zlibx-3",
    "hasRealData": true,
    "description": "Golubtsy (گولوبتسی - روسیه)",
    "calories": 520,
    "cookTime": 105,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "category": "international",
    "name": "حموس (Hummus)",
    "hasRealData": true,
    "nationality": "ar",
    "ingredients": [
      {
        "unit": "پیمانه",
        "amount": 2,
        "item": "نخود پخته"
      },
      {
        "amount": 0.5,
        "item": "ارده",
        "unit": "پیمانه"
      },
      {
        "item": "سیر",
        "amount": 2,
        "unit": "حبه"
      },
      {
        "item": "روغن زیتون",
        "amount": 0.25,
        "unit": "پیمانه"
      }
    ],
    "id": "dish-arab-1",
    "description": "دیپ لذیذ نخود و ارده",
    "recipeSteps": [
      "نخود، ارده، سیر و آبلیمو را در میکسر بریزید.",
      "تا رسیدن به بافت نرم میکس کنید.",
      "با روغن زیتون و پاپریکا تزیین کنید."
    ],
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "category": "dolma",
    "hasRealData": true,
    "recipeSteps": [
      "لپه و برنج را نیم‌پز کرده و بکوبید.",
      "گوشت را با مواد مخلوط کرده و خوب ورز دهید.",
      "مغز کوفته را قرار داده و گرد کنید.",
      "در سس مخصوص بپزید."
    ],
    "description": "کوفته اصیل و مجلسی تبریز با مغز آلو و گردو",
    "name": "کوفته تبریزی",
    "ingredients": [
      {
        "amount": 500,
        "item": "گوشت چرخ‌کرده",
        "unit": "گرم"
      },
      {
        "amount": 1,
        "unit": "پیمانه",
        "item": "لپه"
      },
      {
        "amount": 0.5,
        "item": "برنج",
        "unit": "پیمانه"
      },
      {
        "amount": 1,
        "item": "تخم مرغ",
        "unit": "عدد"
      },
      {
        "amount": 200,
        "item": "سبزی کوفته",
        "unit": "گرم"
      }
    ],
    "id": "dish-dolma-1",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "hot",
    "natureLabel": "گرم",
    "mosleh": "سرکه، ترشیجات، یا آبلیمو تازه"
  },
  {
    "name": "دلمه برگ مو",
    "description": "دلمه خوشمزه با چاشنی ملس",
    "ingredients": [
      {
        "amount": 50,
        "item": "برگ مو",
        "unit": "عدد"
      },
      {
        "unit": "گرم",
        "item": "گوشت چرخ‌کرده",
        "amount": 300
      },
      {
        "unit": "گرم",
        "item": "سبزی دلمه",
        "amount": 300
      },
      {
        "unit": "پیمانه",
        "item": "برنج",
        "amount": 1
      }
    ],
    "recipeSteps": [
      "مواد میانی را تفت دهید.",
      "داخل برگ‌ها پیچیده و در قابلمه بچینید.",
      "با چاشنی سرکه و شیره بپزید."
    ],
    "category": "dolma",
    "hasRealData": true,
    "id": "dish-dolma-2",
    "calories": 400,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "recipeSteps": [
      "پیاز را تفت دهید و مرغ نگینی را اضافه کنید تا بپزد.",
      "قارچ و فلفل دلمه را اضافه کنید و تفت دهید.",
      "خامه را اضافه کرده و در انتها پنیر را روی مواد بریزید تا ذوب شود."
    ],
    "id": "dish-mix-1",
    "ingredients": [
      {
        "unit": "گرم",
        "item": "سینه مرغ",
        "amount": 500
      },
      {
        "amount": 300,
        "unit": "گرم",
        "item": "قارچ"
      },
      {
        "item": "فلفل دلمه‌ای",
        "amount": 1,
        "unit": "عدد"
      },
      {
        "amount": 200,
        "item": "پنیر پیتزا",
        "unit": "گرم"
      },
      {
        "unit": "عدد",
        "item": "پیاز",
        "amount": 1
      },
      {
        "amount": 2,
        "item": "خامه صبحانه",
        "unit": "قاشق غذاخوری"
      }
    ],
    "category": "fastfood",
    "description": "خوراک سریع مرغ و قارچ با پنیر فراوان",
    "name": "خوراک مرغ و قارچ پنیری",
    "calories": 820,
    "cookTime": 20,
    "difficulty": "آسان",
    "nature": "balanced",
    "natureLabel": "معتدل",
    "mosleh": "نیاز به مصلح خاصی ندارد"
  },
  {
    "description": "سوپ جو قرمز رستورانی",
    "category": "soup",
    "id": "dish-varied-5",
    "ingredients": [
      {
        "unit": "پیمانه",
        "item": "جو پرک",
        "amount": 1
      },
      {
        "unit": "عدد",
        "item": "سینه مرغ",
        "amount": 1
      },
      {
        "item": "هویج",
        "amount": 2,
        "unit": "عدد"
      },
      {
        "item": "رب گوجه فرنگی",
        "amount": 2,
        "unit": "قاشق"
      }
    ],
    "name": "سوپ جو",
    "recipeSteps": [
      "مرغ را بپزید و ریش کنید. جو و هویج نگینی را بپزید.",
      "رب را تفت داده و با آب مرغ اضافه کنید."
    ],
    "calories": 250,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  },
  {
    "recipeSteps": [
      "جو را با آب مرغ بپزید. شیر گرم را اضافه کنید.",
      "قارچ تفت داده شده را اضافه کنید."
    ],
    "name": "سوپ شیر",
    "ingredients": [
      {
        "item": "جو پرک",
        "unit": "پیمانه",
        "amount": 1
      },
      {
        "unit": "لیتر",
        "item": "شیر",
        "amount": 1
      },
      {
        "item": "قارچ",
        "amount": 200,
        "unit": "گرم"
      },
      {
        "unit": "قاشق",
        "item": "خامه",
        "amount": 2
      }
    ],
    "description": "سوپ سفید (شیر و قارچ)",
    "id": "dish-varied-6",
    "category": "soup",
    "calories": 420,
    "cookTime": 45,
    "difficulty": "متوسط",
    "nature": "cold",
    "natureLabel": "سرد",
    "mosleh": "خرما، عسل، گردو، یا زیره"
  }
];
