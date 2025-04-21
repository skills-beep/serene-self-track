
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { BarChart } from "@/components/ui/chart";
import { Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Sample quotes for motivation
const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Health is a relationship between you and your body.",
  "Good things come to those who sweat.",
  "Take care of your body. It's the only place you have to live.",
  "Your body hears everything your mind says."
];

const Index = () => {
  // Get a random quote
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  
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
  
  return (
    <Layout>
      <div className="wellness-container">
        {/* Motivational Quote */}
        <div className="mb-8 text-center">
          <blockquote className="text-xl italic text-muted-foreground">
            "{quote}"
          </blockquote>
        </div>
        
        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sleep Card */}
          <Card className="card-wellness">
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
          </Card>
          
          {/* Water Card */}
          <Card className="card-wellness">
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
          </Card>
          
          {/* Exercise Card */}
          <Card className="card-wellness">
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
                      style={{ width: `${(exercises.filter(e => e.completed).length / exercises.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
