import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb"
import { pusherserver } from "@/lib/pusher";
export async function POST(req:NextRequest,context: { params: { threadId: string } }){
    try {
        const currentUser=await ServerAuth(req);
         if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
            return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
        }
        //is there  conversation Id
        const { threadId } = (await context.params);
        //find chat by threadID
        const Chat=await prismadb.chat.findUnique({where:{
            id:threadId
        },
        include:{
        messages:{
            include:{
                seen:true
            }
        },
        user:true
        }
    })
    if(!Chat){
        return NextResponse.json({success:false,error:"invalid chat Id "},{status:400})
    }
    //find last message here
    const lastmessage=Chat?.messages[Chat?.messages.length-1]
    if(!lastmessage){
return NextResponse.json({data:Chat},{status:200})
    }
    // update last message of  chat 
const updatedMessage=await prismadb.message.update({where:{
    id:lastmessage.id
},
data:{
   seen:{
    connect:{
        id:currentUser.id
    }
   } 
},
})
//on update message  return updatedateMessage
if(currentUser.email){
    await pusherserver.trigger(currentUser.email,"update:messages",{
        id:threadId,
        messages:[updatedMessage]
    })

}
//if message is unseen
if(lastmessage.seenIds.indexOf(currentUser.id)==-1){
    return NextResponse.json({data:Chat},{status:200})

}
//message is seen
await pusherserver.trigger(threadId,"update:message",updatedMessage)
console.log("updateMessage",updatedMessage)
return NextResponse.json({data:updatedMessage},{status:200})
} catch (error) {
        console.log(error)
        return NextResponse.json({ success: true, error: "Something went wrong." }, { status: 500 });

    }
}