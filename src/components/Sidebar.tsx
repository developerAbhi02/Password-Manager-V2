import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchPasswords } from '../services/api';
import { analyzePasswords } from '../services/passwordAnalyzer';

const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [issueCount, setIssueCount] = useState<number | null>(null);

  // पासवर्ड जांच के मुद्दे लोड करें
  useEffect(() => {
    const loadSecurityIssues = async () => {
      try {
        const passwords = await fetchPasswords();
        if (passwords.length > 0) {
          const analysis = analyzePasswords(passwords);
          const totalIssues = 
            analysis.compromisedPasswords.length + 
            analysis.reusedPasswords.length + 
            analysis.weakPasswords.length;
          
          setIssueCount(totalIssues > 0 ? totalIssues : null);
        } else {
          setIssueCount(null);
        }
      } catch (error) {
        console.error('पासवर्ड चेकअप बैज लोड करते समय त्रुटि:', error);
        setIssueCount(null);
      }
    };

    loadSecurityIssues();
    
    // 5 मिनट में रिफ्रेश करें
    const interval = setInterval(loadSecurityIssues, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ऐप लोगो और नेविगेशन आइटम्स
  const navItems = [
    {
      id: 'passwords',
      label: t('passwords'),
      path: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      id: 'checkup',
      label: t('passwordCheckup'),
      path: '/checkup',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
        </svg>
      ),
      badge: issueCount
    },
    {
      id: 'settings',
      label: t('settings'),
      path: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="sidebar">
      <div style={{ padding: '10px 20px', marginBottom: '20px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="var(--primary-color)" 
            style={{ marginRight: '10px' }}
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
            <path d="M10.3 5.7l1.4 1.4L8.8 10l3 3-1.4 1.4-4.4-4.4z"/>
          </svg>
          Pass-X
        </h2>
      </div>

      <ul className="sidebar-nav">
        {navItems.map(item => (
          <li
            key={item.id}
            className={`sidebar-nav-item ${currentPath === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar; 