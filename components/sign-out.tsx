"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-white font-semibold bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-300"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
