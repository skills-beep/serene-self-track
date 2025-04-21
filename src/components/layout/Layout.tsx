
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pb-12">
          <NightSkyEffect />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}

function NightSkyEffect() {
  return (
    <div className="night-bg fixed inset-0 -z-10 pointer-events-none opacity-0 transition-opacity duration-1000 dark:opacity-100">
      {/* Generate random stars with different sizes and positions */}
      {Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        // Different animation delays
        const animationDelay = `${Math.random() * 5}s`;
        
        return (
          <div
            key={i}
            className="star"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              animationDelay,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        );
      })}
      
      {/* Moon */}
      <div 
        className="moon"
        style={{
          top: '10%',
          right: '10%',
          boxShadow: 'inset -8px -8px 0 0 rgba(200, 200, 200, 0.4)'
        }}
      />
    </div>
  );
}
