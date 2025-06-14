
import { PrismaClient } from "@prisma/client";

declare global {
  var prismadb: PrismaClient | undefined;
}
declare module "next-auth" {
  interface User {
    id?: string;
  }
    interface Session {
      user: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      }
    }
  
  
  }
