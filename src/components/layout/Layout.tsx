
import { ReactNode, useState } from "react";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NightSky from "@/components/layout/NightSky";
import { NightSkyControls } from "@/components/layout/NightSkyControls";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Save night sky config per session (could persist via localStorage if wanted)
  const [skyConfig, setSkyConfig] = useState({
    starCount: 72,
    animationSpeed: 5000,
    enabled: true,
  });

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col items-stretch bg-transparent relative">
        <Navbar />
        <NightSky controls={skyConfig} />
        <NightSkyControls
          starCount={skyConfig.starCount}
          animationSpeed={skyConfig.animationSpeed}
          enabled={skyConfig.enabled}
          onChange={vals => setSkyConfig(config => ({ ...config, ...vals }))}
        />
        <main className="flex-1 pb-12 relative z-10">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
