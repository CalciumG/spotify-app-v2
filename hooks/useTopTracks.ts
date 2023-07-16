import { useQuery } from "@tanstack/react-query";
import SpotifyWebApi from "spotify-web-api-node";
import { TimePeriod } from "types/types";

export const useTopTracks = (
  api: SpotifyWebApi | null,
  time_period: TimePeriod
) => {
  return useQuery(
    ["topTracks", time_period],
    async () => {
      if (!api) {
        throw new Error("API is not defined");
      }
      const response = await api.getMyTopTracks({
        limit: 20,
        time_range: time_period,
      });
      return response.body;
    },
    { enabled: !!api, staleTime: 1000 * 60 * 60 * 24 }
  );
};
