export interface PostUrlShortenResponse {
  shortUrl: string;
}

export interface GetUrlResolveResponse {
  longUrl: string;
}

export const postUrlShorten = async (
  longUrl: string
): Promise<PostUrlShortenResponse> => {
  const response = await fetch(`http://localhost:3000/api/url/shorten`, {
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
  return new Promise((res) =>
    setTimeout(() => {
      res({ longUrl: 'skmdksmdksmdmks' });
    }, 2000)
  );

  const response = await fetch(
    `http://localhost:3000/api/url/resolve/${shortId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return await response.json();
};
