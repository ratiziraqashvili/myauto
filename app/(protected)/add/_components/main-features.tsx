import * as z from "zod";
import FormContainer from "@/components/form-container";
import { FormHeading } from "./form-heading";
import { TableProperties } from "lucide-react";
import { ArrowButton } from "@/components/arrow-button";
import { Control, Controller } from "react-hook-form";
import { SelectedOptionType } from "./post-forms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  carBrands,
  motorcycleBrands,
  specVehicleBrands,
} from "@/constants/car-brands";
import { useEffect, useState } from "react";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  carCategories,
  motorcycleCategories,
  specVehicleCategories,
} from "@/constants/categories";
import { getYears } from "@/constants/years";
import { months } from "@/constants/months";
import { getNumberOfCylinders } from "@/constants/number-of-cylinders";
import {
  getEngineCapacity,
  motorCycleEngineCapacity,
} from "@/constants/engine-capacity";
import { Switch } from "@/components/ui/switch";
import { SecondPartOfMainFeatures } from "./second-part-of-main-features";
import { cn } from "@/lib/utils";
import { CarDescriptionField } from "./car-description-field";
import { FormHeadingContainer } from "./form-heading-container";
import { carPostSchema } from "@/schemas";

interface MainFeaturesProps {
  control: Control<z.infer<typeof carPostSchema>>;
  errors: any;
  selectedOption: SelectedOptionType;
  isPending: boolean;
}

interface ModelType {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export const MainFeatures = ({
  control,
  errors,
  selectedOption,
  isPending,
}: MainFeaturesProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [brand, setBrand] = useState("");
  const [models, setModels] = useState<ModelType[] | never>([]);

  const years = getYears();
  const numberOfCylinders = getNumberOfCylinders();
  let engineCapacity: string[];
  let brands: string[];
  let categories: string[];

  if (selectedOption === "Car") {
    brands = carBrands;
    categories = carCategories;
    engineCapacity = getEngineCapacity();
  } else if (selectedOption === "SpecialVehicle") {
    brands = specVehicleBrands;
    categories = specVehicleCategories;
    engineCapacity = getEngineCapacity();
  } else {
    brands = motorcycleBrands;
    categories = motorcycleCategories;
    engineCapacity = motorCycleEngineCapacity;
  }

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

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
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
      <FormHeadingContainer>
        <FormHeading icon={TableProperties} label="ძირითადი მახასიათებლები" />
        <ArrowButton onClick={onExpand} isExpanded={isExpanded} />
      </FormHeadingContainer>
      {isExpanded && (
        <>
          <div className="px-6 py-6 grid lg:grid-cols-[1.5fr_1fr_0.7fr] lg:grid-rows-4 grid-rows-1 gap-3 md:gap-7 border-b">
            <Controller
              control={control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={(value) => {
                        field.onChange(value);
                        onBrandChange(value);
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.manufacturer && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="მწარმოებელი" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.manufacturer && (
                    <FormMessage>
                      {errors.manufacturer.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={!isThereModel || isPending}
                      onValueChange={field.onChange}
                    >
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
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="სხვა მოდელი"
                    />
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
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.category && "border-destructive"
                        )}
                      >
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
                  {errors.category && (
                    <FormMessage>
                      {errors.category.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.year && "border-destructive"
                        )}
                      >
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
                  {errors.year && (
                    <FormMessage>
                      {errors.year.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.month && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="თვე" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.month && (
                    <FormMessage>
                      {errors.month.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="numberOfCylinders"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.numberOfCylinders && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="ცილინდრების რაოდენობა" />
                      </SelectTrigger>
                      <SelectContent>
                        {numberOfCylinders.map((cylinder) => (
                          <SelectItem
                            key={cylinder}
                            value={cylinder.toString()}
                          >
                            {cylinder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.numberOfCylinders && (
                    <FormMessage>
                      {errors.numberOfCylinders.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="engineCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.engineCapacity && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="ძრავის მოცულობა" />
                      </SelectTrigger>
                      <SelectContent>
                        {engineCapacity.map((num) => (
                          <SelectItem key={num} value={num}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.engineCapacity && (
                    <FormMessage>
                      {errors.engineCapacity.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="turbo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full">
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="ml-2 text-gray-600 text-sm">ტურბო</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="numberOfAirbags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          errors.numberOfAirbags && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="აირბეგების რაოდენობა" />
                      </SelectTrigger>
                      <SelectContent>
                        {numberOfCylinders.map((cylinder) => (
                          <SelectItem
                            key={cylinder}
                            value={cylinder.toString()}
                          >
                            {cylinder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.numberOfAirbags && (
                    <FormMessage>
                      {errors.numberOfAirbags.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                    disabled={isPending}
                      className={cn(
                        "w-full",
                        errors.mileage && "border-destructive"
                      )}
                      type="number"
                      {...field}
                      placeholder="ჩაწერე გარბენი"
                    />
                  </FormControl>
                  {errors.mileage && (
                    <FormMessage>
                      {errors.mileage.message as React.ReactNode}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="lenghtUnit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select disabled={isPending} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="კმ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KM">კმ</SelectItem>
                        <SelectItem value="MI">მილი</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <SecondPartOfMainFeatures
            selectedOption={selectedOption}
            errors={errors}
            control={control}
            isPending={isPending}
          />
          <CarDescriptionField isPending={isPending} errors={errors} control={control} />
        </>
      )}
    </FormContainer>
  );
};
