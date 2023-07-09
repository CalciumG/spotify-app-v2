import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MySession } from "@/app/api/auth/[...nextauth]/options";

export function useSpotifyApi<T>(endpoint: string) {
  const { data: session, status } = useSession();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const spotifyApiRequest = async (
    endpoint: string,
    token: string,
    method: string = "GET",
    body: any = null
  ) => {
    const url = `https://api.spotify.com/v1/${endpoint}`;

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Error making request to Spotify API");
    }

    return await response.json();
  };

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
}
