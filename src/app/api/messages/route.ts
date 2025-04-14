import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb"
import { pusherserver } from "@/lib/pusher";
export async function POST(req:NextRequest){
try {
    
 const body=await req.json();
 const {message,image,isVideo,isGif,activeId}=body;
    const currentUser = await ServerAuth(req);
    if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser) || !activeId) {
        return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
    }
const newMessage=await prismadb.message.create({
    data:{
        content:message,
        image:image,
        isVideo:isVideo,
        isGif:isGif,
        sender:{
            connect:{
                id:currentUser.id
            }
        },
        chat:{
            connect:{
                id:activeId
            }
        },
        seen:{
            connect:{
                id:currentUser.id
            }
        },
        
    },
    include:{
            seen:true,
            sender:true
    }
})

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
console.log("newMessag",newMessage)
await pusherserver.trigger(activeId,"new:Message",newMessage)
const lastMessage=updatechat.messages[updatechat.messages.length-1];

// Notify all users about the chat update
await Promise.all(
  updatechat.user.map((user) =>
    pusherserver.trigger(user.email!, "chat:update", lastMessage)
  )
);
return NextResponse.json({success:true,data:newMessage},{status:200}) 

} catch (error) {
    return NextResponse.json({success:false,error:"Something went wromg"},{status:500}) 
}
}
