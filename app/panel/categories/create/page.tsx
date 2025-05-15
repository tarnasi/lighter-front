import CategoryForm from "@/components/forms/CategoryForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

type Props = {};

const CreateCategoryPage = async (props: Props) => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <PageTitle
        title="ساخت دسته بندی جدید"
        returnLink="/panel/categories"
        returnTitle="برگشت به دسته بندی"
      />
      <div className="flex justify-center">
        <CategoryForm />
      </div>
    </div>
  );
};

export default CreateCategoryPage;
