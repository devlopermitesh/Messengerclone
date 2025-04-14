import React from "react";
import { twMerge } from "tailwind-merge";

interface ChatListProps{
    children:React.ReactNode
    className?:string
}
const ChatList:React.FC<ChatListProps>=({children,className})=>{
return(
    <div className={twMerge("w-auto flex-1 flex flex-col h-full mt-2 rounded-lg mx-auto",className)}>
{children}
    </div>
)
}
export default ChatList;