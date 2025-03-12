import React, { ReactNode } from 'react';

interface SwitchProps {
  checked?: boolean;
  isOn?: boolean;
  onChange?: () => void;
  onToggle?: () => void;
  leftLabel?: string | ReactNode;
  rightLabel?: string | ReactNode;
  onLabel?: string | ReactNode;
  offLabel?: string | ReactNode;
  colorOn?: string;
  colorOff?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  isOn,
  onChange,
  onToggle,
  leftLabel,
  rightLabel,
  onLabel,
  offLabel,
  colorOn = '#6366f1',
  colorOff = '#94a3b8'
}) => {
  // समर्थन के लिए पुराने और नए प्रोप्स का उपयोग करें
  const isActive = checked !== undefined ? checked : isOn;
  const handleChange = onChange || onToggle || (() => {});
  const leftText = leftLabel || offLabel;
  const rightText = rightLabel || onLabel;

  return (
    <div className="switch-container" style={{ display: 'flex', alignItems: 'center' }}>
      {leftText && <span style={{ marginRight: '8px', fontSize: '0.9rem' }}>{leftText}</span>}
      
      <div
        onClick={handleChange}
        style={{
          position: 'relative',
          width: '40px',
          height: '20px',
          backgroundColor: isActive ? colorOn : colorOff,
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: isActive ? '22px' : '2px',
            top: '2px',
            width: '16px',
            height: '16px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.3s',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
      
      {rightText && <span style={{ marginLeft: '8px', fontSize: '0.9rem' }}>{rightText}</span>}
    </div>
  );
};

export default Switch; 