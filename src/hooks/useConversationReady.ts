import { User } from "@prisma/client";
import { create } from "zustand";

interface useConversationReadyProps {
  listusers: User[];
  adduser: (user: User) => void;
  removeuser: (userId: string) => void;
}

const useConversationReady = create<useConversationReadyProps>((set) => ({
  listusers: [],

  adduser: (user) =>
    set((state) => {
      // Check if user already exists by ID
      const exists = state.listusers.some((u) => u.id === user.id);
      if (exists) return state; // If already exists, return current state
      return {
        listusers: [...state.listusers, user],
      };
    }),

  removeuser: (userId) =>
    set((state) => ({
      listusers: state.listusers.filter((user) => user.id !== userId),
    })),
}));

export default useConversationReady;
