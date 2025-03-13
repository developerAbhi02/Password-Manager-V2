import React, { useEffect, useState } from 'react';
import { PasswordEntry } from '../types';
import { generatePassword } from '../services/cryptoService';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { FaEye, FaEyeSlash, FaRandom, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/PasswordForm.css';

interface PasswordFormProps {
  initialData?: PasswordEntry;
  onSubmit: (data: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  'Business',
  'Business Email',
  'Entertainment',
  'Finance',
  'Games',
  'News',
  'Shopping',
  'Social Media',
  'Sports',
  'Tech',
  'Travel',
  'Utilities',
  'Other'
];

const PasswordForm: React.FC<PasswordFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
    category: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthClass, setStrengthClass] = useState('');
  const [strengthText, setStrengthText] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        username: initialData.username,
        password: initialData.password,
        url: initialData.url || '',
        notes: initialData.notes || '',
        category: initialData.category || '',
      });
      checkPasswordStrength(initialData.password);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
    // यदि URL भरा गया है और शीर्षक खाली है, तो URL से डोमेन निकालकर शीर्षक में भरें
    if (name === 'url' && value && !formData.title) {
      try {
        const domain = new URL(value).hostname.replace('www.', '');
        const domainParts = domain.split('.');
        if (domainParts.length >= 2) {
          const siteName = domainParts[domainParts.length - 2];
          setFormData(prev => ({ 
            ...prev, 
            title: siteName.charAt(0).toUpperCase() + siteName.slice(1)
          }));
        }
      } catch (error) {
        // URL पार्स में त्रुटि - कुछ न करें
      }
    }
  };

  const checkPasswordStrength = (password: string) => {
    // पासवर्ड शक्ति की जाँच
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    let strength = 0;
    if (length > 0) strength += 1;
    if (length >= 8) strength += 1;
    if (length >= 12) strength += 1;
    if (hasLower && hasUpper) strength += 1;
    if (hasNumber) strength += 1;
    if (hasSpecial) strength += 1;

    setPasswordStrength(strength);

    // शक्ति वर्ग और टेक्स्ट सेट करें
    let strengthClassValue = '';
    let strengthTextValue = '';

    if (strength <= 2) {
      strengthClassValue = 'poor';
      strengthTextValue = t('passwordWeak');
    } else if (strength <= 4) {
      strengthClassValue = 'medium';
      strengthTextValue = t('passwordMedium');
    } else {
      strengthClassValue = 'strong';
      strengthTextValue = t('passwordStrong');
    }

    setStrengthClass(strengthClassValue);
    setStrengthText(strengthTextValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(16, true, true, true, true);
    setFormData(prev => ({ ...prev, password: newPassword }));
    checkPasswordStrength(newPassword);
    toast.success(t('passwordGenerated'));
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(formData.password);
    toast.success(t('passwordCopied'));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-form-container" style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '1rem',
      backgroundColor: colors.cardBg,
      borderColor: colors.borderColor,
      color: colors.textColor
    }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: colors.primaryColor }}>
        {initialData ? t('edit') : t('addPassword')}
      </h2>
      
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        {initialData ? 
          t('updatePasswordDescription') : 
          t('secureVault')}
      </div>

      <form onSubmit={handleSubmit} className="password-form">
        {/* वेबसाइट URL */}
        <div className="form-group">
          <label htmlFor="url">
            {t('url')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="ex: outlook.com"
            value={formData.url}
            onChange={handleChange}
            required
            className="form-control"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColor
            }}
          />
        </div>

        {/* उपयोगकर्ता नाम */}
        <div className="form-group">
          <label htmlFor="username">
            {t('username')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder={t('username')}
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColor
            }}
          />
        </div>

        {/* शीर्षक */}
        <div className="form-group">
          <label htmlFor="title">
            {t('title')} <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder={t('title')}
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColor
            }}
          />
        </div>

        {/* पासवर्ड */}
        <div className="form-group">
          <label htmlFor="password">
            {t('password')} <span className="required">*</span>
          </label>
          <div className="password-input-wrapper" style={{ 
            borderColor: colors.borderColor,
            backgroundColor: colors.backgroundColor
          }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder={t('password')}
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              style={{ 
                border: 'none',
                backgroundColor: 'transparent',
                color: colors.textColor,
                width: 'calc(100% - 80px)'
              }}
            />
            <div className="password-actions">
              <button
                type="button"
                onClick={() => toggleShowPassword()}
                className="icon-button"
                title={showPassword ? t('hidePassword') : t('showPassword')}
                style={{ color: colors.textMuted }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="icon-button"
                title={t('generate')}
                style={{ color: colors.saffron }}
              >
                <FaRandom />
              </button>
              <button
                type="button"
                onClick={handleCopyPassword}
                className="icon-button"
                title={t('copyPassword')}
                style={{ color: colors.green }}
              >
                <FaCopy />
              </button>
            </div>
          </div>
          {/* पासवर्ड शक्ति इंडिकेटर */}
          {formData.password && (
            <div className="password-strength">
              <div className="strength-meter">
                <div
                  className={`strength-meter-fill ${strengthClass}`}
                  style={{ 
                    width: `${(passwordStrength / 6) * 100}%`,
                    backgroundColor: 
                      strengthClass === 'poor' ? '#dc2626' : 
                      strengthClass === 'medium' ? colors.saffron : 
                      colors.green
                  }}
                ></div>
              </div>
              <div className="strength-text" style={{ color: colors.textMuted }}>
                {strengthText}
              </div>
            </div>
          )}
        </div>

        {/* श्रेणी */}
        <div className="form-group">
          <label htmlFor="category">
            {t('category')}
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColor
            }}
          >
            <option value="">{t('selectCategory')}</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {t(category.toLowerCase().replace(' ', ''))}
              </option>
            ))}
          </select>
        </div>

        {/* नोट्स */}
        <div className="form-group">
          <label htmlFor="notes">
            {t('notes')}
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder={`${t('notes')} (${t('optional')})`}
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
            rows={4}
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColor
            }}
          />
        </div>

        <div className="form-footer">
          <div className="form-info" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {initialData ? 
              t('savingChangesPassword') : 
              t('storeAllYourPasswords')}
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-cancel"
              style={{ 
                backgroundColor: 'transparent',
                color: colors.textColor,
                borderColor: colors.borderColor
              }}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="btn-save"
              style={{ 
                backgroundColor: colors.primaryColor,
                color: colors.white
              }}
            >
              {t('save')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm; 