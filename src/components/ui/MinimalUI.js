"use client";

import React, { useState } from "react";
import ScrollReveal from "../ScrollReveal";

export default function MinimalUI({ publicProjects, privateProjects, controls }) {
  const { themeMode, setThemeMode, currentStyle, setCurrentStyle } = controls || {};
  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];
  const sortedProjects = allProjects.sort((a,b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const NAV = ["about", "skills", "projects", "experience", "achievements", "contact"];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false); };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-neutral-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black pb-32 transition-colors duration-500">
      
      {/* Minimal Nav */}
      <nav className="sticky top-0 z-50 bg-slate-50/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-neutral-800/50">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-12">
          <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">A<span className="text-blue-500">.</span></span>
          <div className="hidden md:flex items-center gap-6">
            {NAV.map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-[11px] uppercase tracking-widest font-medium text-slate-400 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white transition-colors">{id}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setThemeMode?.(themeMode === "dark" ? "light" : "dark")} className="w-7 h-7 flex items-center justify-center rounded-md text-xs text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors" title="Toggle theme">
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
            <select value={currentStyle} onChange={(e) => setCurrentStyle?.(e.target.value)} className="bg-transparent text-[10px] uppercase tracking-widest font-medium text-slate-400 dark:text-neutral-500 outline-none cursor-pointer border-none">
              <option value="minimal">Minimal</option>
              <option value="bento">Bento</option>
              <option value="glass">Glass</option>
              <option value="cyber">Cyber</option>
              <option value="terminal">Terminal</option>
            </select>
            {/* Hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-7 h-7 flex flex-col items-center justify-center gap-1 rounded-md hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors">
              <span className={`block w-3.5 h-0.5 bg-slate-500 dark:bg-neutral-400 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
              <span className={`block w-3.5 h-0.5 bg-slate-500 dark:bg-neutral-400 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
            </button>
          </div>
        </div>
        {/* Mobile dropdown */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-slate-50/95 dark:bg-[#030712]/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-neutral-800/50 px-6 py-3 flex flex-col gap-1">
            {NAV.map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-2 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">{id}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* 1. Hero / Introduction */}
      <section id="hero" className="max-w-4xl mx-auto px-6 min-h-[85vh] flex flex-col justify-center pt-16">
        <ScrollReveal animation="fade-right" delay={100}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none text-slate-900 dark:text-white">
            Akshay.
          </h1>
        </ScrollReveal>
        <ScrollReveal animation="fade-left" delay={200}>
          <h2 className="text-2xl md:text-3xl font-light text-slate-600 dark:text-neutral-400 mb-6">
            Computer Engineering Student <span className="text-slate-300 dark:text-neutral-700 mx-2">|</span> Full-Stack Developer
          </h2>
          <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-neutral-300 max-w-2xl leading-relaxed mb-12">
            I build simple, efficient, and highly scalable web applications.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
              View Projects
            </button>
            <button className="px-8 py-3 bg-white dark:bg-neutral-900 text-slate-900 dark:text-white font-bold rounded-lg border border-slate-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
              Contact Me
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. About Me */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-8">01. About Me</h2>
          <div className="text-xl md:text-2xl font-light leading-relaxed text-slate-600 dark:text-neutral-400 space-y-6">
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
      <section id="skills" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-12">02. Technical Arsenal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { category: "Frontend", tools: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TailwindCSS"] },
              { category: "Backend", tools: ["Java", "Node.js", "NextJS API"] },
              { category: "Database", tools: ["MySQL", "MongoDB", "PostgreSQL"] },
              { category: "Tools", tools: ["Git", "GitHub", "Android Studio"] },
            ].map((skillset, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-neutral-800 pb-2">{skillset.category}</h3>
                <ul className="flex flex-col gap-3">
                  {skillset.tools.map(tool => (
                    <li key={tool} className="text-slate-600 dark:text-neutral-400 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-neutral-700 block"></span>
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
      <section id="projects" className="max-w-4xl mx-auto px-6 pt-24 pb-12 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-4">03. Case Studies</h2>
          <p className="text-lg text-slate-500 dark:text-neutral-500 mb-16">Deep dives into architecture, motivation, and authentic commit implementations.</p>
        </ScrollReveal>

        <div className="flex flex-col gap-0">
          {visibleProjects.map((project, idx) => (
            <ScrollReveal key={project.id} animation="fade-up" duration={1000} className="w-full">
              <div className="min-h-[80vh] flex flex-col justify-center py-24 md:py-40 border-b border-slate-200 dark:border-neutral-800 last:border-0 relative">
                 <div className="absolute top-32 left-0 text-[8rem] md:text-[14rem] font-black text-slate-200 dark:text-neutral-900 tracking-tighter -z-10 leading-none pointer-events-none select-none">
                    0{idx + 1}
                 </div>
                 
                 <div className="w-full max-w-2xl relative z-10">
                    <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.isLocal ? (
                        <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full border border-purple-200 dark:border-purple-800/30 uppercase tracking-widest">{(project.localTag || 'local').toUpperCase()}</span>
                      ) : (
                        <>
                          {project.private ? (
                            <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-full border border-red-200 dark:border-red-800/30 uppercase tracking-widest">Private</span>
                          ) : (
                            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800/30 uppercase tracking-widest">Public</span>
                          )}
                          {project.fork && (
                            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full border border-amber-200 dark:border-amber-800/30 uppercase tracking-widest">Fork</span>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-24">
                       <div className="col-span-1 border-l-2 border-slate-200 dark:border-neutral-800 pl-4 md:border-l-0 md:border-t-2 md:pt-4 md:pl-0">
                          <h4 className="text-xs uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-4">Timeline</h4>
                          <p className="text-slate-900 dark:text-neutral-300 font-mono text-sm">
                            {project.isLocal ? (project.startTime || "Ongoing") : new Date(project.created_at || project.updated_at).toLocaleDateString()}
                          </p>
                       </div>
                       
                       <div className="col-span-1 md:col-span-2 border-l-2 border-slate-200 dark:border-neutral-800 pl-4 md:border-l-0 md:border-t-2 md:pt-4 md:pl-0">
                          <h4 className="text-xs uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-4">Motivation</h4>
                          <p className="text-lg text-slate-600 dark:text-neutral-400 leading-relaxed font-light">
                             {project.description || "An exploration of architecture and robust engineering logic."}
                          </p>
                       </div>
                    </div>

                    <div className="mb-12">
                       <h4 className="text-xs uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-8">Major Implementations</h4>
                       {project.recentCommits && Array.isArray(project.recentCommits) && project.recentCommits.length > 0 ? (
                         <div className="flex flex-col gap-4">
                           {project.recentCommits.map((commitData) => (
                             <div key={commitData.sha} className="bg-white dark:bg-neutral-900 px-6 py-4 rounded-xl border border-slate-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 items-start md:items-center hover:border-slate-400 dark:hover:border-neutral-600 transition-colors">
                               <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 shrink-0">{commitData.sha.substring(0, 7)}</span>
                               <p className="text-slate-800 dark:text-neutral-200 font-medium text-sm leading-relaxed flex-1">{commitData.commit?.message?.split('\n')[0]}</p>
                               <span className="text-xs font-mono text-slate-400 dark:text-neutral-500 shrink-0">{new Date(commitData.commit?.author?.date).toLocaleDateString()}</span>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <div className="flex gap-4">
                            <span className="px-4 py-2 bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-300 text-sm font-medium rounded-full">{project.language || "Multi-Language"}</span>
                            {project.private ? (
                              <span className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">Private System</span>
                            ) : (
                              <span className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium rounded-full">Open Source</span>
                            )}
                         </div>
                       )}
                    </div>
                    
                    {project.html_url && (
                       <a href={project.html_url} target="_blank" rel="noreferrer" className="mt-16 inline-flex flex-row items-center text-sm font-bold tracking-widest uppercase text-slate-400 dark:text-neutral-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer group">
                         Access Live Repository <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                       </a>
                    )}
                 </div>
              </div>
            </ScrollReveal>
          ))}
          {sortedProjects.length === 0 && (
            <div className="text-slate-400 dark:text-neutral-600 font-light text-xl">No works archived yet.</div>
          )}
        </div>

        {/* Show More / Show Less */}
        {sortedProjects.length > 6 && (
          <div className="text-center mt-16">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {showAll ? `Show Less ↑` : `Show More (${sortedProjects.length - 6} more) ↓`}
            </button>
          </div>
        )}
      </section>

      {/* 5. Experience / Learning */}
      <section id="experience" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-16">04. Experience & Learning</h2>

          <div className="flex flex-col gap-16">
            {[
              { role: "Software Developer Trainee", company: "Bhairav Robotics", year: "Present", desc: "Refining craftsmanship through real-world system architecture, integrating modern tech-stacks into business solutions." },
              { role: "Open Source Contributor", company: "GitHub Global", year: "2023 — Present", desc: "Started deeply contributing to robust open-source projects on GitHub, learning complex pull requests, merges, and systemic refactoring." },
              { role: "Engineering Diploma", company: "Andhra Polytechnic Kakinada", year: "2021 — 2024", desc: "Formalizing computer science fundamentals traversing algorithms, databases, Android application mapping, and core logic." },
            ].map((job, idx) => (
               <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-12 items-start group">
                 <div className="w-full md:w-1/4 shrink-0 pt-1 border-t-2 border-transparent group-hover:border-slate-300 dark:group-hover:border-neutral-600 transition-colors duration-500">
                   <span className="text-sm font-mono text-slate-400 dark:text-neutral-500 block">{job.year}</span>
                 </div>
                 <div className="flex-1 flex flex-col">
                   <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{job.role}</h3>
                   <span className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-neutral-500 mt-2 mb-4">{job.company}</span>
                   <p className="text-slate-500 dark:text-neutral-400 font-light leading-relaxed text-lg">{job.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Achievements */}
      <section id="achievements" className="max-w-4xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-neutral-800">
        <ScrollReveal animation="fade-up">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-bold mb-12">05. Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-8 rounded-2xl">
                <span className="text-3xl mb-4 block">🏆</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Technical Certification</h3>
                <p className="text-slate-500 dark:text-neutral-400 leading-relaxed text-sm">Completed advanced certifications displaying mastery over core computer science and web topologies.</p>
             </div>
             <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-8 rounded-2xl">
                <span className="text-3xl mb-4 block">🚀</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Hackathon / Builds</h3>
                <p className="text-slate-500 dark:text-neutral-400 leading-relaxed text-sm">Actively engaging in intense build sessions to translate theoretical algorithms into functional apps.</p>
             </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-32 border-t border-slate-200 dark:border-neutral-800 text-center">
        <ScrollReveal animation="fade-up">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-8">Let's Build.</h2>
          <p className="text-xl text-slate-500 dark:text-neutral-400 max-w-xl mx-auto mb-12">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
             <a href="mailto:hello@example.com" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
               Say Hello
             </a>
             <button className="px-8 py-4 bg-slate-100 dark:bg-neutral-900 text-slate-900 dark:text-white border border-slate-200 dark:border-neutral-800 font-bold rounded-full w-full sm:w-auto hover:bg-slate-200 dark:hover:bg-neutral-800 transition-all">
               Download Resume 📄
             </button>
          </div>
          
          <div className="flex justify-center gap-8 mt-16 pt-8 border-t border-slate-200 dark:border-neutral-800">
             <a href="https://github.com/Akshay-86" className="font-mono text-sm tracking-widest text-slate-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase">GitHub</a>
             <a href="https://www.linkedin.com/in/nalliakshaykumar/" className="font-mono text-sm tracking-widest text-slate-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase">LinkedIn</a>
             <a href="https://www.instagram.com/mr_mirk_rex" className="font-mono text-sm tracking-widest text-slate-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase">Instagram</a>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
