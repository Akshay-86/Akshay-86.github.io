"use client";

import React, { useState, useRef, useEffect } from "react";

export default function TerminalUI({ publicProjects, privateProjects }) {
  const allProjects = [...(publicProjects || []), ...(privateProjects || [])];
  
  const [history, setHistory] = useState([
    { type: "system", content: "Welcome to Portfolio OS v1.0.0" },
    { type: "system", content: "Type 'help' to see a list of available commands." },
  ]);
  const [inputDir, setInputDir] = useState("~");
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef(null);

  // Auto scroll to bottom when history changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: "input", dir: inputDir, content: cmd }];
    const args = cmd.split(" ").filter(Boolean);
    const command = args[0].toLowerCase();

    let output = null;

    switch (command) {
      case "help":
        output = (
          <div className="text-gray-300">
            <div>Available commands:</div>
            <div className="ml-4">
              <span className="text-blue-400">ls</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- List directory contents<br />
              <span className="text-blue-400">cat</span> [file]&nbsp;- Read file contents<br />
              <span className="text-blue-400">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal output<br />
              <span className="text-blue-400">whoami</span>&nbsp;&nbsp;&nbsp;- Display current user<br />
              <span className="text-blue-400">date</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Display current date and time<br />
              <span className="text-blue-400">fetch</span>&nbsp;&nbsp;&nbsp;&nbsp;- Fetch latest GitHub API repos<br />
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      case "whoami":
        output = "akshay-guest";
        break;

      case "date":
        output = new Date().toString();
        break;

      case "ls":
        output = (
          <div className="flex gap-4 text-blue-300 font-bold">
            <span>about.txt</span>
            <span>skills.json</span>
            <span>projects/</span>
          </div>
        );
        break;

      case "cat":
        const file = args[1];
        if (!file) {
          output = "cat: missing file operand";
        } else if (file === "about.txt") {
          output = (
            <div className="text-green-300 whitespace-pre-line">
              {`Hello, I am Akshay.
              I am a 3rd-year diploma student passionate about software development.
              I enjoy building Android applications with Java and exploring the Next.js ecosystem.`}
            </div>
          );
        } else if (file === "skills.json") {
          output = (
            <div className="text-yellow-300 whitespace-pre-wrap">
              {JSON.stringify({
                languages: ["Java", "HTML", "CSS", "JavaScript", "PHP"],
                frameworks: ["Android Studio", "Next.js", "React"]
              }, null, 2)}
            </div>
          );
        } else {
          output = `cat: ${file}: No such file or directory`;
        }
        break;

      case "cd":
        output = "cd: permission denied (just use 'cat' or 'ls' instead!)";
        break;

      case "about":
        output = [
          "> Loading user_profile.sys...",
          "> I am a 3rd-year computer engineering diploma student currently refining my craft through rigorous self-taught engineering and practical problem-solving.",
          "> My focus lies at the intersection of frontend performance and scalable backend architecture. I enjoy building systems that solve real problems.",
        ];
        break;
      case "skills":
        output = [
          "> Scanning system capabilities...",
          "> FRONTEND: HTML, CSS, JavaScript, React, Next.js, TailwindCSS",
          "> BACKEND: Java, Node.js, NextJS API",
          "> DATABASE: MySQL, MongoDB, PostgreSQL",
          "> TOOLS: Git, GitHub, Android Studio"
        ];
        break;
      case "experience":
        output = [
          "> Fetching career_logs.dat...",
          "> [PRESENT] Software Developer Trainee @ Agasthya Solutions",
          "> [2023 - PRESENT] Open Source Contributor @ GitHub",
          "> [2021 - 2024] Computer Engineering Diploma @ Andhra Polytechnic Kakinada"
        ];
        break;
      case "achievements":
        output = [
          "> Decrypting trophies.bin...",
          "> 🏆 Technical Certification: Advanced full-stack mastery certificates.",
          "> 🚀 Hackathon Runs: Rapid translation of algorithms into viable systems."
        ];
        break;
      case "fetch":
      case "projects":
        output = (
          <div className="flex flex-col gap-2">
            <div className="text-gray-400">Fetching live repositories from GitHub...</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {allProjects.map((repo) => (
                <div key={repo.id} className="border border-green-800 p-2 rounded bg-black/50">
                  <div className="font-bold text-green-400">
                    {repo.name} {repo.private && <span className="text-red-400 text-xs">[PRIVATE]</span>}
                  </div>
                  <div className="text-gray-300 text-sm">{repo.description || "No description."}</div>
                  <div className="text-yellow-500 text-xs mt-1">
                    Lang: {repo.language || "N/A"} | Stars: {repo.stargazers_count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      default:
        output = `Command not found: ${command}. Type 'help' to see available commands.`;
    }

    if (output) {
      newHistory.push({ type: "output", content: output });
    }

    setHistory(newHistory);
    setInputValue("");
  };

  return (
    <div 
      className="bg-black text-[#00ff00] font-mono min-h-screen p-4 sm:p-6 w-full h-full overflow-y-auto"
      onClick={() => document.getElementById("terminal-input")?.focus()}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-1 pb-16">
        
        {/* Render History */}
        {history.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {line.type === "input" && (
              <div className="flex gap-2">
                <span className="text-[#00ff00] font-bold">akshay@{line.dir} ~$</span>
                <span className="text-white">{line.content}</span>
              </div>
            )}
            {line.type === "output" && (
              <div className="text-gray-200">{line.content}</div>
            )}
            {line.type === "system" && (
              <div className="text-gray-400 italic">{line.content}</div>
            )}
          </div>
        ))}

        {/* Current Input */}
        <form onSubmit={handleCommand} className="flex gap-2 items-center mt-2">
          <span className="text-[#00ff00] font-bold">akshay@{inputDir} ~$</span>
          <input
            id="terminal-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono shadow-none flex-grow min-w-10"
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
