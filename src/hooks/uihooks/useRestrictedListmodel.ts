"use client"

import {create} from "zustand";

interface RestrictedlistModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose:()=>void;
}

export const useRestrictedlistmodel=create<RestrictedlistModelStore>((set)=>({isOpen:false,onOpen:()=>set({isOpen:true}),onClose:()=>set({isOpen:false})}))