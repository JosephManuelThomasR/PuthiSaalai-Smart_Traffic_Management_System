import React, { useState } from "react";
import CCTVFeedDisplay from "./CCTVFeedDisplay";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Search, Filter, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const LiveCCTVFeedsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout title="Live CCTV Feeds - Tuticorin Police">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Camera className="h-6 w-6 text-blue-500" />
              Live CCTV Feeds
            </h1>
            <p className="text-slate-400 mt-1">
              Monitor traffic through live camera feeds across the city
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search cameras..."
                className="pl-8 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-slate-300 border-slate-700 bg-slate-800/50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-800 text-slate-400">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              All Cameras
            </TabsTrigger>
            <TabsTrigger
              value="junctions"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Traffic Junctions
            </TabsTrigger>
            <TabsTrigger
              value="highways"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Highways
            </TabsTrigger>
            <TabsTrigger
              value="markets"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Market Areas
            </TabsTrigger>
            <TabsTrigger
              value="schools"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              School Zones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[calc(100vh-250px)] min-h-[500px]">
                <CCTVFeedDisplay />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="junctions" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[calc(100vh-250px)] min-h-[500px]">
                <CCTVFeedDisplay />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="highways" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[calc(100vh-250px)] min-h-[500px]">
                <CCTVFeedDisplay />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="markets" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[calc(100vh-250px)] min-h-[500px]">
                <CCTVFeedDisplay />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schools" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="h-[calc(100vh-250px)] min-h-[500px]">
                <CCTVFeedDisplay />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Camera Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-600">32 Online</Badge>
                <Badge className="bg-red-600">3 Offline</Badge>
                <Badge className="bg-amber-600">2 Maintenance</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                Coverage Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>Main Junctions (12 cameras)</li>
                  <li>Highway Entrances (8 cameras)</li>
                  <li>Market Areas (6 cameras)</li>
                  <li>School Zones (5 cameras)</li>
                  <li>Hospital Areas (4 cameras)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                <Camera className="h-4 w-4 text-blue-500" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Junction Camera 1</span>
                  <Badge className="bg-amber-600">Medium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Market Area Camera 4</span>
                  <Badge className="bg-red-600">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">School Zone Camera 6</span>
                  <Badge className="bg-green-600">Low</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveCCTVFeedsPage;
