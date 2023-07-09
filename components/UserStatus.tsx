"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "./Avatar";
import SignOut from "./sign-out";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default function UserStatus({ user, pagetype }: Props) {
  const session = useSession();

  if (session.status === "loading") return null;

  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;

  return (
    <section className="flex flex-col gap-4">
      {greeting}
      {user?.image && <Avatar url={user?.image} />}
      <p className="text-2xl text-center">{pagetype} Page!</p>
      <SignOut />
    </section>
  );
}
