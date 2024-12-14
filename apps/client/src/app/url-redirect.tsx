import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UrlRedirect() {
  const { shortId } = useParams();
  const [longUrl, setLongUrl] = useState<string | undefined>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/url/resolve/${shortId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((x) => setLongUrl(x.longUrl));
  }, [shortId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>

        <div className="mt-6">
          <p className="text-gray-400 mb-2">Long URL:</p>
          <div className="flex items-center bg-gray-700 p-2 rounded">
            <a
              href={longUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex-1 truncate"
            >
              {longUrl}
            </a>
            <button
              className={`btn btn-sm ml-2 bg-gray-600 hover:bg-gray-500 text-white`}
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
