import { useQuery } from "@apollo/client";
import { CATEGORY_LIST_QUERY } from "@/apollo/queries";

type SortInput = {
  field: string;
  order: "ASC" | "DESC";
};

type PaginationInput = {
  page: number;
  pageSize: number;
};

type CategoryListOptions = {
  search?: string;
  sort?: SortInput;
  pagination?: PaginationInput;
};

/**
 * Custom hook to fetch category list with optional search, sort, and pagination.
 * Centralizes query logic to keep components clean and consistent.
 */
export function useCategoryList(options: CategoryListOptions = {}) {
  const {
    search = "",
    sort = { field: "name", order: "ASC" },
    pagination = { page: 1, pageSize: 10 },
  } = options;

  const { data, loading, error, refetch } = useQuery(CATEGORY_LIST_QUERY, {
    variables: { search, sort, pagination },
    fetchPolicy: "cache-first",
  });

  return {
    categories: data?.categoryList?.items || [],
    total: data?.categoryList?.total || 0,
    page: data?.categoryList?.page || 1,
    pageSize: data?.categoryList?.pageSize || 10,
    loading,
    error,
    refetch,
  };
}
