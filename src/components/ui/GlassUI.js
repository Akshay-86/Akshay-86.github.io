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

export default function GlassUI({ publicProjects, privateProjects, controls }) {
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
    <div className="min-h-screen relative font-sans text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#030712] transition-colors duration-1000 pb-32">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0 opacity-60 dark:opacity-30 pointer-events-none transition-opacity duration-1000">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300 dark:bg-purple-900 mix-blend-multiply filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-300 dark:bg-blue-900 mix-blend-multiply filter blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-pink-300 dark:bg-pink-900 mix-blend-multiply filter blur-[150px] animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      {/* Glass Nav */}
      <nav className="sticky top-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-2xl border-b border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {PERSONAL_INFO.name}.
          </span>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-1 text-[11px] uppercase tracking-widest font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-all cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeMode?.(themeMode === "dark" ? "light" : "dark")}
              className="w-8 h-8 flex items-center justify-center rounded-full text-xs bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/20 transition-all cursor-pointer"
              title="Toggle theme"
            >
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
            <select
              value={currentStyle}
              onChange={(e) => setCurrentStyle?.(e.target.value)}
              className="bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-md text-[11px] font-medium text-slate-600 dark:text-slate-300 outline-none cursor-pointer rounded-full px-3 py-1.5 hover:bg-white/60 dark:hover:bg-white/20 transition-all"
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
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 rounded-full bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/20 transition-all cursor-pointer"
            >
              <span
                className={`block w-3.5 h-0.5 bg-slate-600 dark:bg-slate-300 transition-all ${
                  mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block w-3.5 h-0.5 bg-slate-600 dark:bg-slate-300 transition-all ${
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
          <div className="bg-white/50 dark:bg-black/50 backdrop-blur-2xl border-t border-white/20 dark:border-white/5 px-6 py-3 flex flex-col gap-1">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left py-2.5 text-sm font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col gap-24">
        {/* 1. Hero */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-center text-center">
          <ScrollReveal animation="blur-in" duration={1200}>
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-500 mx-auto mb-8 shadow-2xl flex items-center justify-center text-white text-5xl font-black">
              A
            </div>
            <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight mb-6">
              {PERSONAL_INFO.name}.
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto mb-8">
              Native Android Developer & Aspiring Systems Engineer
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-normal max-w-xl mx-auto mb-12">
              {PERSONAL_INFO.tagline}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-purple-500/25 transition-all hover:scale-105 cursor-pointer"
              >
                Explore Projects
              </button>
              <a
                href={PERSONAL_INFO.contact.resumeUrl}
                download={PERSONAL_INFO.contact.resumeFilename}
                className="px-8 py-4 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-white/50 dark:border-white/10 backdrop-blur-md text-slate-800 dark:text-white font-bold transition-all hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                Download Resume 📄
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. About Me */}
        <section id="about">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600" /> 01. About Me
            </h2>
            <div className="bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-xl">
              <div className="space-y-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                {PERSONAL_INFO.aboutParagraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. Skills */}
        <section id="skills">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600" /> 02. Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS_DATA.map((skillset, i) => (
                <div
                  key={i}
                  className="bg-white/50 dark:bg-black/40 border border-white/40 dark:border-white/5 p-8 rounded-3xl backdrop-blur-md"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span>{skillset.icon}</span>
                    <span>{skillset.category}</span>
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {skillset.tools.map((tool) => (
                      <li key={tool} className="text-slate-700 dark:text-slate-300 font-medium text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 shrink-0" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Live Heatmap Section */}
        <section id="activity">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600" /> 03. Live Activity & Commits
            </h2>
            <GitHubHeatmap username={PERSONAL_INFO.contact.githubUsername} />
          </ScrollReveal>
        </section>

        {/* 4. Projects */}
        <section id="projects">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-4">
                <span className="w-8 h-px bg-slate-400 dark:bg-slate-600" /> 04. Case Studies & Repositories
              </h2>
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

          <div className="flex flex-col gap-8">
            {visibleProjects.map((project, idx) => (
              <ScrollReveal key={project.id || project.name} animation="fade-up" delay={50 * idx} duration={800} className="w-full">
                <div className="flex flex-col gap-8 md:flex-row md:gap-12 bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-2xl relative overflow-hidden group hover:border-white/80 dark:hover:border-white/20 transition-colors duration-500 shadow-xl">
                  <div className="w-full md:w-1/3 shrink-0">
                    <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono tracking-widest uppercase mb-4 block border-b border-slate-200 dark:border-white/10 pb-2">
                      Archive {idx + 1}
                    </span>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                      {project.customTitle || project.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6 text-sm sm:text-base">
                      {project.summary || project.description || "Foundational exploration module."}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap mb-6">
                      {project.language && (
                        <span className="px-3 py-1 bg-white/50 dark:bg-white/5 rounded-full text-xs text-slate-800 dark:text-white uppercase tracking-wider font-mono border border-white/50 dark:border-white/10">
                          {project.language}
                        </span>
                      )}
                      {project.version && (
                        <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-xs text-emerald-700 dark:text-emerald-300 uppercase tracking-wider font-bold border border-emerald-500/30 font-mono">
                          {project.version}
                        </span>
                      )}
                      {project.badge && (
                        <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-700 dark:text-blue-300 uppercase tracking-wider font-bold border border-blue-500/30">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Direct Release / APK Download Button (Zero empty placeholders if absent!) */}
                    {project.latestRelease?.primaryAsset && (
                      <div className="mb-4">
                        <a
                          href={project.latestRelease.primaryAsset.downloadUrl}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-2xl shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] text-xs cursor-pointer border border-white/20"
                        >
                          <span>{project.latestRelease.hasApk ? "📱 Download APK" : "📦 Download Asset"}</span>
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
                        className="inline-flex items-center justify-center w-full py-2.5 bg-slate-900 text-white dark:bg-white dark:text-black font-bold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer uppercase tracking-wider"
                      >
                        Inspect Deep Dive 🔍
                      </button>
                      {project.html_url && (
                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-white transition-colors group py-1"
                        >
                          <span>View on GitHub</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 pt-8 md:pt-0 md:pl-12">
                    <div className="bg-white/50 dark:bg-black/40 backdrop-blur-3xl rounded-[2rem] p-6 sm:p-8 border border-white/50 dark:border-white/5 shadow-inner w-full">
                      <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-200 dark:border-white/10">
                        <span className="text-xs font-bold tracking-widest text-slate-800 dark:text-slate-300 uppercase">
                          Major Implementations
                        </span>
                      </div>

                      {project.recentCommits && project.recentCommits.length > 0 ? (
                        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-3">
                          {project.recentCommits.slice(0, 4).map((commit) => (
                            <div
                              key={commit.sha}
                              className="flex flex-col md:flex-row justify-between items-start gap-2 border-b border-slate-200/50 dark:border-white/5 pb-4 last:border-0 last:pb-0"
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 block mb-1">
                                  {commit.sha.substring(0, 7)}
                                </span>
                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed block truncate">
                                  {commit.commit?.message?.split("\n")[0]}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap mt-1 shrink-0 bg-white/50 dark:bg-white/5 px-2 py-1 rounded-md">
                                {new Date(commit.commit?.author?.date).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400 text-xs italic">
                          Commit logs indexed in deep dive inspection.
                        </span>
                      )}
                    </div>

                    {/* Previews (Zero empty placeholders - only renders if previews exist!) */}
                    {project.previews && project.previews.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                          <span>📱</span> UI Previews & Screenshots ({project.previews.length})
                        </h5>
                        <div className="flex gap-4 overflow-x-auto pb-3 custom-scrollbar">
                          {project.previews.map((prev, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setSelectedScreenshot(prev)}
                              className="group relative shrink-0 w-24 sm:w-28 aspect-[9/16] rounded-xl overflow-hidden border border-white/40 dark:border-white/10 shadow-sm hover:shadow-md hover:scale-105 transition-all text-left bg-slate-100 dark:bg-neutral-900 cursor-pointer"
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
              </ScrollReveal>
            ))}
          </div>

          {filteredProjects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 border border-white/50 dark:border-white/10 text-slate-900 dark:text-white font-bold transition-all hover:scale-105 cursor-pointer text-sm"
              >
                {showAll ? "Show Less ↑" : `Show More (${filteredProjects.length - 6} more) ↓`}
              </button>
            </div>
          )}
        </section>

        {/* 5. Experience */}
        <section id="experience">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600" /> 05. Experience & Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EXPERIENCE_DATA.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 p-8 rounded-3xl backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">
                      {job.period}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{job.role}</h3>
                    <p className="text-xs uppercase font-medium text-slate-400 dark:text-slate-500 mb-4">
                      {job.company}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                      {job.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 6. Achievements */}
        <section id="achievements">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600" /> 06. Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACHIEVEMENTS_DATA.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 p-8 rounded-3xl backdrop-blur-xl"
                >
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 7. Contact */}
        <section id="contact" className="text-center py-12">
          <ScrollReveal animation="fade-up">
            <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 tracking-tight mb-6">
              Let's Build.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-10">
              {PERSONAL_INFO.tagline}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                Say Hello ({PERSONAL_INFO.contact.email})
              </a>
              <a
                href={PERSONAL_INFO.contact.resumeUrl}
                download={PERSONAL_INFO.contact.resumeFilename}
                className="px-8 py-4 rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 text-slate-900 dark:text-white font-bold backdrop-blur-md hover:scale-105 transition-transform inline-flex items-center gap-2 cursor-pointer"
              >
                Download Resume 📄
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
