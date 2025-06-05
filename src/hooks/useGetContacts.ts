import fetcher from "@/libserver/fetcher";
import  useSWR from "swr"

const useGetContacts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/owncontacts", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
    refreshWhenHidden: false,
    shouldRetryOnError: false,
    dedupingInterval: 10000,
    focusThrottleInterval: 5000,
    errorRetryCount: 1,
    errorRetryInterval: 5000,
  });

  return { data, isLoading, error, mutate };
};

export default useGetContacts;
