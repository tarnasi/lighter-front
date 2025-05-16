import ProductForm from "@/components/forms/ProductForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

type Props = {};

export default async function page({}: Props) {
  return (
    <>
      <Navbar />
      <PageTitle title="ایجاد محصول جدید" returnLink="/panel/products" />
      <div className="flex justify-center">
        <ProductForm />
      </div>
    </>
  );
}
