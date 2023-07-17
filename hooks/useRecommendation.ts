import { useQuery } from "@tanstack/react-query";
import SpotifyWebApi from "spotify-web-api-node";
import { useTopTracks } from "./useTopTracks";
import { useTopArtists } from "./useTopArtists";

export const useRecommendations = (
  api: SpotifyWebApi | null,
  targetBpm: number
) => {
  const { data: topTracks } = useTopTracks(api, "short_term");
  const { data: topArtists } = useTopArtists(api, "short_term");

  return useQuery(
    ["recommendations", targetBpm],
    async () => {
      if (!api) {
        throw new Error("API is not defined");
      }
      if (!topTracks) {
        throw new Error("Top tracks not found");
      }
      if (!topArtists) {
        throw new Error("Top artists not found");
      }

      const filteredArtists = topArtists.items
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
        .map((artist) => artist.id);

      const seedTracks = topTracks.items
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((track) => track.id);

      const seedArtists = filteredArtists
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      const trackResponse = await api.getRecommendations({
        seed_tracks: seedTracks,
        // target_tempo: targetBpm,
        min_popularity: 60,
        limit: 20,
      });

      const artistResponse = await api.getRecommendations({
        seed_artists: seedArtists,
        // target_tempo: targetBpm,
        min_popularity: 60,
        limit: 20,
      });

      return Array.from(
        new Set([...trackResponse.body.tracks, ...artistResponse.body.tracks])
      );
    },
    // Only run this query if api, topTracks, and topArtists are defined
    {
      enabled: !!api && !!topTracks && !!topArtists,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
