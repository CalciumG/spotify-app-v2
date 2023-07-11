import { SpotifyArtist, TopArtistsResponse } from "types/types";
import { ListItem } from "../common/ListItem";
import { useSpotifyEndpoint } from "hooks/useSpotifyEndpoint";

export const TopArtists: React.FC = () => {
  const endpoint = `me/top/artists?time_range=short_term&limit=20`;
  const {
    data: artists,
    error,
    isLoading,
  } = useSpotifyEndpoint<TopArtistsResponse>(endpoint);

  if (isLoading) return null;
  if (error) return <div>Error loading top artists</div>;

  console.log(artists);

  return (
    <div className="flex justify-center items-center p-5">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Top Artists:</h2>
        <ul className="grid grid-cols-1 gap-4">
          {artists?.items.map((artist: SpotifyArtist) => (
            <ListItem
              key={artist.id}
              imageUrl={artist.images[2].url}
              title={artist.name}
              description={artist.genres.slice(0, 3).join(", ")}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
