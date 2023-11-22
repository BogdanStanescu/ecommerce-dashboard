"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";

interface ImageUploadProps {
  value: string[];
  isDisabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

function ImageUpload({
  isDisabled,
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (imageResult: any) => {
    onChange(imageResult.info.secure_url);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {value?.map((image) => (
          <div
            key={image}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(image)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <Image
              fill
              className="object-cover"
              src={image}
              alt="Image Upload"
            />
          </div>
        ))}
        <CldUploadWidget onUpload={onUpload} uploadPreset="fiq44sze">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button type="button" variant="secondary" onClick={onClick}>
                <ImagePlus className="h-4 w-4 mr-2" />
                Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}

export default ImageUpload;
