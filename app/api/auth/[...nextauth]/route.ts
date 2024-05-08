import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (isNewUser || process.env.NODE_ENV === "development") {
        const { id } = user;

        const clickId = cookies().get("dclid")?.value;

        if (clickId) {
          console.log("clickId detected: ", clickId);

          await fetch("https://api-staging.dub.co/track", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.DUB_API_KEY}`,
            },
            body: JSON.stringify({
              clickId,
              eventName: "Created an account",
              eventType: "lead",
              customerId: id,
            }),
          }).then((res) => res.json());
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
