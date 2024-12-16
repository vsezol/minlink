import { useMemo, useState } from 'react';
import { postUrlShorten } from '../shared/api/url';
import { debounce } from '../shared/lib/debounce';
import { InputText } from '../shared/ui/input-text';

export default function ShortenerPage() {
  const [longUrl, setLongUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const createShortUrl = useMemo(
    () =>
      debounce(async (longUrl: string) => {
        setIsError(false);

        try {
          const data = await postUrlShorten(longUrl);
          // eslint-disable-next-line no-restricted-globals
          setShortUrl(`${location.origin}/${data.shortId}`);
          setIsCopied(false);
          setIsError(false);
        } catch (error) {
          setShortUrl('');
          setIsError(true);

          console.error(error, isError);
        } finally {
          setIsLoading(false);
        }
      }, 1000),
    []
  );

  const onLongUrlChange = (value: string) => {
    setLongUrl(value);

    setShortUrl('');
    setIsError(false);

    if (value.length > 0) {
      setIsLoading(true);
      createShortUrl(value);
    }
  };

  const onCopy = () =>
    navigator.clipboard.writeText(shortUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Short your link!
        </h1>

        <InputText
          value={longUrl}
          onChange={(x) => onLongUrlChange(x)}
          placeholder="Enter a link to make it short"
        />

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
            {shortUrl ? (
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-primary hover:underline truncate"
              >
                {shortUrl}
              </a>
            ) : (
              <span className="text-gray-400">
                {isError
                  ? 'Something went wrong :('
                  : isLoading
                  ? 'Short link is generating...'
                  : 'Short link is not generated yet'}
              </span>
            )}
          </div>

          <button
            className={`btn btn-sm ml-2text-white`}
            disabled={!shortUrl}
            onClick={onCopy}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
