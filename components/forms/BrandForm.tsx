"use client";

import { BRAND_BY_ID_QUERY, CATEGORY_LIST_QUERY } from "@/apollo/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
  brandId?: string;
};

function BrandForm({ brandId }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDesciption] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    category: "",
  });

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(CATEGORY_LIST_QUERY);
  const [getCategory, { called, data, loading, error }] = useLazyQuery(
    BRAND_BY_ID_QUERY,
    {
      variables: { id: brandId },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (brandId && !called) {
      getCategory();
    }
  }, [brandId, called]);

  useEffect(() => {
    if (data) {
      setName(data.brand.name);
      setSlug(data.brand.slug);
      setDesciption(data.brand.description);
      setImage(data.brand.image);
      setCategory(data.brand.category.id);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`h-full w-full md:w-1/2 lg:w-1/3 mt-8 p-4 rounded shadow-xl transition-opacity ${
        loading ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <Link
        href="/"
        className="flex justify-center items-center gap-2 border-b border-gray-200 pb-2"
      >
        <Image src="/logo/logo-3.png" alt="tinyfire" width={72} height={72} />
      </Link>

      <div className="flex flex-col my-6">
        <label htmlFor="category" className="mb-2">
          دسته‌بندی
        </label>

        <select
          id="category"
          disabled={categoryLoading}
          className={`border border-gray-500 p-2 rounded ${
            categoryLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">انتخاب کنید...</option>
          {categoryData?.categoryList?.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {errors.category && (
          <span className="text-red-500 text-sm mt-1">{errors.category}</span>
        )}

        {categoryError && (
          <span className="text-red-500 text-sm mt-1">
            خطا در بارگذاری دسته‌بندی‌ها
          </span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="name" className="mb-2">
          نام برند به فارسی
        </label>
        <input
          disabled={loading}
          className={`border border-gray-500 p-2 rounded ${
            loading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="برند..."
          autoComplete="on"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="slug" className="mb-2">
          نام برند به انگلیسی (SEO)
        </label>
        <input
          disabled={loading}
          className={`border border-gray-500 p-2 rounded ${
            loading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="برند..."
          autoComplete="on"
        />
        {errors.slug && (
          <span className="text-red-500 text-sm mt-1">{errors.slug}</span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="description" className="mb-2">
          توضیحات
        </label>
        <textarea
          disabled={loading}
          className={`border border-gray-500 p-2 rounded h-32 ${
            loading ? "bg-gray-100 text-gray-400" : ""
          }`}
          id="description"
          value={description}
          onChange={(e) => setDesciption(e.target.value)}
          placeholder="توضیحات..."
          autoComplete="on"
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1">
            {errors.description}
          </span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="image" className="mb-2">
          آدرس یا لینک عکس‌ (به زودی نسخه جدید میاد)
        </label>
        <input
          disabled={loading}
          className={`border border-gray-500 p-2 rounded ${
            loading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="لینک..."
          autoComplete="on"
          dir="ltr"
        />
        {image && /^https?:\/\/.+/.test(image) && (
          <div className="mt-4">
            <img
              src={image}
              alt="Preview"
              className="max-w-full h-32 object-contain border rounded"
            />
          </div>
        )}
        {errors.image && (
          <span className="text-red-500 text-sm mt-1">{errors.image}</span>
        )}
      </div>

      <div className="flex flex-col mt-8">
        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-8 text-white flex justify-center items-center gap-2 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>در حال ساخت...</span>
            </>
          ) : (
            "ساخت"
          )}
        </button>
        {error && (
          <div className="text-red-600 text-sm mt-4 border-t pt-2 border-gray-300">
            خطا: {error.message}
          </div>
        )}
      </div>
    </form>
  );
}

export default BrandForm;
