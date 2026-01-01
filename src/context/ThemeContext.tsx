
"use client";
import React, { createContext, useContext, useState } from "react";

type ThemeType = {
  color: string;
  name: string;
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {

  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("nattan_os_theme");
      if (savedTheme) {
        try {
          return JSON.parse(savedTheme);
        } catch {
        }
      }
    }
    return {
      name: "cyberpunk",
      color: "#ec4899",
    };
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("nattan_os_theme", JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};