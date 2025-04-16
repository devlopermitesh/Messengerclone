"use client"
import useCurrentChat from "@/hooks/usecurrentChat"
import useFilterOtherUser from "@/hooks/usefilterOtherUser"
import useThreadStore from "@/hooks/useThreadStore"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import DefaultProfile from "@/assets/default.png"
import IconButton from "./IconButton"
import { ArrowLeft, Bell, Search, UserRoundPlus } from "lucide-react"
import MultiProfileOption from "./MultiProfileOption"
import useMenuStore from "@/hooks/uihooks/useMenustate"
interface ProfileDetailProps{
    data:any
}
const ProfileDetails:React.FC<ProfileDetailProps>=({data})=>{
    const activeId=useThreadStore((state)=>state.threadId)
    const CurrentChat=useCurrentChat({data,activeId})
    const Otheruser=useFilterOtherUser({data:CurrentChat[0]})
  const {toggleOtheruserProfileMenuOpen}=useMenuStore()
    return(
        <div className="flex flex-col h-full w-full overflow-y-scroll">
          <ArrowLeft size={23} className={`text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:hidden  hover:bg-[#bcc0c4] rounded-full  md:hidden `}  onClick={()=>{
           toggleOtheruserProfileMenuOpen()
          }}/>
<div className="flex flex-col items-center justify-center w-full h-auto  mt-10 space-y-4 ">

<Avatar className='cursor-pointer w-16 h-16 lg:w-20 lg:h-20 mt-auto mx-auto lg:mx-auto rounded-full  border-2 border-green-500'>
  <AvatarImage src={(CurrentChat[0]?.isGroup)?CurrentChat[0].Image ?? undefined:Otheruser?.image?? undefined } alt="@shadcn" className="object-cover" />
  <AvatarFallback>
  <Image 
  src={(CurrentChat[0]?.isGroup)?CurrentChat[0].Image ?? DefaultProfile:Otheruser?.image?? DefaultProfile } 
  alt="User Image" 
  height={100} 
  width={100} 
  className="w-full h-full object-cover rounded-full" 
/>
  </AvatarFallback>
</Avatar>
<h2 className="text-black hover:underline text-md md:text-lg lg:text-xl font-semibold select:none cursor-pointer">
{(CurrentChat[0]?.isGroup)?CurrentChat[0].name ?? 'Messenger Group':Otheruser?.name?? "Messenger user" }
</h2>
</div>
<div className="flex flex-row w-full h-auto justify-around items-center px-10 mt-5">
<span>
<IconButton icon={UserRoundPlus} size={24} tooltipId="follow" className="bg-gray-100" tooltipText="follow request" />
<p className="text text-black hover:underline transition-all md:text-md lg:text-md select:none cursor-pointer">Follow</p>
</span>  
 <span>
<IconButton icon={Bell} size={24} tooltipId="follow" className="bg-gray-100" tooltipText="follow request" />
<p className="text text-black hover:underline transition-all md:text-md lg:text-md select:none cursor-pointer">Mute</p>
</span>  
 <span>
<IconButton icon={Search} size={24} tooltipId="follow" className="bg-gray-100" tooltipText="follow request" />
<p className="text text-black hover:underline transition-all md:text-md lg:text-md select:none cursor-pointer">Search</p>
</span>
</div>
<MultiProfileOption/>
        </div>
    )
}
export default ProfileDetails;