import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb"
import { pusherserver } from "@/lib/pusher";
export async function POST(req:NextRequest,context:{params:Promise<{requestId:string}>}){
    try {
        const currentUser=await ServerAuth(req);
        if (!currentUser ||  typeof currentUser !== "object" || !("id" in currentUser)) {
            return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
        }
        
    const { params } = context;
    const resolvedParams = await params;
    const { requestId } = resolvedParams;
        const chatexits=await prismadb?.chat.update({where:{id:requestId},data:{
            isPending:false
        },
        include:{
            user:true
        }
    })
if(!chatexits){
return NextResponse.json({success:false,error:"Chat Id is invalid"},{status:400})
}
// Notify current user about the new Requested chat is not more pending 
if(currentUser.email){
    await pusherserver.trigger(currentUser?.email,"chatreqest:acceptedBy",chatexits)
    await pusherserver.trigger(chatexits.initiatorId,"chatreqest:acceptedFor",chatexits)
}
   console.log("chat request is accepted !",currentUser,chatexits)

return NextResponse.json({success:true,message:" chat request is accepted !"},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,error:"Something went wromg!"},{status:500})
    }
}