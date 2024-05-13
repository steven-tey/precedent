import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    signIn: async ({ user, isNewUser }) => {
      // ideally we'd only want to track when new users sign up
      // but for the sake of the demo we will track all sign ins
      // if (isNewUser) {
      const { id, name, email, image } = user;

      const clickId = cookies().get("dclid")?.value;

      if (clickId) {
        console.log("clickId detected: ", clickId);

        await fetch(
          "https://api-staging.dub.co/track/lead?workspaceId=ws_clrei1gld0002vs9mzn93p8ik",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.DUB_API_KEY}`,
            },
            body: JSON.stringify({
              clickId,
              eventName: "Created an account",
              customerId: id,
              customerName: name,
              customerEmail: email,
              customerAvatar: image,
            }),
          },
        ).then((res) => res.json());
      }
    },
  },
};
