# 🖥️ Portfolio OS

A stunning, multi-themed portfolio website built with Next.js — designed to feel like an operating system. Switch between 5 unique UI styles on the fly, manage projects from a real terminal, and impress visitors with a cinematic boot sequence.

**Live:** [akshay-86.github.io](https://akshay-86.github.io)

---

## ✨ Features

### 🎨 5 Switchable UI Themes
| Theme | Description |
|-------|-------------|
| **Minimal** | Clean, modern typography with generous whitespace |
| **Glass** | Frosted glassmorphism with animated gradient blobs |
| **Bento** | Card-based grid layout with rounded containers |
| **Cyber** | Neon-cyan monospace aesthetic with grid backgrounds |
| **Terminal** | Fully functional CLI with real commands |

All themes include:
- Light/dark mode toggle
- Responsive hamburger navigation
- Smooth scroll-to-section nav links
- Style persistence across sessions (localStorage)

### 💻 Terminal UI — A Real Shell Experience
The terminal isn't just cosmetic — it's a fully interactive command-line interface:

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `ls` / `cd` | Navigate directory structure |
| `cat <file>` | Read files (about.txt, skills.json, etc.) |
| `projects` | Fetch and display GitHub repos |
| `theme dark/light` | Switch theme |
| `style <name>` | Switch UI theme |
| `enable boot` | Configure boot sequence |
| `whoami` | Display current user |
| `sudo` | 🔒 Admin authentication (SHA-256) |
| `add project` | 🔓 Admin: add local projects interactively |
| `exit` | Leave admin mode |
| `clearcookies` | 🧹 Clear all stored data (hidden) |

**Shell features:**
- ⬆️⬇️ Arrow key command history
- Tab autocomplete (commands, files, args)
- Fuzzy command suggestions (Levenshtein distance)
- Ctrl+C to cancel operations
- Masked password input (no browser save prompts)
- Admin mode with red `root@` prompt

### 🔐 Sudo & Local Projects
Add projects not on GitHub directly from the terminal:
1. `sudo` → enter password → admin access granted
2. `add project` → interactive prompts for name, language, description, dates, tags
3. Projects persist in localStorage and appear alongside GitHub repos with `[LOCAL]` or `[PRIVATE]` tags

### 🚀 Boot Sequence
First-time visitors see a cinematic boot animation. Configurable via `enable boot`:
- Option 1: Show every visit
- Option 2: Show only on first visit

A dismissible banner notifies returning visitors about the boot setting.

### 📱 Fully Responsive
Every theme includes a mobile-optimized hamburger menu with theme-matched styling.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Static Export)
- **Styling:** TailwindCSS v4
- **Hosting:** GitHub Pages
- **API:** GitHub REST API (public repos, commits)
- **Storage:** localStorage (style, theme, boot prefs, local projects)
- **Security:** SHA-256 password hashing (Web Crypto API)

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Akshay-86/Akshay-86.github.io.git
cd Akshay-86.github.io

# Install
npm install

# Dev server
npm run dev

# Build for production
npm run build
```

### Set Admin Password
```bash
python encode_password.py
# Enter your password → copy the SHA-256 hash
# Paste into src/components/ui/TerminalUI.js line ~14
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js              # Server component — fetches GitHub data
│   ├── layout.js            # Root layout with metadata
│   └── globals.css          # Global styles & animations
├── components/
│   ├── PortfolioRenderer.js # Client hub — manages themes, boot, local projects
│   ├── BootSequence.js      # Cinematic startup animation
│   ├── ScrollReveal.js      # Intersection Observer scroll animations
│   ├── ThemeProvider.js     # Theme context provider
│   └── ui/
│       ├── MinimalUI.js     # Clean minimal theme
│       ├── GlassUI.js       # Glassmorphism theme
│       ├── BentoUI.js       # Card grid theme
│       ├── CyberUI.js       # Cyberpunk neon theme
│       └── TerminalUI.js    # Full CLI terminal theme
└── encode_password.py       # SHA-256 password encoder utility
```

---

## 📋 TODO

- [ ] **Edit local projects** — modify previously added projects from terminal
- [ ] **Delete local projects** — remove local projects via terminal command
- [ ] **GitHub token integration** — display private repos using read-only PAT
- [ ] **Resume download** — generate and serve PDF resume

---

## 👥 Credits

| Role | Who |
|------|-----|
| **Concept & Design Direction** | [Akshay](https://github.com/Akshay-86) |
| **Architecture & Development** | [Antigravity AI](https://deepmind.google) — Google DeepMind's Advanced Agentic Coding Assistant |

> Every line of code in this project was written by Antigravity, prompted and directed by Akshay. From the boot sequence to the terminal state machine, from glassmorphism blobs to Levenshtein-powered fuzzy suggestions — this is a fully AI-coded portfolio.

---

## 📄 License

MIT — feel free to fork and make it yours.
