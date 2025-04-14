import { pusherserver } from "@/lib/pusher";
import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try {
        console.log(process.env.PUSHER_APP_ID!)
console.log( process.env.NEXT_PUBLIC_PUSHER_KEY!)
console.log( process.env.PUSHER_SECRET!)
console.log(process.env.PUSHER_CLUSTER)
        const currentUser=await ServerAuth(req);
        if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
            return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
        }
        const { socket_id, channel_name } = await req.json();
        console.log("socketId",socket_id,"channelName",channel_name)
        const auth = pusherserver.authenticate(socket_id, channel_name, {
            user_id: currentUser.id, // for presence channel
            user_info: {
              name: currentUser.name,
              email: currentUser.email,
            },
          });
        
          return NextResponse.json(auth);
    } catch (error) {
        console.log(error);
        return NextResponse.json({succes:false,error:"Something went wrong!"},{status:500})
    }
}