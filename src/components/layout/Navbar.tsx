
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun, Activity, Droplet, Bed, LayoutDashboard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/sleep", label: "Sleep", icon: <Bed className="h-5 w-5" /> },
    { path: "/water", label: "Water", icon: <Droplet className="h-5 w-5" /> },
    { path: "/exercise", label: "Exercise", icon: <Activity className="h-5 w-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-lg hidden md:inline-block">Wellness Tracker</span>
        </div>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {isMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8"></line>
                    <line x1="4" y1="16" x2="20" y2="16"></line>
                  </>
                )}
              </svg>
            </Button>
          </>
        ) : (
          <div className="mx-6 flex flex-1 items-center justify-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 animate-scale-in" />
            ) : (
              <Moon className="h-5 w-5 animate-scale-in" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 z-40 bg-background border-b animate-fade-in">
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
