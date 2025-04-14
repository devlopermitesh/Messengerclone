"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import LogoComponent from "@/components/Header/Logo";
import axios from "axios";
import { toast } from "sonner";

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // Send the token in the request body (correcting the way we pass it)
          const response = await axios.post("/api/verify-email", { token });

          if (response.data.success) {
            setStatus('success');
            toast.success(response.data.message, {
              duration: 3000,
              style: {
                backgroundColor: "green", 
                color: "white", 
                borderRadius: "8px",
              },
            });
          } else {
            setStatus('error');
            toast.error(response.data.error || "Verification failed", {
              duration: 3000,
              style: {
                backgroundColor: "red", 
                color: "white", 
                borderRadius: "8px",
              },
            });
          }
        } catch (error: any) {
          setStatus('error');
          toast.error(error?.response?.data?.error || "An unexpected error occurred. Please try again.", {
            duration: 3000,
            style: {
              backgroundColor: "red", 
              color: "white", 
              borderRadius: "8px",
            },
          });
        }
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <LogoComponent className="mb-5" />

      {status === "pending" && <p className="text-lg">Verifying your account...</p>}

      {status === "success" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Verification Successful ✅</h2>
          <p className="text-lg text-gray-600">Your account has been verified.</p>
          <Button 
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Verification Failed ❌</h2>
          <p className="text-lg text-gray-600">Invalid or expired token.</p>
          <Button 
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            onClick={() => router.push("/resend-verification")}
          >
            Resend Verification Email
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
