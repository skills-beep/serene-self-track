
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NightSky from "@/components/layout/NightSky";
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
          <NightSky />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
