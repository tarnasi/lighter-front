"use client";

import Navbar from "@/components/Navbar";
import Brands from "@/components/Brands";
import PageTitle from "@/components/PageTitle";
import { useParams } from "next/navigation";

const BrandPage = async () => {
  const params = useParams<{ category: string }>();

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar isRoot={true} />
      <PageTitle title={`برندهای ${params.category}`} returnLink="/" />
      <Brands category={params.category} />
    </div>
  );
};

export default BrandPage;
