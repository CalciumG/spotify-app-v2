import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "./Avatar";

import { Transition } from "@headlessui/react";
import SignOut from "./sign-out";

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

  const mobileNavStyles = "flex flex-col items-center w-full p-4 space-y-4";
  const desktopNavStyles =
    "flex items-center justify-between w-full p-4 max-w-md mx-auto";

  return (
    <nav className={pagetype === "mobile" ? mobileNavStyles : desktopNavStyles}>
      <div className="flex items-center">
        {user?.image && <Avatar url={user?.image} />}
      </div>
      {user?.name && <span className="ml-2 text-lg">{user.name}</span>}
      <div className="flex items-center space-x-4">
        {/* Add your additional navbar links/buttons here */}
        <SignOut />
      </div>
    </nav>
  );
}
