import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from './Toast';
import Switch from './Switch';

const AutofillSettings: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const { showToast } = useToast();
  const [isAutofillEnabled, setIsAutofillEnabled] = useState(false);

  const handleToggleAutofill = () => {
    setIsAutofillEnabled(!isAutofillEnabled);
    showToast(
      !isAutofillEnabled ? t('autofillEnabled') : t('autofillDisabled'),
      !isAutofillEnabled ? 'success' : 'info'
    );
  };

  return (
    <div className="autofill-settings">
      <div className="settings-section">
        <div className="settings-row">
          <div className="settings-info">
            <h3>{t('enableAutofill')}</h3>
            <p>{t('autofillDescription')}</p>
          </div>
          <div className="settings-action">
            <Switch
              checked={isAutofillEnabled}
              onChange={handleToggleAutofill}
            />
          </div>
        </div>
      </div>

      {!isAutofillEnabled && (
        <div className="settings-section">
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>
            {t('autofillInstructions')}
          </h3>
          
          <div className="browser-extensions" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Chrome extension */}
            <div className="browser-extension-card" style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '16px',
              width: 'calc(50% - 10px)',
              minWidth: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img
                src="https://www.google.com/chrome/static/images/chrome-logo.svg"
                alt="Chrome"
                style={{ width: '48px', height: '48px' }}
              />
              <h4>Google Chrome</h4>
              <button
                className="file-input-button"
                onClick={() => window.open('https://chrome.google.com/webstore/category/extensions', '_blank')}
              >
                {t('downloadExtension')}
              </button>
            </div>

            {/* Firefox extension */}
            <div className="browser-extension-card" style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '16px',
              width: 'calc(50% - 10px)',
              minWidth: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <img
                src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo.eb1324e44442.svg"
                alt="Firefox"
                style={{ width: '48px', height: '48px' }}
              />
              <h4>Mozilla Firefox</h4>
              <button
                className="file-input-button"
                onClick={() => window.open('https://addons.mozilla.org/en-US/firefox/extensions/', '_blank')}
              >
                {t('downloadExtension')}
              </button>
            </div>
          </div>

          <div className="installation-steps" style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.6)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px dashed var(--border-color)'
          }}>
            <p style={{ fontWeight: '500', marginBottom: '8px' }}>{t('autofillStep1')}</p>
            <p style={{ fontWeight: '500', marginBottom: '8px' }}>{t('autofillStep2')}</p>
            <p style={{ fontWeight: '500', marginBottom: '0' }}>{t('autofillStep3')}</p>
          </div>
        </div>
      )}

      {isAutofillEnabled && (
        <div className="settings-section" style={{
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid var(--success-color)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--success-color)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p style={{ fontWeight: '500', margin: '0' }}>{t('autofillEnabled')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutofillSettings; 