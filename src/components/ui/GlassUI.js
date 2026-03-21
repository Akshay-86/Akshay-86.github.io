"use client";

import React, { useState } from "react";
import ScrollReveal from "../ScrollReveal";

export default function GlassUI({ publicProjects, privateProjects, controls }) {
  const { themeMode, setThemeMode, currentStyle, setCurrentStyle } = controls || {};
  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];
  const sortedProjects = allProjects.sort((a,b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const NAV = ["about", "skills", "projects", "experience", "achievements", "contact"];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false); };

  return (
    <div className="min-h-screen relative font-sans text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#030712] transition-colors duration-1000">
      
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0 opacity-60 dark:opacity-30 pointer-events-none transition-opacity duration-1000">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300 dark:bg-purple-900 mix-blend-multiply filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-300 dark:bg-blue-900 mix-blend-multiply filter blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-pink-300 dark:bg-pink-900 mix-blend-multiply filter blur-[150px] animate-[pulse_12s_ease-in-out_infinite]"></div>
      </div>

      {/* Glass Nav */}
      <nav className="sticky top-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-2xl border-b border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Akshay.</span>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="px-3 py-1 text-[11px] uppercase tracking-widest font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/10 rounded-full transition-all">{id}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setThemeMode?.(themeMode === "dark" ? "light" : "dark")} className="w-8 h-8 flex items-center justify-center rounded-full text-xs bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/20 transition-all" title="Toggle theme">
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
            <select value={currentStyle} onChange={(e) => setCurrentStyle?.(e.target.value)} className="bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-md text-[11px] font-medium text-slate-600 dark:text-slate-300 outline-none cursor-pointer rounded-full px-3 py-1.5 hover:bg-white/60 dark:hover:bg-white/20 transition-all">
              <option value="minimal">Minimal</option>
              <option value="bento">Bento</option>
              <option value="glass">Glass</option>
              <option value="cyber">Cyber</option>
              <option value="terminal">Terminal</option>
            </select>
            {/* Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 rounded-full bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/20 transition-all">
              <span className={`block w-3.5 h-0.5 bg-slate-600 dark:bg-slate-300 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
              <span className={`block w-3.5 h-0.5 bg-slate-600 dark:bg-slate-300 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
            </button>
          </div>
        </div>
        {/* Mobile dropdown */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-white/50 dark:bg-black/50 backdrop-blur-2xl border-t border-white/20 dark:border-white/5 px-6 py-3 flex flex-col gap-1">
            {NAV.map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2.5 text-sm font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">{id}</button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col gap-32 pb-40 pt-12">
        
        {/* 1. Hero */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-center text-center">
          <ScrollReveal animation="blur-in" duration={1200}>
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-500 mx-auto mb-8 shadow-2xl flex items-center justify-center text-white text-6xl font-light">
              A
            </div>
            <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight mb-6">
              Akshay.
            </h1>
            <h2 className="text-2xl md:text-4xl font-light text-slate-600 dark:text-slate-400 mb-8">
              Computer Engineering Student | Full-Stack Developer
            </h2>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              I build simple, efficient, and highly scalable web applications.
            </p>
            <div className="flex gap-6 justify-center">
              <button className="px-8 py-4 bg-slate-900/10 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 backdrop-blur-md text-slate-900 dark:text-white border border-slate-900/20 dark:border-white/20 font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-1" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
                View Projects
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. About Me */}
        <section id="about" className="bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-12 md:p-16 rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600"></span> 01. About Me
            </h2>
            <div className="text-xl md:text-3xl font-light leading-relaxed text-slate-700 dark:text-slate-300 space-y-8">
              <p>
                I am a 3rd-year computer engineering diploma student currently refining my craft through rigorous self-taught engineering and practical problem-solving.
              </p>
              <p>
                My focus lies at the absolute intersection of frontend performance and scalable backend architecture. I enjoy building systems that solve <strong className="font-semibold text-slate-900 dark:text-white">real problems</strong> rather than just following massive tutorials. When I code, I seek the pure logic behind complex structural requirements.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. Skills */}
        <section id="skills" className="bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-12 md:p-16 rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600"></span> 02. Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { category: "Frontend", tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TailwindCSS"] },
                { category: "Backend", tools: ["Java", "Node.js", "NextJS API"] },
                { category: "Database", tools: ["MySQL", "MongoDB", "PostgreSQL"] },
                { category: "Tools", tools: ["Git", "GitHub", "Android Studio"] },
              ].map((skillset, i) => (
                <div key={i} className="bg-white/50 dark:bg-black/40 border border-white/40 dark:border-white/5 p-8 rounded-3xl backdrop-blur-md">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{skillset.category}</h3>
                  <ul className="flex flex-col gap-4">
                    {skillset.tools.map(tool => (
                      <li key={tool} className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                         {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 4. Projects */}
        <section id="projects">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600"></span> 03. Case Studies
            </h2>
          </ScrollReveal>
          
          <div className="flex flex-col gap-12">
            {visibleProjects.map((project, idx) => (
               <ScrollReveal key={project.id} animation="fade-up" delay={100 * idx} duration={800} className="w-full">
                  <div className="flex flex-col gap-8 md:flex-row md:gap-12 bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 p-8 md:p-12 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden group hover:border-white/80 dark:hover:border-white/20 transition-colors duration-500 shadow-xl">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 dark:from-indigo-500/10 to-transparent blur-3xl -z-10 rounded-full"></div>
                     
                     <div className="w-full md:w-1/3 shrink-0">
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono tracking-widest uppercase mb-4 block border-b border-slate-200 dark:border-white/10 pb-4">Archive {idx+1}</span>
                        <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">{project.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8 text-lg">{project.description || "Foundational exploration module."}</p>
                        
                        <div className="flex items-center gap-3 flex-wrap">
                           <span className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full text-xs text-slate-800 dark:text-white uppercase tracking-widest font-mono border border-white/50 dark:border-white/10">
                              {project.language || "Docs"}
                           </span>
                        </div>

                        {project.html_url && (
                          <a href={project.html_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-white transition-colors group">
                            View Repository <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </a>
                        )}
                     </div>

                     <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 pt-8 md:pt-0 md:pl-12">
                        <div className="bg-white/50 dark:bg-black/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/50 dark:border-white/5 shadow-inner w-full">
                          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
                             <span className="text-xs font-bold tracking-widest text-slate-800 dark:text-slate-300 uppercase">Major Implementations</span>
                          </div>
                          
                          {project.recentCommits && Array.isArray(project.recentCommits) && project.recentCommits.length > 0 ? (
                            <div className="flex flex-col gap-6 max-h-[400px] overflow-hidden hover:overflow-y-auto custom-scrollbar pr-4">
                              {project.recentCommits.map(commit => (
                                <div key={commit.sha} className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200/50 dark:border-white/5 pb-6 last:border-0 last:pb-0">
                                  <div className="flex-1">
                                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 block mb-2">{commit.sha.substring(0, 7)}</span>
                                    <span className="text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed block">{commit.commit?.message?.split('\n')[0]}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 whitespace-nowrap mt-1 shrink-0 bg-white/50 dark:bg-white/5 px-2 py-1 rounded-md">{new Date(commit.commit?.author?.date).toLocaleDateString()}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400 italic">No public commits available.</span>
                          )}
                        </div>
                     </div>
                  </div>
               </ScrollReveal>
            ))}
          </div>

          {/* Show More / Show Less */}
          {sortedProjects.length > 6 && (
            <div className="text-center mt-16">
              <button 
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-4 bg-slate-900/10 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 backdrop-blur-md text-slate-900 dark:text-white border border-slate-900/20 dark:border-white/20 font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-1"
              >
                {showAll ? `Show Less ↑` : `Show More (${sortedProjects.length - 6} more) ↓`}
              </button>
            </div>
          )}
        </section>

        {/* 5. Experience */}
        <section id="experience" className="bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-12 md:p-16 rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600"></span> 04. Experience & Learning
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
               {[
                 { year: "Present", role: "Software Developer Trainee", company: "Agasthya Solutions", desc: "Refining craftsmanship through real-world system architecture, integrating modern tech-stacks into business solutions." },
                 { year: "2023 - Present", role: "Open Source Contributor", company: "GitHub Ecosystem", desc: "Started deeply contributing to robust open-source projects on GitHub, learning complex pull requests, merges, and systemic refactoring." },
                 { year: "2021 - 2024", role: "Engineering Diploma", company: "Andhra Polytechnic Kakinada", desc: "Formalizing computer science fundamentals traversing algorithms, databases, Android application mapping, and core logic." },
               ].map((item, i) => (
                 <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/60 dark:border-neutral-600 bg-white/80 dark:bg-neutral-800 backdrop-blur-xl shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-slate-600 dark:text-neutral-400 font-bold text-xs ring-4 ring-slate-50 dark:ring-[#030712]">
                      {i + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                       <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold bg-white/50 dark:bg-white/10 px-3 py-1 rounded-full border border-white/40 dark:border-white/5">{item.year}</span>
                       <h3 className="font-bold text-slate-900 dark:text-white text-2xl mt-6 mb-2">{item.role}</h3>
                       <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-4">{item.company}</span>
                       <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
             </div>
          </ScrollReveal>
        </section>

        {/* 6. Achievements */}
        <section id="achievements" className="bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/60 dark:border-white/10 p-12 md:p-16 rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          <ScrollReveal animation="fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-400 dark:bg-slate-600"></span> 05. Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/50 dark:bg-black/40 border border-white/50 dark:border-white/5 p-10 rounded-[2rem] flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500">
                  <span className="text-5xl mb-6 block drop-shadow-lg">🏆</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Technical Certification</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Completed advanced certifications displaying mastery over core computer science and web topologies.</p>
               </div>
               <div className="bg-white/50 dark:bg-black/40 border border-white/50 dark:border-white/5 p-10 rounded-[2rem] flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500">
                  <span className="text-5xl mb-6 block drop-shadow-lg">🚀</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Hackathon Frameworks</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Actively engaging in intense build sessions to translate theoretical algorithms into functional apps.</p>
               </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. Contact */}
        <section id="contact" className="bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-900 dark:to-purple-900 rounded-[4rem] p-16 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <ScrollReveal animation="fade-up" className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Let's Build.</h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to collaborate on something amazing, my inbox is open.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
               <a href="mailto:nalliakshaykumar@gmail.com" className="px-10 py-5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-2xl w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-lg">
                 Say Hello
               </a>
               <button className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl w-full sm:w-auto transition-all hover:-translate-y-1 text-lg">
                 Download Resume 📄
               </button>
            </div>
            
            <div className="flex justify-center gap-12 mt-24 pt-12 border-t border-white/20">
               <a href="https://github.com/Akshay-86" className="font-mono text-xs tracking-widest text-white/60 hover:text-white transition-colors uppercase">GitHub</a>
               <a href="https://www.linkedin.com/in/nalliakshaykumar/" className="font-mono text-xs tracking-widest text-white/60 hover:text-white transition-colors uppercase">LinkedIn</a>
               <a href="https://www.instagram.com/mr_mirk_rex" className="font-mono text-xs tracking-widest text-white/60 hover:text-white transition-colors uppercase">Instagram</a>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
