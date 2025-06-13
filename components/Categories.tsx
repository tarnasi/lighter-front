"use client";

import React from "react";
import EmptyBox from "./EmptyBox";
import LoadingSkeleton from "./LoadingSkeleton";
import Image from "next/image";
import { useCategoryStore } from "@/stores/categoryStore";
import { useCategoryList } from "@/hooks/useCategory";


const Categories = () => {
  console.log("Calling Category Data...");
  const {
    categories : categoryData,
    loading,
    error,
  } = useCategoryList({
    search: "",
    sort: { field: "name", order: "ASC" },
    pagination: { page: 1, pageSize: 10 },
  });

  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  if (loading) return <LoadingSkeleton />;
  if (error) return <EmptyBox />;

  if (!categoryData.length) return <EmptyBox />;

  const manualAllCategory = {
    id: "all",
    name: "محصولات",
    slug: "all",
    image: `${process.env.NEXT_PUBLIC_API_URL}/uploads/default/boxes.png`,
  };

  const categories = [manualAllCategory, ...categoryData];

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      <div className="flex overflow-x-auto gap-4 py-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setSelectedCategory(cat.slug === "all" ? null : cat.id)
            }
            className="flex-shrink-0 flex flex-col items-center text-sm hover:text-blue-600 hover:cursor-pointer focus:outline-none"
          >
            <div className="w-16 h-16 relative">
              <Image
                src={cat.image}
                fill
                alt={cat.slug}
                className="rounded-full object-cover border border-gray-200"
              />
            </div>
            <span className="mt-2 text-center">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
