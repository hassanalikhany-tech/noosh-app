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
    // If description/recipe contains "fry" or "oil" -> ban logic handled in planner
  },
  {
    id: 'vegan-week',
    title: 'هفته گیاه‌خواری',
    description: 'یک هفته بدون گوشت قرمز، مرغ و ماهی. تمرکز روی آش، کوکو سبزیجات و خوراک‌های گیاهی.',
    icon: Leaf,
    color: 'bg-emerald-500',
    // We ban heavy meat categories, but we also need to check ingredients for meat
    bannedCategories: ['kabab', 'stew', 'polo', 'dolma', 'fastfood'], 
    // New property for strict exclusion
    bannedKeywords: ['گوشت', 'مرغ', 'ماهی', 'میگو', 'کالباس', 'سوسیس', 'پاچه', 'سیرابی', 'جگر'] 
  },
  {
    id: 'protein-power',
    title: 'پروتئین پلاس',
    description: 'هفته عضله‌سازی! هر روز باید حداقل یک وعده کباب یا غذای گوشتی داشته باشید.',
    icon: Dumbbell,
    color: 'bg-rose-500',
    requiredKeywords: ['کباب', 'گوشت', 'مرغ', 'ماهی', 'تخم مرغ']
  },
  {
    id: 'light-dinner',
    title: 'شام سبک',
    description: 'تمرکز بر روی سوپ‌ها، آش‌ها و سالادها برای وعده‌های سبک‌تر.',
    icon: Zap,
    color: 'bg-amber-500',
    bannedCategories: ['polo', 'stew', 'fastfood', 'kabab', 'dolma']
  },
  {
    id: 'sugar-free',
    title: 'حذف قند و شکر',
    description: 'حذف کامل دسرها و غذاهای شیرین مثل خورش‌های شیرین.',
    icon: Heart,
    color: 'bg-purple-500',
    bannedCategories: ['dessert'],
    bannedKeywords: ['شکر', 'قند', 'نبات', 'شیرینی']
  }
];