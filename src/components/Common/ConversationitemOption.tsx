import { Archive, Bell, BookmarkCheck, Ellipsis, SeparatorHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useEffect, useState } from "react";
import { useDeleteChatmodel } from "@/hooks/uihooks/useDeleteChatmodel";
interface ConversationItemProps{
    menuref?:React.RefObject<HTMLDivElement | null>
}
const ConversationItemOption:React.FC<ConversationItemProps> = ({menuref}) => {
  const [open, setOpen] = useState(false);
  const {onOpen}=useDeleteChatmodel();
    const [menuTop, setMenuTop] = useState<number | null>(null)
    const [menuleft,setMenuLeft]=useState<number|null>(null)

    useEffect(() => {

      if (menuref?.current) {
        const rect = menuref.current.getBoundingClientRect()
        setMenuTop(rect.top +rect.height + window.scrollY) // for scroll-safe position
        setMenuLeft(rect.left +(rect.width/2) + window.scrollX ) // for scroll-safe position
      }
    }, [menuref])
  
    return(

<DropdownMenu  open={open} onOpenChange={setOpen} >
          <DropdownMenuTrigger asChild>
  <Ellipsis 
    size={24} 
    className="bg-slate-100 hover:bg-gray-500/20 hover:border hover:border-gray-500/20 p-2 rounded-full w-10 h-10 shadow-md transition-all duration-200 ease-out my-auto mt-1"
  />
</DropdownMenuTrigger>
<DropdownMenuContent 
  className="w-65 lg:w-86 absolute z-[9999] rounded-lg" // rest Tailwind
  style={{
    top: menuTop ?? undefined,
    left: menuleft ?? undefined,
  }}

    align="end"
    side="bottom"
    
    sideOffset={8}
>
            <DropdownMenuGroup>
            <DropdownMenuItem className=" text-xl text-black font-semibold px-10" >
            <BookmarkCheck size={32} className="w-5 h-5 font-semibold text-black"  />
              Mark as read
              </DropdownMenuItem >
              
            <DropdownMenuItem className=" text-xl text-black font-semibold px-10" >
            <Bell size={32} className="w-5 h-5 font-semibold text-black"  />
              Mute nofication
              </DropdownMenuItem >
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
            <DropdownMenuItem className=" text-xl text-black font-semibold px-10" >
            <Archive size={32} className="w-5 h-5 font-semibold text-black"  />
              Archive Chat
              </DropdownMenuItem >
              
            <DropdownMenuItem onClick={()=>{
               setOpen(false) //first close overlay of dropdown menu
               onOpen()//open Model with restricted list
              }}className=" text-xl text-black font-semibold px-10" >
            <Trash2 size={32} className="w-5 h-5 font-semibold text-black"  />
              Delete Chat
              </DropdownMenuItem >
            </DropdownMenuGroup>
            </DropdownMenuContent>
          
</DropdownMenu>
    )
}
export default ConversationItemOption