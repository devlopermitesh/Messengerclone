"use client"
import ChatBox from "@/components/Common/chatBox";
import ChatList from "@/components/Common/chatlistbox";
import ContactSearch from "@/components/Common/ContactSearch";
import SearchBar from "@/components/Common/Searchbar";
import Taglist from "@/components/Taglist";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useConversationReady from "@/hooks/useConversationReady";
import axios from "axios";
import { MessageSquarePlus, Users, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { useDebounceCallback } from 'usehooks-ts';
import DefaultProfile from "@/assets/default.png"
import ReadyGoMessagesBox from "@/components/Common/ReadyGoMessagesBox";
import { useRouter } from "next/navigation";
import useGetContacts from "@/hooks/useGetContacts";
import ChatContent from "@/components/Common/ChatContent";
import { useGroupChatmodel } from "@/hooks/uihooks/useGroupChatmodel";
import IconButton from "@/components/Common/IconButton";
const Home = () => {
    const [username, setUsername] = useState("");
    const [userlists,setuserlist]=useState([]);
    const [title,setTitle]=useState("")
  const {data}=useGetContacts()

  const [isUsernameSearch, setIsUsernameSearch] = useState(false);
  const {listusers,removeuser}=useConversationReady()
  const [ContactShow,setContactShow]=useState(true)
  const [GroupShow,setGroupShow]=useState(false);
  const {isOpen,onClose,onOpen}=useGroupChatmodel();
  const contactSearchRef = useRef<HTMLDivElement | null>(null);
 const router=useRouter();
  const debouncedUsername = useDebounceCallback((value: string) => {
    setUsername(value);
    setContactShow(!!value)
  }, 1000);
  useEffect(() => {
    if (username) {
      setIsUsernameSearch(true);
      async function checkUsername(username: string) {
        try {
          const results = await axios.get(`/api/searchusername?username=${username}`);
          if (results.data.success) {
setuserlist(results.data.data)
console.log("Results",results)
          }

        } catch (error) {
          const axiosError = error as any;
          toast.error(axiosError.response?.data.message ||"Something went wrong try latter")
        } finally {
          setIsUsernameSearch(false);
        }
      }
      checkUsername(username);
      
    }
  }, [username]);
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (contactSearchRef.current && !contactSearchRef.current.contains(event.target as Node)) {
        setContactShow(false);
    }
}, []);

useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [handleClickOutside]);

//Show Group chat create button 
useEffect(() => {
  if (listusers.length >= 2 && !isOpen) {
    setGroupShow(true)
  }
}, [listusers.length, onOpen, isOpen]);

//handle new conversation routing 
const handleNewConversation = async () => {
  try {
    if(listusers.length>1){
      return null;
    }
    const response = await axios.post("/api/newconversation", {
      userId: listusers.map((user) => user.id),
      isGroup: listusers.length > 1,
      title: (listusers.length > 1 ? title : "GroupChat"),

    })

    if(response.data.success) {
      router.push(`/t/${response.data.data[0].id}`)
      toast.success("New conversation created successfully!");
}
else{
  toast.error("Failed to create new conversation. Please try again.");
}

  } catch (error) {
    console.log("Error creating new conversation:", error);
    toast.error("Error creating new conversation. Please try again.");
  }
}

  return (
    <div className="flex flex-row w-full  px-4 gap-10 mt-5 h-full">  
      <div className={twMerge("flex-1  h-[calc(100%-1.25rem)] bg-white shadow-md rounded-lg mx-auto")}>
        <ChatList className="space-y-2" >
            <div className="font-bold text-2xl flex flex-row justify-between capitalize">
            <h1 className="ml-2">Chats</h1>
          <span className="h-full ml-auto flex flex-row items-center ">
            {
              (GroupShow) &&(
                <IconButton
                onClick={(!isOpen)?onOpen:()=>{}}
                icon={Users}
                tooltipId="Group chat"
                tooltipText="create Group chat"
                size={26}
                textclass="!text-xs !p-1" 
                className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:inline hover:bg-[#bcc0c4] rounded-full text-xs "
               />
              )
            }
             <MessageSquarePlus 
            size={26} 
            className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:inline hover:bg-[#bcc0c4] rounded-full" 
          />
          </span>
            
            </div>
<SearchBar/>
{listusers && listusers.map((user)=><div key={user.id} className="flex flex-row bg-gray-500/10 w-[95%] mx-auto  hover:bg-gray-400/20 rounded-lg  items-center gap-3 px-2 py-4 cursor-pointer group/item " onClick={handleNewConversation}>
  <Avatar className='cursor-pointer w-12 h-12 lg:w-12 lg:h-12  '>
  <AvatarImage src={user?.image ?? undefined} alt="@shadcn" className="object-cover" />
  <AvatarFallback>
  <Image 
  src={DefaultProfile} 
  alt="User Image" 
  height={100} 
  width={100} 
  className="w-full h-full object-cover" 
/></AvatarFallback>
</Avatar>

<h2 className="text-zinc-900  md:text-md lg:text-lg">New Message to {user.name}</h2>
<X  onClick={()=>removeuser(user.id)} className="bg-slate-300/10 text-black rounded-full hover:text-zinc-900 hover:bg-slate-600/10 w-8 h-8 p-2 float-right transition hidden group-hover/item:inline"/>
    </div>)}
    
<ChatContent data={data?.data?? []}/>
        </ChatList>
      </div>
      <div className={twMerge("flex-2  h-[calc(100%-1.25rem)] bg-white rounded-xl overflow-hidden mx-auto hidden lg:flex")}>
        <ChatBox>
            <div className="flex flex-row w-full h-17 py-2 items-center border px-2">
                <h1 className="text-lg ">To:</h1>       
<Taglist tags={listusers.map(user => ({ id: user.id, text: user.name || "Unknown" }))} />
                <input 
                 size={30} 
                 className="flex-2 border-none focus-visible:ring-0 focus:ring-0 focus:outline-none shadow-none text-xl"  
                 onChange={(e) =>debouncedUsername(e.target.value)} 
                   />

            </div>
         {
            ContactShow && (<div ref={contactSearchRef} className="relative w-1/2 h-3/4">
                <ContactSearch users={userlists}/>
                </div>)
         }   

         { (!ContactShow && listusers.length!=0) &&
            <ReadyGoMessagesBox/>
         }
        </ChatBox>
      </div>
      
    </div>
  );
};

export default Home;
