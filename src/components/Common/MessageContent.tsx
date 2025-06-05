"use client"
import Image from "next/image";
import NoChat from "@/assets/NoChat.png"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DefaultProfile from "@/assets/default.png"
import useFilterOtherUser from "@/hooks/usefilterOtherUser";
import MessagerFooter from "./MessageFooter";
import useCurrentChat from "@/hooks/usecurrentChat";
import { Columns2, Ellipsis, PanelLeftClose, Phone, User, Video } from "lucide-react";
import useThreadStore from "@/hooks/useThreadStore";
import { useEffect, useMemo } from "react";
import MessagesBox from "./MessagesBox";
import useMenuStore from "@/hooks/uihooks/useMenustate";
import { useSession } from "next-auth/react";
import AcceptRequest from "./AcceptRequest";
import WaitingMessage from "./WaitingRequest";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { BrowserView, MobileOnlyView } from "react-device-detect";
interface MessageContent{
activeId?:string,
data:any
}
const MessageContent:React.FC<MessageContent>=({activeId,data})=>{
  const session=useSession()
  const CurrentChat=useCurrentChat({data,activeId})
  const Otheruser=useFilterOtherUser({data:CurrentChat[0]})
  const {dashboardMenuOpen:isDashboardopen,toggleDashboardMenu}=useMenuStore()

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
},[activeId,setThreadId])
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
    <div className={`flex flex-col h-full w-full  `}>
    <nav className="w-full h-15 flex flex-row shadow py-2 md:px-1 md:px-4 items-center gap-2">
    <Columns2 size={23} onClick={toggleDashboardMenu} className={`text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 bg-orange-500 lg:hidden  hover:bg-[#bcc0c4] rounded-full  ${(isDashboardopen)?"hidden":"inline"} `} />
              
              <PanelLeftClose
                size={23} onClick={toggleDashboardMenu} className={`text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:hidden  hover:bg-[#bcc0c4] rounded-full  ${(isDashboardopen)?"inline":"hidden"} `} />
      <Avatar className='cursor-pointer w-9 h-9 lg:w-12 lg:h-12'>
        <AvatarImage src={(CurrentChat[0]?.isGroup)?CurrentChat[0].Image ?? undefined:Otheruser?.image?? undefined } alt="@shadcn" className="object-cover" />
        <AvatarFallback>
          <Image 
            src={(CurrentChat[0]?.isGroup)?CurrentChat[0].Image ?? DefaultProfile:Otheruser?.image?? DefaultProfile } 
            alt="User Image" 
            height={100} 
            width={100} 
            className="w-full h-full object-cover" 
          />
        </AvatarFallback>
      </Avatar> 
      <h2 className="text-md text-zinc-900 md:text-md lg:text-lg font-semibold  text-wrap">
        {(CurrentChat[0]?.isGroup)?CurrentChat[0].name ?? "Messenger Group":Otheruser?.name?? "Messenger user" }
      </h2>

    <MobileOnlyView className="flex h-full ml-auto gap">
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
        
          <div className=" h-auto hover:bg-gray-400/30 rounded-full bg-transparent w-auto flex items-center justify-center ml-auto my-auto transition-all  delay-50 duration-100 ease-in-out">
        
        <Ellipsis onClick={toggleProfile} size={30} className='rounded-full px-2 bg-[#B24BF3] text-white text-center font-semibold cursor-pointer m-2'/>
        </div>
      </DropdownMenuTrigger>
   <DropdownMenuContent className="flex flex-col relative right-4 bg-white shadow-lg rounded-lg border border-gray-300">
  <DropdownMenuGroup className="flex flex-col space-y-2 p-3">
    {/* Voice Call Item */}
    <DropdownMenuItem
      onClick={() => alert("no service yet")}
      className="text-black hover:bg-[#F1E8FF] hover:scale-105 rounded-lg w-full flex items-center justify-between p-2 transition-all duration-200 ease-in-out"
    >
      <div className="rounded-full p-2 bg-[#B24BF3] text-white flex items-center justify-center w-10 h-10">
        <Phone className="text-white" size={24} />
      </div>
      <span className="ml-3 font-medium">Make a Voice Call</span>
    </DropdownMenuItem>

    {/* Video Call Item */}
    <DropdownMenuItem
      onClick={() => alert("no service yet")}
      className="text-black hover:bg-[#F1E8FF] hover:scale-105 rounded-lg w-full flex items-center justify-between p-2 transition-all duration-200 ease-in-out"
    >
      <div className="rounded-full p-2 bg-[#B24BF3] text-white flex items-center justify-center w-10 h-10">
        <Video className="text-white" size={24} />
      </div>
      <span className="ml-3 font-medium">Make a Video Call</span>
    </DropdownMenuItem>

    {/* View Profile Item */}
    <DropdownMenuItem
     onClick={toggleProfile}
      className="text-black hover:bg-[#F1E8FF] hover:scale-105 rounded-lg w-full flex items-center justify-between p-2 transition-all duration-200 ease-in-out"
    >
      <div className="rounded-full p-2 bg-[#B24BF3] text-white flex items-center justify-center w-10 h-10">
        <User className="text-white" size={24} />
      </div>
      <span className="ml-3 font-medium">View Profile</span>
    </DropdownMenuItem>
  </DropdownMenuGroup>
</DropdownMenuContent>

              </DropdownMenu>

    </MobileOnlyView>
      <BrowserView className="flex flex-row items-center h-full ml-auto gap-3 border-2 border-green-500">

    <div className=" h-auto hover:bg-gray-400/30 rounded-full bg-transparent w-auto flex items-center justify-center ml-auto my-auto transition-all  delay-50 duration-100 ease-in-out">
      <Phone size={30} className='rounded-full px-2 bg-[#B24BF3] text-white text-center font-semibold cursor-pointer m-2'/>
        
      </div>
      <div className=" h-auto hover:bg-gray-400/30 rounded-full bg-transparent w-auto flex items-center justify-center ml-auto my-auto transition-all  delay-50 duration-100 ease-in-out">
      <Video size={30} className='rounded-full px-2 bg-[#B24BF3] text-white text-center font-semibold cursor-pointer m-2'/>
        
        </div>
        <div className=" h-auto hover:bg-gray-400/30 rounded-full bg-transparent w-auto flex items-center justify-center ml-auto my-auto transition-all  delay-50 duration-100 ease-in-out">
        
        <Ellipsis onClick={toggleProfile} size={30} className='rounded-full px-2 bg-[#B24BF3] text-white text-center font-semibold cursor-pointer m-2'/>
        </div>  </BrowserView>
    
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
