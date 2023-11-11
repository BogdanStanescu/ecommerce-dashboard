"use client";

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
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IBillboardForm {
  billboard: Billboard | null;
}

const formSchema = z.object({
  label: z.string().trim().min(1, "Label is required"),
  image_url: z.string().trim().min(1, "Image URL is required"),
});

type FormValues = z.infer<typeof formSchema>;

const BillboardForm = ({ billboard }: IBillboardForm) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || {
      label: "",
      image_url: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);

      if (billboard) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.refresh();

      toast.success(toastMessage, {
        icon: toastIcon,
      });
    } catch (error) {
      toast.error("Something went wrong.", {
        icon: "👾",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const title = billboard ? "Edit Billboard" : "New Billboard";
  const action = billboard ? "Save Changes" : "Create Billboard";
  const description = billboard ? "Edit Billboard" : "Add a new billboard";
  const toastMessage = billboard
    ? "Billboard updated successfully!"
    : "Billboard created successfully!";
  const toastIcon = billboard ? "📋" : "🚀";

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {billboard && (
          <Button disabled={isLoading} variant="destructive" size="sm">
            <Trash className="h-4 w-4" onClick={() => setIsOpen(true)} />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>

                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    isDisabled={isLoading}
                    onChange={(url) => {
                      field.onChange(url);
                    }}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Billboard label"
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  );
};

export default BillboardForm;
