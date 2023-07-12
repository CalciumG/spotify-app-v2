"use client";

import { TopLists } from "@/components/TopLists/TopLists";
import UserStatus from "@/components/UserStatus";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
      // redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <section className="flex flex-col gap-6">
      <UserStatus user={session?.user} pagetype={"Client"} />
      {session?.user && <TopLists />}
    </section>
  );
}
