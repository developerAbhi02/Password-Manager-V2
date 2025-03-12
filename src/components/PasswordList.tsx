import React, { useState } from 'react';
import { PasswordEntry } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PasswordListProps {
  passwords: PasswordEntry[];
  onEdit: (password: PasswordEntry) => void;
  onDelete: (id: string) => void;
}

const PasswordList: React.FC<PasswordListProps> = ({ passwords, onEdit, onDelete }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // पासवर्ड को फिल्टर करें
  const filteredPasswords = passwords.filter(password => {
    const matchesSearch = 
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (password.url && password.url.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (password.notes && password.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || password.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // अद्वितीय श्रेणियां प्राप्त करें
  const categories = Array.from(new Set(passwords.map(p => p.category).filter(Boolean)));

  // पासवर्ड हटाने का हैंडलर
  const handleDelete = (password: PasswordEntry) => {
    console.log('Deleting password:', password);
    // _id मौजूद होने पर वह उपयोग करें, अन्यथा id का उपयोग करें
    const idToDelete = password._id || password.id;
    console.log('Using ID to delete:', idToDelete);
    onDelete(idToDelete);
  };

  return (
    <div className="password-list">
      <div className="list-header">
        <h2>{t('passwordManager')}</h2>
        <div className="filter-controls">
          <input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="">{t('category')}</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredPasswords.length === 0 ? (
        <div className="no-passwords">
          <p>{t('noPasswords')}</p>
        </div>
      ) : (
        <div className="password-items">
          {filteredPasswords.map(password => (
            <div key={password.id || password._id} className="password-item">
              <div className="password-info">
                <h3>{password.title}</h3>
                <p className="username">{password.username}</p>
                {password.url && (
                  <p className="url">
                    <a href={password.url} target="_blank" rel="noopener noreferrer">
                      {password.url}
                    </a>
                  </p>
                )}
                {password.category && <span className="category-tag">{password.category}</span>}
              </div>
              <div className="password-actions">
                <button 
                  className="edit-btn"
                  onClick={() => onEdit(password)}
                >
                  {t('edit')}
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(password)}
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordList; 