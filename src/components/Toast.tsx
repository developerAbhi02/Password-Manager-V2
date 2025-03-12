import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { isDark, colors } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // फेड आउट एनिमेशन के बाद पूरी तरह से हटा दें
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // टोस्ट की स्टाइल टाइप के अनुसार
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'var(--success-color)',
          gradientColor: isDark ? 'rgba(43, 138, 62, 0.9)' : 'rgba(16, 185, 129, 0.95)',
          color: 'white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )
        };
      case 'error':
        return {
          backgroundColor: 'var(--error-color)',
          gradientColor: isDark ? 'rgba(224, 49, 49, 0.9)' : 'rgba(220, 38, 38, 0.95)',
          color: 'white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )
        };
      case 'info':
      default:
        return {
          backgroundColor: colors.saffron,
          gradientColor: isDark ? 'rgba(255, 133, 51, 0.9)' : 'rgba(255, 153, 51, 0.95)',
          color: 'white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
          )
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div
      style={{
        position: 'fixed',
        top: '65px', // नेवबार के नीचे
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible ? 0 : '-20px'})`,
        padding: '0',
        borderRadius: '8px',
        boxShadow: isDark 
          ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        background: `linear-gradient(135deg, ${typeStyles.backgroundColor}, ${typeStyles.gradientColor})`,
        color: typeStyles.color,
        maxWidth: '320px',
        width: 'calc(100% - 32px)',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: 10000,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        fontSize: '0.9rem'
      }}
    >
      <div 
        className="toast-icon" 
        style={{
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {typeStyles.icon}
      </div>
      <div 
        style={{ 
          flex: 1, 
          padding: '10px 12px', 
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {message}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

// टोस्ट कांटेक्स्ट और प्रोवाइडर
import { createContext, useContext, ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = 'success', duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default Toast; 