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
import { useRouter } from "next/navigation";
import { carPostSchema } from "@/schemas";

export type SelectedOptionType = "Car" | "SpecialVehicle" | "Motorcycle";

export const PostForms = () => {
  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionType>("Car");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const sessionUser = useCurrentUser();
  const ownerFullName = sessionUser
    ? `${sessionUser.name} ${sessionUser.lastName}`.toLowerCase()
    : "";
  const ownerPhoneNumber = sessionUser ? `${sessionUser.phone}` : "";

  const form = useForm<z.infer<typeof carPostSchema>>({
    resolver: zodResolver(carPostSchema),
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

  const onSubmit = (values: z.infer<typeof carPostSchema>) => {
    startTransition(() => {
      carPost(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.error) {
            toast({
              description: `დაფიქსირდა შეცდომა, ${error}.`,
              duration: 3000,
              variant: "destructive",
            });
          } else if (data.success) {
            toast({
              description: "განცხადება წარმატებით დაემატა.",
              duration: 3000,
            });
            console.log("Successssssss");
            router.push("/mypage/myads");
          }
        })
        .catch((e) => {
          console.error("error on carPost", e);
          toast({
            description: `დაფიქსირდა შეცდომა, ${error || e.message}.`,
            duration: 3000,
            variant: "destructive",
          });
        });
    });
  };

  console.log(error);
  console.log(success);

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
