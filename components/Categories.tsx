"use client";

import { CATEGORY_LIST_QUERY } from "@/apollo/queries";
import { useQuery } from "@apollo/client";

import React, { useEffect } from "react";
import EmptyBox from "./EmptyBox";
import LoadingSkeleton from "./LoadingSkeleton";
import Image from "next/image";

import { useCategoryStore } from "@/stores/categoryStore";

const Categories = () => {
  const { data, loading, error, refetch } = useQuery(CATEGORY_LIST_QUERY);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <EmptyBox />;

  const categoryList = data.categoryList || [];
  const allCategory = categoryList.find((cat: any) => cat.slug === "all");
  const otherCategories = categoryList.filter((cat: any) => cat.slug !== "all");
  const categories = allCategory
    ? [allCategory, ...otherCategories]
    : otherCategories;

  return (
    <div className="px-4 md:px-16 lg:px-32 xl:px-64 bg-white text-gray-800">
      <div className="flex overflow-x-auto gap-4 py-4 scrollbar-hide">
        {categories.map((cat: any) => (
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
