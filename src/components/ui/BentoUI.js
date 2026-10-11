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

export default function BentoUI({ publicProjects, privateProjects, controls }) {
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
    <div className="min-h-screen bg-slate-100 dark:bg-black text-slate-900 dark:text-neutral-200 font-sans p-4 md:p-8 transition-colors duration-500 pb-32">
      {/* Bento Nav */}
      <nav className="sticky top-2 z-50 max-w-6xl mx-auto mb-6">
        <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 rounded-2xl px-4 md:px-6 flex items-center justify-between h-12 shadow-sm">
          <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
            {PERSONAL_INFO.name}<span className="text-blue-500">.</span>
          </span>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeMode?.(themeMode === "dark" ? "light" : "dark")}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-neutral-800 text-xs hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
            <select
              value={currentStyle}
              onChange={(e) => setCurrentStyle?.(e.target.value)}
              className="bg-slate-100 dark:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 outline-none cursor-pointer rounded-xl px-3 py-1.5 border-none hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
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
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
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
          <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 rounded-2xl mt-2 px-4 py-3 flex flex-col gap-1 shadow-sm">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left py-2 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-neutral-800 rounded-lg px-3 transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* HERO & ABOUT BENTO GRID */}
        <div id="hero" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Hero / Intro (Large Block) */}
          <ScrollReveal animation="fade-up" delay={100} className="md:col-span-2 lg:col-span-2 row-span-2">
            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-200 dark:border-blue-800/50">
                  Native Android & Systems Engineer
                </span>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
                  {PERSONAL_INFO.name}.
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-neutral-400 font-light leading-relaxed">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                <button
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => scrollTo("projects")}
                >
                  View Projects
                </button>
                <a
                  href={PERSONAL_INFO.contact.resumeUrl}
                  download={PERSONAL_INFO.contact.resumeFilename}
                  className="px-6 py-3 bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-900 dark:text-white font-bold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  Resume 📄
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* About Me (Medium Block) */}
          <ScrollReveal animation="fade-up" delay={200} className="md:col-span-1 lg:col-span-2">
            <div
              id="about"
              className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-900 p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-center text-white shadow-lg relative overflow-hidden group"
            >
              <h2 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
                <span className="text-2xl">⚡</span> The Mission & Craft
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed relative z-10 font-medium">
                {PERSONAL_INFO.aboutParagraphs[1]}
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Quick Link */}
          <ScrollReveal animation="fade-up" delay={300} className="md:col-span-1 lg:col-span-1">
            <div
              className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 rounded-[2rem] h-full flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              onClick={() => scrollTo("contact")}
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                📬
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Let's Connect</h3>
              <span className="text-slate-500 dark:text-neutral-500 text-sm mt-2 font-medium">
                {PERSONAL_INFO.contact.email}
              </span>
            </div>
          </ScrollReveal>

          {/* Skills (Medium Block) */}
          <ScrollReveal animation="fade-up" delay={400} className="md:col-span-2 lg:col-span-1">
            <div
              id="skills"
              className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 rounded-[2rem] h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Technical Toolkit
              </h2>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.flatMap((s) => s.tools.slice(0, 3)).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-[#222] text-slate-700 dark:text-neutral-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-neutral-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* BENTO HEATMAP SECTION */}
        <div id="activity" className="w-full">
          <ScrollReveal animation="fade-up">
            <GitHubHeatmap username={PERSONAL_INFO.contact.githubUsername} />
          </ScrollReveal>
        </div>

        {/* SECTION 4: PROJECTS */}
        <div id="projects" className="mt-8">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 ml-2">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Featured Case Studies & Systems
                </h2>
                <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
                  Filter by category, search by keyword, or download release APKs directly.
                </p>
              </div>
            </div>

            <ProjectFilterBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={allProjects.length}
              visibleCount={filteredProjects.length}
            />
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {visibleProjects.map((project, idx) => (
              <ScrollReveal key={project.id || project.name} animation="fade-up" delay={50 * idx} duration={800} className="w-full">
                <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                    {/* Project Meta */}
                    <div className="w-full md:w-1/3 shrink-0">
                      <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-[#222] text-slate-600 dark:text-neutral-400 tracking-widest text-[10px] font-bold uppercase rounded-md mb-4 border border-slate-200 dark:border-neutral-800">
                        Archive 0{idx + 1}
                      </span>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                        {project.customTitle || project.name}
                      </h3>
                      <p className="text-slate-600 dark:text-neutral-400 leading-relaxed mb-6 font-medium text-sm sm:text-base">
                        {project.summary || project.description || "Core infrastructure exploration module."}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        {project.language && (
                          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-lg text-xs font-bold border border-indigo-100 dark:border-indigo-800/30">
                            {project.language}
                          </span>
                        )}
                        {project.version && (
                          <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-mono rounded-lg text-xs font-bold border border-emerald-200 dark:border-emerald-800/30">
                            {project.version}
                          </span>
                        )}
                        {project.badge && (
                          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-800/30">
                            {project.badge}
                          </span>
                        )}
                      </div>

                      {/* Direct APK Download Button (Zero empty placeholders if absent!) */}
                      {project.latestRelease?.primaryAsset && (
                        <div className="flex flex-col gap-2 mb-4">
                          <a
                            href={project.latestRelease.primaryAsset.downloadUrl}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.02] text-sm cursor-pointer"
                          >
                            <span>{project.latestRelease.hasApk ? "📱 Download APK" : "📥 Download Release"}</span>
                            <span className="text-xs font-mono opacity-90 font-normal">
                              ({project.latestRelease.primaryAsset.arch} • {project.latestRelease.primaryAsset.sizeFormatted})
                            </span>
                          </a>
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center justify-center w-full py-3 bg-slate-900 text-white dark:bg-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer text-sm"
                        >
                          Inspect Deep Dive 🔍
                        </button>
                        {project.html_url && (
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center w-full py-2.5 bg-slate-100 dark:bg-[#1a1a1a] text-slate-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-[#252525] transition-colors text-xs"
                          >
                            GitHub Repository ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Details & Commits */}
                    <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-neutral-800 pt-8 md:pt-0 md:pl-8 lg:pl-16">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-xl">⚙️</span> Major Implementations
                      </h4>

                      <div className="bg-slate-50 dark:bg-[#0a0a0a] rounded-2xl p-6 border border-slate-200 dark:border-neutral-800/50">
                        {project.recentCommits && project.recentCommits.length > 0 ? (
                          <div className="flex flex-col gap-4 max-h-[260px] overflow-y-auto custom-scrollbar pr-2">
                            {project.recentCommits.slice(0, 4).map((commit) => (
                              <div
                                key={commit.sha}
                                className="flex flex-col gap-1.5 border-b border-slate-200/50 dark:border-neutral-800/50 pb-3 last:border-b-0 last:pb-0"
                              >
                                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                                  {commit.sha.substring(0, 7)}{" "}
                                  <span className="text-slate-400 dark:text-neutral-600 mx-2">|</span>{" "}
                                  {new Date(commit.commit?.author?.date).toLocaleDateString()}
                                </span>
                                <span className="text-sm text-slate-800 dark:text-neutral-300 font-medium leading-relaxed truncate">
                                  {commit.commit?.message?.split("\n")[0]}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-slate-500 dark:text-neutral-500 italic flex items-center justify-center h-20 text-sm">
                            Commit log indexed in deep dive inspection.
                          </div>
                        )}
                      </div>

                      {/* UI Previews (Zero empty placeholders - only renders if previews exist!) */}
                      {project.previews && project.previews.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-neutral-800">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400 mb-4 flex items-center gap-2">
                            <span>📱</span> UI Previews & Screenshots ({project.previews.length})
                          </h5>
                          <div className="flex gap-3 overflow-x-auto pb-3 custom-scrollbar">
                            {project.previews.map((prev, pIdx) => (
                              <button
                                key={pIdx}
                                type="button"
                                onClick={() => setSelectedScreenshot(prev)}
                                className="group relative shrink-0 w-24 sm:w-28 aspect-[9/16] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-sm hover:shadow-md hover:scale-105 transition-all text-left bg-slate-100 dark:bg-neutral-900 cursor-pointer"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={prev.url}
                                  alt={prev.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-[9px] text-white font-medium truncate">
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

          {/* Show More / Show Less */}
          {filteredProjects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                {showAll ? "Show Less ↑" : `Show More (${filteredProjects.length - 6} more) ↓`}
              </button>
            </div>
          )}
        </div>

        {/* EXPERIENCE & ACHIEVEMENTS BENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Experience */}
          <ScrollReveal animation="fade-up" className="w-full">
            <div
              id="experience"
              className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                <span className="text-3xl">🚀</span> Experience Journey
              </h2>
              <div className="flex flex-col gap-6">
                {EXPERIENCE_DATA.map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#222] border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-500 dark:text-neutral-400 font-bold shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.role}</h3>
                      <p className="text-slate-500 dark:text-neutral-400 font-medium text-sm mt-0.5">
                        {item.company} • {item.period}
                      </p>
                      <p className="text-slate-600 dark:text-neutral-400 text-xs mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Achievements */}
          <ScrollReveal animation="fade-up" delay={200} className="w-full">
            <div
              id="achievements"
              className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                <span className="text-3xl">🏆</span> Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS_DATA.map((ach, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-neutral-800 p-6 rounded-2xl flex flex-col items-start gap-3 hover:-translate-y-1 transition-transform"
                  >
                    <div className="text-2xl">{ach.icon}</div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-0.5">
                        {ach.tag}
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{ach.title}</h3>
                      <p className="text-slate-500 dark:text-neutral-400 text-xs leading-relaxed">{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* SECTION 7: CONTACT */}
        <ScrollReveal animation="fade-up" className="mt-8">
          <div
            id="contact"
            className="bg-slate-900 dark:bg-neutral-900 p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full" />

            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative z-10">
              Ready to build?
            </h2>
            <p className="text-lg text-slate-400 font-medium max-w-lg mb-8 relative z-10">
              {PERSONAL_INFO.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                Send an Email ({PERSONAL_INFO.contact.email})
              </a>
              <a
                href={PERSONAL_INFO.contact.resumeUrl}
                download={PERSONAL_INFO.contact.resumeFilename}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl backdrop-blur-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Download Resume 📄
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScreenshotModal image={selectedScreenshot} onClose={() => setSelectedScreenshot(null)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
