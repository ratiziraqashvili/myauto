"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Camera, X } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onChange: (value: string | string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
  isError?: boolean;
}

const ImageUpload = ({
  onChange,
  onRemove,
  value,
  isError,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div>
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="rounded-full text-white"
              >
                <X className="size-4" />
              </Button>
            </div>
            <CldImage fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="tmpnhlwn" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div
              onClick={onClick}
              className={cn(
                "w-full flex gap-2 items-center py-8 px-6 border border-dashed border-emerald-500 bg-emerald-100 rounded-xl",
                isError && "border-red-500 bg-red-100"
              )}
            >
              <Camera
                className={cn(
                  "text-emerald-500 size-7",
                  isError && "text-red-500"
                )}
              />
              <span
                className={cn(
                  "text-emerald-500 font-semibold text-sm",
                  isError && "text-red-500"
                )}
              >
                ატვირთე ფოტოსურათები
              </span>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
