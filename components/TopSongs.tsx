import { useSession } from "next-auth/react";
import { TopTracksResponse } from "types/types";
import { MySession } from "@/app/api/auth/[...nextauth]/options";
import { useSpotifyApi } from "hooks/useSpotifyApi";

export const TopSongs: React.FC = () => {
  const { data: session, status } = useSession();
  const sessionWithToken = session as MySession;
  const accessToken = sessionWithToken?.accessToken;

  const params = new URLSearchParams({
    time_range: "medium_term",
    limit: "10",
  });
  const endpoint = `me/top/tracks?${params.toString()}`;

  const {
    data: tracks,
    error,
    isLoading,
  } = useSpotifyApi<TopTracksResponse>(accessToken ? endpoint : "");

  if (isLoading || status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching top tracks:", error);
    return <div>Error loading top tracks</div>;
  }

  console.log("TopSongs", tracks);

  return <div>Top Songs:</div>;
};
