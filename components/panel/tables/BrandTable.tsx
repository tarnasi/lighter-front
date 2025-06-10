"use client";

import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useBrandList } from "@/hooks/useBrandList";
import { BRAND_DELETE_MUTATION } from "@/apollo/mutations";

import Link from "next/link";
import Image from "next/image";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyBox from "@/components/EmptyBox";

import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const BrandTable = () => {
  const {
    brands,
    loading,
    error,
    refetch,
  } = useBrandList({
    search: "",
    sort: { field: "name", order: "ASC" },
    pagination: {
      page: 1,
      pageSize: 20,
    }
  });

  const [deleteBrand] = useMutation(BRAND_DELETE_MUTATION, {
    refetchQueries: ["BrandList"],
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleDeleteBrand = async (id: string) => {
    try {
      await deleteBrand({ variables: { id } });
      await refetch();
    } catch (err) {
      console.error("Failed to delete brand", err);
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (brands.length === 0) return <EmptyBox />;

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto py-8">
        <Link
          href="/panel/brands/create"
          className="border bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد برند جدید
        </Link>
        <table className="w-full min-w-[800px] border mt-4 text-center">
          <thead>
            <tr className="bg-teal-800 text-gray-200 text-sm">
              <th className="p-2 border">نام</th>
              <th className="p-2 border">نام انگلیسی (SEO)</th>
              <th className="p-2 border">توضیحات</th>
              <th className="p-2 border">تصویر</th>
              <th className="p-2 border">تعداد محصولات</th>
              <th className="p-2 border">ویرایش</th>
              <th className="p-2 border">حذف</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: any) => (
              <tr key={brand.id} className="text-sm text-black border">
                <td className="p-2 border">{brand.name}</td>
                <td className="p-2 border">{brand.slug}</td>
                <td className="p-2 border">
                  {brand.description || <span className="text-gray-500">ثبت نشده</span>}
                </td>
                <td className="p-2 border flex items-center justify-center">
                  {brand.image ? (
                    <Image
                      src={brand.image}
                      alt="Brand"
                      width={32}
                      height={32}
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">ثبت نشده</span>
                  )}
                </td>
                <td className="p-2 border">{brand.products?.length ?? 0}</td>
                <td className="p-2 border">
                  <Link
                    href={`/panel/brands/update/${brand.id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <FaEdit className="text-blue-900 hover:text-sky-500" />
                  </Link>
                </td>
                <td className="p-2 border">
                  <FaTrashCan
                    onClick={() => handleDeleteBrand(brand.id)}
                    className="text-red-600 hover:text-amber-500 hover:cursor-pointer"
                  />
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
          className="border bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد برند جدید
        </Link>
        {brands.map((brand: any) => (
          <div
            key={brand.id}
            className="border px-4 pb-1 pt-3 rounded text-sm border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p>
                  <strong>نام:</strong> {brand.name}
                </p>
                <p>
                  <strong>نام انگلیسی (SEO):</strong> {brand.slug}
                </p>
                <p>
                  <strong>توضیحات:</strong> {brand.description || "-"}
                </p>
                <p>
                  <strong>تعداد محصولات:</strong> {brand.products?.length ?? 0}
                </p>
              </div>
              {brand.image ? (
                <Image
                  src={brand.image}
                  alt="عکس برند"
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
                onClick={() => handleDeleteBrand(brand.id)}
                className="shadow px-8 p-2 text-red-500 hover:text-red-800 flex items-center justify-evenly gap-2 hover:cursor-pointer"
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
};

export default BrandTable;
