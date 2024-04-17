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
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginForm = () => {
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
                  className="py-7 placeholder:font-semibold focus-visible:ring-blue-500"
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
                  className="py-7 placeholder:font-semibold focus-visible:ring-blue-500"
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
        <Button type="submit">შესვლა</Button>
      </form>
    </Form>
  );
};
