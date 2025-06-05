import fetcher from "@/libserver/fetcher";
import { Chat } from "@prisma/client";
import useSWR from "swr";

const useGetBlocklist=()=>{
    const {data,isLoading,error,mutate}=useSWR('/api/blockchatlist',fetcher,{
        revalidateOnFocus:false,
        refreshInterval:0,
        refreshWhenHidden:false,
        shouldRetryOnError:false,
        dedupingInterval:10000,
        focusThrottleInterval:5000,
        errorRetryCount:1,
        errorRetryInterval:5000,
    })
    return {data,isLoading,mutate,error} as {data:{data:any[]},isLoading:boolean,error:any,mutate:any}
}

export default useGetBlocklist