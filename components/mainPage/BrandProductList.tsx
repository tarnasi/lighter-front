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
          fromColor="emerald-500"
          toColor="emerald-800"
          hoverFromColor="lime-400"
          hovertoColor="teal-500"
          title="سالت ویگاد"
          category="salt"
          brand="vgod"
        />
        <BrandCard
          fromColor="violet-600"
          toColor="purple-900"
          hoverFromColor="fuchsia-500"
          hovertoColor="pink-400"
          title="سالت نستی"
          category="salt"
          brand="Nasty"
        />
        <BrandCard
          fromColor="rose-500"
          toColor="red-800"
          hoverFromColor="orange-400"
          hovertoColor="amber-500"
          title="جویس ویگاد"
          category="juice"
          brand="nasty-juice"
        />
        <BrandCard
          fromColor="cyan-600"
          toColor="teal-900"
          hoverFromColor="sky-400"
          hovertoColor="indigo-500"
          title="جویس نستی"
          category="juice"
          brand="vigod-juice"
        />
      </div>
    </div>
  );
}
