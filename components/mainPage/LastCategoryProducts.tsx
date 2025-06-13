"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useProductListByCategory } from "@/hooks/useProduct";
import Product from "../Product";

type Props = {
  title: string;
  category?: string;
};

export default function LastCategoryProducts({
  title,
  category = "all",
}: Props) {
  const {
    products: productData,
    loading: productLoading,
    error: productError,
  } = useProductListByCategory({
    slug: category == "all" ? "all" : category,
    sort: { field: "created_at", order: "DESC" },
    pagination: { page: 1, pageSize: 15 },
  });

  if (productLoading) return <LoadingSkeleton />;
  if (productError) return <p>{productError.message}</p>;

  return (
    <div className="py-2">
      <h2 className="font-extrabold underline underline-offset-8">{title}</h2>
      <div className="flex overflow-x-auto gap-4 py-4 px-2">
        {productData?.map((product: any) => {
          return <Product product={product} />;
        })}
      </div>
    </div>
  );
}
