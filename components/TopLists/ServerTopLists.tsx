export async function TopLists() {
  // const session = (await getServerSession(authOptions)) as ExtendedSession;
  // let accessToken = session?.accessToken;

  // if (!accessToken) {
  //   return <p>You have no access token fool</p>;
  // }

  // let api = new SpotifyWebApi();
  // api.setAccessToken(accessToken);

  // const [artistsResponse, tracksResponse] = await Promise.all([
  //   api.getMyTopArtists({ limit: 20, time_range: "long_term" }),
  //   api.getMyTopTracks({ limit: 20, time_range: "long_term" }),
  // ]);

  // const artists = artistsResponse.body.items;
  // const tracks = tracksResponse.body.items;

  return (
    <div>
      No need for server side rendering but was fun to play with
      {/* <TopArtists artists={artists} />
      <TopSongs tracks={tracks} /> */}
    </div>
  );
}
