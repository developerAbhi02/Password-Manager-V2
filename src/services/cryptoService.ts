import CryptoJS from 'crypto-js';

// सीक्रेट की को स्टोर करें (वास्तविक एप्लिकेशन में इसे सुरक्षित रूप से प्रबंधित करें)
const SECRET_KEY = 'your-secret-key';

/**
 * स्ट्रिंग को एन्क्रिप्ट करें
 */
export const encrypt = (text: string, key: string = SECRET_KEY): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

/**
 * एन्क्रिप्टेड स्ट्रिंग को डिक्रिप्ट करें
 */
export const decrypt = (encryptedText: string, key: string = SECRET_KEY): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * पासवर्ड जनरेट करें
 */
export const generatePassword = (
  length: number = 12,
  includeUppercase: boolean = true,
  includeLowercase: boolean = true,
  includeNumbers: boolean = true,
  includeSymbols: boolean = true
): string => {
  let charset = '';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  if (includeUppercase) charset += uppercaseChars;
  if (includeLowercase) charset += lowercaseChars;
  if (includeNumbers) charset += numberChars;
  if (includeSymbols) charset += symbolChars;

  if (charset === '') charset = lowercaseChars + numberChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}; 