import { Textarea } from "@/components/ui/textarea";
import { Control, Controller } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./post-forms";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { SmallFormHeading } from "./small-form-heading";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CarDescriptionFieldProps {
  control: Control<z.infer<typeof formSchema>>;
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
        render={({ field }) => (
          <FormItem>
            <FormMessage>
              {errors.description?.message as React.ReactNode}
            </FormMessage>
            <FormControl>
              <Textarea
                maxLength={MAX_SYMBOLS}
                onChange={(e) => {
                  field.onChange(e);
                  setRemainingSymbols(MAX_SYMBOLS - e.target.value.length);
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
        )}
      />
    </div>
  );
};
