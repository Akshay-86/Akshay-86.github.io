"use client";

import React, { useState } from "react";
import ScrollReveal from "../ScrollReveal";

export default function BentoUI({ publicProjects, privateProjects }) {
  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];
  const featuredProjects = allProjects.sort((a,b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-black text-slate-900 dark:text-neutral-200 font-sans p-4 md:p-8 transition-colors duration-500 pb-32">
      
      <div className="max-w-6xl mx-auto flex flex-col gap-8 mt-16">
        
        {/* SECTION 1 & 2 & 3: HERO, ABOUT, SKILLS (BENTO GRID FORMAT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Hero / Intro (Large Block) */}
          <ScrollReveal animation="fade-up" delay={100} className="md:col-span-2 lg:col-span-2 row-span-2">
            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-200 dark:border-blue-800/50">Computer Engineering Student</span>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">Akshay.</h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-neutral-400 font-light leading-relaxed">
                  I build simple, efficient, and highly scalable web applications pushing modern UI boundaries.
                </p>
              </div>
              <div className="mt-12 flex gap-4">
                <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform" onClick={() => window.scrollTo({top: document.getElementById('projects').offsetTop, behavior: 'smooth'})}>
                  View Projects
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* About Me (Medium Block) */}
          <ScrollReveal animation="fade-up" delay={200} className="md:col-span-1 lg:col-span-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-900 p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-center text-white shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <h2 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
                <span className="text-2xl">⚡</span> The Mindset
              </h2>
              <p className="text-white/90 text-lg leading-relaxed relative z-10 font-medium">
                I enjoy building systems that solve real problems instead of just following massive tutorials. My absolute focus lies at the intersection of frontend performance and scalable backend architecture.
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Quick Link (Small Block) */}
          <ScrollReveal animation="fade-up" delay={300} className="md:col-span-1 lg:col-span-1">
            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 rounded-[2rem] h-full flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => window.scrollTo({top: document.getElementById('contact').offsetTop, behavior: 'smooth'})}>
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                📬
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Let's Connect</h3>
              <span className="text-slate-500 dark:text-neutral-500 text-sm mt-2 font-medium">Drop a message</span>
            </div>
          </ScrollReveal>

          {/* Skills (Medium Block) */}
          <ScrollReveal animation="fade-up" delay={400} className="md:col-span-2 lg:col-span-1">
            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 rounded-[2rem] h-full shadow-sm hover:shadow-md transition-shadow">
              <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Technical Toolkit
              </h2>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TailwindCSS", "Java", "Node.js", "Git", "MySQL", "Android Studio"].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-100 dark:bg-[#222] text-slate-700 dark:text-neutral-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-neutral-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* SECTION 4: PROJECTS (Cinematic List within Bento Container) */}
        <div id="projects" className="mt-16">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8 ml-4">Featured Case Studies</h2>
          </ScrollReveal>
          
          <div className="flex flex-col gap-6">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="fade-up" delay={50 * idx} duration={800} className="w-full">
                <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                    
                    {/* Project Meta */}
                    <div className="w-full md:w-1/3 shrink-0">
                      <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-[#222] text-slate-600 dark:text-neutral-400 tracking-widest text-[10px] font-bold uppercase rounded-md mb-6 border border-slate-200 dark:border-neutral-800">Archive 0{idx+1}</span>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">{project.name}</h3>
                      <p className="text-slate-600 dark:text-neutral-400 leading-relaxed mb-6 font-medium">
                        {project.description || "Core infrastructure exploration module."}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-8">
                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-lg text-xs font-bold border border-indigo-100 dark:border-indigo-800/30">
                          {project.language || "Multi-Language"}
                        </span>
                        <span className="px-3 py-1 bg-slate-50 dark:bg-[#1a1a1a] text-slate-500 dark:text-neutral-500 font-mono rounded-lg text-xs font-bold border border-slate-200 dark:border-neutral-800">
                          ★ {project.stargazers_count || 0}
                        </span>
                      </div>

                      {project.html_url && (
                        <a href={project.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-neutral-200 transition-colors">
                          View Live Repository
                        </a>
                      )}
                    </div>
                    
                    {/* Project Commits Detail */}
                    <div className="w-full md:w-2/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-neutral-800 pt-8 md:pt-0 md:pl-8 lg:pl-16">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="text-xl">⚙️</span> Major Implementations
                      </h4>
                      
                      <div className="bg-slate-50 dark:bg-[#0a0a0a] rounded-2xl p-6 border border-slate-200 dark:border-neutral-800/50">
                        {project.recentCommits && Array.isArray(project.recentCommits) && project.recentCommits.length > 0 ? (
                          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {project.recentCommits.map(commit => (
                              <div key={commit.sha} className="flex flex-col gap-2 border-b border-slate-200/50 dark:border-neutral-800/50 pb-4 last:border-b-0 last:pb-0">
                                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">{commit.sha.substring(0, 7)} <span className="text-slate-400 dark:text-neutral-600 mx-2">|</span> {new Date(commit.commit?.author?.date).toLocaleDateString()}</span>
                                <span className="text-sm text-slate-800 dark:text-neutral-300 font-medium leading-relaxed">{commit.commit?.message?.split('\n')[0]}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-slate-500 dark:text-neutral-500 italic flex items-center justify-center h-24">
                            Log data archived or unavailable.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* SECTION 5 & 6: EXPERIENCE & ACHIEVEMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          
          {/* Experience */}
          <ScrollReveal animation="fade-up" className="w-full">
            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] h-full shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                <span className="text-3xl">🚀</span> Experience Journey
              </h2>
              <div className="flex flex-col gap-8">
                {[
                  { title: "Software Developer Trainee", org: "Agasthya Solutions", time: "Present" },
                  { title: "Open Source Contributor", org: "GitHub Ecosystem", time: "2023 - Present" },
                  { title: "Computer Engineering Diploma", org: "Andhra Polytechnic", time: "2021 - 2024" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#222] border border-slate-200 dark:border-neutral-700 flex items-center justify-center text-slate-500 dark:text-neutral-400 font-bold shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h3>
                      <p className="text-slate-500 dark:text-neutral-400 font-medium text-sm mt-1">{item.org} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Achievements */}
          <ScrollReveal animation="fade-up" delay={200} className="w-full">
            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2rem] h-full shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                <span className="text-3xl">🏆</span> Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-xl text-amber-600 dark:text-amber-400 text-xl">🥇</div>
                  <div>
                    <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">Certifications</h3>
                    <p className="text-amber-700/80 dark:text-amber-200/60 text-sm font-medium">Advanced full-stack mastery certificates via massive rigorous courses.</p>
                  </div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-6 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl text-emerald-600 dark:text-emerald-400 text-xl">💡</div>
                  <div>
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-1">Hackathons</h3>
                    <p className="text-emerald-700/80 dark:text-emerald-200/60 text-sm font-medium">Translating raw logic into viable interactive systems rapidly under limits.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* SECTION 7: CONTACT / OUTRO */}
        <ScrollReveal id="contact" animation="fade-up" className="mt-16">
          <div className="bg-slate-900 dark:bg-neutral-900 p-12 md:p-24 rounded-[3rem] text-center text-white relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full"></div>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 relative z-10">Ready to build?</h2>
            <p className="text-xl text-slate-400 font-medium max-w-lg mb-12 relative z-10">Whether you need help architecting a Next.js system or just want to collaborate, I am currently available.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <a href="mailto:hello@example.com" className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl shadow-xl hover:-translate-y-1 transition-all">
                Send an Email
              </a>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl backdrop-blur-md transition-all">
                Download Resume 📄
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
