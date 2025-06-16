"use client";

import ProductForm from "@/components/forms/ProductForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import { useParams } from "next/navigation";

export default async function page() {
  const params = useParams<{ id: string }>();

  return (
    <>
      <PageTitle title="ویرایش محصول" returnLink="/panel/products" />
      <div className="flex justify-center mb-16">
        <ProductForm productId={params.id} />
      </div>
    </>
  );
}
