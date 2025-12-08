import React, { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import TrafficHeatmap from "./dashboard/TrafficHeatmap";
import IncidentsPanel from "./dashboard/IncidentsPanel";
import CCTVFeedDisplay from "./dashboard/CCTVFeedDisplay";
import TrafficControlPanel from "./dashboard/TrafficControlPanel";
import AIPredictionModule from "./dashboard/AIPredictionModule";
import LiveIncidentReportPanel from "./dashboard/LiveIncidentReportPanel";
import OfficerDispatchTracker from "./dashboard/OfficerDispatchTracker";
import VehicleRegistrationLookup from "./dashboard/VehicleRegistrationLookup";
import EmergencyRouteOptimization from "./dashboard/EmergencyRouteOptimization";
import TrafficSignalStatus from "./dashboard/TrafficSignalStatus";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

function Home({ searchValue = "", onSearch = (value: string) => {} }) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Trigger refresh on all components by forcing a re-render
    setTimeout(() => {
      // Force re-render by updating state
      setShowHeatmap((prev) => {
        // Toggle and toggle back to force re-render without changing the value
        const temp = !prev;
        setTimeout(() => setShowHeatmap(prev), 100);
        return temp;
      });
      setRefreshing(false);
    }, 1500);
  };

  return (
    <div className="w-full h-screen bg-slate-950 text-white overflow-hidden">
      <Header />

      <div className="flex h-[calc(100vh-66px)]">
        <Sidebar />

        <main className="flex-1 p-4 overflow-auto ml-64">
          <div className="grid grid-cols-12 gap-4">
            {/* Welcome section with controls */}
            <div className="col-span-12 mb-2 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  Welcome to Tuticorin Police Traffic Management System
                </h1>
                <p className="text-slate-400">
                  Monitor and manage traffic conditions across the city in
                  real-time
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-slate-300 border-slate-700 bg-slate-800/50 h-9"
                  onClick={handleRefresh}
                >
                  <RefreshCw
                    className={cn(
                      "h-4 w-4 mr-1",
                      refreshing && "animate-spin text-blue-400",
                    )}
                  />
                  {refreshing ? "Refreshing..." : "Refresh Data"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9",
                    showHeatmap
                      ? "text-green-400 border-green-800/50 bg-green-900/20 hover:bg-green-900/30"
                      : "text-slate-300 border-slate-700 bg-slate-800/50",
                  )}
                  onClick={() => setShowHeatmap(!showHeatmap)}
                >
                  {showHeatmap ? (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Heatmap On
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Heatmap Off
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Top row */}
            <div className="col-span-12 lg:col-span-8">
              {showHeatmap ? (
                <TrafficHeatmap />
              ) : (
                <div className="h-[400px] flex items-center justify-center border border-dashed border-slate-700 rounded-lg bg-slate-900/50">
                  <div className="text-center">
                    <EyeOff className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-slate-400">
                      Heatmap Disabled
                    </h3>
                    <p className="text-sm text-slate-500 max-w-md">
                      The traffic heatmap is currently disabled to reduce visual
                      complexity
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 text-blue-400 border-blue-900/50 hover:bg-blue-900/20"
                      onClick={() => setShowHeatmap(true)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> Enable Heatmap
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-12 lg:col-span-4">
              <IncidentsPanel />
            </div>

            {/* Middle row */}
            <div className="col-span-12">
              <CCTVFeedDisplay />
            </div>

            {/* Bottom row - first section */}
            <div className="col-span-12 lg:col-span-8">
              <TrafficControlPanel />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <AIPredictionModule />
            </div>

            {/* New features row */}
            <div className="col-span-12">
              <h2 className="text-xl font-bold mb-3 mt-2 text-white flex items-center">
                Advanced Features
              </h2>
            </div>

            {/* New features - first row */}
            <div className="col-span-12 lg:col-span-6">
              <LiveIncidentReportPanel />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <OfficerDispatchTracker />
            </div>

            {/* New features - second row */}
            <div className="col-span-12 lg:col-span-6">
              <VehicleRegistrationLookup />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <EmergencyRouteOptimization />
            </div>

            {/* Traffic Signal Status */}
            <div className="col-span-12">
              <h2 className="text-xl font-bold mb-3 mt-2 text-white flex items-center">
                Traffic Signal Network
              </h2>
            </div>
            <div className="col-span-12">
              <TrafficSignalStatus />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
