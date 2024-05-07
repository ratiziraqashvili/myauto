import FormContainer from "@/components/form-container";
import { Control } from "react-hook-form";
import { formSchema } from "./post-forms";
import * as z from "zod";
import { FormHeadingContainer } from "./form-heading-container";
import { FormHeading } from "./form-heading";
import { Image } from "lucide-react";
import { ArrowButton } from "@/components/arrow-button";

interface ImageAndVideoProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const ImageAndVideo = () => {
  return (
    <FormContainer>
      <FormHeadingContainer>
        <FormHeading icon={Image} label="ფოტო და ვიდეო" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </FormHeadingContainer>
    </FormContainer>
  );
};
