"use client";

import React, { useEffect, useState } from "react";
import ScreenshotModal from "./ScreenshotModal";

export default function ProjectDetailModal({ project, onClose }) {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [showAllAssets, setShowAllAssets] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedScreenshot) {
          setSelectedScreenshot(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, selectedScreenshot]);

  if (!project) return null;

  const release = project.latestRelease;
  const assets = release?.allAssets || [];
  const primaryAsset = release?.primaryAsset;
  const hasMultipleAssets = assets.length > 1;
  const previews = project.previews || [];
  const commits = project.recentCommits || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-white dark:bg-[#111625] text-slate-900 dark:text-neutral-100 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-[scaleUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="space-y-2 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {project.customTitle || project.name}
              </h2>
              {project.version && (
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/50">
                  {project.version}
                </span>
              )}
              {project.badge && (
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-300 dark:border-blue-800/50">
                  {project.badge}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-neutral-400">
              {project.language && (
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {project.language}
                </span>
              )}
              {project.stargazers_count !== undefined && (
                <span className="flex items-center gap-1">
                  ⭐ {project.stargazers_count} stars
                </span>
              )}
              {project.forks_count !== undefined && (
                <span className="flex items-center gap-1">
                  🍴 {project.forks_count} forks
                </span>
              )}
              {project.fork && (
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 font-mono text-[11px]">
                  Fork
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
            title="Close modal (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Direct Release / APK Download Banner */}
          {primaryAsset && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-blue-950/30 border border-emerald-500/20 dark:border-emerald-700/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base sm:text-lg">
                      {release?.hasApk ? "📱" : "📦"}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {release?.hasApk ? "Direct APK Installation" : "Official Release Asset"}
                    </h3>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {project.version || release?.tagName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {primaryAsset.arch} package ready to download • {primaryAsset.sizeFormatted}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={primaryAsset.downloadUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg hover:shadow-emerald-600/25 transition-all inline-flex items-center gap-2"
                  >
                    <span>⬇️ Download {primaryAsset.arch}</span>
                    <span className="text-emerald-200 text-xs font-normal">
                      ({primaryAsset.sizeFormatted})
                    </span>
                  </a>

                  {hasMultipleAssets && (
                    <button
                      type="button"
                      onClick={() => setShowAllAssets(!showAllAssets)}
                      className="px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                      title="View all device architectures"
                    >
                      {showAllAssets ? "Hide All ▲" : `All Archs (${assets.length}) ▼`}
                    </button>
                  )}
                </div>
              </div>

              {/* Multi-Architecture Download Selector */}
              {showAllAssets && hasMultipleAssets && (
                <div className="mt-4 pt-4 border-t border-emerald-500/20 dark:border-emerald-700/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Available Architecture Builds:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {assets.map((asset, aIdx) => (
                      <a
                        key={aIdx}
                        href={asset.downloadUrl}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-slate-800 transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {asset.arch}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono truncate">
                            {asset.name}
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                          {asset.sizeFormatted} ⬇️
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Project Summary / Architecture Motivation */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Architecture & Overview
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-neutral-300 font-light">
              {project.summary || project.description || "An exploration of robust software engineering and system design."}
            </p>
          </div>

          {/* Tech Stack Chips (if available) */}
          {project.techStack && project.techStack.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Technologies & Standards
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Screenshot Gallery - ONLY shown when previews exist (ZERO empty placeholders!) */}
          {previews.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  Application Screenshots ({previews.length})
                </h3>
                <span className="text-[11px] text-slate-400">Click any image to expand</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3 custom-scrollbar">
                {previews.map((prev, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setSelectedScreenshot(prev)}
                    className="group relative shrink-0 w-28 sm:w-36 aspect-[9/16] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:scale-105 transition-all text-left bg-slate-100 dark:bg-slate-900 cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prev.url}
                      alt={prev.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-[10px] text-white font-medium truncate">
                      {prev.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Release Notes / Body (if available) */}
          {release?.body && (
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Release Notes
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed custom-scrollbar">
                {release.body}
              </div>
            </div>
          )}

          {/* Recent Git Commits Timeline */}
          {commits.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Recent Git Commits
              </h3>
              <div className="space-y-2">
                {commits.map((commitData) => (
                  <div
                    key={commitData.sha}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-slate-400 dark:text-slate-500 text-[11px] shrink-0">
                        {commitData.sha?.substring(0, 7)}
                      </span>
                      <p className="font-medium text-slate-800 dark:text-neutral-200 truncate">
                        {commitData.commit?.message?.split("\n")[0]}
                      </p>
                    </div>
                    {commitData.commit?.author?.date && (
                      <span className="text-slate-400 text-[11px] shrink-0 font-mono">
                        {new Date(commitData.commit.author.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
          {project.html_url ? (
            <a
              href={project.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5"
            >
              <span>View Source on GitHub</span>
              <span>↗</span>
            </a>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      <ScreenshotModal image={selectedScreenshot} onClose={() => setSelectedScreenshot(null)} />
    </div>
  );
}
