import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import React from "react";
import { twMerge } from "tailwind-merge";
  
  interface ModalProps {
    isopen: boolean;
    onchange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    size?: string;
    footer?: React.ReactNode;
  }
  
  const Modals: React.FC<ModalProps> = ({
    isopen,
    onchange,
    title,
    description,
    children,
    size,
    footer
  }) => {
    return (
      <Dialog open={isopen} onOpenChange={onchange} >
     
        <DialogContent className={twMerge("sm:max-w-[425px] bg-white",size)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          
          <div className="py-4">
            {children}
          </div>
          
          {footer && (
            <DialogFooter>
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default Modals;
  