// services/localStorageService.ts

import CryptoJS from "crypto-js";
import config from "../config";

const secretKey = config.localStorageSeceret;

class LocalStorageService {
  // Encrypt and store data in localStorage
  static setItem<T>(key: string, value: T): void {
    try {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        secretKey
      ).toString();
      localStorage.setItem(key, encryptedData);
    } catch (error) {
      console.error("Error setting item to localStorage", error);
    }
  }

  // Retrieve and decrypt data from localStorage
  static getItem<T>(key: string): T | null {
    try {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) return null;

      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      return JSON.parse(decryptedData) as T;
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return null;
    }
  }

  // Remove item from localStorage
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  }

  // Clear all localStorage data
  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  }
}

export default LocalStorageService;
