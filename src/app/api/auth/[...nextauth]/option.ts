import {NextAuthOptions, User as NextAuthUser, Session} from "next-auth"


import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcryptpass from "@/Helpers/bcryptpass";
import prismadb from "@/libserver/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const Authoptions:NextAuthOptions={
    providers:[
        Credentials({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "Password", type: "password" }
              },

              async authorize(credentials):Promise<any>{;

                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email or Password is Requeired")
                }
                try {
                  const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                  
                  })

                    if(!user || !user.hashedPassword){

                        throw new Error("no user found with this username");
                    }
                    if(!user.verified){
                        throw new Error("please verify your accound first!")

                    }
                 
                 

                    const isPasswordCorrect = await bcryptpass.comparePassword(credentials.password, user.hashedPassword);
                    if(isPasswordCorrect){
                        const { hashedPassword, ...filteredUser } = user;
                        return filteredUser;
                    }
                    else{
                        throw new Error("Incorrrect password")
                    }

                } catch (err:any) {
                    throw new Error(err)
                    
                }


              }
        }),
           // Google Provider (for Google login)
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
            params: {
              scope: "openid email profile" // ✅ Ensure 'profile' is included
            }
          }
       
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        authorization: {
            url: 'https://www.facebook.com/v12.0/dialog/oauth',
            params: {
              scope: 'email', 
            },
          },
      }),
    ],
 
    adapter: PrismaAdapter(prismadb), 
    callbacks: {
        async signIn({ user }) {
          try {
            if (user.email) {
              const dbUser = await prismadb.user.findUnique({
                where: { email: user.email },
              });
    
              if (dbUser) {
                if (!dbUser.verified) {
                  await prismadb.user.update({
                    where: { id: dbUser.id },
                    data: { verified: true },
                  });
                  console.log(`User ${user.email} marked as verified.`);
                }
              } else {
                console.log(`User with email ${user.email} not found in the database.`);
              }
            }
            return true; 
          } catch (error) {
            console.error("Error in signIn callback:", error);
            return false; 
          }
        },
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id ;
            token.email = user.email;
          }
          return token;
        },
        async session({ session, token }) {
          if (token && session.user) {
            session.user.id = token.id as string;
            session.user.email = token.email;
          }
          return session;
        },
      },      
    pages:{
        signIn:'/login'
    },
    session:{
        strategy: "jwt", 
    },
    debug: true,
    secret:process.env.NextAUTH_SECRET
}