"use client";

import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";
import EmptyBox from "../EmptyBox";
import { useCategoryList } from "@/hooks/useCategoryList";

type props = {};

export default function CategoryList(props: props) {
  const { categories, loading, error } = useCategoryList({
    pagination: { page: 1, pageSize: 1000 },
  });

  // Array of 5 beautiful Tailwind background colors
  const badgeColors = [
    "bg-rose-500",
    "bg-emerald-500",
    "bg-indigo-500",
    "bg-amber-500",
    "bg-violet-500",
  ];

  // Function to get a random color from badgeColors
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * badgeColors.length);
    return badgeColors[randomIndex];
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <EmptyBox />;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 text-white">
      {/* Title */}
      <h2 className="font-extrabold underline underline-offset-8 text-black mb-4 text-center">
        دسته بندی ها
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {categories.map((cat: any) => {
          return (
            <Link href={`/category/${cat.slug}`} className="flex-1" key={cat.id}>
              <div
                className="h-32 sm:h-48 w-full rounded-2xl bg-center shadow-lg
                  flex items-end justify-start text-xl font-bold text-white
                  transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
                  relative bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    cat.image || "/path/to/fallback-image.jpg"
                  })`,
                }}
              >
                {/* Badge for cat name */}
                <span
                  className={`absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm font-semibold text-white ${getRandomColor()}`}
                >
                  {cat.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
