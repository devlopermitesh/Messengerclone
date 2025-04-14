import { useEffect, useState } from "react";
import Modals from "../Common/Model";
import { useRestrictedlistmodel } from "@/hooks/uihooks/useRestrictedListmodel";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SearchBar from "../Common/Searchbar";
import useGetBlocklist from "@/hooks/GetBlocklist";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import DefaultProfile from "@/assets/default.png"
import useFilterOtherUser, { UserListProps } from "@/hooks/usefilterOtherUser";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { pusherclient } from "@/lib/pusher";
const RestrictedListProvider=()=>{
const session=useSession();
const {isOpen,onClose,onOpen}=useRestrictedlistmodel()
const {data,error,isLoading,mutate}=useGetBlocklist()
const blocklist=data?.data;
const otheruser=useFilterOtherUser({data:(blocklist)?blocklist[0]:null})

useEffect(()=>{
if(!session.data?.user.email) return ;
pusherclient.subscribe(session.data.user.email);
const updateblocklist=(newUpdate: {
  chatId:string,
  hidden: boolean
})=>{
mutate((prev:{data:UserListProps[]})=>{
  const lists=prev.data
  return {
    ...prev,
    data:lists.filter((current:any)=>current.id!==newUpdate.chatId)
  }
},{revalidate:false})
}
pusherclient.bind("unhide:requestchat",updateblocklist)
return ()=>{
pusherclient.unbind("unhide:requestchat",updateblocklist)
pusherclient.unsubscribe(session.data.user.email??'');

  
}
},[mutate,session.data?.user.email])
const handleunBlock=async(activeId?:string)=>{
  try {
      if(!activeId) return null;
      const response=await axios.post(`/api/request/${activeId}/unblock`);
  
      if (response.data.success) {
          toast.success(response.data.message, {
            duration: 3000,
            style: {
              backgroundColor: "green", 
              color: "white", 
              borderRadius: "8px",
            },
          });
        } else {
          toast.error(response.data.error || "Verification failed", {
            duration: 3000,
            style: {
              backgroundColor: "red", 
              color: "white", 
              borderRadius: "8px",
            },
          });
        }
  
  } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.", {
          duration: 3000,
          style: {
            backgroundColor: "red", 
            color: "white", 
            borderRadius: "8px",
          },
        });
  }
  }


    return(
        <Modals
        isopen={isOpen}
        onchange={isOpen?onClose:onOpen}
        title="Restricted users"
        description="you can unblock this user by click unblock ! start conversation."
      >
       <div className="w-full h-full bg-white text-black">
<SearchBar/>
{
  blocklist && blocklist.map((list)=>{
    return (
      <li key={list.id} 
      className={twMerge(`flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer py-3 rounded-lg group relative bg-gray-100/30" `)}
      >    <Avatar className='cursor-pointer w-12 h-12 lg:w-12 lg:h-12  '>
      <AvatarImage src={otheruser?.image ?? undefined} alt="@shadcn" className="object-cover" />
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
    <h2 className="text-zinc-900 md:text-md lg:text-lg">{otheruser?.name}</h2>
    </div>
    <Button onClick={()=>handleunBlock(list.id)}
  className="hidden absolute right-10 group-hover:inline rounded-full px-4 py-1 text-sm font-medium text-sky-600 bg-sky-100 hover:bg-sky-200 hover:text-sky-700 transition-all duration-200 shadow-sm cursor-pointer"
>
  Unblock
</Button>

    </li>
    )
  })
}
       </div>
      </Modals>
    )
}

export default RestrictedListProvider;