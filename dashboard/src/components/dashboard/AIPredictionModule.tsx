import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface PredictionItem {
  id: string;
  location: string;
  severity: "low" | "medium" | "high";
  timeEstimate: string;
  probability: number;
  coordinates: { lat: number; lng: number };
}

interface AIPredictionModuleProps {
  predictions?: PredictionItem[];
  onViewOnMap?: (prediction: PredictionItem) => void;
  timeRange?: number;
  onTimeRangeChange?: (value: number) => void;
}

const AIPredictionModule = ({
  predictions: initialPredictions = [
    {
      id: "pred-1",
      location: "Main Street & Harbor Road",
      severity: "high",
      timeEstimate: "15-30 minutes",
      probability: 85,
      coordinates: { lat: 8.7642, lng: 78.1348 },
    },
    {
      id: "pred-2",
      location: "Beach Road Junction",
      severity: "medium",
      timeEstimate: "30-45 minutes",
      probability: 72,
      coordinates: { lat: 8.7539, lng: 78.1584 },
    },
    {
      id: "pred-3",
      location: "Hospital Zone",
      severity: "low",
      timeEstimate: "45-60 minutes",
      probability: 58,
      coordinates: { lat: 8.7812, lng: 78.1375 },
    },
  ],
  onViewOnMap = () => {},
  timeRange = 30,
  onTimeRangeChange = () => {},
}: AIPredictionModuleProps) => {
  const [predictions, setPredictions] =
    useState<PredictionItem[]>(initialPredictions);
  const [selectedTimeRange, setSelectedTimeRange] = useState<number>(timeRange);
  const [hoveredPrediction, setHoveredPrediction] = useState<string | null>(
    null,
  );
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(
    null,
  );
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString(),
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Function to simulate AI prediction updates
  const updatePredictions = useCallback(() => {
    setIsUpdating(true);

    // Simulate network delay
    setTimeout(() => {
      // Generate some random predictions based on time range
      const locations = [
        "Main Street & Harbor Road",
        "Beach Road Junction",
        "Hospital Zone",
        "Market Square",
        "Bus Terminal Entrance",
        "Railway Station Road",
        "Industrial Area Junction",
        "School Zone Crossing",
      ];

      const severities = ["low", "medium", "high"];
      const newPredictions: PredictionItem[] = [];

      // Number of predictions based on time range (more predictions for longer ranges)
      const numPredictions = Math.min(
        5,
        Math.max(2, Math.floor(selectedTimeRange / 20)),
      );

      for (let i = 0; i < numPredictions; i++) {
        const randomLocation =
          locations[Math.floor(Math.random() * locations.length)];
        const randomSeverity = severities[
          Math.floor(Math.random() * severities.length)
        ] as "low" | "medium" | "high";
        const randomProbability = Math.floor(Math.random() * 30) + 60; // 60-90%

        // Generate random coordinates near Tuticorin
        const baseLat = 8.76;
        const baseLng = 78.13;
        const randomLat = baseLat + (Math.random() * 0.05 - 0.025);
        const randomLng = baseLng + (Math.random() * 0.05 - 0.025);

        // Time estimate based on severity and time range
        let timeEstimate = "";
        if (randomSeverity === "high") {
          timeEstimate = `${Math.floor(selectedTimeRange * 0.2)}-${Math.floor(selectedTimeRange * 0.4)} minutes`;
        } else if (randomSeverity === "medium") {
          timeEstimate = `${Math.floor(selectedTimeRange * 0.4)}-${Math.floor(selectedTimeRange * 0.7)} minutes`;
        } else {
          timeEstimate = `${Math.floor(selectedTimeRange * 0.7)}-${selectedTimeRange} minutes`;
        }

        newPredictions.push({
          id: `pred-${Date.now()}-${i}`,
          location: randomLocation,
          severity: randomSeverity,
          timeEstimate,
          probability: randomProbability,
          coordinates: { lat: randomLat, lng: randomLng },
        });
      }

      // Sort by probability (highest first)
      newPredictions.sort((a, b) => b.probability - a.probability);

      setPredictions(newPredictions);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsUpdating(false);
    }, 1500);
  }, [selectedTimeRange]);

  // Update predictions when time range changes
  useEffect(() => {
    updatePredictions();
  }, [selectedTimeRange, updatePredictions]);

  // Set up periodic updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updatePredictions();
    }, 30000);

    return () => clearInterval(interval);
  }, [updatePredictions]);

  const handlePredictionClick = (prediction: PredictionItem) => {
    setSelectedPrediction(
      selectedPrediction === prediction.id ? null : prediction.id,
    );
    onViewOnMap(prediction);
  };

  const handleTimeRangeChange = (value: number[]) => {
    setSelectedTimeRange(value[0]);
    onTimeRangeChange(value[0]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "medium":
        return "bg-amber-500 hover:bg-amber-600";
      case "low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <Card className="w-full h-full bg-slate-900 border-slate-800 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            AI Congestion Prediction
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-400">Updated: {lastUpdated}</div>
            <Badge
              variant="outline"
              className={cn(
                "bg-blue-900/30 text-blue-300 border-blue-700",
                isUpdating && "animate-pulse",
              )}
            >
              {isUpdating ? (
                <>
                  <span className="h-2 w-2 bg-blue-400 rounded-full animate-pulse mr-1"></span>
                  Updating...
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 mr-1" /> Live
                </>
              )}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-400">
          AI-powered predictions for upcoming traffic congestion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-400">
              Prediction Time Range
            </span>
            <span className="text-sm font-medium text-white">
              {selectedTimeRange} minutes
            </span>
          </div>
          <Slider
            value={[selectedTimeRange]}
            max={120}
            min={15}
            step={15}
            onValueChange={handleTimeRangeChange}
            className="my-2"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>15m</span>
            <span>60m</span>
            <span>120m</span>
          </div>
        </div>

        <div className="space-y-3 mt-4 max-h-[180px] overflow-y-auto pr-1">
          {predictions.length === 0 && isUpdating ? (
            <div className="flex items-center justify-center h-20 text-slate-500">
              <div className="animate-spin h-5 w-5 mr-2 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              Generating predictions...
            </div>
          ) : predictions.length === 0 ? (
            <div className="text-center py-4 text-slate-500">
              No congestion predicted in the next {selectedTimeRange} minutes
            </div>
          ) : (
            predictions.map((prediction) => (
              <div
                key={prediction.id}
                className={cn(
                  "p-3 rounded-lg border transition-all cursor-pointer",
                  hoveredPrediction === prediction.id
                    ? "bg-slate-800/80 border-slate-700"
                    : "bg-slate-800/40 border-slate-800",
                  selectedPrediction === prediction.id &&
                    "ring-2 ring-blue-500 border-blue-500",
                )}
                onMouseEnter={() => setHoveredPrediction(prediction.id)}
                onMouseLeave={() => setHoveredPrediction(null)}
                onClick={() => handlePredictionClick(prediction)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={cn(
                        "h-5 w-5 mt-0.5",
                        prediction.severity === "high"
                          ? "text-red-500"
                          : prediction.severity === "medium"
                            ? "text-amber-500"
                            : "text-green-500",
                        selectedPrediction === prediction.id && "animate-pulse",
                      )}
                    />
                    <div>
                      <h4 className="font-medium text-white text-sm">
                        {prediction.location}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>Expected in {prediction.timeEstimate}</span>
                      </div>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          className={cn(
                            "text-white",
                            getSeverityColor(prediction.severity),
                          )}
                        >
                          {prediction.probability}%
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Prediction confidence</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {selectedPrediction === prediction.id && (
                  <div className="mt-2 mb-3 p-2 bg-slate-700/50 rounded border border-slate-600 text-xs text-white">
                    <div className="font-medium mb-1">
                      Predicted Delay Impact:
                    </div>
                    <div className="flex justify-between items-center">
                      <div>Emergency vehicles:</div>
                      <div className="font-medium text-red-400">
                        +{Math.floor(prediction.probability / 10)} min
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>Public transport:</div>
                      <div className="font-medium text-amber-400">
                        +{Math.floor(prediction.probability / 5)} min
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>Regular traffic:</div>
                      <div className="font-medium text-blue-400">
                        +{Math.floor(prediction.probability / 3)} min
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>
                      Lat: {prediction.coordinates.lat.toFixed(4)}, Lng:{" "}
                      {prediction.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-7 text-xs hover:bg-blue-950/50",
                      selectedPrediction === prediction.id
                        ? "text-blue-300 hover:text-blue-200"
                        : "text-blue-400 hover:text-blue-300",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewOnMap(prediction);
                    }}
                  >
                    View on map
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPredictionModule;
