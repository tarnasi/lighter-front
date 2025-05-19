'use client'

import CategoryUpdateForm from "@/components/forms/CategoryUpdateForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";
import { useParams } from "next/navigation";

const CreateCategoryPage = async () => {
  const params = useParams<{ id: string }>();

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <PageTitle
        title="ویرایش دسته بندی"
        returnLink="/panel/categories"
        returnTitle="برگشت به دسته بندی"
      />
      <div className="flex justify-center">
        <CategoryUpdateForm categoryId={params.id} />
      </div>
    </div>
  );
};

export default CreateCategoryPage;
