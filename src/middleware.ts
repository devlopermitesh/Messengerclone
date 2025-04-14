import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const publicPaths = ["/", "/login", "/signup", "/more", "/forget-password", "/verify", "/reset-password", "/resend-verification"];

  const isPublicRoute = publicPaths.includes(req.nextUrl.pathname);

  if (token && isPublicRoute) {
    console.log("✅ Logged in user on public route → Redirecting to /t");
    return NextResponse.redirect(new URL("/t", req.url));
  }

  if (!token && !isPublicRoute) {
    console.log("🚫 User not logged in → Redirecting to /login", req.nextUrl.pathname);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"], // ✅ blocks only frontend UI pages
};
