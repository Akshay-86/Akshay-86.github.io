"use client";

import { useState } from "react";

export default function VSCodeUI({ publicProjects, privateProjects }) {
  const [activeFile, setActiveFile] = useState("about.md");

  // VS Code color palette
  const colors = {
    activityBar: "#333333",
    sidebar: "#252526",
    editor: "#1e1e1e",
    textData: "#d4d4d4",
    textKeyword: "#569cd6",
    textString: "#ce9178",
    textFunction: "#dcdcaa",
    textClass: "#4ec9b0",
    textComment: "#6a9955",
    border: "#3c3c3c",
    activeTab: "#1e1e1e",
    inactiveTab: "#2d2d2d"
  };

  const renderContent = () => {
    switch (activeFile) {
      case "about.md":
        return (
          <div className="font-mono text-sm leading-relaxed whitespace-pre" style={{ color: colors.textData }}>
            <span style={{ color: colors.textKeyword }}>#</span> Akshay - Software Developer{"\n\n"}
            <span style={{ color: colors.textKeyword }}>##</span> About Me{"\n\n"}
            I am Akshay, a 3rd-year diploma student passionate about software development.{"\n"}
            I have experience building Android applications using Java and am currently{"\n"}
            building a highly complex, context-aware Meta-Portfolio OS.
          </div>
        );

      case "skills.json":
        return (
          <div className="font-mono text-sm leading-relaxed whitespace-pre">
            <span style={{ color: colors.textData }}>{"{"}</span>{"\n"}
            {"  "}<span style={{ color: colors.textKeyword }}>"languages"</span>: <span style={{ color: colors.textData }}>[</span>
            {"\n    "}<span style={{ color: colors.textString }}>"Java"</span>,
            {"\n    "}<span style={{ color: colors.textString }}>"HTML/CSS"</span>,
            {"\n    "}<span style={{ color: colors.textString }}>"JavaScript"</span>,
            {"\n    "}<span style={{ color: colors.textString }}>"PHP"</span>
            {"\n  "}<span style={{ color: colors.textData }}>],</span>{"\n"}
            {"  "}<span style={{ color: colors.textKeyword }}>"frameworksAndTools"</span>: <span style={{ color: colors.textData }}>[</span>
            {"\n    "}<span style={{ color: colors.textString }}>"Android Studio"</span>,
            {"\n    "}<span style={{ color: colors.textString }}>"Next.js"</span>,
            {"\n    "}<span style={{ color: colors.textString }}>"Git"</span>
            {"\n  "}<span style={{ color: colors.textData }}>]</span>{"\n"}
            <span style={{ color: colors.textData }}>{"}"}</span>
          </div>
        );

      case "projects.js":
        return (
          <div className="font-mono text-sm leading-relaxed whitespace-pre">
            <span style={{ color: colors.textComment }}>// Fetching live data from GitHub API...</span>{"\n\n"}
            <span style={{ color: colors.textKeyword }}>export const</span> <span style={{ color: colors.textClass }}>PublicProjects</span> <span style={{ color: colors.textData }}>=</span> <span style={{ color: colors.textData }}>[</span>
            {publicProjects?.map((pkg, i) => (
              <div key={pkg.id} className="ml-4">
                <span style={{ color: colors.textData }}>{"{"}</span>{"\n"}
                {"  "}<span style={{ color: colors.textData }}>name:</span> <span style={{ color: colors.textString }}>"{pkg.name}"</span>,<span style={{ color: colors.textComment }}> // ⭐️ {pkg.stargazers_count}</span>{"\n"}
                {"  "}<span style={{ color: colors.textData }}>lang:</span> <span style={{ color: colors.textString }}>"{pkg.language || 'Mixed'}"</span>,{"\n"}
                {"  "}<span style={{ color: colors.textData }}>desc:</span> <span style={{ color: colors.textString }}>"{pkg.description ? pkg.description.substring(0, 50) + '...' : 'No description'}"</span>,{"\n"}
                {"  "}<span style={{ color: colors.textData }}>url:</span>  <span style={{ color: colors.textString }}>"{pkg.html_url}"</span>{"\n"}
                <span style={{ color: colors.textData }}>{"}"}{i < publicProjects.length - 1 ? "," : ""}</span>
              </div>
            ))}
            <span style={{ color: colors.textData }}>];</span>{"\n\n"}

            <span style={{ color: colors.textKeyword }}>export const</span> <span style={{ color: colors.textClass }}>PrivateProjects</span> <span style={{ color: colors.textData }}>=</span> <span style={{ color: colors.textData }}>[</span>
            {privateProjects?.map((pkg, i) => (
              <div key={pkg.id} className="ml-4">
                <span style={{ color: colors.textData }}>{"{"}</span>{"\n"}
                {"  "}<span style={{ color: colors.textData }}>name:</span> <span style={{ color: colors.textString }}>"{pkg.name}"</span>,<span style={{ color: colors.textComment }}> // 🔒 PRIVATE</span>{"\n"}
                {"  "}<span style={{ color: colors.textData }}>lang:</span> <span style={{ color: colors.textString }}>"{pkg.language || 'Mixed'}"</span>,{"\n"}
                {"  "}<span style={{ color: colors.textData }}>desc:</span> <span style={{ color: colors.textString }}>"{pkg.description ? pkg.description.substring(0, 50) + '...' : 'Classified'}"</span>{"\n"}
                <span style={{ color: colors.textData }}>{"}"}{i < privateProjects.length - 1 ? "," : ""}</span>
              </div>
            ))}
            {(!privateProjects || privateProjects.length === 0) && (
              <span className="ml-4" style={{ color: colors.textComment }}>  // No private repos found. Did you set GITHUB_TOKEN?</span>
            )}
            {"\n"}<span style={{ color: colors.textData }}>];</span>
          </div>
        );

      default:
        return null;
    }
  };

  const getFileIcon = (filename) => {
    if (filename.endsWith('.js')) return <span className="text-yellow-400 font-bold">JS</span>;
    if (filename.endsWith('.json')) return <span className="text-blue-400 font-bold">{"{}"}</span>;
    if (filename.endsWith('.md')) return <span className="text-blue-300 font-bold">M↓</span>;
    return "📄";
  };

  return (
    <div className="flex h-screen w-full font-sans select-none overflow-hidden" style={{ background: colors.editor, color: colors.textData }}>
      {/* Activity Bar (Leftmost thin strip) */}
      <div className="w-12 flex flex-col items-center py-4 gap-6" style={{ background: colors.activityBar }}>
        <div className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer text-white opacity-80 hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" /></svg>
        </div>
        <div className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer text-white opacity-40 hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        </div>
        <div className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer text-white opacity-40 hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M2.55,10L14.05,2.5L21.45,7.3L15.35,11.3V18L9.25,14.1V10L2.55,10Z" /></svg>
        </div>
      </div>

      {/* Explorer Sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col border-r" style={{ background: colors.sidebar, borderColor: colors.border }}>
        <div className="uppercase text-xs p-4 tracking-wider" style={{ color: "#999" }}>Explorer</div>
        <div className="px-2 pb-1 text-sm font-bold opacity-90 flex items-center gap-1 cursor-pointer">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
          PORTFOLIO-OS
        </div>
        <div className="flex flex-col text-sm mt-1">
          {["about.md", "skills.json", "projects.js"].map((file) => (
            <div 
              key={file}
              onClick={() => setActiveFile(file)}
              className="flex items-center gap-2 px-8 py-1 cursor-pointer hover:bg-white/5 transition-colors"
              style={{ background: activeFile === file ? 'rgba(255,255,255,0.1)' : 'transparent', color: activeFile === file ? 'white' : colors.textData }}
            >
              {getFileIcon(file)}
              <span className={activeFile === file ? "font-medium" : ""}>{file}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor Tabs */}
        <div className="flex overflow-x-auto border-b" style={{ background: colors.sidebar, borderColor: colors.border }}>
          {["about.md", "skills.json", "projects.js"].map((file) => (
            <div 
              key={file}
              onClick={() => setActiveFile(file)}
              className="flex items-center gap-2 px-4 py-2 text-sm border-r cursor-pointer min-w-32"
              style={{ 
                background: activeFile === file ? colors.activeTab : colors.inactiveTab, 
                borderColor: colors.border,
                borderTop: activeFile === file ? '2px solid #569cd6' : '2px solid transparent',
                color: activeFile === file ? 'white' : 'gray'
              }}
            >
              {getFileIcon(file)}
              {file}
              {activeFile === file && <button className="ml-auto hover:bg-white/10 rounded p-1"><svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></button>}
            </div>
          ))}
        </div>

        {/* Editor Breadcrumbs */}
        <div className="flex items-center px-4 py-1 text-xs border-b" style={{ borderColor: colors.border, color: '#999' }}>
          portfolio-os <span className="mx-1">{'>'}</span> src <span className="mx-1">{'>'}</span> {activeFile}
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto p-4 custom-scrollbar flex">
          {/* Line Numbers */}
          <div className="text-right pr-4 select-none opacity-30 font-mono text-sm leading-relaxed" style={{ color: colors.textData }}>
            {Array.from({length: 30}).map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          {/* Code Render */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-6 flex items-center px-3 text-xs text-white" style={{ background: '#007acc' }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17,21L14.6,18.6L16,17.2L17.65,18.84L21.4,15.1L22.8,16.5L17,21M13,2C14.11,2 15,2.9 15,4C15,4.86 14.45,5.6 13.68,5.88L14.24,10.37C15.11,10.74 15.75,11.58 15.93,12.59H18.5V9.5L22.5,13.5L18.5,17.5V14.5H15.93C15.75,15.5 15.11,16.34 14.24,16.71L13.68,21.2C14.45,21.47 15,22.21 15,23.1C15,24.2 14.11,25.1 13,25.1C11.9,25.1 11,24.2 11,23.1C11,22.21 11.55,21.47 12.32,21.2L11.76,16.71C10.89,16.34 10.25,15.5 10.07,14.5H7.5V17.5L3.5,13.5L7.5,9.5V12.5H10.07C10.25,11.58 10.89,10.74 11.76,10.37L12.32,5.88C11.55,5.6 11,4.86 11,4C11,2.9 11.9,2 13,2M13,3.5C12.72,3.5 12.5,3.72 12.5,4C12.5,4.28 12.72,4.5 13,4.5C13.28,4.5 13.5,4.28 13.5,4C13.5,3.72 13.28,3.5 13,3.5M13,11.5C12.17,11.5 11.5,12.17 11.5,13C11.5,13.83 12.17,14.5 13,14.5C13.83,14.5 14.5,13.83 14.5,13C14.5,12.17 13.83,11.5 13,11.5M13,22.6C13.28,22.6 13.5,22.38 13.5,22.1C13.5,21.82 13.28,21.6 13,21.6C12.72,21.6 12.5,21.82 12.5,22.1C12.5,22.38 12.72,22.6 13,22.6Z" /></svg>
            main*
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,7V13L16.25,16.15L17,14.92L12.5,12.25V7H11Z" /></svg>
            0
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 ml-2"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
            0
          </span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">Ln 14, Col 23</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">UTF-8</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">Portfolio OS</span>
        </div>
      </div>
    </div>
  );
}
