import { Control, Controller } from "react-hook-form";
import { formSchema } from "./post-forms";
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

interface PriceProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const Price = ({ control, errors }: PriceProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <FormContainer>
      <FormHeadingContainer>
        <FormHeading icon={CircleDollarSign} label="ფოტო და ვიდეო" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </FormHeadingContainer>
      {isExpanded && (
        <div className="p-6 flex flex-col gap-3">
          <div className="flex">
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormMessage>
                    {errors.price?.message as React.ReactNode}
                  </FormMessage>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="py-7 rounded-r-none w-[15rem]"
                      placeholder="ჩაწერე ფასი"
                    />
                  </FormControl>
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
                      className="py-[0.62rem] px-3 border rounded-r"
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
        </div>
      )}
    </FormContainer>
  );
};
