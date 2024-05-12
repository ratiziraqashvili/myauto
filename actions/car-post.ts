"use server";

import * as z from "zod";
import { formSchema } from "@/app/(protected)/add/_components/post-forms";
import getServerSession from "next-auth";
import { auth } from "@/auth";

export const carPost = async (values: z.infer<typeof formSchema>) => {
    const validatedFields = formSchema.safeParse(values);
    // const session = await getServerSession()

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }


}