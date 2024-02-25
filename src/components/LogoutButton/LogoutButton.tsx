import { useNavigate } from 'react-router-dom';
import { InfoType } from '../../types/infoTypes';
import { CurrentUser } from '../../types/userType';
import { encryptStorage } from '../../utilities/encryptedStorage';

type LogoutButtonProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setInfo: (info: InfoType | null) => void;
};

export default function LogoutButton({
  setToken,
  setAuthUser,
  setIsAuth,
  setInfo,
}: LogoutButtonProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    const LOGOUT_INFO = {
      typeOfInfo: 'good',
      message: 'You have been logged out',
      icon: '👋',
    };
    setToken(null);
    setAuthUser(null);
    setIsAuth(false);
    setInfo(LOGOUT_INFO as InfoType);

    encryptStorage.removeItem('jwtTomodachiLinkAdmin');
  };
  return (
    <button
      onClick={handleLogout}
      className="flex text-neutral-50 md:ml-auto p-2 md:p-4 hover:bg-red-600"
    >
      <span className="mx-auto">Logout</span>
    </button>
  );
}
