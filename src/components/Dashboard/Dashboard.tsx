import { useCallback, useEffect, useRef, useState } from 'react';
import useInfoCard from '../../hooks/useInfoCard';
import { useNavigate } from 'react-router-dom';
import { backendFetch } from '../../utilities/backendFetch';
import { DashboardDataType } from '../../types/dashboardDataType';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UserTotals from './UserTotals/UserTotals';
import ProviderChart from './ProviderChart/ProviderChart';
import LatestLoginDate from './LatestActivity/LatestActivity';

type DashboardProps = {
  token: string | null;
};

export default function Dashboard({ token }: DashboardProps) {
  const { setInfo } = useInfoCard();
  const [dashboardData, setDashboardData] = useState<DashboardDataType>({
    totalUsers: 0,
    totalPosts: 0,
    totalPolls: 0,
    providerTomodachiUsers: 0,
    providerGoogleUsers: 0,
    providerDiscordUsers: 0,
    latestLoginDate: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const shouldFetch = useRef(true);

  const handleFetchDashboardData = useCallback(async () => {
    try {
      if (token) {
        const apiEndpointURL = `/api/v1/admin/dashboard`;
        const method = 'GET';
        const errorMessage = 'Unable to fetch dashboard data!';
        const response = await backendFetch(
          token,
          setInfo,
          apiEndpointURL,
          method,
          errorMessage
        );

        setDashboardData(response.dashboardData);
      }
    } catch (error) {
      navigate('/forbidden');
    } finally {
      setLoading(false);
    }
  }, [token, setInfo, navigate]);

  useEffect(() => {
    if (shouldFetch.current) handleFetchDashboardData();

    return () => {
      shouldFetch.current = false;
    };
  }, [setInfo, token, handleFetchDashboardData]);

  const LoadingContent = <LoadingSpinner message="Loading Dashboard" />;

  const NormalContent = (
    <div className="p-1 md:p-4">
      <UserTotals dashboardData={dashboardData} />
      <LatestLoginDate latestLoginDate={dashboardData?.latestLoginDate} />
      <ProviderChart dashboardData={dashboardData} />
    </div>
  );

  return loading ? LoadingContent : NormalContent;
}
