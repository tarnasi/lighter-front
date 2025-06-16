import BrandForm from "@/components/forms/BrandForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import React from "react";

type Props = {};

async function BarndPage({}: Props) {
  return (
    <div className="bg-white min-h-screen">
      <PageTitle
        title="ساخت برند جدید"
        returnLink="/panel/brands"
        returnTitle="برگشت"
      />
      <div className="flex justify-center">
        <BrandForm />
      </div>
    </div>
  );
}

export default BarndPage;
