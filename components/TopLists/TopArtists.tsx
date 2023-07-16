import { ListItem } from "./ListItem";

type TopArtistsProps = {
  artists: SpotifyApi.ArtistObjectFull[];
};

export const TopArtists: React.FC<TopArtistsProps> = ({ artists }) => {
  if (artists.length === 0) {
    return null;
  }

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4">Top Artists:</h2>
      <ul className="grid grid-cols-1 gap-4">
        {artists.map((artist: SpotifyApi.ArtistObjectFull) => (
          <ListItem key={artist.id} item={artist} />
        ))}
      </ul>
    </div>
  );
};
