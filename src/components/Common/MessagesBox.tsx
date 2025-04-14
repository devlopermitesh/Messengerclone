import useMessages, { IMessageWithSenderAndSeen } from "@/hooks/useMessages"
import useThreadStore from "@/hooks/useThreadStore"
import { useEffect, useRef } from "react"
import Message from "./Message"
import axios from "axios"
import { pusherclient } from "@/lib/pusher"

const MessagesBox=()=>{
  const activeId=useThreadStore((state)=>state.threadId)
  const BottomMessage=useRef<HTMLDivElement>(null)
  const {Messages,error,isLoading,mutate}=useMessages({activeId})
  useEffect(() => {
    if (!activeId) return;
  
    async function SendSeen() {
      try {
        await axios.post(`/api/t/${activeId}/seen`);
      } catch (error) {
        console.error("Seen Error", error);
      }
    }
  
    // seen jab open kare tab bhi bhejna
    SendSeen();
  
    const messageshandler = async (Messageresponse: any) => {
      const newMessage = Messageresponse;
  
      mutate((prev: { messages: IMessageWithSenderAndSeen[] } | undefined) => {
        const messages = prev?.messages || [];
        const exists = messages.some((msg) => msg.id === newMessage.id);
        if (exists) return prev;
  
        return { ...prev, messages: [...messages, newMessage] };
      }, { revalidate: false });
  
      BottomMessage.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    const updatehandler = async (Messageresponse: any) => {
      const newMessage = Messageresponse;
  
      mutate((prev: { messages: IMessageWithSenderAndSeen[] } | undefined) => {
        const messages = prev?.messages || [];
        return {
          ...prev,
          messages: messages.map((current) => {
            if (current.id === newMessage.id) {
              return newMessage;
            }
            return current;
          })
        };
      }, { revalidate: false });
  
      BottomMessage.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    pusherclient.subscribe(String(activeId));
    pusherclient.bind("new:Message", messageshandler);
    pusherclient.bind("update:message", updatehandler);
  
    return () => {
      pusherclient.unbind("new:Message", messageshandler);
      pusherclient.unbind("update:message", updatehandler); //was wrong before
      pusherclient.unsubscribe(String(activeId));
    };
  }, [activeId, mutate]);
  
  return(
    <div className="flex flex-col space-y-2 w-full flex-grow overflow-y-scroll">
      {(Messages && Message.length>0) && Messages.map((message, i) => (
  <Message
  key={message.id}
    islast={i === Messages.length - 1}
    data={message}
  />
))}

<div ref={BottomMessage} className="pt-20">

</div>
  </div>
)
}

export default MessagesBox
