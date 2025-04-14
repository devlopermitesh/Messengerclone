"use client"
import ChatBox from "@/components/Common/chatBox";
import ChatContent from "@/components/Common/ChatContent";
import ChatList from "@/components/Common/chatlistbox";
import MessageContent from "@/components/Common/MessageContent";
import ProfileDetails from "@/components/Common/ProfileDetail";
import SearchBar from "@/components/Common/Searchbar";
import useMenuStore from "@/hooks/uihooks/useMenustate";
import useGetContacts from "@/hooks/useGetContacts";
import useThreadStore from "@/hooks/useThreadStore";
import { MessageSquarePlus, Pencil, UserRound } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

const Home = () => {
  const router=useRouter();
  const {data}=useGetContacts()
   const { threadId } = useParams<{ threadId: string }>();
  const {OtheruserProfileMenuOpen}=useMenuStore()
  return (
    <div className="flex flex-row w-full  px-4 gap-10 mt-5 h-full">  
      <div className={twMerge("flex-1  h-[calc(100%-1.25rem)] bg-white shadow-md rounded-lg mx-auto")}>
        <ChatList>
            <div className="font-bold text-2xl flex flex-row justify-between capitalize">
            <h1 className="ml-2">Chats</h1>
            <MessageSquarePlus onClick={()=>router.push("/new")}
              size={26} 
              className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:inline hover:bg-[#bcc0c4] rounded-full" 
            />
            </div>
<SearchBar/>
<ChatContent activeChat={threadId} data={data?.data ?? null}/>
        </ChatList>
      </div>
      <div className={twMerge("flex-2  h-[calc(100%-1.25rem)] bg-white rounded-lg mx-auto hidden lg:flex")}>
        <ChatBox>
      <MessageContent data={data?.data??[]} activeId={threadId} />
        </ChatBox>
      </div>
      {
OtheruserProfileMenuOpen &&
(      <div className={twMerge("flex-1  h-[calc(100%-1.25rem)] bg-white rounded-lg mx-auto hidden lg:flex transition delay-150 duration-300 ease-in-out")}>
<ChatBox>
<ProfileDetails data={data?.data ??[]} />
</ChatBox>
</div>)
      }

    </div>
  );
};

export default Home;
