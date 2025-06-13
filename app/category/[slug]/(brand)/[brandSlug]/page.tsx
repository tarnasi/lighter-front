"use client";

import AppBottomNavigation from "@/components/dashboard/AppBottomNavigation";
import BrandProducts from "@/components/mainPage/BrandProducts";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import React from "react";

const BrandProductListPage = () => {
  const params = useParams<{ slug: string, brandSlug: string }>();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <BrandProducts brandSlug={params.brandSlug} />
      <AppBottomNavigation />
    </div>
  );
};

export default BrandProductListPage;
