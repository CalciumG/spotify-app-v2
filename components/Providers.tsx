"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
