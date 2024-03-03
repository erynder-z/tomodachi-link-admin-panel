import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

/**
 * Handles adding a fake user to the database.
 *
 * @param {string} token - User authentication token.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const addFakeUser = async (
  token: string,
  setInfo: (info: InfoType | null) => void
): Promise<void> => {
  try {
    const password = import.meta.env.VITE_FAKE_SIGNUP_PASSWORD; 
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${SERVER_URL}/api/v1/fakesignup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        password,
      }),
    });

    if (!response.ok) handleFetchErrors(response, setInfo);

    const SUCCESS_INFO = {
      typeOfInfo: 'good',
      message: 'User added successfully!',
      icon: '😎',
    };

    setInfo(SUCCESS_INFO as InfoType);
  } catch (err: unknown) {
    const ERROR_INFO = {
      typeOfInfo: 'bad',
      message: 'Unable to add user!',
      icon: '👻',
    };
    setInfo(ERROR_INFO as InfoType);
  }
};
