import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Switch from './Switch';
import AutofillSettings from './AutofillSettings';

const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const handleImportClick = () => {
    // फ़ाइल इंपोर्ट लॉजिक
    alert(t('featureComingSoon'));
  };

  const handleExportClick = () => {
    // फ़ाइल एक्सपोर्ट लॉजिक
    alert(t('featureComingSoon'));
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">{t('settings')}</h1>
        <p className="page-description">{t('settingsDescription')}</p>
      </div>

      <div className="settings-section">
        <div className="settings-row">
          <div className="settings-info">
            <h3>{t('autoSignIn')}</h3>
            <p>{t('autoSignInDesc')}</p>
          </div>
          <div className="settings-action">
            <Switch 
              checked={true} 
              onChange={() => alert(t('featureComingSoon'))} 
            />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-row">
          <div className="settings-info">
            <h3>{t('onDeviceEncryption')}</h3>
            <p>{t('onDeviceEncryptionDesc')}</p>
          </div>
          <div className="settings-action">
            <Switch 
              checked={true} 
              onChange={() => alert(t('featureComingSoon'))} 
            />
          </div>
        </div>
      </div>

      {/* ऑटोफिल सेटिंग्स */}
      <AutofillSettings />

      <div className="settings-section">
        <div className="settings-row">
          <div className="settings-info">
            <h3>{t('importPasswords')}</h3>
            <p>{t('importPasswordsDesc')}{user?.email ? ` ${user.email}` : ''}</p>
          </div>
          <div className="settings-action">
            <button 
              className="file-input-button"
              onClick={handleImportClick}
            >
              {t('selectFile')}
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-info">
            <h3>{t('exportPasswords')}</h3>
            <p>{t('exportPasswordsDesc')}</p>
          </div>
          <div className="settings-action">
            <button 
              className="file-input-button"
              onClick={handleExportClick}
            >
              {t('downloadFile')}
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-row">
          <div className="settings-info">
            <h3>{t('language')}</h3>
            <p>{t('languageDesc')}</p>
          </div>
          <div className="settings-action">
            <Switch 
              checked={language === 'hi'} 
              onChange={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              leftLabel="EN"
              rightLabel="हिंदी"
            />
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-info">
            <h3>{t('theme')}</h3>
            <p>{t('themeDesc')}</p>
          </div>
          <div className="settings-action">
            <Switch 
              checked={isDark} 
              onChange={toggleTheme}
              leftLabel="☀️"
              rightLabel="🌙"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 