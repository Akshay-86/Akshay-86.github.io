"use client";

import React, { useState, useEffect } from "react";
import TerminalUI from "./ui/TerminalUI";
import CyberUI from "./ui/CyberUI";
import GlassUI from "./ui/GlassUI";
import MinimalUI from "./ui/MinimalUI";
import BentoUI from "./ui/BentoUI";
import BootSequence from "./BootSequence";
import { ThemeProvider } from "./ThemeProvider";
import {
  fetchProjects as fbFetchProjects,
  addProject as fbAddProject,
  updateProject as fbUpdateProject,
  deleteProject as fbDeleteProject,
  getAdminHash,
  setAdminHash,
} from "../lib/firebase";

export default function PortfolioRenderer({ publicProjects, privateProjects }) {
  const [currentStyle, setCurrentStyle] = useState("minimal");
  const [themeMode, setThemeMode] = useState("dark");
  const [booting, setBooting] = useState(true);
  const [firebaseProjects, setFirebaseProjects] = useState([]);
  const [showBootBanner, setShowBootBanner] = useState(false);
  const [bannerDismissing, setBannerDismissing] = useState(false);

  // Load Firebase projects on mount
  useEffect(() => {
    fbFetchProjects().then((projects) => {
      setFirebaseProjects(projects);
    });
  }, []);

  useEffect(() => {
    const bootPref = localStorage.getItem("portfolio-boot");
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
      if (hasVisited) {
        setBooting(false);
        setShowBootBanner(!bannerDismissed);
      }
    }
    localStorage.setItem("hasVisited", "true");

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

  const dismissBanner = () => {
    setBannerDismissing(true);
    setTimeout(() => {
      setShowBootBanner(false);
      setBannerDismissing(false);
      localStorage.setItem("portfolio-boot-banner-dismissed", "true");
    }, 400);
  };

  // Firebase-backed project operations
  const addLocalProject = async (project) => {
    const docId = await fbAddProject(project);
    const newProject = {
      id: docId,
      name: project.name,
      description: project.description || "",
      language: project.language || "Unknown",
      stargazers_count: parseInt(project.stars) || 0,
      html_url: project.url || "",
      private: false,
      isLocal: true,
      localTag: project.tag || "local",
      startTime: project.startTime || "",
      endTime: project.endTime || "Ongoing",
      recentCommits: [],
    };
    setFirebaseProjects((prev) => [...prev, newProject]);
    return docId;
  };

  const editLocalProject = async (docId, updates) => {
    await fbUpdateProject(docId, updates);
    setFirebaseProjects((prev) =>
      prev.map((p) => (p.id === docId ? { ...p, ...updates } : p))
    );
  };

  const deleteLocalProject = async (docId) => {
    await fbDeleteProject(docId);
    setFirebaseProjects((prev) => prev.filter((p) => p.id !== docId));
  };

  const setBootPref = (pref) => {
    localStorage.setItem("portfolio-boot", pref);
    if (pref === "disabled") {
      setShowBootBanner(true);
      localStorage.removeItem("portfolio-boot-banner-dismissed");
    } else {
      setShowBootBanner(false);
    }
  };

  const allPublic = [...(publicProjects || []), ...firebaseProjects];

  const controls = {
    themeMode, setThemeMode,
    currentStyle, setCurrentStyle,
    addLocalProject, editLocalProject, deleteLocalProject,
    getAdminHash, setAdminHash,
    setBootPref, showBootBanner, setShowBootBanner,
    firebaseProjects,
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
      {showBootBanner && (
        <div className={`w-full z-[9999] bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white text-center py-2 px-4 text-xs font-medium flex items-center justify-center gap-3 ${bannerDismissing ? "animate-[slideUp_0.4s_ease-in_forwards]" : "animate-[slideDown_0.4s_ease-out]"}`}>
          <span>🚀 Boot sequence is disabled. Switch to <strong>Terminal</strong> UI and type <code className="bg-white/20 px-1.5 py-0.5 rounded text-[11px]">enable boot</code> to re-enable it.</span>
          <button onClick={dismissBanner} className="text-white/80 hover:text-white font-bold text-sm ml-2 hover:scale-110 transition-transform">✕</button>
        </div>
      )}
      {renderUI()}
    </ThemeProvider>
  );
}
