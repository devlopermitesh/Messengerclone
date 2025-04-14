import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import React from "react";
  
  interface ModalProps {
    isopen: boolean;
    onchange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
  }
  
  const Modals: React.FC<ModalProps> = ({
    isopen,
    onchange,
    title,
    description,
    children,
    footer
  }) => {
    return (
      <Dialog open={isopen} onOpenChange={onchange} >
     
        <DialogContent className="sm:max-w-[425px] bg-white">
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
  