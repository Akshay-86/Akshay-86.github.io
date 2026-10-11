"use client";

import React from "react";
import { PROJECT_FILTER_CATEGORIES } from "@/data/portfolioData";

export default function ProjectFilterBar({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  visibleCount,
}) {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {PROJECT_FILTER_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-md scale-105"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search Input and Counter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 md:w-56">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects..."
            className="w-full px-3.5 py-1.5 pl-8 text-xs rounded-full bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 outline-none focus:border-blue-500 transition-colors"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500 shrink-0">
          {visibleCount} of {totalCount}
        </span>
      </div>
    </div>
  );
}
