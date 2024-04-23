import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
            const userId = session?.user?.id || token?.sub;

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            const user = userId ? await getUserById(userId) : null;

            if (!user) return null as any;

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return null;
            
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
   ...authConfig
});