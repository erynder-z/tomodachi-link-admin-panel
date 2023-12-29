import { useCallback, useEffect, useRef, useState } from 'react';
import useInfoCard from '../../hooks/useInfoCard';
import { useNavigate } from 'react-router-dom';
import { backendFetch } from '../../utilities/backendFetch';
import { UserType } from '../../types/userType';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import User from '../User/User';

type UserListProps = {
  token: string | null;
};

export default function UserList({ token }: UserListProps) {
  const { setInfo } = useInfoCard();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const shouldFetch = useRef(true);

  const handleFetchUsers = useCallback(async () => {
    try {
      if (token) {
        const apiEndpointURL = `/api/v1/admin/users`;
        const method = 'GET';
        const errorMessage = 'Unable to fetch posts!';
        const response = await backendFetch(
          token,
          setInfo,
          apiEndpointURL,
          method,
          errorMessage
        );

        setUsers(response.users);
      }
    } catch (error) {
      navigate('/forbidden');
    } finally {
      setLoading(false);
    }
  }, [token, setInfo, navigate]);

  useEffect(() => {
    if (shouldFetch.current) handleFetchUsers();

    return () => {
      shouldFetch.current = false;
    };
  }, [setInfo, token, handleFetchUsers]);

  const userItemList = users?.map((user, index) => (
    <User key={user._id} userData={user} itemIndex={index} />
  ));

  const LoadingContent = <LoadingSpinner message="Loading Users" />;

  const NormalContent = (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-center bg-slate-300">User List</h1>
      {userItemList}
    </div>
  );

  return loading ? LoadingContent : NormalContent;
}
