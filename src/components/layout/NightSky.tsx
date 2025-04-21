
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

const PARALLAX_AMOUNT = 15; // px, how much stars move
const SHOOTING_STAR_FREQ = 10000;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

type NightSkyControls = {
  starCount: number;
  animationSpeed: number; // ms, lower = faster
  enabled: boolean;
};

const defaultControls: NightSkyControls = {
  starCount: 72,
  animationSpeed: 5000,
  enabled: true,
};

type NightSkyProps = {
  controls?: NightSkyControls;
  // You could extend with onSettingsChange, etc
};

const NightSky: React.FC<NightSkyProps> = ({
  controls = defaultControls,
}) => {
  const { theme } = useTheme();
  const shootingStarRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // For parallax, only activate on dark mode and desktop
  const parallaxHandler = useCallback(() => {
    if (theme !== "dark") return;
    const scrollY = window.scrollY;
    setParallax({
      x: 0,
      y: Math.max(-PARALLAX_AMOUNT, Math.min(PARALLAX_AMOUNT, scrollY * 0.2)),
    });
  }, [theme]);

  useEffect(() => {
    if (theme !== "dark") return;
    window.addEventListener("scroll", parallaxHandler, { passive: true });
    return () => window.removeEventListener("scroll", parallaxHandler);
  }, [theme, parallaxHandler]);

  // Shooting star animation
  useEffect(() => {
    if (theme !== "dark" || !controls.enabled || !shootingStarRef.current) return;
    let timeout: NodeJS.Timeout;
    let running = true;

    function trigger() {
      if (!running || !shootingStarRef.current) return;
      shootingStarRef.current.classList.remove("shooting-star-animate");
      void shootingStarRef.current.offsetWidth; // reflow
      shootingStarRef.current.classList.add("shooting-star-animate");

      timeout = setTimeout(
        trigger,
        randomBetween(SHOOTING_STAR_FREQ, SHOOTING_STAR_FREQ * 2) / (controls.animationSpeed / 5000)
      );
    }
    trigger();
    return () => {
      running = false;
      if (timeout) clearTimeout(timeout);
    };
  }, [theme, controls.enabled, controls.animationSpeed]);

  // If background disabled, render nothing (but leave div for layout stacking)
  if (!controls.enabled) {
    return (
      <div className="night-sky-bg pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700 dark:opacity-0 opacity-0" />
    );
  }

  return (
    <div
      className="night-sky-bg pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700 dark:opacity-100 opacity-0"
      style={{
        transform: `translateY(${parallax.y}px)`,
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 night-gradient-bg" />
      {/* Slight mist layer */}
      <div className="absolute inset-0 night-sky-mist" />
      {/* Twinkling stars */}
      {Array.from({ length: controls.starCount }).map((_, i) => {
        const size = randomBetween(1.2, 2.7);
        const style: React.CSSProperties = {
          top: `${randomBetween(2, 98)}%`,
          left: `${randomBetween(2, 98)}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: randomBetween(0.65, 0.96),
          animationDelay: `${randomBetween(0, 9)}s`,
          animationDuration: `${(
            randomBetween(2, 5.5) *
            (controls.animationSpeed / 5000)
          ).toFixed(2)}s`,
        };
        return <div key={i} className="night-star" style={style} />;
      })}
      {/* Single shooting star */}
      <div ref={shootingStarRef} className="shooting-star" />
      {/* Constellation (aesthetic, very light, top-right) */}
      <svg className="absolute right-6 top-7 z-0 pointer-events-none"
        width="110" height="66" fill="none" style={{opacity:0.14, filter:'blur(0.8px)'}}>
        <circle cx="100" cy="18" r="2" fill="#fff"/>
        <circle cx="35" cy="12" r="2.4" fill="#fff"/>
        <circle cx="70" cy="56" r="1.6" fill="#fff"/>
        <polyline points="100,18 35,12 70,56" stroke="#fff" strokeWidth="1" opacity="0.6" />
      </svg>
      {/* Decorative moon widget, bottom-left */}
      <div className="absolute left-8 bottom-8 z-10 pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10" fill="white" fillOpacity="0.16" />
          <circle cx="11" cy="11" r="7" fill="white" fillOpacity="0.17" />
          <ellipse cx="13" cy="11" rx="6.5" ry="7" fill="white" fillOpacity="0.33" />
        </svg>
      </div>
    </div>
  );
};

export default NightSky;
