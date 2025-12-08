
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Filter } from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import SmartCard from '@/components/ui/card/SmartCard';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { getTrafficIncidents, TrafficIncident } from '@/services/trafficDataService';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<TrafficIncident[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadAlerts(activeFilter);
  }, [activeFilter]);
  
  const loadAlerts = async (filter: string) => {
    setLoading(true);
    try {
      const incidents = await getTrafficIncidents();
      
      if (filter === 'all') {
        setAlerts(incidents);
      } else {
        const filtered = incidents.filter(alert => 
          filter === 'high' 
            ? alert.severity === 'high'
            : filter === alert.type
        );
        setAlerts(filtered);
      }
    } catch (error) {
      console.error('Failed to load alerts:', error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };
  
  const getAlertIcon = (type: string) => {
    switch(type) {
      case 'accident':
        return <AlertTriangle className="w-5 h-5" />;
      case 'congestion':
        return <AlertTriangle className="w-5 h-5" />;
      case 'roadwork':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };
  
  return (
    <CitizenLayout title="Traffic Alerts">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Traffic Alerts</h2>
            
            <div className="flex items-center gap-2 overflow-x-auto p-1">
              <SmartButton 
                size="sm" 
                variant={activeFilter === 'all' ? "default" : "outline"}
                onClick={() => setActiveFilter('all')}
              >
                All
              </SmartButton>
              <SmartButton 
                size="sm" 
                variant={activeFilter === 'high' ? "default" : "outline"}
                className={activeFilter === 'high' ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                onClick={() => setActiveFilter('high')}
              >
                High Priority
              </SmartButton>
              <SmartButton 
                size="sm" 
                variant={activeFilter === 'accident' ? "default" : "outline"}
                onClick={() => setActiveFilter('accident')}
              >
                Accidents
              </SmartButton>
              <SmartButton 
                size="sm" 
                variant={activeFilter === 'congestion' ? "default" : "outline"}
                onClick={() => setActiveFilter('congestion')}
              >
                Congestion
              </SmartButton>
              <SmartButton 
                size="sm" 
                variant={activeFilter === 'roadwork' ? "default" : "outline"}
                onClick={() => setActiveFilter('roadwork')}
              >
                Roadwork
              </SmartButton>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Loading alerts...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <SmartCard key={alert.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{alert.description}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.location}</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                          'bg-green-100 text-green-600'
                        }`}>
                          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-xs text-muted-foreground">
                          Reported: {alert.time}
                        </div>
                        <SmartButton size="sm" variant="outline">
                          View on Map
                        </SmartButton>
                      </div>
                    </div>
                  </div>
                </SmartCard>
              ))}
              
              {alerts.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No alerts found</h3>
                  <p className="text-muted-foreground">There are no current traffic alerts matching your filters</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </CitizenLayout>
  );
};

export default AlertsPage;
