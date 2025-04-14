import fetcher from "@/libserver/fetcher";
import { Prisma } from "@prisma/client";
import useSWR, { KeyedMutator } from "swr";

// Type for a single message including sender and seen array
export type IMessageWithSenderAndSeen = Prisma.MessageGetPayload<{
  include: {
    sender: true;
    seen: true;
  };
}>;

interface useMessagesProps {
  activeId?: string;
}

const useMessages = ({ activeId }: useMessagesProps) => {
  const {
    data:{messages:Messages},
    isLoading,
    error,
    mutate
  } = useSWR(
    activeId ? `/api/ownchatmessages/${activeId}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      dedupingInterval: 2000,
      suspense: false,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      fallbackData: [], // ensure this matches type IMessageWithSenderAndSeen[]
    }
  );

  return {Messages, isLoading, error, mutate } as {Messages:IMessageWithSenderAndSeen[],error:any,isLoading:boolean,mutate:KeyedMutator<any>};
};

export default useMessages;
