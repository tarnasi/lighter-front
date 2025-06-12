import { useQuery } from "@apollo/client";
import { BRAND_LIST_BY_CATEGORY_QUERY } from "@/apollo/queries";

type PaginationInput = {
  page: number;
  pageSize: number;
};

type BrandListOptions = {
  catSlug: string; // Remove optional and empty string default
  pagination?: PaginationInput;
};

/**
 * Custom hook to fetch Brand list with required category slug and optional pagination.
 * Centralizes query logic to keep components clean and consistent.
 */
export function useBrandListByCategory(options: BrandListOptions) {
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

  const { data, loading, error, refetch } = useQuery(BRAND_LIST_BY_CATEGORY_QUERY, {
    variables: { catSlug, pagination },
    fetchPolicy: "cache-first",
    skip: !catSlug, // Skip query if catSlug is empty
  });

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
