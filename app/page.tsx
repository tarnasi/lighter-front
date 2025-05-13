import Navbar from "@/components/Navbar";

import Categories from "@/components/Categories";
import PageTitle from "@/components/PageTitle";

export default async function Home() {
  return (
    <>
      <Navbar />
      <PageTitle title="دسته بندی محصولات" />
      <Categories />
    </>
  );
}
