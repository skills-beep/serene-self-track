
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Check, Plus } from "lucide-react";
import { useState } from "react";

// Sample exercise data
const defaultExercises = [
  { id: 1, name: "Morning Walk (15 min)", completed: true },
  { id: 2, name: "Push-ups (10 reps)", completed: true },
  { id: 3, name: "Squats (15 reps)", completed: false },
  { id: 4, name: "Stretching (5 min)", completed: false },
  { id: 5, name: "Plank (30 sec)", completed: false },
];

const Exercise = () => {
  const [exercises, setExercises] = useState(defaultExercises);
  const [newExercise, setNewExercise] = useState("");
  const [addingExercise, setAddingExercise] = useState(false);
  
  // Toggle exercise completion
  const toggleExercise = (id: number) => {
    setExercises(prev => 
      prev.map(exercise => 
        exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise
      )
    );
  };
  
  // Add new exercise
  const handleAddExercise = () => {
    if (newExercise.trim()) {
      const maxId = Math.max(...exercises.map(ex => ex.id), 0);
      setExercises(prev => [
        ...prev,
        { id: maxId + 1, name: newExercise.trim(), completed: false }
      ]);
      setNewExercise("");
      setAddingExercise(false);
    }
  };
  
  // Calculate progress
  const completedCount = exercises.filter(ex => ex.completed).length;
  const progress = Math.round((completedCount / exercises.length) * 100);
  
  return (
    <Layout>
      <div className="wellness-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Daily Exercise</h1>
            <p className="text-muted-foreground">Track your workout progress</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button 
              onClick={() => setAddingExercise(!addingExercise)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Exercise
            </Button>
          </div>
        </div>
        
        {/* Progress Overview */}
        <Card className="card-wellness mb-8">
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <Activity className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-3xl font-bold">{completedCount}/{exercises.length}</div>
                  <div className="text-sm text-muted-foreground">Exercises Completed</div>
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{progress}% Complete</span>
                  <span>{exercises.length - completedCount} remaining</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Add Exercise Form */}
        {addingExercise && (
          <Card className="card-wellness mb-6 animate-fade-in">
            <CardHeader>
              <CardTitle>Add New Exercise</CardTitle>
              <CardDescription>Create a custom exercise to track</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="newExercise">Exercise name</Label>
                  <Input 
                    type="text" 
                    id="newExercise" 
                    placeholder="e.g., Yoga (20 min)"
                    value={newExercise}
                    onChange={(e) => setNewExercise(e.target.value)}
                  />
                </div>
                <Button 
                  className="mt-auto"
                  onClick={handleAddExercise}
                  disabled={!newExercise.trim()}
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Exercise List */}
        <Card className="card-wellness">
          <CardHeader>
            <CardTitle>Daily Exercises</CardTitle>
            <CardDescription>Check off items as you complete them</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exercises.map((exercise) => (
                <div key={exercise.id} className="exercise-item group">
                  <div className="flex items-center space-x-3 flex-1">
                    <Checkbox
                      id={`exercise-${exercise.id}`}
                      checked={exercise.completed}
                      onCheckedChange={() => toggleExercise(exercise.id)}
                    />
                    <label
                      htmlFor={`exercise-${exercise.id}`}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        exercise.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {exercise.name}
                    </label>
                  </div>
                  
                  {exercise.completed && (
                    <div className="flex items-center text-xs text-primary animate-fade-in">
                      <Check className="h-3 w-3 mr-1" />
                      Completed
                    </div>
                  )}
                </div>
              ))}
              
              {exercises.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No exercises added yet. Add your first exercise to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Exercise;
