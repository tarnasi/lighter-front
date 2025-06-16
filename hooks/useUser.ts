import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { USER_ME_QUERY, USER_UPDATE_PROFILE } from "@/apollo/queries";

export function useUserMeLazy() {
  const [getMe, { called, data, loading, refetch, error }] = useLazyQuery(
    USER_ME_QUERY,
    {
      fetchPolicy: "cache-first",
    }
  );

  return {
    getMe,
    called,
    userData: data,
    loading,
    error,
    refetch,
  };
}

export function useUserMe() {
  const {
    data: userData,
    loading,
    refetch,
    error,
  } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "cache-first",
  });

  return {
    userData,
    loading,
    error,
    refetch,
  };
}

export function useUserUpdateProfile() {
  const [updateProfile, { loading: updateLoading }] =
    useMutation(USER_UPDATE_PROFILE);

  return {
    updateProfile,
    updateLoading,
  };
}
