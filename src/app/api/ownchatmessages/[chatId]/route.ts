import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb"
export async function GET(req:NextRequest,  context: { params: { chatId: string } }){
try {
 const currentUser=await ServerAuth(req);
 if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
    return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
}

const { chatId } = (await context.params);
if(!chatId){
    return NextResponse.json({success:false,error:"ChatId is required"},{status:400})
}
const Messages=await prismadb.message.findMany({where:{
ChatId:chatId
},
include:{
 seen:true,
 sender:true,
 replyToMessage:true,
},
orderBy:{
    createAt:"asc"
}
})
return NextResponse.json({success:true,messages:Messages??[]},{status:200})
} catch (error) {
    console.log(error)
    return NextResponse.json({success:false,error:"Something went wrong!"},{status:500})
}
}