import { Navigate, Outlet } from 'react-router-dom';

type RequireAuthProps = {
  isAuth: boolean;
};

const RequireAuth = ({ isAuth }: RequireAuthProps) => {
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
