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
