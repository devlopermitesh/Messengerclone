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

    // ✅ Update chat to hide for current user
    const chat = await prismadb.chat.update({
      where: { id: requestId },
      data: {
        hiddenForUserIds: {
          push: currentUser.id
        }
      }
    });

    if (!chat) {
      return NextResponse.json({ success: false, error: "Invalid chat ID." }, { status: 400 });
    }

    // ✅ Pusher Notify (if email exists)
    if (currentUser.email) {
      await pusherserver.trigger(currentUser.email, "hide:requestchat", {
        chatId: requestId,
        hidden: true
      });
    }
// Notify current user about the new Requested chat is  block
if(currentUser.email){
  await pusherserver.trigger(currentUser?.email,"chatreqest:blockedBy",chat)
  await pusherserver.trigger(chat.initiatorId,"chatreqest:blockedFor",chat)
}
    return NextResponse.json({ success: true, message: "Chat blocked successfully." });

  } catch (error) {
    console.error("[HIDE_CHAT_ERROR]", error);
    return NextResponse.json({ success: false, error: "Something went wrong!" }, { status: 500 });
  }
}
