
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Droplet, Plus, Minus, Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Sample water logs for the day
const waterLogs = [
  { time: "8:30 AM", amount: 1 },
  { time: "10:15 AM", amount: 1 },
  { time: "12:45 PM", amount: 1 },
  { time: "3:20 PM", amount: 1 },
  { time: "6:00 PM", amount: 1 },
];

const Water = () => {
  const [waterGoal, setWaterGoal] = useState(8);
  const [currentIntake, setCurrentIntake] = useState(5);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [editingGoal, setEditingGoal] = useState(false);
  
  // Calculate progress
  const progress = Math.min(Math.round((currentIntake / waterGoal) * 100), 100);
  
  // Add water
  const addWater = () => {
    if (currentIntake < waterGoal) {
      setCurrentIntake(prev => Math.min(prev + 1, waterGoal));
    }
  };
  
  // Remove water
  const removeWater = () => {
    if (currentIntake > 0) {
      setCurrentIntake(prev => prev - 1);
    }
  };
  
  // Update goal
  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWaterGoal(value);
    }
  };
  
  return (
    <Layout>
      <div className="wellness-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Water Intake</h1>
            <p className="text-muted-foreground">Track your daily hydration</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Water Tracker */}
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle>Today's Intake</CardTitle>
              <CardDescription>Track cups of water (8oz/240ml)</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressRing 
                progress={progress} 
                size={200}
                strokeWidth={12}
                showPercentage={false}
                circleClass="text-wellness-blue-DEFAULT"
              >
                <div className="flex flex-col items-center justify-center">
                  <Droplet className="h-8 w-8 text-wellness-blue-DEFAULT mb-1" />
                  <div className="text-3xl font-bold">{currentIntake}</div>
                  <div className="text-xs text-muted-foreground">of {waterGoal} cups</div>
                </div>
              </ProgressRing>
              
              <div className="mt-8 flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={removeWater}
                  disabled={currentIntake <= 0}
                  className="rounded-full h-12 w-12"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <Button 
                  variant="default" 
                  size="icon" 
                  onClick={addWater}
                  disabled={currentIntake >= waterGoal}
                  className="rounded-full h-16 w-16 bg-wellness-blue-DEFAULT hover:bg-wellness-blue-dark"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="mt-8 grid grid-cols-8 gap-2">
                {Array.from({ length: waterGoal }).map((_, i) => (
                  <div 
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      i < currentIntake 
                        ? "bg-wellness-blue-DEFAULT text-white animate-scale-in" 
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-xs">{i + 1}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Settings and Logs */}
          <div className="space-y-6">
            {/* Goal Settings */}
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle>Water Goal</CardTitle>
              </CardHeader>
              <CardContent>
                {editingGoal ? (
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="waterGoal">Daily water target (cups)</Label>
                      <Input 
                        type="number" 
                        id="waterGoal" 
                        value={waterGoal} 
                        onChange={handleGoalChange}
                        min={1}
                        max={20}
                        className="w-full"
                      />
                    </div>
                    <Button onClick={() => setEditingGoal(false)}>Save Goal</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Current Goal</div>
                        <div className="text-3xl font-bold">{waterGoal} cups</div>
                        <div className="text-sm text-muted-foreground">(~{waterGoal * 8} oz / {waterGoal * 240}ml)</div>
                      </div>
                      <Button variant="outline" onClick={() => setEditingGoal(true)}>
                        Edit
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Reminders */}
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle>Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {remindersEnabled ? (
                      <Bell className="h-5 w-5 text-primary" />
                    ) : (
                      <BellOff className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span>Hydration Reminders</span>
                  </div>
                  <Switch
                    checked={remindersEnabled}
                    onCheckedChange={setRemindersEnabled}
                  />
                </div>
                
                {remindersEnabled && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    You'll be reminded to drink water every 2 hours between 8:00 AM and 8:00 PM
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Logs */}
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle>Today's Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {waterLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div className="font-medium">{log.time}</div>
                      <div className="flex items-center">
                        <Droplet className="h-4 w-4 text-wellness-blue-DEFAULT mr-1" />
                        <span>{log.amount} cup</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Water;
