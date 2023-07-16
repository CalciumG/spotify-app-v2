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
import { CategoryDropdown } from "./CategoryDropdown";

type Category = "artists" | "songs";

export const TopLists = () => {
  const { api, spotifySession } = useSpotifySessionContext();
  const [timePeriod, setTimePeriod] = React.useState<TimePeriod>("short_term");
  const [category, setCategory] = React.useState<Category>("songs");

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

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
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
          <CategoryDropdown
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
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
      <div className="w-full min-w-xs sm:min-w-full p-4">
        <TimePeriodDropdown
          selectedTimePeriod={timePeriod}
          onTimePeriodChange={handleTimePeriodChange}
        />
        <CategoryDropdown
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
        />
        {category === "artists" && artists && (
          <TopArtists artists={artists.items} />
        )}
        {category === "songs" && tracks && <TopSongs tracks={tracks.items} />}
      </div>
    </div>
  );
};
