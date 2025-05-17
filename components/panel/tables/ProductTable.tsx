"use client";

import { PRODUCT_DELETE_MUTATION } from "@/apollo/mutations";
import { PRODUCT_LIST_QUERY } from "@/apollo/queries";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

type Props = {};

export default function ProductTable({}: Props) {
  const {
    data: productData,
    loading: productLoading,
    error: productError,
    refetch: productRefetch
  } = useQuery(PRODUCT_LIST_QUERY);

  if (productLoading) {
    <LoadingSkeleton />;
  }

  if (productError) {
    return <p>{productError.message}</p>;
  }

  const [deleteProduct, {error: deleteError, loading: deleteLoading}] = useMutation(
    PRODUCT_DELETE_MUTATION,
    {
      fetchPolicy: 'network-only'
    }
  )

  const handleDeleteProduct = async (id:string) => {
    try{
      await deleteProduct({
        variables: { id }
      })
      await productRefetch()
    }
    catch(err) {
      console.log(deleteError?.message);
    }
  }

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      {/* MOBILE */}
      <div className="grid grid-cols-1 gap-4 py-4">
        <Link
          href="/panel/products/create"
          className="border border-gra bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد محصول جدید
        </Link>
        {productData?.productList?.map((product: any) => (
          <div
            key={product.id}
            className="border px-4 pb-1 pt-3 rounded text-sm border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p>
                  <strong>دسته بندی (برند):</strong> {product.category.name} (
                  {product.category.slug}) برند: {product.brand.name} ({product.brand.slug})
                </p>
                <p>
                  <strong>عنوان:</strong> {product.title}
                </p>
                <p>
                  <strong>نام انگلیسی (SEO):</strong> {product.slug}
                </p>
                <p>
                  <strong>توضیحات:</strong> {product.description || "-"}
                </p>
              </div>
              {typeof product.image === "string" && product.image.trim() !== "" ? (
                <Image
                  src={product.image}
                  alt="عکس"
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-500">ثبت نشده</span>
              )}
            </div>
            <div className="flex items-center justify-evenly mt-4 border-t-2 pt-6 pb-4">
              <Link
                href={`/panel/products/update/${product.id}`}
                className="flex items-center justify-evenly gap-2 shadow px-8 p-2 text-blue-400 hover:text-blue-900 hover:cursor-pointer"
              >
                <FaEdit /> ویرایش
              </Link>
              <button
                className="shadow px-8 p-2 text-red-500 hover:text-red-800 flex items-center justify-evenly gap-2 hover:cursor-pointer"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <FaTrashCan />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
