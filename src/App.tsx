import { useEffect, useState } from 'react';
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage';
import InfoCard from './components/InfoCard/InfoCard';
import useInfoCard from './hooks/useInfoCard';
import { encryptStorage } from './utilities/encryptedStorage';
import AppRoutes from './AppRoutes';
import { retrieveTokenFromEncryptedStorage } from './utilities/retrieveTokenFromEncryptedStorage';
import Navbar from './components/Navbar/Navbar';
import { CurrentUser } from './types/userType';
import { InfoType } from './types/infoTypes';
import TokenInfo from './components/TokenInfo/TokenInfo';
import { useLocation } from 'react-router-dom';

function App() {
  const pathname = useLocation();
  const [token, setToken] = useState<string | null>(
    retrieveTokenFromEncryptedStorage()
  );
  const { info, setInfo } = useInfoCard();
  const [authUser, setAuthUser] = useState<CurrentUser | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      encryptStorage.setItem('jwtOdinBookAdmin', token);
    } else {
      encryptStorage.removeItem('jwtOdinBookAdmin');
    }
  }, [token]);

  useEffect(() => {
    const getUserFromToken = async () => {
      try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${SERVER_URL}/api/v1/token-user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const logout_message = {
            typeOfInfo: 'bad',
            message: 'Token has expired! Please log in again.',
            icon: '⛔',
          };
          setInfo(logout_message as InfoType);
          setIsAuth(false);
          setToken(null);
          setAuthUser(null);
          setTokenExpiration(null);
          return;
        }
        const data = await response.json();
        setAuthUser(data?.user);
        setIsAuth(true);
      } catch (error: unknown) {
        setAuthUser(null);
        setIsAuth(false);
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
      getUserFromToken();
      getTokenExpirationTime();
    }
  }, [token, pathname, setInfo]);

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
    <div className="min-h-screen flex flex-col">
      <Navbar
        token={token}
        setToken={setToken}
        setAuthUser={setAuthUser}
        setIsAuth={setIsAuth}
        setInfo={setInfo}
      />
      <AppRoutes isAuth={isAuth} token={token} />
      <InfoCard info={info} />
      <TokenInfo tokenExpiration={tokenExpiration} />
    </div>
  );

  return isAuth ? AppContent : LoginContent;
}

export default App;
