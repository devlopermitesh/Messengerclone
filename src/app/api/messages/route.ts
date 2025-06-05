import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb"
import { pusherserver } from "@/lib/pusher";
type User = {
    image: string | null;
    name: string | null;
    id: string;
    email: string | null;
    verified: boolean;
    emailVerified: Date | null;
    role: string;
    hashedPassword: string | null;
    createAt: Date;
    updateAt: Date;
    ChatsIds: string[];
    seenMessageIds: string[];
    BlockId: string[];
}
export async function POST(req:NextRequest){
try {
    
 const body=await req.json();
 const {message,image,isVideo,isGif,activeId,isReply,replyToMessageId}=body;
    const currentUser = await ServerAuth(req);
    if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser) || !activeId) {
        return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
    }
    
    const messageData :any= {
      content: message,
      image: image,
      isVideo: isVideo,
      isGif: isGif,
      sender: {
        connect: { id: currentUser.id },
      },
      chat: {
        connect: { id: activeId },
      },
      seen: {
        connect: { id: currentUser.id },
      },
    };
    
    // If it's a reply, include the reference
    if (isReply && replyToMessageId) {
      messageData.replyToMessage= {
        connect: { id: replyToMessageId },
      };
    }

    const newMessage = await prismadb.message.create({
      data: messageData,
      include: {
        seen: true,
        sender: true,
        replyToMessage:true
      },
    });

const updatechat=await prismadb.chat.update({
    where:{
        id:activeId
    },
    data:{
        lastMessageAt:new Date(),
        messages:{
            connect:{
                id:newMessage.id
            }
        }
    },
    include:{
        user:true,
        messages:{
            include:{
                seen:true
            }
        }
    }
})
await pusherserver.trigger(activeId,"new:Message",newMessage)
const lastMessage=updatechat.messages[updatechat.messages.length-1];

// Notify all users about the chat update
await Promise.all(
  updatechat.user.map((user:User) =>
    pusherserver.trigger(user.email!, "chat:update", lastMessage)
  )
);
return NextResponse.json({success:true,data:newMessage},{status:200}) 

} catch (error) {
  console.log(error);
    return NextResponse.json({success:false,error:"Something went wromg"},{status:500}) 
}
}
