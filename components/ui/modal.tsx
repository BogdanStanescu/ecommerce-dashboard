"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface IModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: IModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => !isOpen && onClose()}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <Separator />
          <DialogDescription className="pt-1">{description}</DialogDescription>
        </DialogHeader>

        <>{children}</>
      </DialogContent>
    </Dialog>
  );
};
