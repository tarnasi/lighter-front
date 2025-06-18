type ProductInput = {
  title: string;
  slug: string;
  description?: string;
  price: number;
  discount?: number;
  quantity: number;
  is_pack: boolean;
  categoryId: string;
  brandId: string;
  images?: string[];
};

export interface Product {
  id: string;
  title: string;
  slug: string;
  images: string[];
  description?: string;
  price: number;
  discount?: number;
  quantity: number;
  is_pack: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  brand?: Brand;
}
