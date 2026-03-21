"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to the premium 'bento' style as requested by the user
  const [style, setStyle] = useState("bento");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage for persistent style
    const saved = localStorage.getItem("portfolio-style");
    if (saved) {
      setStyle(saved);
    }
    setMounted(true);
  }, []);

  const changeStyle = (newStyle) => {
    setStyle(newStyle);
    localStorage.setItem("portfolio-style", newStyle);
  };

  return (
    <ThemeContext.Provider value={{ style, changeStyle }}>
      <div style={{ visibility: mounted ? "visible" : "hidden", display: "contents" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
