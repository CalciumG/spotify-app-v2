"use client";

import { SpotifySessionProvider } from "context/SessionProvider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SpotifySessionProvider>{children}</SpotifySessionProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
