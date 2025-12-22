
import { Challenge } from '../types';
import { Droplets, Leaf, Dumbbell, Zap, Heart } from 'lucide-react';

export const CHALLENGES: Challenge[] = [
  {
    id: 'no-oil',
    title: 'هفته بدون سرخ‌کردنی',
    description: 'در این هفته فقط غذاهای آب‌پز، کبابی یا بخارپز مصرف کنید. کوکو و کتلت ممنوع!',
    icon: Droplets,
    color: 'bg-blue-500',
    bannedCategories: ['kuku', 'fastfood'],
    bannedKeywords: ['سرخ شده', 'سرخ کنید', 'تفت دهید', 'روغن فراوان', 'سرخ‌کردنی']
  },
  {
    id: 'vegan-week',
    title: 'هفته گیاه‌خواری',
    description: 'یک هفته بدون گوشت قرمز، مرغ، ماهی و محصولات حیوانی سنگین. تمرکز روی سبزیجات و حبوبات.',
    icon: Leaf,
    color: 'bg-emerald-500',
    bannedCategories: ['kabab', 'stew', 'polo', 'dolma', 'fastfood'], 
    // Super strict keyword list to ensure no meat slips through
    bannedKeywords: [
      'گوشت', 'مرغ', 'ماهی', 'میگو', 'کالباس', 'سوسیس', 'پاچه', 'سیرابی', 'جگر', 
      'شینسل', 'کباب', 'فیله', 'ژامبون', 'بوقلمون', 'اردک', 'ماهیچه', 'مغز', 'زبان',
      'چلو گوشت', 'خورشت', 'کوفته', 'دلمه', 'گردن', 'راسته'
    ] 
  },
  {
    id: 'protein-power',
    title: 'پروتئین پلاس',
    description: 'هفته عضله‌سازی! تمرکز روی غذاهای سرشار از پروتئین حیوانی و گیاهی.',
    icon: Dumbbell,
    color: 'bg-rose-500',
    requiredKeywords: ['گوشت', 'مرغ', 'ماهی', 'تخم مرغ', 'عدس', 'لوبیا', 'نخود']
  },
  {
    id: 'light-dinner',
    title: 'شام سبک',
    description: 'تمرکز بر روی سوپ‌ها، آش‌ها و خوراک‌های ساده برای هضم راحت‌تر در شب.',
    icon: Zap,
    color: 'bg-amber-500',
    bannedCategories: ['polo', 'stew', 'kabab', 'dolma']
  },
  {
    id: 'sugar-free',
    title: 'حذف قند و شکر',
    description: 'حذف کامل دسرها و غذاهایی که در آن‌ها از شکر یا قند مصنوعی استفاده شده است.',
    icon: Heart,
    color: 'bg-purple-500',
    bannedCategories: ['dessert'],
    bannedKeywords: ['شکر', 'قند', 'نبات', 'شیرینی', 'پولکی']
  }
];
