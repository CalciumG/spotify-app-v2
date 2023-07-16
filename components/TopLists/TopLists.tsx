"use client";

import React from "react";
import { TopSongs } from "./TopSongs";
import { TopArtists } from "./TopArtists";
import { useSpotifySessionContext } from "context/SessionProvider";
import { useTopArtists, useTopTracks } from "hooks";
import { TimePeriodDropdown } from "./TimePeriodDropdown";
import { TimePeriod } from "types/types";
import { Loader } from "../common/Loader";
import { Forbidden } from "../common/Forbidden";
import { TopListSkeleton } from "./Skeletons";

export const TopLists = () => {
  const { api, spotifySession } = useSpotifySessionContext();
  const [timePeriod, setTimePeriod] = React.useState<TimePeriod>("short_term");

  const {
    data: artists,
    isLoading: artistsLoading,
    error: artistsError,
  } = useTopArtists(api, timePeriod);

  const {
    data: tracks,
    isLoading: tracksLoading,
    error: tracksError,
  } = useTopTracks(api, timePeriod);

  const handleTimePeriodChange = (newTimePeriod: TimePeriod) => {
    setTimePeriod(newTimePeriod);
  };

  if (spotifySession.status === "loading") {
    return <Loader />;
  }

  if (artistsLoading || tracksLoading) {
    return (
      <div className="flex justify-center items-center">
        <TopListSkeleton>
          <TimePeriodDropdown
            selectedTimePeriod={timePeriod}
            onTimePeriodChange={handleTimePeriodChange}
          />
        </TopListSkeleton>
      </div>
    );
  }

  if (!api || artistsError || tracksError) {
    return <Forbidden />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-sm p-4">
        <TimePeriodDropdown
          selectedTimePeriod={timePeriod}
          onTimePeriodChange={handleTimePeriodChange}
        />
        {artists && <TopArtists artists={artists.items} />}
        {tracks && <TopSongs tracks={tracks.items} />}
      </div>
    </div>
  );
};
