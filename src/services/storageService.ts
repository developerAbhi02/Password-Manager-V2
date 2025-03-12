import { v4 as uuidv4 } from 'uuid';
import { PasswordEntry } from '../types';
import { encrypt, decrypt } from './cryptoService';

const STORAGE_KEY = 'password-manager-data';

/**
 * लोकल स्टोरेज से सभी पासवर्ड प्राप्त करें
 */
export const getAllPasswords = (): PasswordEntry[] => {
  const encryptedData = localStorage.getItem(STORAGE_KEY);
  if (!encryptedData) return [];

  try {
    const decryptedData = decrypt(encryptedData);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('पासवर्ड डिक्रिप्ट करने में त्रुटि:', error);
    return [];
  }
};

/**
 * लोकल स्टोरेज में पासवर्ड सहेजें
 */
export const savePasswords = (passwords: PasswordEntry[]): void => {
  const encryptedData = encrypt(JSON.stringify(passwords));
  localStorage.setItem(STORAGE_KEY, encryptedData);
};

/**
 * नया पासवर्ड जोड़ें
 */
export const addPassword = (password: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>): PasswordEntry => {
  const passwords = getAllPasswords();
  const timestamp = Date.now();
  
  const newPassword: PasswordEntry = {
    ...password,
    id: uuidv4(),
    createdAt: timestamp,
    updatedAt: timestamp
  };
  
  passwords.push(newPassword);
  savePasswords(passwords);
  
  return newPassword;
};

/**
 * मौजूदा पासवर्ड अपडेट करें
 */
export const updatePassword = (updatedPassword: PasswordEntry): PasswordEntry | null => {
  const passwords = getAllPasswords();
  const index = passwords.findIndex(p => p.id === updatedPassword.id);
  
  if (index === -1) return null;
  
  const password = {
    ...updatedPassword,
    updatedAt: Date.now()
  };
  
  passwords[index] = password;
  savePasswords(passwords);
  
  return password;
};

/**
 * पासवर्ड हटाएं
 */
export const deletePassword = (id: string): boolean => {
  const passwords = getAllPasswords();
  const filteredPasswords = passwords.filter(p => p.id !== id);
  
  if (filteredPasswords.length === passwords.length) {
    return false;
  }
  
  savePasswords(filteredPasswords);
  return true;
}; 