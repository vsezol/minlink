import { useState } from 'react';

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async () => {
    if (!longUrl) return alert('Please enter a URL');

    try {
      const response = await fetch(`http://localhost:3000/api/url/shorten`, {
        method: 'POST',
        body: JSON.stringify({ longUrl }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // eslint-disable-next-line no-restricted-globals
        setShortUrl(`${location.origin}/${data.shortUrl}`);
        setIsCopied(false);
      } else {
        alert(data.message || 'Error creating short link');
      }
    } catch (error) {
      alert('Network error');
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>

        <input
          type="text"
          placeholder="Enter a long URL"
          className="input input-bordered w-full mb-4 bg-gray-700 text-white border-gray-600 placeholder-gray-400"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <button
          className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 border-none"
          onClick={handleSubmit}
        >
          Generate Short Link
        </button>

        {shortUrl && (
          <div className="mt-6">
            <p className="text-gray-400 mb-2">Shortened URL:</p>
            <div className="flex items-center bg-gray-700 p-2 rounded">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex-1 truncate"
              >
                {shortUrl}
              </a>
              <button
                className={`btn btn-sm ml-2 ${
                  isCopied ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-500'
                } text-white`}
                onClick={handleCopy}
              >
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
