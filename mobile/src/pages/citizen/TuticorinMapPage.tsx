
import React, { useState, useEffect } from 'react';
import { Search, Wifi, AlertTriangle, BarChart3, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import TrafficMap from '@/components/TrafficMap';
import { SmartButton } from '@/components/ui/button/SmartButton';
import SmartCard from '@/components/ui/card/SmartCard';
import { getTrafficStatus, TrafficStatus } from '@/services/trafficDataService';
import { toast } from 'sonner';

const TuticorinMapPage = () => {
  const [showV2V, setShowV2V] = useState(false);
  const [trafficStatus, setTrafficStatus] = useState<TrafficStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const status = await getTrafficStatus();
        setTrafficStatus(status);
      } catch (error) {
        console.error('Failed to load traffic status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStatus();
  }, []);
  
  const toggleV2V = () => {
    if (!showV2V) {
      toast.success('Vehicle-to-Vehicle communication enabled');
    } else {
      toast.info('Vehicle-to-Vehicle communication disabled');
    }
    setShowV2V(!showV2V);
  };

  const handleReportIssue = () => {
    toast.info('Opening report incident form...', { 
      description: 'You can report new traffic incidents here.' 
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Header title="Tuticorin Traffic Map" userType="citizen" />
      
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-16">
          <div className="container mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
              <div>
                <h1 className="text-xl font-bold text-orange-900">Tuticorin Live Traffic</h1>
                <p className="text-sm text-orange-700">Real-time traffic conditions and updates</p>
              </div>
              
              <div className="flex gap-2">
                <SmartButton 
                  variant="gradient" 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg transition-all"
                  onClick={handleReportIssue}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span className="inline-block">Report Issue</span>
                </SmartButton>
                
                <SmartButton 
                  variant={showV2V ? "default" : "outline"}
                  className={showV2V ? "bg-green-600 text-white hover:bg-green-700" : "border-green-600 text-green-700"}
                  onClick={toggleV2V}
                >
                  <Wifi className="w-4 h-4" />
                  <span className="inline-block">{showV2V ? "V2V Active" : "Enable V2V"}</span>
                </SmartButton>
              </div>
            </div>
            
            {!isLoading && trafficStatus && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <SmartCard className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-blue-100">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-700">Traffic Index</div>
                      <div className="text-lg font-semibold text-blue-900">{trafficStatus.trafficIndex}%</div>
                    </div>
                  </div>
                </SmartCard>
                
                <SmartCard className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-orange-100">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-xs text-orange-700">Incidents</div>
                      <div className="text-lg font-semibold text-orange-900">{trafficStatus.incidentCount}</div>
                    </div>
                  </div>
                </SmartCard>
                
                <SmartCard className="p-3 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-green-100">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-green-700">Parking Spots</div>
                      <div className="text-lg font-semibold text-green-900">{trafficStatus.parkingAvailable}</div>
                    </div>
                  </div>
                </SmartCard>
                
                <SmartCard className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Wifi className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-700">V2V Range</div>
                      <div className="text-lg font-semibold text-purple-900">{trafficStatus.vehiclesInRange} vehicles</div>
                    </div>
                  </div>
                </SmartCard>
              </div>
            )}
            
            <div className="h-[calc(100vh-16rem)] rounded-xl overflow-hidden shadow-lg border border-orange-200">
              <TrafficMap showSearch={true} showV2V={showV2V} />
            </div>
          </div>
        </main>
      </div>
      
      <Navigation userType="citizen" />
    </div>
  );
};

export default TuticorinMapPage;
