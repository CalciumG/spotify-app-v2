"use client";

import React, { useState } from "react";
import { useSpotifySessionContext } from "context/SessionProvider";
import { useRecommendations } from "hooks/useRecommendation";
import { RecommendationsModal } from "./RecommendationsModal";
import { Loader, Forbidden } from "../common";

export const Recommendations = () => {
  const { api } = useSpotifySessionContext();
  const [open, setOpen] = useState(false);

  const {
    data: recommendations,
    isLoading: recommendationsLoading,
    error: recommendationsError,
  } = useRecommendations(api, 140);

  if (recommendationsLoading) {
    return <Loader />;
  }

  if (recommendationsError) {
    return <Forbidden />;
  }

  return (
    <div className="flex flex-col items-center min-w-xs sm:min-w-full p-4">
      <h2 className="max-w-sm text-xl font-bold mb-4 text-center">
        Want to get recommendations based on your recent top songs & artists?
      </h2>
      <button
        type="button"
        className="w-[200px] inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setOpen(true)}
      >
        Click here!
      </button>
      <RecommendationsModal
        open={open}
        setOpen={setOpen}
        recommendations={recommendations}
      />
    </div>
  );
};
