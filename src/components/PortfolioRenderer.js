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
  const [localProjects, setLocalProjects] = useState([]);
  const [showBootBanner, setShowBootBanner] = useState(false);

  useEffect(() => {
    // Boot logic
    const bootPref = localStorage.getItem("portfolio-boot"); // "always" | "once" | null
    const hasVisited = localStorage.getItem("hasVisited");
    const bannerDismissed = localStorage.getItem("portfolio-boot-banner-dismissed");

    if (bootPref === "always") {
      setBooting(true);
      setShowBootBanner(false);
    } else if (bootPref === "once") {
      if (hasVisited) {
        setBooting(false);
        setShowBootBanner(false);
      } else {
        setBooting(true);
      }
    } else {
      // Default: boot only first time
      if (hasVisited) {
        setBooting(false);
        // Only show banner if not previously dismissed
        setShowBootBanner(!bannerDismissed);
      }
    }
    localStorage.setItem("hasVisited", "true");

    const savedMode = localStorage.getItem("portfolio-mode");
    if (savedMode) setThemeMode(savedMode);

    const savedStyle = localStorage.getItem("portfolio-style");
    if (savedStyle) setCurrentStyle(savedStyle);

    // Load local projects
    try {
      const saved = localStorage.getItem("portfolio-local-projects");
      if (saved) setLocalProjects(JSON.parse(saved));
    } catch (e) { /* ignore */ }
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

  // Dismiss banner permanently
  const dismissBanner = () => {
    setShowBootBanner(false);
    localStorage.setItem("portfolio-boot-banner-dismissed", "true");
  };

  // Add a local project
  const addLocalProject = (project) => {
    const newProject = {
      id: `local-${Date.now()}`,
      name: project.name,
      description: project.description || "",
      language: project.language || "Unknown",
      stargazers_count: parseInt(project.stars) || 0,
      html_url: project.url || "#",
      private: false,
      isLocal: true,
      localTag: project.tag || "local",
      startTime: project.startTime || "",
      endTime: project.endTime || "Ongoing",
      recentCommits: [],
    };
    const updated = [...localProjects, newProject];
    setLocalProjects(updated);
    localStorage.setItem("portfolio-local-projects", JSON.stringify(updated));
  };

  // Set boot preference
  const setBootPref = (pref) => {
    localStorage.setItem("portfolio-boot", pref);
    if (pref === "disabled") {
      setShowBootBanner(true);
      localStorage.removeItem("portfolio-boot-banner-dismissed");
    } else {
      setShowBootBanner(false);
    }
  };

  // Merge local projects with public
  const allPublic = [...(publicProjects || []), ...localProjects];

  const controls = {
    themeMode, setThemeMode,
    currentStyle, setCurrentStyle,
    addLocalProject, setBootPref,
    showBootBanner, setShowBootBanner,
  };

  const renderUI = () => {
    switch (currentStyle) {
      case "terminal": return <TerminalUI publicProjects={allPublic} privateProjects={privateProjects} controls={controls} />;
      case "cyber": return <CyberUI publicProjects={allPublic} privateProjects={privateProjects} controls={controls} />;
      case "glass": return <GlassUI publicProjects={allPublic} privateProjects={privateProjects} controls={controls} />;
      case "bento": return <BentoUI publicProjects={allPublic} privateProjects={privateProjects} controls={controls} />;
      case "minimal": 
      default:
        return <MinimalUI publicProjects={allPublic} privateProjects={privateProjects} controls={controls} />;
    }
  };

  if (booting) return <BootSequence onComplete={() => setBooting(false)} />;

  return (
    <ThemeProvider currentStyle={currentStyle}>
      {/* Boot banner — sits in flow, pushes content down, not overlay */}
      {showBootBanner && (
        <div className="w-full z-[9999] bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white text-center py-2 px-4 text-xs font-medium flex items-center justify-center gap-3 animate-[slideDown_0.4s_ease-out]">
          <span>🚀 Boot sequence is disabled. Switch to <strong>Terminal</strong> UI and type <code className="bg-white/20 px-1.5 py-0.5 rounded text-[11px]">enable boot</code> to re-enable it.</span>
          <button onClick={dismissBanner} className="text-white/80 hover:text-white font-bold text-sm ml-2 hover:scale-110 transition-transform">✕</button>
        </div>
      )}
      {renderUI()}
    </ThemeProvider>
  );
}
