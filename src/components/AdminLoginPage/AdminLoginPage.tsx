import { useEffect, useRef, useState } from 'react';
import useInfoCard from '../../hooks/useInfoCard';
import React from 'react';
import { displayErrorInfo } from '../UserNotification/displayErrorInfo';
import { generateAsciiImage } from '../../utilities/generateAsciiImage';
import { introBackground } from '../../assets/intro';
import VerifyingInfoBox from './VerifyingInfoBox';
import AdminLoginForm from '../AdminLoginForm/AdminLoginForm';
import { motion, AnimatePresence } from 'framer-motion';

type AdminLoginPageProps = {
  setToken: (token: string | null) => void;
};

export default function AdminLoginPage({ setToken }: AdminLoginPageProps) {
  const { setInfo } = useInfoCard();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const shouldRenderAscii = useRef(true);

  const login = async (username: string, password: string) => {
    setIsVerifying(true);
    setInfo(null);

    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${SERVER_URL}/api/v1/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.error.message;
        displayErrorInfo(setInfo, errorMessage, '👻');

        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setToken(data.token);
    } catch (error: unknown) {
      console.error(error);
      setIsVerifying(false);
    }
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const usernameInput = event.currentTarget.querySelector(
      '[name="username"]'
    ) as HTMLInputElement;

    const passwordInput = event.currentTarget.querySelector(
      '[name="password"]'
    ) as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
      await login(username, password);
    } catch (error) {
      displayErrorInfo(setInfo, 'Something went wrong!', '👻');
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (shouldRenderAscii.current)
      generateAsciiImage(introBackground, 'asciiArtCanvas', 15);

    return () => {
      shouldRenderAscii.current = false;
    };
  }, []);

  const AsciiBackground = (
    <div className="absolute inset-0 z-0">
      <canvas
        id="asciiArtCanvas"
        className="h-full w-full object-cover"
      ></canvas>
    </div>
  );

  const LoginContent = (
    <>
      <motion.div
        key="greeting"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      <motion.div
        key="loginForm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" w-5/6 md:w-1/2 mx-auto  bg-white shadow-lg p-4 lg:p-8 rounded lg:rounded-lg h-90 md:h-6/8"
      >
        {isVerifying ? (
          <VerifyingInfoBox />
        ) : (
          <>
            <AdminLoginForm
              handleLoginSubmit={handleLoginSubmit}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </motion.div>
    </>
  );

  return (
    <div className="h-screen bg-cBlack overflow-auto flex justify-center items-center">
      {AsciiBackground}
      <div className="w-full md:w-1/2 relative z-10">
        <AnimatePresence>{LoginContent}</AnimatePresence>
      </div>
    </div>
  );
}
