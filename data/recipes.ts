
import { Dish } from '../types';
import { STEWS } from './dishes_stews';
import { POLOS } from './dishes_polos';
import { KABABS } from './dishes_kababs';
import { ASHES } from './dishes_ashes';
import { KUKUS } from './dishes_kukus';
import { DOLMAS } from './dishes_dolmas';
import { MIX_DISHES } from './dishes_mix';
import { SOUPS } from './dishes_soups';
import { VARIED_DISHES } from './dishes_varied';
import { FASTFOOD_DISHES } from './dishes_fastfood';
import { USER_PROVIDED_DISHES_PART_1 } from './dishes_user_provided';
import { USER_PROVIDED_DISHES_PART_2 } from './dishes_user_provided_2';
import { USER_PROVIDED_DISHES_PART_3 } from './dishes_user_provided_3';
import { TURKISH_DISHES } from './dishes_turkish';
import { ARAB_DISHES } from './dishes_arab';
import { ITALIAN_DISHES } from './dishes_italian';
import { INDIAN_DISHES } from './dishes_indian';
import { MEXICAN_DISHES } from './dishes_mexican';
import { JAPANESE_DISHES } from './dishes_japanese';
import { FRENCH_DISHES } from './dishes_french';
import { UK_DISHES } from './dishes_uk';
import { PAKISTANI_DISHES } from './dishes_pakistani';
import { RUSSIAN_DISHES } from './dishes_russian';
import { UZBEK_DISHES } from './dishes_uzbek';
import { IRANIAN_DESSERTS } from './dishes_desserts';
import { INTERNATIONAL_DESSERTS } from './dishes_international_desserts';
import { CAUCASUS_DISHES } from './dishes_caucasus';
import { CENTRAL_ASIA_DISHES } from './dishes_central_asia';
import { FAR_EAST_DISHES } from './dishes_chinese_thai';

export const DEFAULT_DISHES: Dish[] = [
  ...STEWS,
  ...POLOS,
  ...KABABS,
  ...ASHES,
  ...KUKUS,
  ...DOLMAS,
  ...MIX_DISHES,
  ...SOUPS,
  ...VARIED_DISHES,
  ...FASTFOOD_DISHES,
  ...USER_PROVIDED_DISHES_PART_1,
  ...USER_PROVIDED_DISHES_PART_2,
  ...USER_PROVIDED_DISHES_PART_3,
  ...TURKISH_DISHES,
  ...ARAB_DISHES,
  ...ITALIAN_DISHES,
  ...INDIAN_DISHES,
  ...MEXICAN_DISHES,
  ...JAPANESE_DISHES,
  ...FRENCH_DISHES,
  ...UK_DISHES,
  ...PAKISTANI_DISHES,
  ...RUSSIAN_DISHES,
  ...UZBEK_DISHES,
  ...IRANIAN_DESSERTS,
  ...INTERNATIONAL_DESSERTS,
  ...CAUCASUS_DISHES,
  ...CENTRAL_ASIA_DISHES,
  ...FAR_EAST_DISHES
];
