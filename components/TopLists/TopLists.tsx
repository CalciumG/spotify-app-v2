import { useState } from "react";
import { TopSongs } from "./TopSongs";
import { TopArtists } from "./TopArtists";

export const TopLists: React.FC = () => {
  const [isShowingArtists, setIsShowingArtists] = useState(false);

  return (
    <div>
      <div className="flex justify-center items-center mb-5">
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg"
          onClick={() => setIsShowingArtists(!isShowingArtists)}
        >
          Switch to {isShowingArtists ? "Songs" : "Artists"}
        </button>
      </div>
      {isShowingArtists ? <TopArtists /> : <TopSongs />}
    </div>
  );
};
