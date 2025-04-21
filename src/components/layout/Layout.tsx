
import { ReactNode, useState } from "react";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NightSky from "@/components/layout/NightSky";
import { NightSkyControls } from "@/components/layout/NightSkyControls";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Footer } from "@/components/layout/Footer";
import { HowItWorksModal } from "@/components/HowItWorksModal";
import { DailyMotivation } from "@/components/DailyMotivation";

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

  const [isLoading, setIsLoading] = useState(true);
  // Loading screen for branding
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col items-stretch relative overflow-x-hidden">
        <Navbar />
        <NightSky controls={skyConfig} />
        <NightSkyControls
          starCount={skyConfig.starCount}
          animationSpeed={skyConfig.animationSpeed}
          enabled={skyConfig.enabled}
          onChange={vals => setSkyConfig(config => ({ ...config, ...vals }))}
        />
        <div className="absolute left-0 top-3 z-40">
          <HowItWorksModal />
        </div>
        <main className="flex-1 flex flex-col items-center pt-6 px-2 relative z-10">
          <div className="w-full max-w-3xl xl:max-w-5xl flex flex-col space-y-4 mt-2">
            <DailyMotivation />
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              <div className="flex-1 flex flex-col gap-6">
                {children}
              </div>
              {/* You can add more widgets or dashboards here */}
            </div>
          </div>
        </main>
        <Footer />
        {isLoading && <LoadingScreen />}
      </div>
    </ThemeProvider>
  );
}
