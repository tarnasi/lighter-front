"use client";

import BrandCard from "../BrandCard";

export default function BrandProductList() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4 text-white">
      {/* Title */}
      <h2 className="font-extrabold underline underline-offset-8 text-black mb-4">
        برندهای معروف
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <BrandCard
          fromColor="from-emerald-500"
          toColor="to-emerald-800"
          hoverFromColor="hover:from-lime-400"
          hovertoColor="hover:to-teal-500"
          title="سالت ویگاد"
          category="salt"
          brand="vgod"
        />
        <BrandCard
          fromColor="from-violet-600"
          toColor="to-purple-900"
          hoverFromColor="hover:from-fuchsia-500"
          hovertoColor="hover:to-pink-400"
          title="سالت نستی"
          category="salt"
          brand="Nasty"
        />
        <BrandCard
          fromColor="from-rose-500"
          toColor="to-red-800"
          hoverFromColor="hover:from-orange-400"
          hovertoColor="hover:to-amber-500"
          title="جویس ویگاد"
          category="juice"
          brand="nasty-juice"
        />
        <BrandCard
          fromColor="from-cyan-600"
          toColor="to-teal-900"
          hoverFromColor="hover:from-sky-400"
          hovertoColor="hover:to-indigo-500"
          title="جویس نستی"
          category="juice"
          brand="vigod-juice"
        />
      </div>
    </div>
  );
}
