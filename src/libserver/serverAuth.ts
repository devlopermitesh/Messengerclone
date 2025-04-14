import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import prisma from "./prismadb"; 

const ServerAuth = async (req: NextRequest) => {
    try {
        const session = await getSession({ req: { headers: Object.fromEntries(req.headers) } });
        if (!session || !session.user || !session.user.email) {
            throw new Error("Not authenticated");
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select:{
                id: true,
                name: true,
                email: true,
                image: true,
                verified: true,
                createAt: true,
                updateAt: true,
                role: true,
                ChatsIds: true,
                seenMessageIds: true,
                // ❌ Exclude
                hashedPassword: false,
            }
        });

        if (!currentUser) {
       return null;
        }

        return currentUser;
    } catch (error) {
      
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export default ServerAuth;