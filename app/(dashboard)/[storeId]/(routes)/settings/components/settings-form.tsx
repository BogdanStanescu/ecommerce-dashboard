"use client";

import AlertModal from "@/components/modals/alert-modal";
import APIAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useOrigin from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface ISettingsForm {
  store: Store;
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Store name is required"),
});

type FormValues = z.infer<typeof formSchema>;

const SettingsForm = ({ store }: ISettingsForm) => {
  const router = useRouter();
  const origin = useOrigin();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);

      const req = await axios.patch(`/api/stores/${store.id}`, data);

      if (req.status === 200) {
        toast.success("Store updated successfully!", {
          icon: "🚀",
        });
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const req = await axios.delete(`/api/stores/${store.id}`);

      if (req.status === 200) {
        router.push("/");
        toast.success("Store deleted successfully!", {
          icon: "🚀",
        });
      }
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.", {
        icon: "👾",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        label={store.name}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />

      <div className="flex items-center justify-between">
        <Heading title="Settings" />
        <Button
          disabled={isLoading}
          variant="destructive"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-8">
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
                      placeholder="Store name"
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </Form>

      <Separator />

      <APIAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${store.id}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
