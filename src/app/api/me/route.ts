import { NextResponse, NextRequest } from "next/server";
import ServerAuth from "@/libserver/serverAuth";

export async function GET(req: NextRequest) {
    try {
        const currentUser=await ServerAuth(req)
        return NextResponse.json(currentUser,{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}