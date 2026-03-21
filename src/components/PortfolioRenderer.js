"use client";

import React, { useState, useEffect } from "react";
import TerminalUI from "./ui/TerminalUI";
import CyberUI from "./ui/CyberUI";
import GlassUI from "./ui/GlassUI";
import MinimalUI from "./ui/MinimalUI";
import BentoUI from "./ui/BentoUI";
import BootSequence from "./BootSequence";
import { ThemeProvider } from "./ThemeProvider";

export default function PortfolioRenderer({ publicProjects, privateProjects }) {
  const [currentStyle, setCurrentStyle] = useState("minimal");
  const [themeMode, setThemeMode] = useState("dark");
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) setBooting(false);
    else localStorage.setItem("hasVisited", "true");

    const savedMode = localStorage.getItem("portfolio-mode");
    if (savedMode) setThemeMode(savedMode);
  }, []);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("portfolio-mode", themeMode);
  }, [themeMode]);

  const renderUI = () => {
    switch (currentStyle) {
      case "terminal": return <TerminalUI publicProjects={publicProjects} privateProjects={privateProjects} />;
      case "cyber": return <CyberUI publicProjects={publicProjects} privateProjects={privateProjects} />;
      case "glass": return <GlassUI publicProjects={publicProjects} privateProjects={privateProjects} />;
      case "bento": return <BentoUI publicProjects={publicProjects} privateProjects={privateProjects} />;
      case "minimal": 
      default:
        return <MinimalUI publicProjects={publicProjects} privateProjects={privateProjects} />;
    }
  };

  if (booting) return <BootSequence onComplete={() => setBooting(false)} />;

  return (
    <ThemeProvider currentStyle={currentStyle}>
      <div className="fixed top-4 right-4 z-[9999] flex items-center gap-3 group">
        <button 
          onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
          className="bg-black/80 dark:bg-white/10 text-white dark:text-neutral-200 border border-white/20 dark:border-white/10 rounded-full w-8 h-8 flex items-center justify-center text-xs outline-none cursor-pointer backdrop-blur-md opacity-20 hover:opacity-100 transition-opacity shadow-lg"
          title="Toggle Light/Dark Mode"
        >
          {themeMode === "dark" ? "☀️" : "🌙"}
        </button>
        <select 
          value={currentStyle}
          onChange={(e) => setCurrentStyle(e.target.value)}
          className="bg-black/80 dark:bg-[#111] text-white dark:text-neutral-300 border border-white/20 dark:border-white/10 rounded-md px-3 py-1.5 text-xs font-mono outline-none cursor-pointer backdrop-blur-md opacity-20 hover:opacity-100 transition-opacity focus:opacity-100 shadow-lg"
        >
          <option value="minimal">Minimal Modern</option>
          <option value="bento">Bento Dashboard</option>
          <option value="glass">Glassmorphism Gallery</option>
          <option value="cyber">Cyberpunk OS</option>
          <option value="terminal">Terminal CLI</option>
        </select>
      </div>
      {renderUI()}
    </ThemeProvider>
  );
}
