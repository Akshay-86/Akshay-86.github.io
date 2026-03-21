"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "", animation = "fade-up", delay = 0, duration = 1000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the element fully hits bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Base transition tailwind classes
  const baseClasses = "ease-out fill-mode-forwards";
  
  let transitionStyles = {
    transitionProperty: "all",
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  let hiddenClasses = "";
  let visibleClasses = "";

  // Assign different animation classes based on the requested style
  switch (animation) {
    case "fade-up":
      hiddenClasses = "opacity-0 translate-y-16";
      visibleClasses = "opacity-100 translate-y-0";
      break;
    case "fade-down":
      hiddenClasses = "opacity-0 -translate-y-16";
      visibleClasses = "opacity-100 translate-y-0";
      break;
    case "fade-left":
      hiddenClasses = "opacity-0 translate-x-16";
      visibleClasses = "opacity-100 translate-x-0";
      break;
    case "fade-right":
      hiddenClasses = "opacity-0 -translate-x-16";
      visibleClasses = "opacity-100 translate-x-0";
      break;
    case "zoom-in":
      hiddenClasses = "opacity-0 scale-90";
      visibleClasses = "opacity-100 scale-100";
      break;
    case "zoom-out":
      hiddenClasses = "opacity-0 scale-110";
      visibleClasses = "opacity-100 scale-100";
      break;
    case "blur-in":
      hiddenClasses = "opacity-0 blur-xl scale-95";
      visibleClasses = "opacity-100 blur-0 scale-100";
      break;
    case "cyber-glitch":
      hiddenClasses = "opacity-0 translate-x-24 skew-x-12 blur-sm";
      visibleClasses = "opacity-100 translate-x-0 skew-x-0 blur-0";
      break;
    case "git-branch":
      hiddenClasses = "opacity-0 -translate-x-8 scale-95";
      visibleClasses = "opacity-100 translate-x-0 scale-100";
      break;
    default:
      hiddenClasses = "opacity-0";
      visibleClasses = "opacity-100";
  }

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses} ${className}`}
      style={transitionStyles}
    >
      {children}
    </div>
  );
}
