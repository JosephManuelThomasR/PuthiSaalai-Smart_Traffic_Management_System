import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ban,
  CornerUpRight,
  MapPin,
  BarChart,
  Save,
  AlertCircle,
  RotateCcw,
  Check,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import trafficSignals from "@/data/trafficSignals";
import { useToast } from "@/components/ui/use-toast";

interface RoadBlock {
  id: string;
  name: string;
  status: "active" | "inactive";
}

interface Diversion {
  id: string;
  name: string;
  from: string;
  to: string;
}

interface TrafficControlPanelProps {
  roadBlocks?: RoadBlock[];
  diversions?: Diversion[];
  onApplyChanges?: (changes: {
    roadBlocks: RoadBlock[];
    diversions: Diversion[];
  }) => void;
  className?: string;
}

const TrafficControlPanel = ({
  roadBlocks: initialRoadBlocks = [
    { id: "1", name: "Main Street", status: "inactive" },
    { id: "2", name: "Harbor Road", status: "active" },
    { id: "3", name: "Market Avenue", status: "inactive" },
  ],
  diversions: initialDiversions = [
    {
      id: "1",
      name: "Harbor Diversion",
      from: "Harbor Road",
      to: "Beach Road",
    },
    {
      id: "2",
      name: "Market Diversion",
      from: "Market Avenue",
      to: "Temple Street",
    },
  ],
  onApplyChanges = () => {},
  className,
}: TrafficControlPanelProps) => {
  const [roadBlocks, setRoadBlocks] = useState<RoadBlock[]>(initialRoadBlocks);
  const [diversions, setDiversions] = useState<Diversion[]>(initialDiversions);
  const [selectedRoad, setSelectedRoad] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<"block" | "unblock">(
    "block",
  );
  const [selectedDiversion, setSelectedDiversion] = useState<string>("");
  const [pendingChanges, setPendingChanges] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [changeHistory, setChangeHistory] = useState<
    { action: string; timestamp: number }[]
  >([]);
  const [lastApplied, setLastApplied] = useState<string>("");
  const { toast } = useToast();

  // Initialize with roads from traffic signals
  useEffect(() => {
    const signalRoads = trafficSignals.map((signal) => ({
      id: signal.id,
      name: signal.location,
      status: signal.status === "offline" ? "active" : "inactive",
    }));

    setRoadBlocks([...initialRoadBlocks, ...signalRoads]);
  }, []);

  // Track changes for undo functionality
  useEffect(() => {
    if (pendingChanges) {
      const now = new Date();
      setLastApplied(`Last modified: ${now.toLocaleTimeString()}`);
    }
  }, [pendingChanges]);

  // Handle road block/unblock action
  const handleRoadAction = () => {
    if (selectedRoad) {
      const updatedRoadBlocks = roadBlocks.map((road) => {
        if (road.id === selectedRoad) {
          return {
            ...road,
            status: selectedAction === "block" ? "active" : "inactive",
          };
        }
        return road;
      });

      setRoadBlocks(updatedRoadBlocks);
      setChangeHistory((prev) => [
        ...prev,
        {
          action: `${selectedAction === "block" ? "Blocked" : "Unblocked"} ${roadBlocks.find((r) => r.id === selectedRoad)?.name}`,
          timestamp: Date.now(),
        },
      ]);
      setPendingChanges(true);
    }
  };

  // Handle diversion selection
  const handleDiversionSelect = (diversionId: string) => {
    setSelectedDiversion(diversionId);

    // Only mark as pending if it's a new selection
    if (diversionId) {
      setChangeHistory((prev) => [
        ...prev,
        {
          action: `Added diversion: ${diversions.find((d) => d.id === diversionId)?.name}`,
          timestamp: Date.now(),
        },
      ]);
      setPendingChanges(true);
    }
  };

  // Undo last change
  const undoLastChange = () => {
    if (changeHistory.length > 0) {
      // Remove the last change from history
      const newHistory = [...changeHistory];
      newHistory.pop();
      setChangeHistory(newHistory);

      // Reset to initial state if no changes left
      if (newHistory.length === 0) {
        setRoadBlocks(initialRoadBlocks);
        setDiversions(initialDiversions);
        setPendingChanges(false);
      } else {
        // Otherwise we'd need to replay the changes from the beginning
        // For simplicity, we'll just keep the current state but remove the last action
        // In a real app, you would reconstruct the state from the history
      }
    }
  };

  // Apply all pending changes
  const applyChanges = () => {
    setShowConfirmation(true);
    // Simulate real-time data update
    const updatedRoadBlocks = roadBlocks.map((road) => ({
      ...road,
      status: Math.random() > 0.7 ? "active" : "inactive",
    }));
    setRoadBlocks(updatedRoadBlocks);
  };

  // Confirm and apply changes
  const confirmAndApplyChanges = () => {
    // In a real app, this would call the onApplyChanges prop with the updated data
    onApplyChanges({ roadBlocks, diversions });
    setPendingChanges(false);
    setShowConfirmation(false);

    // Show a temporary success message
    setLastApplied(`Changes applied at ${new Date().toLocaleTimeString()}`);

    // Simulate real-time effect of changes
    const updatedDiversions = [...diversions];
    if (Math.random() > 0.5 && updatedDiversions.length < 5) {
      // Occasionally add a new diversion
      updatedDiversions.push({
        id: `div-${Date.now()}`,
        name: `Emergency Diversion ${Math.floor(Math.random() * 10)}`,
        from: `Road ${Math.floor(Math.random() * 10)}`,
        to: `Road ${Math.floor(Math.random() * 10)}`,
      });
    }
    setDiversions(updatedDiversions);
  };

  return (
    <div
      className={cn(
        "bg-slate-900 p-4 rounded-lg border border-slate-800 shadow-md w-full",
        className,
      )}
    >
      <h3 className="text-lg font-semibold mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <BarChart className="mr-2 h-5 w-5" />
          Manual Traffic Control
        </div>
        {changeHistory.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={undoLastChange}
            className="text-xs flex items-center gap-1 text-muted-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Undo Last Change
          </Button>
        )}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Road Block/Unblock Section */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Ban className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium">Road Control</span>
          </div>

          <div className="flex space-x-2">
            <Select onValueChange={(value) => setSelectedRoad(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Road" />
              </SelectTrigger>
              <SelectContent>
                {roadBlocks.map((road) => (
                  <SelectItem key={road.id} value={road.id}>
                    {road.name}{" "}
                    {road.status === "active" ? (
                      <span className="ml-1 text-red-500">(Blocked)</span>
                    ) : (
                      ""
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    selectedAction === "block"
                      ? "text-red-500"
                      : "text-green-500",
                  )}
                >
                  {selectedAction === "block" ? "Block" : "Unblock"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedAction("block")}>
                  Block Road
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedAction("unblock")}>
                  Unblock Road
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              onClick={handleRoadAction}
              className={
                selectedAction === "block"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Diversion Creation Section */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <CornerUpRight className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Create Diversion</span>
          </div>

          <Select onValueChange={handleDiversionSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Diversion Route" />
            </SelectTrigger>
            <SelectContent>
              {diversions.map((diversion) => (
                <SelectItem key={diversion.id} value={diversion.id}>
                  {diversion.name} ({diversion.from} → {diversion.to})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Map Marker Section */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Map Actions</span>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setChangeHistory((prev) => [
                  ...prev,
                  {
                    action: "Added map marker at current location",
                    timestamp: Date.now(),
                  },
                ]);
                setPendingChanges(true);
                toast({
                  title: "Marker Added",
                  description: "New traffic marker added to the map",
                  variant: "default",
                });
              }}
            >
              Add Marker
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setChangeHistory([]);
                setPendingChanges(false);
                toast({
                  title: "Markers Cleared",
                  description: "All map markers have been removed",
                  variant: "default",
                });
              }}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      {/* Change History */}
      {changeHistory.length > 0 && (
        <div className="mt-3 p-2 bg-muted/30 rounded-md border border-border">
          <h4 className="text-xs font-medium mb-1">Recent Changes:</h4>
          <ul className="text-xs space-y-1">
            {changeHistory.slice(-3).map((change, index) => (
              <li key={index} className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-500" />
                {change.action} -{" "}
                {new Date(change.timestamp).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Apply Changes Button */}
      <div className="mt-4 flex justify-end">
        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogTrigger asChild>
            <Button
              onClick={applyChanges}
              disabled={!pendingChanges}
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              Apply All Changes
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Confirm Traffic Control Changes
              </AlertDialogTitle>
              <AlertDialogDescription>
                You are about to apply {changeHistory.length} traffic control
                changes. This will immediately affect traffic flow and
                navigation systems.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmAndApplyChanges}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Confirm Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Status Indicator */}
      {pendingChanges && (
        <div className="mt-2 text-xs text-amber-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          You have pending changes that need to be applied
        </div>
      )}

      {/* Last Applied Timestamp */}
      {lastApplied && (
        <div className="mt-1 text-xs text-muted-foreground">{lastApplied}</div>
      )}
    </div>
  );
};

export default TrafficControlPanel;
