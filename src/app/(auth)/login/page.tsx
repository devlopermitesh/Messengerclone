import { Authoptions } from "@/app/api/auth/[...nextauth]/option";
import Login from "@/components/Form/Login";
import LogoComponent from "@/components/Header/Logo";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const page=async()=>{
    const session= await getServerSession(Authoptions)
    if (session) {
      redirect("/t"); 
    }
  
return(
<div className="  flex flex-col justify-center items-center w-full h-full  space-y-5">
<LogoComponent className="mt-15"/>
<h2 className="text-base sm:text-lg md:text-2xl font-semibold italic font-mono">
  Connect with your favourite people
</h2>
<Link href="signup" className="text-gray-600 hover:underline undeline-sky-500">
Don&apos;t have a Account?<b className="text-sky-500"> create Now</b>
</Link>
<Login/>

</div>)
}
export default page;