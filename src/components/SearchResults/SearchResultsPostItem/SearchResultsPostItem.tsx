import { Link } from 'react-router-dom';
import { SearchResultPostType } from '../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../utilities/getExcerptWithHighlightedQuery';
import { MdOutlineArticle } from 'react-icons/md';

type SearchResultsPostItemType = {
  itemData: SearchResultPostType;
  queryString: string;
};

export default function SearchResultsPostItem({
  itemData,
  queryString,
}: SearchResultsPostItemType) {
  const { _id, text } = itemData;

  const linkTarget = `/posts/${_id}`;

  return (
    <button className=" w-full p-2 text-sm md:text-base hover:bg-neutral-50/20">
      <Link
        to={linkTarget}
        state={{ postData: itemData }}
        className="flex justify-between text-neutral-50 "
      >
        <div className="flex justify-between gap-4 w-5/6">
          <div className="truncate">
            {getExcerptWithHighlightedQuery(text, queryString)}
          </div>
        </div>
        <div>
          <MdOutlineArticle size="1.25em" className="text-lime-300 " />
        </div>
      </Link>
    </button>
  );
}
