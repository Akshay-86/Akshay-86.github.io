"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

// SHA-256 hash function using Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Hardcoded SHA-256 hash of the admin password (replace with your own)
const ADMIN_HASH = "a5c99bb99a92374c93ce041f970ae23d852f4737f52ff45c17ea33a1ceeba3b0";

export default function TerminalUI({ publicProjects, privateProjects, controls }) {
  const { themeMode, setThemeMode, currentStyle, setCurrentStyle, addLocalProject, setBootPref, showBootBanner, setShowBootBanner } = controls || {};
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

  // Interactive mode state machine
  const [mode, setMode] = useState("normal");
  const [sudoProject, setSudoProject] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // sudo unlocks admin access

  const STYLES = ["minimal", "bento", "glass", "cyber", "terminal"];
  const ALL_COMMANDS = [
    "help", "clear", "whoami", "date", "ls", "cd", "cat",
    "about", "skills", "experience", "achievements", "contact",
    "projects", "fetch", "theme", "style", "enable"
  ];
  const ADMIN_COMMANDS = ["add project"];
  const CAT_FILES = ["about.txt", "skills.json", "experience.log", "achievements.dat", "contact.cfg"];
  const CD_DIRS = ["~", "projects", ".."];

  // Only scroll on new commands
  useEffect(() => {
    if (shouldScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  // Levenshtein distance
  const levenshtein = (a, b) => {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
      }
    }
    return matrix[a.length][b.length];
  };

  const findSuggestion = useCallback((input) => {
    const cmd = input.toLowerCase();
    if (cmd.length < 2) return null;
    const allCmds = isAdmin ? [...ALL_COMMANDS, "add"] : ALL_COMMANDS;
    const prefixMatches = allCmds.filter(c => c.startsWith(cmd));
    if (prefixMatches.length === 1) return prefixMatches[0];
    let bestMatch = null;
    let bestScore = Infinity;
    for (const command of allCmds) {
      const dist = levenshtein(cmd, command);
      if (dist <= 2 && dist < bestScore) {
        bestScore = dist;
        bestMatch = command;
      }
    }
    return bestMatch;
  }, [isAdmin]);

  // Tab autocomplete
  const handleTabComplete = (currentInput) => {
    const parts = currentInput.trim().split(" ");
    if (parts.length === 1) {
      const partial = parts[0].toLowerCase();
      if (!partial) return currentInput;
      const allCmds = isAdmin ? [...ALL_COMMANDS, "add"] : ALL_COMMANDS;
      const matches = allCmds.filter(c => c.startsWith(partial));
      if (matches.length === 1) return matches[0];
      if (matches.length > 1) {
        setHistory(prev => [...prev,
        {
          type: "output", content: (
            <div className="flex flex-wrap gap-3">
              {matches.map(m => <span key={m} className="text-blue-400 dark:text-blue-300">{m}</span>)}
            </div>
          )
        }
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
          {
            type: "output", content: (
              <div className="flex flex-wrap gap-3">
                {matches.map(m => <span key={m} className="text-blue-400 dark:text-blue-300">{m}</span>)}
              </div>
            )
          }
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
          {
            type: "output", content: (
              <div className="flex flex-wrap gap-3">
                {matches.map(m => <span key={m} className="text-blue-400 dark:text-blue-300">{m}</span>)}
              </div>
            )
          }
          ]);
          setShouldScroll(true);
        }
        return currentInput;
      }
      if (cmd === "enable") {
        const matches = ["boot"].filter(o => o.startsWith(partial));
        if (matches.length === 1) return `${cmd} ${matches[0]}`;
        return currentInput;
      }
      if (cmd === "add" && isAdmin) {
        const matches = ["project"].filter(o => o.startsWith(partial));
        if (matches.length === 1) return `${cmd} ${matches[0]}`;
        return currentInput;
      }
    }
    return currentInput;
  };

  const handleKeyDown = (e) => {
    // Ctrl+C cancels any ongoing interactive mode
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      if (mode !== "normal") {
        setHistory(prev => [...prev, { type: "system", content: "^C — Operation cancelled." }]);
        setMode("normal");
        setSudoProject({});
        setInputValue("");
        setShouldScroll(true);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (mode === "normal") {
        const completed = handleTabComplete(inputValue);
        setInputValue(completed);
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (mode !== "normal") return;
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (mode !== "normal") return;
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

  // Get prompt based on mode
  const getPrompt = () => {
    switch (mode) {
      case "password": return "Password: ";
      case "sudo-name": return "Project name (*): ";
      case "sudo-desc": return "Description: ";
      case "sudo-lang": return "Language (*): ";
      case "sudo-stars": return "Stars: ";
      case "sudo-url": return "Repository URL: ";
      case "sudo-start": return "Start date (*) (e.g. Jan 2024): ";
      case "sudo-end": return "End date (Enter for ongoing): ";
      case "sudo-tag": return "Tag (*) [local/private]: ";
      case "sudo-confirm": return "Save and update? (type 'yes'): ";
      case "boot-choose": return "Select option (1 or 2): ";
      default: return `${isAdmin ? "root" : "akshay"}@${inputDir} ~$ `;
    }
  };

  const handleCommand = async (e) => {
    e.preventDefault();
    const raw = inputValue;
    const cmd = raw.trim();
    setInputValue("");

    // --- INTERACTIVE MODE HANDLERS ---

    if (mode === "password") {
      const newHist = [...history, { type: "input-masked", content: "Password: ********" }];
      if (!cmd) {
        newHist.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">Authentication cancelled.</span>) });
        setMode("normal");
      } else {
        const hash = await sha256(cmd);
        if (hash === ADMIN_HASH) {
          setIsAdmin(true);
          newHist.push({
            type: "output", content: (
              <div>
                <div className="text-green-600 dark:text-green-400">✓ Authentication successful. Admin access granted.</div>
                <div className="text-slate-500 dark:text-gray-500 mt-1">Type <span className="font-bold text-blue-600 dark:text-blue-400">help</span> to see unlocked commands.</div>
              </div>
            )
          });
          setMode("normal");
        } else {
          newHist.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">✗ Authentication failed. Incorrect password.</span>) });
          setMode("normal");
        }
      }
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-name") {
      const newHist = [...history, { type: "input-prompt", prompt: "Project name (*): ", content: cmd }];
      if (!cmd) {
        newHist.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">Project name is required.</span>) });
      } else {
        setSudoProject(prev => ({ ...prev, name: cmd }));
        setMode("sudo-desc");
      }
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-desc") {
      const newHist = [...history, { type: "input-prompt", prompt: "Description: ", content: cmd || "(skipped)" }];
      setSudoProject(prev => ({ ...prev, description: cmd || "" }));
      setMode("sudo-lang");
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-lang") {
      const newHist = [...history, { type: "input-prompt", prompt: "Language (*): ", content: cmd }];
      if (!cmd) {
        newHist.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">Language is required.</span>) });
      } else {
        setSudoProject(prev => ({ ...prev, language: cmd }));
        setMode("sudo-stars");
      }
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-stars") {
      const newHist = [...history, { type: "input-prompt", prompt: "Stars: ", content: cmd || "0" }];
      setSudoProject(prev => ({ ...prev, stars: cmd || "0" }));
      setMode("sudo-url");
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-url") {
      const newHist = [...history, { type: "input-prompt", prompt: "Repository URL: ", content: cmd || "(none)" }];
      setSudoProject(prev => ({ ...prev, url: cmd || "" }));
      setMode("sudo-start");
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-start") {
      const newHist = [...history, { type: "input-prompt", prompt: "Start date (*): ", content: cmd }];
      if (!cmd) {
        newHist.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">Start date is required.</span>) });
      } else {
        setSudoProject(prev => ({ ...prev, startTime: cmd }));
        setMode("sudo-end");
      }
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-end") {
      const newHist = [...history, { type: "input-prompt", prompt: "End date: ", content: cmd || "Ongoing" }];
      setSudoProject(prev => ({ ...prev, endTime: cmd || "Ongoing" }));
      setMode("sudo-tag");
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-tag") {
      const newHist = [...history, { type: "input-prompt", prompt: "Tag (*) [local/private]: ", content: cmd }];
      const tag = cmd.toLowerCase();
      if (tag !== "local" && tag !== "private") {
        newHist.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">Tag must be either &quot;local&quot; or &quot;private&quot;.</span>) });
      } else {
        setSudoProject(prev => ({ ...prev, tag }));
        // Show summary
        const proj = { ...sudoProject, tag };
        newHist.push({
          type: "output", content: (
            <div className="whitespace-pre-wrap break-words">
              <div className="text-yellow-600 dark:text-yellow-400 font-bold mb-1">── Project Summary ──</div>
              <div>Name:        <span className="text-green-600 dark:text-green-400 font-bold">{proj.name}</span></div>
              <div>Description: {proj.description || "(none)"}</div>
              <div>Language:    <span className="text-cyan-600 dark:text-cyan-400">{proj.language}</span></div>
              <div>Stars:       {proj.stars || "0"}</div>
              <div>URL:         {proj.url || "(none)"}</div>
              <div>Started:     {proj.startTime}</div>
              <div>Ended:       {proj.endTime || "Ongoing"}</div>
              <div>Tag:         <span className="text-purple-500 dark:text-purple-400 font-bold">[{tag.toUpperCase()}]</span></div>
            </div>
          )
        });
        setMode("sudo-confirm");
      }
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "sudo-confirm") {
      const newHist = [...history, { type: "input-prompt", prompt: "Save and update? (type 'yes'): ", content: cmd }];
      if (cmd.toLowerCase() === "yes") {
        addLocalProject?.(sudoProject);
        newHist.push({ type: "output", content: (<span className="text-green-600 dark:text-green-400">✓ Project &quot;{sudoProject.name}&quot; saved successfully! It will now appear in your projects list.</span>) });
      } else {
        newHist.push({ type: "output", content: (<span className="text-yellow-600 dark:text-yellow-400">Operation cancelled. Project not saved.</span>) });
      }
      setSudoProject({});
      setMode("normal");
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    if (mode === "boot-choose") {
      const newHist = [...history, { type: "input-prompt", prompt: "Select option (1 or 2): ", content: cmd }];
      if (cmd === "1") {
        setBootPref?.("always");
        newHist.push({ type: "output", content: (<span className="text-green-600 dark:text-green-400">✓ Boot sequence will play every time you visit the site.</span>) });
      } else if (cmd === "2") {
        setBootPref?.("once");
        localStorage.removeItem("hasVisited");
        newHist.push({ type: "output", content: (<span className="text-green-600 dark:text-green-400">✓ Boot sequence will play only on the first visit (default behavior restored).</span>) });
      } else {
        newHist.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">Invalid option. Please type 1 or 2.</span>) });
        setHistory(newHist);
        setShouldScroll(true);
        return;
      }
      setMode("normal");
      setHistory(newHist);
      setShouldScroll(true);
      return;
    }

    // --- NORMAL MODE ---
    if (!cmd) return;

    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const promptPrefix = isAdmin ? "root" : "akshay";
    const newHistory = [...history, { type: "input", dir: inputDir, content: cmd, prompt: promptPrefix }];
    const args = cmd.split(" ").filter(Boolean);
    const command = args[0].toLowerCase();

    // Handle "add project" as two-word command
    if (command === "add" && args[1]?.toLowerCase() === "project") {
      if (!isAdmin) {
        newHistory.push({ type: "output", content: (<span className="text-red-500 dark:text-red-400">Permission denied. Use <span className="font-bold">sudo</span> to authenticate first.</span>) });
      } else {
        newHistory.push({ type: "output", content: (<span className="text-green-600 dark:text-green-400">Starting project entry. Fields marked (*) are mandatory. Press Enter to skip optional fields. Ctrl+C to cancel.</span>) });
        newHistory.push({ type: "system", content: "────────────────────────────────────" });
        setSudoProject({});
        setMode("sudo-name");
      }
      setHistory(newHistory);
      setShouldScroll(true);
      return;
    }

    let output = null;

    switch (command) {
      case "help":
        output = (
          <div className="text-slate-600 dark:text-gray-300 whitespace-pre-wrap">
            <div className="text-green-600 dark:text-green-400 font-bold mb-2">Available commands:</div>
            <table className="border-collapse">
              <tbody className="text-left">
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">help</td><td>Show this help menu</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">ls</td><td>List directory contents</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">cd</td><td>[dir] - Change directory</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">cat</td><td>[file] - Read file contents</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">clear</td><td>Clear terminal output</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">whoami</td><td>Display current user</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">date</td><td>Display current date/time</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">projects</td><td>List all GitHub repos</td></tr>
                <tr><td colSpan="2" className="pt-2 text-yellow-600 dark:text-yellow-400 font-bold">Navigation:</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">about</td><td>View about info</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">skills</td><td>View technical skills</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">experience</td><td>View experience</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">achievements</td><td>View achievements</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">contact</td><td>View contact info</td></tr>
                <tr><td colSpan="2" className="pt-2 text-yellow-600 dark:text-yellow-400 font-bold">Settings:</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">theme</td><td>[dark|light] - Switch theme</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">style</td><td>[name] - Switch UI style</td></tr>
                <tr><td className="text-blue-600 dark:text-blue-400 pr-4 font-bold align-top">enable boot</td><td>Configure boot sequence</td></tr>
                {isAdmin && (
                  <>
                    <tr><td colSpan="2" className="pt-2 text-red-500 dark:text-red-400 font-bold">🔓 Admin Commands:</td></tr>
                    <tr><td className="text-red-500 dark:text-red-400 pr-4 font-bold align-top">add project</td><td>Add a local project interactively</td></tr>
                  </>
                )}
              </tbody>
            </table>
            <div className="mt-2 text-slate-400 dark:text-gray-500">↑/↓ arrows for history · Tab to autocomplete · Ctrl+C to cancel</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setShouldScroll(false);
        return;

      case "whoami":
        if (isAdmin) {
          output = (
            <div className="whitespace-pre-wrap break-words">
              <div className="text-red-500 dark:text-red-400 font-bold">root (admin)</div>
              <div className="text-slate-500 dark:text-gray-400 mt-1">uid=0(root) gid=0(root) groups=0(root)</div>
              <div className="text-slate-500 dark:text-gray-400">Privileges: add project, manage content</div>
            </div>
          );
        } else {
          output = "akshay-guest";
        }
        break;

      case "exit":
        if (isAdmin) {
          setIsAdmin(false);
          output = (<span className="text-yellow-600 dark:text-yellow-400">Exiting admin mode. Back to guest.</span>);
        } else {
          output = "Not in admin mode.";
        }
        break;

      case "date":
        output = new Date().toString();
        break;

      case "sudo":
        if (isAdmin) {
          newHistory.push({ type: "output", content: (<span className="text-yellow-600 dark:text-yellow-400">Already authenticated as root.</span>) });
          setHistory(newHistory);
          setShouldScroll(true);
          return;
        }
        newHistory.push({ type: "system", content: "🔒 Admin authentication required." });
        setMode("password");
        setHistory(newHistory);
        setShouldScroll(true);
        return;

      case "enable":
        if (args[1]?.toLowerCase() === "boot") {
          newHistory.push({
            type: "output", content: (
              <div className="whitespace-pre-wrap break-words">
                <div className="text-yellow-600 dark:text-yellow-400 font-bold mb-1">Boot Sequence Configuration:</div>
                <div className="ml-2"><span className="text-green-600 dark:text-green-400 font-bold">1.</span> Show boot sequence every time I visit</div>
                <div className="ml-2"><span className="text-green-600 dark:text-green-400 font-bold">2.</span> Show boot sequence only on first visit</div>
              </div>
            )
          });
          setMode("boot-choose");
          setHistory(newHistory);
          setShouldScroll(true);
          return;
        }
        output = `enable: unknown target "${args[1] || ""}". Use: enable boot`;
        break;

      // Hidden: clear all localStorage data (for testing)
      case "clearcookies":
        localStorage.clear();
        output = (<span className="text-green-600 dark:text-green-400">✓ All stored data cleared. Reload the page for changes to take effect.</span>);
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
                  {repo.isLocal && <span className="text-purple-500 dark:text-purple-400 text-xs">[{(repo.localTag || "LOCAL").toUpperCase()}]</span>}
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
                    {repo.isLocal && <span className="text-purple-500 dark:text-purple-400 text-xs ml-1">[{(repo.localTag || "LOCAL").toUpperCase()}]</span>}
                  </div>
                  <div className="text-slate-600 dark:text-gray-300 text-sm">{repo.description || "No description."}</div>
                  <div className="text-yellow-600 dark:text-yellow-500 text-xs mt-1">
                    Lang: {repo.language || "N/A"} | Stars: {repo.stargazers_count}
                    {repo.startTime && <> | {repo.startTime} — {repo.endTime || "Ongoing"}</>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "add":
        if (!isAdmin) {
          output = (<span className="text-red-500 dark:text-red-400">Permission denied. Use <span className="font-bold">sudo</span> to authenticate first.</span>);
        } else {
          output = `Usage: add project`;
        }
        break;

      default: {
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
    setShouldScroll(true);
  };

  return (
    <div
      className="bg-white dark:bg-black text-green-800 dark:text-[#00ff00] font-mono min-h-screen p-4 sm:p-6 w-full h-full overflow-y-auto transition-colors duration-300"
      onClick={(e) => {
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
                <span className={`font-bold shrink-0 ${line.prompt === "root" ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-[#00ff00]"}`}>
                  {line.prompt || "akshay"}@{line.dir} ~$
                </span>
                <span className="text-slate-900 dark:text-white break-all">{line.content}</span>
              </div>
            )}
            {line.type === "input-masked" && (
              <div className="text-slate-500 dark:text-gray-500">{line.content}</div>
            )}
            {line.type === "input-prompt" && (
              <div className="flex gap-2 flex-wrap">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold shrink-0">{line.prompt}</span>
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
        <form onSubmit={handleCommand} className="flex gap-2 items-center mt-2" data-form-type="other" autoComplete="off">
          <span className={`font-bold shrink-0 ${mode !== "normal" ? "" : isAdmin ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-[#00ff00]"}`}>
            {mode === "normal" ? (
              `${isAdmin ? "root" : "akshay"}@${inputDir} ~$ `
            ) : (
              <span className="text-yellow-600 dark:text-yellow-400">{getPrompt()}</span>
            )}
          </span>
          <input
            ref={inputRef}
            id="terminal-input"
            name="terminal-cmd"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white font-mono shadow-none flex-grow min-w-10"
            style={mode === "password" ? { WebkitTextSecurity: "disc", textSecurity: "disc" } : {}}
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
