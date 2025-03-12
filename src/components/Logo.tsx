import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  const { colors, isDark } = useTheme();
  const [rotateKey, setRotateKey] = useState(0);
  const [glowEffect, setGlowEffect] = useState(false);
  
  // आइकन साइज़ निर्धारित करें
  let iconSize: number;
  let fontSize: string;
  let padding: string;
  
  switch (size) {
    case 'small':
      iconSize = 24;
      fontSize = '1rem';
      padding = '3px';
      break;
    case 'large':
      iconSize = 48;
      fontSize = '1.75rem';
      padding = '8px';
      break;
    default: // medium
      iconSize = 32;
      fontSize = '1.25rem';
      padding = '5px';
  }
  
  // थीम परिवर्तन पर एनिमेशन चलाएं
  useEffect(() => {
    setRotateKey(prev => prev + 1);
    setGlowEffect(true);
    const timer = setTimeout(() => setGlowEffect(false), 1000);
    return () => clearTimeout(timer);
  }, [isDark]);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          backgroundColor: colors.green,
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: glowEffect 
            ? `0 0 15px ${isDark ? 'rgba(18, 117, 7, 0.6)' : 'rgba(19, 136, 8, 0.5)'}` 
            : `0 2px 10px rgba(0, 0, 0, 0.2)`,
          transition: 'all 0.3s ease',
        }}
      >
        {/* केसरिया स्ट्रिप */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '20%',
            backgroundColor: colors.saffron,
            transition: 'background-color 0.3s ease'
          }}
        />
        
        {/* शांति चक्र */}
        <div 
          style={{
            position: 'absolute',
            width: '20%',
            height: '20%',
            borderRadius: '50%',
            backgroundColor: colors.navy,
            opacity: 0.5,
            left: '50%',
            top: '10%', 
            transform: 'translateX(-50%)',
            transition: 'all 0.3s ease'
          }}
        />
        
        {/* चाबी आइकन (SVG) */}
        <svg
          key={rotateKey}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.white}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ 
            width: '70%', 
            height: '70%',
            position: 'relative',
            transition: 'all 0.3s ease',
            animation: `keyTurn${rotateKey} 0.5s ease-out`
          }}
        >
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
        
        {/* पिछला रंग ग्रेडिएंट */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: `linear-gradient(to top, rgba(255,255,255,0.1), transparent)`,
            transition: 'all 0.3s ease'
          }}
        />
      </div>
      
      {showText && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'flex-end',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <span
            style={{
              fontSize,
              fontWeight: 700,
              color: colors.textColor,
              letterSpacing: '-0.5px',
              transition: 'color 0.3s ease',
              textShadow: glowEffect ? `0 0 5px ${isDark ? 'rgba(224, 224, 224, 0.3)' : 'rgba(0, 0, 0, 0.2)'}` : 'none'
            }}
          >
            Pass-
          </span>
          <span
            style={{
              fontSize,
              fontWeight: 700,
              color: colors.saffron,
              letterSpacing: '-0.5px',
              transition: 'all 0.3s ease',
              textShadow: glowEffect ? `0 0 8px ${isDark ? 'rgba(255, 133, 51, 0.7)' : 'rgba(255, 153, 51, 0.5)'}` : 'none'
            }}
          >
            X
          </span>
          
          {/* गतिमान अंडरलाइन */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(to right, ${colors.saffron}, ${colors.green})`,
              transition: 'all 0.3s ease',
              transform: isDark ? 'scaleX(1)' : 'scaleX(0.7)',
              opacity: isDark ? 0.8 : 0.5,
              transformOrigin: 'left'
            }}
          />
        </div>
      )}
      
      {/* एनिमेशन स्टाइल्स */}
      <style>
        {`
          @keyframes keyTurn${rotateKey} {
            0% { transform: rotate(-30deg) scale(0.9); opacity: 0.5; }
            100% { transform: rotate(0) scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Logo; 