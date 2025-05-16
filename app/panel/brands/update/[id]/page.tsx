import BrandForm from "@/components/forms/BrandForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

type Props = {
  params: {
    id: string;
  };
};

async function BarndPage({ params }: Props) {
  const paramsObject = await params;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <PageTitle title="ویرایش برند" returnLink="/panel/brands" returnTitle="برگشت" />
      <div className="flex justify-center">
        <BrandForm brandId={paramsObject.id} />
      </div>
    </div>
  );
}

export default BarndPage;
