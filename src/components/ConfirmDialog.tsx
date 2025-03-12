import React from 'react';
import Modal from './Modal';
import { useLanguage } from '../context/LanguageContext';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}) => {
  const { t } = useLanguage();
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <div className="confirm-dialog">
        <h3 style={{ color: 'var(--error-color)', marginBottom: '15px' }}>{title}</h3>
        <p style={{ marginBottom: '25px', color: 'var(--text-color)' }}>{message}</p>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--text-color)'
            }}
          >
            {t('no')}
          </button>
          <button 
            onClick={handleConfirm}
            style={{
              backgroundColor: 'var(--error-color)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            {t('yes')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog; 