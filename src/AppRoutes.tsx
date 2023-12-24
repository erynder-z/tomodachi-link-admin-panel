import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import RequireAuth from './components/RequireAuth/RequireAuth';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PostList from './components/PostList/PostList';

type AppRoutesProps = {
  isAuth: boolean;
  token: string | null;
};

export default function AppRoutes({ isAuth, token }: AppRoutesProps) {
    const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<RequireAuth isAuth={isAuth} />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate replace to="/posts" />} />
        <Route path="/posts" element={<PostList token={token} />} />
      </Route>
    </Routes>
  );
}
