import React, { createContext, useContext, useState } from 'react';

interface SplashContextType {
  isSplashEnabled: boolean;
  toggleSplash: () => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSplashEnabled, setIsSplashEnabled] = useState(true);

  const toggleSplash = () => {
    setIsSplashEnabled((prev) => !prev);
  };

  return (
    <SplashContext.Provider value={{ isSplashEnabled, toggleSplash }}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = () => {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error('useSplash must be used within a SplashProvider');
  }
  return context;
};
