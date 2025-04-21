
import React, { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

const QUOTES = [
  "Small steps every day lead to big changes.",
  "Focus on progress, not perfection.",
  "A little progress each day adds up to big results.",
  "You are stronger than you think.",
  "Rest, hydrate, repeat. You’re doing great.",
  "The best project you'll ever work on is you.",
  "Breathe in courage, breathe out doubt.",
  "Wellness is a journey, not a destination.",
  "Every workout counts. Every glass matters.",
  "Dream big. Start small. Act now.",
  "Your only limit is your mind.",
];

function getQuoteOfDay() {
  // Pick quote based on day of year for static "daily" display
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return QUOTES[day % QUOTES.length];
}

export const DailyMotivation: React.FC = () => {
  const [showQuote, setShowQuote] = useState(getQuoteOfDay());
  const [refreshKey, setRefreshKey] = useState(0);

  function getRandomQuote() {
    let i = Math.floor(Math.random() * QUOTES.length);
    if (QUOTES[i] === showQuote) i = (i + 1) % QUOTES.length;
    return QUOTES[i];
  }

  const handleRefresh = () => {
    setShowQuote(getRandomQuote());
    setRefreshKey(k => k + 1);
  };

  return (
    <section className="glass-morphism rounded-2xl px-6 py-4 w-full max-w-lg mx-auto mb-6 
      shadow-lg border border-white/10 backdrop-blur-md bg-white/5
      flex items-center space-x-4 animate-fade-in"
      style={{ minHeight: 56, marginTop: 10, background: "linear-gradient(90deg,rgba(18,30,53,.29),rgba(63,71,112,.17))" }}
      aria-label="Daily Motivation"
    >
      <span className="text-2xl select-none" style={{textShadow:"0 0 6px #fff7,0 0 12px #8bb6ff38"}}>✨</span>
      <span className="flex-1 font-semibold text-base md:text-lg text-slate-100/95 drop-shadow-sm fade-in-quote"
        key={refreshKey}
      >
        {showQuote}
      </span>
      <button
        onClick={handleRefresh}
        title="Refresh Quote"
        className="ml-2 p-1.5 rounded-full border-none backdrop-blur bg-white/5 focus:outline-none hover:animate-twinkle-shimmer"
        tabIndex={0}
        aria-label="Refresh Quote"
      >
        <RefreshCw className="h-5 w-5 text-primary/80 hover:animate-twinkle-shimmer transition" />
      </button>
    </section>
  );
};
