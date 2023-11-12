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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface ICategoryForm {
  billboards: Billboard[];
  category: Category | null;
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  billboardId: z.string().uuid("Billboard ID is required"),
});

type FormValues = z.infer<typeof formSchema>;

const CategoryForm = ({ billboards, category }: ICategoryForm) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: category || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);

      if (category) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        const request = await axios.post(
          `/api/${params.storeId}/categories`,
          data
        );

        if (request.status === 200) {
          router.push(`/${params.storeId}/categories`);
        }
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
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category deleted successfully.", {
        icon: "🚀",
      });
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this category first.",
        { icon: "👾" }
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const title = category ? "Edit" : "New";
  const action = category ? "Save Changes" : "Create";
  const toastMessage = category
    ? "Category updated successfully!"
    : "Category created successfully!";
  const toastIcon = category ? "📋" : "🚀";

  return (
    <>
      {category && (
        <AlertModal
          label={category.name}
          isOpen={isOpen}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
          onConfirm={onDelete}
        />
      )}

      <div className="flex items-center justify-between">
        <Heading title={title} />

        {category && (
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
                      placeholder="Category Name"
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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

export default CategoryForm;
