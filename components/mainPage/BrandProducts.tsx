"use client";

import { useState } from "react";
import { useProductListByBrand } from "@/hooks/useProductListByBrand";
import Link from "next/link";
import LoadingSkeleton from "../LoadingSkeleton";
import EmptyBox from "../EmptyBox";

type Props = {
  brandSlug: string;
  category: string;
};

export default function BrandProducts({ category, brandSlug }: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { products, total, loading, error, refetch } = useProductListByBrand({
    brandSlug,
    pagination: { page, pageSize },
    sort: { field: "created_at", order: "DESC" },
  });

  // Array of 5 beautiful Tailwind background colors for badges
  const badgeColors = [
    "bg-rose-500",
    "bg-emerald-500",
    "bg-indigo-500",
    "bg-amber-500",
    "bg-violet-500",
  ];

  // Function to get a random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * badgeColors.length);
    return badgeColors[randomIndex];
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / pageSize);

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      refetch();
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <EmptyBox />;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4">
      {/* Title */}
      <h2 className="font-extrabold text-2xl underline underline-offset-8 text-black mb-6 text-center">
        محصولات
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product: any) => (
          <Link href={`/product/${product.slug}`} key={product.id}>
            <div
              className="h-48 w-full rounded-2xl bg-contain bg-no-repeat bg-center shadow-lg
                flex items-end justify-start text-white
                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl
                relative"
              style={{
                backgroundImage: `url(${product.images[0] || "/path/to/fallback-image.jpg"})`,
              }}
            >
              {/* Badge for product title */}
              <span
                className={`absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm font-semibold text-white ${getRandomColor()} bg-opacity-80`}
              >
                {product.title}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            قبلی
          </button>
          <span className="text-black font-medium">
            صفحه {page} از {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}
