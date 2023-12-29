import { Link } from 'react-router-dom';
import { SearchResultPollType } from '../../../types/searchTypes';
import { getExcerptWithHighlightedQuery } from '../../../utilities/getExcerptWithHighlightedQuery';
import { MdPieChartOutlined } from 'react-icons/md';

type SearchResultsPollItemType = {
  itemData: SearchResultPollType;
  queryString: string;
};

export default function SearchResultsPollItem({
  itemData,
  queryString,
}: SearchResultsPollItemType) {
  const { _id, question, description } = itemData;
  const pollText = `${question} ${description}`;

  const linkTarget = `/polls/${_id}`;

  return (
    <button className=" w-full p-2 text-sm md:text-base hover:bg-neutral-50/20">
      <Link
        to={linkTarget} state={{ pollData: itemData }}
        className="flex justify-between text-neutral-50 "
      >
        <div className="flex justify-between gap-4 w-5/6">
          <div className="overflow-hidden whitespace-nowrap text-ellipsis">
            {getExcerptWithHighlightedQuery(pollText, queryString)}
          </div>
        </div>
        <div>
          <MdPieChartOutlined size="1.25em" className="text-amber-300" />
        </div>
      </Link>
    </button>
  );
}
