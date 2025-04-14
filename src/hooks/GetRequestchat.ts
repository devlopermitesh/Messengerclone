import useSWR from "swr";
import fetcher from "@/libserver/fetcher";

const useGetRequest =()=>{
    const {data,isLoading,error,mutate}=useSWR("/api/request",fetcher,{
    revalidateOnFocus:false,
    refreshInterval:0,
    refreshWhenHidden:false,
    shouldRetryOnError:false,
    dedupingInterval:10000,
    focusThrottleInterval:5000,
    errorRetryCount:1,
    errorRetryInterval:5000,


})
return {data,isLoading,error,mutate}
}
export default useGetRequest;