"use client";

import React, { useState, useEffect } from 'react';

export default function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootSteps = [
    { text: "INITIALIZING KERNEL [AKSHAY_OS v1.0]...", delay: 400 },
    { text: "MOUNTING VIRTUAL FILE SYSTEMS...", delay: 800 },
    { text: "ESTABLISHING SECURE CONNECTION TO GITHUB MAINFRAME...", delay: 1400 },
    { text: "DOWNLOADING REPOSITORY METADATA (PUBLIC & PRIVATE)...", delay: 2000 },
    { text: "DECRYPTING PRIVATE SECTOR MODULES...", delay: 2500 },
    { text: "LOADING SHAPE-SHIFTER UI ENGINE...", delay: 2900 },
    { text: "PREPARING BENTO DASHBOARD...", delay: 3300 },
    { text: "SYSTEM READY. ACCESS GRANTED.", delay: 3800 },
  ];

  useEffect(() => {
    let timers = [];
    
    // Schedule texts
    bootSteps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, step.text]);
        setProgress(Math.round(((index + 1) / bootSteps.length) * 100));
      }, step.delay);
      timers.push(timer);
    });

    // End sequence
    const endTimer = setTimeout(() => {
      // Add a small delay after 100% to let the user read "ACCESS GRANTED"
      setTimeout(onComplete, 600);
    }, bootSteps[bootSteps.length - 1].delay);
    timers.push(endTimer);

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="fixed inset-0 z-[999999] bg-black text-[#00ff00] font-mono p-6 sm:p-12 flex flex-col justify-end overflow-hidden selection:bg-white selection:text-black">
      
      {/* Background Matrix/Grid Glitches optional */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}></div>

      <div className="relative z-10 max-w-3xl w-full mx-auto pb-12">
        <div className="mb-8 font-bold text-xl md:text-3xl text-white tracking-widest flex items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00ff00] flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
             <div className="w-4 h-4 bg-[#00ff00]"></div>
          </div>
          PORTFOLIO_OS // BOOT SEQUENCE
        </div>

        <div className="flex flex-col gap-2 mb-8 min-h-[300px] justify-end">
          {logs.map((log, idx) => (
            <div key={idx} className="text-sm md:text-lg animate-in fade-in slide-in-from-bottom-2 duration-100">
              <span className="text-gray-500 mr-4">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span> 
              <span dangerouslySetInnerHTML={{ __html: log.replace("ACCESS GRANTED", "<span class='text-white bg-green-700 px-2 py-1 font-bold'>ACCESS GRANTED</span>") }}></span>
            </div>
          ))}
          {/* Blinking Cursor */}
          {progress < 100 && (
            <div className="w-3 h-5 bg-[#00ff00] animate-pulse mt-2"></div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-900 overflow-hidden relative">
          <div 
            className="h-full bg-[#00ff00] shadow-[0_0_15px_#00ff00] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs mt-2 text-gray-500">{progress}% // SYS.MEM OK</div>
      </div>
    </div>
  );
}
