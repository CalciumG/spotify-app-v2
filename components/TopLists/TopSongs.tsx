import { ListItem } from "./ListItem";

type TopSongsProps = {
  tracks: SpotifyApi.TrackObjectFull[];
};

export const TopSongs: React.FC<TopSongsProps> = ({ tracks }) => {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4">Top Songs:</h2>
      <ul className="grid grid-cols-1 gap-4">
        {tracks.map((track: SpotifyApi.TrackObjectFull) => (
          <ListItem key={track.id} item={track} />
        ))}
      </ul>
    </div>
  );
};
