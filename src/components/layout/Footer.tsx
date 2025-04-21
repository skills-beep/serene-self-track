
import React from "react";

export const Footer = () => (
  <footer className="w-full flex justify-center gap-1 items-center py-4 text-xs text-slate-300/70 font-medium bg-transparent backdrop-blur-xl z-50 relative">
    <span>
      Made with <span className="animate-pulse inline-block">💙</span> by 
      <a
        href="https://github.com/your-profile"
        className="ml-1 underline text-primary hover:text-primary-foreground transition"
        target="_blank"
        rel="noopener"
      >
        Your Name
      </a>
    </span>
  </footer>
);
