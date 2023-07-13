"use client";
import { signIn } from "next-auth/react";

export function SignInButton() {
  const handleSignIn = () => {
    return signIn("spotify", {
      callbackUrl: "/",
    });
  };

  return <button onClick={() => handleSignIn()}>Sign In</button>;
}
