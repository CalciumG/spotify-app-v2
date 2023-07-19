import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider, { SpotifyProfile } from "next-auth/providers/spotify";

const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("refreshing access token");
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );

    // Post request to Spotify API to refresh access token
    const { data } = await axios.post(
      SPOTIFY_REFRESH_TOKEN_URL,
      {
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Update the token with new accessToken and its expiry date
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    console.error(error, "Error while refreshing access token");
    // In case of error, update token with error information
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: CLIENT_ID!,
      clientSecret: CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "user-top-read user-read-email user-read-recently-played",
        },
      },
      profile: (profile: SpotifyProfile) => {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images.length > 0 ? profile.images[0].url : undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + account.expires_in * 1000;
      }

      if (
        token.accessTokenExpires &&
        Date.now() + 300000 < token.accessTokenExpires
      ) {
        return token;
      }

      const newToken = await refreshAccessToken(token);

      if (profile) {
        newToken.user = profile;
      }

      return newToken;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;

      if (token.user) {
        session.spotifyId = token.user.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
