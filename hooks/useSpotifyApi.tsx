import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MySession } from "@/app/api/auth/[...nextauth]/options";
import { spotifyApiRequest } from "utils/spotifyApiRequest";

export const useSpotifyApi = <T,>(endpoint: string) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const sessionWithToken = session as MySession;

      if (sessionWithToken.accessToken) {
        spotifyApiRequest(endpoint, sessionWithToken.accessToken)
          .then(setData)
          .catch(setError);
      }
    }
  }, [status, session, endpoint]);

  return { data, error, isLoading: status === "loading" || !data };
};
