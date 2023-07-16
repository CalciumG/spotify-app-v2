import { FetcherFunction } from "types/types";

export const fetchTopArtists: FetcherFunction<
  SpotifyApi.UsersTopArtistsResponse
> = (api) => {
  return api.getMyTopArtists().then((res) => res.body);
};

export const fetchTopTracks: FetcherFunction<
  SpotifyApi.UsersTopTracksResponse
> = (api) => {
  return api.getMyTopTracks().then((res) => res.body);
};
