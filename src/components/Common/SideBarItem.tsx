'use client'
import useMenuStore from '@/hooks/uihooks/useMenustate'
import { useNotificationStore } from '@/hooks/useNotificationStore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface SidebarIconProps {
    icon: React.ElementType
    label: string
    active?: boolean
    href: string

}

const SideBarItem: React.FC<SidebarIconProps> = ({ icon: Icon, label,active = false, href }) => {
    const {dashboardMenuOpen}=useMenuStore()
    const notification = useNotificationStore();
    const [noticount, setNotiCount] = useState(0);
    const [unread,setunread]=useState(false);
    
  useEffect(() => {
    const count = notification.selectbyType(label)
    const unreadnotifications=count.filter((notification)=>notification.read==false);
    setunread((unreadnotifications.length >0)?true:false);
    setNotiCount(count.length);

  }, [notification.notifications, label]);
  return (
    <Link
      href={href}
      className={twMerge(`
        relative
        flex 
        justify-center
        lg:justify-start
        items-center 
        w-full gap-x-4 
        text-md font-medium 
        cursor-pointer 
        transition-all 
        rounded-lg 
        py-4
        px-4
        duration-200 
        ease-in-out
        z-50
        text-zinc-900
        hover:bg-[#bcc0c4] 
        hover:text-zinc-900
        ${active ? 'bg-[#bcc0c4] text-black' : 'text-black'}
      `,dashboardMenuOpen && "lg:justify-center")}
    
    >
      <Icon className="text-xl" />

      <span 
        className={twMerge(`transition-opacity duration-300 hidden lg:inline`,dashboardMenuOpen && "lg:hidden")}
      >
        {label}
      </span>
      {
      ((noticount  && noticount >0 ) && unread)?(
        <span className='w-auto h-auto px-2 py-1 bg-red-500 rounded-full absolute top-2 right-2 text-white font-semibold text-xs'>{noticount}</span>
      ):null
     }
    </Link>
  )
}

export default SideBarItem
