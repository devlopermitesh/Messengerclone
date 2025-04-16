import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb";
import ServerAuth from "@/libserver/serverAuth";
export async function GET(request: NextRequest) {
try {
    const currentUser = await ServerAuth(request);
    if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
        return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
    }
    const Contacts = await prismadb.chat.findMany({
        orderBy:{
            lastMessageAt: "desc",
        },
        where: {
            AND: [
                {
             userIds: {
                    has: currentUser.id,
                },
        },
        {
            isPending:false
        },
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
    const filteredContacts = Contacts.filter(
        (chat) => !chat.hiddenForUserIds?.includes(currentUser.id)
      );
      
    return NextResponse.json({ success: true, data: filteredContacts ?? [] }, { status: 200 });
} catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: "Something went wrong! Please try again later." }, { status: 500 });
}
}