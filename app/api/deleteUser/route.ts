import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export interface SessionWithAccessToken extends Session {
  accessToken: string;
  spotifyId: string;
}

const prisma = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = (await getServerSession(
      authOptions
    )) as SessionWithAccessToken;

    if (!session || !session.spotifyId) {
      return NextResponse.json(
        {
          msg: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // delete the existing songs of the user
    await prisma.topSongs.deleteMany({
      where: { spotifyUserName: session.spotifyId },
    });

    return NextResponse.json(
      {
        msg: "User data has been successfully deleted",
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        msg: "Only POST requests are allowed",
      },
      {
        status: 405,
      }
    );
  }
}
