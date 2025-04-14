import ChatBox from "@/components/Common/chatBox";
import ChatContent from "@/components/Common/ChatContent";
import ChatList from "@/components/Common/chatlistbox";
import MessageContent from "@/components/Common/MessageContent";
import SearchBar from "@/components/Common/Searchbar";
import { MessageSquarePlus, Pencil } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Home = () => {
  return (
    <div className="flex flex-row w-full  px-4 gap-10 mt-5 h-full">  
      <div className={twMerge("flex-1  h-[calc(100%-1.25rem)] bg-white shadow-md rounded-lg mx-auto")}>
        <ChatList>
            <div className="font-bold text-2xl flex flex-row justify-between capitalize">
            <h1 className="ml-2">Archived</h1>
           
            </div>
<ChatContent data={null}/>
        </ChatList>
      </div>
      <div className={twMerge("flex-2  h-[calc(100%-1.25rem)] bg-white rounded-lg mx-auto hidden lg:flex")}>
        <ChatBox>
      <MessageContent data={null}/>
        </ChatBox>
      </div>
      
    </div>
  );
};

export default Home;
