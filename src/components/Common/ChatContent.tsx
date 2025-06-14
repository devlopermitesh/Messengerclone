"use client"
import Image from "next/image";
import Nomessage from "@/assets/NoMessage.png"
import ConversationItem from "./ConversationItem";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface ChatContent{
data:any ,
isLoading?:boolean,
activeChat?:string
}
const ChatContent:React.FC<ChatContent>=({data,isLoading,activeChat})=>{
  const router=useRouter()
  
  const pathname = usePathname();
  const handleclick = (id: string) => {
    // If we're already on the new thread page, do nothing
    if (pathname === `/t/${id}`) return;
  
    // If current pathname is a thread (starts with "/t/"), then navigate directly to the new thread.
    const pushPath = pathname.startsWith('/t/')
      ? `/t/${id}`
      : (pathname === '/t' || pathname.includes('/new'))
        ? `/t/${id}`
        : `${pathname}/t/${id}`;
  
    router.push(pushPath);
  };
  
    if(isLoading){
   return ( <div className="flex flex-col gap-2 h-[calc(100%-1.25rem)] overflow-y-auto px-2 py-4">
        {Array.from({length:7}).map((item,index)=>(<div key={index} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>))}
    </div>)   
    }
    if (!data || data?.length<0){
        return(
        <div className="w-full h-auto py-10 flex flex-col  space-y-3 items-center justify-center">
 <Image 
  src={Nomessage} 
  alt="No message" 
  height={100} 
  width={100} 
  className="max-w-xs lg:max-w-lg w-auto h-auto lg:w-3/4 object-contain px-10" 
/>

<h2 className="text-2xl font-bold text-center mx-auto">No messages</h2>
<p className="text-xl text-gray-400 text-center mx-auto">New messages will appear here.</p>
        </div>)

    }
return(
    <div className="flex flex-col gap-2 h-[calc(100%-1.25rem)] overflow-y-auto px-2 py-4">
        {data && data.map((user:any)=>(<ConversationItem activeChat={activeChat} key={user?.id} user={user} onClick={handleclick} />))}
    </div>
)
}
export default ChatContent;
