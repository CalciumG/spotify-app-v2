import { useSession } from "next-auth/react";
import { TopTracksResponse, SpotifyTrack, SpotifyImage } from "types/types";
import { MySession } from "@/app/api/auth/[...nextauth]/options";
import { useSpotifyApi } from "hooks/useSpotifyApi";

export const TopSongs: React.FC = () => {
  const { data: session, status } = useSession();
  const sessionWithToken = session as MySession;
  const accessToken = sessionWithToken?.accessToken;

  const params = new URLSearchParams({
    time_range: "short_term",
    limit: "20",
  });
  const endpoint = `me/top/tracks?${params.toString()}`;

  const {
    data: tracks,
    error,
    isLoading,
  } = useSpotifyApi<TopTracksResponse>(accessToken ? endpoint : "");

  if (isLoading || status === "loading") {
    return null;
  }

  if (error) {
    console.error("Error fetching top tracks:", error);
    return <div>Error loading top tracks</div>;
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Top Songs:</h2>
        <ul className="grid grid-cols-1 gap-4">
          {tracks?.items.map((track: SpotifyTrack) => (
            <li
              key={track.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="flex items-center">
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {track.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
