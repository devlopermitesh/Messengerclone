import fetcher from "@/libserver/fetcher"
import useSWR from "swr";
const useCurrentUser=()=>{

    const { data, error, isLoading, mutate } = useSWR("/api/me", fetcher,{
        revalidateOnFocus: false, // Avoid extra requests
        revalidateOnReconnect: false,
        onError: (err) => console.error("SWR Fetch Error:", err.message, err),
        onSuccess: (data) => console.log("SWR Fetch Success:", data),
      });
    return { data, error ,isLoading,mutate}
}

export default useCurrentUser;