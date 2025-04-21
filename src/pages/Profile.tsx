
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Bell, User, Settings } from "lucide-react";

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  
  return (
    <Layout>
      <div className="wellness-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Info */}
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              
              <Separator />
              
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Alex Johnson" />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex@example.com" />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue="32" />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <Select defaultValue="male">
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button>Update Profile</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Settings */}
          <div className="space-y-6">
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle>Health Goals</CardTitle>
                <CardDescription>Set your wellness targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="sleepGoal">Sleep Goal (hours)</Label>
                  <Input id="sleepGoal" type="number" defaultValue="8" min="4" max="12" />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="waterGoal">Daily Water (cups)</Label>
                  <Input id="waterGoal" type="number" defaultValue="8" min="1" max="20" />
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="exerciseGoal">Weekly Exercise (days)</Label>
                  <Input id="exerciseGoal" type="number" defaultValue="5" min="1" max="7" />
                </div>
                
                <Button>Save Goals</Button>
              </CardContent>
            </Card>
            
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="grid gap-1.5">
                  <Label htmlFor="units">Unit System</Label>
                  <Select defaultValue="imperial">
                    <SelectTrigger id="units">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial (oz, lb)</SelectItem>
                      <SelectItem value="metric">Metric (ml, kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-1.5">
                  <Label htmlFor="startOfWeek">Start of Week</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger id="startOfWeek">
                      <SelectValue placeholder="Select first day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
