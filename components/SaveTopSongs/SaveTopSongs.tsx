"use client";

import { saveTopSongs } from "utils/saveTopSongs";

export const SaveTopSongs = () => {
  return (
    <div>
      <button
        type="button"
        className="w-[200px] inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => saveTopSongs()}
      >
        Save
      </button>
    </div>
  );
};
