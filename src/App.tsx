import { useState } from 'react';
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage';
import InfoCard from './components/InfoCard/InfoCard';
import useInfoCard from './hooks/useInfoCard';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const { info, setInfo } = useInfoCard();

  return (
    <>
      <AdminLoginPage setToken={setToken} />
      <InfoCard info={info} />
    </>
  );
}

export default App;
