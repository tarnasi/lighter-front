import Categories from "@/components/Categories";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default async function Home() {
  return (
    <>
      <Navbar />
      <Categories />
      <Products />
    </>
  );
}
