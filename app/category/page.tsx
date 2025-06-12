import AppBottomNavigation from "@/components/dashboard/AppBottomNavigation";
import CategoryList from "@/components/mainPage/CategoryList";
import Navbar from "@/components/Navbar";
import React from "react";

const CategoryPage = async () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <CategoryList />
      <AppBottomNavigation />
    </div>
  );
};

export default CategoryPage;
