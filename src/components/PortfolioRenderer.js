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

    const savedStyle = localStorage.getItem("portfolio-style");
    if (savedStyle) setCurrentStyle(savedStyle);
  }, []);

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("portfolio-mode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("portfolio-style", currentStyle);
  }, [currentStyle]);

  // Shared controls prop bundle
  const controls = { themeMode, setThemeMode, currentStyle, setCurrentStyle };

  const renderUI = () => {
    switch (currentStyle) {
      case "terminal": return <TerminalUI publicProjects={publicProjects} privateProjects={privateProjects} controls={controls} />;
      case "cyber": return <CyberUI publicProjects={publicProjects} privateProjects={privateProjects} controls={controls} />;
      case "glass": return <GlassUI publicProjects={publicProjects} privateProjects={privateProjects} controls={controls} />;
      case "bento": return <BentoUI publicProjects={publicProjects} privateProjects={privateProjects} controls={controls} />;
      case "minimal": 
      default:
        return <MinimalUI publicProjects={publicProjects} privateProjects={privateProjects} controls={controls} />;
    }
  };

  if (booting) return <BootSequence onComplete={() => setBooting(false)} />;

  return (
    <ThemeProvider currentStyle={currentStyle}>
      {renderUI()}
    </ThemeProvider>
  );
}
