import FormContainer from "@/components/form-container";
import { Control, Controller } from "react-hook-form";
import { formSchema } from "./post-forms";
import * as z from "zod";
import { FormHeadingContainer } from "./form-heading-container";
import { FormHeading } from "./form-heading";
import { Image } from "lucide-react";
import { ArrowButton } from "@/components/arrow-button";
import { useState } from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { SmallFormHeading } from "./small-form-heading";

interface ImageAndVideoProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const ImageAndVideo = ({ control, errors }: ImageAndVideoProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

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
              <FormItem className="px-6 py-6">
                <FormLabel>
                  <SmallFormHeading label="ფოტო" />
                </FormLabel>
                <FormControl>
                    
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </FormContainer>
  );
};
