import * as z from "zod";
import FormContainer from "@/components/form-container";
import { Control, Controller } from "react-hook-form";
import { formSchema } from "./post-forms";
import { useState } from "react";
import { FormHeadingContainer } from "./form-heading-container";
import { FormHeading } from "./form-heading";
import { ArrowButton } from "@/components/arrow-button";
import { CircleUser, Phone, Smartphone } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SmallFormHeading } from "./small-form-heading";

interface ContactInfoProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const ContactInfo = ({ control, errors }: ContactInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <FormContainer>
      <FormHeadingContainer>
        <FormHeading icon={Phone} label="კონტაქტი" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </FormHeadingContainer>
      {isExpanded && (
        <div className="flex gap-5 p-6">
          <Controller
            control={control}
            name="ownerName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormMessage>
                    {errors.ownerName?.message as React.ReactNode}
                  </FormMessage>
                  <FormLabel>
                    <SmallFormHeading label="სახელი" />
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input className="pl-10" {...field} value={field.value} />
                      <CircleUser className="absolute left-2 top-2" />
                    </div>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Controller
            control={control}
            name="ownerPhone"
            render={({ field }) => (
              <FormItem>
                <FormMessage>
                  {errors.ownerPhone?.message as React.ReactNode}
                </FormMessage>
                <FormLabel>
                  <SmallFormHeading label="ტელეფონის ნომერი" />
                </FormLabel>
                <FormControl>
                    <div className="relative">
                      <Input className="pl-10" {...field} value={field.value} />
                      <Smartphone className="absolute left-2 top-2" />
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
