"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  gender: z.enum(["მდედრობითი", "მამრობითი"]),
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

export const RegisterForm = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const onInputTypeChange = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-7 focus-visible:ring-blue-500"
                  placeholder="ელფოსტა"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  className="py-7 focus-visible:ring-blue-500"
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="პაროლი"
                  {...field}
                />
              </FormControl>
              <span className="absolute top-[0.57rem] right-3">
                {isPasswordHidden ? (
                  <EyeOff
                    onClick={onInputTypeChange}
                    className="text-muted-foreground hover:text-black cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={onInputTypeChange}
                    className="text-muted-foreground hover:text-black cursor-pointer"
                  />
                )}
              </span>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div>
                <h1 className="text-muted-foreground pb-5">სქესი</h1>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="მდედრობითი" id="gender-female" />
                    <label
                      htmlFor="gender-female"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      მდედრობითი
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="მამრობითი" id="gender-male" />
                    <label
                      htmlFor="gender-male"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      მამრობითი
                    </label>
                  </div>
                </RadioGroup>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-7 focus-visible:ring-blue-500"
                  placeholder="სახელი"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-7 focus-visible:ring-blue-500"
                  placeholder="გვარი"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="py-7 focus-visible:ring-blue-500"
                  placeholder="ტელეფონის ნომერი"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-blue-500 rounded-3xl hover:bg-blue-400 transition duration-300 py-6 tracking-wider"
          type="submit"
        >
          რეგისტრაცია
        </Button>
      </form>
      <div className="pt-5">
        <p className="text-center">
          <span className="text-muted-foreground">არსებული ანგარიშით </span>
          <Link href="/auth/login" className="text-blue-500 cursor-pointer">
            შესვლა
          </Link>
        </p>
      </div>
    </Form>
  );
};
