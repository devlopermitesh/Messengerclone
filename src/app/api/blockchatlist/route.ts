import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb"
export async function  GET(req:NextRequest){
    try {
        const currentUser=await ServerAuth(req);
        if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
            return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
        }
        //find chat blocked by current user
        const blockedchats=await prismadb.chat.findMany({
            orderBy:{
                createAt:"asc"
            },
            where:{
                hiddenForUserIds:{
                    has:currentUser.id
                }
            },
            include:{
              user:true
            }
        })
        return NextResponse.json({success:true,data:blockedchats??[]},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,error:"Something went wrong"},{status:500})
    }

}