"use client";

import { Form } from "@/components/ui/form";
import { FormHeader } from "./form-header";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MainFeatures } from "./main-features";
import { PostDetails } from "./post-details";
import { useEffect, useState, useTransition } from "react";
import { LocationAndCustomsClearance } from "./location-and-customs-clearance";
import { ImageAndVideo } from "./image-and-video";
import { Price } from "./price";
import { ContactInfo } from "./contact-info";
import { Button } from "@/components/ui/button";
import { carPost } from "@/actions/car-post";
import { useCurrentUser } from "@/hooks/user-current-user";
import { useToast } from "@/components/ui/use-toast";

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
  vehicle: VehicleType,
  renting: RentingType,
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
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const sessionUser = useCurrentUser();
  const ownerFullName = sessionUser
    ? `${sessionUser.name} ${sessionUser.lastName}`.toLowerCase()
    : "";
  const ownerPhoneNumber = sessionUser ? `${sessionUser.phone}` : "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicle: "Car",
      renting: "ForSale",
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
    setValue("ownerPhone", ownerPhoneNumber);
  }, [ownerFullName, ownerPhoneNumber, setValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      carPost(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (error) {
            toast({
              description: `დაფიქსირდა შეცდომა, ${error}.`,
              duration: 3000,
              variant: "destructive",
            });
          } else if (success) {
            toast({
              description: "განცხადება წარმატებით დაემატა.",
              duration: 3000,
            });
          }
        })
        .catch((e) => {
          console.error("error on carPost", e);
          toast({
            description: `დაფიქსირდა შეცდომა, ${error}.`,
            duration: 3000,
            variant: "destructive",
          });
        });
    });
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
          <Button className="text-white py-7 px-9" variant="amber">
            გამოქვეყნება
          </Button>
        </form>
      </Form>
    </>
  );
};
