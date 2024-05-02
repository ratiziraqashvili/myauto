"use client";

import { Form } from "@/components/ui/form";
import { FormHeader } from "./form-header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { MainFeatures } from "./main-features";

const VehicleType = z.enum(["Car", "SpecialVehicle", "Motorcycle"]);
const RentingType = z.enum(["ForSale", "ForRent"]);
const LengthUnitType = z.enum(["KM", "MI"])

export const formSchema = z.object({
  vehicleType: VehicleType,
  rentingType: RentingType,
  manufacturer: z.string().min(1, "შეავსე ველი"),
  model: z.string().optional(),
  customModel: z.string().optional(),
  category: z.string().min(1, "შეავსე ველი"),
  year: z.string().min(1, "შეავსე ველი"),
  month: z.string().min(1, "შეავსე ველი"),
  numberOfCylinders: z.string().min(1, "შეავსე ველი"),
  engineCapacity: z.string().min(1, "შეავსეთ ველი"),
  turbo: z.boolean(),
  numberOfAirbags: z.string().min(1, "შეავსეთ ველი"),
  mileage: z.string().min(1, "შეავსეთ ველი"),
  lenghtUnit: LengthUnitType,
});

export const PostForms = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleType: "Car",
      rentingType: "ForSale",
      manufacturer: "",
      model: "",
      customModel: "",
      category: "",
      year: "",
      month: "",
      numberOfCylinders: "",
      engineCapacity: "",
      turbo: false,
      numberOfAirbags: "",
      mileage: "",
      lenghtUnit: "KM",
    },
  });

  const { handleSubmit, control, formState: { errors } } = form;
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit", values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col gap-4"
      >
        <FormHeader control={control} />
        <MainFeatures errors={errors} control={control} />
        <button type="submit">submit</button>
      </form>
    </Form>
  );
};
