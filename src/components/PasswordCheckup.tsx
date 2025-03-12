import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { PasswordEntry } from '../types';
import { PasswordCheckResult, analyzePasswords } from '../services/passwordAnalyzer';
import { fetchPasswords } from '../services/api';
import { useToast } from './Toast';
import { generatePassword } from '../services/cryptoService';

interface PasswordCheckupProps {
  onEdit?: (password: PasswordEntry) => void;
}

const PasswordCheckup: React.FC<PasswordCheckupProps> = ({ onEdit }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkupResult, setCheckupResult] = useState<PasswordCheckResult | null>(null);
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState<PasswordEntry | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    loadPasswords();
    
    const interval = setInterval(() => {
      loadPasswords(false);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const loadPasswords = async (showLoadingState = true) => {
    if (showLoadingState) {
      setIsLoading(true);
    }
    try {
      const data = await fetchPasswords();
      setPasswords(data);
      
      if (data.length > 0) {
        const result = analyzePasswords(data);
        setCheckupResult(result);
      } else {
        setCheckupResult({
          lastChecked: new Date(),
          compromisedPasswords: [],
          reusedPasswords: [],
          weakPasswords: []
        });
      }
    } catch (error) {
      console.error('पासवर्ड लोड करने में त्रुटि:', error);
      showToast('Failed to load passwords for checkup', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshCheckup = () => {
    loadPasswords();
    showToast(t('checkupRefreshed'), 'success');
  };

  const handleEditPassword = (password: PasswordEntry) => {
    navigate('/', { state: { editPassword: password } });
    showToast(t('passwordEdit'), 'info');
  };
  
  const handleUpdatePassword = (password: PasswordEntry) => {
    setSelectedPassword(password);
    const generated = generatePassword();
    setNewPassword(generated);
    setShowPasswordModal(true);
  };
  
  const handleSaveNewPassword = () => {
    if (!selectedPassword) return;
    
    try {
      const updatedPassword = {
        ...selectedPassword,
        password: newPassword
      };
      
      if (onEdit) {
        onEdit(updatedPassword);
        showToast(t('passwordUpdated'), 'success');
        
        setShowPasswordModal(false);
        setSelectedPassword(null);
        setTimeout(() => loadPasswords(false), 1000);
      }
    } catch (error) {
      console.error('पासवर्ड अपडेट करने में त्रुटि:', error);
      showToast(t('errorUpdatingPassword'), 'error');
    }
  };
  
  const handleCancelUpdate = () => {
    setShowPasswordModal(false);
    setSelectedPassword(null);
  };
  
  const handleGenerateNewPassword = () => {
    const generated = generatePassword();
    setNewPassword(generated);
  };

  const totalIssues = checkupResult ? 
    checkupResult.compromisedPasswords.length + 
    checkupResult.reusedPasswords.length + 
    checkupResult.weakPasswords.length : 0;

  const PasswordItem = ({ password }: { password: PasswordEntry }) => (
    <div className="password-item-checkup" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 12px',
      margin: '4px 0',
      borderRadius: '4px',
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.borderColor}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }} onClick={() => handleEditPassword(password)}>
      <div>
        <strong style={{ color: colors.textColor }}>{password.title}</strong> 
        <span style={{ opacity: 0.7, marginLeft: '5px', color: colors.textMuted }}>
          ({password.username})
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleEditPassword(password);
          }}
          style={{
            background: 'none',
            border: `1px solid ${colors.borderColor}`,
            color: colors.textColor,
            borderRadius: '4px',
            padding: '3px 10px',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          {t('edit')}
        </button>
        <button
          className="update-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleUpdatePassword(password);
          }}
          style={{
            background: colors.saffron,
            border: 'none',
            color: '#fff',
            borderRadius: '4px',
            padding: '3px 10px',
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          {t('update')}
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">{t('passwordCheckup')}</h1>
        </div>
        <div className="password-checkup" style={{
          backgroundColor: colors.cardBg,
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center',
          color: colors.textColor
        }}>
          <p>{t('loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ color: colors.textColor }}>
          {t('passwordCheckup')} 
          {totalIssues > 0 && (
            <span className="badge" style={{ 
              backgroundColor: totalIssues > 0 ? colors.saffron : colors.green, 
              color: '#fff' 
            }}>
              {totalIssues}
            </span>
          )}
        </h1>
        {checkupResult && (
          <p className="page-description" style={{ color: colors.textMuted }}>
            {t('lastChecked')}: {new Intl.DateTimeFormat(undefined, { 
              dateStyle: 'medium', 
              timeStyle: 'short' 
            }).format(checkupResult.lastChecked)}
          </p>
        )}
      </div>

      <div className="password-checkup" style={{
        backgroundColor: colors.cardBg,
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow)',
        transition: 'box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        color: colors.textColor
      }}>
        <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="120" 
            height="120" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={colors.textColor} 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button 
            onClick={handleRefreshCheckup}
            style={{
              background: 'none',
              border: 'none',
              color: colors.primaryColor,
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={t('refreshCheckup')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9a9 9 0 0 0-9-9m9 9a9 9 0 0 1 0-18"></path>
            </svg>
          </button>
        </div>

        <div className="checkup-items">
          {checkupResult && checkupResult.compromisedPasswords.length > 0 && (
            <div className="checkup-item" style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              marginBottom: '1rem',
              borderLeft: '4px solid var(--error-color)',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '1rem', color: 'var(--error-color)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.3rem', fontSize: '1rem', color: 'var(--error-color)' }}>
                    {checkupResult.compromisedPasswords.length} {t('compromisedPasswords')}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {t('compromisedPasswordsDesc')}
                  </p>
                </div>
              </div>
              
              <div className="password-items-list" style={{ marginTop: '10px' }}>
                {checkupResult.compromisedPasswords.map(password => (
                  <PasswordItem key={password.id || password._id} password={password} />
                ))}
              </div>
            </div>
          )}

          {checkupResult && checkupResult.reusedPasswords.length > 0 && (
            <div className="checkup-item" style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: `${colors.saffron}20`,
              marginBottom: '1rem',
              borderLeft: `4px solid ${colors.saffron}`,
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '1rem', color: colors.saffron }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.3rem', fontSize: '1rem', color: colors.saffron }}>
                    {checkupResult.reusedPasswords.length} {t('reusedPasswords')}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {t('reusedPasswordsDesc')}
                  </p>
                </div>
              </div>
              
              <div className="password-items-list" style={{ marginTop: '10px' }}>
                {checkupResult.reusedPasswords.map(password => (
                  <PasswordItem key={password.id || password._id} password={password} />
                ))}
              </div>
            </div>
          )}

          {checkupResult && checkupResult.weakPasswords.length > 0 && (
            <div className="checkup-item" style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: `${colors.saffron}20`,
              marginBottom: '1rem',
              borderLeft: `4px solid ${colors.saffron}`,
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <div style={{ marginRight: '1rem', color: colors.saffron }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.3rem', fontSize: '1rem', color: colors.saffron }}>
                    {checkupResult.weakPasswords.length} {t('weakPasswords')}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {t('weakPasswordsDesc')}
                  </p>
                </div>
              </div>
              
              <div className="password-items-list" style={{ marginTop: '10px' }}>
                {checkupResult.weakPasswords.map(password => (
                  <PasswordItem key={password.id || password._id} password={password} />
                ))}
              </div>
            </div>
          )}

          {(!checkupResult || (
            checkupResult.compromisedPasswords.length === 0 && 
            checkupResult.reusedPasswords.length === 0 && 
            checkupResult.weakPasswords.length === 0
          )) && (
            <div className="all-secure" style={{
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: `${colors.green}20`,
              borderRadius: '8px'
            }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={colors.green}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginBottom: '1rem' }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <h3 style={{ marginBottom: '0.5rem', color: colors.green }}>
                {t('allSecure')}
              </h3>
              <p style={{ color: colors.textMuted }}>
                {t('noIssuesFound')}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {showPasswordModal && selectedPassword && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="password-modal" style={{
            backgroundColor: colors.cardBg,
            borderRadius: '8px',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '400px',
            boxShadow: 'var(--shadow)',
            color: colors.textColor
          }}>
            <h3 style={{ marginTop: 0, color: colors.primaryColor }}>
              {t('updatePassword')}
            </h3>
            <p>
              {t('updatePasswordFor')}: <strong>{selectedPassword.title}</strong>
            </p>
            
            <div className="new-password-input" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="newPassword" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                color: colors.textMuted
              }}>
                {t('newPassword')}
              </label>
              <div style={{ 
                display: 'flex',
                border: `1px solid ${colors.borderColor}`,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ 
                    flex: 1,
                    padding: '0.5rem',
                    border: 'none',
                    backgroundColor: colors.backgroundColor,
                    color: colors.textColor
                  }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: colors.textMuted
                  }}
                >
                  {showNewPassword ? (
                    <span role="img" aria-label="hide">👁️‍🗨️</span>
                  ) : (
                    <span role="img" aria-label="show">👁️</span>
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={handleGenerateNewPassword}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: colors.saffron
                  }}
                >
                  <span role="img" aria-label="generate">🔄</span>
                </button>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: '0.5rem' 
            }}>
              <button 
                type="button" 
                onClick={handleCancelUpdate}
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.borderColor}`,
                  color: colors.textColor,
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {t('cancel')}
              </button>
              <button 
                type="button" 
                onClick={handleSaveNewPassword}
                style={{
                  backgroundColor: colors.primaryColor,
                  border: 'none',
                  color: colors.white,
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordCheckup; 