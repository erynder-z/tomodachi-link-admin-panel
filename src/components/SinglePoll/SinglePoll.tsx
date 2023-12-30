import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns/format';
import { useRef, useState } from 'react';
import ConfirmationOverlay from '../ConfirmationOverlay/ConfirmationOverlay';
import { handleFetchErrors } from '../../utilities/handleFetchErrors';
import { displaySuccessInfo } from '../../utilities/displaySuccessInfo';
import { displayErrorInfo } from '../UserNotification/displayErrorInfo';
import useInfoCard from '../../hooks/useInfoCard';
import { RetrievedPollDataType } from '../../types/pollTypes';
import { useDimensions } from '../../hooks/useDimensions';
import TypeOfChartSwitcher from '../TypeOfChartSwitcher/TypeOfChartSwitcher';
import { PieChart } from '../PieChart/PieChart';
import { BarChart } from '../BarChart/BarChart';
import PollCommentSection from '../PollCommentSection/PollCommentSection';

type SinglePollProps = {
  token: string | null;
};

export default function SinglePoll({ token }: SinglePollProps) {
  const { setInfo } = useInfoCard();
  const location = useLocation();
  const navigate = useNavigate();
  const wrapperDivRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(wrapperDivRef);
  const pollData = location?.state?.pollData as RetrievedPollDataType;

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [typeOfChart, setTypeOfChart] = useState<'PIE' | 'BAR'>('PIE');

  if (!pollData) {
    return (
      <div className="p-4">
        <p>No poll data available.</p>
      </div>
    );
  }

  const { userpic, firstName, lastName } = pollData.owner;
  const { _id, createdAt, question, description, options, comments } = pollData;
  const userPic = userpic.data;
  const date = createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : '';
  const hasNoPollData = pollData.options.every(
    (option) => option.selectionCount === 0
  );
  const hasDescription = pollData.description;

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

      displaySuccessInfo(setInfo, 'Post deleted!', '🗑️');
    } catch (err: unknown) {
      displayErrorInfo(setInfo, 'Unable to delete post!', '👻');
    } finally {
      setShowConfirmation(false);
      navigate('/posts');
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const pieChartData = {
    data: options.map(({ nameOfOption, selectionCount }) => ({
      nameOfOption,
      selectionCount,
    })),
  };

  const barChartData = {
    data: options.map(({ nameOfOption, selectionCount }) => ({
      nameOfOption,
      selectionCount,
    })),
  };

  const ChartContent = (
    <div key={typeOfChart} ref={wrapperDivRef}>
      {typeOfChart === 'PIE' ? (
        <PieChart dimensions={dimensions} data={pieChartData.data} />
      ) : (
        <BarChart dimensions={dimensions} data={barChartData.data} />
      )}
    </div>
  );

  const HasNoPollContent = <p>No poll data available ☹️</p>;

  return (
    <div className="flex flex-col gap-2 p-4">
      <section className="flex justify-between gap-2">
        <div className="flex gap-2 font-bold">
          <img
            loading="lazy"
            className="w-8 h-8 object-cover rounded-full"
            src={`data:image/png;base64,${userPic}`}
            alt="User avatar"
          />{' '}
          {firstName} {lastName}
        </div>
        <div>{date}</div>
      </section>
      <section className="text-xs">poll id: {_id}</section>
      <h1 className="text-xl font-bold">{question}</h1>
      {hasDescription && <div className="text-base">{description}</div>}
      {hasNoPollData ? HasNoPollContent : ChartContent}
      {!hasNoPollData && (
        <TypeOfChartSwitcher
          typeOfChart={typeOfChart}
          setTypeOfChart={setTypeOfChart}
        />
      )}

      <PollCommentSection comments={comments} />

      <button
        onClick={handleDeleteClick}
        className="w-full bg-red-500 hover:bg-red-600 text-neutral-50 p-2"
      >
        Delete poll
      </button>
      {showConfirmation && (
        <ConfirmationOverlay
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
}
