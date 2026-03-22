"use client";

import React, { useState } from "react";
import ScrollReveal from "../ScrollReveal";

export default function CyberUI({ publicProjects, privateProjects, controls }) {
  const { themeMode, setThemeMode, currentStyle, setCurrentStyle } = controls || {};
  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];
  const sortedProjects = allProjects.sort((a,b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const NAV = ["about", "skills", "projects", "experience", "achievements", "contact"];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false); };

  return (
    <div className="min-h-screen font-mono text-cyan-900 dark:text-cyan-500 bg-white dark:bg-[#050510] transition-colors duration-500 pb-32 relative selection:bg-cyan-500 selection:text-white">
      
      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0 bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:4rem_4rem] transition-opacity duration-1000"></div>

      {/* Cyber Nav */}
      <nav className="sticky top-0 z-50 border-b-2 border-cyan-300 dark:border-[#00f0ff]/40 bg-cyan-50/80 dark:bg-[#050510]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-10">
          <span className="text-xs font-black tracking-[0.3em] uppercase text-cyan-800 dark:text-[#00f0ff]">SYS://AKSHAY</span>
          <div className="hidden md:flex items-center gap-0">
            {NAV.map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="px-3 py-1 text-[9px] uppercase tracking-[0.25em] font-bold text-cyan-600 dark:text-cyan-500 hover:text-cyan-950 dark:hover:text-[#00f0ff] hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors border-r border-cyan-200 dark:border-cyan-500/20 last:border-r-0">{id}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setThemeMode?.(themeMode === "dark" ? "light" : "dark")} className="w-7 h-7 flex items-center justify-center text-xs text-cyan-700 dark:text-[#00f0ff] border border-cyan-300 dark:border-[#00f0ff]/40 hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors" title="Toggle theme">
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
            <select value={currentStyle} onChange={(e) => setCurrentStyle?.(e.target.value)} className="bg-transparent text-[9px] font-bold tracking-[0.2em] uppercase text-cyan-600 dark:text-cyan-500 outline-none cursor-pointer border border-cyan-300 dark:border-[#00f0ff]/40 px-2 py-1 hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors">
              <option value="minimal">MINIMAL</option>
              <option value="bento">BENTO</option>
              <option value="glass">GLASS</option>
              <option value="cyber">CYBER</option>
              <option value="terminal">TERMINAL</option>
            </select>
            {/* Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-7 h-7 flex flex-col items-center justify-center gap-1 border border-cyan-300 dark:border-[#00f0ff]/40 hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 transition-colors">
              <span className={`block w-3 h-0.5 bg-cyan-700 dark:bg-[#00f0ff] transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
              <span className={`block w-3 h-0.5 bg-cyan-700 dark:bg-[#00f0ff] transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
            </button>
          </div>
        </div>
        {/* Mobile dropdown */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-cyan-50/90 dark:bg-[#050510]/95 backdrop-blur-xl border-t border-cyan-300 dark:border-[#00f0ff]/20 px-4 py-3 flex flex-col gap-0">
            {NAV.map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-500 hover:text-cyan-950 dark:hover:text-[#00f0ff] hover:bg-cyan-100 dark:hover:bg-[#00f0ff]/10 px-3 transition-colors">{id}</button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 mt-12 flex flex-col gap-24">
        
        {/* 1. HERO */}
        <section id="hero" className="border-l-4 border-cyan-500 dark:border-[#00f0ff] pl-8 py-12 bg-gradient-to-r from-cyan-50 dark:from-cyan-900/10 to-transparent">
          <ScrollReveal animation="cyber-glitch">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-cyan-500 dark:bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest animate-pulse">Sys_Online</span>
              <span className="text-xs text-cyan-700 dark:text-cyan-600 font-bold uppercase tracking-widest">v1.0.0 // {new Date().toISOString().split('T')[0]}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-cyan-950 dark:text-white uppercase tracking-tighter mb-4 shadow-cyan-500/20 drop-shadow-md dark:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
              AKSHAY<span className="text-cyan-500">_</span>
            </h1>
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-400 tracking-widest uppercase mb-8">
              Computer Eng Trainee // Full-Stack Op
            </h2>
            <p className="text-xl md:text-2xl text-cyan-800 dark:text-cyan-300 max-w-2xl leading-relaxed mb-12">
              Building simple, efficient, and highly scalable web architectures overriding legacy systems.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 dark:bg-[#00f0ff] dark:hover:bg-white text-white dark:text-black font-bold tracking-widest uppercase border-b-4 border-cyan-700 dark:border-cyan-600 transition-all hover:translate-y-1 hover:border-b-0" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
                 Run Archive.exe
               </button>
               <button className="px-8 py-3 bg-transparent text-cyan-700 dark:text-cyan-500 font-bold tracking-widest uppercase border-2 border-cyan-500 dark:border-[#00f0ff] transition-all hover:bg-cyan-500 dark:hover:bg-[#00f0ff]/10 hover:text-white" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                 Connect Proxy
               </button>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. ABOUT */}
        <section id="about" className="border border-cyan-200 dark:border-cyan-500/30 bg-white/80 dark:bg-black/60 backdrop-blur-md p-8 md:p-12 relative overflow-hidden group">
          <ScrollReveal animation="fade-right">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 dark:bg-gradient-to-r dark:from-transparent dark:via-cyan-500 dark:to-transparent dark:opacity-50"></div>
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-8">» 01_User_Profile</h2>
            <div className="text-lg md:text-xl text-cyan-800 dark:text-cyan-300 space-y-6 max-w-3xl leading-relaxed">
              <p>
                &gt; I am a 3rd-year computer engineering diploma student currently advancing my baseline capabilities through rigorous self-taught engineering frameworks.
              </p>
              <p>
                &gt; I execute on building systems that solve <strong className="text-cyan-950 dark:text-white uppercase">real organizational problems</strong> rather than duplicating tutorial arrays. When compiling code, I process pure architectural logic.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. SKILLS */}
        <section id="skills" className="relative">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-12">» 02_Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { id: "SYS_FRONT", title: "Frontend", data: ["HTML", "CSS", "JS", "React", "Next.js", "Tailwind"] },
                 { id: "SYS_BACK", title: "Backend", data: ["Java", "Node.js", "Next API"] },
                 { id: "SYS_DATA", title: "Database", data: ["MySQL", "MongoDB", "PostgreSQL"] },
                 { id: "SYS_TOOL", title: "Tools", data: ["Git", "GitHub", "Android Studio"] },
               ].map((module) => (
                 <div key={module.id} className="border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50 dark:bg-[#050510]/80 p-6 group hover:border-cyan-500 dark:hover:border-[#00f0ff] transition-colors relative">
                    <div className="absolute top-0 right-0 p-2 text-[10px] text-cyan-400 opacity-50">{module.id}</div>
                    <h3 className="text-lg font-bold text-cyan-950 dark:text-white uppercase mb-6">{module.title}</h3>
                    <ul className="flex flex-col gap-3">
                      {module.data.map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-cyan-800 dark:text-cyan-400 uppercase font-bold tracking-wider">
                           <span className="text-cyan-500 dark:text-[#ff003c]">{">"}</span> {item}
                        </li>
                      ))}
                    </ul>
                 </div>
               ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 4. PROJECTS */}
        <section id="projects">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-12 flex items-center justify-between border-b border-cyan-300 dark:border-cyan-500/30 pb-4">
              <span>» 03_Decrypted_Archives</span>
              <span className="text-[10px] font-mono font-normal">DATA_PACKETS_SECURED</span>
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            {visibleProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="cyber-glitch" delay={50 * idx} duration={500} className="w-full">
                <div className="border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50/50 dark:bg-black/60 p-6 md:p-8 relative overflow-hidden group hover:border-cyan-500 dark:hover:border-[#00f0ff] transition-all shadow-[inset_0_0_20px_rgba(0,240,255,0.02)] dark:shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]">
                  <div className="absolute top-0 left-0 w-2 h-full bg-cyan-400 dark:bg-[#00f0ff]"></div>
                  
                  <div className="flex flex-col lg:flex-row gap-8 pl-4">
                     
                     <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-cyan-300 dark:border-cyan-500/20 pb-8 lg:pb-0 lg:pr-8">
                        <span className="text-[10px] text-cyan-600 dark:text-cyan-600 font-mono uppercase tracking-widest block mb-4">TARGET_HASH_{project.id}</span>
                        <h3 className="text-3xl font-black text-cyan-950 dark:text-white uppercase tracking-widest mb-4 truncate">{project.name}</h3>
                        <p className="font-mono text-sm text-cyan-800 dark:text-cyan-300 leading-relaxed mb-6">
                          {project.description || "NO RELEVANT ARCHIVE MOTIVATION FOUND."}
                        </p>
                        
                        <div className="flex items-center gap-3 flex-wrap mb-8">
                          <span className="bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800">{project.language || "SYS_BIN"}</span>
                          {project.isLocal ? (
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-purple-800 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-800">{(project.localTag || 'LOCAL').toUpperCase()}</span>
                          ) : (
                            <>
                              {project.private ? (
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-800 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800">PRIVATE</span>
                              ) : (
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800">PUBLIC</span>
                              )}
                              {project.fork && (
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800">FORK</span>
                              )}
                            </>
                          )}
                        </div>

                        {project.html_url && (
                          <a href={project.html_url} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 bg-cyan-600 dark:bg-transparent text-white dark:text-[#00f0ff] border-2 border-cyan-600 dark:border-[#00f0ff] text-xs font-bold uppercase tracking-widest hover:bg-cyan-700 dark:hover:bg-[#00f0ff] dark:hover:text-black transition-colors w-full text-center">
                            ACCESS_REMOTE
                          </a>
                        )}
                     </div>
                     
                     <div className="w-full lg:w-2/3">
                        <div className="flex justify-between items-center mb-6 pl-2 border-l-2 border-cyan-400 dark:border-[#00f0ff]">
                           <span className="text-xs text-cyan-800 dark:text-cyan-500 font-bold uppercase tracking-widest ml-4">COMMITS_LOG</span>
                           <span className="text-[10px] text-cyan-600 font-mono animate-pulse">RECORDING_ACTIVE</span>
                        </div>
                        
                        <div className="bg-white dark:bg-black/50 border border-cyan-200 dark:border-cyan-500/20 p-4">
                          {project.recentCommits && Array.isArray(project.recentCommits) && project.recentCommits.length > 0 ? (
                            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-4">
                              {project.recentCommits.map(commit => (
                                <div key={commit.sha} className="flex flex-col md:flex-row gap-4 border-b border-cyan-100 dark:border-cyan-500/10 pb-4 last:border-0 last:pb-0 items-start md:items-center">
                                  <span className="text-cyan-600 dark:text-[#ff003c] font-mono text-xs w-20 shrink-0">{commit.sha.substring(0, 7)}</span>
                                  <span className="text-cyan-900 dark:text-cyan-50 text-sm flex-1">{commit.commit?.message?.split('\n')[0]}</span>
                                  <span className="text-cyan-500 dark:text-cyan-600 font-mono text-[10px] shrink-0">{new Date(commit.commit.author.date).toLocaleDateString()}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-cyan-500 text-xs uppercase tracking-widest block text-center py-8">NO_ENCRYPTED_LOGS_FOUND</span>
                          )}
                        </div>
                     </div>

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Show More / Show Less */}
          {sortedProjects.length > 6 && (
            <div className="text-center mt-12">
              <button 
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 dark:bg-transparent dark:hover:bg-[#00f0ff]/10 text-white dark:text-[#00f0ff] font-bold tracking-widest uppercase border-2 border-cyan-500 dark:border-[#00f0ff] transition-all"
              >
                {showAll ? `COLLAPSE_ARCHIVES ↑` : `EXPAND_ARCHIVES (${sortedProjects.length - 6} MORE) ↓`}
              </button>
            </div>
          )}
        </section>

        {/* 5. EXPERIENCE */}
        <section id="experience">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-12">» 04_Mission_Logs</h2>
            <div className="border-l-2 border-cyan-300 dark:border-cyan-500/30 pl-8 space-y-12 relative">
               {[
                 { year: "PRESENT", role: "Software Developer Trainee", company: "Bhairav Robotics", desc: "Executing real-world system architecture integrations into corporate sectors." },
                 { year: "2023_ONWARD", role: "Open Source Protocol", company: "GitHub Global", desc: "Injecting architectural pull requests into existing robust infrastructures." },
                 { year: "2021_2024", role: "Computer Eng Protocol", company: "Andhra Polytechnic", desc: "Formalizing base logic algorithms and hardware-software interaction bridges." },
               ].map((job, idx) => (
                 <div key={idx} className="relative group">
                    <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-cyan-100 dark:bg-black border-2 border-cyan-500 dark:border-[#00f0ff] group-hover:bg-cyan-500 dark:group-hover:bg-[#00f0ff] dark:group-hover:shadow-[0_0_10px_#00f0ff] transition-all"></div>
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2 block">{job.year} // {job.company}</span>
                    <h3 className="text-xl font-black text-cyan-950 dark:text-white uppercase mb-4">{job.role}</h3>
                    <p className="text-cyan-800 dark:text-cyan-400 font-medium leading-relaxed max-w-2xl">{job.desc}</p>
                 </div>
               ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 6. ACHIEVEMENTS */}
        <section id="achievements">
          <ScrollReveal animation="fade-right">
            <h2 className="text-2xl font-black text-cyan-900 dark:text-[#00f0ff] tracking-widest uppercase mb-12">» 05_Acquired_Assets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="bg-cyan-50 dark:bg-black p-8 border border-cyan-300 dark:border-cyan-500/30 hover:border-cyan-600 dark:hover:border-[#00f0ff] transition-colors relative group">
                  <div className="w-12 h-12 bg-cyan-200 dark:bg-cyan-900/40 text-cyan-800 dark:text-[#00f0ff] flex items-center justify-center text-2xl mb-6">🏆</div>
                  <h3 className="text-xl font-bold text-cyan-950 dark:text-white uppercase mb-2">Technical Certs</h3>
                  <p className="text-cyan-800 dark:text-cyan-500 text-sm">Advanced full-stack mastery certificates via massive rigorous logic courses.</p>
               </div>
               <div className="bg-cyan-50 dark:bg-black p-8 border border-cyan-300 dark:border-cyan-500/30 hover:border-cyan-600 dark:hover:border-[#00f0ff] transition-colors relative group">
                  <div className="w-12 h-12 bg-cyan-200 dark:bg-cyan-900/40 text-cyan-800 dark:text-[#ff003c] flex items-center justify-center text-2xl mb-6">⚠️</div>
                  <h3 className="text-xl font-bold text-cyan-950 dark:text-white uppercase mb-2">Hackathon Runtimes</h3>
                  <p className="text-cyan-800 dark:text-cyan-500 text-sm">Translating raw logic into viable interactive systems rapidly under severe constraints.</p>
               </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. CONTACT */}
        <section id="contact">
          <ScrollReveal animation="fade-up">
            <div className="bg-cyan-900 dark:bg-[#00f0ff]/10 border-2 border-cyan-950 dark:border-[#00f0ff] p-12 md:p-24 text-center mt-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] dark:bg-[linear-gradient(45deg,rgba(0,240,255,0.05)_25%,transparent_25%,transparent_50%,rgba(0,240,255,0.05)_50%,rgba(0,240,255,0.05)_75%,transparent_75%,transparent)] bg-[length:4px_4px]"></div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white dark:text-[#00f0ff] uppercase tracking-tighter mb-6 relative z-10 drop-shadow-lg dark:drop-shadow-[0_0_10px_#00f0ff]">
                INITIATE_COMMS
              </h2>
              <p className="text-cyan-100 dark:text-cyan-50 text-lg mb-12 relative z-10 max-w-xl mx-auto">
                System is idle. Pending new directives, collaboration requests, or architectural discussions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <a href="mailto:nalliakshaykumar@gmail.com" className="px-8 py-4 bg-cyan-400 dark:bg-[#00f0ff] text-cyan-950 dark:text-black font-black uppercase tracking-widest hover:bg-white transition-colors">
                  TRANSMIT_EMAIL
                </a>
                <button className="px-8 py-4 bg-cyan-950 dark:bg-black text-cyan-400 dark:text-[#00f0ff] border border-cyan-400 dark:border-[#00f0ff] font-black uppercase tracking-widest hover:bg-cyan-800 dark:hover:bg-[#00f0ff]/20 transition-colors">
                  DOWNLOAD_SYSFILE
                </button>
              </div>
              
              <div className="flex justify-center gap-12 mt-24 pt-8 border-t border-cyan-800 dark:border-cyan-500/30 relative z-10">
                 <a href="https://github.com/Akshay-86" className="text-cyan-300 dark:text-cyan-600 hover:text-white dark:hover:text-[#00f0ff] font-bold tracking-widest text-xs uppercase transition-colors">GitHub_Node</a>
                 <a href="https://www.linkedin.com/in/nalliakshaykumar/" className="text-cyan-300 dark:text-cyan-600 hover:text-white dark:hover:text-[#00f0ff] font-bold tracking-widest text-xs uppercase transition-colors">Link_Network</a>
                 <a href="https://www.instagram.com/mr_mirk_rex" className="text-cyan-300 dark:text-cyan-600 hover:text-white dark:hover:text-[#00f0ff] font-bold tracking-widest text-xs uppercase transition-colors">Instagram</a>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
