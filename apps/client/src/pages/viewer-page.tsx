import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUrlResolve } from '../shared/api/url';

export default function () {
  const [longUrl, setLongUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { shortId } = useParams();

  const onLinkClick = () => {
    window.open(longUrl, 'blank');
  };

  useEffect(() => {
    if (!shortId) {
      return;
    }

    setIsError(false);
    setIsLoading(true);

    getUrlResolve(shortId)
      .then(({ longUrl }) => {
        setLongUrl(longUrl);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setLongUrl('');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Get the original link!
        </h1>

        <div
          className={`
            flex
            items-center
            bg-neutral
            h-12
            p-2
            rounded
            ${isLoading && 'skeleton'}
          `}
          style={{
            animationDuration: '600ms',
          }}
        >
          <div className="flex-1">
            {longUrl ? (
              <a
                href={longUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-primary hover:underline truncate"
              >
                {longUrl}
              </a>
            ) : (
              <span className="text-gray-400">
                {isError && 'Original link not found :('}
                {isLoading && 'Original link is loading...'}
              </span>
            )}
          </div>

          <button
            className={`btn btn-sm ml-2text-white`}
            disabled={!longUrl}
            onClick={onLinkClick}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
