import { PasswordEntry } from '../types';

/**
 * पासवर्ड सुरक्षा विश्लेषण के परिणाम
 */
export interface PasswordCheckResult {
  lastChecked: Date;
  compromisedPasswords: PasswordEntry[];
  reusedPasswords: PasswordEntry[];
  weakPasswords: PasswordEntry[];
}

/**
 * निर्धारित करें कि क्या पासवर्ड कमजोर है
 * कमजोर पासवर्ड में 8 से कम वर्ण हैं या इसमें संख्या/विशेष वर्ण नहीं हैं
 */
export const isWeakPassword = (password: string): boolean => {
  if (password.length < 8) return true;
  
  // पासवर्ड में कम से कम एक संख्या होनी चाहिए
  const hasNumber = /\d/.test(password);
  
  // पासवर्ड में कम से कम एक विशेष वर्ण होना चाहिए
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  // पासवर्ड में कम से कम एक अपरकेस वर्ण होना चाहिए
  const hasUpperCase = /[A-Z]/.test(password);
  
  return !hasNumber || !hasSpecialChar || !hasUpperCase;
};

/**
 * दोहराए गए पासवर्ड खोजें
 */
export const findReusedPasswords = (passwords: PasswordEntry[]): PasswordEntry[] => {
  const passwordMap = new Map<string, PasswordEntry[]>();
  
  // समान पासवर्ड को ग्रुप करें
  for (const entry of passwords) {
    const existingEntries = passwordMap.get(entry.password) || [];
    passwordMap.set(entry.password, [...existingEntries, entry]);
  }
  
  // सभी दोहराए गए पासवर्ड प्राप्त करें
  const reused: PasswordEntry[] = [];
  
  for (const [_, entries] of passwordMap.entries()) {
    if (entries.length > 1) {
      reused.push(...entries);
    }
  }
  
  return reused;
};

/**
 * समझौता किए गए पासवर्ड को समुलेट करें
 * (वास्तविक एप्लिकेशन में यह एक डेटाबेस या API से जांच करेगा)
 */
export const findCompromisedPasswords = (passwords: PasswordEntry[]): PasswordEntry[] => {
  // नोट: यह एक सिमुलेशन है। वास्तविक एप्लिकेशन में, आप हैवे ड्यूटी बीच चेक करेंगे
  const commonPasswords = [
    'password', '123456', 'qwerty', 'admin', '123456789',
    'password123', '12345678', '111111', 'abc123', '1234567'
  ];
  
  return passwords.filter(entry => 
    commonPasswords.includes(entry.password.toLowerCase())
  );
};

/**
 * पासवर्ड विश्लेषण चलाएं
 */
export const analyzePasswords = (passwords: PasswordEntry[]): PasswordCheckResult => {
  const weakPasswords = passwords.filter(entry => isWeakPassword(entry.password));
  const reusedPasswords = findReusedPasswords(passwords);
  const compromisedPasswords = findCompromisedPasswords(passwords);

  return {
    lastChecked: new Date(),
    weakPasswords,
    reusedPasswords,
    compromisedPasswords
  };
}; 