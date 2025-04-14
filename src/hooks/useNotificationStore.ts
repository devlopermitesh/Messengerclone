import { useEffect } from 'react';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { pusherclient } from '@/lib/pusher';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
// 🔔 Notification Type
export type Notification = {
  id: string;
  title: string;
  message?: string;
  type?: 'Request' | 'newinbox' | 'newMessage' | 'warning';
  createdAt?: Date;
  read?: boolean;
};

type NotificationState = {
  notifications: Notification[];
  selected: string[];
  push: (notification: Notification) => void;
  pushMany: (notifications: Notification[]) => void;
  update: (id: string, updatedFields: Partial<Notification>) => void;
  remove: (id: string) => void;
  clearAll: () => void;
  select: (id: string) => void;
  selectbyType:(type:string)=>Notification[];
  selectAll: () => void;
  deselect: (id: string) => void;
  deselectAll: () => void;
};

export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set, get) => ({
        notifications: [],
        selected: [],

        push: (notification) =>
          set((state) => ({
            notifications: [notification, ...state.notifications],
          })),

        pushMany: (notifications) =>
          set((state) => ({
            notifications: [...notifications, ...state.notifications],
          })),

        update: (id, updatedFields) =>
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, ...updatedFields } : n
            ),
          })),

        remove: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
            selected: state.selected.filter((selId) => selId !== id),
          })),

        clearAll: () => set({ notifications: [], selected: [] }),

        select: (id) =>
          set((state) => ({
            selected: state.selected.includes(id)
              ? state.selected
              : [...state.selected, id],
          })),
          selectbyType: (type: string) => {
            return get().notifications.filter((notification) => notification.type === type);
          }          
            ,
        selectAll: () =>
          set((state) => ({
            selected: state.notifications.map((n) => n.id),
          })),

        deselect: (id) =>
          set((state) => ({
            selected: state.selected.filter((selId) => selId !== id),
          })),

        deselectAll: () => set({ selected: [] }),
      }),
      {
        name: 'notification-store',
      }
    )
  )
);

export const usePusherNotificationSync = () => {
  const session = useSession();
  const push = useNotificationStore((s) => s.push);

  useEffect(() => {
    const useremail = session.data?.user?.email;
    if (!useremail) return;

    pusherclient.subscribe(useremail);

    const handleNewRequestNotification = (notification:any) => {
      alert("New Notification ");
      console.log("New Notification ",notification);
      // push(notification);
      //intiator id ==notification.user.filter
      const requestIdby=notification.initiatorId
      const isOwn=requestIdby==session.data?.user.id;
      const requestBy=notification.user.find((user:any)=>user.id===requestIdby)
      

 const pushcustomnotification:Notification ={
id: uuidv4(),
title: isOwn?`Chat request send ~`:`Chat Request Received from ${requestBy.name ?? 'User'}`,
message: isOwn?`waiting for other user to accept chat!`:`${requestBy.name ?? 'This user'} wants to start a conversation with you.`,
type:"Request",
createdAt:notification.createdAt,
read:false
}
toast.info(`${pushcustomnotification.title} — ${pushcustomnotification.message}`, {
  icon: '💬',
  duration: 2000,
  style: {
    borderRadius: '8px',
    background: '#1f1f1f',
    color: '#fff',
  },
});
      push(pushcustomnotification)
    };

    pusherclient.bind('notification:new:requestchat', handleNewRequestNotification);
    // pusherclient.bind('notification:accept:requestchat', handleNewRequestNotification);

    return () => {
      pusherclient.unbind('notification:new:requestchat', handleNewRequestNotification);
      pusherclient.unsubscribe(useremail);
    };
  }, [session.data?.user?.id]);
};
