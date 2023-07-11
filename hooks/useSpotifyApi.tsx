import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MySession } from "@/app/api/auth/[...nextauth]/options";
import { spotifyApiRequest } from "utils/spotifyApiRequest";
import { useLocalStorage } from "./useLocalStorage";

const EXPIRATION_TIME = 5 * 60 * 1000;

const isDataExpired = (timestamp: number) =>
  Date.now() - timestamp >= EXPIRATION_TIME;

export const useSpotifyApi = <T,>(endpoint: string) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<T | null>(null);
  const [storedData, setStoredData] = useLocalStorage<{
    data: T | null;
    timestamp: number;
  }>(endpoint, { data: null, timestamp: 0 });

  useEffect(() => {
    if (status === "authenticated" && session) {
      const sessionWithToken = session as MySession;

      if (sessionWithToken.accessToken) {
        const fetchData = async () => {
          try {
            if (isDataExpired(storedData.timestamp)) {
              const newData = await spotifyApiRequest(
                endpoint,
                sessionWithToken.accessToken
              );
              const now = Date.now();
              setData(newData);
              setStoredData({ data: newData, timestamp: now });
            } else {
              setData(storedData.data);
            }
          } catch (error) {
            throw error;
          }
        };

        fetchData();
      }
    }
  }, [status, session, endpoint, storedData, setStoredData]);

  return { data, isLoading: status === "loading" || !data };
};
