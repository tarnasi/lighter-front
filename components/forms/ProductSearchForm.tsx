"use client";

import { useState } from "react";

type Props = {
  categories: { id: string; name: string }[];
  brands: { id: string; name: string }[];
  onFilter: (filters: { categoryId?: string; brandId?: string }) => void;
};

export default function ProductSearchForm({ categories, brands, onFilter }: Props) {
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      categoryId: categoryId || undefined,
      brandId: brandId || undefined,
    });
  };

  const handleClear = () => {
    setCategoryId("");
    setBrandId("");
    onFilter({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row gap-4 sm:items-end"
    >
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          دسته‌بندی
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">همه دسته‌ها</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          برند
        </label>
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">همه برندها</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          جستجو
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm hover:bg-gray-300"
        >
          حذف فیلتر
        </button>
      </div>
    </form>
  );
}
