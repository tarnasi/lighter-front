import Categories from "@/components/Categories";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default async function Home() {
  return (
    <>
      <Navbar />
      <Categories />
      {/* Slider Card */}
      {/* Main Product like a big card with 4 card bottom of it like two and two */}
      {/* Slider for product */}
      <Products />
    </>
  );
}
