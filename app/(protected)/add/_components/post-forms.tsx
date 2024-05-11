"use client";

import { Form } from "@/components/ui/form";
import { FormHeader } from "./form-header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MainFeatures } from "./main-features";
import { PostDetails } from "./post-details";
import { useEffect, useState } from "react";
import { LocationAndCustomsClearance } from "./location-and-customs-clearance";
import { ImageAndVideo } from "./image-and-video";
import { Price } from "./price";
import { ContactInfo } from "./contact-info";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/auth";

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
const DoorsType = z.enum(["Two_Three", "Four_Five", "Greater_Than_Five"], {
  message: "შეავსე ველი",
});
const InteriorMaterialType = z.enum(["Piece", "Leather", "ArtificialLeather"], {
  message: "შეავსე ველი",
});
const CurrencyType = z.enum(["GEL", "USD"], { message: "შეავსე ველი" });

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
  doors: DoorsType,
  catalyst: z.string().min(1, { message: "შეავსეთ ველი" }),
  color: z.string().min(1, { message: "შეავსეთ ველი" }),
  interiorMaterial: InteriorMaterialType,
  interiorMaterialColor: z.string().min(1, { message: "შეავსეთ ველი" }),
  additionalParameters: z.string().array().optional(),
  description: z.string().min(1, "შეავსეთ ველი").max(4000, {
    message: "აღწერა უნდა შედგებოდეს 4000-ზე ნაკლები სიმბოლოსგან",
  }),
  location: z.string().min(1, "შეავსეთ ველი"),
  customsClearance: z.boolean(),
  techView: z.boolean(),
  images: z
    .object({ url: z.string() })
    .array()
    .min(1, "ატვირთეთ მინიმუმ 1 ფოტო")
    .max(15, "ატვირთეთ მაქსიმუმ 15 ფოტო"),
  video: z.string().optional(),
  price: z.string().min(1, "შეავსეთ ველი"),
  currency: CurrencyType,
  priceWithDeal: z.boolean(),
  carExchange: z.boolean(),
  ownerName: z.string().min(1, "შეავსეთ ველი"),
  ownerPhone: z.string().min(1, "შეავსეთ ველი"),
});

export type SelectedOptionType = "Car" | "SpecialVehicle" | "Motorcycle";

export const PostForms = () => {
  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionType>("Car");

  const { data: session } = useSession();
  const sessionUser = session?.user as CustomUser;
  const ownerFullName = sessionUser
    ? `${sessionUser.name} ${sessionUser.lastName}`.toLowerCase()
    : "";

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
      doors: undefined,
      catalyst: "",
      color: "",
      interiorMaterial: undefined,
      interiorMaterialColor: "",
      additionalParameters: [],
      description: "",
      location: "",
      customsClearance: false,
      techView: false,
      images: [],
      video: "",
      price: "",
      currency: "GEL",
      priceWithDeal: false,
      carExchange: false,
      ownerName: "",
      ownerPhone: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = form;

  useEffect(() => {
    setValue("ownerName", ownerFullName);
  }, [ownerFullName, setValue]);

  console.log(errors);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit", values);
  }

  return (
    <>
      <PostDetails />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-4"
        >
          <FormHeader
            reset={reset}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            control={control}
          />
          <MainFeatures
            selectedOption={selectedOption}
            errors={errors}
            control={control}
          />
          <LocationAndCustomsClearance control={control} errors={errors} />
          <ImageAndVideo control={control} errors={errors} />
          <Price control={control} errors={errors} />
          <ContactInfo control={control} errors={errors} />
          <button type="submit">submit</button>
        </form>
      </Form>
    </>
  );
};
