"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
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

  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
      src={user?.image}
      width={100}
      height={100}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
    />
  ) : null;

  return (
    <section className="flex flex-col gap-4">
      {greeting}
      {userImage}
      <p className="text-2xl text-center">{pagetype} Page!</p>
      <SignOut />
    </section>
  );
}
