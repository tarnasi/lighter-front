import CategoryUpdateForm from "@/components/forms/CategoryUpdateForm";
import Navbar from "@/components/Navbar";
import PageTitle from "@/components/PageTitle";

type Props = {
  params: {
    id: string
  }
};

const CreateCategoryPage = async ({params}: Props) => {

  const paramsObject = await params

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <PageTitle
        title="ویرایش دسته بندی"
        returnLink="/panel/categories"
        returnTitle="برگشت به دسته بندی"
      />
      <div className="flex justify-center">
        <CategoryUpdateForm categoryId={paramsObject.id} />
      </div>
    </div>
  );
};

export default CreateCategoryPage;
