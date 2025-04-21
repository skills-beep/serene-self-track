
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

const STAR_COUNT = 96;
const SHOOTING_STAR_FREQ = 10000; // ms

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const NightSky = () => {
  const { theme } = useTheme();
  const shootingStarRef = useRef<HTMLDivElement>(null);

  // Occasionally show shooting stars
  useEffect(() => {
    if (theme !== "dark" || !shootingStarRef.current) return;
    let timeout: NodeJS.Timeout;
    let running = true;

    function trigger() {
      if (!running || !shootingStarRef.current) return;
      shootingStarRef.current.classList.remove("shooting-star-animate");
      // Reset animation
      void shootingStarRef.current.offsetWidth;
      shootingStarRef.current.classList.add("shooting-star-animate");

      timeout = setTimeout(trigger, randomBetween(SHOOTING_STAR_FREQ, SHOOTING_STAR_FREQ * 2));
    }

    trigger();
    return () => {
      running = false;
      if (timeout) clearTimeout(timeout);
    };
  }, [theme]);

  return (
    <div className="night-sky-bg pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700 dark:opacity-100 opacity-0">
      {/* Gradient background */}
      <div className="absolute inset-0 night-gradient-bg" />
      {/* Slight mist layer */}
      <div className="absolute inset-0 night-sky-mist" />
      {/* Twinkling stars */}
      {Array.from({ length: STAR_COUNT }).map((_, i) => {
        const size = randomBetween(1.2, 2.7);
        const style: React.CSSProperties = {
          top: `${randomBetween(2, 98)}%`,
          left: `${randomBetween(2, 98)}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: randomBetween(0.65, 0.96),
          animationDelay: `${randomBetween(0, 9)}s`,
          animationDuration: `${randomBetween(2, 5.5)}s`,
        };
        return (
          <div
            key={i}
            className="night-star"
            style={style}
          />
        );
      })}
      {/* Single shooting star */}
      <div ref={shootingStarRef} className="shooting-star" />
      {/* Optional: Add soft constellation effect */}
      <svg className="absolute left-1/4 top-1/3 z-0"
        width="120" height="80" fill="none" style={{opacity:0.17, filter:'blur(0.5px)'}}>
        <circle cx="20" cy="40" r="2" fill="#fff"/>
        <circle cx="50" cy="30" r="2.6" fill="#fff"/>
        <circle cx="90" cy="70" r="1.4" fill="#fff"/>
        <polyline points="20,40 50,30 90,70" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
      </svg>
    </div>
  );
};

export default NightSky;
