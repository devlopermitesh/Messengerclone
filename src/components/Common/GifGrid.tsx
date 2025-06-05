import React, { Dispatch, SetStateAction } from "react";
import useSearchGif from "@/hooks/useSearchGif";
import { toast } from "sonner";
import axios from "axios";
import useThreadStore from "@/hooks/useThreadStore";
import useMenuStore from "@/hooks/uihooks/useMenustate";

interface GifGridProps {
  searchTerm?: string;
  setSearchTerm:Dispatch<SetStateAction<string>>;
}

const GifGrid: React.FC<GifGridProps> = ({ searchTerm = "" ,setSearchTerm}) => {
  const activeId=useThreadStore((state)=>state.threadId)
    const finalQuery = searchTerm.trim() === "" ? "Random" : searchTerm;
  const { gifs, isLoading, isError } = useSearchGif(finalQuery);
  const {closeGifMenu}=useMenuStore()

  if (isLoading) {
    return <div>Loading GIFs...</div>;
  }

  if (isError) {
    return <div>Error fetching GIFs. Please try again.</div>;
  }

  async function handleUplaod(url:string){

  if(!activeId) return ;

try {
  const newMessage=await axios.post("/api/messages",{
    image: url || null, 
    isVideo: true,  
    isGif:true,
    activeId
  })
  console.log("New Messages",newMessage)
  if(newMessage.data.success){
    return ;
  }
} catch (error) {
  console.log(error)
  toast.error("Ops! this Gif Can't send!")

}finally{
 setSearchTerm('') 
closeGifMenu()
}
  }
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-col-1 gap-2 overflow-y-auto oveflow-x-hidden h-[calc(100%-10px)] px-2">
      {gifs?.map((gif: any) => (
        <img
        onClick={()=>handleUplaod(gif?.url)}
        key={gif.id}
          src={gif?.url}
          alt={gif.title}
          className="cursor-pointer rounded-md hover:scale-105 transition w-full h-auto"
        />
      ))}
    </div>
  );
};

export default GifGrid;
