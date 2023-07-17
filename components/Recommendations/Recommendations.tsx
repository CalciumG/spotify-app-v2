"use client";

import { useSpotifySessionContext } from "context/SessionProvider";
import { useRecommendations } from "hooks/useRecommendation";
import React from "react";

export const Recommendations = () => {
  const { api, spotifySession } = useSpotifySessionContext();

  const {
    data: recommendations,
    isLoading: recommendationsLoading,
    error: recommendationsError,
  } = useRecommendations(api, 140, "rock"); // Replace "rock" with the desired genre

  if (recommendationsLoading) {
    return <div>Loading...</div>;
  }

  if (recommendationsError) {
    return <div>Error loading recommendations</div>;
  }

  return (
    <div className="flex flex-wrap justify-center items-start p-4">
      {recommendations &&
        recommendations.map((track, index) => (
          <div
            key={index}
            className="flex flex-col items-center m-2 bg-white shadow-lg rounded-lg overflow-hidden h-[200px] w-[200px]" // updated width and height
          >
            <img
              className="h-[100px] w-full object-cover object-center"
              src={track.album.images[0].url}
              alt={track.name}
            />
            <div className="p-2 overflow-hidden">
              {" "}
              <div className="font-bold text-sm mb-2 truncate text-center">
                {track.name}
              </div>{" "}
              <p className="text-gray-700 text-sm truncate text-center">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
