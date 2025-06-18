import AppBottomNavigation from "@/components/dashboard/AppBottomNavigation";
import Navbar from "@/components/Navbar";

import SingleProduct from "@/components/SingleProduct";

export default function SingleProductPage() {
  return (
    <>
      <Navbar isRoot={true} />
      <SingleProduct />
      <AppBottomNavigation />
    </>
  );
}
