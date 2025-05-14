"use client";

import { useMutation, useQuery } from "@apollo/client";
import { CATEGORY_LIST_QUERY } from "@/apollo/queries";
import { useEffect } from "react";
import LoadingSkeleton from "../LoadingSkeleton";

import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import JalaliDateConverter from "../JalaliDateConverter";
import Link from "next/link";
import { DELETE_CATEGORY_MUTATION } from "@/apollo/mutations";

const CategoryTable = () => {
  const { data, loading, error, refetch } = useQuery(CATEGORY_LIST_QUERY);
  const [deleteCategory, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_CATEGORY_MUTATION, {
      refetchQueries: ["CategoryList"], // or use a `refetch()` manually
    });

  useEffect(() => {
    if (error?.message.includes("مجاز")) {
    }
  }, [error]);

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

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      <div className="hidden md:block overflow-x-auto py-8">
        <Link
          href="/panel/users/create"
          className="border border-gra bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ایجاد دسته بندی جدید
        </Link>
        <table className="w-full min-w-[600px] border mt-4 text-center">
          <thead>
            <tr className="bg-teal-800 text-gray-200 text-sm">
              <th className="p-2 border">#</th>
              <th className="p-2 border">نام</th>
              <th className="p-2 border">نام انگلیسی (SEO)</th>
              <th className="p-2 border">توضیحات</th>
              <th className="p-2 border">ویرایش</th>
              <th className="p-2 border">حذف</th>
            </tr>
          </thead>
          <tbody>
            {data?.categoryList?.map((category: any) => (
              <tr key={category.id} className="text-sm text-black">
                <td className="p-2 border">{category.name}</td>
                <td className="p-2 border">{category.slug}</td>
                <td className="p-2 border">{category.description || "-"}</td>
                <td className="p-2 border">
                  <JalaliDateConverter datetime={category.birthday} />
                </td>
                <td className="p-2 border">
                  <div className="flex items-center justify-evenly gap-2">
                    <span>
                      <FaEdit className="text-blue-900 hover:text-sky-500 hover:cursor-pointer" />
                    </span>
                    <span>
                      <FaTrashCan 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-amber-500 hover:cursor-pointer" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid grid-cols-1 gap-4 p-4 text-black">
        {data?.categoryList?.map((category: any) => (
          <div
            key={category.id}
            className="border p-4 rounded shadow text-sm border-gray-200"
          >
            <p>
              <strong>نام:</strong> {category.name}
            </p>
            <p>
              <strong>نام انگلیسی (SEO):</strong> {category.slug}
            </p>
            <p>
              <strong>توضیحات:</strong> {category.desciprion || "-"}
            </p>
            <div className="flex items-center justify-evenly mt-4">
              <button className="shadow px-8 p-2 text-yellow-400">
                <FaEdit />
              </button>
              <button
                className="shadow px-8 p- hover:text-yellow-500 bg-black"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <FaTrashCan className="text-red-600 hover:cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;
