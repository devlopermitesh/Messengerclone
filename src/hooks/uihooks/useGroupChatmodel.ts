"use client"

import {create} from "zustand";

interface GroupChatmodel {
    isOpen: boolean;
    onOpen: () => void;
    onClose:()=>void;
}

export const useGroupChatmodel=create<GroupChatmodel>((set)=>({isOpen:false,onOpen:()=>set({isOpen:true}),onClose:()=>set({isOpen:false})}))