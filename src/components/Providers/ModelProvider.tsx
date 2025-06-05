"use client"

import React, { useEffect } from 'react'
import RestrictedListProvider from './RestrictedlistProvider'
import DeleteChatProvider from './DeleteChatProvider'
import GroupChatProvider from './GroupchatProvider'
import ProfileSettingProvider from './ProfileSettingProvider'

const ModalProvider = () => {
    const [isMounted,setIsMounted]=React.useState(true)
useEffect(()=>setIsMounted(true),[])

    if(!isMounted) return null

  return (<>
  <RestrictedListProvider/>
  <DeleteChatProvider/>
  <GroupChatProvider/>
  <ProfileSettingProvider/>
       </>
  )
}

export default ModalProvider