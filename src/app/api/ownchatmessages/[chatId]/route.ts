import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb"


export async function GET(req: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    // Authenticating the user
    const currentUser = await ServerAuth(req);
    if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
      return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
    }

    // Extracting chatId from params
    const { chatId } = params;

    // Validate chatId
    if (!chatId) {
      return NextResponse.json({ success: false, error: "ChatId is required" }, { status: 400 });
    }

    // Fetching messages from the database
    const messages = await prismadb.message.findMany({
      where: {
        ChatId:chatId,
      },
      include: {
        seen: true,
        sender: true,
        replyToMessage: true,
      },
      orderBy: {
        createAt:"asc"
      },
    });

    return NextResponse.json({ success: true, messages: messages ?? [] }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Something went wrong!" }, { status: 500 });
  }
}