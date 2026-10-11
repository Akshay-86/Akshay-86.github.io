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

export default function MinimalUI({ publicProjects, privateProjects, controls }) {
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
    // 1. Category filter
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

    // 2. Search query filter
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-neutral-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black pb-32 transition-colors duration-500">
      {/* Minimal Nav */}
      <nav className="sticky top-0 z-50 bg-slate-50/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-neutral-800/50">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-12">
          <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
            {PERSONAL_INFO.name}<span className="text-blue-500">.</span>
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-[11px] uppercase tracking-widest font-medium text-slate-400 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeMode?.(themeMode === "dark" ? "light" : "dark")}
              className="w-7 h-7 flex items-center justify-center rounded-md text-xs text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
            <select
              value={currentStyle}
              onChange={(e) => setCurrentStyle?.(e.target.value)}
              className="bg-transparent text-[10px] uppercase tracking-widest font-medium text-slate-400 dark:text-neutral-500 outline-none cursor-pointer border-none"
            >
              <option value="minimal">Minimal</option>
              <option value="bento">Bento</option>
              <option value="glass">Glass</option>
              <option value="cyber">Cyber</option>
              <option value="terminal">Terminal</option>
            </select>
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-7 h-7 flex flex-col items-center justify-center gap-1 rounded-md hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <span
                className={`block w-3.5 h-0.5 bg-slate-500 dark:bg-neutral-400 transition-all ${
                  mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block w-3.5 h-0.5 bg-slate-500 dark:bg-neutral-400 transition-all ${
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
          <div className="bg-slate-50/95 dark:bg-[#030712]/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-neutral-800/50 px-6 py-3 flex flex-col gap-1">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left py-2 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 1. Hero / Introduction */}
      <section id="hero" className="max-w-4xl mx-auto px-6 min-h-[85vh] flex flex-col justify-center pt-16">
        <ScrollReveal animation="fade-right" delay={100}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none text-slate-900 dark:text-white">
            {PERSONAL_INFO.name}.
          </h1>
        </ScrollReveal>
        <ScrollReveal animation="fade-left" delay={200}>
          <h2 className="text-2xl md:text-3xl font-light text-slate-600 dark:text-neutral-400 mb-6">
            Native Android Developer <span className="text-slate-300 dark:text-neutral-700 mx-2">|</span> Aspiring Systems Engineer
          </h2>
          <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-neutral-300 max-w-2xl leading-relaxed mb-12">
            {PERSONAL_INFO.tagline}
          </p>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => scrollTo("projects")}
            >
              View Projects
            </button>
            <a
              href={PERSONAL_INFO.contact.resumeUrl}
              download={PERSONAL_INFO.contact.resumeFilename}
              className="px-8 py-3 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white font-bold rounded-lg border border-slate-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 inline-flex items-center gap-2 cursor-pointer"
            >
              Resume 📄
            </a>
            <button
              className="px-8 py-3 bg-transparent text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
              onClick={() => scrollTo("contact")}
            >
              Contact Me →
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. About Me */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-8">
            01. About Me
          </h2>
          <div className="text-xl md:text-2xl font-light leading-relaxed text-slate-600 dark:text-neutral-400 space-y-6">
            {PERSONAL_INFO.aboutParagraphs.map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Skills */}
      <section id="skills" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-12">
            02. Technical Arsenal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {SKILLS_DATA.map((skillset, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-neutral-800 pb-2 flex items-center gap-2">
                  <span>{skillset.icon}</span>
                  <span>{skillset.category}</span>
                </h3>
                <ul className="flex flex-col gap-3">
                  {skillset.tools.map((tool) => (
                    <li key={tool} className="text-slate-600 dark:text-neutral-400 flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-neutral-700 block shrink-0" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Activity / Heatmap Section */}
      <section id="activity" className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-8">
            03. Live Activity & Commits
          </h2>
          <GitHubHeatmap username={PERSONAL_INFO.contact.githubUsername} />
        </ScrollReveal>
      </section>

      {/* 4. Projects (Case Studies) */}
      <section id="projects" className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-4">
            04. Case Studies & Repositories
          </h2>
          <p className="text-lg text-slate-500 dark:text-neutral-500 mb-8">
            Deep dives into architecture, motivation, direct release installations, and authentic Git commits.
          </p>

          {/* Interactive Project Filter & Search Bar */}
          <ProjectFilterBar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={allProjects.length}
            visibleCount={filteredProjects.length}
          />
        </ScrollReveal>

        <div className="flex flex-col gap-0">
          {visibleProjects.map((project, idx) => (
            <ScrollReveal key={project.id || project.name} animation="fade-up" duration={1000} className="w-full">
              <div className="min-h-[70vh] flex flex-col justify-center py-16 md:py-32 border-b border-slate-200 dark:border-neutral-800 last:border-0 relative">
                <div className="absolute top-24 left-0 text-[7rem] md:text-[12rem] font-black text-slate-200 dark:text-neutral-900 tracking-tighter -z-10 leading-none pointer-events-none select-none">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </div>

                <div className="w-full max-w-2xl relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                      {project.customTitle || project.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {/* Universal Version Variable */}
                    {project.version && (
                      <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-200 dark:border-emerald-800/40 uppercase tracking-wider font-mono">
                        {project.version}
                      </span>
                    )}
                    {project.badge && (
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800/40">
                        {project.badge}
                      </span>
                    )}
                    {project.language && (
                      <span className="px-3 py-1 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-medium rounded-full">
                        {project.language}
                      </span>
                    )}

                    {/* Direct Release / APK Download Button (Zero empty placeholders if absent!) */}
                    {project.latestRelease?.primaryAsset && (
                      <a
                        href={project.latestRelease.primaryAsset.downloadUrl}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-105"
                      >
                        <span>{project.latestRelease.hasApk ? "📱 Download APK" : "📦 Download Asset"}</span>
                        <span className="opacity-90 font-mono text-[11px]">
                          ({project.latestRelease.primaryAsset.arch} • {project.latestRelease.primaryAsset.sizeFormatted})
                        </span>
                      </a>
                    )}
                  </div>

                  <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-12">
                    <div className="col-span-1 border-l-2 border-slate-200 dark:border-neutral-800 pl-4 md:border-l-0 md:border-t-2 md:pt-4 md:pl-0">
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-2">
                        Timeline
                      </h4>
                      <p className="text-slate-900 dark:text-neutral-300 font-mono text-sm">
                        {project.isLocal
                          ? project.startTime || "Ongoing"
                          : new Date(project.created_at || project.updated_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="col-span-1 md:col-span-2 border-l-2 border-slate-200 dark:border-neutral-800 pl-4 md:border-l-0 md:border-t-2 md:pt-4 md:pl-0">
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-2">
                        Motivation & Architecture
                      </h4>
                      <p className="text-base md:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed font-light">
                        {project.summary || project.description || "An exploration of architecture and robust engineering logic."}
                      </p>
                    </div>
                  </div>

                  {/* UI Previews (Zero empty placeholders - only renders if previews exist!) */}
                  {project.previews && project.previews.length > 0 && (
                    <div className="mb-12">
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-4">
                        UI Previews & Screenshots ({project.previews.length})
                      </h4>
                      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                        {project.previews.map((prev, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setSelectedScreenshot(prev)}
                            className="group relative shrink-0 w-28 sm:w-36 aspect-[9/16] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:scale-105 transition-all text-left bg-slate-100 dark:bg-neutral-900 cursor-pointer"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={prev.url}
                              alt={prev.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-[10px] text-white font-medium truncate">
                              {prev.title}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Major Git Implementations */}
                  {project.recentCommits && project.recentCommits.length > 0 && (
                    <div className="mb-10">
                      <h4 className="text-xs uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-4">
                        Recent Implementations
                      </h4>
                      <div className="flex flex-col gap-3">
                        {project.recentCommits.slice(0, 3).map((commitData) => (
                          <div
                            key={commitData.sha}
                            className="bg-white dark:bg-neutral-900 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center hover:border-slate-400 dark:hover:border-neutral-600 transition-colors"
                          >
                            <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 shrink-0">
                              {commitData.sha.substring(0, 7)}
                            </span>
                            <p className="text-slate-800 dark:text-neutral-200 font-medium text-xs sm:text-sm leading-relaxed flex-1 truncate">
                              {commitData.commit?.message?.split("\n")[0]}
                            </p>
                            <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 shrink-0">
                              {new Date(commitData.commit?.author?.date).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Inspect Deep Dive</span>
                      <span>🔍</span>
                    </button>

                    {project.html_url && (
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group inline-flex items-center"
                      >
                        Access Repository <span className="ml-1.5 group-hover:translate-x-1.5 transition-transform">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {filteredProjects.length === 0 && (
            <div className="text-slate-400 dark:text-neutral-600 font-light text-xl py-16 text-center">
              No projects found matching the selected filter.
            </div>
          )}
        </div>

        {/* Show More / Show Less */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              {showAll ? "Show Less ↑" : `Show More (${filteredProjects.length - 6} more) ↓`}
            </button>
          </div>
        )}
      </section>

      {/* 5. Experience / Learning */}
      <section id="experience" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-16">
            05. Experience & Learning
          </h2>

          <div className="flex flex-col gap-16">
            {EXPERIENCE_DATA.map((job, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-12 items-start group">
                <div className="w-full md:w-1/4 shrink-0 pt-1 border-t-2 border-transparent group-hover:border-slate-300 dark:group-hover:border-neutral-600 transition-colors duration-500">
                  <span className="text-sm font-mono text-slate-400 dark:text-neutral-500 block">
                    {job.period}
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {job.role}
                  </h3>
                  <span className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-neutral-500 mt-2 mb-4">
                    {job.company}
                  </span>
                  <p className="text-slate-500 dark:text-neutral-400 font-light leading-relaxed text-base md:text-lg">
                    {job.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Achievements */}
      <section id="achievements" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-12">
            06. Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACHIEVEMENTS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-8 rounded-2xl hover:border-slate-400 dark:hover:border-neutral-700 transition-colors"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-neutral-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 7. Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-32 border-t border-slate-200 dark:border-neutral-800 text-center">
        <ScrollReveal animation="fade-up">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">
            Let's Build.
          </h2>
          <p className="text-xl text-slate-500 dark:text-neutral-400 max-w-xl mx-auto mb-12">
            Looking for high-performance native Android engineering or systems work? Let's connect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              Say Hello ({PERSONAL_INFO.contact.email})
            </a>
            <a
              href={PERSONAL_INFO.contact.resumeUrl}
              download={PERSONAL_INFO.contact.resumeFilename}
              className="px-8 py-4 bg-slate-100 dark:bg-neutral-900 text-slate-900 dark:text-white border border-slate-200 dark:border-neutral-800 font-bold rounded-full w-full sm:w-auto hover:bg-slate-200 dark:hover:bg-neutral-800 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              Download Resume 📄
            </a>
          </div>

          <div className="flex justify-center gap-8 mt-16 pt-8 border-t border-slate-200 dark:border-neutral-800">
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm tracking-widest text-slate-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm tracking-widest text-slate-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm tracking-widest text-slate-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase"
            >
              Instagram
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Modals */}
      <ScreenshotModal image={selectedScreenshot} onClose={() => setSelectedScreenshot(null)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
