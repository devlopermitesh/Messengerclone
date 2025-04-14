"use client";
import { create } from "zustand";

interface ThreadState {
  threadId: string | undefined;
  setThreadId: (id: string | undefined) => void;
}

const useThreadStore = create<ThreadState>((set) => ({
  threadId: undefined,
  setThreadId: (id) => set({ threadId: id }),
}));

export default useThreadStore;
