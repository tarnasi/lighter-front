"use client";

import CategoryBrands from "@/components/mainPage/CategoryBrands";
import { useParams } from "next/navigation";
import React from "react";

const CategoryPage = () => {
  const params = useParams<{ slug: string }>();

  return <CategoryBrands slug={params.slug} />;
};

export default CategoryPage;
