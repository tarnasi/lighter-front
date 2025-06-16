"use client";

import { USER_LIST_QUERY } from "@/apollo/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";
import { useCategoryList } from "@/hooks/useCategory";
import { useProductList } from "@/hooks/useProduct";
import { useBrandList } from "@/hooks/useBrand";
import { useEffect } from "react";

export default function InfoCard() {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery(USER_LIST_QUERY);

  const {
    loading: categoryLoading,
    error: categoryError,
    total: categoryTotal,
    refetch: categoryRefetch,
  } = useCategoryList({
    pagination: { page: 1, pageSize: 1000 },
  });

  const {
    loading: brandLoading,
    error: brandError,
    total: brandTotal,
    refetch: brandRefetch,
  } = useBrandList({
    pagination: { page: 1, pageSize: 1000 },
  });

  const {
    loading: productLoading,
    error: productError,
    total: productTotal,
    refetch: productRefetch,
  } = useProductList({
    pagination: { page: 1, pageSize: 1000 },
  });

  useEffect(() => {
    userRefetch();
    categoryRefetch();
    brandRefetch();
    productRefetch();
  });

  if (userLoading && categoryLoading && brandLoading && productLoading)
    return <LoadingSkeleton />;
  if (userError) return <p className="text-red-500">{userError.message}</p>;
  if (categoryError)
    return <p className="text-red-500">{categoryError.message}</p>;
  if (brandError) return <p className="text-red-500">{brandError.message}</p>;
  if (productError)
    return <p className="text-red-500">{productError.message}</p>;

  return (
    <div className="text-black grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center mt-4">
      <div className="shadow bg-teal-200 p-4 rounded flex flex-col items-center gap-4 text-blue-800 w-40 md:w-40 lg:w-50 xl:w-50">
        کاربران<span className="text-3xl">{userData?.userList?.length}</span>
        <Link
          href="/panel/users/create"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ساخت جدید
        </Link>
        <Link
          href="/panel/users"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          مشاهده
        </Link>
      </div>
      <div className="shadow bg-orange-300 p-4 rounded flex flex-col items-center gap-4 text-amber-800 w-40 md:w-40 lg:w-50 xl:w-50">
        دسته بندی<span className="text-3xl">{categoryTotal}</span>
        <Link
          href="/panel/categories/create"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ساخت جدید
        </Link>
        <Link
          href="/panel/categories"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          مشاهده
        </Link>
      </div>
      <div className="shadow bg-sky-200 p-4 rounded flex flex-col items-center gap-4 text-gray-600 w-40 md:w-40 lg:w-50 xl:w-50">
        برند
        <span className="text-3xl">{brandTotal}</span>
        <Link
          href="/panel/brands/create"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          ساخت جدید
        </Link>
        <Link
          href="/panel/brands"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-center"
        >
          مشاهده
        </Link>
      </div>
      <div className="shadow bg-cyan-400 p-4 rounded flex flex-col items-center justify-center gap-4 text-white w-40 md:w-40 lg:w-50 xl:w-50">
        محصولات
        <span className="text-3xl">{productTotal}</span>
        <Link
          href="/panel/products/create"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-black text-center"
        >
          ساخت جدید
        </Link>
        <Link
          href="/panel/products"
          className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-black text-center"
        >
          مشاهده
        </Link>
      </div>
    </div>
  );
}
