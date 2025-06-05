"use client";

import LogoComponent from "@/components/Header/Logo";
import Resetpassword from "@/components/Form/ResetPassword";
import { Suspense } from "react";

const VerifyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col justify-center items-center w-full h-screen space-y-5">
        <LogoComponent className="mt-25" />
        <h2 className="text-base sm:text-lg md:text-2xl font-semibold italic font-mono">
          Connect with your favourite people
        </h2>
        <Resetpassword />
      </div>
    </Suspense>
  );
};

export default VerifyPage;
