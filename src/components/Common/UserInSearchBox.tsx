import { User } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import DefaultProfile from "@/assets/default.png"
import useConversationReady from "@/hooks/useConversationReady";
interface UserinsearchBoxProps{
    data:User
}
const UserinsearchBox:React.FC<UserinsearchBoxProps>=({data})=>{
    const {adduser}=useConversationReady()
    return (

    <div className="flex flex-row hover:bg-gray-400/20 rounded-lg  items-center gap-3 px-2 py-2 cursor-pointer" onClick={()=>adduser(data)}>
  <Avatar className='cursor-pointer w-12 h-12 lg:w-12 lg:h-12  '>
  <AvatarImage src={data?.image ?? undefined} alt="@shadcn" className="object-cover" />
  <AvatarFallback>
  <Image 
  src={DefaultProfile} 
  alt="User Image" 
  height={100} 
  width={100} 
  className="w-full h-full object-cover" 
/></AvatarFallback>
</Avatar>
<h2 className="text-gray-400 text-md md:text-lg lg:text-xl">{data.name}</h2>
    </div>
)
}
export default UserinsearchBox;