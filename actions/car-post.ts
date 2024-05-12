"use server";

import * as z from "zod";
import { formSchema } from "@/app/(protected)/add/_components/post-forms";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { removeQuotes } from "@/lib/quotes-remover";

export const carPost = async (values: z.infer<typeof formSchema>) => {
    const validatedFields = formSchema.safeParse(values);
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id!);

    const { catalyst } = values;

    const booleanCatalyst = removeQuotes(catalyst);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    console.log(dbUser)

    const vehicle = await db.vehicle.create({
        where: {
            id: dbUser?.id
        },
        data: {
            ...values,
            catalyst: booleanCatalyst!,
            userId: dbUser?.id,
        }
    })
}