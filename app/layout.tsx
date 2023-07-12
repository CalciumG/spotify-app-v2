import "@/styles/globals.css";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Providers from "@/components/Providers";

const title = "Next 13 Spotify app";
const description = "Playaround with the spotify api.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>
          <Toaster />
          <Suspense fallback="Loading..."></Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
