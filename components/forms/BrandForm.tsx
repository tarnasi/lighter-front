"use client";

import {
  BRAND_CREATE_MUTATION,
  BRAND_UPDATE_MUTATION,
} from "@/apollo/mutations";
import { BRAND_BY_ID_QUERY, CATEGORY_LIST_QUERY } from "@/apollo/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ImageUploader from "./inputs/ImageUploader";

type Props = {
  brandId?: string;
};

function BrandForm({ brandId }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    category: "",
  });

  const router = useRouter();

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(CATEGORY_LIST_QUERY);

  const [getBrand, { called, data, loading, error }] = useLazyQuery(
    BRAND_BY_ID_QUERY,
    {
      variables: { id: brandId },
      fetchPolicy: "network-only",
    }
  );

  const [
    createBrand,
    { loading: createBrandLoading, error: createBrandError },
  ] = useMutation(BRAND_CREATE_MUTATION, {
    fetchPolicy: "network-only",
  });
  const [
    updateBrand,
    { loading: updateBrandLoading, error: updateBrandError },
  ] = useMutation(BRAND_UPDATE_MUTATION, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (brandId && !called) {
      getBrand();
    }
  }, [brandId, called]);

  useEffect(() => {
    if (data) {
      setName(data.brand.name);
      setSlug(data.brand.slug);
      setDescription(data.brand.description);
      setImage(data.brand.image);
      setCategory(String(data.brand.category.id));
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!brandId) {
        // DO CREATE
        const createResp = await createBrand({
          variables: {
            input: {
              name,
              slug,
              description,
              image,
              categoryId: category,
            },
          },
        });

        if (createResp?.data?.createBrand) {
          router.push("/panel/brands");
        }
      } else {
        // DO CREATE
        const updateResp = await updateBrand({
          variables: {
            input: {
              id: brandId.toString(),
              name,
              slug,
              description,
              image,
              categoryId: category,
            },
          },
        });

        if (updateResp?.data?.updateBrand) {
          router.push("/panel/brands");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`h-full w-full md:w-2/3 lg:w-2/4 xl:w-2/6 mt-8 p-4 rounded shadow-xl transition-opacity ${
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
          onChange={(e) => setCategory(String(e.target.value))}
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
          onChange={(e) => setDescription(e.target.value)}
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
          آپلود تصویر برند
        </label>
        <ImageUploader setImage={setImage} initialImage={image} />
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
          ) : brandId ? (
            "ویرایش"
          ) : (
            "ایجاد"
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
