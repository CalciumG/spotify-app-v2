import { useState } from "react";
import { TopSongs } from "./TopSongs";
import { TopArtists } from "./TopArtists";
import { useSpotifyEndpoint } from "hooks/useSpotifyEndpoint";
import { TopArtistsResponse, TopTracksResponse } from "types/types";
import { Loader } from "../common/Loader";
import { Tab } from "../common/Tab";

export const TopLists: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: artists, isLoading: artistsLoading } =
    useSpotifyEndpoint<TopArtistsResponse>(
      "me/top/artists?time_range=short_term&limit=20"
    );
  const { data: tracks, isLoading: tracksLoading } =
    useSpotifyEndpoint<TopTracksResponse>(
      "me/top/tracks?time_range=short_term&limit=20"
    );

  if (artistsLoading || tracksLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-center items-center mb-5">
        <div className="flex items-center text-lg">
          <Tab active={activeTab} setActive={setActiveTab} index={0}>
            Top Artists
          </Tab>
          <Tab active={activeTab} setActive={setActiveTab} index={1}>
            Top Tracks
          </Tab>
        </div>
      </div>
      {activeTab === 0 ? (
        <TopArtists artists={artists?.items || []} />
      ) : (
        <TopSongs tracks={tracks?.items || []} />
      )}
    </div>
  );
};
