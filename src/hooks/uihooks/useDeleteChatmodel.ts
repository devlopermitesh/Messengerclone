"use client"

import {create} from "zustand";

interface DeleteChatmodel {
    isOpen: boolean;
    onOpen: () => void;
    onClose:()=>void;
}

export const useDeleteChatmodel=create<DeleteChatmodel>((set)=>({isOpen:false,onOpen:()=>set({isOpen:true}),onClose:()=>set({isOpen:false})}))