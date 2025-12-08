import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  status: "online" | "offline";
}

interface CCTVFeedDisplayProps {
  cameras?: CCTVCamera[];
  title?: string;
}

const CCTVFeedDisplay = ({
  cameras: initialCameras = [
    {
      id: "cam-001",
      name: "Junction Camera 1",
      location: "VE Road & Palayamkottai Road",
      imageUrl:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80", // Traffic junction with vehicles and traffic lights
      status: "online",
    },
    {
      id: "cam-002",
      name: "Traffic Signal Camera 2",
      location: "Beach Road & Harbor",
      imageUrl:
        "https://images.unsplash.com/photo-1505164294036-5fad98506d55?w=800&q=80", // Traffic signal with cars on road
      status: "online",
    },
    {
      id: "cam-003",
      name: "Highway Camera 3",
      location: "NH-45 Entrance",
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", // Highway with flowing traffic from elevated angle
      status: "offline",
    },
    {
      id: "cam-004",
      name: "Market Area Camera 4",
      location: "Central Market",
      imageUrl:
        "https://images.unsplash.com/photo-1573346544140-e5e2f2bc42e9?w=800&q=80", // Busy market street with traffic from elevated angle
      status: "online",
    },
    {
      id: "cam-005",
      name: "Bus Station Camera 5",
      location: "Main Bus Terminal",
      imageUrl:
        "https://images.unsplash.com/photo-1519583272095-6433daf26b6e?w=800&q=80", // Road with buses from traffic camera angle
      status: "online",
    },
    {
      id: "cam-006",
      name: "School Zone Camera 6",
      location: "St. Mary's School Junction",
      imageUrl:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80", // School zone traffic from elevated angle
      status: "online",
    },
    {
      id: "cam-007",
      name: "Hospital Zone Camera 7",
      location: "General Hospital Entrance",
      imageUrl:
        "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&q=80", // Hospital zone traffic from camera angle
      status: "online",
    },
    {
      id: "cam-008",
      name: "Railway Crossing Camera 8",
      location: "North Railway Crossing",
      imageUrl:
        "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80", // Railway crossing with traffic from elevated angle
      status: "online",
    },
  ],
  title = "Live CCTV Feeds",
}: CCTVFeedDisplayProps) => {
  const [cameras, setCameras] = useState<CCTVCamera[]>(initialCameras);
  const [selectedCamera, setSelectedCamera] = useState<CCTVCamera | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(
    new Date().toLocaleTimeString(),
  );
  const [visibleRange, setVisibleRange] = useState<{
    start: number;
    end: number;
  }>({ start: 0, end: 4 });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-refresh camera feeds every 10 seconds
  useEffect(() => {
    const refreshFeeds = () => {
      setIsRefreshing(true);

      // Simulate updating camera feeds with new images
      setTimeout(() => {
        setCameras((prev) =>
          prev.map((camera) => {
            // Add a timestamp parameter to force image refresh
            const timestamp = Date.now();
            const baseUrl = camera.imageUrl.split("?")[0];
            return {
              ...camera,
              imageUrl: `${baseUrl}?w=800&q=80&t=${timestamp}`,
              // Randomly change status occasionally
              status:
                Math.random() > 0.95
                  ? camera.status === "online"
                    ? "offline"
                    : "online"
                  : camera.status,
            };
          }),
        );

        setLastRefreshed(new Date().toLocaleTimeString());
        setIsRefreshing(false);
      }, 1000); // Simulate network delay
    };

    // Initial refresh
    refreshFeeds();

    const interval = setInterval(refreshFeeds, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCameraClick = (camera: CCTVCamera) => {
    setSelectedCamera(camera);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);

    // Simulate updating camera feeds with new images
    setTimeout(() => {
      setCameras((prev) =>
        prev.map((camera) => {
          // Add a timestamp parameter to force image refresh
          const timestamp = Date.now();
          const baseUrl = camera.imageUrl.split("?")[0];
          return {
            ...camera,
            imageUrl: `${baseUrl}?w=800&q=80&t=${timestamp}`,
            // Randomly change status occasionally
            status:
              Math.random() > 0.85
                ? camera.status === "online"
                  ? "offline"
                  : "online"
                : camera.status,
          };
        }),
      );

      setLastRefreshed(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1000); // Simulate network delay
  };

  const scrollLeft = () => {
    if (visibleRange.start > 0) {
      setVisibleRange({
        start: visibleRange.start - 1,
        end: visibleRange.end - 1,
      });
    }
  };

  const scrollRight = () => {
    if (visibleRange.end < cameras.length) {
      setVisibleRange({
        start: visibleRange.start + 1,
        end: visibleRange.end + 1,
      });
    }
  };

  const visibleCameras = cameras.slice(visibleRange.start, visibleRange.end);

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-lg">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <span>Last refreshed: {lastRefreshed}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={cn("h-3 w-3", isRefreshing && "animate-spin")}
              />
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
            {cameras.filter((cam) => cam.status === "online").length} Online
          </span>
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
            {cameras.filter((cam) => cam.status === "offline").length} Offline
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Left scroll button */}
        {visibleRange.start > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Right scroll button */}
        {visibleRange.end < cameras.length && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={scrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        <ScrollArea className="h-[180px]" ref={scrollAreaRef}>
          <div className="flex p-4 space-x-4 min-w-max">
            {visibleCameras.map((camera) => (
              <Dialog key={camera.id}>
                <DialogTrigger asChild>
                  <div
                    className={cn(
                      "relative flex-shrink-0 w-64 h-36 rounded-md overflow-hidden cursor-pointer transition-all",
                      "hover:scale-105 hover:shadow-lg hover:shadow-black/30",
                      camera.status === "offline" ? "opacity-60 grayscale" : "",
                      isRefreshing &&
                        "opacity-80 transition-opacity duration-300",
                    )}
                    onClick={() => handleCameraClick(camera)}
                  >
                    <img
                      src={camera.imageUrl}
                      alt={camera.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                      <p className="font-medium text-sm truncate">
                        {camera.name}
                      </p>
                      <p className="text-xs text-gray-300 truncate">
                        {camera.location}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-5 h-5 rounded-full",
                          camera.status === "online"
                            ? "bg-green-500"
                            : "bg-red-500",
                        )}
                      >
                        {camera.status === "online" && (
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        )}
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent
                  className={cn(
                    "bg-gray-900 text-white border-gray-800 transition-all duration-300",
                    isFullscreen ? "max-w-[95vw] max-h-[95vh]" : "max-w-3xl",
                  )}
                >
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center justify-between">
                      <span>
                        {camera.name} - {camera.location}
                      </span>
                      <span className="text-xs text-gray-400">
                        Last updated: {new Date().toLocaleTimeString()}
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    className={cn(
                      "relative mt-2 rounded-md overflow-hidden bg-black transition-all duration-300",
                      isFullscreen ? "h-[80vh]" : "h-[400px]",
                    )}
                  >
                    <img
                      src={camera.imageUrl}
                      alt={camera.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay for simulating video feed */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                        <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1"></span>
                        LIVE {new Date().toLocaleTimeString()}
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs text-white">
                        CAM ID: {camera.id}
                      </div>
                    </div>
                    {/* Video controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={togglePlayPause}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4 mr-1" />
                          ) : (
                            <Play className="h-4 w-4 mr-1" />
                          )}
                          {isPlaying ? "Pause" : "Play"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleManualRefresh}
                          className="text-white hover:bg-white/20"
                          disabled={isRefreshing}
                        >
                          <RefreshCw
                            className={cn(
                              "h-4 w-4 mr-1",
                              isRefreshing && "animate-spin",
                            )}
                          />
                          Refresh
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="text-white hover:bg-white/20"
                      >
                        {isFullscreen ? (
                          <Minimize2 className="h-4 w-4 mr-1" />
                        ) : (
                          <Maximize2 className="h-4 w-4 mr-1" />
                        )}
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-300">
                    <p>
                      Status:{" "}
                      <span
                        className={`font-medium ${camera.status === "online" ? "text-green-500" : "text-red-500"}`}
                      >
                        {camera.status.toUpperCase()}
                      </span>
                    </p>
                    <p className="mt-1">
                      Click on the video to create an incident report or mark a
                      traffic violation.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CCTVFeedDisplay;
