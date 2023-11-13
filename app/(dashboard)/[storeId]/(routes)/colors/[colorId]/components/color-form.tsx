"use client";

import AlertModal from "@/components/modals/alert-modal";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IColorFormProps {
  color: Color | null;
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  value: z
    .string()
    .trim()
    .min(4, "Value is required")
    .regex(/^#/, "String must be a valid hex code"),
});

type FormValues = z.infer<typeof formSchema>;

const ColorForm = ({ color }: IColorFormProps) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: color || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);

      if (color) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        const request = await axios.post(`/api/${params.storeId}/colors`, data);

        if (request.status === 200) {
          toast.success(toastMessage);
          router.back();
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const request = await axios.delete(
        `/api/${params.storeId}/colors/${params.colorId}`
      );

      if (request.status === 200) {
        toast.success("Color deleted successfully.");
        router.back();
        router.refresh();
      }
    } catch (error: any) {
      toast.error("Make sure you removed all products using this color first.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const title = color ? "Edit" : "New";
  const action = color ? "Save Changes" : "Create";
  const toastMessage = color
    ? "Color updated successfully!"
    : "Color created successfully!";

  return (
    <>
      {color && (
        <AlertModal
          label={color.name}
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
          onConfirm={onDelete}
        />
      )}

      <div className="flex items-center justify-between">
        <Heading title={title} />

        {color && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm"
            onClick={() => setIsOpen(true)}
          >
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
                      placeholder="Color name"
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>

                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Color value"
                        autoComplete="off"
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
    </>
  );
};

export default ColorForm;
