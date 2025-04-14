import Image from "next/image";
import DefaultProfile from "@/assets/default.png"
import MessagerFooter from "./MessageFooter";
import useConversationReady from "@/hooks/useConversationReady";

const ReadyGoMessagesBox=()=>{
    const {listusers,removeuser}=useConversationReady()
    return(
    <div className="flex flex-col h-full w-full relative ">
        <div className="mx-auto mt-10 lg:mt-14 flex flex-col">
<Image src={listusers[0]?.image||DefaultProfile} alt="Other Usee profile" height={100} width={100} className="w-20 h-20 rounded-full mx-auto"/>
<h2 className="text-black text-lg font-semibold">{listusers[0]?.name}</h2>
</div>
<div className="absolute bg-blue-500 bottom-20 w-full h-15">
    <MessagerFooter/>
</div>
    </div>)
}

export default ReadyGoMessagesBox;