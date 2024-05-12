import { Control, Controller, useWatch } from "react-hook-form";
import * as z from "zod";
import FormContainer from "@/components/form-container";
import { FormHeadingContainer } from "./form-heading-container";
import { FormHeading } from "./form-heading";
import { CircleDollarSign } from "lucide-react";
import { ArrowButton } from "@/components/arrow-button";
import { useState } from "react";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { carPostSchema } from "@/schemas";

interface PriceProps {
  control: Control<z.infer<typeof carPostSchema>>;
  errors: any;
  isPending: boolean;
}

export const Price = ({ control, errors, isPending }: PriceProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const priceWithDeal = useWatch({ control, name: "priceWithDeal" });

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <FormContainer>
      <FormHeadingContainer>
        <FormHeading icon={CircleDollarSign} label="ფასი" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </FormHeadingContainer>
      {isExpanded && (
        <div className="flex flex-col">
          <div className="flex p-6 pb-2">
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className={cn(
                        "py-7 rounded-r-none w-[15rem]",
                        errors.price?.message && "border-destructive"
                      )}
                      placeholder="ჩაწერე ფასი"
                      disabled={priceWithDeal || isPending}
                      value={priceWithDeal ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.price?.message as React.ReactNode}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      type="single"
                      className={cn(
                        "py-[0.62rem] px-3 border rounded-r border-l-0",
                        errors.price?.message && "border-destructive"
                      )}
                      disabled={priceWithDeal || isPending}
                    >
                      <ToggleGroupItem
                        className="data-[state=on]:bg-gray-200 rounded-full font-bold opacity-20 data-[state=on]:opacity-100 transition"
                        type="button"
                        value="GEL"
                      >
                        ₾
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        className="data-[state=on]:bg-gray-200 rounded-full px-[0.85rem] font-bold opacity-20 data-[state=on]:opacity-100 transition"
                        type="button"
                        value="USD"
                      >
                        $
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Controller
            control={control}
            name="priceWithDeal"
            render={({ field }) => (
              <FormItem className="border-b p-6">
                <FormControl>
                  <div>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="ml-2 text-gray-600 text-sm">
                      ფასი შეთანხმებით
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="carExchange"
            render={({ field }) => (
              <FormItem className="p-6">
                <FormControl>
                  <div>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="ml-2 text-gray-600 text-sm">
                      სხვა ავტომობილში გაცვლა
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
