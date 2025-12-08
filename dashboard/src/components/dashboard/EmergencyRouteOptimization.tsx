import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Ambulance,
  MapPin,
  LocateFixed,
  Route,
  Clock,
  AlertTriangle,
  Car,
  ArrowRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyRouteOptimizationProps {
  className?: string;
}

interface RouteOption {
  id: string;
  name: string;
  distance: string;
  time: string;
  congestion: "low" | "medium" | "high";
  roadBlocks: number;
}

const EmergencyRouteOptimization = ({
  className,
}: EmergencyRouteOptimizationProps) => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("police");
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeOptions, setRouteOptions] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>("");

  // Mock route options
  const mockRouteOptions: RouteOption[] = [
    {
      id: "1",
      name: "Main Road Route",
      distance: "5.2 km",
      time: "12 min",
      congestion: "high",
      roadBlocks: 0,
    },
    {
      id: "2",
      name: "Bypass Route",
      distance: "7.8 km",
      time: "15 min",
      congestion: "low",
      roadBlocks: 0,
    },
    {
      id: "3",
      name: "Shortcut Route",
      distance: "4.5 km",
      time: "10 min",
      congestion: "medium",
      roadBlocks: 1,
    },
  ];

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setRouteOptions([]);
    setSelectedRoute("");

    // Simulate API call delay
    setTimeout(() => {
      setRouteOptions(mockRouteOptions);
      setSelectedRoute(mockRouteOptions[0].id); // Select first route by default
      setIsCalculating(false);
    }, 1500);
  };

  const handleUseCurrentLocation = () => {
    setStartLocation("Current Location (Police Station)");
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-amber-400";
      case "high":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  const getVehicleIcon = () => {
    switch (vehicleType) {
      case "police":
        return <Car className="h-4 w-4" />;
      case "ambulance":
        return <Ambulance className="h-4 w-4" />;
      case "fire":
        return <Zap className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn("bg-slate-900 border-slate-800 shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Route className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg font-medium text-white">
            Emergency Route Optimization
          </CardTitle>
        </div>
        <CardDescription className="text-slate-400">
          Find the fastest route for emergency vehicles
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleCalculateRoute} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start-location" className="text-slate-300">
              Start Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="start-location"
                placeholder="Enter starting point"
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                onClick={handleUseCurrentLocation}
              >
                <LocateFixed className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-location" className="text-slate-300">
              Destination
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="end-location"
                placeholder="Enter destination"
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-type" className="text-slate-300">
              Emergency Vehicle Type
            </Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger
                id="vehicle-type"
                className="bg-slate-800 border-slate-700 text-white"
              >
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="police">
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2" />
                    Police Vehicle
                  </div>
                </SelectItem>
                <SelectItem value="ambulance">
                  <div className="flex items-center">
                    <Ambulance className="h-4 w-4 mr-2" />
                    Ambulance
                  </div>
                </SelectItem>
                <SelectItem value="fire">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Fire Engine
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Calculating optimal routes...
              </>
            ) : (
              <>
                <Route className="h-4 w-4 mr-1" /> Calculate Optimal Route
              </>
            )}
          </Button>
        </form>

        {routeOptions.length > 0 && (
          <div className="mt-4 space-y-3">
            <h3 className="text-sm font-medium text-white">
              Recommended Routes
            </h3>

            {routeOptions.map((route) => (
              <div
                key={route.id}
                className={cn(
                  "p-3 rounded-lg border transition-all cursor-pointer",
                  selectedRoute === route.id
                    ? "border-blue-500 bg-blue-900/20"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600",
                )}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "p-1.5 rounded-full",
                        selectedRoute === route.id
                          ? "bg-blue-500/20"
                          : "bg-slate-700",
                      )}
                    >
                      {getVehicleIcon()}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">
                        {route.name}
                      </h4>
                      <div className="flex items-center text-xs text-slate-400 mt-0.5">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{startLocation}</span>
                        <ArrowRight className="h-3 w-3 mx-1" />
                        <span>{endLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {route.time}
                    </div>
                    <div className="text-xs text-slate-400">
                      {route.distance}
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-slate-400" />
                      <span className={getCongestionColor(route.congestion)}>
                        {route.congestion.charAt(0).toUpperCase() +
                          route.congestion.slice(1)}{" "}
                        Traffic
                      </span>
                    </div>

                    {route.roadBlocks > 0 && (
                      <div className="flex items-center text-amber-400">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>
                          {route.roadBlocks} Road Block
                          {route.roadBlocks > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedRoute === route.id && (
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      Navigate
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-2 text-xs text-slate-400 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 text-amber-400" />
              Routes are optimized for emergency vehicles with traffic signal
              priority
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmergencyRouteOptimization;
