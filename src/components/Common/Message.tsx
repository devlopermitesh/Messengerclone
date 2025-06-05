import { IMessageWithSenderAndSeen } from "@/hooks/useMessages";
import { useSession } from "next-auth/react";
import React from "react";
import { CheckCheck, Menu, Reply, Smile } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import DefaultProfile from "@/assets/default.png"
import useMessageReplyState from "@/hooks/uihooks/useReplyMessage";
import { twMerge } from "tailwind-merge";
interface MessageProps {
  data: IMessageWithSenderAndSeen;
  islast: boolean;
}

const Message: React.FC<MessageProps> = ({ data, islast }) => {
  const session = useSession();
  const {isReply,removeReplyState,setReplyState}=useMessageReplyState();
  const isOwn = data?.sender?.email === session.data?.user.email;
  const isSeen = data.seenIds?.some((userId) => userId !== session.data?.user?.id);
  const container = clsx(
    "flex w-full px-2 py-1 md:px-4 md:py-2 items-center group",
    isOwn ? "justify-end" : "justify-start"
  );

  const bubble = clsx(
    "relative   rounded-2xl p-3 max-w-xs md:max-w-md break-words shadow-md",
    isOwn ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" : "bg-gray-100 dark:bg-zinc-800 text-black dark:text-white"
  );

  const mediaStyles = "rounded-xl object-cover max-w-full max-h-80 w-full h-auto";

  const Content = ({ data }: { data: Partial<IMessageWithSenderAndSeen> | null }) => {
    if (!data) return null;
    console.log("Data in content", data);
    if (data.isGif && data?.isVideo) {
      return <img src={data?.image ?? ""} className={mediaStyles} alt="GIF" />;
    } else if (data.isVideo) {
      return (
        <>
        <video
          controls
          src={data?.image ?? ""}
          className={mediaStyles}
        />
        <p className="whitespace-pre-wrap">{data?.content}</p>
        </>
      );
    } else if (data?.image) {
      return (
        <>
        <Image
          src={data?.image}
          alt="Image"
          width={300}
          height={300}
          className={mediaStyles}
        />
        <p className="whitespace-pre-wrap">{data?.content}</p>
        </>
      );
    } else if (data.content) {
      return <p className="whitespace-pre-wrap">{data?.content}</p>;
    }
    return null;
  };
  const handleReply = ()=>{
    setReplyState(true, data.id,(isOwn?"Replying to yourself":`Replying to ${data.sender?.name}`),data.content ?`${data.content}`:"Media");
   }
    
  return (
    <div key={data.id} className={container}>
 {isOwn && (
         <div className="flex justify-end gap-2 mt-2 text-xs opacity-0 group-hover:opacity-70 transition delay-150 duration-300 ease-in-out">

   <Menu size={18} />
   <Reply size={18} onClick={handleReply}/>
   <Smile size={18} />
   </div>
 )
 }      
      {!isOwn && (
        <div  className="flex flex-col items-center mr-2 text-wrap">
          <Image
            src={data.sender?.image ?? DefaultProfile}
            alt={data.sender?.name ?? "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      )}
<div className="flex flex-col ">
{
  (data.replyToMessageId && data.replyToMessage) && (

<div className={twMerge(bubble, 'opacity-50   z-10')}>
 <Content data={data.replyToMessage} />
</div>
  )
}

      <div  className={twMerge(bubble,"z-50")}>
     
        <Content data={data} />
        <CheckCheck
  className={`${
    (isOwn && isSeen) ? 'text-sky-500' : 'text-white'
  } w-4 h-4 absolute bottom-1 right-2`}
  size={15}
/>

      </div>
      {!isOwn && (
        <div className="flex justify-end gap-2 mt-2 text-xs opacity-0 group-hover:opacity-70 transition delay-150 duration-300 ease-in-out">
   <Menu size={18} />
   <Reply size={18} onClick={handleReply} />
   <Smile size={18} />
   </div>
 )
 }  
    </div>
</div>

  );


};

export default Message;
