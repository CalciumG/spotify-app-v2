import Image from "next/image";
import { SpotifyArtist, SpotifyTrack } from "types/types";

type ListItemProps<T> = {
  item: T;
};

export const ListItem: React.FC<
  ListItemProps<SpotifyApi.ArtistObjectFull | SpotifyApi.TrackObjectFull>
> = ({ item }) => {
  let imageUrl;
  let title;
  let description;

  if ("images" in item) {
    const artist = item as SpotifyArtist;
    imageUrl = artist.images[2].url;
    title = artist.name;
    description = artist.genres.slice(0, 3).join(", ");
  } else {
    const track = item as SpotifyTrack;
    imageUrl = track.album.images[2].url;
    title = track.name;
    description = track.artists.map((artist) => artist.name).join(", ");
  }

  return (
    <li className="bg-white shadow overflow-hidden sm:rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="flex items-center">
        <Image
          src={imageUrl}
          alt={title}
          className="w-16 h-16 mr-4"
          width={64}
          height={64}
          quality={100}
          loading="eager"
        />
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 capitalize">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};
