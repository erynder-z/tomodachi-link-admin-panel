import { encryptStorage } from '../utilities/encryptedStorage';

export const retrieveTokenFromEncryptedStorage = () => {
  try {
    return encryptStorage.getItem('jwtOdinBookAdmin') || null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};
