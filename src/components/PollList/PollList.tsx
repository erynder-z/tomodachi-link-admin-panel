import { useCallback, useEffect, useRef, useState } from 'react';
import useInfoCard from '../../hooks/useInfoCard';
import { RetrievedPollDataType } from '../../types/pollTypes';
import { useNavigate } from 'react-router-dom';
import { backendFetch } from '../../utilities/backendFetch';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Poll from '../Poll/Poll';

type PollListProps = {
  token: string | null;
};

export default function PollList({ token }: PollListProps) {
  const { setInfo } = useInfoCard();
  const [polls, setPolls] = useState<RetrievedPollDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const shouldFetch = useRef(true);

  const handleFetchPolls = useCallback(async () => {
    try {
      if (token) {
        const apiEndpointURL = `/api/v1/admin/polls`;
        const method = 'GET';
        const errorMessage = 'Unable to fetch polls!';
        const response = await backendFetch(
          token,
          setInfo,
          apiEndpointURL,
          method,
          errorMessage
        );
        setPolls(response.polls);
      }
    } catch (error) {
      navigate('/forbidden');
    } finally {
      setLoading(false);
    }
  }, [token, setInfo, navigate]);

  const onPollChange = useCallback(() => {
    setLoading(true);
    handleFetchPolls();
  }, [handleFetchPolls]);

  useEffect(() => {
    if (shouldFetch.current) handleFetchPolls();

    return () => {
      shouldFetch.current = false;
    };
  }, [setInfo, token, handleFetchPolls]);

  const pollItemsList = polls?.map((poll, index) => (
    <Poll
      key={poll._id}
      token={token}
      pollData={poll}
      itemIndex={index}
      onPollChange={onPollChange}
    />
  ));

  const LoadingContent = <LoadingSpinner message="Loading Polls" />;

  const NormalContent = (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-center bg-slate-300">Poll List</h1>
      {pollItemsList}
    </div>
  );

  return loading ? LoadingContent : NormalContent;
}
