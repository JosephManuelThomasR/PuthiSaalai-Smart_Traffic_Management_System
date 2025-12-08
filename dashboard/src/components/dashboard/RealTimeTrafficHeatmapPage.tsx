import React, { useState, useEffect } from "react";
import TrafficHeatmap from "./TrafficHeatmap";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Map, Info, Car, Clock, AlertTriangle } from "lucide-react";

// Traffic stop data interface
interface TrafficStop {
  id: string;
  location: string;
  vehicleCount: number;
  congestionLevel: "low" | "medium" | "high";
  waitTime: number; // in minutes
  coordinates: [number, number]; // [lat, lng]
  lastUpdated: string;
}

const RealTimeTrafficHeatmapPage = () => {
  const [trafficStops, setTrafficStops] = useState<TrafficStop[]>([
    {
      id: "1",
      location: "Main Junction",
      vehicleCount: 45,
      congestionLevel: "high",
      waitTime: 12,
      coordinates: [8.7642, 78.1348],
      lastUpdated: "2 mins ago",
    },
    {
      id: "2",
      location: "Harbor Road",
      vehicleCount: 28,
      congestionLevel: "medium",
      waitTime: 8,
      coordinates: [8.7539, 78.1328],
      lastUpdated: "5 mins ago",
    },
    {
      id: "3",
      location: "Beach Road",
      vehicleCount: 15,
      congestionLevel: "low",
      waitTime: 3,
      coordinates: [8.7712, 78.1518],
      lastUpdated: "1 min ago",
    },
    {
      id: "4",
      location: "Market Area",
      vehicleCount: 32,
      congestionLevel: "medium",
      waitTime: 7,
      coordinates: [8.7602, 78.1378],
      lastUpdated: "3 mins ago",
    },
    {
      id: "5",
      location: "Railway Station",
      vehicleCount: 38,
      congestionLevel: "high",
      waitTime: 10,
      coordinates: [8.7582, 78.1408],
      lastUpdated: "4 mins ago",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficStops((prevStops) =>
        prevStops.map((stop) => ({
          ...stop,
          vehicleCount: Math.max(
            5,
            Math.floor(stop.vehicleCount + (Math.random() * 10 - 5)),
          ),
          waitTime: Math.max(
            1,
            Math.floor(stop.waitTime + (Math.random() * 4 - 2)),
          ),
          lastUpdated: "Just now",
        })),
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Update congestion levels based on vehicle count
  useEffect(() => {
    setTrafficStops((prevStops) =>
      prevStops.map((stop) => ({
        ...stop,
        congestionLevel:
          stop.vehicleCount > 35
            ? "high"
            : stop.vehicleCount > 20
              ? "medium"
              : "low",
      })),
    );
  }, [trafficStops.map((stop) => stop.vehicleCount).join(",")]);
  return (
    <DashboardLayout title="Real-Time Traffic Heatmap - Tuticorin Police">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Map className="h-6 w-6 text-blue-500" />
              Real-Time Traffic Heatmap
            </h1>
            <p className="text-slate-400 mt-1">
              View live traffic conditions across Tuticorin with real-time
              updates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="h-[calc(100vh-220px)] min-h-[500px] rounded-lg overflow-hidden border border-slate-800">
              <TrafficHeatmap />
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  Legend
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Traffic density indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm text-slate-300">
                      High Congestion
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-slate-300">
                      Medium Congestion
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm text-slate-300">
                      Low Congestion
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-slate-300">
                      Police Presence
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-transparent"></div>
                    <span className="text-sm text-slate-300">
                      Incident Location
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                  <Car className="h-4 w-4 text-blue-500" />
                  Traffic Stops
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time traffic stop data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {trafficStops.map((stop) => (
                    <div
                      key={stop.id}
                      className="p-3 rounded-lg border border-slate-700 bg-slate-800/50"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white text-sm">
                          {stop.location}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${stop.congestionLevel === "high" ? "bg-red-900/50 text-red-300" : stop.congestionLevel === "medium" ? "bg-orange-900/50 text-orange-300" : "bg-green-900/50 text-green-300"}`}
                        >
                          {stop.congestionLevel.charAt(0).toUpperCase() +
                            stop.congestionLevel.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Car className="h-3 w-3" />
                          <span>{stop.vehicleCount} vehicles</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>~{stop.waitTime} min wait</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <span>Updated: {stop.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  Traffic Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-slate-300">
                      Current Hotspots
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {trafficStops
                        .filter((stop) => stop.congestionLevel === "high")
                        .map((stop) => stop.location)
                        .join(", ") || "None detected"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-300">
                      Peak Hours
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      8:00 - 10:00 AM, 5:00 - 7:00 PM
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-300">
                      Traffic Flow
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {trafficStops.reduce(
                        (sum, stop) => sum + stop.vehicleCount,
                        0,
                      )}{" "}
                      vehicles monitored across {trafficStops.length} stops
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-300 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                      AI Prediction
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      Expect increased congestion at Market Area in ~30 minutes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RealTimeTrafficHeatmapPage;
