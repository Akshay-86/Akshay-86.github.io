/**
 * Centralized Data Layer for Portfolio OS
 * Single source of truth for Akshay's biographical data, skills, experience,
 * achievements, and project enrichments across all 5 themes.
 */

export const PERSONAL_INFO = {
  name: "Akshay",
  fullName: "Nalli Akshay Kumar",
  handle: "@Akshay-86",
  tagline: "Building robust native Android applications today, exploring low-level systems & OS internals for tomorrow.",
  roles: [
    "Native Android Developer",
    "Aspiring Systems Engineer",
    "Open Source Contributor"
  ],
  statusText: "Crafting High-Performance Systems & Native Android Apps",
  location: "Andhra Pradesh, India",
  college: "SRKR Engineering College, Bhimavaram",
  diplomaCollege: "Andhra Polytechnic, Kakinada",

  aboutParagraphs: [
    "I am a Computer Science & Engineering undergraduate at SRKR Engineering College (Lateral Entry), with a Diploma in Computer Engineering (CME) from Andhra Polytechnic, Kakinada (2023–2026).",
    "My current craft is native Android application development using Kotlin and Java, architecting offline-first, battery-efficient, and secure mobile systems. Long term, I am driven by systems-level engineering just above the hardware layer — striving toward open-source contributions to the Linux kernel."
  ],

  contact: {
    email: "nalliakshaykumar@gmail.com",
    github: "https://github.com/Akshay-86",
    githubUsername: "Akshay-86",
    linkedin: "https://www.linkedin.com/in/nalliakshaykumar/",
    instagram: "https://www.instagram.com/mr_mirk_rex",
    resumeUrl: "/resume.pdf",
    resumeFilename: "Akshay_Resume.pdf"
  }
};

export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const SKILLS_DATA = [
  {
    category: "Mobile & Native Android",
    icon: "📱",
    color: "emerald",
    tools: [
      "Kotlin",
      "Java",
      "Android Studio & SDK",
      "Jetpack Compose",
      "Android NDK / JNI",
      "Coroutines & Flow",
      "Room DB / Offline-First",
      "ExoPlayer / Media3"
    ]
  },
  {
    category: "Core & Systems Engineering",
    icon: "⚡",
    color: "blue",
    tools: [
      "C & Modern C++",
      "Python",
      "Linux Kernel Concepts",
      "POSIX & Userspace APIs",
      "Memory Safety & Pointers",
      "Reverse Engineering",
      "Multithreading & Concurrency"
    ]
  },
  {
    category: "Cloud, DBs & Security",
    icon: "☁️",
    color: "purple",
    tools: [
      "Firebase Firestore & Auth",
      "MariaDB & MySQL",
      "Zero-Trust Edge Protocols",
      "Hardware-Backed Keystore",
      "Google Drive API",
      "REST & WebSockets"
    ]
  },
  {
    category: "DevOps, Tools & Web",
    icon: "🛠️",
    color: "amber",
    tools: [
      "Git & GitHub Workflows",
      "GitHub Actions (CI/CD)",
      "CMake & Gradle Pipelines",
      "Termux / Android Shell",
      "Next.js & Tailwind CSS",
      "Linux CLI & Bash Scripting"
    ]
  }
];

export const EXPERIENCE_DATA = [
  {
    role: "B.Tech in CSE (Lateral Entry)",
    company: "SRKR Engineering College, Bhimavaram",
    period: "2026 — Present",
    type: "Degree",
    desc: "Undergraduate study focusing on algorithms, operating system internals, computer architecture, and distributed systems."
  },
  {
    role: "Industrial Internship Trainee",
    company: "Bhairav Robotics, Kakinada",
    period: "2026",
    type: "Internship",
    desc: "Hands-on software development training, engineering workflows, hardware/software interfacing, and applied programming practice."
  },
  {
    role: "Diploma in Computer Engineering (CME)",
    company: "Andhra Polytechnic, Kakinada",
    period: "2023 — 2026",
    type: "Diploma",
    desc: "Graduated with strong foundations in procedural & object-oriented programming, relational databases, data structures, and computer networks."
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    icon: "🐧",
    title: "The Linux Quest (Ultimate Mission)",
    tag: "Aspiration & Mission",
    desc: "Dedicated to contributing to the global open-source community, with the north-star goal of landing an accepted patch in the mainline Linux kernel."
  },
  {
    icon: "🎵",
    title: "Mueso — Native Android Music Engine",
    tag: "Open Source Product",
    desc: "Architected a full-featured Android music player bridging offline storage, background audio streaming, SponsorBlock skipping, and automated multi-architecture APK releases."
  },
  {
    icon: "🛡️",
    title: "LazyVault — Zero-Trust Edge Storage",
    tag: "Security & Systems",
    desc: "Engineered an asynchronous, hardware-backed encrypted storage protocol turning dormant Android devices into secure, human-authorized edge nodes without battery drain."
  },
  {
    icon: "🤟",
    title: "VoxIgnota — Real-Time ASL Edge AI",
    tag: "On-Device ML",
    desc: "Built an on-device American Sign Language translator performing computer vision inference locally on Android camera frames in real time."
  }
];

