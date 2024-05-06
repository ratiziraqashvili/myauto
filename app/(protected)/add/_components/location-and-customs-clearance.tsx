import FormContainer from "@/components/form-container";
import { FormHeading } from "./form-heading";
import { ArrowButton } from "@/components/arrow-button";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { formSchema } from "./post-forms";
import * as z from "zod";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { locations } from "@/constants/locations";

interface LocationAndCustomsClearanceProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const LocationAndCustomsClearance = ({
  control,
  errors,
}: LocationAndCustomsClearanceProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <FormContainer>
      <div className="border-b flex justify-between px-6 py-5">
        <FormHeading icon={MapPin} label="მდებარეობა და განბაჟება" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-5 px-6 py-6">
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger
                      className={cn(
                        "lg:w-[50%] w-full",
                        errors.location && "border-destructive"
                      )}
                    >
                      <SelectValue placeholder="მდებარეობა" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {errors.location && (
                  <FormMessage>
                    {errors.location.message as React.ReactNode}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="customsClearance"
           />
        </div>
      )}
    </FormContainer>
  );
};
