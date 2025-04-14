import { Cog, FileVideo, Image, ImagePlay, Mic, Plus } from "lucide-react"
import IconButton from "./IconButton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import useMenuStore from "@/hooks/uihooks/useMenustate"

const PlusOptions = () => {
  const {GifMenuOpen, toggleGifMenu}=useMenuStore()

    return(
        
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
        <IconButton
        icon={Plus}
        tooltipText="Start a new chat"
        tooltipId="chat-tooltip"
        onClick={() => console.log("Chat Button Clicked")}
        className="bg-blue-500 w-auto text-white hover:bg-blue-600 cursor-pointer"
      /> 
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56  space-y-5 relative left-14">
            <DropdownMenuGroup>
            <DropdownMenuItem className=" text-lg text-black font-medium" >
              <Mic  size={26} className=" font-bold text-sky-500 "  />
                Send a Voice clip

              </DropdownMenuItem >
              <DropdownMenuItem className=" text-lg text-black font-medium" >
              <FileVideo  size={26} className=" font-bold text-sky-500 "  />
                Send a Video

              </DropdownMenuItem >
              <DropdownMenuItem className=" text-lg text-black font-medium" onClick={toggleGifMenu} >
              <ImagePlay  size={26} className=" font-bold text-sky-500 "  />
                Choose a GIF

              </DropdownMenuItem >
              <DropdownMenuItem className=" text-lg text-black font-medium" >
              <Image  size={26} className=" font-bold text-sky-500 "  />
               Attach a file in 5mb

              </DropdownMenuItem >
            </DropdownMenuGroup>
          </DropdownMenuContent>
      </DropdownMenu>

    )
}

export default PlusOptions