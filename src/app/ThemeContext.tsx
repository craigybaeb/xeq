'use client';

import React, { createContext, useContext, useState } from 'react';
import { ConfigProvider, theme } from 'antd';

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<{
  mode: ThemeMode;
  toggle: () => void;
}>({ mode: 'light', toggle: () => {} });

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ConfigProvider
        theme={{
          algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#1f8ef1',
            colorBgLayout: mode === 'dark' ? '#141414' : '#ffffff',
            colorBgContainer: mode === 'dark' ? '#1e1e1e' : '#f6f9fc',
            colorTextBase: mode === 'dark' ? '#e6e6e6' : '#141414',
            colorTextSecondary: mode === 'dark' ? '#aab2bd' : '#6c757d',
            colorSuccess: '#28a745',
            colorWarning: mode === 'dark' ? '#ffd666' : '#ffc107',
            colorError: mode === 'dark' ? '#ff4d4f' : '#dc3545',
            colorLink: mode === 'dark' ? '#66b2ff' : '#007bff',
            fontFamily: `'Inter', 'Helvetica Neue', sans-serif`,
          }
          ,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
