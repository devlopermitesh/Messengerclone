"use client"
import { usePathname } from 'next/navigation';
import React, {  useMemo} from 'react'
import Box from './Box';
import { Columns2, Globe, MessageCircle, WandSparkles } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';
import { Archive } from 'lucide-react';
import { Store } from 'lucide-react';
import SideBarItem from './SideBarItem';
// import { useUser } from '@/hook/useUser';
import { twMerge } from 'tailwind-merge';
import useMenuStore from '@/hooks/uihooks/useMenustate';
import ProfileMenu from './ProfileAvatar';
import {  usePusherNotificationSync } from '@/hooks/useNotificationStore';
import useCurrentUser from '@/hooks/useCurrentUser';
interface SidebarProps{
    children: React.ReactNode,


}
const Sidebar:React.FC<SidebarProps> = ({children}) => {
    const pathname = usePathname();
const {data}=useCurrentUser();
usePusherNotificationSync();
    const {dashboardMenuOpen:isDashboardopen,toggleDashboardMenu}=useMenuStore()
    const Route=useMemo(()=>[
     {
        icon:MessageCircle,
         label:"Chats",
         active:pathname=="/t",
         href:"/t",
        
     
     },
     {
      icon:Store,
       label:"Marketplace",
       active:pathname=="/marketplace",
       href:"/marketplace",
    
       
   
   },
   {
    icon:MessageCircleMore,
     label:"Request",
     active:pathname=="/requests",
     href:"/requests",
 

 
 },
 {
  icon:Archive,
   label:"Archive",
   active:pathname=="/archived",
   href:"/archived",



},
{
  icon:WandSparkles,
   label:"Ai chat",
   active:pathname=="/ai-chats",
   href:"/ai-chats",


},
{
  icon:Globe,
   label:"chat Randomly",
   active:pathname=="/randomchats",
   href:"/randomchats",


}
    ],[pathname])
    
  return (
    <div className={twMerge(` flex h-full w-full `)}>
        <div className={twMerge('relative hidden md:flex flex-col  space-y   w-[80px] lg:w-[300px] p-2 ', isDashboardopen && "lg:w-[100px] flex")}>
        <Box className=''>
        <div className={twMerge(
  'flex flex-col gap-y-2', 
  isDashboardopen ? '' : 'lg:px-5 lg:py-4'
)}>

{Route.map((route)=>(<SideBarItem key={route.label}  {...route}></SideBarItem>))}
  </div>
    </Box>
   <div className={`flex absolute bottom-5  w-full   ${(isDashboardopen)?"flex-col":"flex-row items-center "} `}>
<div className={`flex-1 flex   flex-row  gap-2 items-center justify-center `}>
<ProfileMenu Profile={data?.image}/>
<h2 className={twMerge(
  `text-zinc-700 text-lg hidden lg:block`, 
  isDashboardopen ? 'lg:hidden' : 'lg:block'
)}>
  {data?.name || "Default user" }
</h2>
</div>
<Columns2 size={23} onClick={toggleDashboardMenu} className={`text-zinc-900 cursor-pointer mr-2 w-10 h-10 p-2 hidden lg:inline  hover:bg-[#bcc0c4] rounded-full  ${(isDashboardopen)?" mx-auto mr-8":"mx-0"} `} />
   </div>
        </div>
        <main className='h-full flex-1 overflow-y-auto py-2 '>
            {children}
        </main>
    </div>
  )
}

export default Sidebar