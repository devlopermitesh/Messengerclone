"use client"
import ChatBox from "@/components/Common/chatBox";
import ChatContent from "@/components/Common/ChatContent";
import ChatList from "@/components/Common/chatlistbox";
import MessageContent from "@/components/Common/MessageContent";
import SearchBar from "@/components/Common/Searchbar";
import useGetContacts from "@/hooks/useGetContacts";
import { MessageSquarePlus, Pencil, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const Home = () => {
  const router=useRouter();
  const {data}=useGetContacts()
  console.log("Data",data?.data)
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
<ChatContent data={data?.data?? []}/>
        </ChatList>
      </div>
      <div className={twMerge("flex-2  h-[calc(100%-1.25rem)] bg-white rounded-lg mx-auto hidden lg:flex")}>
        <ChatBox>
      <MessageContent data={data?.data??[]} />
        </ChatBox>
      </div>
      
    </div>
  );
};

export default Home;
