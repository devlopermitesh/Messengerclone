"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import LogoComponent from "@/components/Header/Logo";
import { toast } from "sonner";
import Resetpassword from "@/components/Form/ResetPassword";

const VerifyPage = () => {
  

  return (
<div className="  flex flex-col justify-center items-center w-full h-screen  space-y-5">
     <LogoComponent className="mt-25"/>
<h2 className="text-base sm:text-lg md:text-2xl font-semibold italic font-mono">
  Connect with your favourite people
</h2>
<Resetpassword/>
    </div>
  );
};

export default VerifyPage;
