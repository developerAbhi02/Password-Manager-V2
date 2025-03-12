import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// भाषा के प्रकार
export type Language = 'en' | 'hi';

// भाषा कंटेक्स्ट टाइप
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// डिफॉल्ट मान के साथ कंटेक्स्ट बनाएं
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// अनुवाद डेटा
const translations = {
  en: {
    // नेवबार
    appName: 'Pass-X',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    welcome: 'Welcome',
    language: 'Language',
    theme: 'Theme',
    
    // लॉगिन/रजिस्टर फॉर्म
    loginTitle: 'Login to Pass-X',
    registerTitle: 'Create Account',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    loginButton: 'Login',
    registerButton: 'Register',
    loginProcessing: 'Logging in...',
    registerProcessing: 'Registering...',
    
    // पासवर्ड प्रबंधन
    addPassword: 'Add Password',
    passwordManager: 'Password Manager',
    securePasswords: 'Keep your passwords secure',
    title: 'Title',
    username: 'Username',
    url: 'URL',
    notes: 'Notes',
    category: 'Category',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    generate: 'Generate',
    noPasswords: 'No passwords found. Add one to get started!',
    deleteConfirmation: 'Are you sure you want to delete this password?',
    optional: 'Optional',
    selectCategory: 'Select Category',
    social: 'Social Media',
    finance: 'Finance',
    emailCategory: 'Email',
    work: 'Work',
    shopping: 'Shopping',
    other: 'Other',
    passwordAdded: 'Password added successfully',
    passwordUpdated: 'Password updated successfully',
    passwordDeleted: 'Password deleted successfully',
    confirmDelete: 'Delete Password',
    confirmDeleteMessage: 'Are you sure you want to delete this password? This action cannot be undone.',
    yes: 'Yes',
    no: 'No',
    
    // पासवर्ड चेकअप
    passwordCheckup: 'Password Checkup',
    lastChecked: 'Last checked',
    compromisedPasswords: 'compromised passwords',
    compromisedPasswordsDesc: 'You should change these now',
    reusedPasswords: 'reused passwords',
    reusedPasswordsDesc: 'Create unique passwords',
    weakPasswords: 'weak passwords',
    weakPasswordsDesc: 'Create strong passwords',
    refreshCheckup: 'Refresh password checkup',
    checkupRefreshed: 'Password security checkup refreshed',
    noIssuesFound: 'No security issues found',
    allPasswordsSecure: 'All your passwords are secure',
    noPasswordsFound: 'No passwords found',
    addPasswordToCheckSecurity: 'Add passwords to check their security',
    loading: 'Loading',
    more: 'more',
    passwordEdit: 'Editing password',
    editingPassword: 'Opening password for editing',
    
    // क्रॉस-ब्राउज़र ऑटोफिल
    autofillEnabled: 'Autofill enabled',
    autofillDisabled: 'Autofill disabled',
    enableAutofill: 'Enable autofill',
    autofillDescription: 'Let Pass-X automatically fill your passwords across browsers',
    autofillInstructions: 'To enable autofill in your browser:',
    autofillStep1: '1. Install the Pass-X browser extension',
    autofillStep2: '2. Connect your account to the extension',
    autofillStep3: '3. Allow autofill permissions when prompted',
    downloadExtension: 'Download extension',
    
    // साइडबार
    passwords: 'Passwords',
    settings: 'Settings',
    
    // सेटिंग्स पेज
    settingsDescription: 'Configure your password manager settings',
    autoSignIn: 'Sign in automatically',
    autoSignInDesc: 'Remember how you signed in and automatically sign you in when possible',
    onDeviceEncryption: 'Set up on-device encryption',
    onDeviceEncryptionDesc: 'For added safety, encrypt passwords on your device before they\'re saved',
    importPasswords: 'Import passwords',
    importPasswordsDesc: 'Import passwords from a CSV file for',
    exportPasswords: 'Export passwords',
    exportPasswordsDesc: 'After you\'re done using the downloaded file, delete it so that others can\'t see your passwords',
    selectFile: 'Select file',
    downloadFile: 'Download file',
    languageDesc: 'Change the language of the application',
    themeDesc: 'Choose between light and dark theme',
    featureComingSoon: 'This feature is coming soon!',
    
    // फुटर
    copyright: 'All rights reserved',
    update: 'Update',
    updatePassword: 'Update Password',
    updatePasswordFor: 'Update password for',
    newPassword: 'New Password',
    saveNewPassword: 'Save New Password',
    errorUpdatingPassword: 'Error updating password',
    weakDescription: 'These passwords are too short or easy to guess. You should update them.',
    reusedDescription: 'Using the same password on multiple sites is risky. Update them to be unique.',
    compromisedDescription: 'These passwords may have been leaked in data breaches. Update them immediately.',
    allSecure: 'All Your Passwords are Secure',
    
    // पासवर्ड फॉर्म
    updatePasswordDescription: 'Update your password details below.',
    savingChangesPassword: 'Saving changes to your existing password...',
    addingPasswordSecure: 'Your passwords are encrypted with AES-256 algorithm',
    secureVault: 'Your Secure Password Vault',
    storeAllYourPasswords: 'Store all your important passwords in one secure place',
    hidePassword: 'Hide password',
    showPassword: 'Show password',
    copyPassword: 'Copy to clipboard',
    passwordStrength: 'Password Strength',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
  },
  hi: {
    // नेवबार
    appName: 'पास-एक्स',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    logout: 'लॉगआउट',
    welcome: 'नमस्ते',
    language: 'भाषा',
    theme: 'थीम',
    
    // लॉगिन/रजिस्टर फॉर्म
    loginTitle: 'पास-एक्स में लॉगिन करें',
    registerTitle: 'अकाउंट बनाएं',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'नाम',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    loginButton: 'लॉगिन करें',
    registerButton: 'रजिस्टर करें',
    loginProcessing: 'लॉगिन हो रहा है...',
    registerProcessing: 'रजिस्टर हो रहा है...',
    
    // पासवर्ड प्रबंधन
    addPassword: 'नया पासवर्ड',
    passwordManager: 'पासवर्ड मैनेजर',
    securePasswords: 'आपके पासवर्ड सुरक्षित रखें',
    title: 'शीर्षक',
    username: 'उपयोगकर्ता नाम',
    url: 'यूआरएल',
    notes: 'नोट्स',
    category: 'श्रेणी',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    search: 'खोजें',
    generate: 'उत्पन्न करें',
    noPasswords: 'कोई पासवर्ड नहीं मिला। शुरू करने के लिए एक जोड़ें!',
    deleteConfirmation: 'क्या आप वाकई इस पासवर्ड को हटाना चाहते हैं?',
    optional: 'वैकल्पिक',
    selectCategory: 'श्रेणी चुनें',
    social: 'सोशल मीडिया',
    finance: 'वित्त',
    emailCategory: 'ईमेल',
    work: 'कार्य',
    shopping: 'शॉपिंग',
    other: 'अन्य',
    passwordAdded: 'पासवर्ड सफलतापूर्वक जोड़ा गया',
    passwordUpdated: 'पासवर्ड सफलतापूर्वक अपडेट किया गया',
    passwordDeleted: 'पासवर्ड सफलतापूर्वक हटा दिया गया',
    confirmDelete: 'पासवर्ड हटाएं',
    confirmDeleteMessage: 'क्या आप वाकई इस पासवर्ड को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।',
    yes: 'हां',
    no: 'नहीं',
    
    // पासवर्ड चेकअप
    passwordCheckup: 'पासवर्ड चेकअप',
    lastChecked: 'अंतिम जांच',
    compromisedPasswords: 'समझौता किए गए पासवर्ड',
    compromisedPasswordsDesc: 'आपको इन्हें अभी बदलना चाहिए',
    reusedPasswords: 'दोहराए गए पासवर्ड',
    reusedPasswordsDesc: 'अद्वितीय पासवर्ड बनाएं',
    weakPasswords: 'कमजोर पासवर्ड',
    weakPasswordsDesc: 'मजबूत पासवर्ड बनाएं',
    refreshCheckup: 'पासवर्ड चेकअप रिफ्रेश करें',
    checkupRefreshed: 'पासवर्ड सुरक्षा चेकअप रिफ्रेश किया गया',
    noIssuesFound: 'कोई सुरक्षा समस्या नहीं मिली',
    allPasswordsSecure: 'आपके सभी पासवर्ड सुरक्षित हैं',
    noPasswordsFound: 'कोई पासवर्ड नहीं मिला',
    addPasswordToCheckSecurity: 'उनकी सुरक्षा जांचने के लिए पासवर्ड जोड़ें',
    loading: 'लोड हो रहा है',
    more: 'अधिक',
    passwordEdit: 'पासवर्ड संपादित कर रहे हैं',
    editingPassword: 'संपादन के लिए पासवर्ड खोला जा रहा है',
    
    // क्रॉस-ब्राउज़र ऑटोफिल
    autofillEnabled: 'ऑटोफिल सक्षम है',
    autofillDisabled: 'ऑटोफिल अक्षम है',
    enableAutofill: 'ऑटोफिल सक्षम करें',
    autofillDescription: 'Pass-X को ब्राउज़रों में आपके पासवर्ड को स्वचालित रूप से भरने दें',
    autofillInstructions: 'अपने ब्राउज़र में ऑटोफिल सक्षम करने के लिए:',
    autofillStep1: '1. Pass-X ब्राउज़र एक्सटेंशन इंस्टॉल करें',
    autofillStep2: '2. अपने खाते को एक्सटेंशन से कनेक्ट करें',
    autofillStep3: '3. पूछे जाने पर ऑटोफिल अनुमतियों की अनुमति दें',
    downloadExtension: 'एक्सटेंशन डाउनलोड करें',
    
    // साइडबार
    passwords: 'पासवर्ड',
    settings: 'सेटिंग्स',
    
    // सेटिंग्स पेज
    settingsDescription: 'अपने पासवर्ड मैनेजर की सेटिंग्स कॉन्फ़िगर करें',
    autoSignIn: 'स्वचालित रूप से साइन इन करें',
    autoSignInDesc: 'याद रखें कि आपने कैसे साइन इन किया और जब संभव हो तो स्वचालित रूप से साइन इन करें',
    onDeviceEncryption: 'डिवाइस पर एन्क्रिप्शन सेट करें',
    onDeviceEncryptionDesc: 'अतिरिक्त सुरक्षा के लिए, सहेजे जाने से पहले अपने डिवाइस पर पासवर्ड को एन्क्रिप्ट करें',
    importPasswords: 'पासवर्ड आयात करें',
    importPasswordsDesc: 'CSV फ़ाइल से पासवर्ड आयात करें',
    exportPasswords: 'पासवर्ड निर्यात करें',
    exportPasswordsDesc: 'डाउनलोड की गई फ़ाइल का उपयोग करने के बाद, इसे हटा दें ताकि दूसरे आपके पासवर्ड न देख सकें',
    selectFile: 'फ़ाइल चुनें',
    downloadFile: 'फ़ाइल डाउनलोड करें',
    languageDesc: 'एप्लिकेशन की भाषा बदलें',
    themeDesc: 'लाइट और डार्क थीम के बीच चुनें',
    featureComingSoon: 'यह सुविधा जल्द ही आ रही है!',
    
    // फुटर
    copyright: 'सर्वाधिकार सुरक्षित',
    update: 'अपडेट',
    updatePassword: 'पासवर्ड अपडेट करें',
    updatePasswordFor: 'इसके लिए पासवर्ड अपडेट करें',
    newPassword: 'नया पासवर्ड',
    saveNewPassword: 'नया पासवर्ड सहेजें',
    errorUpdatingPassword: 'पासवर्ड अपडेट करने में त्रुटि',
    weakDescription: 'ये पासवर्ड बहुत छोटे या अनुमान लगाने में आसान हैं। आपको इन्हें अपडेट करना चाहिए।',
    reusedDescription: 'कई साइटों पर एक ही पासवर्ड का उपयोग करना जोखिम भरा है। इन्हें अद्वितीय बनाने के लिए अपडेट करें।',
    compromisedDescription: 'ये पासवर्ड डेटा उल्लंघनों में लीक हो सकते हैं। इन्हें तुरंत अपडेट करें।',
    allSecure: 'आपके सभी पासवर्ड सुरक्षित हैं',
    
    // पासवर्ड फॉर्म
    updatePasswordDescription: 'नीचे अपने पासवर्ड विवरण अपडेट करें।',
    savingChangesPassword: 'आपके मौजूदा पासवर्ड में परिवर्तन सहेजे जा रहे हैं...',
    addingPasswordSecure: 'आपके पासवर्ड AES-256 एल्गोरिथम से एन्क्रिप्ट किए गए हैं',
    secureVault: 'आपका सुरक्षित पासवर्ड वॉल्ट',
    storeAllYourPasswords: 'अपने सभी महत्वपूर्ण पासवर्ड एक सुरक्षित स्थान पर स्टोर करें',
    hidePassword: 'पासवर्ड छिपाएं',
    showPassword: 'पासवर्ड दिखाएं',
    copyPassword: 'क्लिपबोर्ड पर कॉपी करें',
    passwordStrength: 'पासवर्ड की ताकत',
    weak: 'कमज़ोर',
    medium: 'मध्यम',
    strong: 'मज़बूत',
  }
};

// भाषा कंटेक्स्ट प्रोवाइडर प्रॉप्स
interface LanguageProviderProps {
  children: ReactNode;
}

// भाषा कंटेक्स्ट प्रोवाइडर
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // लोकल स्टोरेज से भाषा प्राप्त करें या डिफॉल्ट सेट करें
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'hi') ? savedLanguage : 'en';
  });

  // भाषा परिवर्तन पर लोकल स्टोरेज अपडेट करें
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // अनुवाद फंक्शन
  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// भाषा कंटेक्स्ट का उपयोग करने के लिए हुक
export const useLanguage = () => useContext(LanguageContext); 