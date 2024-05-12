import { Textarea } from "@/components/ui/textarea";
import { Control, Controller } from "react-hook-form";
import * as z from "zod";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { SmallFormHeading } from "./small-form-heading";
import { useState } from "react";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { carPostSchema } from "@/schemas";

interface CarDescriptionFieldProps {
  control: Control<z.infer<typeof carPostSchema>>;
  errors: any;
}

const MAX_SYMBOLS = 4000;

export const CarDescriptionField = ({
  control,
  errors,
}: CarDescriptionFieldProps) => {
  const [remainingSymbols, setRemainingSymbols] = useState(MAX_SYMBOLS);

  return (
    <div className="px-6 py-6 space-y-4">
      <SmallFormHeading label="ავტომობილის აღწერა" />
      <Controller
        control={control}
        name="description"
        render={({ field }) => {
          const debouncedOnChange = debounce(field.onChange, 2000);

          return (
            <FormItem>
              <FormMessage>
                {errors.description?.message as React.ReactNode}
              </FormMessage>
              <FormControl>
                <Textarea
                  maxLength={MAX_SYMBOLS}
                  onChange={(e) => {
                    setRemainingSymbols(MAX_SYMBOLS - e.target.value.length);
                    debouncedOnChange(e);
                  }}
                  rows={8}
                  className={cn(
                    errors.description?.message && "border-destructive"
                  )}
                />
              </FormControl>
              <div className="text-[0.8rem] text-muted-foreground tracking-tighter">
                სიმბოლოების დარჩენილი რაოდენობა {remainingSymbols}
              </div>
            </FormItem>
          );
        }}
      />
    </div>
  );
};
