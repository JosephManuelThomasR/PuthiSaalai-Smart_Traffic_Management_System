import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Camera, Search, Car, Shield, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import SmartCard from '@/components/ui/card/SmartCard';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { Input } from '@/components/ui/input';
import TrafficMap from '@/components/TrafficMap';
import { Progress } from '@/components/ui/progress';

const trafficData = {
  violations: 14,
  pendingCases: 8,
  cameraFeeds: 24,
  activePatrols: 6,
  congestionLevel: 65,
  trafficFlowRate: 78,
};

const PoliceDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [officerName, setOfficerName] = useState('Officer Kumar');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Police dashboard search:', searchQuery);
    // In a real app, this would trigger a search API call
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title="Police Dashboard" userType="police" userName={officerName} />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden sm:block sm:w-64">
          <Navigation userType="police" />
        </div>
        
        <main className="flex-1 overflow-y-auto pb-16 sm:pb-0 px-4 pt-4">
          <div className="container mx-auto max-w-6xl space-y-6 pb-6 animate-fade-in">
            <section className="mb-6">
              <div className="flex flex-col space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{greeting}, {officerName}</h2>
                <p className="text-muted-foreground">Traffic monitoring dashboard</p>
              </div>
            </section>
            
            <section className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Search for locations, incidents, or vehicle numbers..." 
                  className="pl-10 pr-24"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  <SmartButton type="submit" size="sm" className="h-8" variant="police">
                    Search
                  </SmartButton>
                </div>
              </form>
            </section>
            
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SmartCard className="col-span-1 p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-muted-foreground mb-1">Today's Violations</span>
                  <span className="text-lg font-semibold">{trafficData.violations} Reported</span>
                  <div className="mt-2 text-xs text-muted-foreground">
                    +3 since yesterday
                  </div>
                </div>
              </SmartCard>
              
              <SmartCard className="col-span-1 p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-muted-foreground mb-1">Pending Cases</span>
                  <span className="text-lg font-semibold">{trafficData.pendingCases} Cases</span>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Requires verification
                  </div>
                </div>
              </SmartCard>
              
              <SmartCard className="col-span-1 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-muted-foreground mb-1">Camera Feeds</span>
                  <span className="text-lg font-semibold">{trafficData.cameraFeeds} Active</span>
                  <div className="mt-2 text-xs text-muted-foreground">
                    2 require maintenance
                  </div>
                </div>
              </SmartCard>
              
              <SmartCard className="col-span-1 p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-muted-foreground mb-1">Active Patrols</span>
                  <span className="text-lg font-semibold">{trafficData.activePatrols} Units</span>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Covering major junctions
                  </div>
                </div>
              </SmartCard>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SmartCard className="col-span-2">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h3 className="font-semibold">Live Traffic Overview</h3>
                  <Link to="/police/traffic">
                    <SmartButton variant="outline" size="sm">
                      Full Map
                    </SmartButton>
                  </Link>
                </div>
                <div className="p-4">
                  <TrafficMap showSearch={true} />
                </div>
              </SmartCard>
              
              <SmartCard className="col-span-1">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Traffic Analytics</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Congestion Level</span>
                      <span className="text-sm font-medium">{trafficData.congestionLevel}%</span>
                    </div>
                    <Progress value={trafficData.congestionLevel} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Traffic Flow Rate</span>
                      <span className="text-sm font-medium">{trafficData.trafficFlowRate}%</span>
                    </div>
                    <Progress value={trafficData.trafficFlowRate} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Peak Hours</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Ongoing</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Current peak: 16:00 - 19:00
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Link to="/police/analytics">
                      <SmartButton variant="outline" size="sm" className="w-full">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Detailed Analytics
                      </SmartButton>
                    </Link>
                  </div>
                </div>
              </SmartCard>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SmartCard className="col-span-1">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Recent Violations</h3>
                </div>
                <div className="divide-y divide-border max-h-64 overflow-y-auto">
                  <div className="p-4 flex gap-3">
                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Overspeeding (82 km/h)</p>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Severe</span>
                      </div>
                      <p className="text-xs text-muted-foreground">15 minutes ago - NH-45 Highway</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">No Parking Violation</p>
                        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">Moderate</span>
                      </div>
                      <p className="text-xs text-muted-foreground">2 hours ago - Market Road</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Signal Jumping</p>
                        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">Moderate</span>
                      </div>
                      <p className="text-xs text-muted-foreground">4 hours ago - Central Junction</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <Link to="/police/violations" className="text-sm text-primary hover:underline">
                    View all violations
                  </Link>
                </div>
              </SmartCard>
              
              <SmartCard className="col-span-1">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Camera Alerts</h3>
                </div>
                <div className="divide-y divide-border max-h-64 overflow-y-auto">
                  <div className="p-4 flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Traffic Camera #08</p>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Detecting congestion - VIP Road Junction</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Traffic Camera #12</p>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Alert</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Vehicle collision detected - NH-45</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Traffic Camera #15</p>
                        <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Maintenance</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Poor visibility - Requires cleaning</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <Link to="/police/cameras" className="text-sm text-primary hover:underline">
                    View all camera feeds
                  </Link>
                </div>
              </SmartCard>
            </section>
            
            <section>
              <SmartCard className="col-span-1">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Stolen Vehicle Alerts</h3>
                </div>
                <div className="divide-y divide-border">
                  <div className="p-4 flex gap-3">
                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">TN 69 AQ 1234</p>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Spotted</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Maruti Swift - Red - Last seen: Beach Road (10 mins ago)</p>
                    </div>
                    <SmartButton variant="outline" size="sm">
                      <Search className="w-4 h-4" />
                    </SmartButton>
                  </div>
                  <div className="p-4 flex gap-3">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">TN 69 BZ 5678</p>
                        <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Alert</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Honda City - White - Last seen: 2 hours ago</p>
                    </div>
                    <SmartButton variant="outline" size="sm">
                      <Search className="w-4 h-4" />
                    </SmartButton>
                  </div>
                </div>
                <div className="p-3 text-center">
                  <Link to="/police/vehicles" className="text-sm text-primary hover:underline">
                    View all vehicle alerts
                  </Link>
                </div>
              </SmartCard>
            </section>
          </div>
        </main>
      </div>
      
      <div className="sm:hidden">
        <Navigation userType="police" />
      </div>
    </div>
  );
};

export default PoliceDashboard;
