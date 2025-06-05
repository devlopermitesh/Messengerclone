import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb";
import ServerAuth from "@/libserver/serverAuth";
import { pusherserver } from "@/lib/pusher";
import { User } from "../messages/route";





export async function POST(request: NextRequest) {
    try {
        const currentUser = await ServerAuth(request);
        if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
            return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
        }

        const body = await request.json();
        const {userId,isGroup,title,type,Image}=body
        console.log("userId",...userId.map((id:string)=>({id})))
        console.log("isGroup",isGroup)
        console.log("title",title)
        console.log("type",type)
        console.log("Image",Image)
        if(!userId){
            return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
        }
        if(isGroup && !title ){
            return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
        }
        if(isGroup){
            const newGroup=await prismadb.chat.create({
                data:{
                    name:title,
                    isGroup:true,
                    type:type,
                    Image:Image,
                    initiatorId:currentUser.id,
                    user:{
                        connect:[
                            ...userId.map((id:string)=>({id})),
                        {id:currentUser.id}
                        ]
                    }
                },
                include:{
                    user:true,
                }
            })
// Notify all users about the new Requested Group
await Promise.all(
  newGroup.user.map((user:User) =>
    pusherserver.trigger(user.email!, "new:requestchat", newGroup)
  )
);
            return NextResponse.json({ success: true, data: newGroup }, { status: 200 });
        }
        const existingChat = await prismadb.chat.findMany({
            where: {
              OR: [
                {
                  userIds: {
                    equals: [currentUser.id, userId[0]],
                  },
                },
                {
                  userIds: {
                    equals: [userId[0], currentUser.id],
                  },
                },
              ],
            },
          });
          const singleChat = existingChat[0];
if(singleChat) {
    return NextResponse.json({ success:true, data: existingChat }, { status: 200 });
}          
//create a new conversation
const newChat = await prismadb.chat.create({
    data: {
        initiatorId:currentUser.id,
        user: {
            connect: [
                { id: currentUser.id },
                { id: userId[0] },
            ],
        },
    },
    include: {
        user: true,
    },
})

// Notify all users about the new Requested chat
await Promise.all(
    newChat.user.map((user:User) =>
      pusherserver.trigger(user.email!, "notification:new:requestchat", newChat)
    )
  );
     
return NextResponse.json({ success: true, data: newChat }, { status: 200 });
    } catch (error) {
        
  console.error("❌ Error in chat creation:", error);
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
    }

}