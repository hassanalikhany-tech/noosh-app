
import { Dish } from '../types';

export const SE_ASIA_DISHES: Dish[] = [
  {
    id: 'id-salad-gadogado',
    name: 'گادو-گادو (Gado-Gado)',
    category: 'international',
    nationality: 'اندونزی (Indonesia)',
    description: 'یکی از محبوب‌ترین سالادهای اندونزی شامل سبزیجات آب‌پز، توفو، تمپه و تخم‌مرغ با سس بادام‌زمینی غلیظ.',
    ingredients: [
      { item: 'کلم برگ خرد شده', amount: 200, unit: 'گرم' },
      { item: 'لوبیا سبز پخته', amount: 100, unit: 'گرم' },
      { item: 'سیب‌زمینی آب‌پز', amount: 2, unit: 'عدد' },
      { item: 'توفو سرخ شده', amount: 150, unit: 'گرم' },
      { item: 'تخم‌مرغ آب‌پز', amount: 2, unit: 'عدد' },
      { item: 'بادام‌زمینی رست شده (برای سس)', amount: 150, unit: 'گرم' },
      { item: 'شکر قهوه‌ای', amount: 1, unit: 'قاشق غذاخوری' },
      { item: 'سیر', amount: 2, unit: 'حبه' }
    ],
    recipeSteps: [
      'ابتدا تمام سبزیجات را بخارپز یا آب‌پز کرده و کنار بگذارید.',
      'توفو و تمپه را مکعبی خرد کرده و سرخ کنید تا طلایی شوند.',
      'برای تهیه سس: بادام‌زمینی را با سیر، شکر قهوه‌ای، فلفل و کمی آب در غذاساز میکس کنید تا یکنواخت شود.',
      'سبزیجات و توفو را در ظرف چیده، تخم‌مرغ‌ها را روی آن بگذارید و سس فراوان بریرند.',
      'با کراکر میگو (Krupuk) سرو کنید.'
    ],
    nature: 'balanced',
    natureLabel: 'معتدل',
    cookTime: 30,
    calories: 320,
    difficulty: 'متوسط'
  },
  {
    id: 'id-salad-karedok',
    name: 'کاردوک (Karedok)',
    category: 'international',
    nationality: 'اندونزی (Indonesia)',
    description: 'نسخه سبزیجات خام سالاد گادو-گادو متعلق به منطقه جاوا، بسیار ترد و تازه با سس بادام‌زمینی معطر.',
    ingredients: [
      { item: 'خیار خرد شده', amount: 2, unit: 'عدد' },
      { item: 'کلم سفید خرد شده', amount: 100, unit: 'گرم' },
      { item: 'جوانه لوبیا (ماش)', amount: 100, unit: 'گرم' },
      { item: 'بادمجان سبز کوچک خام', amount: 2, unit: 'عدد' },
      { item: 'ریحان تازه', amount: 20, unit: 'گرم' },
      { item: 'بادام‌زمینی (برای سس)', amount: 100, unit: 'گرم' }
    ],
    recipeSteps: [
      'تمام سبزیجات را به صورت کاملاً تازه و خام به قطعات کوچک تقسیم کنید.',
      'سس بادام‌زمینی را مشابه گادو-گادو اما با کمی تمر هندی و زنجبیل معطر تهیه کنید.',
      'سبزیجات خام را با سس مخلوط کرده و بلافاصله سرو کنید تا تردی خود را حفظ کنند.'
    ],
    nature: 'cold',
    natureLabel: 'سرد',
    cookTime: 15,
    calories: 210,
    difficulty: 'آسان'
  },
  {
    id: 'id-salad-pecel',
    name: 'پکل (Pecel)',
    category: 'international',
    nationality: 'اندونزی (Indonesia)',
    description: 'سالاد سنتی جاوا که تمرکز آن بر سبزیجات سبز رنگ پخته شده و سس تند بادام‌زمینی است.',
    ingredients: [
      { item: 'اسفناج پخته', amount: 200, unit: 'گرم' },
      { item: 'کنگر فرنگی یا جوانه', amount: 100, unit: 'گرم' },
      { item: 'لوبیا سبز', amount: 100, unit: 'گرم' },
      { item: 'سس تند بادام‌زمینی', amount: 1, unit: 'پیمانه' }
    ],
    recipeSteps: [
      'سبزیجات را جداگانه نیم‌پز کنید.',
      'آب اضافی آن‌ها را کاملاً بگیرید.',
      'سس مخصوص پکل را که تندتر از گادو-گادو است روی سبزیجات بریزید.'
    ],
    nature: 'balanced',
    natureLabel: 'معتدل',
    cookTime: 20,
    calories: 280,
    difficulty: 'آسان'
  },
  {
    id: 'id-salad-asinan',
    name: 'آسینان (Asinan)',
    category: 'international',
    nationality: 'اندونزی (Indonesia)',
    description: 'یک سالاد ترش و تند شامل سبزیجات یا میوه‌های شور شده در سرکه و فلفل.',
    ingredients: [
      { item: 'کلم سفید خرد شده', amount: 150, unit: 'گرم' },
      { item: 'کاهو خرد شده', amount: 100, unit: 'گرم' },
      { item: 'توفو نرم', amount: 100, unit: 'گرم' },
      { item: 'سرکه سیب یا انار', amount: 3, unit: 'قاشق غذاخوری' },
      { item: 'بادام‌زمینی سرخ شده', amount: 50, unit: 'گرم' }
    ],
    recipeSteps: [
      'سبزیجات را در محلول سرکه، شکر و فلفل برای مدتی قرار دهید تا طعم‌دار شوند.',
      'توفو را اضافه کرده و با بادام‌زمینی تست شده تزیین کنید.'
    ],
    nature: 'cold',
    natureLabel: 'سرد',
    cookTime: 25,
    calories: 180,
    difficulty: 'متوسط'
  },
  {
    id: 'id-salad-lalab',
    name: 'لالاب (Lalab)',
    category: 'international',
    nationality: 'اندونزی (Indonesia)',
    description: 'ساده‌ترین و اصیل‌ترین همراه غذای اندونزیایی شامل سبزیجات خام متنوع که با سس تند سامبال (Sambal) خورده می‌شود.',
    ingredients: [
      { item: 'خیار خام', amount: 2, unit: 'عدد' },
      { item: 'گوجه‌فرنگی', amount: 2, unit: 'عدد' },
      { item: 'کلم پیچ خام', amount: 100, unit: 'گرم' },
      { item: 'سس سامبال تند', amount: 50, unit: 'گرم' }
    ],
    recipeSteps: [
      'سبزیجات را تمیز شسته و به قطعات بزرگ برش بزنید.',
      'در کنار غذای اصلی یا به عنوان پیش‌غذا همراه با یک کاسه سس تند سامبال سرو کنید.'
    ],
    nature: 'cold',
    natureLabel: 'سرد',
    cookTime: 10,
    calories: 90,
    difficulty: 'آسان'
  }
];
