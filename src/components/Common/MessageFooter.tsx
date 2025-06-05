"use client"
import { FileVideo, Image, ImagePlay, MessageSquarePlus, Mic, Plus, Send, SendHorizontal, ThumbsUpIcon, X } from "lucide-react";
import IconButton from "./IconButton";
import InputMessageBox from "./InputMessageBox";
import { useRef, useState } from "react";
import PlusOptions from "./PlusOptions";
import GifSearch from "./GifSearch";
import useMenuStore from "@/hooks/uihooks/useMenustate";
 
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { toast } from "sonner";
import axios, { Axios } from "axios";
import { Button } from "../ui/button";
import FileUpload from "../Providers/Fileupload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useThreadStore from "@/hooks/useThreadStore";
import useMessageReplyState from "@/hooks/uihooks/useReplyMessage";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
const formSchema = z.object({
  message: z.string().max(500,{ message: "Message input cannot exceed 500 characters." }),
})

const MessagerFooter=()=>{
  const activeId=useThreadStore((state)=>state.threadId)
  const {GifMenuOpen, toggleGifMenu}=useMenuStore()
 const [Files,SetFiles]=useState<IKUploadResponse[]>([])
 const AudioInputRef = useRef<HTMLInputElement | null>(null);
 const ImageInputRef = useRef<HTMLInputElement | null>(null);
 const VideoInputRef = useRef<HTMLInputElement | null>(null);
 const {isReply,removeReplyState,receiverofMessage,replyToMessageContent,replyToMessageId}=useMessageReplyState();
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
         message:""
    },
  })
async  function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    if (!values.message.trim() && Files.length === 0) {
      toast.error("Cannot send empty message");
      return;
    }
    
    const file = Files[0];
    const newMessage=await axios.post("/api/messages",{
      message:values.message,
      image: file?.url || null, 
      isVideo: (file?.fileType !== "image" && Files.length>=1),  
      isReply:isReply,
      replyToMessageId:isReply? replyToMessageId : null,
      activeId
    })
    if(newMessage.data.success){
      return ;
    }

  } catch (error) {
    toast.error("Something went wrong, try again!", {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#f87171",
        color: "#fff",
        border: "1px solid #b91c1c", 
        padding: "12px 16px",
        fontWeight: "bold",
      },
      icon: "⚠️",
    });
    
  }finally{
SetFiles([])
removeReplyState();
form.reset({ message: "" });
  }
   
  }

  const handeImageclick=()=>{
  
    if (ImageInputRef.current) {
      ImageInputRef.current.click(); 
    }
  }
  const handeAudioclick=()=>{
  
    if (AudioInputRef.current) {
      AudioInputRef.current.click(); 
    }
  }
const handeVideoclick=()=>{
  
  if (VideoInputRef.current) {
    VideoInputRef.current.click(); 
  }
}
const handleOnsuccess=(response: IKUploadResponse)=>{
  console.log(response)
  SetFiles((state)=>[...state,response]);

}
const handleProgress = (progress: number) => {
  if (progress === 0) {
    SetFiles((state) => [
      ...state,
      {
        fileId: "placeholder",
        filePath: "",
        fileType: "image",
        name: "loading",
        url: "",
        thumbnailUrl: "",
        height: 0,
        width: 0,
        size: 0,
        $ResponseMetadata: {
          statusCode: 0,
          headers: {},
        },
      } as IKUploadResponse,
    ]);
    return null;
  } else if (progress === 90) {
    SetFiles((state) =>
      state.filter((file) => file.fileId !== "placeholder")
    );
    return null;
  }
};

return(
  
  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
{isReply && (<div className="flex  items-center justify-between bg-gray-50 p-2 rounded-md mb-2">
  <span className="flex flex-col gap-2">
<p className="text-md font-semibold">{receiverofMessage}</p>
<p>{replyToMessageContent}</p>
  </span>
    <X size={20} className="text-bold" onClick={() =>{removeReplyState()} }/>
</div>)}
    <div className="flex flex-row w-full h-15 py-2 bg-white gap-2 px-2 items-center border relative">
      {GifMenuOpen && <GifSearch />} 
      {form.watch("message").length>0?
   <PlusOptions/> :(<>
   <DropdownMenu>
          <DropdownMenuTrigger asChild>
        <IconButton
        icon={Plus}
        tooltipText=""
        tooltipId="chat-tooltip"
        onClick={() =>alert('sdjl')}
        className="bg-blue-500 w-auto text-white hover:bg-blue-600 cursor-pointer"
      /> 
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 lg:inline space-y-5 relative left-14">
            <DropdownMenuGroup>
            <DropdownMenuItem 
             onClick={() => handeAudioclick()}  className=" text-lg text-black font-medium" >
              <Mic  size={26} className=" font-bold text-sky-500 "  />
                Send a Voice clip
                <FileUpload
                  fileType="audio"
                  ref={AudioInputRef}
          onSuccess={handleOnsuccess}
          onProgress={handleProgress}
        />
              </DropdownMenuItem >
              </DropdownMenuGroup>
              </DropdownMenuContent>
              </DropdownMenu>
              
      
     <IconButton
             icon={Image}
             tooltipText="Start a new chat"
             tooltipId="Image"
             
             onClick={() => handeImageclick()}
             className="bg-blue-500 w-auto text-white hover:bg-blue-600 cursor-pointer"
           >
                  <FileUpload
                  fileType="image"
                  ref={ImageInputRef}
          onSuccess={handleOnsuccess}
          onProgress={handleProgress}
        /></IconButton> 
          <IconButton
             icon={FileVideo}
             tooltipText="Send a Video"
             tooltipId="Video"
             
             onClick={() => handeVideoclick()}
             className="bg-blue-500 w-auto text-white hover:bg-blue-600 cursor-pointer"
           >
                  <FileUpload
                  fileType="video"
                  ref={VideoInputRef}

          onSuccess={handleOnsuccess}
          onProgress={handleProgress}
        /></IconButton> 
      
       <IconButton
             icon={ImagePlay}
             tooltipText="Send a Gif"
             tooltipId="Gif"
             onClick={() =>{
              toggleGifMenu()
             }}
             className="bg-blue-500 w-auto text-white hover:bg-blue-600 cursor-pointer"
           >
           </IconButton>
           </>)}
      <InputMessageBox  form={form} Files={Files} setFiles={SetFiles} name={'message'} ontype={()=>{console.log("Ontyping")}}/>
      <button type="submit" className="flex ">
      <SendHorizontal  className="h-auto w-9 p-1  md:w-12 md:p-2 bg-sky-500 hover:bg-sky-600 rounded-full  border-gray-400 text-white cursor-pointer"/>
</button>
    </div>
    </form>
    </Form>
)
}
export default MessagerFooter;