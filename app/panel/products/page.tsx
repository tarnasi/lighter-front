import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import ProductTable from "@/components/panel/tables/ProductTable";

type Props = {};

export default async function page({}: Props) {
  return (
    <>
      <Navbar />
      <PageTitle title="محصولات" returnLink="/panel" />
      <ProductTable />
    </>
  );
}
