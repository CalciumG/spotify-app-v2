export const spotifyApiRequest = async (
  endpoint: string,
  token: string,
  method: string = "GET",
  body: any = null
) => {
  const url = `https://api.spotify.com/v1/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Error making request to Spotify API");
  }

  return await response.json();
};
