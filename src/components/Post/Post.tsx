import { PostType } from '../../types/postTypes';
import { format } from 'date-fns/format';
import { getTextExcerpt } from '../../utilities/getTextExcerpt';
import { Link } from 'react-router-dom';
import { handleFetchErrors } from '../../utilities/handleFetchErrors';
import { displaySuccessInfo } from '../../utilities/displaySuccessInfo';
import useInfoCard from '../../hooks/useInfoCard';
import { displayErrorInfo } from '../UserNotification/displayErrorInfo';
import { useState } from 'react';
import ConfirmationOverlay from '../ConfirmationOverlay/ConfirmationOverlay';
import { MdDeleteForever, MdOutlinePlagiarism } from 'react-icons/md';
import { unescapeString } from '../../utilities/unescapeString';

type PostProps = {
  token: string | null;
  postData: PostType;
  itemIndex: number;
  onPostChange: () => void;
};

export default function Post({
  token,
  postData,
  itemIndex,
  onPostChange,
}: PostProps) {
  const { setInfo } = useInfoCard();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const { _id, text, createdAt } = postData;
  const { firstName, lastName, userpic } = postData.owner;

  const date = createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : '';
  const userImage = userpic?.data;

  const textExcerpt = getTextExcerpt(text);

  const linkTarget = `/posts/${_id}`;

  const handleDeleteClick = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${SERVER_URL}/api/v1/admin/post/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) handleFetchErrors(response, setInfo);

      setShowConfirmation(false);

      displaySuccessInfo(setInfo, 'Post deleted!', '🗑️');
      onPostChange();
    } catch (err: unknown) {
      displayErrorInfo(setInfo, 'Unable to delete post!', '👻');
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      className={`w-full flex flex-col md:flex-row flex-1 gap-2 md:gap-8 p-4 ${
        itemIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-100'
      }`}
    >
      <div className="flex flex-col w-full">
        <section className="flex justify-between gap-2">
          <div className="flex gap-2 font-bold">
            <img
              loading="lazy"
              className="w-8 h-8 object-cover rounded-full"
              src={`data:image/png;base64,${userImage}`}
              alt="User avatar"
            />{' '}
            {firstName} {lastName}
          </div>
          <div>{date}</div>
        </section>
        <section className="text-xs">post id: {_id}</section>
        <article>{unescapeString(textExcerpt)}</article>
      </div>
      <section className="flex flex-col justify-between items-center">
        <Link to={linkTarget} state={{ postData }}>
          <MdOutlinePlagiarism
            size="1.5em"
            className="text-sky-800 hover:text-sky-500"
          />
        </Link>

        <button onClick={handleDeleteClick}>
          <MdDeleteForever
            size="1.5em"
            className="text-red-600 hover:text-red-400"
          />
        </button>
      </section>
      {showConfirmation && (
        <ConfirmationOverlay
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
}
