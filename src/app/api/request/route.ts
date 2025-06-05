import ServerAuth from "@/libserver/serverAuth"
import { NextRequest, NextResponse } from "next/server"
import prismadb from "@/libserver/prismadb"
export async function GET(req:NextRequest,context:{params:{requestId:string}}){
    try {
        const currentUser=await ServerAuth(req);
        if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
            return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
        }
        const chatexit=await prismadb.chat.findMany({
            orderBy:{
                lastMessageAt:"asc"
            },
            where: {
                AND: [
                    {
                 userIds: {
                        has: currentUser.id,
                    },
            },
            {
                isPending:true
            }
        
        ]
            },
            include: {
                user: true,
                messages:{
                    include:{
                        sender:true,
                        seen:true,
                    }
                }
            },
        })

        if(!chatexit){
return NextResponse.json({success:false,error:"Imvalid chat id "},{status:400})
        }
        const filteredchatexits = chatexit.filter(
            (chat) => !chat.hiddenForUserIds?.includes(currentUser.id)
          );
return NextResponse.json({success:true,data:filteredchatexits},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,error:"Something went wrong!"},{status:500})
    }
}