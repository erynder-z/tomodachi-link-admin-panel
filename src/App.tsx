import { useEffect, useState } from 'react';
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage';
import InfoCard from './components/InfoCard/InfoCard';
import useInfoCard from './hooks/useInfoCard';
import { encryptStorage } from './utilities/encryptedStorage';
import AppRoutes from './AppRoutes';
import { retrieveTokenFromEncryptedStorage } from './utilities/retrieveTokenFromEncryptedStorage';
import Navbar from './components/Navbar/Navbar';
import { User } from './types/userType';
import { InfoType } from './types/infoTypes';

function App() {
  const [token, setToken] = useState<string | null>(
    retrieveTokenFromEncryptedStorage()
  );
  const { info, setInfo } = useInfoCard();
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      encryptStorage.setItem('jwtOdinBookAdmin', token);
    } else {
      encryptStorage.removeItem('jwtOdinBookAdmin');
    }
  }, [token]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${SERVER_URL}/api/v1/check-token`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Token is expired');
          } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        }
        const data = await response.json();
        setAuthUser(data?.user);
        setIsAuth(true);
        setLoading(false);
      } catch (error: unknown) {
        setAuthUser(null);
        setIsAuth(false);
        setLoading(false);
        console.error(error);
      }
    };

    const getTokenExpirationTime = () => {
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        const expirationTime = decodedToken.exp * 1000;

        setTokenExpiration(expirationTime);
      }
    };

    if (token) {
      checkToken();
      getTokenExpirationTime();
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const welcome_message = {
      typeOfInfo: 'good',
      message: `Welcome, ${authUser?.username}!`,
      icon: '😎',
    };
    if (isAuth && authUser?.username) setInfo(welcome_message as InfoType);
  }, [authUser?.username, isAuth, setInfo]);

  const LoginContent = (
    <>
      <AdminLoginPage setToken={setToken} />
      <InfoCard info={info} />
    </>
  );

  const AppContent = (
    <>
      <Navbar
        setToken={setToken}
        setAuthUser={setAuthUser}
        setIsAuth={setIsAuth}
        setInfo={setInfo}
      />
      <AppRoutes isAuth={isAuth} token={token} />
      <InfoCard info={info} />
    </>
  );

  return isAuth ? AppContent : LoginContent;
}

export default App;
