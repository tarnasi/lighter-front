import React from "react";
import PageTitle from "@/components/PageTitle";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

type Props = {
  params: {
    category: string;
    brand: string;
  };
};

export default async function ProductPage({ params }: Props) {

  const paramsObject = await params

  return (
    <div>
      <Navbar />
      <PageTitle
        title={`محصولات برند ${paramsObject.brand}`}
        returnLink={`/brands/${paramsObject.category}`}
      />
      <Products data={[]} />
    </div>
  );
}
