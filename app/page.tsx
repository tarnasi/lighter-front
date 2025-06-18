import HomeLighter from "@/components/mainPage/homeLighter";
import LiquidCategory from "@/components/mainPage/LiquidCategory";
import Navbar from "@/components/Navbar";

import { Divider } from "antd";
import AppBottomNavigation from "@/components/dashboard/AppBottomNavigation";
import CategoryCardLink from "@/components/mainPage/CategoryCardLink";
import LastProducts from "@/components/mainPage/LastProducts";
import LastCategoryProducts from "@/components/mainPage/LastCategoryProducts";
import BrandProductList from "@/components/mainPage/BrandProductList";

export default async function Home() {
  return (
    <>
      <Navbar isRoot={true} />
      {/* <Categories /> */}
      {/* Slider Card */}
      {/* Main Product like a big card with 4 card bottom of it like two and two */}
      {/* Slider for product */}
      <div className="px-4 md:px-16 pb-24 lg:px-32 xl:px-64 text-gray-800">
        {/* لینک دسته بندی */}
        <CategoryCardLink />

        {/* Juice and Salt Category */}
        <LiquidCategory />

        <Divider />

        {/* Last 5 product of Juice */}
        <LastCategoryProducts title="آخرین محصولات جویس" category="juice" />
        <Divider />

        <BrandProductList />
        <Divider />

        {/* Last 5 product of Juice */}
        <LastCategoryProducts title="آخرین محصولات سالت" category="salt" />
        <Divider />

        {/* فندک خانگی */}
        <HomeLighter />
        <Divider />

        {/* Last 5 product of Salt */}
        <div className="mb-8">
          <LastProducts title="آخرین محصولات" />
        </div>

        {/* <BestSellerProducts title="پروفروش ترین محصولات" /> */}
      </div>
      <AppBottomNavigation />
    </>
  );
}
