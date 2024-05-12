import { CurrencyType, DoorsType, FuelType, InteriorMaterialType, LengthUnitType, RentingType, SteeringWheelType, TransmissionType, VehicleType, LeadingWheelsType } from "@/enums";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  
export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    gender: z.enum(["Female", "Male"]),
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters long",
      })
      .max(15, {
        message: "Name should not be more than 15 characters long",
      }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    phone: z.string().optional(),
  });

  export const carPostSchema = z.object({
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
    leadingWheels: LeadingWheelsType,
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