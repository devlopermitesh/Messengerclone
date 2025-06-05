"use client"

import {create} from "zustand";

interface ProfileSettingsModel {
    isOpen: boolean;
    onOpen: () => void;
    onClose:()=>void;
}

export const useProfileSetting=create<ProfileSettingsModel>((set)=>({isOpen:false,onOpen:()=>set({isOpen:true}),onClose:()=>set({isOpen:false})}))