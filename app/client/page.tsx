"use client";
import { useSession } from "next-auth/react";
import UserStatus from "@/components/UserStatus";
import SignOut from "@/components/sign-out";
import { redirect } from "next/navigation";

export default function ClientPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <section className="flex flex-col gap-6">
      <UserStatus user={session?.user} pagetype={"Client"} />
      <SignOut />
    </section>
  );
}
