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
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categories } from "@/constants/categories";
import { getYears } from "@/constants/years";

interface MainFeaturesProps {
  control: Control<z.infer<typeof formSchema>>;
}

interface ModelType {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export const MainFeatures = ({ control }: MainFeaturesProps) => {
  const [brand, setBrand] = useState("");
  const [models, setModels] = useState<ModelType[] | never>([]);

  const years = getYears();

  const fetchModels = async (make: string) => {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
    );
    const data = await response.json();
    return data.Results;
  };

  const onBrandChange = (brand: string) => {
    setBrand(brand);
  };

  useEffect(() => {
    if (brand) {
      fetchModels(brand)
        .then((models) => setModels(models))
        .catch((err) => console.error("error fetching models:", err));
    }
  }, [brand]);

  const isThereModel = models?.length > 0;

  return (
    <FormContainer>
      <div className="border-b flex justify-between px-6 py-5">
        <FormHeading icon={TableProperties} label="ძირითადი მახასიათებლები" />
        <ArrowButton isExpanded={false} />
      </div>
      <div className="px-6 py-6 grid md:grid-cols-[1.5fr_1fr_0.7fr] md:grid-rows-4 grid-rows-1 gap-3 md:gap-7">
        <Controller
          control={control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    onBrandChange(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="მწარმოებელი" />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrandsArray.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select disabled={!isThereModel} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="მოდელი" />
                  </SelectTrigger>
                  <SelectContent>
                    {models?.map((model) => (
                      <SelectItem
                        key={model.Model_Name}
                        value={model.Model_Name}
                      >
                        {model.Model_Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="customModel"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="სხვა მოდელი" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="კატეგორია" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="წელი" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </FormContainer>
  );
};
