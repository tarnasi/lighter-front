import Categories from "@/components/Categories";
import Navbar from "@/components/Navbar";

import PageTitle from "@/components/PageTitle";
import Products from "@/components/Products";

export default async function Home() {
  return (
    <>
      <Navbar />
      <Categories />
      {/* <PageTitle title="محصولات" /> */}
      <Products />
    </>
  );
}
