"use client"

import React, { useEffect } from 'react'
import RestrictedListProvider from './RestrictedlistProvider'
import DeleteChatProvider from './DeleteChatProvider'
import GroupChatProvider from './GroupchatProvider'

const ModalProvider = () => {
    const [isMounted,setIsMounted]=React.useState(true)
useEffect(()=>setIsMounted(true),[])

    if(!isMounted) return null

  return (<>
  <RestrictedListProvider/>
  <DeleteChatProvider/>
  <GroupChatProvider/>
       </>
  )
}

export default ModalProvider