/**
 * Metadata overrides to enrich GitHub repository cards with curated descriptions,
 * categories, architecture highlights, and custom tags.
 */
export const PROJECT_METADATA_OVERRIDES = {
  "Mueso": {
    customTitle: "Mueso Music Player",
    badge: "Featured Android App",
    category: "android",
    featured: true,
    accent: "emerald",
    summary: "State-of-the-art Android music player combining offline audio, curated streaming, SponsorBlock filtering, and batch downloads.",
    techStack: ["Kotlin", "Android SDK", "ExoPlayer", "Room", "Material 3"],
    defaultRelease: {
      tagName: "Pre_Builds",
      version: "v1.4.0 (Pre_Builds)",
      hasApk: true,
      primaryAsset: {
        name: "app-universal-release.apk",
        downloadUrl: "https://github.com/Akshay-86/Mueso/releases/download/Pre_Builds/app-universal-release.apk",
        sizeFormatted: "7.2 MB",
        arch: "Universal",
        isApk: true,
      },
      allAssets: [
        { name: "app-universal-release.apk", downloadUrl: "https://github.com/Akshay-86/Mueso/releases/download/Pre_Builds/app-universal-release.apk", sizeFormatted: "7.2 MB", arch: "Universal", isApk: true },
        { name: "app-arm64-v8a-release.apk", downloadUrl: "https://github.com/Akshay-86/Mueso/releases/download/Pre_Builds/app-arm64-v8a-release.apk", sizeFormatted: "7.1 MB", arch: "ARM64 (v8a)", isApk: true },
        { name: "app-armeabi-v7a-release.apk", downloadUrl: "https://github.com/Akshay-86/Mueso/releases/download/Pre_Builds/app-armeabi-v7a-release.apk", sizeFormatted: "7.1 MB", arch: "ARMv7", isApk: true },
        { name: "app-x86_64-release.apk", downloadUrl: "https://github.com/Akshay-86/Mueso/releases/download/Pre_Builds/app-x86_64-release.apk", sizeFormatted: "7.1 MB", arch: "x86_64", isApk: true },
      ],
    },
  },
  "LazyVault": {
    customTitle: "LazyVault",
    badge: "Zero-Trust Edge Storage",
    category: "android",
    featured: true,
    accent: "purple",
    summary: "Zero-Trust, Hardware-Backed Asynchronous Edge Storage. Your phone stays dormant and only wakes to fulfill encrypted, human-authorized transfers.",
    techStack: ["Kotlin", "Android NDK", "Cryptography", "Firebase", "TypeScript"],
    defaultRelease: {
      tagName: "Pre_Builds",
      version: "Pre_Builds (Latest)",
      hasApk: true,
      primaryAsset: {
        name: "app-universal-release.apk",
        downloadUrl: "https://github.com/Akshay-86/LazyVault/releases/download/Pre_Builds/app-universal-release.apk",
        sizeFormatted: "49.8 MB",
        arch: "Universal",
        isApk: true,
      },
      allAssets: [
        { name: "app-universal-release.apk", downloadUrl: "https://github.com/Akshay-86/LazyVault/releases/download/Pre_Builds/app-universal-release.apk", sizeFormatted: "49.8 MB", arch: "Universal", isApk: true },
        { name: "app-arm64-v8a-release.apk", downloadUrl: "https://github.com/Akshay-86/LazyVault/releases/download/Pre_Builds/app-arm64-v8a-release.apk", sizeFormatted: "19.5 MB", arch: "ARM64 (v8a)", isApk: true },
        { name: "app-armeabi-v7a-release.apk", downloadUrl: "https://github.com/Akshay-86/LazyVault/releases/download/Pre_Builds/app-armeabi-v7a-release.apk", sizeFormatted: "16.2 MB", arch: "ARMv7", isApk: true },
        { name: "app-x86_64-release.apk", downloadUrl: "https://github.com/Akshay-86/LazyVault/releases/download/Pre_Builds/app-x86_64-release.apk", sizeFormatted: "22.3 MB", arch: "x86_64", isApk: true },
      ],
    },
  },
  "termux-app": {
    customTitle: "Termux (Secondary User Fork)",
    badge: "Terminal & Systems",
    category: "systems",
    featured: true,
    accent: "blue",
    summary: "Enhanced Termux terminal emulator fork for Android featuring secondary user profile support, process stability, and custom packages.",
    techStack: ["Java", "C", "Android NDK", "Linux Userspace", "POSIX"],
    defaultRelease: {
      tagName: "latest",
      version: "Latest Release",
      hasApk: true,
      primaryAsset: {
        name: "termux-app_apt-android-7-release_universal.apk",
        downloadUrl: "https://github.com/Akshay-86/termux-app/releases/download/latest/termux-app_apt-android-7-release_universal.apk",
        sizeFormatted: "114.8 MB",
        arch: "Universal",
        isApk: true,
      },
      allAssets: [
        { name: "termux-app_apt-android-7-release_universal.apk", downloadUrl: "https://github.com/Akshay-86/termux-app/releases/download/latest/termux-app_apt-android-7-release_universal.apk", sizeFormatted: "114.8 MB", arch: "Universal", isApk: true },
        { name: "termux-app_apt-android-7-release_arm64-v8a.apk", downloadUrl: "https://github.com/Akshay-86/termux-app/releases/download/latest/termux-app_apt-android-7-release_arm64-v8a.apk", sizeFormatted: "32.0 MB", arch: "ARM64 (v8a)", isApk: true },
        { name: "termux-app_apt-android-7-release_armeabi-v7a.apk", downloadUrl: "https://github.com/Akshay-86/termux-app/releases/download/latest/termux-app_apt-android-7-release_armeabi-v7a.apk", sizeFormatted: "29.1 MB", arch: "ARMv7", isApk: true },
        { name: "termux-app_apt-android-7-release_x86_64.apk", downloadUrl: "https://github.com/Akshay-86/termux-app/releases/download/latest/termux-app_apt-android-7-release_x86_64.apk", sizeFormatted: "31.9 MB", arch: "x86_64", isApk: true },
        { name: "termux-app_apt-android-7-release_x86.apk", downloadUrl: "https://github.com/Akshay-86/termux-app/releases/download/latest/termux-app_apt-android-7-release_x86.apk", sizeFormatted: "31.2 MB", arch: "x86", isApk: true },
      ],
    },
  },
  "Sign_Translator": {
    customTitle: "VoxIgnota (ASL Translator)",
    badge: "Edge AI / ASL",
    category: "android",
    featured: true,
    accent: "cyan",
    summary: "On-device real-time American Sign Language (ASL) gesture recognition translating camera video into natural text with zero cloud latency.",
    techStack: ["Kotlin", "Computer Vision", "TensorFlow Lite", "CameraX"],
    defaultRelease: {
      tagName: "v2.5.6",
      version: "v2.5.6",
      hasApk: true,
      primaryAsset: {
        name: "VoxIgnota.apk",
        downloadUrl: "https://github.com/Akshay-86/Sign_Translator/releases/download/v2.5.6/VoxIgnota.apk",
        sizeFormatted: "33.9 MB",
        arch: "Android APK",
        isApk: true,
      },
      allAssets: [
        { name: "VoxIgnota.apk", downloadUrl: "https://github.com/Akshay-86/Sign_Translator/releases/download/v2.5.6/VoxIgnota.apk", sizeFormatted: "33.9 MB", arch: "Android APK", isApk: true },
      ],
    },
  },
  "Akshay-86.github.io": {
    customTitle: "Portfolio OS",
    badge: "Multi-Theme Developer OS",
    category: "web",
    featured: true,
    accent: "amber",
    summary: "Personal developer operating system featuring 5 swappable UI styles (Minimal, Bento, Glass, Cyber, Terminal) with dynamic release tracking.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Firebase", "GitHub API"],
  },
  "WindowsDotFiles": {
    customTitle: "Windows Dotfiles & Setup",
    badge: "Systems & Workflow",
    category: "systems",
    featured: false,
    accent: "slate",
    summary: "Personal Windows workstation dotfiles, terminal configurations, automated shell scripts, and curated setup with video demo.",
    techStack: ["PowerShell", "Batch", "Windows Terminal", "Dotfiles"],
  },
  "MyWorld": {
    customTitle: "MyWorld 3D",
    badge: "3D Graphics & Models",
    category: "systems",
    featured: false,
    accent: "pink",
    summary: "3D scene and modeling project featuring packaged 3D asset archives and experimental graphics rendering.",
    techStack: ["C++", "3D Modeling", "Assets"],
  },
};

/**
 * Filter tags for project filtering
 */
export const PROJECT_FILTER_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "apk", label: "APKs & Releases 📱" },
  { id: "android", label: "Android & Kotlin" },
  { id: "systems", label: "C++ & Systems" },
  { id: "web", label: "Web & Fullstack" },
];
