"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import DefaultProfile from "@/assets/default.png"
import Image from "next/image";
import { Ban, CircleHelp, Cog, DiamondPlus, Link, LogOut, Logs, Search, TriangleAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRestrictedlistmodel } from "@/hooks/uihooks/useRestrictedListmodel";
import { useState } from "react";

export default function ProfileMenu({Profile}:{Profile:string}) {
  const [open, setOpen] = useState(false);
 const {onOpen}=useRestrictedlistmodel()
  return (
  
 

        <DropdownMenu open={open} onOpenChange={setOpen} >
          <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer w-12 h-12 lg:w-12 lg:h-12 mt-auto mx-auto lg:mx-auto'>
  <AvatarImage src={Profile} alt="@shadcn" className="object-cover" />
  <AvatarFallback>
  <Image 
  src={DefaultProfile} 
  alt="User Image" 
  height={100} 
  width={100} 
  className="w-full h-full object-cover" 
/>

  </AvatarFallback>
</Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 left-20 space-y-3">
            <DropdownMenuGroup>
          
              <DropdownMenuItem className=" text-xl text-black font-semibold" >
              <Cog  size={20} className="w-5 h-5 font-semibold text-black"  />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>{
               setOpen(false) //first close overlay of dropdown menu
               onOpen()//open Model with restricted list
              }} className=" text-xl text-black font-semibold" >
              <Ban  size={20} className="w-5 h-5 font-semibold text-black"  />
              Restricted Accounts
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className=" text-xl text-black font-semibold" >
              <CircleHelp size={20} className="w-5 h-5 font-semibold text-black"  />
              Help</DropdownMenuItem>
              <DropdownMenuSub >
                <DropdownMenuSubTrigger className=" text-lg text-black font-semibold" >
                <DiamondPlus size={20} className="w-5 h-5 font-semibold text-black mr-2"  />
                Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className=" text-md text-black font-semibold" >
                    <Link  size={13} className="w-5 h-5 font-semibold text-black mr-2"  />
                    Invite link</DropdownMenuItem>
                    <DropdownMenuItem className=" text-md text-black font-semibold" >
                    <Search size={13} className="w-5 h-5 font-semibold text-black mr-2"  />
                    Search by name</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className=" text-xl text-black font-semibold" >
              <TriangleAlert size={20} className="w-5 h-5 font-semibold text-black"  />
               Report a Problem
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=" text-xl text-black font-semibold">
            <Logs size={20} className="w-5 h-5 font-semibold text-black"  />
            Terms</DropdownMenuItem>

            <DropdownMenuItem className=" text-xl text-black font-semibold">
            <Logs size={20} className="w-5 h-5 font-semibold text-black"  />
            Privacy Policy</DropdownMenuItem>
            <DropdownMenuItem className=" text-xl text-black font-semibold">
            <Logs size={20} className="w-5 h-5 font-semibold text-black"  />
            Cookies Policy</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className=" text-xl text-black font-semibold" onClick={()=>signOut()}>

            <LogOut size={20} className="w-5 h-5 font-semibold text-black text-zinc-900 cursor-pointer w-10 h-10 lg:inline  hover:bg-[#bcc0c4] rounded-full" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    
