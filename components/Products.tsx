"use client";

import { PRODUCT_LIST_QUERY } from "@/apollo/queries";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useCategoryStore } from "@/stores/categoryStore";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

export default function Products({}: Props) {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const {
    data: productData,
    loading: productLoading,
    error: productError,
    refetch: productRefetch,
  } = useQuery(PRODUCT_LIST_QUERY, {
    variables: {
      categoryId: selectedCategory == "all" ? null : selectedCategory,
    },
  });

  useEffect(() => {
    productRefetch({
      categoryId: selectedCategory === "all" ? null : selectedCategory,
    });
  }, [selectedCategory]);

  if (productLoading) return <LoadingSkeleton />;
  if (productError) return <p>{productError.message}</p>;

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 text-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {productData?.productList?.map((product: any) => {
          const hasDiscount = product.discount > 0;
          const discountedPrice = hasDiscount
            ? product.price - product.price * (product.discount / 100)
            : product.price;

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col"
            >
              {/* دسته بندی و برند */}
              <div className="bg-gray-100 text-xs px-4 py-2 text-gray-700 flex justify-between">
                <span>دسته: {product.category.name}</span>
                <span>برند: {product.brand.name}</span>
              </div>

              {/* عکس با نشان is_pack */}
              <div className="relative w-full h-48 bg-gray-50">
                {product.is_pack && (
                  <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow z-10">
                    باکس / عمده
                  </div>
                )}
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    بدون تصویر
                  </div>
                )}
              </div>

              {/* بدنه کارت */}
              <div className="flex-1 p-4 text-sm flex flex-col justify-between gap-2">
                <h3 className="font-bold text-base text-gray-800">
                  {product.title}
                </h3>

                {/* قیمت */}
                <div className="text-sm">
                  {hasDiscount ? (
                    <div className="flex items-center gap-2">
                      <span className="line-through text-red-400">
                        {product.price.toLocaleString()} تومان
                      </span>
                      <span className="text-green-600 font-bold">
                        {discountedPrice.toLocaleString()} تومان
                      </span>
                      <span className="bg-red-100 text-red-600 px-1 rounded text-xs">
                        ٪{product.discount}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium text-gray-700">
                      {product.price.toLocaleString()} تومان
                    </span>
                  )}
                </div>

                {/* موجودی */}
                <div className="text-xs text-gray-600">
                  {Number(product.quantity) > 0 ? (
                    `موجودی: ${product.quantity}`
                  ) : (
                    <span className="text-red-600 underline underline-offset-4">
                      اتمام موجودی
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
