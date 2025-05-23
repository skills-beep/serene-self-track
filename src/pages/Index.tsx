import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { BarChart } from "@/components/ui/chart";
import { Check, Calendar, RefreshCw, CloudSun, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Sample quotes for motivation
const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Health is a relationship between you and your body.",
  "Good things come to those who sweat.",
  "Take care of your body. It's the only place you have to live.",
  "Your body hears everything your mind says.",
  "Small steps every day lead to big changes.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The difference between trying and winning is giving up.",
  "Push yourself because no one else is going to do it for you.",
  "The hard days are what make you stronger."
];

// Mood types
const moods = ["Great", "Good", "Okay", "Low", "Tired"];

const Index = () => {
  // Get a random quote
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  
  // Sample data - in a real app this would come from a database or API
  const sleepData = {
    hours: 7.5,
    weeklyData: [6.5, 7, 8, 7.5, 6, 9, 7.5],
    average: 7.4,
  };
  
  const waterData = {
    current: 5,
    goal: 8,
    progress: 62.5, // 5/8 * 100
  };
  
  const exercises = [
    { id: 1, name: "Morning Walk", completed: true },
    { id: 2, name: "Push-ups (10 reps)", completed: true },
    { id: 3, name: "Squats (15 reps)", completed: false },
    { id: 4, name: "Stretching", completed: false },
  ];

  // Streak data
  const streakData = {
    current: 5,
    best: 12,
    lastCompleted: "2025-04-20",
  };

  // Weather data - this would come from an API in a real app
  const weatherData = {
    temp: 72,
    condition: "Clear Sky",
    icon: CloudSun,
  };

  // State for mood tracker
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Get new quote on refresh
  const refreshQuote = () => {
    let newQuote = quote;
    while (newQuote === quote) {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
    setQuote(newQuote);
  };

  // Check for a new day
  useEffect(() => {
    const today = new Date().getDay();
    if (today !== currentDay) {
      refreshQuote();
      setCurrentDay(today);
    }
  }, [currentDay]);
  
  return (
    <Layout>
      <div className="wellness-container pt-8">
        {/* Daily Motivation - Glassmorphism Card */}
        <div className="mx-auto max-w-2xl mb-8 px-4 z-30">
          <div className="relative bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/15 shadow-2xl rounded-2xl transition-all duration-500 animate-fade-in flex items-center gap-2 w-full py-3 px-6"
            style={{ boxShadow: "0 2px 32px 0 rgba(110,162,217,0.14), 0 0 0 1px #fff1" }}
          >
            <span className="inline-flex justify-center items-center p-2 rounded-full bg-primary/30 shadow-sm ring-2 ring-white/10 mr-3">
              <Sparkles className="h-5 w-5 text-primary animate-pulse-glow drop-shadow-[0_0_8px_rgba(131,186,255,0.62)]" />
            </span>
            <blockquote className="text-lg md:text-xl font-medium text-white/95 dark:text-white/95 italic flex-1 transition">
              "{quote}"
            </blockquote>
            <Button
              variant="ghost"
              size="icon"
              aria-label="New Quote"
              onClick={refreshQuote}
              className="group text-primary/80 hover:text-primary/100 relative ml-2 rounded-full"
            >
              <span className="absolute -inset-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition" />
              <RefreshCw className="h-5 w-5 animate-none group-hover:animate-twinkle-shimmer" />
            </Button>
          </div>
        </div>
        
        {/* Main Dashboard Grid - Using glassmorphism */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {/* Sleep Card */}
          <div className="bg-white/12 dark:bg-white/14 backdrop-blur-lg border border-white/15 rounded-2xl shadow-xl shadow-primary/10 hover:shadow-2xl transition-all duration-400 card-wellness flex flex-col"
            style={{ boxShadow: "0 6px 36px 0 rgba(105,160,255,0.07), 0 0 0 1px #fff2" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Sleep</CardTitle>
              <Link to="/sleep">
                <Button variant="ghost" size="sm">Details</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <div className="text-3xl font-bold">{sleepData.hours}</div>
                <div className="text-sm text-muted-foreground">hours last night</div>
              </div>
              
              <div className="mt-4 h-[180px]">
                <BarChart 
                  data={sleepData.weeklyData.map((value, index) => ({ 
                    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index], 
                    value 
                  }))}
                  valueFormatter={(value) => `${value}h`}
                  categories={["value"]}
                  colors={["primary"]}
                  className="h-full"
                />
              </div>
              
              <div className="mt-2 text-sm text-muted-foreground">
                Weekly average: {sleepData.average}h
              </div>
            </CardContent>
          </div>
          
          {/* Water Card */}
          <div className="bg-white/12 dark:bg-white/14 backdrop-blur-lg border border-white/15 rounded-2xl shadow-xl shadow-sky-300/12 hover:shadow-2xl transition-all duration-400 card-wellness flex flex-col"
            style={{ boxShadow: "0 6px 36px 0 rgba(45,165,218,0.08), 0 0 0 1px #fff2" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Water Intake</CardTitle>
              <Link to="/water">
                <Button variant="ghost" size="sm">Details</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <ProgressRing 
                  progress={waterData.progress} 
                  size={150}
                  showPercentage={false}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold">{waterData.current}</div>
                    <div className="text-xs text-muted-foreground">of {waterData.goal} cups</div>
                  </div>
                </ProgressRing>
                
                <div className="mt-4 grid grid-cols-8 gap-2">
                  {Array.from({ length: waterData.goal }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        i < waterData.current 
                          ? "bg-primary text-primary-foreground animate-scale-in" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="text-xs">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>
          
          {/* Exercise Card */}
          <div className="bg-white/12 dark:bg-white/14 backdrop-blur-lg border border-white/15 rounded-2xl shadow-xl shadow-primary/12 hover:shadow-2xl transition-all duration-400 card-wellness flex flex-col"
            style={{ boxShadow: "0 6px 36px 0 rgba(95,155,218,0.10), 0 0 0 1px #fff2" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Daily Exercise</CardTitle>
              <Link to="/exercise">
                <Button variant="ghost" size="sm">Details</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="exercise-item">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border ${
                      exercise.completed 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "border-muted-foreground"
                    } flex items-center justify-center`}>
                      {exercise.completed && <Check className="h-4 w-4" />}
                    </div>
                    <span className={exercise.completed ? "line-through opacity-70" : ""}>
                      {exercise.name}
                    </span>
                  </div>
                ))}
                
                <div className="pt-2">
                  <div className="text-sm text-muted-foreground">
                    Completed {exercises.filter(e => e.completed).length} of {exercises.length} tasks
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
                      style={{ width: `${(exercises.filter(e => e.completed).length / exercises.length) *
                      100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </div>

          {/* New Card: Mood Tracker */}
          <div className="bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl shadow-lg hover:shadow-blue-600/20 transition-all duration-400 card-wellness flex flex-col"
            style={{ boxShadow: "0 4px 28px 0 rgba(77,146,255,0.07), 0 0 0 1px #fff1" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Today's Mood</CardTitle>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { weekday: 'long' })}
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="text-sm text-muted-foreground mb-2">How are you feeling today?</div>
                <div className="flex justify-between w-full max-w-sm">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`p-2 rounded-full transition-all w-12 h-12 flex items-center justify-center ${
                        selectedMood === mood
                          ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <span className="text-xs">{mood}</span>
                    </button>
                  ))}
                </div>
                {selectedMood && (
                  <div className="mt-4 text-center animate-fade-in">
                    <p>You're feeling <span className="font-semibold">{selectedMood}</span> today.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </div>

          {/* New Card: Goal Streak */}
          <div className="bg-white/12 dark:bg-white/14 backdrop-blur-lg border border-white/15 rounded-2xl shadow-xl shadow-primary/10 hover:shadow-2xl transition-all duration-400 card-wellness flex flex-col"
            style={{ boxShadow: "0 4px 24px 0 rgba(118,151,255,0.08), 0 0 0 1px #fff2" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Goal Streak</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold mb-2">{streakData.current}</div>
                <div className="text-sm text-muted-foreground">days in a row</div>
                
                <div className="w-full mt-6 grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`h-8 rounded-md flex items-center justify-center text-xs ${
                        i < streakData.current % 7 
                          ? "bg-primary/20 text-primary-foreground border border-primary/30" 
                          : "bg-muted/30 text-muted-foreground"
                      }`}
                    >
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm">
                  <span className="text-muted-foreground">Best streak: </span>
                  <span className="font-medium">{streakData.best} days</span>
                </div>
              </div>
            </CardContent>
          </div>

          {/* New Card: Weather Widget */}
          <div className="bg-white/9 dark:bg-white/13 backdrop-blur-lg border border-white/15 rounded-2xl shadow-xl shadow-blue-200/15 hover:shadow-2xl transition-all duration-400 card-wellness flex flex-col"
            style={{ boxShadow: "0 2px 18px 0 rgba(83,137,255,0.09), 0 0 0 1px #fff2" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Weather</CardTitle>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <weatherData.icon className="h-16 w-16 text-primary mb-2" />
                <div className="text-3xl font-bold">{weatherData.temp}°F</div>
                <div className="text-sm text-muted-foreground">{weatherData.condition}</div>
                
                <div className="mt-4 w-full pt-4 border-t border-border/50">
                  <div className="text-sm">
                    <p>Perfect weather for your evening workout!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
