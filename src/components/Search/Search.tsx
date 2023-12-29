import { useEffect, useRef, useState } from 'react';
import { SearchResultType } from '../../types/searchTypes';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import SearchResults from '../SearchResults/SearchResults';

type SearchProps = {
  token: string | null;
};

const DEBOUNCE_TIMEOUT = 500;

export default function Search({ token }: SearchProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  const debounce = useRef<NodeJS.Timeout | null>(null);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value);

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);

        const SERVER_URL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(
          `${SERVER_URL}/api/v1/admin/search?query=${searchText}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
        setIsDebouncing(false);
      }
    };

    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    setIsDebouncing(true);
    debounce.current = setTimeout(() => {
      if (searchText) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, DEBOUNCE_TIMEOUT);
  }, [searchText, token]);

  const inputBackgroundColorClass = isDebouncing
    ? 'bg-white' // White background while debouncing
    : searchText
    ? searchResults.length > 0
      ? 'bg-green-300' // Green if there are search results
      : 'bg-red-300' // Red if there are no search results
    : 'bg-white';

  const Loading = (
    <div className="relative w-full p-8 bg-neutral-100/80">
      <LoadingSpinner message="Searching..." />
    </div>
  );

  return (
    <div className="md:p-4 gap-4 w-full md:w-1/3 md:mr-auto">
      <input
        name="searchInput"
        required
        autoComplete="off"
        autoFocus
        className={`px-1 md:h-full w-full ${inputBackgroundColorClass}`}
        placeholder="Search"
        value={searchText}
        onChange={handleTextareaChange}
      />
      {isDebouncing && searchText
        ? Loading
        : isLoading
        ? Loading
        : searchResults.length > 0 &&
          Array.isArray(searchResults) && (
            <SearchResults
              key="searchResults"
              searchText={searchText}
              searchResults={searchResults}
              clearSearch={clearSearch}
            />
          )}
    </div>
  );
}
