import Link from "next/link";

export default function LiquidCategory() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4 text-white">
      {/* Title */}
      <h2 className="font-extrabold underline underline-offset-8 text-black mb-4">
        دسته بندی برند ها و طعم ها
      </h2>

      {/* Cards */}
      <div className="flex flex-row gap-4 justify-center">
        <Link href="/category/juice" className="flex-1">
          <div
              className="h-32 sm:h-48 w-full rounded-2xl bg-gradient-to-br from-red-600 to-red-900
              flex items-center justify-center text-xl font-bold
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
              hover:from-pink-500 hover:to-yellow-500"
          >
            جویس
          </div>
        </Link>

        <Link href="/category/salt" className="flex-1">
          <div
            className="h-32 sm:h-48 w-full rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900
              flex items-center justify-center text-xl font-bold
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
              hover:from-indigo-500 hover:to-cyan-500"
          >
            سالت
          </div>
        </Link>
      </div>
    </div>
  );
}
