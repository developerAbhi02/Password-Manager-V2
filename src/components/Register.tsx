import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  
  const { register, loading, error } = useAuth();
  const { t } = useLanguage();
  const { colors } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // पासवर्ड वैलिडेशन
    if (password !== confirmPassword) {
      setFormError('पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते');
      return;
    }
    
    if (password.length < 6) {
      setFormError('पासवर्ड कम से कम 6 अक्षर का होना चाहिए');
      return;
    }
    
    // रजिस्ट्रेशन
    if (name && email && password) {
      await register(name, email, password);
    }
  };

  return (
    <div className="auth-form fade-in">
      <div className="form-logo-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <Logo size="large" />
      </div>
      <h2>{t('registerTitle')}</h2>
      {(error || formError) && <div className="error-message">{formError || error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div className="form-group">
          <label htmlFor="name">{t('name')}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? t('registerProcessing') : t('registerButton')}
        </button>
      </form>
    </div>
  );
};

export default Register; 