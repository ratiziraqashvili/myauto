import * as z from "zod";
import FormContainer from "@/components/form-container";
import { Control, Controller } from "react-hook-form";
import { formSchema } from "./post-forms";
import { FormHeadingContainer } from "./form-heading-container";
import { FormHeading } from "./form-heading";
import { Image, Link2 } from "lucide-react";
import { ArrowButton } from "@/components/arrow-button";
import { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SmallFormHeading } from "./small-form-heading";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";

interface ImageAndVideoProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const ImageAndVideo = ({ control, errors }: ImageAndVideoProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [uploadedImagesCount, setUploadedImagesCount] = useState<number>(0);

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <FormContainer>
      <FormHeadingContainer>
        <FormHeading icon={Image} label="ფოტო და ვიდეო" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </FormHeadingContainer>
      {isExpanded && (
        <div className="flex flex-col gap-3">
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <div className="border-b">
                <FormItem className="px-6 py-6 space-y-6">
                  <FormLabel className="flex items-center gap-2">
                    <SmallFormHeading label="ფოტო" />
                    <span className="font-semibold">
                      {uploadedImagesCount}/15
                    </span>
                  </FormLabel>
                  <FormMessage>
                    {errors.images?.message as React.ReactNode}
                  </FormMessage>
                  <FormControl>
                    <ImageUpload
                      uploadedImagesCount={uploadedImagesCount}
                      setUploadedImagesCount={setUploadedImagesCount}
                      isError={!!errors.images?.message}
                      value={field.value.map((image) => image.url)}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <Controller
            control={control}
            name="video"
            render={({ field }) => (
              <FormItem className="px-6 py-6 space-y-6">
                <FormLabel>
                  <SmallFormHeading label="ვიდეო" />
                  <span className="text-muted-foreground pt-4">
                    ატვირთე ავტომობილის ვიდეო და გაზარდე დაინტერესებულთა რიცხვი
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 border-dashed border border-[#4b94ee] py-7 rounded-xl pl-14 placeholder:text-muted-foreground"
                      placeholder="მაგ. https://www.youtube.com/watch..."
                      {...field}
                    />
                    <div className="bg-[#e2ebf6] w-10 h-10 rounded-lg top-2 absolute flex items-center justify-center ml-2">
                      <Link2 className="text-[#3b8ff6] size-4" />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </FormContainer>
  );
};
