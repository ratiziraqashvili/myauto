import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, Controller } from "react-hook-form";
import * as z from "zod";
import { SmallFormHeading } from "./small-form-heading";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ToggleGroupFieldProps<Schema extends z.ZodType<any, any>> {
  control: Control<z.infer<Schema>>;
  name: keyof z.infer<Schema>;
  label: string;
  errors: any;
  options: { value: string; label: string }[];
}

export const ToggleGroupField = <Schema extends z.ZodType<any, any>>({
  control,
  name,
  label,
  errors,
  options,
}: ToggleGroupFieldProps<Schema>) => {
  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <SmallFormHeading label={label} />
          </FormLabel>
          <FormMessage>{errors[name]?.message as React.ReactNode}</FormMessage>
          <FormControl>
            <ToggleGroup
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              className="flex gap-x-4 gap-y-2 flex-wrap pt-2"
              type="single"
            >
              {options.map(({ value, label }) => (
                <ToggleGroupItem
                  key={value}
                  type="button"
                  variant="outline"
                  value={value}
                  className="text-gray-800"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
