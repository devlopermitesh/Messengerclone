import ServerAuth from "@/libserver/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/libserver/prismadb";
import { z } from "zod";

// Schema validation for username
const UsernameQuerySchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 characters")
    .max(20, "Username should be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .toLowerCase(),
});

export  async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryparams = { username: searchParams.get("username") };

    // Validate query parameters
    const result = UsernameQuerySchema.safeParse(queryparams);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message: usernameErrors.length > 0 ? usernameErrors.join(", ") : "Invalid username",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;
    if (!username) {
      return NextResponse.json({ success: false, error: "Username is required" }, { status: 400 });
    }

    // Authenticate user
    const currentUser = await ServerAuth(req);
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized request! Please try again later." },
        { status: 401 }
      );
    }

    // Fetch users whose names start with the given username
    const users = await prismadb.user.findMany({
      where: { name: { startsWith: username } },
    });

    return NextResponse.json({ success: true, data: users ?? [] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
