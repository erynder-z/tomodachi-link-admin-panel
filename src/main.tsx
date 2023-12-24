import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { InfoCardContextProvider } from './contexts/InfoCardContext.tsx';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <InfoCardContextProvider>
        <App />
      </InfoCardContextProvider>
    </HashRouter>
  </React.StrictMode>
);
