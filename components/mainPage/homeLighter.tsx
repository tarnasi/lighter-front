import Link from "next/link";

export default function HomeLighter() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 text-white text-center">
      {/* Cards */}
      <div className="flex flex-row gap-4 justify-center">
        <Link href="/juice" className="flex-1">
          <div
className="h-48 w-full rounded-2xl bg-gradient-to-br from-green-600 to-green-900
              flex items-center justify-center text-xl font-bold
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
              hover:from-teal-700 hover:to-green-800"
          >
            فروش عمده فندک خانگی
          </div>
        </Link>
      </div>
    </div>
  );
}
