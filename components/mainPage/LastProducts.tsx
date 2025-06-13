"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useProductList } from "@/hooks/useProduct";
import Product from "../Product";

type Props = {
  title: string;
};

export default function LastProducts({ title }: Props) {
  const {
    products: productData,
    loading: productLoading,
    error: productError,
  } = useProductList({
    sort: { field: "updated_at", order: "DESC" },
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
