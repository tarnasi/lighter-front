"use client";

import PageTitle from "@/components/PageTitle";
import { useParams } from "next/navigation";

const BrandPage = async () => {
  const params = useParams<{ category: string }>();

  return <PageTitle title={`برندهای ${params.category}`} returnLink="/" />;
};

export default BrandPage;
