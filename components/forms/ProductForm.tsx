"use client";

import {
  PRODUCT_CREATE_MUTATION,
  PRODUCT_UPDATE_MUTATION,
} from "@/apollo/mutations";
import { CATEGORY_BY_ID_QUERY, PRODUCT_BY_ID_QUERY } from "@/apollo/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupImageUploader from "./inputs/GroupImageUploader";
import { useCategoryList } from "@/hooks/useCategory";

type Props = {
  productId?: string;
};

function ProductForm({ productId }: Props) {
  const router = useRouter();

  const [product, setProduct] = useState<ProductInput>({
    title: "",
    slug: "",
    description: "",
    price: 0,
    discount: 0,
    quantity: 0,
    is_pack: false,
    images: [],
    categoryId: "",
    brandId: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    slug: "",
    description: "",
    price: 0,
    discount: 0,
    quantity: 0,
    is_pack: false,
    categoryId: "",
    brandId: "",
    category: "",
    images: [],
  });

  const [
    category,
    {
      called: categorySingleCalled,
      data: categorySingleData,
      loading: categorySingleLoading,
      error: categorySingleError,
    },
  ] = useLazyQuery(CATEGORY_BY_ID_QUERY, {
    fetchPolicy: "network-only",
  });

  const [
    getProduct,
    {
      called: productCalled,
      data: productData,
      loading: productLoading,
      error: productError,
    },
  ] = useLazyQuery(PRODUCT_BY_ID_QUERY, {
    variables: { id: productId },
    fetchPolicy: "network-only",
  });

  const {
    categories: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryList({
    pagination: { page: 1, pageSize: 1000 },
  });

  const [
    createProduct,
    { loading: createProductLoading, error: createProductError },
  ] = useMutation(PRODUCT_CREATE_MUTATION);
  const [
    updateProduct,
    { loading: updateProductLoading, error: updateProductError },
  ] = useMutation(PRODUCT_UPDATE_MUTATION);

  useEffect(() => {
    console.log("productId: ", productId);
    if (productId && !productCalled) {
      getProduct();

      if (productData) {
        console.log("PRODUCT OBJECT: ", productData);
      }
    }
  }, [productId, productCalled]);

  useEffect(() => {
    if (productData?.product) {
      const p = productData.product;
      setProduct({
        title: p.title,
        slug: p.slug,
        description: p.description,
        price: p.price,
        discount: p.discount,
        quantity: p.quantity,
        is_pack: p.is_pack,
        categoryId: p.category?.id || "",
        brandId: p.brand?.id || "",
        images: p.images || [],
      });

      // واکشی اطلاعات دسته‌بندی برای فعال‌سازی برند
      if (p.category?.id) {
        category({ variables: { id: p.category.id } });
      }
    }
  }, [productData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) {
      const updateResp = await updateProduct({
        variables: {
          input: {
            ...product,
            id: productId,
          },
        },
      });

      if (updateResp?.data?.updateProduct) {
        router.push("/panel/products");
      }
    } else {
      const createResp = await createProduct({
        variables: {
          input: {
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            is_pack: product.is_pack,
            categoryId: product.categoryId,
            brandId: product.brandId,
            images: product.images,
          },
        },
      });

      if (createResp?.data?.createProduct) {
        router.push("/panel/products");
      }
    }
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
          className={`border p-2 rounded w-full disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            categoryLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          value={product.categoryId}
          onChange={(e) => {
            setProduct({ ...product, categoryId: e.target.value });
            category({ variables: { id: e.target.value } });
          }}
        >
          <option value="">انتخاب کنید...</option>
          {categoryData?.map((cat: any) => (
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
        <label htmlFor="brand" className="mb-2 font-bold">
          برند
        </label>

        <select
          id="brand"
          disabled={!product.categoryId || categorySingleLoading}
          className={`border p-2 rounded w-full disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            categoryLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          value={product.brandId}
          onChange={(e) => {
            setProduct({ ...product, brandId: e.target.value });
          }}
        >
          <option value="">انتخاب کنید...</option>
          {categorySingleData?.category.brands?.map((brand: any) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        {errors.category && (
          <span className="text-red-500 text-sm mt-1">{errors.category}</span>
        )}

        {categoryError && (
          <span className="text-red-500 text-sm mt-1">
            خطا در بارگذاری برند
          </span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="name" className="mb-2 font-bold">
          عنوان فارسی محصول
        </label>
        <input
          disabled={!product.brandId || productLoading}
          className={`border border-gray-500 p-2 rounded disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="name"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="جویس بازوکا صورتی..."
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
          disabled={!product.brandId || productLoading}
          className={`border border-gray-500 p-2 rounded disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="slug"
          value={product.slug}
          onChange={(e) => setProduct({ ...product, slug: e.target.value })}
          placeholder="bazooka-pink"
          autoComplete="on"
        />
        {errors.slug && (
          <span className="text-red-500 text-sm mt-1">{errors.slug}</span>
        )}
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="price" className="mb-2 font-bold">
          قیمت محصول (تومان)
        </label>
        <input
          disabled={!product.brandId || productLoading}
          className={`border border-gray-500 p-2 rounded disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="price"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          placeholder="قیمت: 54000"
          autoComplete="on"
        />
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="discount" className="mb-2 font-bold">
          تخفیف
        </label>
        <input
          disabled={!product.brandId || productLoading}
          className={`border border-gray-500 p-2 rounded disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="discount"
          value={product.discount}
          onChange={(e) =>
            setProduct({ ...product, discount: Number(e.target.value) })
          }
          placeholder="تحفیف: 10%"
          autoComplete="on"
        />
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="quantity" className="mb-2 font-bold">
          تعداد موجودی انبار
        </label>
        <input
          disabled={!product.brandId || productLoading}
          className={`border border-gray-500 p-2 rounded disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            productLoading ? "bg-gray-100 text-gray-400" : ""
          }`}
          type="text"
          id="quantity"
          value={product.quantity}
          onChange={(e) =>
            setProduct({ ...product, quantity: Number(e.target.value) })
          }
          placeholder="18"
          autoComplete="on"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-2">آیا عمده‌فروش هستید؟</label>
        <div className="flex gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              product.is_pack
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setProduct({ ...product, is_pack: true })}
          >
            بله
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              !product.is_pack
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setProduct({ ...product, is_pack: false })}
          >
            خیر
          </button>
        </div>
      </div>

      <div className="flex flex-col my-6">
        <label htmlFor="description" className="mb-2 font-bold">
          توضیحات
        </label>
        <textarea
          disabled={!product.brandId || productLoading}
          className={`border border-gray-500 p-2 rounded disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed h-32 ${
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

      <div className="flex flex-col my-6">
        <label htmlFor="image" className="mb-2">
          آپلود تصویر برند
        </label>
        <GroupImageUploader
          images={product.images || []} // <-- fallback to empty array if undefined
          setImages={(imgs) => setProduct({ ...product, images: imgs })}
        />
      </div>

      <div className="flex flex-col mt-8">
        <button
          type="submit"
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
