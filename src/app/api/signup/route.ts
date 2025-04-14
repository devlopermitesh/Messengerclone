import { NextRequest, NextResponse } from 'next/server';
import prismadb from "@/libserver/prismadb"
import bcryptpass from '@/Helpers/bcryptpass';
import emailservice from '@/Helpers/emailservice';
import cryptoUtils from '@/Helpers/cryptoUtils';
export async function POST(request: NextRequest) {
    try {
        const {username,email,password}=await request.json()
        console.log("username",username)
  if(!username || !email || !password){
    return NextResponse.json({ success: false, error:"All field are required"},{status:400})
}
//searcch for already email user
const avaiableuser=await prismadb.user.findUnique({where:{email:email}})
if(avaiableuser){
    return NextResponse.json({success: false, error:"A user account with this email already exists."},{status:400})
}


const hashedPassword=await bcryptpass.hashPassword(password)
const verificationToken = cryptoUtils.generateToken();
//create use
const newuser=await prismadb?.user.create({
   data:{
       name:username,
       email,
       hashedPassword,
       emailVerified:new Date(), 
   }
})
await prismadb.verificationToken.create({
    data:{
        token:verificationToken,
        identifier:newuser.id,
        expires:new Date(Date.now() + 1000 * 60 * 60 * 24),
    }})
    await emailservice.sendVerificationEmail(email, verificationToken);
    console.log("verification email sent to",email)
return NextResponse.json({ success: true, message: "Account created successfully! Please check your email to verify your account." }, { status: 200 });
     

    } catch (error) {
        console.error('Error in signup route:', error);
        return NextResponse.json({ error: 'Failed to process signup request' }, { status: 500 });
    }
}