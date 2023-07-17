import { useQuery } from "@tanstack/react-query";
import SpotifyWebApi from "spotify-web-api-node";
import { useTopTracks } from "./useTopTracks";
import { useTopArtists } from "./useTopArtists";

export const useRecommendations = (
  api: SpotifyWebApi | null,
  targetBpm: number
) => {
  // First, fetch the user's top tracks and artists
  const { data: topTracks } = useTopTracks(api, "short_term");
  const { data: topArtists } = useTopArtists(api, "short_term");

  // Then, use the IDs of those tracks and artists to get recommendations
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

      // Get a list of artist IDs and randomly select 20 of them
      const filteredArtists = topArtists.items
        .sort(() => Math.random() - 0.5)
        .slice(0, 20) // get more than top 5 to ensure enough seeds after filtering
        .map((artist) => artist.id);

      // get the 5 random track ids
      const seedTracks = topTracks.items
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((track) => track.id);

      // get the 5 random artist ids
      const seedArtists = filteredArtists
        .sort(() => Math.random() - 0.5)
        .slice(0, 5); // no need to filter or assert non-nullity as filteredArtists is an array of strings

      // Make a call with track seeds
      const trackResponse = await api.getRecommendations({
        seed_tracks: seedTracks,
        target_tempo: targetBpm,
        min_popularity: 60,
        limit: 20,
      });

      // Make a call with artist seeds
      const artistResponse = await api.getRecommendations({
        seed_artists: seedArtists,
        target_tempo: targetBpm,
        min_popularity: 60,
        limit: 20,
      });

      // Merge the results
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
