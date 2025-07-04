import { useQuery } from "@apollo/client";
import {
  BRAND_LIST_QUERY,
  BRAND_LIST_BY_CATEGORY_QUERY,
} from "@/apollo/queries";

type SortInput = {
  field: string;
  order: "ASC" | "DESC";
};

type PaginationInput = {
  page: number;
  pageSize: number;
};

type BrandListOptions = {
  search?: string;
  sort?: SortInput;
  pagination?: PaginationInput;
};

type BrandByCategoryListOptions = {
  catSlug: string; // Remove optional and empty string default
  pagination?: PaginationInput;
};

/**
 * Custom hook to fetch Brand list with optional search, sort, and pagination.
 * Centralizes query logic to keep components clean and consistent.
 */
export function useBrandList(options: BrandListOptions = {}) {
  const {
    search = "",
    sort = { field: "name", order: "ASC" },
    pagination = { page: 1, pageSize: 10 },
  } = options;

  const { data, loading, error, refetch } = useQuery(BRAND_LIST_QUERY, {
    variables: { search, sort, pagination },
    fetchPolicy: "cache-first",
  });

  return {
    brands: data?.brandList?.items || [],
    total: data?.brandList?.total || 0,
    page: data?.brandList?.page || 1,
    pageSize: data?.brandList?.pageSize || 10,
    loading,
    error,
    refetch,
  };
}

export function useBrandListByCategory(options: BrandByCategoryListOptions) {
  const { catSlug, pagination = { page: 1, pageSize: 10 } } = options;

  // Validate catSlug
  if (!catSlug || catSlug.trim() === "") {
    return {
      brands: [],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      error: new Error("Category slug is required"),
      refetch: () => Promise.resolve(),
    };
  }

  const { data, loading, error, refetch } = useQuery(
    BRAND_LIST_BY_CATEGORY_QUERY,
    {
      variables: { catSlug, pagination },
      fetchPolicy: "cache-first",
      skip: !catSlug, // Skip query if catSlug is empty
    }
  );

  return {
    brands: data?.brandByCategorySlug?.items || [],
    total: data?.brandByCategorySlug?.total || 0,
    page: data?.brandByCategorySlug?.page || 1,
    pageSize: data?.brandByCategorySlug?.pageSize || 10,
    loading,
    error,
    refetch,
  };
}
