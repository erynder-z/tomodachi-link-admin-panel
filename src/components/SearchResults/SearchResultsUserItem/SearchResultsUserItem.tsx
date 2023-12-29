import { Link } from 'react-router-dom';
import { SearchResultUserType } from '../../../types/searchTypes';
import { MdOutlineAccountBox } from 'react-icons/md';

type SearchResultsUserListItem = {
  itemData: SearchResultUserType;
};

export default function SearchResultsUserListItem({
  itemData,
}: SearchResultsUserListItem) {
  const { _id, firstName, lastName, userpic } = itemData || {};

  const linkTarget = `/users/${_id}`;

  return (
    <button className=" w-full p-2 text-sm md:text-base hover:bg-neutral-50/20">
      <Link
        to={linkTarget}
        state={{ userData: itemData }}
        className="flex justify-between text-neutral-50 "
      >
        <div className="flex gap-4 w-5/6">
          <img
            loading="lazy"
            className="w-8 h-8 object-cover rounded-full"
            src={`data:image/png;base64,${userpic?.data}`}
            alt="User avatar"
          />
          <div className="truncate">
            {firstName} {lastName}
          </div>
        </div>
        <div>
          <MdOutlineAccountBox size="1.25em" className="text-sky-300 " />
        </div>
      </Link>
    </button>
  );
}
