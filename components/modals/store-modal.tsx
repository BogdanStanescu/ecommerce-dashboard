"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Modal } from "../ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  name: z.string().trim().min(1, "Store name is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
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
                      placeholder="E-Commerce"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex items-center justify-end pt-6 space-x-2">
              <Button variant="ghost" onClick={storeModal.onClose}>
                Cancel
              </Button>

              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};