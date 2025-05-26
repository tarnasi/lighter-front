'use client'

import PageTitle from "@/components/PageTitle";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import { useParams } from 'next/navigation'

export default function ProductPage() {

  const params = useParams<{ brand: string; category: string }>()

  return (
    <div>
      <Navbar />
      <PageTitle
        title={`محصولات برند ${params.brand}`}
        returnLink={`/brands/${params.category}`}
      />
      {/* <Products data={[]} /> */}
    </div>
  );
}
