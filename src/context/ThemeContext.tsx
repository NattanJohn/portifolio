
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

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
  const [theme, setThemeState] = useState<ThemeType>({
    name: "cyberpunk",
    color: "#ec4899",
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("nattan_os_theme");
      if (savedTheme) {
        try {
          setThemeState(JSON.parse(savedTheme));
        } catch {}
      }
      setHydrated(true);
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("nattan_os_theme", JSON.stringify(newTheme));
  };

  if (!hydrated) {
    // Evita renderizar até o tema ser carregado do localStorage
    return null;
  }

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