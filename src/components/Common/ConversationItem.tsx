import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DefaultProfile from "@/assets/default.png"
import React, { useMemo, useRef } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import useFilterOtherUser, { ChatListProps } from "@/hooks/usefilterOtherUser";
import { Ellipsis, Menu } from "lucide-react";
import ConversationItemOption from "./ConversationitemOption";
import { useSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Chat } from "@prisma/client";

interface ConversationItemProps  {
  user:ChatListProps,
  activeChat?:string,
onClick:(id:string)=>void
}

const RelativeTime = (isoDate:string) => {
    const parsedDate = parseISO(isoDate);
    const relativeTime = formatDistanceToNow(parsedDate, { addSuffix: true });
  
    return <p>{relativeTime}</p>; // e.g., "less than a minute ago"
  };
  
  
const ConversationItem:React.FC<ConversationItemProps>=({user,activeChat,onClick})=>{
 const {data}=useCurrentUser()
  const otheruser=useFilterOtherUser(user.isGroup?{data:null}:{data:user})
  const containerRef = useRef<HTMLDivElement>(null)
  const userId=useMemo(()=>{
return data?.id
  },[data?.id])
  const lastMessage=useMemo(()=>{
    const messages=user.messages
    return messages[messages.length-1];
  },[user.messages])
  const hasSeen=useMemo(()=>{
if(!lastMessage){
  return false;
}
const SeenArray=lastMessage.seenIds ||[]
if(!userId){
return false;
}
return SeenArray.filter((user)=>user==userId).length!==0;
  },[userId,lastMessage])
const LastMessageText=useMemo(()=>{
if(lastMessage?.image){
  return "Send a Image"
}
else if(lastMessage?.isVideo){
  return "Send a Video"
}
else if(lastMessage?.content){
  return lastMessage.content
}
else{
  return "Conversing"
}
},[lastMessage])

const typeLastMessage=useMemo(()=>
  {
if(lastMessage?.senderId===userId){
  return "You";
}
else {
    return "receive";
}

},[lastMessage])
return (
    <div  ref={containerRef}   className={twMerge(`flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer py-3 rounded-lg group relative`,(activeChat ===user.id)?"bg-gray-100":"")} key={user?.id} onClick={()=> onClick(user?.id)}>
        <Avatar className='cursor-pointer w-12 h-12 lg:w-12 lg:h-12  '>
  <AvatarImage src={user.isGroup?user.Image ?? undefined:otheruser?.image ?? undefined} alt="@shadcn" className="object-cover" />
  <AvatarFallback>
  <Image 
    src={otheruser?.image || DefaultProfile} 

  alt="User Image" 
  height={100} 
  width={100} 
  className="w-full h-full object-cover" 
/></AvatarFallback>
</Avatar>
<div className="flex flex-col gap-1  w-full">
<h2 className="text-zinc-900 md:text-md lg:text-lg">{user.isGroup?user.name ?? 'Messenger user':otheruser?.name ?? "Messenger user"}</h2>
<div className="flex flex-row relative  gap-2">
<small className={`text-gray-500 text-sm ${hasSeen?"font-medium":"font-bold"}`}>{typeLastMessage}: {LastMessageText}</small>
<small className="text-gray-500 text-sm group-hover:hidden">{RelativeTime(String(user.lastMessageAt))}</small>
</div>
</div>
<div className="flex h-full hidden group-hover:inline items-center justify-center w-auto text-gray-500 float-right mr-10 transition-all duration-200 ease-out transform group-hover:-translate-y-1 relative">
  <ConversationItemOption menuref={containerRef}/>
</div>


    </div>)
}
export default ConversationItem;