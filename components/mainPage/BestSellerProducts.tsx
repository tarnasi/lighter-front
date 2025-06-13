"use client";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useProductList } from "@/hooks/useProduct";
import { useCategoryStore } from "@/stores/categoryStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCaretLeftFill } from "react-icons/bs";
import Product from "../Product";

type Props = {
  title: string;
};

export default function LastProducts({ title }: Props) {
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const {
    products: productData,
    loading: productLoading,
    error: productError,
    refetch: productRefetch,
  } = useProductList({
    categoryId: selectedCategory == "all" ? null : selectedCategory,
  });

  useEffect(() => {
    productRefetch({
      categoryId: selectedCategory === "all" ? null : selectedCategory,
    });
  }, [selectedCategory]);

  const addToProduct = () => {
    setNumberOfProduct(numberOfProduct + 1);
  };

  const removeToProduct = () => {
    if (numberOfProduct <= 0) {
      return;
    }
    setNumberOfProduct(numberOfProduct - 1);
  };

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
