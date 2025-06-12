import { useQuery } from "@apollo/client";
import { PRODUCT_LIST_BY_BRAND_QUERY } from "@/apollo/queries";

type PaginationInput = {
  page: number;
  pageSize: number;
};

type SortInput = {
  field: string;
  order: "ASC" | "DESC";
};

type ProductListOptions = {
  brandSlug: string;
  pagination?: PaginationInput;
  sort?: SortInput;
};

/**
 * Custom hook to fetch product list by brand slug with pagination and sorting.
 */
export function useProductListByBrand(options: ProductListOptions) {
  const { brandSlug, pagination = { page: 1, pageSize: 10 }, sort = { field: "created_at", order: "DESC" } } = options;

  if (!brandSlug || brandSlug.trim() === "") {
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

  const { data, loading, error, refetch } = useQuery(PRODUCT_LIST_BY_BRAND_QUERY, {
    variables: { brandSlug, pagination, sort },
    fetchPolicy: "cache-first",
    skip: !brandSlug,
    // Handle server errors gracefully
    onError: (err) => {
      console.error("GraphQL Error:", err.message);
    },
  });

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
    error: error || (products.length === 0 && !loading ? new Error("No products found for this brand") : null),
    refetch,
  };
}
