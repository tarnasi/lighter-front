import { useQuery } from "@apollo/client";
import {
  PRODUCT_LIST_QUERY,
  PRODUCT_LIST_BY_BRAND_QUERY,
  PRODUCT_LIST_BY_CATEGORY_QUERY,
} from "@/apollo/queries";

type SortInput = {
  field: string;
  order: "ASC" | "DESC";
};

type PaginationInput = {
  page: number;
  pageSize: number;
};

type ProductListOptions = {
  categoryId?: string | null;
  brandId?: string | null;
  search?: string;
  sort?: SortInput;
  pagination?: PaginationInput;
};

type ProductListBySlugOptions = {
  slug: string;
  pagination?: PaginationInput;
  sort?: SortInput;
};

/**
 * Custom hook to fetch product list with optional search, sort, and pagination.
 * Centralizes query logic to keep components clean and consistent.
 */
export function useProductList(options: ProductListOptions = {}) {
  const {
    categoryId = null,
    brandId = null,
    search = "",
    sort = { field: "created_at", order: "DESC" },
    pagination = { page: 1, pageSize: 10 },
  } = options;

  const { data, loading, error, refetch } = useQuery(PRODUCT_LIST_QUERY, {
    variables: { categoryId, brandId, search, sort, pagination },
    fetchPolicy: "cache-first",
  });

  return {
    products: data?.productList?.items || [],
    total: data?.productList?.total || 0,
    page: data?.productList?.page || 1,
    pageSize: data?.productList?.pageSize || 10,
    loading,
    error,
    refetch,
  };
}

/**
 * Custom hook to fetch product list by brand slug with pagination and sorting.
 */
export function useProductListByBrand(options: ProductListBySlugOptions) {
  const {
    slug,
    pagination = { page: 1, pageSize: 10 },
    sort = { field: "created_at", order: "DESC" },
  } = options;

  if (!slug || slug.trim() === "") {
    return {
      products: [],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      error: new Error("Brand slug is required"),
      refetch: () => Promise.resolve(),
    };
  }

  const { data, loading, error, refetch } = useQuery(
    PRODUCT_LIST_BY_BRAND_QUERY,
    {
      variables: { brandSlug: slug, pagination, sort },
      fetchPolicy: "cache-first",
      skip: !slug,
      // Handle server errors gracefully
      onError: (err) => {
        console.error("GraphQL Error:", err.message);
      },
    }
  );

  // Handle null or undefined items
  const products = data?.productByBrandSlug?.items || [];
  const total = data?.productByBrandSlug?.total || 0;
  const page = data?.productByBrandSlug?.page || pagination.page;
  const pageSize = data?.productByBrandSlug?.pageSize || pagination.pageSize;

  return {
    products,
    total,
    page,
    pageSize,
    loading,
    error:
      error ||
      (products.length === 0 && !loading
        ? new Error("No products found for this brand")
        : null),
    refetch,
  };
}

export function useProductListByCategory(options: ProductListBySlugOptions) {
  const {
    slug,
    pagination = { page: 1, pageSize: 10 },
    sort = { field: "created_at", order: "DESC" },
  } = options;

  if (!slug || slug.trim() === "") {
    return {
      products: [],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      error: new Error("category slug is required"),
      refetch: () => Promise.resolve(),
    };
  }

  const { data, loading, error, refetch } = useQuery(
    PRODUCT_LIST_BY_CATEGORY_QUERY,
    {
      variables: { catSlug: slug, pagination, sort },
      fetchPolicy: "cache-first",
      skip: !slug,
      // Handle server errors gracefully
      onError: (err) => {
        console.error("GraphQL Error:", err.message);
      },
    }
  );

  // Handle null or undefined items
  const products = data?.productByCategorySlug?.items || [];
  const total = data?.productByCategorySlug?.total || 0;
  const page = data?.productByCategorySlug?.page || pagination.page;
  const pageSize = data?.productByCategorySlug?.pageSize || pagination.pageSize;

  return {
    products,
    total,
    page,
    pageSize,
    loading,
    error:
      error ||
      (products.length === 0 && !loading
        ? new Error("No products found for this category")
        : null),
    refetch,
  };
}
