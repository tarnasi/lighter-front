import { useQuery } from "@apollo/client";
import { PRODUCT_LIST_QUERY } from "@/apollo/queries";

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

/**
 * Custom hook to fetch product list with optional search, sort, and pagination.
 * Centralizes query logic to keep components clean and consistent.
 */
export function useProductList(options: ProductListOptions = {}) {
  const {
    categoryId = null,
    brandId = null,
    search = "",
    sort = { field: "name", order: "ASC" },
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
