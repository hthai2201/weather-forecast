import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';

class EncryptedStorage {
  static setItem<T>(key: string, value: T): void {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      SECRET_KEY,
    ).toString();
    localStorage.setItem(key, encrypted);
  }

  static getItem<T>(key: string): T | null {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
    } catch (error) {
      console.error('Error decrypting data', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

export default EncryptedStorage;
