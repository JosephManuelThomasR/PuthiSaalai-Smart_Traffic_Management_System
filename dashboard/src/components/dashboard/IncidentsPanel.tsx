import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  AlertTriangle,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Bell,
  BellOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast, ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface Incident {
  id: string;
  type: "accident" | "roadblock" | "congestion";
  location: string;
  time: string;
  severity: "low" | "medium" | "high";
  description: string;
  isNew?: boolean;
  acknowledged?: boolean;
}

interface IncidentsPanelProps {
  incidents?: Incident[];
  onResolve?: (id: string) => void;
  onSendResponse?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const IncidentsPanel = ({
  incidents: initialIncidents = [
    {
      id: "1",
      type: "accident",
      location: "VOC Road & Palayamkottai Road Junction",
      time: "10:30 AM",
      severity: "high",
      description:
        "Multi-vehicle collision blocking two lanes. Ambulance dispatched.",
      isNew: false,
      acknowledged: true,
    },
    {
      id: "2",
      type: "roadblock",
      location: "Ettayapuram Road near Railway Station",
      time: "11:15 AM",
      severity: "medium",
      description:
        "Construction work causing significant delays. Expected to clear by 4 PM.",
      isNew: false,
      acknowledged: true,
    },
    {
      id: "3",
      type: "congestion",
      location: "Thoothukudi Port Access Road",
      time: "12:05 PM",
      severity: "low",
      description: "Heavy traffic due to cargo vehicles. Moving slowly.",
      isNew: false,
      acknowledged: true,
    },
    {
      id: "4",
      type: "accident",
      location: "Beach Road near Roche Park",
      time: "09:45 AM",
      severity: "medium",
      description:
        "Two-wheeler accident. Minor injuries reported. One lane blocked.",
      isNew: false,
      acknowledged: true,
    },
    {
      id: "5",
      type: "congestion",
      location: "VE Road Market Area",
      time: "01:30 PM",
      severity: "high",
      description: "Severe congestion due to market day. All lanes affected.",
      isNew: false,
      acknowledged: true,
    },
  ],
  onResolve = () => {},
  onSendResponse = () => {},
  onViewDetails = () => {},
}: IncidentsPanelProps) => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString(),
  );
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate real-time incident updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Simulate a 30% chance of a new incident
      if (Math.random() < 0.3) {
        const newIncidentTypes = ["accident", "roadblock", "congestion"];
        const newIncidentLocations = [
          "Central Bus Station",
          "New Harbor Bridge",
          "City Mall Junction",
          "Hospital Zone",
          "Industrial Area",
        ];
        const newIncidentSeverities = ["low", "medium", "high"];

        const newIncident: Incident = {
          id: `incident-${Date.now()}`,
          type: newIncidentTypes[
            Math.floor(Math.random() * newIncidentTypes.length)
          ] as "accident" | "roadblock" | "congestion",
          location:
            newIncidentLocations[
              Math.floor(Math.random() * newIncidentLocations.length)
            ],
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          severity: newIncidentSeverities[
            Math.floor(Math.random() * newIncidentSeverities.length)
          ] as "low" | "medium" | "high",
          description: "New incident reported. Details pending.",
          isNew: true,
          acknowledged: false,
        };

        setIncidents((prev) => [newIncident, ...prev]);

        // Show toast notification for new incident
        toast({
          title: `New ${newIncident.severity.toUpperCase()} ${newIncident.type}!`,
          description: `${newIncident.location} - ${newIncident.time}`,
          variant: newIncident.severity === "high" ? "destructive" : undefined,
          action: (
            <ToastAction
              altText="View"
              onClick={() => onViewDetails(newIncident.id)}
            >
              View
            </ToastAction>
          ),
        });
      }

      setLastUpdated(new Date().toLocaleTimeString());
    }, 15000); // Check for new incidents every 15 seconds

    return () => clearInterval(updateInterval);
  }, [onViewDetails, toast]);

  // Mark new incidents as not new after 5 seconds
  useEffect(() => {
    const newIncidents = incidents.filter((incident) => incident.isNew);

    if (newIncidents.length > 0) {
      const timers = newIncidents.map((incident) => {
        return setTimeout(() => {
          setIncidents((prev) =>
            prev.map((inc) =>
              inc.id === incident.id ? { ...inc, isNew: false } : inc,
            ),
          );
        }, 5000);
      });

      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, [incidents]);

  // Scroll to top when new incidents are added
  useEffect(() => {
    if (incidents.some((incident) => incident.isNew) && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [incidents]);

  const handleAcknowledge = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, acknowledged: true } : inc)),
    );

    // Show toast notification for acknowledged incident
    const incident = incidents.find((inc) => inc.id === id);
    if (incident) {
      toast({
        title: "Incident Acknowledged",
        description: `${incident.type} at ${incident.location} has been acknowledged`,
        variant: "default",
      });
    }
  };

  const handleResolve = (id: string) => {
    onResolve(id);
    // Show toast notification for resolved incident
    const incident = incidents.find((inc) => inc.id === id);
    if (incident) {
      toast({
        title: "Incident Resolved",
        description: `${incident.type} at ${incident.location} has been resolved`,
        variant: "default",
      });
    }

    // Remove the incident after a short delay
    setTimeout(() => {
      setIncidents((prev) => prev.filter((inc) => inc.id !== id));

      // Simulate a new incident being added occasionally
      if (Math.random() > 0.7) {
        const newIncidentTypes = ["accident", "roadblock", "congestion"];
        const newIncidentLocations = [
          "Central Bus Station",
          "New Harbor Bridge",
          "City Mall Junction",
          "Hospital Zone",
          "Industrial Area",
          "Beach Road Intersection",
          "Railway Crossing",
          "School Zone",
        ];
        const newIncidentSeverities = ["low", "medium", "high"];

        const newIncident: Incident = {
          id: `incident-${Date.now()}`,
          type: newIncidentTypes[
            Math.floor(Math.random() * newIncidentTypes.length)
          ] as "accident" | "roadblock" | "congestion",
          location:
            newIncidentLocations[
              Math.floor(Math.random() * newIncidentLocations.length)
            ],
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          severity: newIncidentSeverities[
            Math.floor(Math.random() * newIncidentSeverities.length)
          ] as "low" | "medium" | "high",
          description: "New incident reported. Details pending.",
          isNew: true,
          acknowledged: false,
        };

        setIncidents((prev) => [newIncident, ...prev]);

        // Show toast notification for new incident
        toast({
          title: `New ${newIncident.severity.toUpperCase()} ${newIncident.type}!`,
          description: `${newIncident.location} - ${newIncident.time}`,
          variant: newIncident.severity === "high" ? "destructive" : undefined,
        });
      }
    }, 500);
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "accident":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "roadblock":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "congestion":
        return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-500 hover:bg-amber-600"
          >
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background border rounded-lg shadow-sm">
      <div className="p-4 bg-muted/50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Active Incidents & Alerts</h2>
            <div className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </div>
          </div>
          <Badge className="bg-blue-600">{incidents.length} Active</Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-1" ref={scrollRef}>
        <div className="space-y-2 p-3">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={cn(
                "bg-card p-3 rounded-md border shadow-sm hover:shadow-md transition-all",
                incident.isNew && "animate-pulse border-red-500",
                !incident.acknowledged && "border-l-4 border-l-amber-500",
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {incident.isNew ? (
                    <div className="relative">
                      {getTypeIcon(incident.type)}
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    </div>
                  ) : (
                    getTypeIcon(incident.type)
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium capitalize flex items-center gap-1">
                        {incident.type}
                        {incident.isNew && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-red-100 text-red-800 border-red-300"
                          >
                            NEW
                          </Badge>
                        )}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{incident.time}</span>
                      </div>
                    </div>
                    <div>{getSeverityBadge(incident.severity)}</div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {incident.description}
                  </p>

                  <Separator className="my-2" />

                  {!incident.acknowledged ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                      onClick={() => handleAcknowledge(incident.id)}
                    >
                      <Bell className="h-3.5 w-3.5 mr-1" />
                      Acknowledge Alert
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleResolve(incident.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => onSendResponse(incident.id)}
                      >
                        Send Response
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs mt-1 text-muted-foreground"
                    onClick={() => onViewDetails(incident.id)}
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default IncidentsPanel;
