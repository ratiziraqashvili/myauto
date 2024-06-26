import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import * as z from "zod";
import { SmallFormHeading } from "./small-form-heading";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ToggleType = "single" | "multiple";

interface ToggleGroupFieldProps<Schema extends z.ZodType<any, any>> {
  control: Control<z.infer<Schema>>;
  name: keyof z.infer<Schema>;
  label: string;
  errors: any;
  options: { value: string; label: string; color?: string }[];
  type?: ToggleType;
  isPending?: boolean;
}

export const ToggleGroupField = <Schema extends z.ZodType<any, any>>({
  control,
  name,
  label,
  errors,
  options,
  type,
  isPending,
}: ToggleGroupFieldProps<Schema>) => {
  if (type === "multiple") {
    return (
      <Controller
        control={control}
        name={name as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <SmallFormHeading label={label} />
            </FormLabel>
            <FormMessage>
              {errors[name]?.message as React.ReactNode}
            </FormMessage>
            <FormControl>
              <ToggleGroup
                disabled={isPending}
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                className="flex gap-x-4 gap-y-2 flex-wrap pt-2"
                type="multiple"
              >
                {options.map(({ value, label }) => (
                  <ToggleGroupItem
                    key={value}
                    type="button"
                    variant="outline"
                    value={value}
                    className="text-gray-800"
                  >
                    <span>{label}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

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
              disabled={isPending}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              className="flex gap-x-4 gap-y-2 flex-wrap pt-2"
              type="single"
            >
              {options.map(({ value, label, color }) => (
                <ToggleGroupItem
                  key={value}
                  type="button"
                  variant="outline"
                  value={value}
                  className="text-gray-800"
                >
                  {color && (
                    <div
                      className="size-3 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <span className={cn(color && "ml-2")}>{label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
