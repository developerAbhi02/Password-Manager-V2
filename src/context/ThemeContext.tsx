import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// थीम प्रकार
export type Theme = 'light' | 'dark';

// थीम कंटेक्स्ट टाइप
interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  // भारतीय ध्वज के रंग
  colors: {
    saffron: string;
    green: string;
    white: string;
    navy: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    cardBg: string;
    textColor: string;
    textMuted: string;
    borderColor: string;
  };
}

// डिफॉल्ट मान के साथ कंटेक्स्ट बनाएं
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  colors: {
    saffron: '#FF9933',
    green: '#138808',
    white: '#FFFFFF',
    navy: '#000080',
    primaryColor: '#138808', // हरा
    secondaryColor: '#FF9933', // केसरिया
    backgroundColor: '#F8F8F8', // हल्का सफेद
    cardBg: '#FFFFFF', // सफेद
    textColor: '#333333', // काला
    textMuted: '#6B7280', // ग्रे
    borderColor: '#E5E7EB' // हल्का ग्रे
  }
});

// थीम कंटेक्स्ट प्रोवाइडर प्रॉप्स
interface ThemeProviderProps {
  children: ReactNode;
}

// CSS रूट वेरिएबल्स को अपडेट करें
const updateCSSVariables = (isDark: boolean) => {
  const root = document.documentElement;
  
  // भारतीय ध्वज के रंग
  const saffron = isDark ? '#FF8533' : '#FF9933'; // केसरिया/नारंगी
  const green = isDark ? '#127507' : '#138808'; // हरा
  const white = isDark ? '#E0E0E0' : '#FFFFFF'; // सफेद
  const navy = isDark ? '#000033' : '#000080'; // नेवी ब्लू
  
  // बेसिक कलर्स
  root.style.setProperty('--saffron', saffron);
  root.style.setProperty('--green', green);
  root.style.setProperty('--white', white);
  root.style.setProperty('--navy', navy);
  
  // थीम कलर्स
  root.style.setProperty('--primary-color', green);
  root.style.setProperty('--secondary-color', saffron);
  root.style.setProperty('--error-color', isDark ? '#e03131' : '#dc2626');
  root.style.setProperty('--success-color', isDark ? '#2b8a3e' : '#10b981');
  
  // बैकग्राउंड और टेक्स्ट
  root.style.setProperty('--bg-color', isDark ? '#121212' : '#F8F8F8');
  root.style.setProperty('--card-bg', isDark ? '#1e1e1e' : white);
  root.style.setProperty('--card-hover-bg', isDark ? '#2d2d2d' : '#f1f5f9');
  root.style.setProperty('--text-color', isDark ? white : '#333333');
  root.style.setProperty('--text-muted', isDark ? '#9ca3af' : '#6B7280');
  
  // बॉर्डर और शैडो
  root.style.setProperty('--border-color', isDark ? '#333333' : '#E5E7EB');
  root.style.setProperty('--shadow', isDark ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.1)');
  
  // फॉर्म एलीमेंट्स
  root.style.setProperty('--input-bg', isDark ? '#2d2d2d' : white);
  root.style.setProperty('--input-text', isDark ? white : '#333333');
  root.style.setProperty('--input-placeholder', isDark ? '#9ca3af' : '#6B7280');
  root.style.setProperty('--input-border', isDark ? '#444444' : '#E5E7EB');
  
  // नेवबार
  root.style.setProperty('--navbar-bg', isDark ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)');
  root.style.setProperty('--navbar-text', isDark ? white : '#333333');
  
  // बटन
  root.style.setProperty('--button-bg', isDark ? '#2d2d2d' : '#f1f5f9');
  root.style.setProperty('--button-text', isDark ? white : '#333333');
  
  // एप्लिकेशन का बैकग्राउंड
  document.body.style.backgroundColor = isDark ? '#121212' : '#F8F8F8';
  document.body.style.color = isDark ? white : '#333333';
  
  // HTML एलिमेंट पर क्लास सेट करें (CSS सेलेक्टर्स के लिए)
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

// थीम कंटेक्स्ट प्रोवाइडर
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // लोकल स्टोरेज से थीम प्राप्त करें या डिफॉल्ट सेट करें
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme as Theme : 'light';
  });
  
  const isDark = theme === 'dark';
  
  // थीम कलर्स
  const colors = {
    saffron: isDark ? '#FF8533' : '#FF9933', // केसरिया/नारंगी
    green: isDark ? '#127507' : '#138808', // हरा
    white: isDark ? '#E0E0E0' : '#FFFFFF', // सफेद
    navy: isDark ? '#000033' : '#000080', // नेवी ब्लू
    primaryColor: isDark ? '#127507' : '#138808', // हरा
    secondaryColor: isDark ? '#FF8533' : '#FF9933', // केसरिया
    backgroundColor: isDark ? '#121212' : '#F8F8F8', // पृष्ठभूमि
    cardBg: isDark ? '#1e1e1e' : '#FFFFFF', // कार्ड पृष्ठभूमि
    textColor: isDark ? '#E0E0E0' : '#333333', // टेक्स्ट
    textMuted: isDark ? '#9ca3af' : '#6B7280', // धूसर टेक्स्ट
    borderColor: isDark ? '#333333' : '#E5E7EB' // बॉर्डर
  };
  
  // थीम परिवर्तन पर CSS वेरिएबल्स और लोकल स्टोरेज अपडेट करें
  useEffect(() => {
    localStorage.setItem('theme', theme);
    updateCSSVariables(isDark);
    
    // <html> एलिमेंट को dark क्लास टॉगल करें
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isDark]);
  
  // थीम को टॉगल करें
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        colors
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// थीम कंटेक्स्ट का उपयोग करने के लिए हुक
export const useTheme = () => useContext(ThemeContext); 