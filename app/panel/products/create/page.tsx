import ProductForm from "@/components/forms/ProductForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

type Props = {};

export default async function page({}: Props) {
  return (
    <>
      <PageTitle title="ایجاد محصول جدید" returnLink="/panel/products" />
      <div className="flex justify-center mb-16">
        <ProductForm />
      </div>
    </>
  );
}
