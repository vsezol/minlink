export interface PostUrlShortenResponse {
  shortId: string;
}

export interface GetUrlResolveResponse {
  longUrl: string;
}

const API_URL = `http://localhost:3000/api`;

export const postUrlShorten = async (
  longUrl: string
): Promise<PostUrlShortenResponse> => {
  const response = await fetch(`${API_URL}/url/shorten`, {
    method: 'POST',
    body: JSON.stringify({ longUrl }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const getUrlResolve = async (
  shortId: string
): Promise<GetUrlResolveResponse> => {
  const response = await fetch(`${API_URL}/url/resolve/${shortId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};
