"use client";
import { TopArtists } from "@/components/TopArtists";
import { TopSongs } from "@/components/TopSongs";
import UserStatus from "@/components/UserStatus";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <section className="flex flex-col gap-6">
      <UserStatus user={session?.user} pagetype={"Client"} />
      <TopSongs />
      <TopArtists />
    </section>
  );
}
