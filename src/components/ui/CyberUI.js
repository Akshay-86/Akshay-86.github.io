"use client";

import React, { useState } from "react";
import ScrollReveal from "../ScrollReveal";
import ScreenshotModal from "./ScreenshotModal";
import ProjectDetailModal from "./ProjectDetailModal";
import ProjectFilterBar from "./ProjectFilterBar";
import GitHubHeatmap from "./GitHubHeatmap";
import {
  PERSONAL_INFO,
  SKILLS_DATA,
  EXPERIENCE_DATA,
  ACHIEVEMENTS_DATA,
} from "@/data/portfolioData";

export default function CyberUI({ publicProjects, privateProjects, controls }) {
  const { themeMode, setThemeMode, currentStyle, setCurrentStyle } = controls || {};
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];
  const sortedProjects = [...allProjects].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

  const filteredProjects = sortedProjects.filter((p) => {
    if (activeCategory === "apk") {
      if (!p.latestRelease?.primaryAsset && !p.latestRelease?.hasApk) return false;
    } else if (activeCategory === "android") {
      const isAndroid =
        p.category === "android" ||
        (p.language || "").toLowerCase().includes("kotlin") ||
        (p.language || "").toLowerCase().includes("java");
      if (!isAndroid) return false;
    } else if (activeCategory === "systems") {
      const isSystems =
        p.category === "systems" ||
        ["c", "c++", "c#", "rust", "assembly"].includes((p.language || "").toLowerCase());
      if (!isSystems) return false;
    } else if (activeCategory === "web") {
      const isWeb =
        p.category === "web" ||
        ["javascript", "typescript", "html", "css"].includes((p.language || "").toLowerCase());
      if (!isWeb) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (p.customTitle || p.name || "").toLowerCase().includes(q);
      const matchDesc = (p.summary || p.description || "").toLowerCase().includes(q);
      const matchLang = (p.language || "").toLowerCase().includes(q);
      const matchTech = (p.techStack || []).some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchLang && !matchTech) return false;
    }

    return true;
  });

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const NAV = ["about", "skills", "activity", "projects", "experience", "achievements", "contact"];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen font-mono text-cyan-900 dark:text-cyan-500 bg-white dark:bg-[#050510] transition-colors duration-500 pb-32 relative selection:bg-cyan-500 selection:text-white">
      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0 bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:4rem_4rem] transition-opacity duration-1000" />

      {/* Cyber Nav */}
      <nav className="sticky top-0 z-50 border-b-2 border-cyan-300 dark:border-[#00f0ff]/40 bg-cyan-50/80 dark:bg-[#050510]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-10">
          <span className="text-xs font-black tracking-[0.3em] uppercase text-cyan-800 dark:text-[#00f0ff]">
            SYS://AKSHAY.OS
          </span>
          <div className="hidden md:flex items-center gap-0">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-bold text-cyan-600 dark:text-cyan-500 hover:text-cyan-950 dark:hover:text-[#00f0ff] hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors border-r border-cyan-200 dark:border-cyan-500/20 last:border-r-0 cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeMode?.(themeMode === "dark" ? "light" : "dark")}
              className="w-7 h-7 flex items-center justify-center text-xs text-cyan-700 dark:text-[#00f0ff] border border-cyan-300 dark:border-[#00f0ff]/40 hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
            <select
              value={currentStyle}
              onChange={(e) => setCurrentStyle?.(e.target.value)}
              className="bg-transparent text-[9px] font-bold tracking-[0.2em] uppercase text-cyan-600 dark:text-cyan-500 outline-none cursor-pointer border border-cyan-300 dark:border-[#00f0ff]/40 px-2 py-1 hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors"
            >
              <option value="minimal">MINIMAL</option>
              <option value="bento">BENTO</option>
              <option value="glass">GLASS</option>
              <option value="cyber">CYBER</option>
              <option value="terminal">TERMINAL</option>
            </select>
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-7 h-7 flex flex-col items-center justify-center gap-1 border border-cyan-300 dark:border-[#00f0ff]/40 hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors cursor-pointer"
            >
              <span
                className={`block w-3 h-0.5 bg-cyan-700 dark:bg-[#00f0ff] transition-all ${
                  mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block w-3 h-0.5 bg-cyan-700 dark:bg-[#00f0ff] transition-all ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
        {/* Mobile dropdown */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-cyan-50/90 dark:bg-[#050510]/95 backdrop-blur-xl border-t border-cyan-300 dark:border-[#00f0ff]/20 px-4 py-3 flex flex-col gap-0">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-500 hover:text-cyan-950 dark:hover:text-[#00f0ff] hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 px-3 transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-16 flex flex-col gap-24">
        {/* 1. HERO */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center border-l-2 border-cyan-400 dark:border-[#00f0ff] pl-6 md:pl-12">
          <ScrollReveal animation="fade-left">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 block mb-4">
              [SYSTEM_ONLINE] // USER: {PERSONAL_INFO.handle}
            </span>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight text-cyan-950 dark:text-[#00f0ff] mb-4">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-lg md:text-xl text-cyan-800 dark:text-cyan-300 max-w-2xl leading-relaxed mb-6 font-bold">
              {PERSONAL_INFO.tagline}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 bg-cyan-500 dark:bg-[#00f0ff] text-white dark:text-black font-black uppercase text-xs tracking-widest border-2 border-cyan-400 dark:border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                ACCESS_PROJECTS_
              </button>
              <a
                href={PERSONAL_INFO.contact.resumeUrl}
                download={PERSONAL_INFO.contact.resumeFilename}
                className="px-6 py-3 border-2 border-cyan-400 dark:border-cyan-600 text-cyan-900 dark:text-cyan-300 font-bold uppercase text-xs tracking-widest hover:bg-cyan-100 dark:hover:bg-cyan-950/40 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                GET_RESUME [PDF]
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. ABOUT */}
        <section id="about">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-8 border-b border-cyan-300 dark:border-cyan-500/30 pb-4">
              » 01_IDENTITY_KERNEL
            </h2>
            <div className="border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50/50 dark:bg-black/60 p-6 md:p-8 space-y-4 text-sm sm:text-base text-cyan-900 dark:text-cyan-300 leading-relaxed">
              {PERSONAL_INFO.aboutParagraphs.map((para, pIdx) => (
                <p key={pIdx}>
                  <span className="text-cyan-500 dark:text-[#00f0ff] font-bold">&gt;&gt;</span> {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 3. SKILLS */}
        <section id="skills">
          <ScrollReveal animation="fade-left">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-8 border-b border-cyan-300 dark:border-cyan-500/30 pb-4">
              » 02_TECH_PAYLOADS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS_DATA.map((module, i) => (
                <div
                  key={i}
                  className="border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50/50 dark:bg-black/60 p-6 relative"
                >
                  <h3 className="text-sm font-bold text-cyan-950 dark:text-[#00f0ff] uppercase mb-4 flex items-center gap-2">
                    <span>{module.icon}</span>
                    <span>{module.category}</span>
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {module.tools.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-cyan-800 dark:text-cyan-300 uppercase font-bold">
                        <span className="text-cyan-500 dark:text-[#00f0ff]">&gt;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* HEATMAP */}
        <section id="activity">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-6 border-b border-cyan-300 dark:border-cyan-500/30 pb-4">
              » 03_LIVE_COMMITS_TELEMETRY
            </h2>
            <GitHubHeatmap username={PERSONAL_INFO.contact.githubUsername} />
          </ScrollReveal>
        </section>

        {/* 4. PROJECTS */}
        <section id="projects">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-8 flex items-center justify-between border-b border-cyan-300 dark:border-cyan-500/30 pb-4">
              <span>» 04_DECRYPTED_ARCHIVES</span>
              <span className="text-[10px] font-mono font-normal">DATA_PACKETS_SECURED</span>
            </h2>

            <ProjectFilterBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={allProjects.length}
              visibleCount={filteredProjects.length}
            />
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            {visibleProjects.map((project, idx) => (
              <ScrollReveal key={project.id || project.name} animation="cyber-glitch" delay={50 * idx} duration={500} className="w-full">
                <div className="border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50/50 dark:bg-black/60 p-6 md:p-8 relative overflow-hidden group hover:border-cyan-500 dark:hover:border-[#00f0ff] transition-all">
                  <div className="absolute top-0 left-0 w-2 h-full bg-cyan-400 dark:bg-[#00f0ff]" />

                  <div className="flex flex-col lg:flex-row gap-8 pl-4">
                    <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-cyan-300 dark:border-cyan-500/20 pb-8 lg:pb-0 lg:pr-8">
                      <span className="text-[10px] text-cyan-600 font-mono uppercase tracking-widest block mb-2">
                        TARGET_0{idx + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-cyan-950 dark:text-white uppercase tracking-wider mb-2">
                        {project.customTitle || project.name}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-cyan-800 dark:text-cyan-300 leading-relaxed mb-6">
                        {project.summary || project.description || "NO RELEVANT ARCHIVE MOTIVATION FOUND."}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap mb-6">
                        {project.language && (
                          <span className="bg-cyan-100 dark:bg-cyan-900/30 px-2.5 py-0.5 text-xs font-bold uppercase text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800">
                            {project.language}
                          </span>
                        )}
                        {project.version && (
                          <span className="bg-cyan-900/40 text-[#00f0ff] px-2.5 py-0.5 text-xs font-bold font-mono border border-cyan-400/50">
                            {project.version}
                          </span>
                        )}
                        {project.badge && (
                          <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 text-xs font-bold border border-blue-400/50">
                            {project.badge}
                          </span>
                        )}
                      </div>

                      {/* Direct APK Download Button (Zero empty placeholders if absent!) */}
                      {project.latestRelease?.primaryAsset && (
                        <div className="mb-4">
                          <a
                            href={project.latestRelease.primaryAsset.downloadUrl}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 dark:bg-[#00f0ff] dark:hover:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest border-2 border-cyan-400 dark:border-[#00f0ff] transition-all w-full text-center shadow-[0_0_12px_rgba(0,240,255,0.3)] cursor-pointer"
                          >
                            {project.latestRelease.hasApk ? "⚡ GET_APK" : "⚡ GET_ASSET"} // {project.latestRelease.primaryAsset.arch} ({project.latestRelease.primaryAsset.sizeFormatted})
                          </a>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="px-4 py-2 bg-transparent text-cyan-800 dark:text-[#00f0ff] border border-cyan-400 dark:border-[#00f0ff]/60 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 dark:hover:bg-[#00f0ff] hover:text-white dark:hover:text-black transition-colors w-full cursor-pointer text-center"
                        >
                          INSPECT_DEEP_DIVE 🔍
                        </button>
                        {project.html_url && (
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 hover:underline py-1 text-center"
                          >
                            ACCESS_REMOTE_SRC ↗
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="w-full lg:w-2/3">
                      <div className="flex justify-between items-center mb-4 pl-2 border-l-2 border-cyan-400 dark:border-[#00f0ff]">
                        <span className="text-xs text-cyan-800 dark:text-cyan-500 font-bold uppercase tracking-widest ml-2">
                          COMMITS_LOG
                        </span>
                        <span className="text-[10px] text-cyan-600 font-mono animate-pulse">RECORDING_ACTIVE</span>
                      </div>

                      <div className="bg-white dark:bg-black/50 border border-cyan-200 dark:border-cyan-500/20 p-4">
                        {project.recentCommits && project.recentCommits.length > 0 ? (
                          <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto custom-scrollbar pr-3">
                            {project.recentCommits.slice(0, 4).map((commit) => (
                              <div
                                key={commit.sha}
                                className="flex flex-col md:flex-row gap-2 border-b border-cyan-100 dark:border-cyan-500/10 pb-3 last:border-0 last:pb-0 items-start md:items-center text-xs"
                              >
                                <span className="text-cyan-600 dark:text-[#00f0ff] font-mono text-[11px] w-20 shrink-0">
                                  {commit.sha.substring(0, 7)}
                                </span>
                                <span className="text-cyan-900 dark:text-cyan-100 flex-1 truncate">
                                  {commit.commit?.message?.split("\n")[0]}
                                </span>
                                <span className="text-cyan-500 dark:text-cyan-600 font-mono text-[10px] shrink-0">
                                  {new Date(commit.commit?.author?.date).toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-cyan-500 text-xs uppercase tracking-widest block text-center py-6">
                            TELEMETRY_INDEXED_IN_INSPECTION
                          </span>
                        )}
                      </div>

                      {/* UI Previews (Zero empty placeholders - only renders if previews exist!) */}
                      {project.previews && project.previews.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-cyan-300 dark:border-cyan-500/20">
                          <div className="text-xs text-cyan-800 dark:text-cyan-500 font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
                            <span>PREVIEW_BUFFERS ({project.previews.length})</span>
                            <span className="text-[10px] text-cyan-600 font-mono">RENDER_READY</span>
                          </div>
                          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                            {project.previews.map((prev, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                onClick={() => setSelectedScreenshot(prev)}
                                className="group relative shrink-0 w-24 sm:w-28 aspect-[9/16] border border-cyan-400 dark:border-cyan-500/40 overflow-hidden hover:scale-105 transition-all text-left bg-black cursor-pointer"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={prev.url}
                                  alt={prev.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-1 bg-black/85 text-[9px] text-[#00f0ff] font-mono truncate">
                                  {prev.title}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filteredProjects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 bg-cyan-500 dark:bg-[#00f0ff] text-white dark:text-black font-black uppercase text-xs tracking-widest border-2 border-cyan-400 dark:border-[#00f0ff] hover:scale-105 transition-all cursor-pointer"
              >
                {showAll ? "COLLAPSE_LOGS ↑" : `EXPAND_ALL (${filteredProjects.length - 6} MORE) ↓`}
              </button>
            </div>
          )}
        </section>

        {/* 5. EXPERIENCE */}
        <section id="experience">
          <ScrollReveal animation="fade-left">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-8 border-b border-cyan-300 dark:border-cyan-500/30 pb-4">
              » 05_MISSION_CHRONOLOGY
            </h2>
            <div className="flex flex-col gap-6">
              {EXPERIENCE_DATA.map((job, idx) => (
                <div
                  key={idx}
                  className="border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50/50 dark:bg-black/60 p-6 flex flex-col md:flex-row justify-between gap-4"
                >
                  <div>
                    <span className="text-xs font-mono text-cyan-500 dark:text-[#00f0ff] block mb-1">
                      [{job.period}]
                    </span>
                    <h3 className="text-lg font-bold text-cyan-950 dark:text-white uppercase">
                      {job.role}
                    </h3>
                    <p className="text-xs text-cyan-700 dark:text-cyan-400 font-mono mt-1 mb-2">
                      {job.company}
                    </p>
                    <p className="text-sm text-cyan-800 dark:text-cyan-300 leading-relaxed font-mono">
                      {job.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 6. ACHIEVEMENTS */}
        <section id="achievements">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-8 border-b border-cyan-300 dark:border-cyan-500/30 pb-4">
              » 06_ACHIEVEMENTS_LOG
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACHIEVEMENTS_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50/50 dark:bg-black/60 p-6"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-[10px] font-mono text-cyan-500 dark:text-[#00f0ff] uppercase block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-base font-bold text-cyan-950 dark:text-white uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cyan-800 dark:text-cyan-300 leading-relaxed font-mono">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 7. CONTACT */}
        <section id="contact" className="text-center py-12 border-t-2 border-cyan-400 dark:border-[#00f0ff]">
          <ScrollReveal animation="fade-up">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-cyan-950 dark:text-[#00f0ff] mb-4">
              INITIATE_CONTACT
            </h2>
            <p className="text-sm sm:text-base text-cyan-800 dark:text-cyan-300 max-w-xl mx-auto mb-8 font-mono">
              {PERSONAL_INFO.tagline}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="px-8 py-3 bg-cyan-500 dark:bg-[#00f0ff] text-white dark:text-black font-black uppercase text-xs tracking-widest border-2 border-cyan-400 dark:border-[#00f0ff] hover:scale-105 transition-all cursor-pointer"
              >
                TRANSMIT_EMAIL ({PERSONAL_INFO.contact.email})
              </a>
              <a
                href={PERSONAL_INFO.contact.resumeUrl}
                download={PERSONAL_INFO.contact.resumeFilename}
                className="px-8 py-3 border-2 border-cyan-400 dark:border-cyan-600 text-cyan-900 dark:text-cyan-300 font-bold uppercase text-xs tracking-widest hover:bg-cyan-100 dark:hover:bg-cyan-950/40 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                DOWNLOAD_RESUME [PDF]
              </a>
            </div>
          </ScrollReveal>
        </section>
      </div>

      <ScreenshotModal image={selectedScreenshot} onClose={() => setSelectedScreenshot(null)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
