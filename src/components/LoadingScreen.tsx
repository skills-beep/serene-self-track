
import React, { useEffect, useState } from "react";

const logo = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="20" fill="#9b87f5" opacity="0.28"/>
    <circle cx="22" cy="22" r="13" fill="#fff" opacity="0.13"/>
    <ellipse cx="28" cy="16" rx="9" ry="11" fill="#9b87f5" opacity="0.15"/>
  </svg>
);

export const LoadingScreen: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-indigo-900/85 via-slate-950/80 to-black/90 backdrop-blur-xl transition-opacity animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-scale-in">
          {logo}
        </div>
        <span className="text-xl font-bold text-white/90 tracking-wide">
          SereneSelf<br />Fitness
        </span>
        <span className="animate-pulse text-sm text-white/60 mt-2">
          Loading...
        </span>
      </div>
    </div>
  );
};
