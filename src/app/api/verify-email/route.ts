
import { NextResponse,NextRequest } from 'next/server';
import prismadb from "@/libserver/prismadb"
export async function POST(request: NextRequest) {
    try {
        const {token} = await request.json();
        if (!token) {
           return NextResponse.json({success:false,error:"Invalid Token!!"},{status:400})
        }
        const verificationToken = await prismadb.verificationToken.findUnique({
            where: { token: token as string },
            include: { user: true },
        });
        if (!verificationToken || verificationToken.expires < new Date()) {
            return NextResponse.json({success:false,error:"token is expire please try again"},{status:402})
        }
        await prismadb.user.update({
            where: { id: verificationToken.identifier },
            data: { verified: true },
        });
        return NextResponse.json({success:true, message: 'email is verified!'},{status:200});
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({success:false,error:"Something went wrong ! try again latter" }, { status: 500 });
    }
}