import FormContainer from "@/components/form-container";
import { Button } from "@/components/ui/button";
import { Bike, Car, Tractor } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./post-forms";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <Controller
      name="vehicleType"
      control={control}
      render={({ field }) => (
        <FormContainer>
          <div className="flex justify-center border-b">
            {buttons.map((button) => (
              <Button
                className={cn(
                  "py-6 px-5 hover:bg-white border-opacity-0 rounded-none transition",
                  selectedOption === button.value && "border-b-[#fd4100] border-opacity-100 border-b-[3px]"
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
                <span className="text-sm ml-3 text-gray-600">
                  {button.label}
                </span>
              </Button>
            ))}
          </div>
          <div>gdsg</div>
        </FormContainer>
      )}
    />
  );
};
