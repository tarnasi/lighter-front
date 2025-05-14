"use client";

import { CATEGORY_CREATE_MUTATION } from "@/apollo/mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const CategoryForm = (props: Props) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDesciption] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
  }>({});

  const router = useRouter();

  // const setUser = useCategoryStore((state) => state.setUser);

  const [createCategory, { loading, error }] = useMutation(
    CATEGORY_CREATE_MUTATION,
    {
      fetchPolicy: "network-only",
    }
  );

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name) newErrors.name = "نام دسته‌بندی الزامی است.";
    if (!slug) newErrors.slug = "اسلاگ الزامی است.";
    else if (!/^[a-z0-9-]+$/.test(slug))
      newErrors.slug = "اسلاگ فقط باید شامل حروف کوچک، عدد و خط تیره باشد.";

    // else if (!/^https?:\/\/.+/.test(image))
    //   newErrors.image = "فرمت لینک عکس معتبر نیست.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await createCategory({
        variables: {
          input: {
            name,
            slug,
            description,
            image,
          },
        },
      });

      if (res?.data?.createCategory) {
        setName("");
        setSlug("");
        setDesciption("");
        setImage("");
          router.push("/panel/categories");
      }
    } catch (err: any) {
      console.error("creatory error:", err);
    }
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
        <label htmlFor="name" className="mb-2">
          نام دسته بندی به فارسی
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
          placeholder="دسته بندی..."
          autoComplete="on"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="slug" className="mb-2">
          نام دسته بندی به انگلیسی (SEO)
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
          placeholder="دسته بندی..."
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
};

export default CategoryForm;
