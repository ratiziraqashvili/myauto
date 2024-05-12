"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Camera, X } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

interface ImageUploadProps {
  onChange: (value: string | string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
  isError?: boolean;
  setUploadedImagesCount: (value: number) => void;
  uploadedImagesCount: number;
  isPending: boolean;
}

const ImageUpload = ({
  onChange,
  onRemove,
  value,
  isError,
  setUploadedImagesCount,
  uploadedImagesCount,
  isPending,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onUpload = (result: any, widget: any) => {
    widget.close();
    const uploadResultsTags =
      result.info?.info?.detection?.object_detection?.data.coco?.tags;
    const isCar = !!uploadResultsTags?.["car"] ?? false;

    if (isCar) {
      onChange(result.info.secure_url);
      //@ts-ignore
      setUploadedImagesCount((prev: number) => prev + 1);
    } else {
      toast({
        description: "სურათში ვერ მოიძებნა მანქანა.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={cn("", uploadedImagesCount > 0 && "flex gap-x-2 flex-wrap")}
    >
      <div className="pb-5 gap-3 overflow-auto flex">
        {value.map((url) => (
          <div
            key={url}
            className="relative rounded-md w-[100px] overflow-hidden gap-3"
          >
            <div className="z-10 absolute top-1 right-1">
              <Button
                disabled={isPending}
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="rounded-full text-white px-1 py-1 h-5 bg-[#777a80] bg-opacity-65"
              >
                <X className="size-3" />
              </Button>
            </div>
            <CldImage
              crop="fill"
              width={100}
              height={100}
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        options={{
          maxFiles: 15,
          clientAllowedFormats: ["png", "jpg", "webp"],
        }}
        uploadPreset="tmpnhlwn"
        onUpload={onUpload}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          if (uploadedImagesCount > 0) {
            return (
              <div
                onClick={onClick}
                className="h-[100px] w-[100px] border border-dashed border-emerald-500 bg-emerald-100 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-[0.5rem]"
              >
                <Camera className="text-emerald-500 size-7" />
                <span className="text-emerald-500 font-semibold text-[0.68rem] text-center">
                  ატვირთე ფოტოსურათები
                </span>
              </div>
            );
          }

          return (
            <div
              onClick={onClick}
              className={cn(
                "w-full flex gap-2 items-center py-8 px-6 border border-dashed border-emerald-500 bg-emerald-100 rounded-xl cursor-pointer",
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
