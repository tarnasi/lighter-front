"use client";

import Link from "next/link";

export default function InfoCard() {
  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 text-gray-800">
      <div className="text-black grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center mt-4">
        <div className="shadow bg-teal-200 p-4 rounded flex flex-col items-center gap-4 text-blue-800 w-40 md:w-40 lg:w-50 xl:w-50">
          کاربران<span className="text-3xl">22</span>
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
          دسته بندی<span className="text-3xl">10</span>
          <Link
            href="/panel/categories/create"
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
        <div className="shadow bg-sky-200 p-4 rounded flex flex-col items-center gap-4 text-gray-600 w-40 md:w-40 lg:w-50 xl:w-50">
          برند<span className="text-3xl">8</span>
          <Link
            href="/panel/brands/create"
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
        <div className="shadow bg-cyan-400 p-4 rounded flex flex-col items-center justify-center gap-4 text-white w-40 md:w-40 lg:w-50 xl:w-50">
          محصولات<span className="text-3xl">100</span>
          <Link
            href="/panel/products/create"
            className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-black text-center"
          >
            ساخت جدید
          </Link>
          <Link
            href="/panel/users"
            className="bg-white w-full rounded p-1 text-sm hover:bg-gray-200 text-black text-center"
          >
            مشاهده
          </Link>
        </div>
      </div>
    </div>
  );
}
