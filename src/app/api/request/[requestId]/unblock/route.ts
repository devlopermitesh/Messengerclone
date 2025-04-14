import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb";
import { pusherserver } from "@/lib/pusher";

export async function POST(req: NextRequest, context: { params: { requestId: string } }) {
  try {
    const currentUser = await ServerAuth(req);

    // ✅ Authorization Check
    if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
      return NextResponse.json({ success: false, error: "Unauthorized request!" }, { status: 401 });
    }

    const { requestId } = context.params;

    const chat = await prismadb.chat.findUnique({
        where: { id: requestId },
      });
      
    if (!chat) {
      return NextResponse.json({ success: false, error: "Invalid chat ID." }, { status: 400 });
    }
    //Filter out the id from hiddenForUserIds
    const updatedHiddenForUserIds = chat?.hiddenForUserIds.filter(userId => userId !== currentUser.id);
    // Update the chat
    const updatedChat = await prismadb.chat.update({
    where: { id: requestId },
      data: {
        hiddenForUserIds: updatedHiddenForUserIds,
           },
       });

    // ✅ Pusher Notify (if email exists)
    if (currentUser.email) {
      await pusherserver.trigger(currentUser.email, "unhide:requestchat", {
        chatId: requestId,
        hidden: false
      });
    }
// Notify current user about the new Requested chat is  block
    return NextResponse.json({ success: true, message: "Chat unblocked successfully." });

  } catch (error) {
    console.error("[HIDE_CHAT_ERROR]", error);
    return NextResponse.json({ success: false, error: "Something went wrong!" }, { status: 500 });
  }
}
