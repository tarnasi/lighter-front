import CategoryCard from "../CategoryCard";

export default function LiquidCategory() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4 text-white">
      {/* Title */}
      <h2 className="font-extrabold underline underline-offset-8 text-black mb-4">
        دسته بندی برند ها و طعم ها
      </h2>

      {/* Cards */}
      <div className="flex flex-row gap-4 justify-center">
        <CategoryCard
          fromColor="from-red-600"
          toColor="to-red-900"
          hoverFromColor="hover:from-pink-500"
          hovertoColor="hover:to-yellow-500"
          title="جویس"
          category="juice"
        />
        <CategoryCard
          fromColor="from-blue-600"
          toColor="to-blue-900"
          hoverFromColor="hover:from-indigo-500"
          hovertoColor="hover:to-cyan-500"
          title="سالت"
          category="salt"
        />
      </div>
    </div>
  );
}
