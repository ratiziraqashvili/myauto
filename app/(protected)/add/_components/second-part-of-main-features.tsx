import { Control, Controller } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./post-forms";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SmallFormHeading } from "./small-form-heading";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SecondPartOfMainFeaturesProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const SecondPartOfMainFeatures = ({
  control,
  errors,
}: SecondPartOfMainFeaturesProps) => {
  return (
    <div className="flex flex-col gap-5 px-6 py-6">
      <Controller
        control={control}
        name="steeringWheel"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>
              <SmallFormHeading label="საჭე" />
            </FormLabel>
            <FormMessage>
              {errors.steeringWheel?.message as React.ReactNode}
            </FormMessage>
            <FormControl>
              <ToggleGroup
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                className="space-x-4 pt-2"
                type="single"
              >
                <ToggleGroupItem type="button" variant="outline" value="Right">
                  მარჯვენა
                </ToggleGroupItem>
                <ToggleGroupItem type="button" variant="outline" value="Left">
                  მარცხენა
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="transmission"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>
              <SmallFormHeading label="ტრანსმისია" />
            </FormLabel>
            <FormMessage>
              {errors.transmission?.message as React.ReactNode}
            </FormMessage>
            <FormControl>
              <ToggleGroup
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                className="space-x-4 pt-2"
                type="single"
              >
                <ToggleGroupItem type="button" variant="outline" value="Manual">
                  მექანიკა
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="Automatic"
                >
                  ავტომატიკა
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="Tiptronic"
                >
                  ტიპტრონიკი
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="Variator"
                >
                  ვარიატორი
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="fuel"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>
              <SmallFormHeading label="საწვავის ტიპი" />
            </FormLabel>
            <FormMessage>{errors.fuel?.message as React.ReactNode}</FormMessage>
            <FormControl>
              <ToggleGroup
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
                className="flex gap-x-4 gap-y-2 flex-wrap pt-2"
                type="single"
              >
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="Gasoline"
                >
                  ბენზინი
                </ToggleGroupItem>
                <ToggleGroupItem type="button" variant="outline" value="Diesel">
                  დიზელი
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="Electric"
                >
                  ელექტრო
                </ToggleGroupItem>
                <ToggleGroupItem type="button" variant="outline" value="Hybrid">
                  ჰიბრიდი
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="RechargeableHybrid"
                >
                  დატენვადი ჰიბრიდი
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="LiquidGas"
                >
                  თხევადი გაზი
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="NaturalGas"
                >
                  ბუნებრივი გაზი
                </ToggleGroupItem>
                <ToggleGroupItem
                  type="button"
                  variant="outline"
                  value="Hydrogen"
                >
                  წყალბადი
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
