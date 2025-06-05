"use client"
import ChatBox from "@/components/Common/chatBox";
import ChatContent from "@/components/Common/ChatContent";
import ChatList from "@/components/Common/chatlistbox";
import MessageContent from "@/components/Common/MessageContent";
import { Button } from "@/components/ui/button";
import useGetRequest from "@/hooks/GetRequestchat";
import { pusherclient } from "@/lib/pusher";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

const Home = () => {
  const session=useSession()
  const {data,error,isLoading,mutate}=useGetRequest()
   const { threadId } = useParams<{ threadId: string }>();
   useEffect(()=>{
     if(!session.data?.user.email) return ;
 pusherclient.subscribe(session.data?.user.email)
 const handleRequest=(chatExits:any)=>{
 mutate((prev:any)=>{
  const requestchats=prev.data;
  return {
    ...prev,
    data:requestchats.filter((current:any)=>current.id!==chatExits.id)
  }
},{revalidate:false})
 }


 pusherclient.bind("chatreqest:acceptedBy",handleRequest)
 pusherclient.bind("chatreqest:blockedBy",handleRequest); //not need use hide event
 return()=>{
 pusherclient.unbind("chatreqest:acceptedBy",handleRequest)
 pusherclient.unbind("chatreqest:blockedBy",handleRequest); //no need use hide event

 pusherclient.unsubscribe(session.data.user.email ??"")
 
 }
 
 
   },[mutate,session.data?.user.email,threadId])
  return (
    <div className="flex flex-row w-full  px-4 gap-10 mt-5 h-full">  
      <div className={twMerge("flex-1  h-[calc(100%-1.25rem)] bg-white shadow-md rounded-lg mx-auto  hidden md:flex")}>
        <ChatList>
            <div className="font-bold text-2xl flex flex-row justify-between capitalize">

            <h1 className="ml-2">Request</h1>
            </div>
            <div className="font-bold text-lg w-full  flex flex-row justify-between border rounded-full overflow-hidden mt-10 space-x-10 ">
            <div className="flex-1 hover:bg-gray-200 py-2 rounded-full border-t-none border-b-none bg-gray-100 cursor-pointer text-center text-zinc-500">you may know
            </div>
             <div className="flex-1 hover:bg-gray-200 py-2 rounded-full  border-t-none border-b-none bg-gray-100 cursor-pointer  text-center text-zinc-500">Spams
            </div>
            </div>
<ChatContent activeChat={threadId} data={data?.data ||[]}/>
<Button className="text-white text-lg font-semibold bg-sky-600 hover:bg-sky-700 rounded-md px-6 py-6 mx-auto">See Who can Message you</Button>
        </ChatList>
      </div>
      <div className={twMerge("flex-2  h-[calc(100%-1.25rem)] bg-white rounded-lg mx-auto  md:flex")}>
        <ChatBox>
      <MessageContent data={data?.data??[]} activeId={threadId}/>
        </ChatBox>
      </div>
      
    </div>
  );
};

export default Home;
