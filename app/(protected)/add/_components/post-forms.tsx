"use client";

import { Form } from "@/components/ui/form";
import { FormHeader } from "./form-header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const VehicleType = z.enum(["Car", "SpecialVehicle", "Motorcycle"]);
const RentingType = z.enum(["ForSale", "ForRent"]);

export const formSchema = z.object({
  vehicleType: VehicleType,
  rentingType: RentingType,
});

export const PostForms = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleType: "Car",
      rentingType: "ForSale",
    },
  });

  const { handleSubmit, control } = form;

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
        <button type="submit">submit</button>
      </form>
    </Form>
  );
};
