"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import EmptyBox from "../EmptyBox";
import LoadingSkeleton from "../LoadingSkeleton";
import { useMutation, useQuery } from "@apollo/client";
import { BRAND_LIST_QUERY } from "@/apollo/queries";
import { BRAND_DELETE_MUTATION } from "@/apollo/mutations";

type Props = {};

export default function BrandTable({}: Props) {
  const {
    data: brandData,
    loading: brandLoading,
    error: brandError,
    refetch: brandRefetch,
  } = useQuery(BRAND_LIST_QUERY);

  const [deleteBrand, { loading: deleteLoading, error: deleteError }] =
    useMutation(BRAND_DELETE_MUTATION, {
      refetchQueries: ["BrandList"],
    });

  useEffect(() => {
    if (brandError?.message.includes("مجاز")) {
    }
  }, [brandError]);

  useEffect(() => {
    brandRefetch();
  }, []);

  if (brandLoading) return <LoadingSkeleton />;
  if (brandError) return <p className="text-red-500">{brandError.message}</p>;

  const handleDeleteBrand = async (id: string) => {
    try {
      await deleteBrand({ variables: { id } });
      await brandRefetch();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  if (brandData?.categoryList?.length === 0) {
    return <EmptyBox />;
  }

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto py-8">
        <Link
          href="/panel/brands/create"
          className="border border-gra bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد برند جدید
        </Link>
        <table className="w-full min-w-[600px] border mt-4 text-center">
          <thead>
            <tr className="bg-teal-800 text-gray-200 text-sm">
              <th className="p-2 border">نام</th>
              <th className="p-2 border">نام انگلیسی (SEO)</th>
              <th className="p-2 border">توضیحات</th>
              <th className="p-2 border">دسته بندی</th>
              <th className="p-2 border">تصویر</th>
              <th className="p-2 border">ویرایش</th>
              <th className="p-2 border">حذف</th>
            </tr>
          </thead>
          <tbody>
            {brandData?.brandList?.map((brand: any) => (
              <tr key={brand.id} className="text-lg text-black border">
                <td className="p-2 border">
                  {brand.category.name}({brand.category.slug})
                </td>
                <td className="p-2 border">{brand.name}</td>
                <td className="p-2 border">{brand.slug}</td>
                <td className="p-2 border">
                  {brand.description || (
                    <span className="text-gray-500">ثبت نشده</span>
                  )}
                </td>
                <td className="p-2 flex items-center justify-center">
                  {typeof brand.image === "string" &&
                  brand.image.trim() !== "" ? (
                    <Image
                      src={brand.image}
                      alt="عکس"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">ثبت نشده</span>
                  )}
                </td>
                <td className="p-2 border">
                  <Link
                    href={`/panel/brands/update/${brand.id}`}
                    className="flex items-center justify-evenly gap-2"
                  >
                    <span>
                      <FaEdit className="text-blue-900 hover:text-sky-500 hover:cursor-pointer" />
                    </span>
                  </Link>
                </td>
                <td className="p-2 border">
                  <div className="flex items-center justify-evenly gap-2">
                    <span>
                      <FaTrashCan
                        onClick={() => handleDeleteBrand(brand.id)}
                        className="text-red-600 hover:text-amber-500 hover:cursor-pointer"
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden grid grid-cols-1 gap-4 py-4">
        <Link
          href="/panel/brands/create"
          className="border border-gra bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد برند جدید
        </Link>
        {brandData?.brandList?.map((brand: any) => (
          <div
            key={brand.id}
            className="border px-4 pb-1 pt-3 rounded text-sm border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p>
                  <strong>دسته بندی:</strong> {brand.category.name} ({brand.category.slug})
                </p>
                <p>
                  <strong>نام:</strong> {brand.name}
                </p>
                <p>
                  <strong>نام انگلیسی (SEO):</strong> {brand.slug}
                </p>
                <p>
                  <strong>توضیحات:</strong> {brand.description || "-"}
                </p>
              </div>
              {typeof brand.image === "string" && brand.image.trim() !== "" ? (
                <Image
                  src={brand.image}
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
                href={`/panel/brands/update/${brand.id}`}
                className="flex items-center justify-evenly gap-2 shadow px-8 p-2 text-blue-400 hover:text-blue-900 hover:cursor-pointer"
              >
                <FaEdit /> ویرایش
              </Link>
              <button
                className="shadow px-8 p-2 text-red-500 hover:text-red-800 flex items-center justify-evenly gap-2 hover:cursor-pointer"
                onClick={() => handleDeleteBrand(brand.id)}
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
