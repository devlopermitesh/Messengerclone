import { ImagePlus, Smile, X } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/skeleton";
import IconButton from "./IconButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { toast } from "sonner";
import axios from "axios";
import Defaultvoice from "@/assets/VoiceNote.png"
import { Dispatch, SetStateAction } from "react";
interface InputMessageBoxProps {
    form:any,
    Files:IKUploadResponse[],
    setFiles: Dispatch<SetStateAction<IKUploadResponse[]>>;
    name:string,
    ontype:(message:string)=>void
}

const InputMessageBox: React.FC<InputMessageBoxProps> = ({form,Files,setFiles,name,ontype}) => {

  const handleCancel=async(fileId:string)=>{
    try {
      const response = await axios.delete("/api/Imagekitfile-delete", {
        data: { fileId }
      });
      if(response.data.success){

          setFiles(Files.filter((file)=>file.fileId!==fileId));
        toast("Ok!")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong file ", {
        duration: 3000,
        style: {
          background: "#f87171", 
          color: "#fff",        
          border: "1px solid #b91c1c", 
          padding: "12px 16px",
          fontWeight: "bold",
          borderRadius: "8px",  
        },
        icon: "⚠️", 
      });
      
    }
  }
  function getPreviewUrl(file: IKUploadResponse): string {
    if (file.filePath.startsWith("/videos/")) {
      return `${file.thumbnailUrl}/tr=video-thumbnail,w-320,h-180`;
    } else if (file.filePath.startsWith("/audios/")) {
      return Defaultvoice.src;
    }
    return file.url;
  }
  
  return (
    <div className={twMerge("flex flex-row w-full h-15 py-2 bg-white gap-2 px-2   items-center border  transition delay-150 duration-300 ease-in-out",(Files && Files.length>0)?"relative flex-col h-35 bottom-10 rounded-lg":"h-15")}>
      <div className={`flex flex-row h-20 mb-3 w-full  ${(Files && Files.length>0)?"block":"hidden"} `}>
     <IconButton icon={ImagePlus}    
         tooltipText="Upload another file"
             tooltipId="chat-tooltip"  className="h-15 w-13 rounded-md mr-auto border-2 border-gray-500/30 mx-2"/>
             
             {Files?.length > 0 &&
  Files.map((file, index) => {
    const key = file.fileId || index;

    return (
      <Avatar
        key={key}
        className="h-15 w-13 rounded-md mr-auto relative overflow-hidden group"
      >
        <AvatarImage src={getPreviewUrl(file)} />
        <X
          onClick={() => handleCancel(file.fileId)}
          className="absolute top-2 hidden group-hover:inline text-black right-2 hover:bg-gray-300 rounded-full z-40"
          size={15}
        />
        <AvatarFallback className="h-15 w-13 rounded-md mr-auto relative overflow-hidden group">
          <Skeleton className="h-full w-full" />
          <X
            onClick={() => handleCancel(file.fileId)}
            className="absolute top-2 hidden group-hover:inline text-black right-2 hover:bg-gray-300 rounded-full z-40"
            size={15}
          />
        </AvatarFallback>
      </Avatar>
    );
  })}

      </div>
      <div className="flex flex-row w-full h-full">
<FormField
  control={form.control}
  name={name}
  render={({ field }) => (
    <FormItem className="w-full  h-full px-3">
      <FormMessage />

      <FormControl>
      <input
  className="flex-3 h-full py-1 rounded-full border text-lg px-1  w-full"
  value={field.value} // 👈 THIS IS IMPORTANT
  onChange={(e) => {
    console.log("Custom onchange:", e.target.value);
    ontype(e.target.value); // 👈 your custom prop function
    field.onChange(e); // keep RHF in sync
  }}
  placeholder="Aa"
/>

      </FormControl>
    </FormItem>
  )}
/>
    </div>
    </div>
    )
}

export default InputMessageBox;