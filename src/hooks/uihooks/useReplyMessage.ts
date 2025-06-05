import { create } from "zustand";

interface MessageState{
isReply: boolean;
replyToMessageId: string | null;
receiverofMessage:string | null;
replyToMessageContent?: string | null;
setReplyState: (isReply: boolean, replyToMessageId: string | null,receiverofMessage:string|null,replyToMessageContent:string|null) => void;
removeReplyState: () => void;
}

const useMessageReplyState = create<MessageState>((set) => ({
    isReply: false,
    replyToMessageId: null,
    receiverofMessage: null,
    replyToMessageContent: null,
    setReplyState: (isReply, replyToMessageId,receiverofMessage,replyToMessageContent) => set({ isReply, replyToMessageId ,receiverofMessage,replyToMessageContent}),
    removeReplyState: () => set({ isReply: false, replyToMessageId: null })
}));
export default useMessageReplyState