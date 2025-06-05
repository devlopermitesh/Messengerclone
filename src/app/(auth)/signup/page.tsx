import { Authoptions } from "@/app/api/auth/[...nextauth]/option";
import Signup from "@/components/Form/Signup";
import LogoComponent from "@/components/Header/Logo";
import { getServerSession } from "next-auth";
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

<Signup/>

</div>)
}
export default page;