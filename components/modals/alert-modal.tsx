"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface IAlertModalProps {
  label: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal = ({
  label,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: IAlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Delete ${label}?`}
      description="Kindly confirm your decision to delete this. Please note that this action is irreversible, and all associated data will be permanently removed."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full flex items-center justify-end space-x-2 pt-6">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
