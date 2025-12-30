
import { Dish } from '../types';
import { ASHES } from './dishes_ashes';
import { POLOS } from './dishes_polos';
import { KHORAKS } from './dishes_khoraks';
import { STEWS } from './dishes_stews';
import { SOUPS } from './dishes_soups';
import { FASTFOOD_DISHES } from './dishes_fastfood';
import { KABABS } from './dishes_kababs';
import { USER_PROVIDED_DISHES_PART_2 } from './dishes_user_provided_2';
import { USER_PROVIDED_DISHES_PART_3 } from './dishes_user_provided_3';
import { USER_PROVIDED_DISHES_PART_4 } from './dishes_user_provided_4';
import { USER_PROVIDED_DISHES_PART_5 } from './dishes_user_provided_5';

// International categories
import { INDIAN_DISHES } from './dishes_indian';
import { ITALIAN_DISHES } from './dishes_italian';
import { MEXICAN_DISHES } from './dishes_mexican';
import { FRENCH_DISHES } from './dishes_french';
import { TURKISH_DISHES } from './dishes_turkish';
import { ARAB_DISHES } from './dishes_arab';
import { PAKISTANI_DISHES } from './dishes_pakistani';
import { RUSSIAN_DISHES } from './dishes_russian';
import { CENTRAL_ASIA_DISHES } from './dishes_central_asia';
import { VARIED_DISHES } from './dishes_varied';
import { JAPANESE_DISHES } from './dishes_japanese';
import { FAR_EAST_DISHES } from './dishes_chinese_thai';
import { UZBEK_DISHES } from './dishes_uzbek';

/**
 * دیتابیس تثبیت شده نوش (Master Safe Database)
 * تمام لیست‌های زیر به عنوان داده‌های نهایی، ایمن و قفل شده در سیستم در نظر گرفته می‌شوند.
 */

// ۱. فهرست کامل آش‌ها (تثبیت شده)
const COMPLETED_ASHES = [...ASHES];

// ۲. فهرست کامل پلوها (تثبیت شده)
const COMPLETED_POLOS = [
  ...POLOS,
  ...USER_PROVIDED_DISHES_PART_2,
  ...USER_PROVIDED_DISHES_PART_3
];

// ۳. فهرست کامل خوراک‌ها (تثبیت شده)
const COMPLETED_KHORAKS = [
  ...KHORAKS,
  ...USER_PROVIDED_DISHES_PART_4,
  ...USER_PROVIDED_DISHES_PART_5
];

// ۴. فهرست کامل خورش‌ها (تثبیت شده)
const COMPLETED_STEWS = [...STEWS];

// ۵. فهرست کامل سوپ‌ها (تثبیت شده)
const COMPLETED_SOUPS = [...SOUPS];

// ۶. فهرست فست‌فودها (تثبیت شده)
const COMPLETED_FASTFOODS = [...FASTFOOD_DISHES];

// ۷. فهرست کباب‌ها (تثبیت شده)
const COMPLETED_KABABS = [...KABABS];

// ۸. فهرست جامع غذاهای بین‌المللی (۱۱۲ مورد نهایی - قفل شده و تثبیت شده)
const COMPLETED_INTERNATIONAL: Dish[] = [
  ...INDIAN_DISHES,
  ...ITALIAN_DISHES,
  ...MEXICAN_DISHES,
  ...FRENCH_DISHES,
  ...TURKISH_DISHES,
  ...ARAB_DISHES,
  ...PAKISTANI_DISHES,
  ...RUSSIAN_DISHES,
  ...CENTRAL_ASIA_DISHES,
  ...VARIED_DISHES,
  ...JAPANESE_DISHES,
  ...FAR_EAST_DISHES,
  ...UZBEK_DISHES
];

export const DEFAULT_DISHES: Dish[] = [
  ...COMPLETED_ASHES,
  ...COMPLETED_POLOS,
  ...COMPLETED_KHORAKS,
  ...COMPLETED_STEWS,
  ...COMPLETED_SOUPS,
  ...COMPLETED_FASTFOODS,
  ...COMPLETED_KABABS,
  ...COMPLETED_INTERNATIONAL
];
