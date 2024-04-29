import FormContainer from "@/components/form-container";
import { FormHeading } from "./form-heading";
import { TableProperties } from "lucide-react";
import { ArrowButton } from "@/components/arrow-button";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./post-forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { carBrandsArray } from "@/constants/car-brands";
import { useEffect, useState } from "react";

interface MainFeaturesProps {
  control: Control<z.infer<typeof formSchema>>;
}

export const MainFeatures = ({ control }: MainFeaturesProps) => {
  const [brand, setBrand] = useState("");
  const [models, setModels] = useState([]);

  const fetchModels = async (make: string) => {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
    );
    console.log("response", response);
    const data = await response.json();
    return data.Results;
  };

  const onBrandChange = (brand: string) => {
    console.log(brand);
    setBrand(brand);
  };

  useEffect(() => {
    fetchModels(brand)
      .then((models) => setModels(models))
      .catch((err) => console.error("error fetching models:", err));
  }, [brand]);

  console.log("models", models);
  console.log("brand", brand);

  return (
    <FormContainer>
      <div className="border-b flex justify-between px-6 py-5">
        <FormHeading icon={TableProperties} label="ძირითადი მახასიათებლები" />
        <ArrowButton isExpanded={false} />
      </div>
      <div className="px-6 py-6 grid grid-cols-[1.5fr_1fr_0.7fr] grid-rows-4 gap-7">
        <Controller
          control={control}
          name="manufacturer"
          render={({ field }) => (
            <div>
              <Select
                onValueChange={() => field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="მწარმოებელი" />
                </SelectTrigger>
                <SelectContent>
                  {carBrandsArray.map((brand) => (
                    <SelectItem
                      onClick={() => {
                        console.log("clicked")
                        onBrandChange(brand)
                      }}
                      key={brand}
                      value={brand}
                    >
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </FormContainer>
  );
};
