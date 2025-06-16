"use client";

import BrandForm from "@/components/forms/BrandForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import { useParams } from "next/navigation";

function BarndPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="bg-white min-h-screen">
      <PageTitle
        title="ویرایش برند"
        returnLink="/panel/brands"
        returnTitle="برگشت"
      />
      <div className="flex justify-center">
        <BrandForm brandId={params.id} />
      </div>
    </div>
  );
}

export default BarndPage;
