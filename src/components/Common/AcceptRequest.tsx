import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";

interface AcceptRequestProps {
  username: string;
  activeId?:string;
}

const handleAccept=async(activeId?:string)=>{
try {
    if(!activeId) return null;
    const response=await axios.post(`/api/request/${activeId}/accept`);

    if (response.data.success) {
        toast.success(response.data.message, {
          duration: 3000,
          style: {
            backgroundColor: "green", 
            color: "white", 
            borderRadius: "8px",
          },
        });
      } else {
        toast.error(response.data.error || "Verification failed", {
          duration: 3000,
          style: {
            backgroundColor: "red", 
            color: "white", 
            borderRadius: "8px",
          },
        });
      }

} catch (error) {
    console.log(error);
    toast.error("An unexpected error occurred. Please try again.", {
        duration: 3000,
        style: {
          backgroundColor: "red", 
          color: "white", 
          borderRadius: "8px",
        },
      });
}
}


const handleBlock=async(activeId?:string)=>{
    try {
        if(!activeId) return null;
        const response=await axios.post(`/api/request/${activeId}/block`);
    
        if (response.data.success) {
            toast.success(response.data.message, {
              duration: 3000,
              style: {
                backgroundColor: "green", 
                color: "white", 
                borderRadius: "8px",
              },
            });
          } else {
            toast.error(response.data.error || "Verification failed", {
              duration: 3000,
              style: {
                backgroundColor: "red", 
                color: "white", 
                borderRadius: "8px",
              },
            });
          }
    
    } catch (error) {
        console.log(error);
        toast.error("An unexpected error occurred. Please try again.", {
            duration: 3000,
            style: {
              backgroundColor: "red", 
              color: "white", 
              borderRadius: "8px",
            },
          });
    }
    }
const AcceptRequest: React.FC<AcceptRequestProps> = ({ activeId,username }) => {
  return (
    <div className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Accept Messages from {username}
      </h2>
      <p className="text-gray-600 mb-4 text-center">
        Do you want to accept messages from this user? If yes, click Accept;
        otherwise, block the chat.
      </p>
      <div className="flex space-x-4">
        <Button onClick={()=>handleAccept(activeId)} className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:from-pink-600 hover:to-yellow-600 transition-colors duration-300">
          Accept Messages
        </Button>
        <Button onClick={()=>handleBlock(activeId)}  className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300">
          Block Chat
        </Button>
      </div>
    </div>
  );
};

export default AcceptRequest;
