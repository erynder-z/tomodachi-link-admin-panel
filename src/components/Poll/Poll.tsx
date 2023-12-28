import { format } from 'date-fns/format';
import { Link } from 'react-router-dom';
import { handleFetchErrors } from '../../utilities/handleFetchErrors';
import { displaySuccessInfo } from '../../utilities/displaySuccessInfo';
import useInfoCard from '../../hooks/useInfoCard';
import { displayErrorInfo } from '../UserNotification/displayErrorInfo';
import { useState } from 'react';
import ConfirmationOverlay from '../ConfirmationOverlay/ConfirmationOverlay';
import { RetrievedPollDataType } from '../../types/pollTypes';

type PollProps = {
  token: string | null;
  pollData: RetrievedPollDataType;
  itemIndex: number;
  onPollChange: () => void;
};

export default function Poll({
  token,
  pollData,
  itemIndex,
  onPollChange,
}: PollProps) {
  const { setInfo } = useInfoCard();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const { _id, question, createdAt } = pollData;
  const { firstName, lastName, userpic } = pollData.owner;

  const date = createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : '';
  const userImage = userpic?.data;

  const linkTarget = `/polls/${_id}`;

  const handleDeleteClick = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${SERVER_URL}/api/v1/admin/poll/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) handleFetchErrors(response, setInfo);

      setShowConfirmation(false);

      displaySuccessInfo(setInfo, 'Post deleted!', '🗑️');
      onPollChange();
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
        itemIndex % 2 === 0 ? 'bg-cyan-100' : 'bg-sky-100'
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
        <section className="text-xs">poll id: {_id}</section>
        <article>{question}</article>
      </div>
      <section className="flex flex-col justify-between">
        <Link to={linkTarget} state={{ pollData }}>
          Details
        </Link>

        <button onClick={handleDeleteClick}>Delete</button>
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
