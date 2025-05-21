"use client";

import { PRODUCT_DELETE_MUTATION } from "@/apollo/mutations";
import { PRODUCT_LIST_QUERY } from "@/apollo/queries";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

type Props = {};

export default function ProductTable({}: Props) {
  const {
    data: productData,
    loading: productLoading,
    error: productError,
    refetch: productRefetch,
  } = useQuery(PRODUCT_LIST_QUERY);

  const [deleteProduct, { error: deleteError }] = useMutation(
    PRODUCT_DELETE_MUTATION,
    {
      fetchPolicy: "network-only",
    }
  );

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } });
      await productRefetch();
    } catch (err) {
      console.log(deleteError?.message);
    }
  };

  useEffect(() => {
    productRefetch();
  }, []);

  if (productLoading) return <LoadingSkeleton />;
  if (productError) return <p>{productError.message}</p>;

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 text-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Link
          href="/panel/products/create"
          className="col-span-full w-2/3 sm:2/3 md:1/3 lg:1/3 text-center bg-green-100 text-green-700 border border-green-400 rounded p-2 hover:bg-green-200 transition"
        >
          ایجاد محصول جدید
        </Link>

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
                  موجودی: {product.quantity}
                </div>
              </div>

              {/* اکشن‌ها */}
              <div className="flex border-t divide-x text-sm">
                <Link
                  href={`/panel/products/update/${product.id}`}
                  className="w-1/2 py-2 flex justify-center items-center text-blue-600 hover:bg-blue-50 transition"
                >
                  <FaEdit className="ml-1" />
                  ویرایش
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="w-1/2 py-2 flex justify-center items-center text-red-500 hover:bg-red-50 transition"
                >
                  <FaTrashCan className="ml-1" />
                  حذف
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
