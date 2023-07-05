"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { FC, use } from "react";

type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
