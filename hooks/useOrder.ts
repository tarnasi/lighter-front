import { useQuery, useMutation } from "@apollo/client";
import {
  MY_ORDERS_QUERY,
  GET_ORDER_QUERY,
  CREATE_ORDER_MUTATION,
  UPDATE_ORDER_STATUS_MUTATION,
  CANCEL_ORDER_MUTATION,
} from "@/apollo/queries";

export function useMyOrders() {
  const { data, loading, error, refetch } = useQuery(MY_ORDERS_QUERY, {
    fetchPolicy: "cache-first",
  });

  return {
    orders: data?.myOrders || [],
    loading,
    error,
    refetch,
  };
}

export function useGetOrder(id: string) {
  const { data, loading, error, refetch } = useQuery(GET_ORDER_QUERY, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-first",
  });

  return {
    order: data?.getOrder || null,
    loading,
    error,
    refetch,
  };
}

export function useCreateOrder() {
  const [createOrder, { data, loading, error }] = useMutation(
    CREATE_ORDER_MUTATION
  );

  return {
    createOrder,
    createdOrder: data?.createOrder || null,
    loading,
    error,
  };
}

export function useUpdateOrderStatus() {
  const [updateOrderStatus, { data, loading, error }] = useMutation(
    UPDATE_ORDER_STATUS_MUTATION
  );

  return {
    updateOrderStatus,
    updatedOrder: data?.updateOrderStatus || null,
    loading,
    error,
  };
}

export function useCancelOrder() {
  const [cancelOrder, { data, loading, error }] = useMutation(
    CANCEL_ORDER_MUTATION
  );

  return {
    cancelOrder,
    cancelledOrder: data?.cancelOrder || null,
    loading,
    error,
  };
}
