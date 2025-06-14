"use client"
import ChatBox from "@/components/Common/chatBox";
import ChatContent from "@/components/Common/ChatContent";
import ChatList from "@/components/Common/chatlistbox";
import MessageContent from "@/components/Common/MessageContent";
import { Button } from "@/components/ui/button";
import useGetRequest from "@/hooks/GetRequestchat";
import useMenuStore from "@/hooks/uihooks/useMenustate";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { pusherclient } from "@/lib/pusher";
import { Columns2, PanelLeftClose,} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

const Home = () => {
  const session=useSession();
  const {data,isLoading,error,mutate}=useGetRequest()
  const notification=useNotificationStore();
  const {dashboardMenuOpen:isDashboardopen,toggleDashboardMenu}=useMenuStore()
 
  useEffect(()=>{
  const Requestnotifications=notification.selectbyType("Request")
  Requestnotifications.forEach((requestnotification)=>{
    notification.update(requestnotification.id,{read:true})
  })
  },[session.data?.user.id])

  useEffect(()=>{
    if(!session.data?.user.id) return ;
pusherclient.subscribe(session.data?.user.id)
const handleRequest=(chatExits:any)=>{
  console.log("Chat exits",chatExits)
mutate((prev:any)=>{
 const requestchats=prev.data;
 return {
   ...prev,
   data:requestchats.filter((current:any)=>current.id!==chatExits.id)
 }
},{revalidate:false})
}
pusherclient.bind("chatreqest:acceptedFor",handleRequest)
pusherclient.bind("chatreqest:blockedFor",handleRequest)
return()=>{
  pusherclient.unbind("chatreqest:acceptedFor",handleRequest)
  pusherclient.unbind("chatreqest:blockedFor",handleRequest)

pusherclient.unsubscribe(session.data.user.id ??"")

}


  },[mutate,session.data?.user.id])

  return (
    <div className="flex flex-row w-full  px-4 gap-10 mt-5 h-full">  
      <div className={twMerge("flex-1  h-[calc(100%-1.25rem)] bg-white shadow-md rounded-lg mx-auto")}>
        <ChatList>
            <div className="font-bold text-2xl flex flex-row justify-between capitalize">
            <span className="flex items-center px-2 ">
              <Columns2 size={23} onClick={toggleDashboardMenu} className={`text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:hidden  hover:bg-[#bcc0c4] rounded-full  ${(isDashboardopen)?"hidden":"inline"} `} />
              
              <PanelLeftClose
                size={23} onClick={toggleDashboardMenu} className={`text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 lg:hidden  hover:bg-[#bcc0c4] rounded-full  ${(isDashboardopen)?"inline":"hidden"} `} />
 <h1 className="ml-2">Request</h1>
              </span>
          
            </div>
            <div className="font-bold text-lg w-full  flex flex-row justify-between border rounded-full overflow-hidden mt-10 space-x-10 ">
            <div className="flex-1 hover:bg-gray-200 py-2 rounded-full border-t-none border-b-none bg-gray-100 cursor-pointer text-center text-zinc-500">you may know
            </div>
             <div className="flex-1 hover:bg-gray-200 py-2 rounded-full  border-t-none border-b-none bg-gray-100 cursor-pointer  text-center text-zinc-500">Spams
            </div>
            </div>
<ChatContent data={data?.data ||[]}/>
<Button className="text-white text-lg font-semibold bg-sky-600 hover:bg-sky-700 rounded-md px-6 py-6 mx-auto">See Who can Message you</Button>
        </ChatList>
      </div>
      <div className={twMerge("flex-2  h-[calc(100%-1.25rem)] bg-white rounded-lg mx-auto hidden lg:flex")}>
        <ChatBox>
      <MessageContent data={null}/>
        </ChatBox>
      </div>
      
    </div>
  );
};

export default Home;
