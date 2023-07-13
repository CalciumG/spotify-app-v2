import SpotifyWebApi from "spotify-web-api-node";
import { TopSongs } from "./TopSongs";
import { TopArtists } from "./TopArtists";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ExtendedSession } from "types/types";

export async function TopLists() {
  const session = (await getServerSession(authOptions)) as ExtendedSession;
  let accessToken = session?.accessToken;

  if (!accessToken) {
    return <p>You have no access token fool</p>;
  }

  let api = new SpotifyWebApi();
  api.setAccessToken(accessToken);

  const [artistsResponse, tracksResponse] = await Promise.all([
    api.getMyTopArtists({ limit: 20, time_range: "long_term" }),
    api.getMyTopTracks({ limit: 20, time_range: "long_term" }),
  ]);

  const artists = artistsResponse.body.items;
  const tracks = tracksResponse.body.items;

  return (
    <div>
      <TopArtists artists={artists} />
      <TopSongs tracks={tracks} />
    </div>
  );
}
