"use client"
import Image from "next/image";
import NoChat from "@/assets/NoChat.png"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DefaultProfile from "@/assets/default.png"
import useFilterOtherUser from "@/hooks/usefilterOtherUser";
import MessagerFooter from "./MessageFooter";
import useCurrentChat from "@/hooks/usecurrentChat";
import { Ellipsis, Phone, Video } from "lucide-react";
import useThreadStore from "@/hooks/useThreadStore";
import { useEffect, useMemo } from "react";
import MessagesBox from "./MessagesBox";
import useMessages from "@/hooks/useMessages";
import useMenuStore from "@/hooks/uihooks/useMenustate";
import { useSession } from "next-auth/react";
import AcceptRequest from "./AcceptRequest";
import WaitingMessage from "./WaitingRequest";
interface MessageContent{
activeId?:string,
data:any
}
const MessageContent:React.FC<MessageContent>=({activeId,data})=>{
  const session=useSession()
  const CurrentChat=useCurrentChat({data,activeId})
  const Otheruser=useFilterOtherUser({data:CurrentChat[0]})
  console.log("Current chat",CurrentChat)
  const setThreadId = useThreadStore((state) => state.setThreadId);
  const toggleProfile=useMenuStore((state)=>state.toggleOtheruserProfileMenuOpen)
  const isInitiator = useMemo(() => {
    if (!CurrentChat.length || !session.data?.user.id) return false;
    return session.data.user.id === CurrentChat[0].initiatorId;
  }, [session.data?.user.id, CurrentChat]);
  
useEffect(()=>{
if(activeId){
  setThreadId(activeId)
}
},[activeId])
  if (!data || data.length==0 ||CurrentChat?.length==0){
        return(
        <div className="w-full h-full py-10 flex flex-col  space-y-3 items-center justify-center">
 <Image 
  src={NoChat} 
  alt="No message" 
  height={100} 
  width={100} 
  className="max-w-xs lg:max-w-lg w-auto h-auto lg:w-1/2 object-contain px-10" 
/>

<h2 className="text-2xl font-bold text-center mx-auto">No chats selected</h2>
        </div>)

    }
return(
    <div className="flex flex-col h-full w-full">
    <nav className="w-full h-15 flex flex-row shadow py-2 px-4 items-center gap-2">
      <Avatar className='cursor-pointer w-12 h-12 lg:w-12 lg:h-12'>
        <AvatarImage src={Otheruser?.image || undefined} alt="@shadcn" className="object-cover" />
        <AvatarFallback>
          <Image 
            src={Otheruser?.image || DefaultProfile} 
            alt="User Image" 
            height={100} 
            width={100} 
            className="w-full h-full object-cover" 
          />
        </AvatarFallback>
      </Avatar> 
      <h2 className="text-zinc-900 md:text-md lg:text-lg font-semibold">{Otheruser?.name}</h2>
      <div className="flex flex-row items-center h-full ml-auto gap-3">
      <div className=" h-auto hover:bg-gray-400/30 rounded-full bg-transparent w-auto flex items-center justify-center ml-auto my-auto transition-all  delay-50 duration-100 ease-in-out">
      <Phone size={30} className='rounded-full px-2 bg-[#B24BF3] text-white text-center font-semibold cursor-pointer m-2'/>
        
      </div>
      <div className=" h-auto hover:bg-gray-400/30 rounded-full bg-transparent w-auto flex items-center justify-center ml-auto my-auto transition-all  delay-50 duration-100 ease-in-out">
      <Video size={30} className='rounded-full px-2 bg-[#B24BF3] text-white text-center font-semibold cursor-pointer m-2'/>
        
        </div>
        <div className=" h-auto hover:bg-gray-400/30 rounded-full bg-transparent w-auto flex items-center justify-center ml-auto my-auto transition-all  delay-50 duration-100 ease-in-out">
        
        <Ellipsis onClick={toggleProfile} size={30} className='rounded-full px-2 bg-[#B24BF3] text-white text-center font-semibold cursor-pointer m-2'/>
        </div>
        </div>
    </nav>
  
    {/* Message Box */}
  <MessagesBox/>
  
{
(CurrentChat[0]?.isPending)?(isInitiator)?(<WaitingMessage/>):(<AcceptRequest activeId={activeId} username={CurrentChat[0].title || "user"}/>):null
  }
    {/* Footer */}
    <div className="mt-auto mb-1"   aria-disabled="true">
      <MessagerFooter  />
    </div>
  </div>
  
)
}
export default MessageContent;
