"use client";

import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 
        className="animate-spin text-sky-500" 
        size={48} 
        strokeWidth={2} 
      />
    </div>
  );
};

export default Loader;
