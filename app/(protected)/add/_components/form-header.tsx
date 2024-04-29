import FormContainer from "@/components/form-container";
import { Button } from "@/components/ui/button";
import { Bike, Car, Tractor } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./post-forms";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FormHeaderProps {
  control: Control<z.infer<typeof formSchema>>;
}

export const FormHeader = ({ control }: FormHeaderProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("Car");

  const buttons = [
    {
      icon: Car,
      label: "ავტომობილები",
      value: "Car",
    },
    {
      icon: Tractor,
      label: "სპეცტექნიკა",
      value: "SpecialVehicle",
    },
    {
      icon: Bike,
      label: "მოტოტექნიკა",
      value: "Motorcycle",
    },
  ];

  const onButtonClick = (value: string, e: any) => {
    e.preventDefault();
    setSelectedOption(value);
  };

  return (
    <FormContainer>
      <Controller
        name="vehicleType"
        control={control}
        render={({ field }) => (
          <div className="flex justify-center px-5 lg:px-10 border-b">
            {buttons.map((button) => (
              <Button
                className={cn(
                  "py-6 px-5 hover:bg-white border-opacity-0 rounded-none transition w-full",
                  selectedOption === button.value &&
                    "border-b-[#fd4100] border-opacity-100 border-b-[3px]"
                )}
                key={button.label}
                variant="ghost"
                onClick={(e) => {
                  onButtonClick(button.value, e);
                  field.onChange(button.value);
                }}
              >
                <button.icon
                  className={cn(
                    "text-gray-400",
                    selectedOption === button.value && "text-[#fd4100]"
                  )}
                />
                <span
                  className={cn(
                    "text-sm ml-3 md:block hidden text-gray-600",
                    selectedOption === button.value && "text-black"
                  )}
                >
                  {button.label}
                </span>
              </Button>
            ))}
          </div>
        )}
      />
      <Controller
        name="rentingType"
        control={control}
        render={({ field }) => (
          <div className="px-10 py-7">
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-9"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className={cn(
                    "bg-white border-gray-300 border-2 size-5 transition duration-500",
                    field.value === "ForSale" && "border-[#fd4100]"
                  )}
                  circleColor="#fd4100"
                  value="ForSale"
                  id="for-sale"
                />
                <label
                  htmlFor="for-sale"
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500 cursor-pointer transition duration-300",
                    field.value === "ForSale" && "text-black/80"
                  )}
                >
                  იყიდება
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className={cn(
                    "bg-white border-gray-300 border-2 size-5 transition duration-500",
                    field.value === "ForRent" && "border-[#fd4100]"
                  )}
                  circleColor="#fd4100"
                  value="ForRent"
                  id="for-rent"
                />
                <label
                  htmlFor="for-rent"
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500 cursor-pointer transition duration-300",
                    field.value === "ForRent" && "text-black/80"
                  )}
                >
                  ქირავდება
                </label>
              </div>
            </RadioGroup>
          </div>
        )}
      />
    </FormContainer>
  );
};
