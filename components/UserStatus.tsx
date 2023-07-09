"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "./Avatar";
import SignOut from "./sign-out";
import { Transition } from "@headlessui/react";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Props = {
  user: User;
  pagetype: string;
};

export default function UserStatus({ user, pagetype }: Props) {
  const session = useSession();

  if (session.status === "loading") return null;

  const greeting = user?.name ? (
    <div className="flex items-center justify-center p-6 bg-white rounded-lg font-bold text-5xl text-black h-full">
      Hello {user?.name}!
    </div>
  ) : null;

  return (
    <section className="flex flex-col justify-center items-center h-full">
      {greeting}
      {/* {user?.image && <Avatar url={user?.image} />} */}
      <SignOut />
    </section>
  );
}
