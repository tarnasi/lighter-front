"use client";

import AppBottomNavigation from "@/components/dashboard/AppBottomNavigation";
import CategoryBrands from "@/components/mainPage/CategoryBrands";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import React from "react";

const CategoryPage = () => {
  const params = useParams<{ slug: string }>();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <CategoryBrands slug={params.slug} />
      <AppBottomNavigation />
    </div>
  );
};

export default CategoryPage;
