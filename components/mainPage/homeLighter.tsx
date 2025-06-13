import CategoryCard from "../CategoryCard";

export default function HomeLighter() {
  return (
    <div className="w-full max-w-5xl mx-auto py-2 text-white text-center">
      {/* Cards */}
      <div className="flex flex-row gap-4 justify-center">
        <CategoryCard
          fromColor="green-600"
          toColor="green-900"
          hoverFromColor="teal-500"
          hovertoColor="green-500"
          title="دستگاه پاد و ویپ"
          category="vape-pod"
        />
      </div>
    </div>
  );
}
