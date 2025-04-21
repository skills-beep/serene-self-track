
import React from "react";

// Minimal UI for demonstration; could be a floating panel or settings modal
type NightSkyControlsProps = {
  starCount: number;
  animationSpeed: number;
  enabled: boolean;
  onChange: (val: { starCount?: number; animationSpeed?: number; enabled?: boolean }) => void;
};
const starOptions = [
  { label: "Calm", value: 48 },
  { label: "Balanced", value: 72 },
  { label: "Vivid", value: 108 },
];
const speedOptions = [
  { label: "Gentle", value: 7000 },
  { label: "Natural", value: 5000 },
  { label: "Energetic", value: 3000 },
];
export const NightSkyControls: React.FC<NightSkyControlsProps> = ({
  starCount, animationSpeed, enabled, onChange
}) => (
  <div className="fixed right-3 bottom-5 z-40 bg-slate-900/40 dark:bg-black/30 border border-white/10 backdrop-blur-lg rounded-xl shadow-md p-3 flex flex-col gap-1 items-stretch w-[216px] space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/85 tracking-wide">Night Sky</span>
      <label className="inline-flex items-center gap-1 cursor-pointer ml-auto">
        <input
          type="checkbox"
          checked={enabled}
          onChange={e => onChange({ enabled: e.target.checked })}
          className="w-4 h-4 accent-primary-foreground"
        />
        <span className="text-xs text-white/70">Animation</span>
      </label>
    </div>
    <div className="flex items-center justify-between text-xs text-white/70 mb-1">
      <span>Star Count</span>
      <div className="flex gap-1">
        {starOptions.map(opt => (
          <button
            key={opt.value}
            className={`px-2 py-[2px] bg-white/5 rounded hover:bg-primary/40 transition shadow 
              ${starCount === opt.value ? "ring-2 ring-primary" : ""}`}
            onClick={() => onChange({ starCount: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center justify-between text-xs text-white/70 mb-1">
      <span>Speed</span>
      <div className="flex gap-1">
        {speedOptions.map(opt => (
          <button
            key={opt.value}
            className={`px-2 py-[2px] bg-white/5 rounded hover:bg-primary/40 transition shadow 
              ${animationSpeed === opt.value ? "ring-2 ring-primary" : ""}`}
            onClick={() => onChange({ animationSpeed: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);
