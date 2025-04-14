import useSWR from "swr";
import fetcher from "@/libserver/fetcher";
const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

const useSearchGif = (query: string) => {
  const { data, error, isLoading } = useSWR(
    query ? `/api/giphy/search?query=${query}` : null,
    fetcher
  );

  return {
    gifs: data?.data,
    isLoading,
    isError: error,
  };
};

export default useSearchGif;