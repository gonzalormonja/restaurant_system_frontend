import { Category } from './category';

export interface Menu {
  id: number;
  name: string;
  category_name: string;
  category: Category;
  short_name: string;
  price: number[];
  prices: any[];
}
