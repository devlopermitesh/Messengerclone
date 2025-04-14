import React from "react";
import { twMerge } from "tailwind-merge";

interface ChatBoxProps{
    children:React.ReactNode
    className?:string
}
const ChatBox:React.FC<ChatBoxProps>=({children,className})=>{
return(
    <div className={twMerge("w-auto  flex-1 h-full rounded-lg mx-auto",className)}>
{children}
    </div>
)
}
export default ChatBox;