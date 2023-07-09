"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full transition-colors duration-300"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
