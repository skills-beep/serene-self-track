
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/ui/chart";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bed, Clock } from "lucide-react";

const sleepQualityLabels = ["Poor", "Fair", "Good", "Excellent"];

// Sample sleep data
const sleepLogs = [
  { date: "Apr 20", hours: 7.5, quality: 3, bedtime: "11:30 PM", wakeup: "7:00 AM" },
  { date: "Apr 19", hours: 6.0, quality: 2, bedtime: "12:45 AM", wakeup: "6:45 AM" },
  { date: "Apr 18", hours: 8.0, quality: 3, bedtime: "10:30 PM", wakeup: "6:30 AM" },
  { date: "Apr 17", hours: 7.5, quality: 2, bedtime: "11:15 PM", wakeup: "6:45 AM" },
  { date: "Apr 16", hours: 6.0, quality: 1, bedtime: "1:00 AM", wakeup: "7:00 AM" },
  { date: "Apr 15", hours: 9.0, quality: 4, bedtime: "10:00 PM", wakeup: "7:00 AM" },
  { date: "Apr 14", hours: 7.5, quality: 3, bedtime: "11:00 PM", wakeup: "6:30 AM" },
];

const monthlyData = [
  { name: "Week 1", value: 7.2 },
  { name: "Week 2", value: 6.8 },
  { name: "Week 3", value: 7.5 },
  { name: "Week 4", value: 7.7 },
];

const Sleep = () => {
  const [activeTab, setActiveTab] = useState("daily");
  
  // Calculate averages
  const averageSleep = Number((sleepLogs.reduce((acc, log) => acc + log.hours, 0) / sleepLogs.length).toFixed(1));
  const averageQuality = Math.round(sleepLogs.reduce((acc, log) => acc + log.quality, 0) / sleepLogs.length);
  
  return (
    <Layout>
      <div className="wellness-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sleep Tracking</h1>
            <p className="text-muted-foreground">Monitor your sleep patterns and quality</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button 
              variant={activeTab === "daily" ? "default" : "outline"} 
              onClick={() => setActiveTab("daily")}
            >
              Daily
            </Button>
            <Button 
              variant={activeTab === "weekly" ? "default" : "outline"} 
              onClick={() => setActiveTab("weekly")}
            >
              Weekly
            </Button>
            <Button 
              variant={activeTab === "monthly" ? "default" : "outline"} 
              onClick={() => setActiveTab("monthly")}
            >
              Monthly
            </Button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="card-wellness">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Average Sleep Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Bed className="h-8 w-8 text-primary" />
                <div className="text-4xl font-bold">{averageSleep}h</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your average is {averageSleep >= 7 ? "good" : "below recommended"} for optimal health
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-wellness">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Sleep Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-xl font-medium">{sleepQualityLabels[averageQuality - 1]}</div>
                <Badge variant="outline" className="ml-2">Average</Badge>
              </div>
              <div className="mt-4 flex space-x-1">
                {[1, 2, 3, 4].map((star) => (
                  <div
                    key={star}
                    className={`w-6 h-6 rounded-full flex items-center justify-center 
                      ${star <= averageQuality ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    <span className="text-xs">{star}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-wellness">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Bedtime Consistency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-primary" />
                <div className="text-xl font-medium">11:30 PM (avg)</div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your bedtime varies by 3h 45m in the last week
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Chart Section */}
        <Card className="card-wellness mb-8">
          <CardHeader>
            <CardTitle>Sleep History</CardTitle>
            <CardDescription>
              {activeTab === "daily" && "Your sleep patterns over the past week"}
              {activeTab === "weekly" && "Your weekly sleep averages"}
              {activeTab === "monthly" && "Your monthly sleep trends"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {activeTab === "daily" && (
                <BarChart 
                  data={sleepLogs.map(log => ({ name: log.date, value: log.hours }))}
                  valueFormatter={(value) => `${value}h`}
                  categories={["value"]}
                  colors={["primary"]}
                  className="h-full"
                />
              )}
              
              {activeTab === "weekly" && (
                <BarChart 
                  data={sleepLogs.map(log => ({ name: log.date, value: log.hours }))}
                  valueFormatter={(value) => `${value}h`}
                  categories={["value"]}
                  colors={["primary"]}
                  className="h-full"
                />
              )}
              
              {activeTab === "monthly" && (
                <BarChart 
                  data={monthlyData}
                  valueFormatter={(value) => `${value}h`}
                  categories={["value"]}
                  colors={["primary"]}
                  className="h-full"
                />
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Logs Section */}
        <Card className="card-wellness">
          <CardHeader>
            <CardTitle>Recent Sleep Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sleepLogs.slice(0, 5).map((log, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{log.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {log.bedtime} - {log.wakeup}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium">{log.hours}h</div>
                      <div className="text-sm text-muted-foreground">
                        {sleepQualityLabels[log.quality - 1]}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((star) => (
                        <div
                          key={star}
                          className={`w-4 h-4 rounded-full flex items-center justify-center 
                            ${star <= log.quality ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                        >
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Sleep;
