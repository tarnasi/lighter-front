"use client";

import { useMutation, useQuery } from "@apollo/client";
import { CATEGORY_LIST_QUERY } from "@/apollo/queries";
import { useEffect } from "react";
import LoadingSkeleton from "../LoadingSkeleton";

import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { DELETE_CATEGORY_MUTATION } from "@/apollo/mutations";
import EmptyBox from "../EmptyBox";
import Image from "next/image";

const CategoryTable = () => {
  const { data, loading, error, refetch } = useQuery(CATEGORY_LIST_QUERY);
  const [deleteCategory, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_CATEGORY_MUTATION, {
      refetchQueries: ["CategoryList"],
    });

  useEffect(() => {
    if (error?.message.includes("مجاز")) {
    }
  }, [error]);

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory({ variables: { id } });
      await refetch();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  if (data?.categoryList?.length === 0) {
    return <EmptyBox />;
  }

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      {/* DESKTOP */}
      <div className="hidden md:block overflow-x-auto py-8">
        <Link
          href="/panel/categories/create"
          className="border border-gra bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد دسته بندی جدید
        </Link>
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
            {data?.categoryList?.map((category: any) => (
              <tr key={category.id} className="text-lg text-black">
                <td className="p-2 border">{category.name}</td>
                <td className="p-2 border">{category.slug}</td>
                <td className="p-2 border">
                  {category.description || (
                    <span className="text-gray-500">ثبت نشده</span>
                  )}
                </td>
                <td className="p-2 flex items-center justify-center">
                  <Image
                    src={
                      category.image || (
                        <span className="text-gray-500">ثبت نشده</span>
                      )
                    }
                    alt="عکس"
                    width={48}
                    height={48}
                    className="object-cover rounded-md"
                  />
                </td>
                <td className="p-2 border">
                  <Link
                    href={`/panel/categories/update/${category.id}`}
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
                        onClick={() => handleDeleteCategory(category.id)}
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
          href="/panel/categories/create"
          className="border border-gra bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد دسته بندی جدید
        </Link>
        {data?.categoryList?.map((category: any) => (
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
              <Image
                src={
                  category.image || (
                    <span className="text-gray-500">ثبت نشده</span>
                  )
                }
                alt="عکس"
                width={48}
                height={48}
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex items-center justify-evenly mt-4 border-t-2 pt-6 pb-4">
              <Link
                href={`/panel/categories/update/${category.id}`}
                className="flex items-center justify-evenly gap-2 shadow px-8 p-2 text-blue-400 hover:text-blue-900 hover:cursor-pointer"
              >
                <FaEdit /> ویرایش
              </Link>
              <button
                className="shadow px-8 p-2 text-red-500 hover:text-red-800 flex items-center justify-evenly gap-2 hover:cursor-pointer"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <FaTrashCan />حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;
