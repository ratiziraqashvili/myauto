"use client";

import { Form } from "@/components/ui/form";
import { FormHeader } from "./form-header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MainFeatures } from "./main-features";

const VehicleType = z.enum(["Car", "SpecialVehicle", "Motorcycle"]);
const RentingType = z.enum(["ForSale", "ForRent"]);
const LengthUnitType = z.enum(["KM", "MI"]);
const SteeringWheelType = z.enum(["Right", "Left"], { message: "შეავსე ველი" });
const TransmissionType = z.enum(
  ["Manual", "Automatic", "Tiptronic", "Variator"],
  { message: "შეავსე ველი" }
);
const FuelType = z.enum(
  [
    "Gasoline",
    "Diesel",
    "Electric",
    "Hybrid",
    "RechargeableHybrid",
    "LiquidGas",
    "NaturalGas",
    "Hydrogen",
  ],
  { message: "შეავსე ველი" }
);
const leadingWheelsType = z.enum(["Front", "Back", "Four_Four"], {
  message: "შეავსე ველი",
});
const doorsType = z.enum([""])

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
  steeringWheel: SteeringWheelType,
  transmission: TransmissionType,
  fuel: FuelType,
  leadingWheels: leadingWheelsType,
  doors: 
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
      steeringWheel: undefined,
      transmission: undefined,
      fuel: undefined,
      leadingWheels: undefined,
      doors: undefined
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  console.log(errors);
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
