import { type TCategory } from './Categories';

// }
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: TCategory;
  creationAt: string;
  updatedAt: string;
  image?: string;
  images: string[];
  quantity?: number;
};
