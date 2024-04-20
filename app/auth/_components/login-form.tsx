"use client";

import { login } from "@/actions/login";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const LoginForm = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
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
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          className="bg-blue-500 rounded-3xl hover:bg-blue-400 transition duration-300 py-6 tracking-wider"
          type="submit"
        >
          შესვლა
        </Button>
      </form>
      <div className="pt-5">
        <p className="text-center">
          <span className="text-muted-foreground">არ გაქვს ანგარიში? - </span>
          <Link href="/auth/register" className="text-blue-500 cursor-pointer">
            შექმენი
          </Link>
        </p>
      </div>
    </Form>
  );
};
