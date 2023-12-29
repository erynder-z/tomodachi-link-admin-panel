import {
  SearchResultPollType,
  SearchResultPostType,
  SearchResultType,
  SearchResultUserType,
} from '../../types/searchTypes';
import SearchResultsUserListItem from './SearchResultsUserItem/SearchResultsUserItem';
import SearchResultsPostItem from './SearchResultsPostItem/SearchResultsPostItem';
import SearchResultsPollItem from './SearchResultsPollItem/SearchResultsPollItem';

type SearchResultsProps = {
  searchText: string;
  searchResults: SearchResultType[];
  clearSearch: () => void;
};

export default function SearchResults({
  searchText,
  searchResults,
  clearSearch,
}: SearchResultsProps) {
  const getSearchResultComponent = (resultItem: SearchResultType) => {
    switch (resultItem.type) {
      case 'user':
        return (
          <SearchResultsUserListItem
            itemData={resultItem.data as SearchResultUserType}
          />
        );
      case 'post':
        return (
          <SearchResultsPostItem
            itemData={resultItem.data as SearchResultPostType}
            queryString={searchText}
          />
        );
      case 'poll':
        return (
          <SearchResultsPollItem
            itemData={resultItem.data as SearchResultPollType}
            queryString={searchText}
          />
        );
      default:
        return null;
    }
  };
  return (
    <ul className="relative w-full bg-sky-900/80 max-h-[50vh]">
      {searchResults?.map((resultItem: SearchResultType) => (
        <li key={resultItem.data._id} onClick={clearSearch}>
          {getSearchResultComponent(resultItem)}
        </li>
      ))}
    </ul>
  );
}
