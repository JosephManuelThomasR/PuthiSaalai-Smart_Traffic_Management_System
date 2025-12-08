import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  MapPin,
  Clock,
  UserCheck,
  Phone,
  RotateCw,
  Filter,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Officer {
  id: string;
  name: string;
  badge: string;
  status: "available" | "dispatched" | "on-break" | "off-duty";
  location?: string;
  assignedTo?: string;
  eta?: string;
  avatar?: string;
}

interface OfficerDispatchTrackerProps {
  className?: string;
}

const OfficerDispatchTracker = ({ className }: OfficerDispatchTrackerProps) => {
  const [officers, setOfficers] = useState<Officer[]>([
    {
      id: "1",
      name: "Officer Johnson",
      badge: "TN-1234",
      status: "dispatched",
      location: "Main Junction",
      assignedTo: "Traffic Accident",
      eta: "5 mins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=officer1",
    },
    {
      id: "2",
      name: "Officer Patel",
      badge: "TN-5678",
      status: "available",
      location: "Harbor Road",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=officer2",
    },
    {
      id: "3",
      name: "Officer Kumar",
      badge: "TN-9012",
      status: "dispatched",
      location: "Beach Road",
      assignedTo: "Road Closure",
      eta: "10 mins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=officer3",
    },
    {
      id: "4",
      name: "Officer Singh",
      badge: "TN-3456",
      status: "on-break",
      location: "Police Station",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=officer4",
    },
    {
      id: "5",
      name: "Officer Sharma",
      badge: "TN-7890",
      status: "available",
      location: "Market Area",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=officer5",
    },
    {
      id: "6",
      name: "Officer Gupta",
      badge: "TN-2345",
      status: "off-duty",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=officer6",
    },
  ]);

  const [filter, setFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter officers based on selected filter
  const filteredOfficers = officers.filter((officer) => {
    if (filter === "all") return true;
    return officer.status === filter;
  });

  // Simulate refreshing officer data
  const refreshOfficerData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate updated data by slightly changing ETAs
      const updatedOfficers = officers.map((officer) => {
        if (officer.status === "dispatched" && officer.eta) {
          const currentEta = parseInt(officer.eta);
          const newEta = Math.max(1, currentEta - 1);
          return { ...officer, eta: `${newEta} mins` };
        }
        return officer;
      });
      setOfficers(updatedOfficers);
      setIsRefreshing(false);
    }, 1000);
  };

  // Auto refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshOfficerData, 30000);
    return () => clearInterval(interval);
  }, [officers]);

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-600">Available</Badge>;
      case "dispatched":
        return <Badge className="bg-blue-600">Dispatched</Badge>;
      case "on-break":
        return <Badge className="bg-amber-600">On Break</Badge>;
      case "off-duty":
        return <Badge className="bg-slate-600">Off Duty</Badge>;
      default:
        return <Badge className="bg-slate-600">{status}</Badge>;
    }
  };

  return (
    <Card className={cn("bg-slate-900 border-slate-800 shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg font-medium text-white">
              Officer Dispatch Tracker
            </CardTitle>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-slate-300 border-slate-700 bg-slate-800/50 h-8"
            onClick={refreshOfficerData}
            disabled={isRefreshing}
          >
            <RotateCw
              className={cn(
                "h-3 w-3 mr-1",
                isRefreshing && "animate-spin text-blue-400",
              )}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
        <CardDescription className="text-slate-400 flex items-center justify-between">
          <span>Track and manage officer deployments</span>
          <div className="flex items-center gap-2">
            <Filter className="h-3 w-3 text-slate-400" />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 px-2 text-xs",
                  filter === "all"
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-slate-300",
                )}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 px-2 text-xs",
                  filter === "available"
                    ? "bg-green-900/50 text-green-300"
                    : "text-slate-400 hover:text-slate-300",
                )}
                onClick={() => setFilter("available")}
              >
                Available
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 px-2 text-xs",
                  filter === "dispatched"
                    ? "bg-blue-900/50 text-blue-300"
                    : "text-slate-400 hover:text-slate-300",
                )}
                onClick={() => setFilter("dispatched")}
              >
                Dispatched
              </Button>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-3">
            {filteredOfficers.length > 0 ? (
              filteredOfficers.map((officer) => (
                <div
                  key={officer.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    officer.status === "available"
                      ? "border-green-700/30 bg-green-900/10"
                      : officer.status === "dispatched"
                        ? "border-blue-700/30 bg-blue-900/10"
                        : officer.status === "on-break"
                          ? "border-amber-700/30 bg-amber-900/10"
                          : "border-slate-700 bg-slate-800/50",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border-2 border-slate-700">
                      <AvatarImage src={officer.avatar} alt={officer.name} />
                      <AvatarFallback className="bg-slate-700 text-slate-300">
                        {officer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-white">
                            {officer.name}
                          </h3>
                          <p className="text-xs text-slate-400">
                            Badge: {officer.badge}
                          </p>
                        </div>
                        <div>{getStatusBadge(officer.status)}</div>
                      </div>

                      {officer.location && (
                        <div className="flex items-center text-xs text-slate-300 mt-2">
                          <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                          <span>{officer.location}</span>
                          {officer.assignedTo && (
                            <>
                              <span className="mx-2">•</span>
                              <UserCheck className="h-3 w-3 mr-1 text-slate-400" />
                              <span>{officer.assignedTo}</span>
                            </>
                          )}
                          {officer.eta && (
                            <>
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1 text-slate-400" />
                              <span>ETA: {officer.eta}</span>
                            </>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-end mt-2 gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        {officer.status === "available" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-green-400 hover:text-green-300 hover:bg-green-900/20"
                          >
                            <UserCheck className="h-3 w-3 mr-1" />
                            Dispatch
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <Users className="h-10 w-10 mb-2 text-slate-500" />
                <p>No officers match the selected filter</p>
                <Button
                  variant="link"
                  className="mt-2 text-blue-400"
                  onClick={() => setFilter("all")}
                >
                  Show all officers
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OfficerDispatchTracker;
