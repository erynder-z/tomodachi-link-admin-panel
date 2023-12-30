import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
        <p
          onClick={handleClick}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Go back
        </p>
      </div>
    </div>
  );
}
