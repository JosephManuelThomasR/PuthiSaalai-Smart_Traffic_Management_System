import React from "react";
import IncidentsPanel from "./IncidentsPanel";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Filter, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActiveIncidentsAlertsPage = () => {
  return (
    <DashboardLayout title="Active Incidents & Alerts - Tuticorin Police">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              Active Incidents & Alerts
            </h1>
            <p className="text-slate-400 mt-1">
              Monitor and respond to traffic incidents across Tuticorin
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-300 border-slate-700 bg-slate-800/50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Alert
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-slate-800 text-slate-400">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  All Incidents
                </TabsTrigger>
                <TabsTrigger
                  value="high"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  High Priority
                </TabsTrigger>
                <TabsTrigger
                  value="medium"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  Medium Priority
                </TabsTrigger>
                <TabsTrigger
                  value="low"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  Low Priority
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="h-[calc(100vh-250px)] min-h-[500px]">
                  <IncidentsPanel />
                </div>
              </TabsContent>

              <TabsContent value="high" className="mt-4">
                <div className="h-[calc(100vh-250px)] min-h-[500px]">
                  <IncidentsPanel />
                </div>
              </TabsContent>

              <TabsContent value="medium" className="mt-4">
                <div className="h-[calc(100vh-250px)] min-h-[500px]">
                  <IncidentsPanel />
                </div>
              </TabsContent>

              <TabsContent value="low" className="mt-4">
                <div className="h-[calc(100vh-250px)] min-h-[500px]">
                  <IncidentsPanel />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  Incident Statistics
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">
                      Total Incidents
                    </span>
                    <span className="text-sm font-medium text-white">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">
                      High Priority
                    </span>
                    <span className="text-sm font-medium text-red-400">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">
                      Medium Priority
                    </span>
                    <span className="text-sm font-medium text-amber-400">
                      12
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Low Priority</span>
                    <span className="text-sm font-medium text-green-400">
                      7
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-300">Resolved</span>
                    <span className="text-sm font-medium text-blue-400">
                      18
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-300">
                        Incident #1082 resolved
                      </p>
                      <p className="text-xs text-slate-500">10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-300">
                        New medium priority incident
                      </p>
                      <p className="text-xs text-slate-500">25 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-300">
                        Traffic diversion created
                      </p>
                      <p className="text-xs text-slate-500">45 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActiveIncidentsAlertsPage;
