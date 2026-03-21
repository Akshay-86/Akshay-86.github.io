"use client";

import React from "react";

export default function GitHubUI({ publicProjects, privateProjects }) {
  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: "#f1e05a",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      PHP: "#4F5D95",
      TypeScript: "#3178c6"
    };
    return colors[lang] || "#8b949e";
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#1f6feb] selection:text-white">
      {/* GitHub Header */}
      <header className="px-6 py-4 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 16 16" fill="white" className="w-8 h-8 hover:fill-gray-400 cursor-pointer transition-colors">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search or jump to..." 
              className="bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:border-[#58a6ff] transition-colors"
            />
            <span className="absolute right-2 top-1.5 text-xs text-[#8b949e] border border-[#30363d] rounded px-1">/</span>
          </div>
          <nav className="text-sm font-semibold flex gap-4 hidden md:flex hover:[&>a]:text-white transition-colors">
            <a href="#" className="text-white">Pull requests</a>
            <a href="#">Issues</a>
            <a href="#">Codespaces</a>
            <a href="#">Marketplace</a>
            <a href="#">Explore</a>
          </nav>
        </div>
      </header>

      {/* GitHub Sub-navigation (Overview, Repositories, etc) */}
      <div className="sticky top-[65px] bg-[#0d1117] border-b border-[#30363d] z-40 hidden md:block pt-6">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex gap-8">
          <div className="w-1/4"></div> {/* Spacer for sidebar layout align */}
          <nav className="flex-1 flex gap-4 text-sm">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-transparent hover:border-[#8b949e] cursor-pointer transition-colors text-[#c9d1d9] hover:text-white">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#8b949e]"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0zM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z"></path></svg>
              Overview
            </div>
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#f78166] font-semibold text-white cursor-pointer transition-colors">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#8b949e]"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
              Repositories
              <span className="bg-[#30363d] text-xs py-0.5 px-2 rounded-full">{allProjects.length}</span>
            </div>
            <div className="flex items-center gap-2 pb-3 border-b-2 border-transparent hover:border-[#8b949e] cursor-pointer transition-colors text-[#c9d1d9] hover:text-white">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#8b949e]"><path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-8.25.75a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0Z"></path></svg>
              Projects
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar (Profile) - Sticky Desktop */}
        <div className="w-full md:w-1/4 shrink-0">
          <div className="md:sticky md:top-[140px] flex flex-col items-center md:items-start">
            
            {/* Avatar */}
            <div className="w-64 h-64 md:w-full md:h-auto aspect-square rounded-full border border-[#30363d] overflow-hidden mb-4 bg-gradient-to-br from-[#238636] to-[#2ea043] flex items-center justify-center relative shadow-2xl">
              <span className="text-8xl font-bold text-white opacity-80 shadow-sm" style={{textShadow: "0 2px 10px rgba(0,0,0,0.5)"}}>A</span>
            </div>

            <h1 className="text-2xl font-bold text-[#c9d1d9] leading-tight">Akshay</h1>
            <h2 className="text-xl font-light text-[#8b949e] mb-4">Akshay-86</h2>

            <button className="w-full bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] text-[#c9d1d9] font-medium py-1.5 px-4 rounded-md transition-colors mb-4 text-sm shadow-sm">
              Follow
            </button>

            <p className="text-[#c9d1d9] mb-4 leading-relaxed text-sm">
              3rd-year diploma student passionate about software development. Building Android apps & exploring Next.js.
            </p>

            <div className="flex items-center gap-1 text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors cursor-pointer mb-6">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5zM11 4a.75.75 0 1 0 0 1.5 1.5 1.5 0 0 1 .666 2.844.75.75 0 0 0-.416.672v.352a.75.75 0 0 0 .574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 1 0 1.434-.44 5.01 5.01 0 0 0-2.56-3.012A3 3 0 0 0 11 4z"></path></svg>
              <span className="font-semibold text-[#c9d1d9]">14</span> followers
              <span>·</span>
              <span className="font-semibold text-[#c9d1d9]">22</span> following
            </div>

            <div className="w-full border-t border-[#30363d] pt-4 mt-2">
              <h3 className="text-sm font-semibold mb-2 text-[#c9d1d9]">Achievements</h3>
              <div className="flex gap-2">
                <img src="https://github.githubassets.com/images/modules/profile/badge--acv-64.png" alt="Arctic Code Vault Contributor" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
                <img src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" alt="Pull Shark" className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>

            <div className="w-full border-t border-[#30363d] pt-4 mt-4">
              <h3 className="text-sm font-semibold mb-2 text-[#c9d1d9]">Organizations</h3>
              <div className="w-8 h-8 rounded-sm bg-[#58a6ff]/20 flex items-center justify-center font-bold text-[#58a6ff] cursor-pointer hover:bg-[#58a6ff]/30 transition-colors">OS</div>
            </div>
          </div>
        </div>

        {/* Right Content (Scrollable Repositories List) */}
        <div className="flex-1 w-full pb-32">
          
          {/* Find a repository Filter */}
          <div className="flex gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Find a repository..." 
              className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
            />
            <button className="bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] text-[#c9d1d9] font-medium py-1.5 px-4 rounded-md text-sm shadow-sm transition-colors hidden sm:block">
              Type
            </button>
            <button className="bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] text-[#c9d1d9] font-medium py-1.5 px-4 rounded-md text-sm shadow-sm transition-colors hidden sm:block">
              Language
            </button>
            <button className="bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/20 text-white font-medium py-1.5 px-4 rounded-md text-sm shadow-sm transition-colors flex items-center gap-2">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2z"></path></svg>
              New
            </button>
          </div>

          <div className="w-full h-[1px] bg-[#30363d] mb-6"></div>

          {/* Repo List */}
          <div className="flex flex-col">
            {allProjects.length === 0 && (
              <div className="text-center py-10 border border-dashed border-[#30363d] rounded-md">
                <h3 className="text-lg font-semibold">No repositories found.</h3>
                <p className="text-[#8b949e] text-sm mt-1">Check your API connection or tokens.</p>
              </div>
            )}
            
            {allProjects.map(repo => (
              <div key={repo.id} className="py-6 border-b border-[#30363d] flex justify-between gap-4 group">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <a href={repo.html_url || '#'} target="_blank" rel="noreferrer" className="text-xl font-semibold text-[#58a6ff] hover:underline break-all">
                      {repo.name}
                    </a>
                    <span className="border border-[#30363d] rounded-full px-2 py-0.5 text-xs text-[#8b949e] font-medium tracking-wide">
                      {repo.private ? "Private" : "Public"}
                    </span>
                  </div>
                  
                  {repo.description && (
                    <p className="text-[#8b949e] text-sm mb-4 leading-relaxed max-w-2xl pr-4">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-[#8b949e] mt-2">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <a href="#" className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"></path></svg>
                        {repo.stargazers_count}
                      </a>
                    )}
                    <span>Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 hidden sm:flex">
                  <div className="bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] text-[#c9d1d9] py-1 px-3 rounded-md text-xs font-medium shadow-sm flex items-center gap-2 cursor-pointer transition-colors group-hover:border-[#8b949e]">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#8b949e]"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"></path></svg>
                    Star
                    <div className="border-l border-[#363b42] pl-2 -mr-1 py-1 h-3 flex items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M3.5 5.5l4.5 4.5 4.5-4.5"></path></svg>
                    </div>
                  </div>
                  
                  {/* Fake contribution graph block to fill space */}
                  <div className="mt-8 opacity-20 hover:opacity-100 transition-opacity">
                    <svg width="155" height="30" viewBox="0 0 155 30">
                      <g fill="none" fillRule="evenodd" transform="translate(0, 3)">
                        <path stroke="#1f6feb" strokeWidth="2" d="M0,25 Q10,5 20,20 T40,15 T60,25 T80,10 T100,20 T120,5 T155,15" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
