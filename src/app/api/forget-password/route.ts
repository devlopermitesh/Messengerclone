import cryptoUtils from '@/Helpers/cryptoUtils';
import { NextResponse } from 'next/server';
import prismadb from "@/libserver/prismadb"
import emailservice from '@/Helpers/emailservice';
import { ResetEmailTemplate } from '@/Helpers/templates';
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ success:false, error: 'Email is required' }, { status: 400 });
        }
        const user=await prismadb?.user.findUnique({where:{email:email}})
        if(!user){
            return NextResponse.json({success:true,message: "If an account exists, a password reset link has been sent." },{status:200});
        } 
        const ResetToken=cryptoUtils.generateToken()
        const hashedToken=cryptoUtils.hashToken(ResetToken)
        //update in db for verification token
        await prismadb.verificationToken.upsert({
            where: { identifier: user.id },
            update: { 
            token: hashedToken, 
            expires: new Date(Date.now() + 15 * 60 * 1000) 
            },
            create: {
            identifier: user.id,
            token: hashedToken,
            expires: new Date(Date.now() + 15 * 60 * 1000)
            }
        });
        //send email
        const resetUrl = `${process.env.APP_URL}/reset-password?token=${ResetToken}`;
        await emailservice.sendEmail(
          email,
          "Password Reset",
          `Click the following link to reset your password`,
          `${ResetEmailTemplate(resetUrl)}`
        );
        return NextResponse.json({success:true,message: "If an account exists, a password reset link has been sent." },{status:200});

    } catch  {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}