import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Force dark theme for Architect AI aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    // Currently only dark mode supported but keeping it extensible
    console.log('Architect AI is optimized for dark neural workflows.');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
