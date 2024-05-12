"use server";

import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { removeQuotes } from "@/lib/quotes-remover";
import { carPostSchema } from "@/schemas";

export const carPost = async (values: z.infer<typeof carPostSchema>) => {
    const validatedFields = carPostSchema.safeParse(values);
    const user = await currentUser();

    if (!user) {
        return { error: "არა ავტორიზებული" }
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser || !dbUser.id) {
        return { error: "აუთენტიფიცირებული" }
    }

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { catalyst, images } = validatedFields.data;

    const booleanCatalyst = removeQuotes(catalyst);

    await db.vehicle.create({
        data: {
            ...validatedFields.data,
           userId: dbUser.id,
           catalyst: booleanCatalyst!,
           images: {
            create: images.map((image) => ({
              url: image.url,
            })),
          },
        }
    })

    return { success: "განცხადება წარმატებით დაემატა" }
}