import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import Switch from './Switch';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark, colors } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // स्क्रॉल पर नेवबार का भाव बदलें
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className="navbar" 
      style={{
        backgroundColor: isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.borderColor}`,
        transition: 'all 0.3s ease-in-out',
        padding: '0.8rem 1.5rem',
        boxShadow: scrolled 
          ? isDark 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1)'
          : 'none',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div 
        className="navbar-container" 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className="navbar-logo" style={{ padding: '0.5rem 0' }}>
          {/* लोगो को क्लिकेबल से हटा दिया गया है */}
          <Logo size="small" />
        </div>
        
        <div 
          className="navbar-controls" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div 
            className="switch-group" 
            style={{
              display: 'flex',
              alignItems: 'center',
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              padding: '4px 8px',
              borderRadius: '50px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <Switch 
              isOn={isDark}
              onToggle={toggleTheme}
              offLabel={<SunIcon />}
              onLabel={<MoonIcon />}
              colorOn={colors.saffron}
              colorOff={colors.green}
            />
          </div>
          
          <div 
            className="switch-group" 
            style={{
              display: 'flex',
              alignItems: 'center',
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              padding: '4px 8px',
              borderRadius: '50px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <Switch 
              isOn={language === 'hi'}
              onToggle={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              offLabel="EN"
              onLabel="हि"
              colorOn={colors.saffron}
              colorOff={colors.green}
            />
          </div>
          
          <div 
            className="navbar-links" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {user ? (
              <>
                <span 
                  className="navbar-user" 
                  style={{
                    marginRight: '1rem',
                    fontWeight: 500,
                    color: colors.textColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%', 
                    backgroundColor: colors.green,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase'
                  }}>
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span>{t('welcome')}, {user.name}</span>
                </span>
                <button 
                  className="logout-btn" 
                  onClick={logout}
                  style={{
                    background: `linear-gradient(to right, ${colors.saffron}, ${colors.green})`,
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    fontWeight: 500,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <Link 
                    to="/login" 
                    className="auth-link"
                    style={{
                      color: colors.textColor,
                      textDecoration: 'none',
                      padding: '0.5rem 1.2rem',
                      borderRadius: '50px',
                      background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.2s ease',
                      fontWeight: 500,
                      display: 'inline-block',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {t('login')}
                  </Link>
                )}
                
                {location.pathname !== '/register' && (
                  <Link 
                    to="/register" 
                    className="auth-link"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '0.5rem 1.2rem',
                      borderRadius: '50px',
                      background: `linear-gradient(to right, ${colors.saffron}, ${colors.green})`,
                      transition: 'all 0.2s ease',
                      fontWeight: 500,
                      display: 'inline-block',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {t('register')}
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// सूर्य आइकन
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

// चंद्रमा आइकन
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export default Navbar; 