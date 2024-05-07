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
import { Switch } from "@/components/ui/switch";
import { FormHeadingContainer } from "./form-heading-container";

interface LocationAndCustomsClearanceProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const LocationAndCustomsClearance = ({
  control,
  errors,
}: LocationAndCustomsClearanceProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [location, setLocation] = useState("");

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const isLocation = location.length > 0;

  return (
    <FormContainer>
      <FormHeadingContainer>
        <FormHeading icon={MapPin} label="მდებარეობა და განბაჟება" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </FormHeadingContainer>
      {isExpanded && (
        <div className="flex flex-col gap-7 px-6 py-6">
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setLocation(value);
                    }}
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
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Switch
                      disabled={!isLocation}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span
                      className={cn(
                        "ml-2 text-gray-600 text-sm",
                        !isLocation &&
                          "text-gray-300 text-sm ml-2 cursor-not-allowed"
                      )}
                    >
                      განბაჟებული
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="techView"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Switch
                      disabled={!isLocation}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span
                      className={cn(
                        "ml-2 text-gray-600 text-sm",
                        !isLocation &&
                          "text-gray-300 text-sm ml-2 cursor-not-allowed"
                      )}
                    >
                      ტექ. დათვალიერება
                    </span>
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
