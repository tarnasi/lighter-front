"use client";

import Link from "next/link";

export default async function CategoryCardLink() {
  return (
    <div className="w-full max-w-5xl mx-auto pt-8 pb-2 text-white text-center">
      {/* Cards */}
      <div className="flex flex-row gap-4 justify-center">
        <Link href="/category" className="flex-1">
          <div
            className="h-48 w-full rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800
              flex flex-col items-center justify-center text-xl font-bold
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
              hover:from-blue-700 hover:to-blue-800"
          >
            <p>تمام چیزهایی که دنبالشی اینجا پیداش میکنی</p>
            <p className="text-xs mt-2">دستگاه یکبار مصرف - پاد - پاد و ماد - فندک حانگی - آنتیک و غیر</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
