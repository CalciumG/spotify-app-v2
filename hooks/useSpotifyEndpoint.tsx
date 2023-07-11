import { useSession } from "next-auth/react";
import { MySession } from "@/app/api/auth/[...nextauth]/options";
import { useSpotifyApi } from "hooks/useSpotifyApi";

export const useSpotifyEndpoint = <T,>(endpoint: string) => {
  const { data: session } = useSession();
  const sessionWithToken = session as MySession;
  const accessToken = sessionWithToken?.accessToken;

  return useSpotifyApi<T>(accessToken ? endpoint : "");
};
