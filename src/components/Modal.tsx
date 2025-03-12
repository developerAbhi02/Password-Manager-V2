import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  width = '550px' 
}) => {
  // प्रेस ESC पर मॉडल बंद करें
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // स्क्रॉल बंद करें
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      // स्क्रॉल वापस सक्षम करें
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ओवरले पर क्लिक करने पर मॉडल बंद करें
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(2px)',
      }}
    >
      <div 
        className="modal-content"
        style={{
          width: width,
          maxWidth: '95%',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          padding: '24px',
          position: 'relative',
          animation: 'modalFadeIn 0.3s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal; 