"use client";

import PageTitle from "@/components/PageTitle";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ brand: string; category: string }>();

  return (
    <PageTitle
      title={`محصولات برند ${params.brand}`}
      returnLink={`/brands/${params.category}`}
    />
  );
}
