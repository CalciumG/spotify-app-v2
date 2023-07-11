import Image from "next/image";
import { useSession } from "next-auth/react";
import { SpotifyArtist, TopArtistsResponse } from "types/types";
import { MySession } from "@/app/api/auth/[...nextauth]/options";
import { useSpotifyApi } from "hooks/useSpotifyApi";

export const TopArtists: React.FC = () => {
  const { data: session, status } = useSession();
  const sessionWithToken = session as MySession;
  const accessToken = sessionWithToken?.accessToken;

  const params = new URLSearchParams({
    time_range: "short_term",
    limit: "20",
  });

  const endpoint = `me/top/artists?${params.toString()}`;

  const {
    data: artists,
    error,
    isLoading,
  } = useSpotifyApi<TopArtistsResponse>(accessToken ? endpoint : "");

  if (isLoading || status === "loading") {
    return null;
  }

  if (error) {
    console.error("Error fetching top artists:", error);
    return <div>Error loading top artists</div>;
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Top Artists:</h2>
        <ul className="grid grid-cols-1 gap-4">
          {artists?.items.map((artist: SpotifyArtist) => (
            <li
              key={artist.id}
              className="bg-white shadow overflow-hidden sm:rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="flex items-center">
                <Image
                  src={artist.images[2].url}
                  alt={artist.name}
                  className="w-16 h-16 mr-4"
                  width={64}
                  height={64}
                  quality={100}
                />
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {artist.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500 capitalize">
                    {artist.genres.slice(0, 3).join(", ")}
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
