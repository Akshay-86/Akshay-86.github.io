"use client";

import React, { useEffect } from "react";

export default function ScreenshotModal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] flex flex-col items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="w-full flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-white">
          <span className="font-mono text-xs text-slate-300 font-bold truncate">
            {image.title || "Preview Screenshot"}
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Image Display */}
        <div className="p-2 sm:p-4 flex items-center justify-center max-h-[80vh] overflow-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={image.title || "Screenshot preview"}
            className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
