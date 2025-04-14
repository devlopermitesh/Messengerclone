import PusherServer from "pusher";
import PusherClient from "pusher-js"

export const pusherserver = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export const pusherclient=new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!,{
    cluster: "ap2",
    authEndpoint: "/api/pusher/auth",
})