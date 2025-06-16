"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CATEGORY_DELETE_MUTATION } from "@/apollo/mutations";
import { useCategoryList } from "@/hooks/useCategory";

import Link from "next/link";
import Image from "next/image";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyBox from "@/components/EmptyBox";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const CategoryTable = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { categories, total, loading, error, refetch } = useCategoryList({
    search: "",
    sort: { field: "name", order: "ASC" },
    pagination: { page, pageSize },
  });

  const [deleteCategory] = useMutation(CATEGORY_DELETE_MUTATION, {
    refetchQueries: ["CategoryList"],
  });

  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    refetch();
  }, [page]);

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory({ variables: { id } });
      await refetch();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  const Pagination = () => (
    <div className="flex justify-center items-center gap-4 mt-6 mb-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
      >
        قبلی
      </button>
      <span className="text-sm">
        صفحه {page} از {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="bg-gray-200 px-4 py-1 rounded disabled:opacity-50"
      >
        بعدی
      </button>
    </div>
  );

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (categories.length === 0) return <EmptyBox />;

  return (
    <div>
      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto py-8">
        <Link
          href="/panel/categories/create"
          className="border bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center block"
        >
          ایجاد دسته بندی جدید
        </Link>

        {/* Pagination Top */}
        <Pagination />

        <table className="w-full min-w-[600px] border mt-4 text-center">
          <thead>
            <tr className="bg-teal-800 text-gray-200 text-sm">
              <th className="p-2 border">نام</th>
              <th className="p-2 border">نام انگلیسی (SEO)</th>
              <th className="p-2 border">توضیحات</th>
              <th className="p-2 border">تصویر</th>
              <th className="p-2 border">ویرایش</th>
              <th className="p-2 border">حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any) => (
              <tr key={category.id} className="text-sm text-black">
                <td className="p-2 border">{category.name}</td>
                <td className="p-2 border">{category.slug}</td>
                <td className="p-2 border">
                  {category.description || (
                    <span className="text-gray-500">ثبت نشده</span>
                  )}
                </td>
                <td className="p-2 border flex items-center justify-center">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt="عکس"
                      width={32}
                      height={32}
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">ثبت نشده</span>
                  )}
                </td>
                <td className="p-2 border">
                  <Link
                    href={`/panel/categories/update/${category.id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <FaEdit className="text-blue-900 hover:text-sky-500 hover:cursor-pointer" />
                  </Link>
                </td>
                <td className="p-2 border">
                  <FaTrashCan
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-amber-500 hover:cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Bottom */}
        <Pagination />
      </div>

      {/* MOBILE */}
      <div className="md:hidden grid grid-cols-1 gap-4 py-4">
        <Link
          href="/panel/categories/create"
          className="border bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد دسته بندی جدید
        </Link>

        {/* Pagination Top */}
        <Pagination />

        {categories.map((category: any) => (
          <div
            key={category.id}
            className="border px-4 pb-1 pt-3 rounded text-sm border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p>
                  <strong>نام:</strong> {category.name}
                </p>
                <p>
                  <strong>نام انگلیسی (SEO):</strong> {category.slug}
                </p>
                <p>
                  <strong>توضیحات:</strong> {category.description || "-"}
                </p>
              </div>
              {category.image ? (
                <Image
                  src={category.image}
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
                href={`/panel/categories/update/${category.id}`}
                className="flex items-center justify-evenly gap-2 shadow px-8 p-2 text-blue-400 hover:text-blue-900 hover:cursor-pointer"
              >
                <FaEdit /> ویرایش
              </Link>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="shadow px-8 p-2 text-red-500 hover:text-red-800 flex items-center justify-evenly gap-2 hover:cursor-pointer"
              >
                <FaTrashCan />
                حذف
              </button>
            </div>
          </div>
        ))}

        {/* Pagination Bottom */}
        <Pagination />
      </div>
    </div>
  );
};

export default CategoryTable;
