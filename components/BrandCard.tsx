"use client";

import Link from "next/link";

type Props = {
  fromColor: string;
  toColor: string;
  hoverFromColor: string;
  hovertoColor: string;
  title: string;
  category: string;
  brand: string;
};

export default function BrandCard({
  fromColor,
  toColor,
  hoverFromColor,
  hovertoColor,
  title,
  category,
  brand,
}: Props) {
  const classColor = {
    fromColor: `from-${fromColor}`,
    toColor: `to-${toColor}`,
    hoverFromColor: `hover:from-${hoverFromColor}`,
    hovertoColor: `hover:to-${hovertoColor}`,
  };

  return (
    <Link href={`/category/${category}/${brand}`} className="flex-1">
      <div
        className={`h-32 sm:h-48 w-full rounded-2xl bg-gradient-to-br ${classColor.fromColor} ${classColor.toColor}
              flex items-center justify-center text-xl font-bold
              transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl
              ${classColor.hoverFromColor} ${classColor.hovertoColor}`}
      >
        {title}
      </div>
    </Link>
  );
}
