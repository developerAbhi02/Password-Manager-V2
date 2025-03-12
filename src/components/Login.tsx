import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const { t } = useLanguage();
  const { colors } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await login(email, password);
    }
  };

  return (
    <div className="auth-form fade-in">
      <div className="form-logo-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <Logo size="large" />
      </div>
      <h2>{t('loginTitle')}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="form-group">
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="user@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{t('password')}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
          style={{ 
            marginTop: '1rem',
            background: `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.primaryColor} 100%)`
          }}
        >
          {loading ? t('loginProcessing') : t('loginButton')}
        </button>
      </form>
    </div>
  );
};

export default Login; 