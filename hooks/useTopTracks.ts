import { useQuery } from "@tanstack/react-query";
import { useSpotifySessionContext } from "context/SessionProvider";
import SpotifyWebApi from "spotify-web-api-node";
import { TimePeriod } from "types/types";

export const useTopTracks = (
  api: SpotifyWebApi | null,
  time_period: TimePeriod
) => {
  const { spotifySession } = useSpotifySessionContext() as any;
  const accessToken = spotifySession.data?.accessToken;

  return useQuery(
    ["topTracks", time_period],
    async () => {
      if (!api || !accessToken) {
        throw new Error("API is not defined or accessToken is not provided");
      }

      const response = await api.getMyTopTracks({
        limit: 20,
        time_range: time_period,
      });

      return response.body;
    },
    { enabled: !!api && !!accessToken, staleTime: 1000 * 60 * 60 * 24 }
  );
};
