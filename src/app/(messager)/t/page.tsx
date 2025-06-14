"use client"
import ChatBox from "@/components/Common/chatBox";
import ChatContent from "@/components/Common/ChatContent";
import ChatList from "@/components/Common/chatlistbox";
import MessageContent from "@/components/Common/MessageContent";
import SearchBar from "@/components/Common/Searchbar";
import useMenuStore from "@/hooks/uihooks/useMenustate";
import useGetContacts from "@/hooks/useGetContacts";
import { Columns2, MessageSquarePlus, PanelLeftClose } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();
  const { dashboardMenuOpen: isDashboardopen, toggleDashboardMenu } = useMenuStore();
  const { data, isLoading, error, mutate } = useGetContacts();

  const retryHandler = () => {
    mutate(); // Retry fetching the data
  };

  return (
    <div className="flex flex-row w-full md:px-4 md:gap-10 md:mt-5 h-full flex-wrap">
      <div className={twMerge("flex-1 w-full h-[calc(100%-1.25rem)] bg-white shadow-md rounded-lg mx-auto")}>
        <ChatList>
          <div className="font-bold text-2xl flex flex-row justify-between capitalize">
            <span className="flex items-center px-2 ">
              {isDashboardopen ? (
              <PanelLeftClose
                size={23}
                onClick={toggleDashboardMenu}
                className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:hidden hover:bg-[#bcc0c4] rounded-full"
              />
              ) : (
              <Columns2
                size={23}
                onClick={toggleDashboardMenu}
                className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:hidden hover:bg-[#bcc0c4] rounded-full"
              />
              )}
              <h1 className="ml-2">Chats</h1>
            </span>
            <MessageSquarePlus
              onClick={() => router.push("/new")}
              size={26}
              className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:inline hover:bg-[#bcc0c4] rounded-full"
            />
          </div>
          
          {/* Search Bar */}
          <SearchBar isloading={isLoading} />
          
          {/* Conditional Content Rendering */}
          {error ? (
            <div className="p-4 text-center bg-red-50 rounded-lg shadow-md">
              <p className="text-red-600 text-xl">Oops! Something went wrong.</p>
              <Button onClick={retryHandler} className="mt-4 bg-red-600 text-white hover:bg-red-700">
                Retry
              </Button>
            </div>
          ) : (
            <ChatContent data={data?.data ?? []} isLoading={isLoading} />
          )}
        </ChatList>
      </div>

      <div className={twMerge("flex-2 h-[calc(100%-1.25rem)] bg-white rounded-lg mx-auto hidden lg:flex")}>
        <ChatBox>
          <MessageContent data={data?.data ?? []} />
        </ChatBox>
      </div>
    </div>
  );
};

export default Home;
