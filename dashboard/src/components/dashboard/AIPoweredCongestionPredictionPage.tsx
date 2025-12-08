import React, { useState } from "react";
import AIPredictionModule from "./AIPredictionModule";
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
import { Sparkles, Clock, BarChart, AlertTriangle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIPoweredCongestionPredictionPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(30);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const handleTimeRangeChange = (value: number) => {
    setSelectedTimeRange(value);
  };

  const handlePredictionSelect = (prediction: any) => {
    setSelectedPrediction(prediction);
  };

  return (
    <DashboardLayout title="AI-Powered Congestion Prediction - Tuticorin Police">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              AI-Powered Congestion Prediction
            </h1>
            <p className="text-slate-400 mt-1">
              Predictive analytics for traffic congestion in the next{" "}
              {selectedTimeRange} minutes
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-300 border-slate-700 bg-slate-800/50"
            >
              <Clock className="h-4 w-4 mr-2" />
              Historical Data
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-800 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  AI Predictions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Forecasted congestion points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[calc(100vh-300px)] min-h-[400px]">
                  <AIPredictionModule
                    timeRange={selectedTimeRange}
                    onTimeRangeChange={handleTimeRangeChange}
                    onViewOnMap={handlePredictionSelect}
                  />
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
                  Prediction Map
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
                >
                  Trends
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="mt-4">
                <div className="h-[calc(100vh-250px)] min-h-[500px] rounded-lg overflow-hidden border border-slate-800">
                  <TrafficHeatmap />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-blue-500" />
                        Congestion Patterns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs text-slate-400">
                              Congestion by Location
                            </div>
                            <div className="text-xs text-slate-400">
                              Last 24 hours
                            </div>
                          </div>
                          <div className="flex-1 flex items-end gap-2">
                            <div className="flex flex-col items-center">
                              <div className="bg-red-500 w-8 h-36"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                Main Jct
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-orange-500 w-8 h-24"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                Harbor
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-green-500 w-8 h-12"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                Market
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-red-500 w-8 h-32"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                Beach Rd
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-orange-500 w-8 h-20"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                Hospital
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-red-500 w-8 h-28"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                Bus Stn
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-green-500 w-8 h-16"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                School
                              </div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-orange-500 w-8 h-22"></div>
                              <div className="text-xs text-slate-400 mt-1">
                                Railway
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Time Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs text-slate-400">
                              Congestion by Time
                            </div>
                            <div className="text-xs text-slate-400">
                              Average vehicle count
                            </div>
                          </div>
                          <div className="flex-1 relative">
                            <svg
                              className="w-full h-full"
                              viewBox="0 0 300 150"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0,120 C20,100 40,110 60,80 C80,60 100,30 120,40 C140,50 160,20 180,10 C200,20 220,40 240,30 C260,20 280,40 300,60"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                              />
                              <path
                                d="M0,120 C20,100 40,110 60,80 C80,60 100,30 120,40 C140,50 160,20 180,10 C200,20 220,40 240,30 C260,20 280,40 300,60 L300,150 L0,150 Z"
                                fill="rgba(59, 130, 246, 0.1)"
                              />
                            </svg>
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400">
                              <div>6AM</div>
                              <div>9AM</div>
                              <div>12PM</div>
                              <div>3PM</div>
                              <div>6PM</div>
                              <div>9PM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        Congestion Severity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs text-slate-400">
                              Current Severity Distribution
                            </div>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <div className="w-40 h-40 rounded-full relative">
                              <div className="absolute inset-0 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 w-1/2 h-full bg-red-500 origin-right"></div>
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500 origin-left"></div>
                                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-green-500"></div>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center">
                                  <div className="text-white text-sm">
                                    Severity
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="text-xs text-slate-400">
                                High (42%)
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                              <div className="text-xs text-slate-400">
                                Medium (25%)
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <div className="text-xs text-slate-400">
                                Low (33%)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        Hotspot Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs text-slate-400">
                              Top Congestion Hotspots
                            </div>
                            <div className="text-xs text-slate-400">
                              Last 7 days
                            </div>
                          </div>
                          <div className="flex-1 relative bg-slate-800 rounded-md overflow-hidden">
                            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center"></div>
                            <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-red-500/70 animate-pulse"></div>
                            <div className="absolute top-1/3 right-1/3 w-10 h-10 rounded-full bg-red-500/70 animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-14 h-14 rounded-full bg-red-500/70 animate-pulse"></div>
                            <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-orange-500/70 animate-pulse"></div>
                            <div className="absolute bottom-1/3 left-1/3 w-10 h-10 rounded-full bg-orange-500/70 animate-pulse"></div>
                          </div>
                          <div className="mt-2 text-xs text-slate-400">
                            <div className="flex justify-between">
                              <div>1. Main Junction (145 vehicles/hr)</div>
                              <div className="text-red-400">Critical</div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <div>2. Beach Road (132 vehicles/hr)</div>
                              <div className="text-red-400">Critical</div>
                            </div>
                            <div className="flex justify-between mt-1">
                              <div>3. Harbor Road (87 vehicles/hr)</div>
                              <div className="text-amber-400">High</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="mt-4">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">
                      Historical Trends
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Congestion patterns over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[calc(100vh-350px)] min-h-[400px] relative">
                      <div className="absolute inset-0 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <div className="text-xs text-slate-400">
                                Main Junction
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              <div className="text-xs text-slate-400">
                                Beach Road
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <div className="text-xs text-slate-400">
                                Market Area
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="text-xs text-white bg-slate-700 px-2 py-1 rounded">
                              Day
                            </div>
                            <div className="text-xs text-slate-400 px-2 py-1 rounded">
                              Week
                            </div>
                            <div className="text-xs text-slate-400 px-2 py-1 rounded">
                              Month
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 relative">
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 800 300"
                            preserveAspectRatio="none"
                          >
                            {/* Grid lines */}
                            <line
                              x1="0"
                              y1="0"
                              x2="800"
                              y2="0"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="0"
                              y1="75"
                              x2="800"
                              y2="75"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="0"
                              y1="150"
                              x2="800"
                              y2="150"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="0"
                              y1="225"
                              x2="800"
                              y2="225"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="0"
                              y1="300"
                              x2="800"
                              y2="300"
                              stroke="#334155"
                              strokeWidth="1"
                            />

                            <line
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="300"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="160"
                              y1="0"
                              x2="160"
                              y2="300"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="320"
                              y1="0"
                              x2="320"
                              y2="300"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="480"
                              y1="0"
                              x2="480"
                              y2="300"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="640"
                              y1="0"
                              x2="640"
                              y2="300"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <line
                              x1="800"
                              y1="0"
                              x2="800"
                              y2="300"
                              stroke="#334155"
                              strokeWidth="1"
                            />

                            {/* Main Junction Line */}
                            <path
                              d="M0,200 C40,180 80,150 120,170 C160,190 200,220 240,200 C280,180 320,120 360,100 C400,80 440,60 480,80 C520,100 560,150 600,130 C640,110 680,90 720,110 C760,130 800,150 800,150"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />

                            {/* Beach Road Line */}
                            <path
                              d="M0,220 C40,200 80,180 120,190 C160,200 200,230 240,210 C280,190 320,150 360,130 C400,110 440,90 480,110 C520,130 560,170 600,150 C640,130 680,110 720,130 C760,150 800,170 800,170"
                              fill="none"
                              stroke="#8b5cf6"
                              strokeWidth="2"
                            />

                            {/* Market Area Line */}
                            <path
                              d="M0,250 C40,240 80,230 120,240 C160,250 200,260 240,250 C280,240 320,220 360,210 C400,200 440,190 480,200 C520,210 560,230 600,220 C640,210 680,200 720,210 C760,220 800,230 800,230"
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                          </svg>

                          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400">
                            <div>6AM</div>
                            <div>9AM</div>
                            <div>12PM</div>
                            <div>3PM</div>
                            <div>6PM</div>
                            <div>9PM</div>
                          </div>

                          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between items-start text-xs text-slate-400">
                            <div>200</div>
                            <div>150</div>
                            <div>100</div>
                            <div>50</div>
                            <div>0</div>
                          </div>
                        </div>
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

export default AIPoweredCongestionPredictionPage;
