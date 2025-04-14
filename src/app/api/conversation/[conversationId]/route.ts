import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
try {
    const currentUser = await ServerAuth(request);
    if(!currentUser) {
       return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
   }
   

} catch (error) {
    return NextResponse.json({success:false,error:"Something went wrong"},{status:500})
}
}

