"use client";

import { BRAND_LIST_QUERY, CATEGORY_LIST_QUERY, USER_LIST_QUERY } from "@/apollo/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";

export default function InfoCard() {

  const { data: userData, loading: userLoading, error: userError } = useQuery(USER_LIST_QUERY);
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(CATEGORY_LIST_QUERY);
  const { data: brandData, loading: brandLoading, error: brandError } = useQuery(BRAND_LIST_QUERY);
  // const { data: productData, loading: productLoading, error: productError } = useQuery(PRODUCT_LIST_QUERY);


  if (userLoading && categoryLoading && brandLoading) return <LoadingSkeleton />;
  if (userError) return <p className="text-red-500">{userError.message}</p>;
  if (categoryError) return <p className="text-red-500">{categoryError.message}</p>;
  if (brandError) return <p className="text-red-500">{brandError.message}</p>;
  
  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 text-gray-800">
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
          دسته بندی<span className="text-3xl">{categoryData?.categoryList?.length}</span>
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
          برند<span className="text-3xl">{brandData?.brandList?.length}</span>
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
          محصولات<span className="text-3xl">100</span>
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
    </div>
  );
}
