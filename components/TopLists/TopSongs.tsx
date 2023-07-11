import { TopTracksResponse, SpotifyTrack } from "types/types";
import { ListItem } from "../common/ListItem";
import { useSpotifyEndpoint } from "hooks/useSpotifyEndpoint";

export const TopSongs: React.FC = () => {
  const endpoint = `me/top/tracks?time_range=short_term&limit=20`;
  const {
    data: tracks,
    error,
    isLoading,
  } = useSpotifyEndpoint<TopTracksResponse>(endpoint);

  if (isLoading) return null;
  if (error) return <div>Error loading top tracks</div>;

  console.log(tracks);

  return (
    <div className="flex justify-center items-center p-5">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Top Songs:</h2>
        <ul className="grid grid-cols-1 gap-4">
          {tracks?.items.map((track: SpotifyTrack) => (
            <ListItem
              key={track.id}
              imageUrl={track.album.images[2].url}
              title={track.name}
              description={track.artists
                .map((artist) => artist.name)
                .join(", ")}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
