import React from "react";
import TrafficControlPanel from "./TrafficControlPanel";
import DashboardLayout from "../layout/DashboardLayout";
import TrafficHeatmap from "./TrafficHeatmap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ban, CornerUpRight, History, Save, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RouteModificationsPage = () => {
  return (
    <DashboardLayout title="Route Modifications - Tuticorin Police">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Ban className="h-6 w-6 text-red-500" />
              Route Modifications
            </h1>
            <p className="text-slate-400 mt-1">
              Manage road closures, diversions, and traffic flow adjustments
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-300 border-slate-700 bg-slate-800/50"
            >
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                  <Ban className="h-4 w-4 text-red-500" />
                  Traffic Control
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage road closures and diversions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TrafficControlPanel />
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                  <CornerUpRight className="h-4 w-4 text-blue-500" />
                  Active Diversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600">Active</Badge>
                      <span className="text-sm text-slate-300">
                        Harbor Road Diversion
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600">Active</Badge>
                      <span className="text-sm text-slate-300">
                        Market Diversion
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-600">Scheduled</Badge>
                      <span className="text-sm text-slate-300">
                        School Zone Diversion
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                    >
                      Activate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  Road Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Main Street</span>
                    <Badge className="bg-green-600">Open</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Harbor Road</span>
                    <Badge className="bg-red-600">Closed</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      Market Avenue
                    </span>
                    <Badge className="bg-green-600">Open</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Beach Road</span>
                    <Badge className="bg-amber-600">Partial</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">School Zone</span>
                    <Badge className="bg-purple-600">Time Restricted</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="bg-slate-800 text-slate-400">
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  Traffic Map
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  Saved Templates
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  Modification History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="mt-4">
                <div className="h-[calc(100vh-250px)] min-h-[500px] rounded-lg overflow-hidden border border-slate-800">
                  <TrafficHeatmap />
                </div>
              </TabsContent>

              <TabsContent value="templates" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 cursor-pointer transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium text-white">
                        Festival Day Plan
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Created on May 15, 2023
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-slate-300">
                        <p>
                          Special traffic plan for major festivals with 3 road
                          closures and 5 diversions.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-slate-700 text-slate-300"
                          >
                            Apply Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 cursor-pointer transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium text-white">
                        School Hours Plan
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Created on June 2, 2023
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-slate-300">
                        <p>
                          Traffic management plan for school opening and closing
                          hours.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-slate-700 text-slate-300"
                          >
                            Apply Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 cursor-pointer transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium text-white">
                        Market Day Plan
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Created on April 10, 2023
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-slate-300">
                        <p>
                          Special traffic management for weekly market days with
                          temporary diversions.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-slate-700 text-slate-300"
                          >
                            Apply Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 cursor-pointer transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium text-white">
                        Emergency Response Plan
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Created on July 8, 2023
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-slate-300">
                        <p>
                          Emergency traffic management plan for disaster
                          response scenarios.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-slate-700 text-slate-300"
                          >
                            Apply Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">
                      Modification History
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Recent traffic control changes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 border-blue-500 pl-4 py-1">
                        <p className="text-sm font-medium text-white">
                          Harbor Road Closed
                        </p>
                        <p className="text-xs text-slate-400">
                          Today, 10:15 AM
                        </p>
                        <p className="text-sm text-slate-300 mt-1">
                          Officer: John Doe
                        </p>
                      </div>

                      <div className="border-l-2 border-green-500 pl-4 py-1">
                        <p className="text-sm font-medium text-white">
                          Beach Road Reopened
                        </p>
                        <p className="text-xs text-slate-400">
                          Today, 09:30 AM
                        </p>
                        <p className="text-sm text-slate-300 mt-1">
                          Officer: Jane Smith
                        </p>
                      </div>

                      <div className="border-l-2 border-blue-500 pl-4 py-1">
                        <p className="text-sm font-medium text-white">
                          Market Diversion Created
                        </p>
                        <p className="text-xs text-slate-400">
                          Yesterday, 04:45 PM
                        </p>
                        <p className="text-sm text-slate-300 mt-1">
                          Officer: Mike Johnson
                        </p>
                      </div>

                      <div className="border-l-2 border-red-500 pl-4 py-1">
                        <p className="text-sm font-medium text-white">
                          Emergency Closure: Main Junction
                        </p>
                        <p className="text-xs text-slate-400">
                          Yesterday, 02:20 PM
                        </p>
                        <p className="text-sm text-slate-300 mt-1">
                          Officer: Sarah Williams
                        </p>
                      </div>

                      <div className="border-l-2 border-amber-500 pl-4 py-1">
                        <p className="text-sm font-medium text-white">
                          School Zone Restriction Applied
                        </p>
                        <p className="text-xs text-slate-400">
                          July 10, 2023, 07:30 AM
                        </p>
                        <p className="text-sm text-slate-300 mt-1">
                          Officer: Robert Brown
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RouteModificationsPage;
