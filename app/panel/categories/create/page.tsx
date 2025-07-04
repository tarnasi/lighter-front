import CategoryUpdateForm from "@/components/forms/CategoryInputsForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

const CreateCategoryPage = async () => {
  return (
    <div className="bg-white min-h-screen">
      <PageTitle
        title="ساخت دسته بندی جدید"
        returnLink="/panel/categories"
        returnTitle="برگشت به دسته بندی"
      />
      <div className="flex justify-center">
        <CategoryUpdateForm />
      </div>
    </div>
  );
};

export default CreateCategoryPage;
