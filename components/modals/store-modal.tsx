"use client";

import axios from "axios";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "../ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().trim().min(1, "Store name is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [storeId, setStoreId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (storeId) {
      window.location.assign(`/${storeId}`);
    }
  }, [storeId]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);

      if (response.status === 200) {
        setStoreId(response.data.id);
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        closeButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage your products & categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 pt-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="E-Commerce"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex items-center justify-end pt-6 space-x-2">
              <Button
                disabled={isLoading}
                variant="ghost"
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>

              <Button disabled={isLoading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
