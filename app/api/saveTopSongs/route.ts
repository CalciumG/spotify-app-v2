import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";
import { authOptions } from "../auth/[...nextauth]/route";

export interface SessionWithAccessToken extends Session {
  accessToken: string;
  spotifyId: string;
}

const prisma = new PrismaClient();
const spotifyApi = new SpotifyWebApi();

export async function POST(res: NextApiResponse) {
  const session = (await getServerSession(
    authOptions
  )) as SessionWithAccessToken;

  if (!session || !session.accessToken) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const lastAddedSong = await prisma.topSongs.findFirst({
    where: { spotifyUserName: session?.spotifyId },
    orderBy: { createdAt: "desc" },
  });

  // if the last song was added within the past 5 days, return without adding new songs
  if (
    lastAddedSong &&
    new Date().getTime() - new Date(lastAddedSong.createdAt).getTime() <
      5 * 24 * 60 * 60 * 1000
  ) {
    return NextResponse.json(
      {
        msg: "Top songs have already been saved within the past 5 days, please try again later",
      },
      {
        status: 500,
      }
    );
  }

  // delete the existing songs of the user
  await prisma.topSongs.deleteMany({
    where: { spotifyUserName: session?.spotifyId },
  });

  spotifyApi.setAccessToken(session.accessToken);

  const response = await spotifyApi.getMyTopTracks({
    limit: 20,
    time_range: "short_term",
  });

  if (!response.body.items) {
    return NextResponse.json(
      {
        msg: `No items found in response: ${JSON.stringify(response)}`,
      },
      {
        status: 501,
      }
    );
  }

  const topSongsData = response.body.items.map((song: any) => ({
    songId: song.id,
    songName: song.name,
    spotifyUserName: session?.spotifyId,
  }));

  await prisma.topSongs.createMany({
    data: topSongsData,
  });

  return NextResponse.json(
    {
      msg: "Your top songs have been successfully saved",
    },
    {
      status: 200,
    }
  );
}
