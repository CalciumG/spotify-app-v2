import { SpotifyTrack } from "types/types";
import { ListItem } from "../common/ListItem";

type TopSongsProps = {
  tracks: SpotifyTrack[];
};

export const TopSongs: React.FC<TopSongsProps> = ({ tracks }) => {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center items-center p-5">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Top Songs:</h2>
        <ul className="grid grid-cols-1 gap-4">
          {tracks.map((track: SpotifyTrack) => (
            <ListItem key={track.id} item={track} />
          ))}
        </ul>
      </div>
    </div>
  );
};
