import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wifi, WifiOff, AlertTriangle, Clock, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import trafficSignals, {
  TrafficSignal,
  updateTrafficSignals,
} from "@/data/trafficSignals";

interface TrafficSignalStatusProps {
  className?: string;
}

const TrafficSignalStatus = ({ className }: TrafficSignalStatusProps) => {
  const [signals, setSignals] = useState<TrafficSignal[]>(trafficSignals);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Simulate real-time updates
  useEffect(() => {
    const updateSignals = () => {
      const updatedSignals = updateTrafficSignals();
      setSignals(updatedSignals);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    // Initial update
    updateSignals();

    // Update every 10 seconds for more real-time feel
    const interval = setInterval(updateSignals, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: TrafficSignal["status"]) => {
    switch (status) {
      case "operational":
        return <Wifi className="h-4 w-4 text-green-500" />;
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: TrafficSignal["status"]) => {
    switch (status) {
      case "operational":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "maintenance":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "offline":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  const getCongestionColor = (level: number) => {
    if (level < 30) return "text-green-500";
    if (level < 70) return "text-amber-500";
    return "text-red-500";
  };

  const getCongestionProgressColor = (level: number) => {
    if (level < 30) return "bg-green-500";
    if (level < 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className={cn("bg-slate-900 border-slate-800 shadow-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Traffic Signal Status</span>
          {lastUpdated && (
            <span className="text-xs text-slate-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Last updated: {lastUpdated}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="p-3 bg-slate-800 rounded-md border border-slate-700 hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-white">{signal.location}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span>ID: {signal.id}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Camera className="h-3 w-3 mr-0.5" />
                      {signal.cameras.length}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-normal flex items-center gap-1",
                    getStatusColor(signal.status),
                  )}
                >
                  {getStatusIcon(signal.status)}
                  {signal.status.charAt(0).toUpperCase() +
                    signal.status.slice(1)}
                </Badge>
              </div>

              <div className="mb-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">
                    Congestion Level
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      getCongestionColor(signal.congestionLevel),
                    )}
                  >
                    {signal.congestionLevel}%
                  </span>
                </div>
                <Progress
                  value={signal.congestionLevel}
                  className="h-1.5 bg-slate-700"
                  indicatorClassName={getCongestionProgressColor(
                    signal.congestionLevel,
                  )}
                />
              </div>

              {signal.incidents && signal.incidents.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-700">
                  {signal.incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="text-xs flex items-start gap-1 mt-1"
                    >
                      <AlertTriangle
                        className={cn(
                          "h-3 w-3 mt-0.5",
                          incident.severity === "high"
                            ? "text-red-500"
                            : incident.severity === "medium"
                              ? "text-amber-500"
                              : "text-blue-500",
                        )}
                      />
                      <div>
                        <span className="font-medium text-white">
                          {incident.type}
                        </span>
                        :{" "}
                        <span className="text-slate-400">
                          {incident.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSignalStatus;
