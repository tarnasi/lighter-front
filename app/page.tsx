import HomeLighter from "@/components/mainPage/homeLighter";
import LiquidCategory from "@/components/mainPage/LiquidCategory";
import Navbar from "@/components/Navbar";

import { Divider } from 'antd';
import AppBottomNavigation from "@/components/dashboard/AppBottomNavigation";
import FewProducts from "@/components/mainPage/FewProducts";
import CategoryCardLink from "@/components/mainPage/CategoryCardLink";

export default async function Home() {
  return (
    <>
      <Navbar />
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
        <FewProducts title="آخرین محصولات جویس" />

        <Divider />

        {/* Last 5 product of Salt */}
        <FewProducts title="آخرین محصولات سالت" />

        {/* فندک خانگی */}
        <HomeLighter />

        <FewProducts title="پروفروش ترین محصولات" />
      </div>
      <AppBottomNavigation />
    </>
  );
}
