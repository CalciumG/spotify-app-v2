import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

type SpotifySessionContextType = {
  api: SpotifyWebApi | null;
  spotifySession: ReturnType<typeof useSession>;
};

const SpotifySessionContext = createContext<
  SpotifySessionContextType | undefined
>(undefined);

export const SpotifySessionProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const spotifySession = useSession();
  let accessToken = spotifySession.data?.accessToken;

  const [api, setApi] = useState<SpotifyWebApi | null>(null);

  useEffect(() => {
    if (accessToken) {
      let newApi = new SpotifyWebApi();
      newApi.setAccessToken(accessToken);
      setApi(newApi);
    }
  }, [accessToken]);

  return (
    <SpotifySessionContext.Provider value={{ api, spotifySession }}>
      {children}
    </SpotifySessionContext.Provider>
  );
};

export function useSpotifySessionContext() {
  const context = useContext(SpotifySessionContext);

  if (!context) {
    throw new Error(
      "useSpotifySessionContext must be used within a SpotifySessionProvider"
    );
  }

  return context;
}
