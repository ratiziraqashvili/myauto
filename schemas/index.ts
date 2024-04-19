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