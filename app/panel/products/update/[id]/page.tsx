import ProductForm from "@/components/forms/ProductForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

type Props = {
  params: {
    productId: string;
  };
};

export default async function page({ params }: Props) {
  return (
    <>
      <Navbar />
      <PageTitle title="ویرایش محصول" returnLink="/panel/products" />
      <div className="flex justify-center">
        <ProductForm productId={params.productId} />
      </div>
    </>
  );
}
