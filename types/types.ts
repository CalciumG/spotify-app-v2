import { Session } from "next-auth";
import SpotifyWebApi from "spotify-web-api-node";

export interface ExtendedSession extends Session {
  accessToken: any;
  expires: any;
}

export type FetcherFunction<T> = (
  api: SpotifyWebApi,
  time_period: string
) => Promise<T>;

export type TimePeriod = "short_term" | "medium_term" | "long_term";
