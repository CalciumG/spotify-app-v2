import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import SpotifyProvider from "next-auth/providers/spotify";

import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

import { Session } from "next-auth";

export type MySession = Session & {
  accessToken: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "user-top-read",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (token?.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        if (
          !process.env.SPOTIFY_CLIENT_ID ||
          !process.env.SPOTIFY_CLIENT_SECRET
        ) {
          throw new Error("Missing Spotify client ID or secret");
        }

        const res = await fetch(`https://accounts.spotify.com/api/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
          }),
        });

        const refreshedTokens = await res.json();

        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }

        token.accessToken = refreshedTokens.access_token;

        token.accessTokenExpires =
          Date.now() + refreshedTokens.expires_in * 1000;
      }

      if (account) {
        token.accessToken = account.access_token as string;
        token.refreshToken = account.refresh_token as string;
        token.accessTokenExpires =
          Date.now() + (account.expires_in as number) * 1000;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: { session: any; user: any; token: any }) {
      const modifiedSession: MySession = {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.id,
        },
        expires: session.expires,
      };

      return modifiedSession;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
