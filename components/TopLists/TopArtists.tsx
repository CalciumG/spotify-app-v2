import { SpotifyArtist, TopArtistsResponse } from "types/types";
import { ListItem } from "../common/ListItem";

type TopArtistsProps = {
  artists: SpotifyArtist[];
};

export const TopArtists: React.FC<TopArtistsProps> = ({ artists }) => {
  if (artists.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Top Artists:</h2>
        <ul className="grid grid-cols-1 gap-4">
          {artists.map((artist: SpotifyArtist) => (
            <ListItem key={artist.id} item={artist} />
          ))}
        </ul>
      </div>
    </div>
  );
};
