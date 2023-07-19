import { signOut } from "next-auth/react";

export default function SignOut() {
  const handleSignOut = async () => {
    await fetch("/api/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    signOut();
  };

  return (
    <button
      className="text-white font-semibold bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors duration-300"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}
