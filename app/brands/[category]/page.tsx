import Navbar from "@/components/Navbar";
import Brands from "@/components/Brands";
import PageTitle from "@/components/PageTitle";

type Props = {
  params: {
    category: string;
  };
};

const BrandPage = async ({ params }: Props) => {
  const paramsObject = await params;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <PageTitle title={`برندهای ${paramsObject.category}`} returnLink="/" />
      <Brands category={paramsObject.category} />
    </div>
  );
};

export default BrandPage;
