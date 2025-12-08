import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Car, AlertTriangle } from "lucide-react";

interface Vehicle {
  id: string;
  coordinates: [number, number];
  direction: number; // angle in degrees
  speed: number;
  type: "car" | "truck" | "bus" | "motorcycle";
}

interface TrafficLight {
  id: string;
  coordinates: [number, number];
  status: "green" | "yellow" | "red";
  direction: "north" | "south" | "east" | "west";
  vehicleCount: number;
  lastChanged: string;
}

interface TrafficZone {
  id: string;
  location: string;
  coordinates: [number, number];
  congestionLevel: "low" | "medium" | "high";
  vehicleCount: number;
  radius: number;
  lastUpdated: string;
  vehicles?: Vehicle[];
  trafficLights?: TrafficLight[];
}

interface TrafficHeatmapProps {
  initialZones?: TrafficZone[];
  center?: [number, number];
  zoom?: number;
  onZoneClick?: (zone: TrafficZone) => void;
}

// Component to auto-update the map view
const MapUpdater = ({ zones }: { zones: TrafficZone[] }) => {
  const map = useMap();

  useEffect(() => {
    // This effect will re-render when zones change
    map.invalidateSize();
  }, [zones, map]);

  return null;
};

const TrafficHeatmap = ({
  initialZones = [
    {
      id: "zone-1",
      location: "Main Junction",
      coordinates: [8.7642, 78.1348],
      congestionLevel: "high",
      vehicleCount: 145,
      radius: 300,
      lastUpdated: new Date().toISOString(),
      vehicles: Array(20)
        .fill(null)
        .map((_, i) => ({
          id: `vehicle-${i}-zone-1`,
          coordinates: [
            8.7642 + (Math.random() - 0.5) * 0.005,
            78.1348 + (Math.random() - 0.5) * 0.005,
          ],
          direction: Math.floor(Math.random() * 360),
          speed: 1 + Math.random() * 3,
          type: ["car", "truck", "bus", "motorcycle"][
            Math.floor(Math.random() * 4)
          ] as "car" | "truck" | "bus" | "motorcycle",
        })),
      trafficLights: [
        {
          id: "tl-1-north",
          coordinates: [8.7642 + 0.001, 78.1348],
          status: "green",
          direction: "north",
          vehicleCount: 45,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-1-south",
          coordinates: [8.7642 - 0.001, 78.1348],
          status: "red",
          direction: "south",
          vehicleCount: 30,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-1-east",
          coordinates: [8.7642, 78.1348 + 0.001],
          status: "red",
          direction: "east",
          vehicleCount: 35,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-1-west",
          coordinates: [8.7642, 78.1348 - 0.001],
          status: "red",
          direction: "west",
          vehicleCount: 35,
          lastChanged: new Date().toISOString(),
        },
      ],
    },
    {
      id: "zone-2",
      location: "Harbor Road",
      coordinates: [8.7539, 78.1584],
      congestionLevel: "medium",
      vehicleCount: 87,
      radius: 250,
      lastUpdated: new Date().toISOString(),
      vehicles: Array(12)
        .fill(null)
        .map((_, i) => ({
          id: `vehicle-${i}-zone-2`,
          coordinates: [
            8.7539 + (Math.random() - 0.5) * 0.005,
            78.1584 + (Math.random() - 0.5) * 0.005,
          ],
          direction: Math.floor(Math.random() * 360),
          speed: 1 + Math.random() * 3,
          type: ["car", "truck", "bus", "motorcycle"][
            Math.floor(Math.random() * 4)
          ] as "car" | "truck" | "bus" | "motorcycle",
        })),
      trafficLights: [
        {
          id: "tl-2-north",
          coordinates: [8.7539 + 0.001, 78.1584],
          status: "red",
          direction: "north",
          vehicleCount: 20,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-2-south",
          coordinates: [8.7539 - 0.001, 78.1584],
          status: "green",
          direction: "south",
          vehicleCount: 35,
          lastChanged: new Date().toISOString(),
        },
      ],
    },
    {
      id: "zone-3",
      location: "Market Area",
      coordinates: [8.7812, 78.1375],
      congestionLevel: "low",
      vehicleCount: 42,
      radius: 200,
      lastUpdated: new Date().toISOString(),
      vehicles: Array(8)
        .fill(null)
        .map((_, i) => ({
          id: `vehicle-${i}-zone-3`,
          coordinates: [
            8.7812 + (Math.random() - 0.5) * 0.005,
            78.1375 + (Math.random() - 0.5) * 0.005,
          ],
          direction: Math.floor(Math.random() * 360),
          speed: 1 + Math.random() * 3,
          type: ["car", "truck", "bus", "motorcycle"][
            Math.floor(Math.random() * 4)
          ] as "car" | "truck" | "bus" | "motorcycle",
        })),
      trafficLights: [
        {
          id: "tl-3-east",
          coordinates: [8.7812, 78.1375 + 0.001],
          status: "green",
          direction: "east",
          vehicleCount: 25,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-3-west",
          coordinates: [8.7812, 78.1375 - 0.001],
          status: "red",
          direction: "west",
          vehicleCount: 17,
          lastChanged: new Date().toISOString(),
        },
      ],
    },
    {
      id: "zone-4",
      location: "Beach Road",
      coordinates: [8.768, 78.145],
      congestionLevel: "high",
      vehicleCount: 132,
      radius: 280,
      lastUpdated: new Date().toISOString(),
      vehicles: Array(18)
        .fill(null)
        .map((_, i) => ({
          id: `vehicle-${i}-zone-4`,
          coordinates: [
            8.768 + (Math.random() - 0.5) * 0.005,
            78.145 + (Math.random() - 0.5) * 0.005,
          ],
          direction: Math.floor(Math.random() * 360),
          speed: 1 + Math.random() * 3,
          type: ["car", "truck", "bus", "motorcycle"][
            Math.floor(Math.random() * 4)
          ] as "car" | "truck" | "bus" | "motorcycle",
        })),
      trafficLights: [
        {
          id: "tl-4-north",
          coordinates: [8.768 + 0.001, 78.145],
          status: "yellow",
          direction: "north",
          vehicleCount: 30,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-4-south",
          coordinates: [8.768 - 0.001, 78.145],
          status: "red",
          direction: "south",
          vehicleCount: 25,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-4-east",
          coordinates: [8.768, 78.145 + 0.001],
          status: "green",
          direction: "east",
          vehicleCount: 42,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-4-west",
          coordinates: [8.768, 78.145 - 0.001],
          status: "red",
          direction: "west",
          vehicleCount: 35,
          lastChanged: new Date().toISOString(),
        },
      ],
    },
    {
      id: "zone-5",
      location: "Hospital Zone",
      coordinates: [8.772, 78.132],
      congestionLevel: "medium",
      vehicleCount: 76,
      radius: 220,
      lastUpdated: new Date().toISOString(),
      vehicles: Array(10)
        .fill(null)
        .map((_, i) => ({
          id: `vehicle-${i}-zone-5`,
          coordinates: [
            8.772 + (Math.random() - 0.5) * 0.005,
            78.132 + (Math.random() - 0.5) * 0.005,
          ],
          direction: Math.floor(Math.random() * 360),
          speed: 1 + Math.random() * 3,
          type: ["car", "truck", "bus", "motorcycle"][
            Math.floor(Math.random() * 4)
          ] as "car" | "truck" | "bus" | "motorcycle",
        })),
      trafficLights: [
        {
          id: "tl-5-north",
          coordinates: [8.772 + 0.001, 78.132],
          status: "red",
          direction: "north",
          vehicleCount: 15,
          lastChanged: new Date().toISOString(),
        },
        {
          id: "tl-5-south",
          coordinates: [8.772 - 0.001, 78.132],
          status: "green",
          direction: "south",
          vehicleCount: 32,
          lastChanged: new Date().toISOString(),
        },
      ],
    },
  ],
  center = [8.7642, 78.1348],
  zoom = 14,
  onZoneClick = () => {},
}: TrafficHeatmapProps) => {
  const [zones, setZones] = useState<TrafficZone[]>(initialZones);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString(),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to simulate real-time data updates
  const updateTrafficData = useCallback(() => {
    setIsLoading(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      const updatedZones = zones.map((zone) => {
        // Randomly adjust vehicle count and congestion level
        const randomChange = Math.floor(Math.random() * 30) - 15;
        const newVehicleCount = Math.max(10, zone.vehicleCount + randomChange);

        let newCongestionLevel = zone.congestionLevel;
        if (newVehicleCount > 120) newCongestionLevel = "high";
        else if (newVehicleCount > 60) newCongestionLevel = "medium";
        else newCongestionLevel = "low";

        // Occasionally shift coordinates slightly to simulate movement
        const latShift = (Math.random() - 0.5) * 0.001;
        const lngShift = (Math.random() - 0.5) * 0.001;
        const newCoordinates: [number, number] = [
          zone.coordinates[0] + latShift,
          zone.coordinates[1] + lngShift,
        ];

        // Update vehicle positions
        const updatedVehicles =
          zone.vehicles?.map((vehicle) => {
            // Move vehicle based on its direction and speed
            const radians = (vehicle.direction * Math.PI) / 180;
            const latMove = Math.cos(radians) * vehicle.speed * 0.00005;
            const lngMove = Math.sin(radians) * vehicle.speed * 0.00005;

            // Randomly change direction occasionally
            const newDirection =
              Math.random() > 0.8
                ? vehicle.direction + (Math.random() * 40 - 20)
                : vehicle.direction;

            // Keep vehicles within zone radius
            const distFromCenter = Math.sqrt(
              Math.pow(vehicle.coordinates[0] - zone.coordinates[0], 2) +
                Math.pow(vehicle.coordinates[1] - zone.coordinates[1], 2),
            );

            const maxDist = zone.radius * 0.000005;
            let newCoords: [number, number] = [
              vehicle.coordinates[0] + latMove,
              vehicle.coordinates[1] + lngMove,
            ];

            if (distFromCenter > maxDist) {
              // Turn vehicle around if it's going too far from center
              newCoords = [
                zone.coordinates[0] + (Math.random() - 0.5) * 0.002,
                zone.coordinates[1] + (Math.random() - 0.5) * 0.002,
              ];
            }

            return {
              ...vehicle,
              coordinates: newCoords,
              direction: newDirection % 360,
              speed: 1 + Math.random() * 3,
            };
          }) || [];

        // Update traffic lights based on vehicle counts
        const updatedTrafficLights =
          zone.trafficLights?.map((light) => {
            // Count vehicles in this direction
            const directionVehicleCount = Math.floor(Math.random() * 50) + 5;

            // Determine which direction has the most vehicles
            const allLights = zone.trafficLights || [];
            const maxVehicleCount = Math.max(
              ...allLights.map((l) => l.vehicleCount),
            );

            // Update light status based on vehicle count
            let newStatus = light.status;
            if (directionVehicleCount > maxVehicleCount * 0.8) {
              newStatus = "green";
            } else if (directionVehicleCount > maxVehicleCount * 0.5) {
              newStatus = "yellow";
            } else {
              newStatus = "red";
            }

            // Ensure only one direction has a green light
            if (
              newStatus === "green" &&
              light.vehicleCount !== maxVehicleCount
            ) {
              newStatus = "red";
            }

            return {
              ...light,
              status: newStatus as "green" | "yellow" | "red",
              vehicleCount: directionVehicleCount,
              lastChanged: new Date().toISOString(),
            };
          }) || [];

        return {
          ...zone,
          vehicleCount: newVehicleCount,
          congestionLevel: newCongestionLevel as "low" | "medium" | "high",
          coordinates: newCoordinates,
          lastUpdated: new Date().toISOString(),
          vehicles: updatedVehicles,
          trafficLights: updatedTrafficLights,
        };
      });

      // Occasionally add a new zone or remove an existing one
      if (Math.random() > 0.9 && updatedZones.length < 8) {
        // Add a new zone
        const baseZone =
          updatedZones[Math.floor(Math.random() * updatedZones.length)];
        const latShift = (Math.random() - 0.5) * 0.01;
        const lngShift = (Math.random() - 0.5) * 0.01;

        updatedZones.push({
          id: `zone-${Date.now()}`,
          location: `New Traffic Zone ${Math.floor(Math.random() * 100)}`,
          coordinates: [
            baseZone.coordinates[0] + latShift,
            baseZone.coordinates[1] + lngShift,
          ],
          congestionLevel:
            Math.random() > 0.6
              ? "high"
              : Math.random() > 0.3
                ? "medium"
                : "low",
          vehicleCount: Math.floor(Math.random() * 150) + 20,
          radius: Math.floor(Math.random() * 100) + 200,
          lastUpdated: new Date().toISOString(),
        });
      } else if (Math.random() > 0.95 && updatedZones.length > 5) {
        // Remove a zone
        updatedZones.pop();
      }

      setZones(updatedZones);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, [zones]);

  // Set up real-time updates every 5 seconds
  useEffect(() => {
    updateTrafficData(); // Initial update

    const interval = setInterval(() => {
      updateTrafficData();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateTrafficData]);

  const getZoneColor = (level: string) => {
    switch (level) {
      case "high":
        return { color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.5 };
      case "medium":
        return { color: "#f97316", fillColor: "#f97316", fillOpacity: 0.4 };
      case "low":
        return { color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.3 };
      default:
        return { color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.3 };
    }
  };

  const handleZoneClick = (zone: TrafficZone) => {
    onZoneClick(zone);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  return (
    <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-lg relative">
      <div className="absolute top-3 left-3 z-10 bg-slate-900/80 p-2 rounded-md border border-slate-700 backdrop-blur-sm">
        <h2 className="text-white font-semibold text-sm">Traffic Heatmap</h2>
        <div className="flex items-center gap-2 mt-1">
          <Clock className="h-3 w-3 text-slate-400" />
          <span className="text-xs text-slate-400">
            Last updated: {lastUpdated}
          </span>
          {isLoading && (
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
          )}
        </div>
      </div>

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded border border-slate-700 backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs text-white">High</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded border border-slate-700 backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs text-white">Medium</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded border border-slate-700 backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-white">Low</span>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", background: "#1e293b" }}
        zoomControl={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-dark" // Custom class for dark mode styling
        />

        {zones.map((zone) => (
          <React.Fragment key={zone.id}>
            <Circle
              center={zone.coordinates}
              pathOptions={getZoneColor(zone.congestionLevel)}
              radius={zone.radius}
              eventHandlers={{
                click: () => handleZoneClick(zone),
                mouseover: () => setHoveredZone(zone.id),
                mouseout: () => setHoveredZone(null),
              }}
            >
              {hoveredZone === zone.id && (
                <Popup className="traffic-popup">
                  <div className="p-1">
                    <h3 className="font-medium text-sm">{zone.location}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Car className="h-4 w-4 text-slate-600" />
                      <span className="text-xs">
                        {zone.vehicleCount} vehicles
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <AlertTriangle className="h-4 w-4 text-slate-600" />
                      <span className="text-xs capitalize">
                        {zone.congestionLevel} congestion
                      </span>
                      <Badge
                        variant="outline"
                        className={`ml-1 text-xs ${
                          zone.congestionLevel === "high"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : zone.congestionLevel === "medium"
                              ? "bg-orange-100 text-orange-800 border-orange-300"
                              : "bg-green-100 text-green-800 border-green-300"
                        }`}
                      >
                        {zone.congestionLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-slate-600" />
                      <span className="text-xs">
                        Updated: {formatTime(zone.lastUpdated)}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2 text-xs"
                      onClick={() => handleZoneClick(zone)}
                    >
                      View Details
                    </Button>
                  </div>
                </Popup>
              )}
            </Circle>

            {/* Render vehicles */}
            {zone.vehicles?.map((vehicle) => (
              <Circle
                key={vehicle.id}
                center={vehicle.coordinates}
                radius={
                  vehicle.type === "truck" || vehicle.type === "bus" ? 8 : 5
                }
                pathOptions={{
                  color:
                    vehicle.type === "car"
                      ? "#3b82f6"
                      : vehicle.type === "truck"
                        ? "#f97316"
                        : vehicle.type === "bus"
                          ? "#8b5cf6"
                          : "#ef4444",
                  fillColor:
                    vehicle.type === "car"
                      ? "#3b82f6"
                      : vehicle.type === "truck"
                        ? "#f97316"
                        : vehicle.type === "bus"
                          ? "#8b5cf6"
                          : "#ef4444",
                  fillOpacity: 0.8,
                }}
              />
            ))}

            {/* Render traffic lights */}
            {zone.trafficLights?.map((light) => (
              <Circle
                key={light.id}
                center={light.coordinates}
                radius={12}
                pathOptions={{
                  color: "#1e293b",
                  fillColor:
                    light.status === "green"
                      ? "#22c55e"
                      : light.status === "yellow"
                        ? "#eab308"
                        : "#ef4444",
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Popup className="traffic-popup">
                  <div className="p-1">
                    <h3 className="font-medium text-sm">Traffic Light</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`h-3 w-3 rounded-full ${light.status === "green" ? "bg-green-500" : light.status === "yellow" ? "bg-yellow-500" : "bg-red-500"}`}
                      ></div>
                      <span className="text-xs capitalize">{light.status}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Car className="h-4 w-4 text-slate-600" />
                      <span className="text-xs">
                        {light.vehicleCount} vehicles
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs capitalize">
                        Direction: {light.direction}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}
          </React.Fragment>
        ))}

        <MapUpdater zones={zones} />
      </MapContainer>

      {/* Custom CSS for map styling */}
      <style jsx>{`
        :global(.leaflet-container) {
          background-color: #1e293b;
          height: 100% !important;
          width: 100% !important;
        }
        :global(.map-container) {
          height: 100% !important;
          width: 100% !important;
          flex: 1;
        }
        :global(.map-tiles-dark) {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg)
            saturate(0.3) brightness(0.7);
        }
        :global(.traffic-popup .leaflet-popup-content-wrapper) {
          background-color: white;
          border-radius: 0.5rem;
        }
        :global(.traffic-popup .leaflet-popup-tip) {
          background-color: white;
        }
      `}</style>
    </div>
  );
};

export default TrafficHeatmap;
