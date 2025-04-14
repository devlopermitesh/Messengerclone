"use client"
import { useState } from "react";
import Logo from "./Logo"
import NavMenuItem from "./NavMenuItem"
import { ChevronDown } from 'lucide-react';
import MobilemenuItems from "./MobilemenuItems";
import FeaturesMenu from "./FeaturesMenu";
import useMenuStore from "@/hooks/uihooks/useMenustate";

const Navbar=()=>{
    const [isMobileMenuopen, setisMobileMenuopen] = useState(false);
const {featureMenuOpen:IsFeatureopen,toggleFeatureMenu}=useMenuStore();
  const toggleMenu = () => {
    setisMobileMenuopen(!isMobileMenuopen);
  };
    return(

        <>
             <nav className="fixed top-0 left-0 w-full h-16 bg-background/80 backdrop-blur-md border-b z-50 flex flex-row justify-between items-center px-4"> 
        <div className="flex-1 flex flex-row  h-full justify-between items-center flex-wrap
        ">
        
<Logo />
<div
      className="relative w-14 h-14 rounded-md border-2 border-gray-400 mx-2 p-1 lg:hidden flex items-center justify-center cursor-pointer select-none overflow-hidden"
      onClick={toggleMenu}
    >
      <span
        className={`absolute w-10 h-1 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${
          isMobileMenuopen ? 'rotate-45 translate-y-0' : '-translate-y-3'
        }`}
      ></span>

      <span
        className={`absolute w-10 h-1 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${
          isMobileMenuopen ? 'translate-x-20 opacity-0' : 'translate-x-0 opacity-100'
        }`}
      ></span>
      <span
        className={`absolute w-10 h-1 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${
          isMobileMenuopen ? '-rotate-45 translate-y-0' : 'translate-y-3'
        }`}
      ></span>
    </div>

</div>
{/* //menu bar in desktop */}
<div className="hidden lg:flex flex-row gap-2 items-center  flex-2 my-auto">
<span className="flex flex-row items-center justify-center gap-0" onClick={toggleFeatureMenu}><NavMenuItem Label={"Features"} href="/" className="m-0" />    <ChevronDown
      className={`relative top-[1px] mr-1 h-5 w-5 transition duration-200 cursor-pointer  ${IsFeatureopen?"rotate-180":""}`}
    
    /></span>
<NavMenuItem href="/privacy" Label={"Privacy and safety"}/>
<NavMenuItem href="/privacy" Label={"Mobile App"}/>
<NavMenuItem href="/help" Label={"Help Center"}/>
</div>
<NavMenuItem href="/signup" Label={"Sign up"} />

    </nav>

    <MobilemenuItems visible={isMobileMenuopen} />
    {IsFeatureopen && <FeaturesMenu/>}

</>
    )
}

export default Navbar