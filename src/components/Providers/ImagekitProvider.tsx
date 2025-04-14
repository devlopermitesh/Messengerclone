"use client"
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;

export default function Providers({ children }: { children: React.ReactNode }) {
    const authenticator = async () => {
      try {
        const res = await fetch("/api/auth-imagekit");
        if (!res.ok) throw new Error("Failed to authenticate");
        return res.json();
      } catch (error) {
        console.error("ImageKit authentication error:", error);
        throw error;
      }
    };
    return (
      <SessionProvider refetchInterval={5 * 60}>
          <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
          >
            {children}
          </ImageKitProvider>
      </SessionProvider>
    );
  }