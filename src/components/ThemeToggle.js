import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="toggle-container">
        <div className={`toggle-track ${isDark ? 'dark' : 'light'}`}>
          <div className="toggle-thumb">
            <div className="toggle-icon">
              {isDark ? (
                // Moon icon for dark theme
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.5 14.5c-.8 2.2-2.5 4-4.6 4.9-2.8 1.2-6-.2-7.2-3s.2-6 3-7.2c1-.4 2-.5 3-.3-1.5-.4-3.1-.2-4.6.7-2.8 1.7-3.7 5.4-2 8.2s5.4 3.7 8.2 2c1.5-.9 2.5-2.3 2.9-3.9.2-.8.2-1.6 0-2.4z"/>
                </svg>
              ) : (
                // Sun icon for light theme
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zM2 13h2c.6 0 1-.4 1-1s-.4-1-1-1H2c-.6 0-1 .4-1 1s.4 1 1 1zm18 0h2c.6 0 1-.4 1-1s-.4-1-1-1h-2c-.6 0-1 .4-1 1s.4 1 1 1zM11 2v2c0 .6.4 1 1 1s1-.4 1-1V2c0-.6-.4-1-1-1s-1 .4-1 1zm0 18v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1s-1 .4-1 1zM5.99 4.58c-.4-.4-1.1-.4-1.41 0-.4.4-.4 1.03 0 1.42l1.06 1.06c.39.4 1.03.4 1.42 0s.4-1.03 0-1.42L5.99 4.58zm12.37 12.37c-.4-.4-1.03-.4-1.42 0-.4.4-.4 1.03 0 1.42l1.06 1.06c.4.4 1.03.4 1.42 0s.4-1.03 0-1.42l-1.06-1.06zm1.06-10.96c.4-.4.4-1.03 0-1.42-.4-.4-1.03-.4-1.42 0l-1.06 1.06c-.4.4-.4 1.03 0 1.42s1.03.4 1.42 0l1.06-1.06zM7.05 18.36c.4-.4.4-1.03 0-1.42-.4-.4-1.03-.4-1.42 0l-1.06 1.06c-.4.4-.4 1.03 0 1.42s1.03.4 1.42 0l1.06-1.06z"/>
                </svg>
              )}
            </div>
          </div>
        </div>
        <span className="toggle-label">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
