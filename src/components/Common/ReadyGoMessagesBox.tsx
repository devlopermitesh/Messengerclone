import Image from "next/image";
import DefaultProfile from "@/assets/default.png"
import MessagerFooter from "./MessageFooter";
import useConversationReady from "@/hooks/useConversationReady";
import IconButton from "./IconButton";
import { UserPlus, Users } from "lucide-react";
import { useGroupChatmodel } from "@/hooks/uihooks/useGroupChatmodel";

const ReadyGoMessagesBox=()=>{
    const {listusers,removeuser}=useConversationReady()
    const {isOpen,onClose,onOpen}=useGroupChatmodel()
    return(
    <div className="flex flex-col h-full w-full relative  mx-auto">
        <div className="mx-auto mt-10 lg:mt-14 flex flex-col border-2 border-green-500">
            {
                (listusers.length==1)?(
                    <>
<Image src={listusers[0]?.image||DefaultProfile} alt="Other Usee profile" height={100} width={100} className="w-20 h-20 rounded-full mx-auto"/>
<h2 className="text-black text-lg font-semibold">{listusers[0]?.name}</h2>
</>):(

<div className="mx-auto mt-10 lg:mt-14 flex flex-col items-center">
  {/* Profile Images - Overlapping */}
  <div className="flex items-center justify-center -space-x-4 mb-2">
    {listusers.slice(0, 2).map((user, index) => (
      <Image
        key={index}
        src={user.image || DefaultProfile}
        alt="User profile"
        width={40}
        height={40}
        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
      />
    ))}
  </div>

  {/* Names Display */}
  <h2 className="text-black text-sm font-semibold text-center">
    {listusers.slice(0, 2).map((user) => user.name).join(", ")}
    {listusers.length > 2 && (
      <span className="text-gray-500"> +{listusers.length - 2}</span>
    )}
  </h2>
  <p className="font-thin">you are creating a group</p>
  <div className="flex items-center border border-red-500 mt-10 px-10 py-3 gap-4">
  <span className="flex flex-col tetx-2xl text-black font-semibold ">
  <IconButton
                // onClick={(!isOpen)?onOpen:()=>{}}
                icon={UserPlus}
                tooltipId="add user"
                tooltipText="Add new user"
                size={26}
                textclass="!text-xs !p-1" 
                className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:inline hover:bg-[#bcc0c4] rounded-full text-xs "
               />
               <h3>Add</h3>
               </span>
               <span className="flex flex-col tetx-2xl text-black font-semibold">
  <IconButton
                onClick={(!isOpen)?onOpen:()=>{}}
                icon={Users}
                tooltipId="Group chat"
                tooltipText="create Group chat"
                size={26}
                textclass="!text-xs !p-1" 
                className="text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:inline hover:bg-[#bcc0c4] rounded-full text-xs "
               />
               <h3>Group</h3>
               </span>

    </div>
</div>

)}
     
</div>
<div className="absolute bg-blue-500 bottom-20 w-full h-15">
    <MessagerFooter/>
</div>
    </div>)
}

export default ReadyGoMessagesBox;