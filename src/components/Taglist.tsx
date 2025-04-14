import { X } from "lucide-react";
import { Badge } from "./ui/badge"
import useConversationReady from "@/hooks/useConversationReady";
import { useGroupChatmodel } from "@/hooks/uihooks/useGroupChatmodel";
import { useEffect } from "react";
interface TagListProps {
    tags: { id: string; text: string }[]; 
  }
  
const Taglist:React.FC<TagListProps>=({tags})=>{
    const {removeuser}=useConversationReady()

    if(tags.length==0){
        return null;
    }

return(
    <div className="flex flex-row gap-2">
{tags && tags.map((Tag)=>

<Badge key={Tag.id} className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-gray-700 p-2">
      <span className="text-md">{Tag.text}</span>
      <button onClick={()=>removeuser(Tag.id)} className="text-gray-500 hover:text-red-500">
        <X size={16} />
      </button>
    </Badge>)}
    </div>

)
}

export default Taglist