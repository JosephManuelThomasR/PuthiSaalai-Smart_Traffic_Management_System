
import React from 'react';
import { AlertTriangle, AlertCircle, Construction } from 'lucide-react';
import SmartCard from '@/components/ui/card/SmartCard';
import { TrafficIncident } from '@/services/trafficDataService';
import { useIsMobile } from '@/hooks/use-mobile';

interface TrafficAlertsProps {
  incidents: TrafficIncident[];
  onCenterMap: (lat: number, lng: number, location: string) => void;
}

const TrafficAlerts: React.FC<TrafficAlertsProps> = ({ incidents, onCenterMap }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`absolute ${isMobile ? 'bottom-20' : 'bottom-4'} left-1/2 transform -translate-x-1/2 w-11/12 sm:w-auto max-w-md`}>
      <SmartCard variant="glass" className="backdrop-blur-xl bg-gradient-to-br from-orange-50/90 to-white/90 shadow-float overflow-auto max-h-56">
        <div className="flex items-center justify-between p-3 border-b border-orange-200">
          <h3 className="font-medium text-orange-700">Traffic Alerts</h3>
          <span className="text-xs bg-orange-100 text-orange-700 rounded-full px-2 py-0.5">
            {incidents.length} active
          </span>
        </div>
        <div className="space-y-1 p-1">
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <div 
                key={incident.id} 
                className="p-2 rounded-md flex items-start hover:bg-orange-50 transition-colors cursor-pointer"
                onClick={() => onCenterMap(incident.lat, incident.lng, incident.location)}
              >
                <div className={`p-1 rounded-md mr-2 flex-shrink-0 ${
                  incident.type === 'accident' ? 'bg-traffic-red/20 text-traffic-red' :
                  incident.type === 'congestion' ? 'bg-traffic-yellow/20 text-traffic-yellow' :
                  'bg-traffic-green/20 text-traffic-green'
                }`}>
                  {incident.type === 'accident' ? <AlertTriangle className="w-3 h-3" /> :
                   incident.type === 'congestion' ? <AlertCircle className="w-3 h-3" /> :
                   <Construction className="w-3 h-3" />}
                </div>
                <div>
                  <div className="text-xs font-medium capitalize">{incident.type}</div>
                  <div className="text-xs text-muted-foreground">{incident.location}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{incident.time} - {incident.description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No incidents match your filters
            </div>
          )}
        </div>
      </SmartCard>
    </div>
  );
};

export default TrafficAlerts;
