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

export default async function Page({ params }: Props) {
  return (
    <div>
      <Navbar />
      <PageTitle
        title={`محصولات برند ${params.brand}`}
        returnLink={`/brands/${params.category}`}
      />
      <Products data={[]} />
    </div>
  );
}
