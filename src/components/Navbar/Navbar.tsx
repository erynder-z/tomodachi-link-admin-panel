import { NavLink } from 'react-router-dom';
import { User } from '../../types/userType';
import { InfoType } from '../../types/infoTypes';
import LogoutButton from '../LogoutButton/LogoutButton';

type NavbarProps = {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setInfo: (info: InfoType | null) => void;
};

export default function Navbar({
  setToken,
  setAuthUser,
  setIsAuth,
  setInfo,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 right-0 w-full bg-sky-800 flex flex-col md:flex-row gap-4 p-4 text-center">
      <NavLink
        to="/posts"
        className={({ isActive }) =>
          isActive ? 'text-amber-500' : 'text-neutral-100 '
        }
      >
        Posts
      </NavLink>
      <NavLink
        to="/polls"
        className={({ isActive }) =>
          isActive ? 'text-amber-500' : 'text-neutral-100 '
        }
      >
        Polls
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive ? 'text-amber-500' : 'text-neutral-100 '
        }
      >
        Users
      </NavLink>
      <LogoutButton
        setToken={setToken}
        setAuthUser={setAuthUser}
        setIsAuth={setIsAuth}
        setInfo={setInfo}
      />
    </nav>
  );
}
