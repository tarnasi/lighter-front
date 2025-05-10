import Navbar from "@/components/Navbar";
import Brands from '@/components/Brands'
import PageTitle from "@/components/PageTitle";

type Props = {
  params: {
    category: string;
  };
};

const BrandPage = ({ params }: Props) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <PageTitle title={`برندهای ${params.category}`} returnLink="/" />
      <Brands category={params.category} />
    </div>
  );
};

export default BrandPage;
