"use client";

import Link from "next/link";

type Props = {
  fromColor: string;
  toColor: string;
  hoverFromColor: string;
  hovertoColor: string;
  title: string;
  category: string;
};

export default function CategoryCard({
  fromColor,
  toColor,
  hoverFromColor,
  hovertoColor,
  title,
  category,
}: Props) {
  return (
    <Link href={`/category/${category}`} className="flex-1">
      <div
        className={`h-32 sm:h-48 w-full rounded-2xl bg-gradient-to-br ${fromColor} ${toColor}
              flex items-center justify-center text-xl font-bold
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
              ${hoverFromColor} ${hovertoColor}`}
      >
        {title}
      </div>
    </Link>
  );
}
