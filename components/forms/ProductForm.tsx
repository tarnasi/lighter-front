"use client";

import {
  BRAND_LIST_QUERY,
  CATEGORY_LIST_QUERY,
  PRODUCT_BY_ID_QUERY,
} from "@/apollo/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  productId?: string;
};

function ProductForm({ productId }: Props) {
  const [product, setProduct] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    is_pack: "",
    categoryId: "",
    brandId: "",
  });

  const [productObject, setProductObject] = useState(null);

  const [errors, setErrors] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    is_pack: "",
    categoryId: "",
    brandId: "",
    category: "",
  });

  const [
    getProduct,
    {
      called: productCalled,
      data: productData,
      loading: productLoading,
      error: productError,
    },
  ] = useLazyQuery(PRODUCT_BY_ID_QUERY);
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(CATEGORY_LIST_QUERY);
  const {
    data: brandData,
    loading: brandLoading,
    error: brandError,
  } = useQuery(BRAND_LIST_QUERY);

  useEffect(() => {
    if (!productId && !productCalled) {
      getProduct();
    }
  }, [productId, productCalled]);

  useEffect(() => {
    if (productData) {
    }
  }, [productData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`h-full w-full md:w-2/3 lg:w-2/4 xl:w-2/6 mt-8 p-4 rounded shadow-xl transition-opacity ${
        productLoading ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <Link
        href="/"
        className="flex justify-center items-center gap-2 border-b border-gray-200 pb-2"
      >
        <Image src="/logo/logo-3.png" alt="tinyfire" width={72} height={72} />
      </Link>

      <div className="flex flex-col my-6">
        <label htmlFor="category" className="mb-2 font-bold">
          دسته‌بندی
        </label>

        <select
          id="category"
          disabled={categoryLoading}
          className={`border border-gray-500 p-2 rounded ${
            categoryLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          value={product.categoryId}
          onChange={(e) =>
            setProduct({ ...product, categoryId: e.target.value })
          }
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
        <label htmlFor="category" className="mb-2 font-bold">
          برند
        </label>

        <select
          id="brand"
          disabled={brandLoading}
          className={`border border-gray-500 p-2 rounded ${
            categoryLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          value={product.brandId}
          onChange={(e) =>
            setProduct({ ...product, brandId: e.target.value })
          }
        >
          <option value="">انتخاب کنید...</option>
          {brandData?.brandList?.map((cat: any) => (
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
        <label htmlFor="name" className="mb-2 font-bold">
          عنوان فارسی محصول
        </label>
        <input
          disabled={productLoading}
          className={`border border-gray-500 p-2 rounded ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="name"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="برند..."
          autoComplete="on"
        />
        {errors.title && (
          <span className="text-red-500 text-sm mt-1">{errors.title}</span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="slug" className="mb-2 font-bold">
          عنوان انگلیسی (SEO)
        </label>
        <input
          disabled={productLoading}
          className={`border border-gray-500 p-2 rounded ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="slug"
          value={product.slug}
          onChange={(e) => setProduct({ ...product, slug: e.target.value })}
          placeholder="برند..."
          autoComplete="on"
        />
        {errors.slug && (
          <span className="text-red-500 text-sm mt-1">{errors.slug}</span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="description" className="mb-2 font-bold">
          توضیحات
        </label>
        <textarea
          disabled={productLoading}
          className={`border border-gray-500 p-2 rounded h-32 ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          id="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="توضیحات..."
          autoComplete="on"
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1">
            {errors.description}
          </span>
        )}
      </div>

      {/* <div className="flex flex-col my-6">
        <label htmlFor="image" className="mb-2 font-bold">
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
      </div> */}

      <div className="flex flex-col mt-8">
        <button
          type="submit"
          disabled={productLoading}
          className={`py-2 px-8 text-white flex justify-center items-center gap-2 ${
            productLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {productLoading ? (
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
          ) : productId ? (
            "ویرایش"
          ) : (
            "ایجاد"
          )}
        </button>
        {/* {error && (
          <div className="text-red-600 text-sm mt-4 border-t pt-2 border-gray-300">
            خطا: {error.message}
          </div>
        )} */}
      </div>
    </form>
  );
}

export default ProductForm;
