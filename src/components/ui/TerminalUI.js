"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

export default function TerminalUI({ publicProjects, privateProjects, controls }) {
  const { themeMode, setThemeMode, currentStyle, setCurrentStyle } = controls || {};
  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];
  
  const [history, setHistory] = useState([
    { type: "system", content: "Welcome to Portfolio OS v1.0.0" },
    { type: "system", content: "Type 'help' to see a list of available commands." },
  ]);
  const [inputDir, setInputDir] = useState("~");
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [shouldScroll, setShouldScroll] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const STYLES = ["minimal", "bento", "glass", "cyber", "terminal"];
  const ALL_COMMANDS = [
    "help", "clear", "whoami", "date", "ls", "cd", "cat",
    "about", "skills", "experience", "achievements", "contact",
    "projects", "fetch", "theme", "style"
  ];
  const CAT_FILES = ["about.txt", "skills.json", "experience.log", "achievements.dat", "contact.cfg"];
  const CD_DIRS = ["~", "projects", ".."];

  // Only scroll when a new command is entered, not on text selection
  useEffect(() => {
    if (shouldScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  // Find closest matching command (Levenshtein-like)
  const findSuggestion = useCallback((input) => {
    const cmd = input.toLowerCase();
    if (cmd.length < 2) return null;
    
    // Check prefix match first
    const prefixMatches = ALL_COMMANDS.filter(c => c.startsWith(cmd));
    if (prefixMatches.length === 1) return prefixMatches[0];
    
    // Simple edit distance: find commands within 2 edits
    let bestMatch = null;
    let bestScore = Infinity;
    
    for (const command of ALL_COMMANDS) {
      const dist = levenshtein(cmd, command);
      if (dist <= 2 && dist < bestScore) {
        bestScore = dist;
        bestMatch = command;
      }
    }
    return bestMatch;
  }, []);

  // Levenshtein distance
  const levenshtein = (a, b) => {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = a[i-1] === b[j-1]
          ? matrix[i-1][j-1]
          : 1 + Math.min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]);
      }
    }
    return matrix[a.length][b.length];
  };

  // Tab autocomplete
  const handleTabComplete = (currentInput) => {
    const parts = currentInput.trim().split(" ");
    
    if (parts.length === 1) {
      // Complete command name
      const partial = parts[0].toLowerCase();
      if (!partial) return currentInput;
      const matches = ALL_COMMANDS.filter(c => c.startsWith(partial));
      if (matches.length === 1) return matches[0];
      if (matches.length > 1) {
        // Show all possibilities as output, return input unchanged
        setHistory(prev => [...prev, 
          { type: "output", content: (
            <div className="flex flex-wrap gap-3">
              {matches.map(m => <span key={m} className="text-blue-400 dark:text-blue-300">{m}</span>)}
            </div>
          )}
        ]);
        setShouldScroll(true);
        return currentInput;
      }
      return currentInput;
    }
    
    if (parts.length === 2) {
      const cmd = parts[0].toLowerCase();
      const partial = parts[1].toLowerCase();
      
      if (cmd === "cat") {
        const matches = CAT_FILES.filter(f => f.startsWith(partial));
        if (matches.length === 1) return `${cmd} ${matches[0]}`;
        if (matches.length > 1) {
          setHistory(prev => [...prev,
            { type: "output", content: (
              <div className="flex flex-wrap gap-3">
                {matches.map(m => <span key={m} className="text-blue-400 dark:text-blue-300">{m}</span>)}
              </div>
            )}
          ]);
          setShouldScroll(true);
        }
        return currentInput;
      }
      
      if (cmd === "cd") {
        const matches = CD_DIRS.filter(d => d.startsWith(partial));
        if (matches.length === 1) return `${cmd} ${matches[0]}`;
        return currentInput;
      }
      
      if (cmd === "theme") {
        const opts = ["dark", "light"];
        const matches = opts.filter(o => o.startsWith(partial));
        if (matches.length === 1) return `${cmd} ${matches[0]}`;
        return currentInput;
      }
      
      if (cmd === "style") {
        const matches = STYLES.filter(s => s.startsWith(partial));
        if (matches.length === 1) return `${cmd} ${matches[0]}`;
        if (matches.length > 1) {
          setHistory(prev => [...prev,
            { type: "output", content: (
              <div className="flex flex-wrap gap-3">
                {matches.map(m => <span key={m} className="text-blue-400 dark:text-blue-300">{m}</span>)}
              </div>
            )}
          ]);
          setShouldScroll(true);
        }
        return currentInput;
      }
    }
    
    return currentInput;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const completed = handleTabComplete(inputValue);
      setInputValue(completed);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    // Save to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: "input", dir: inputDir, content: cmd }];
    const args = cmd.split(" ").filter(Boolean);
    const command = args[0].toLowerCase();

    let output = null;

    switch (command) {
      case "help":
        output = (
          <div className="text-slate-600 dark:text-gray-300">
            <div className="text-green-600 dark:text-green-400 font-bold mb-2">Available commands:</div>
            <div className="ml-4 space-y-1">
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">help</span>  - Show this help menu</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">ls</span>  - List directory contents</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">cd</span> [dir]  - Change directory</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">cat</span> [file] - Read file contents</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">clear</span>  - Clear terminal output</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">whoami</span>  - Display current user</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">date</span>  - Display current date/time</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">projects</span>  - List all GitHub repos</div>
              <div className="mt-2 text-yellow-600 dark:text-yellow-400 font-bold">Navigation:</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">about</span>  - View about info</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">skills</span>  - View technical skills</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">experience</span>  - View experience</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">achievements</span>  - View achievements</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">contact</span>  - View contact info</div>
              <div className="mt-2 text-yellow-600 dark:text-yellow-400 font-bold">Settings:</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">theme</span> [dark|light] - Switch theme</div>
              <div><span className="text-blue-600 dark:text-blue-400 w-24 inline-block">style</span> [name] - Switch UI style</div>
              <div className="mt-2 text-slate-400 dark:text-gray-500">↑/↓ arrows for command history · Tab to autocomplete</div>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        setShouldScroll(false);
        return;

      case "whoami":
        output = "akshay-guest";
        break;

      case "date":
        output = new Date().toString();
        break;

      case "theme":
        const themeArg = args[1]?.toLowerCase();
        if (!themeArg) {
          output = (<span>Current theme: <span className="text-yellow-600 dark:text-yellow-400 font-bold">{themeMode}</span>. Usage: theme [dark|light]</span>);
        } else if (themeArg === "dark" || themeArg === "light") {
          setThemeMode?.(themeArg);
          output = (<span className="text-green-600 dark:text-green-400">✓ Theme switched to <span className="font-bold">{themeArg}</span></span>);
        } else {
          output = "Invalid theme. Use: theme dark | theme light";
        }
        break;

      case "style":
        const styleArg = args[1]?.toLowerCase();
        if (!styleArg) {
          output = (<span>Current style: <span className="text-yellow-600 dark:text-yellow-400 font-bold">{currentStyle}</span>. Available: {STYLES.join(", ")}</span>);
        } else if (STYLES.includes(styleArg)) {
          setCurrentStyle?.(styleArg);
          output = (<span className="text-green-600 dark:text-green-400">✓ Switching to <span className="font-bold">{styleArg}</span> style...</span>);
        } else {
          output = `Invalid style "${styleArg}". Available: ${STYLES.join(", ")}`;
        }
        break;

      case "ls":
        if (inputDir === "~") {
          output = (
            <div className="flex flex-wrap gap-4">
              <span className="text-blue-500 dark:text-blue-300 font-bold">about.txt</span>
              <span className="text-blue-500 dark:text-blue-300 font-bold">skills.json</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">projects/</span>
              <span className="text-blue-500 dark:text-blue-300 font-bold">experience.log</span>
              <span className="text-blue-500 dark:text-blue-300 font-bold">achievements.dat</span>
              <span className="text-blue-500 dark:text-blue-300 font-bold">contact.cfg</span>
            </div>
          );
        } else if (inputDir === "~/projects") {
          output = (
            <div className="flex flex-col gap-1">
              {allProjects.map(repo => (
                <div key={repo.id} className="flex gap-4">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold w-32 truncate">{repo.name}/</span>
                  <span className="text-slate-400 dark:text-gray-400 text-sm truncate">{repo.description || "No description"}</span>
                </div>
              ))}
            </div>
          );
        } else {
          output = `ls: cannot access '${inputDir}': No such directory`;
        }
        break;

      case "cd":
        const dir = args[1];
        if (!dir || dir === "~" || dir === "../" || dir === "..") {
          setInputDir("~");
          output = null;
        } else if (dir === "projects" || dir === "projects/") {
          setInputDir("~/projects");
          output = null;
        } else {
          output = `cd: no such directory: ${dir}`;
        }
        break;

      case "cat":
        const file = args[1];
        if (!file) {
          output = "cat: missing file operand";
        } else if (file === "about.txt") {
          output = (
            <div className="text-green-600 dark:text-green-300 whitespace-pre-wrap break-words">
              {`Hello, I am Akshay.\nI am a 3rd-year diploma student passionate about software development.\nI enjoy building Android applications with Java and exploring the Next.js ecosystem.\nMy focus lies at the intersection of frontend performance and scalable backend architecture.\nI enjoy building systems that solve real problems.`}
            </div>
          );
        } else if (file === "skills.json") {
          output = (
            <div className="text-yellow-600 dark:text-yellow-300 whitespace-pre-wrap break-words">
              {JSON.stringify({
                frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TailwindCSS"],
                backend: ["Java", "Node.js", "NextJS API"],
                database: ["MySQL", "MongoDB", "PostgreSQL"],
                tools: ["Git", "GitHub", "Android Studio"]
              }, null, 2)}
            </div>
          );
        } else if (file === "experience.log") {
          output = (
            <div className="text-cyan-600 dark:text-cyan-300 whitespace-pre-wrap break-words">
{`[PRESENT] Software Developer Trainee @ Bhairav Robotics
  → Refining craftsmanship through real-world system architecture.

[2023 - PRESENT] Open Source Contributor @ GitHub
  → Contributing to robust open-source projects, learning PRs and refactoring.

[2021 - 2024] Computer Engineering Diploma @ Andhra Polytechnic Kakinada
  → Formalizing CS fundamentals, algorithms, databases, and Android dev.`}
            </div>
          );
        } else if (file === "achievements.dat") {
          output = (
            <div className="text-yellow-600 dark:text-yellow-300 whitespace-pre-wrap break-words">
{`🏆 Technical Certification
  → Advanced full-stack mastery certificates via rigorous courses.

🚀 Hackathon Runs
  → Rapid translation of algorithms into viable interactive systems.`}
            </div>
          );
        } else if (file === "contact.cfg") {
          output = (
            <div className="text-green-600 dark:text-green-300 whitespace-pre-wrap break-words">
{`[contact]
email      = nalliakshaykumar@gmail.com
github     = https://github.com/Akshay-86
linkedin   = https://www.linkedin.com/in/nalliakshaykumar/
instagram  = https://www.instagram.com/mr_mirk_rex

STATUS: Open to opportunities`}
            </div>
          );
        } else {
          output = `cat: ${file}: No such file or directory`;
        }
        break;

      case "about":
        output = (
          <div className="whitespace-pre-wrap break-words">
            {"> Loading user_profile.sys...\n> I am a 3rd-year computer engineering diploma student currently refining my craft through rigorous self-taught engineering and practical problem-solving.\n> My focus lies at the intersection of frontend performance and scalable backend architecture. I enjoy building systems that solve real problems."}
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="whitespace-pre-wrap break-words">
            {"> Scanning system capabilities...\n> FRONTEND: HTML, CSS, JavaScript, React, Next.js, TailwindCSS\n> BACKEND: Java, Node.js, NextJS API\n> DATABASE: MySQL, MongoDB, PostgreSQL\n> TOOLS: Git, GitHub, Android Studio"}
          </div>
        );
        break;
      case "experience":
        output = (
          <div className="whitespace-pre-wrap break-words">
            {"> Fetching career_logs.dat...\n> [PRESENT] Software Developer Trainee @ Bhairav Robotics\n> [2023 - PRESENT] Open Source Contributor @ GitHub\n> [2021 - 2024] Computer Engineering Diploma @ Andhra Polytechnic Kakinada"}
          </div>
        );
        break;
      case "achievements":
        output = (
          <div className="whitespace-pre-wrap break-words">
            {"> Decrypting trophies.bin...\n> 🏆 Technical Certification: Advanced full-stack mastery certificates.\n> 🚀 Hackathon Runs: Rapid translation of algorithms into viable systems."}
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="whitespace-pre-wrap break-words">
            {"> Loading contact.cfg...\n> Email: nalliakshaykumar@gmail.com\n> GitHub: https://github.com/Akshay-86\n> LinkedIn: https://www.linkedin.com/in/nalliakshaykumar/\n> Instagram: https://www.instagram.com/mr_mirk_rex\n> Status: Open to opportunities"}
          </div>
        );
        break;
      case "fetch":
      case "projects":
        output = (
          <div className="flex flex-col gap-2">
            <div className="text-slate-400 dark:text-gray-400">Fetching live repositories from GitHub...</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {allProjects.map((repo) => (
                <div key={repo.id} className="border border-green-700 dark:border-green-800 p-2 rounded bg-green-50 dark:bg-black/50">
                  <div className="font-bold text-green-700 dark:text-green-400">
                    {repo.name} {repo.private && <span className="text-red-500 dark:text-red-400 text-xs">[PRIVATE]</span>}
                  </div>
                  <div className="text-slate-600 dark:text-gray-300 text-sm">{repo.description || "No description."}</div>
                  <div className="text-yellow-600 dark:text-yellow-500 text-xs mt-1">
                    Lang: {repo.language || "N/A"} | Stars: {repo.stargazers_count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      default: {
        // Fuzzy suggestion
        const suggestion = findSuggestion(command);
        if (suggestion) {
          output = (
            <div>
              <div className="text-red-500 dark:text-red-400">Command not found: {command}</div>
              <div className="text-yellow-600 dark:text-yellow-400 mt-1">Did you mean: <span className="font-bold text-green-600 dark:text-green-400">{suggestion}</span>? If not, type <span className="font-bold">help</span> for available commands.</div>
            </div>
          );
        } else {
          output = (
            <div className="text-red-500 dark:text-red-400">
              Command not found: {command}. Type <span className="font-bold">help</span> to see available commands.
            </div>
          );
        }
        break;
      }
    }

    if (output) {
      newHistory.push({ type: "output", content: output });
    }

    setHistory(newHistory);
    setInputValue("");
    setShouldScroll(true);
  };

  return (
    <div 
      className="bg-white dark:bg-black text-green-800 dark:text-[#00ff00] font-mono min-h-screen p-4 sm:p-6 w-full h-full overflow-y-auto transition-colors duration-300"
      onClick={(e) => {
        // Only focus input if user isn't selecting text
        const selection = window.getSelection();
        if (!selection || selection.toString().length === 0) {
          inputRef.current?.focus();
        }
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-1 pb-16">
        
        {/* Render History */}
        {history.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {line.type === "input" && (
              <div className="flex gap-2 flex-wrap">
                <span className="text-green-700 dark:text-[#00ff00] font-bold shrink-0">akshay@{line.dir} ~$</span>
                <span className="text-slate-900 dark:text-white break-all">{line.content}</span>
              </div>
            )}
            {line.type === "output" && (
              <div className="text-slate-700 dark:text-gray-200 break-words">{line.content}</div>
            )}
            {line.type === "system" && (
              <div className="text-slate-400 dark:text-gray-400 italic">{line.content}</div>
            )}
          </div>
        ))}

        {/* Current Input */}
        <form onSubmit={handleCommand} className="flex gap-2 items-center mt-2">
          <span className="text-green-700 dark:text-[#00ff00] font-bold shrink-0">akshay@{inputDir} ~$</span>
          <input
            ref={inputRef}
            id="terminal-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white font-mono shadow-none flex-grow min-w-10"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </form>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
