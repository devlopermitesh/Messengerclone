import cryptoUtils from '@/Helpers/cryptoUtils';
import { NextRequest, NextResponse } from 'next/server';
import prismadb from "@/libserver/prismadb"
import bcryptpass from '@/Helpers/bcryptpass';
export async function POST(request: NextRequest) {
    try {
        const body=await request.json()
        const {token,password}=body
        console.log(body)
        if(!token || !password){
            return NextResponse.json({success:false,error:"Password and token are Required!"},{status:400})
        }
        const hashedToken = cryptoUtils.hashToken(token);
        const verificationToken = await prismadb.verificationToken.findUnique({
            where: { token: hashedToken },
            include: { user: true },
        });
      if(!verificationToken || verificationToken.expires  < new Date()){
    
        return NextResponse.json({success:false,error:" token are expired!"},{status:400})
      }
      const hashedPassword=await bcryptpass.hashPassword(password)
      await prismadb.user.update({where:{id:verificationToken.user.id},data:{hashedPassword}})
         // Delete the reset token from the database
         await prismadb.verificationToken.delete({
            where: { id: verificationToken.id },
          });
      console.dir(verificationToken.user)
      console.log("new password is ",password)
      return NextResponse.json({success:true,messange:"Password update succesfully!"},{status:200})

    } catch (error) {
        
    }

}