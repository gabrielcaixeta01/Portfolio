"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface RocketContextType {
  isRocketEnabled: boolean;
  toggleRocket: () => void;
}

const RocketContext = createContext<RocketContextType | undefined>(undefined);

export function RocketProvider({ children }: { children: ReactNode }) {
  const [isRocketEnabled, setIsRocketEnabled] = useState(false);

  const toggleRocket = () => {
    setIsRocketEnabled((prev) => !prev);
  };

  return (
    <RocketContext.Provider value={{ isRocketEnabled, toggleRocket }}>
      {children}
    </RocketContext.Provider>
  );
}

export function useRocket() {
  const context = useContext(RocketContext);
  if (context === undefined) {
    throw new Error("useRocket must be used within a RocketProvider");
  }
  return context;
}
