
import React from 'react';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { AlertTriangle, AlertCircle, Construction, Layers, Navigation, Wifi } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapFiltersProps {
  activeFilters: {
    accidents: boolean;
    congestion: boolean;
    roadwork: boolean;
  };
  mapLayers: {
    incidents: boolean;
    parking: boolean;
    vehicles: boolean;
    trafficFlow: boolean;
  };
  toggleFilter: (filterType: 'accidents' | 'congestion' | 'roadwork') => void;
  toggleLayer: (layer: 'incidents' | 'parking' | 'vehicles' | 'trafficFlow') => void;
  handleFindMyLocation: () => void;
  showV2V: boolean;
  showV2VPanel: boolean;
  toggleV2VPanel: () => void;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  activeFilters,
  mapLayers,
  toggleFilter,
  toggleLayer,
  handleFindMyLocation,
  showV2V,
  showV2VPanel,
  toggleV2VPanel
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="absolute top-16 right-2 flex gap-2 overflow-x-auto pb-2 max-w-full">
        <SmartButton 
          variant={activeFilters.accidents ? "default" : "glass"} 
          size="pill-sm"
          className={`backdrop-blur-lg flex items-center justify-center whitespace-nowrap ${activeFilters.accidents ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/70 text-foreground'}`}
          onClick={() => toggleFilter('accidents')}
        >
          <AlertTriangle className="w-3 h-3 mr-1" />
          <span>Accidents</span>
        </SmartButton>
        <SmartButton 
          variant={activeFilters.congestion ? "default" : "glass"} 
          size="pill-sm"
          className={`backdrop-blur-lg flex items-center justify-center whitespace-nowrap ${activeFilters.congestion ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-white/70 text-foreground'}`}
          onClick={() => toggleFilter('congestion')}
        >
          <AlertCircle className="w-3 h-3 mr-1" />
          <span>Traffic</span>
        </SmartButton>
        <SmartButton 
          variant={activeFilters.roadwork ? "default" : "glass"} 
          size="pill-sm"
          className={`backdrop-blur-lg flex items-center justify-center whitespace-nowrap ${activeFilters.roadwork ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white/70 text-foreground'}`}
          onClick={() => toggleFilter('roadwork')}
        >
          <Construction className="w-3 h-3 mr-1" />
          <span>Roadwork</span>
        </SmartButton>
        <SmartButton 
          variant="glass" 
          size="pill-sm"
          className="backdrop-blur-lg bg-white/70 text-foreground hover:bg-white/90 flex items-center justify-center whitespace-nowrap"
          onClick={handleFindMyLocation}
        >
          <Navigation className="w-3 h-3 mr-1" />
          <span>My Location</span>
        </SmartButton>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <SmartButton 
        variant={activeFilters.accidents ? "default" : "glass"} 
        size="icon" 
        className={`backdrop-blur-lg flex items-center justify-center ${activeFilters.accidents ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/70 text-foreground'}`}
        onClick={() => toggleFilter('accidents')}
        title="Toggle accident reports"
      >
        <AlertTriangle className="w-4 h-4" />
      </SmartButton>
      <SmartButton 
        variant={activeFilters.congestion ? "default" : "glass"} 
        size="icon" 
        className={`backdrop-blur-lg flex items-center justify-center ${activeFilters.congestion ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-white/70 text-foreground'}`}
        onClick={() => toggleFilter('congestion')}
        title="Toggle congestion reports"
      >
        <AlertCircle className="w-4 h-4" />
      </SmartButton>
      <SmartButton 
        variant={activeFilters.roadwork ? "default" : "glass"} 
        size="icon" 
        className={`backdrop-blur-lg flex items-center justify-center ${activeFilters.roadwork ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white/70 text-foreground'}`}
        onClick={() => toggleFilter('roadwork')}
        title="Toggle roadwork reports"
      >
        <Construction className="w-4 h-4" />
      </SmartButton>
      <div className="h-px bg-gray-300/50 my-1"></div>
      <SmartButton 
        variant={mapLayers.trafficFlow ? "default" : "glass"} 
        size="icon" 
        className={`backdrop-blur-lg flex items-center justify-center ${mapLayers.trafficFlow ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-white/70 text-foreground'}`}
        onClick={() => toggleLayer('trafficFlow')}
        title="Toggle traffic flow visualization"
      >
        <Layers className="w-4 h-4" />
      </SmartButton>
      <SmartButton 
        variant="glass" 
        size="icon" 
        className="backdrop-blur-lg bg-white/70 text-foreground hover:bg-white/90 flex items-center justify-center"
        onClick={handleFindMyLocation}
        title="Find my location"
      >
        <Navigation className="w-4 h-4" />
      </SmartButton>
      {showV2V && (
        <SmartButton 
          variant={showV2VPanel ? "default" : "glass"} 
          size="icon" 
          className={`backdrop-blur-lg flex items-center justify-center ${showV2VPanel ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white/70 text-foreground hover:bg-white/90'}`}
          onClick={toggleV2VPanel}
          title="Vehicle-to-Vehicle Communication"
        >
          <Wifi className="w-4 h-4" />
        </SmartButton>
      )}
    </div>
  );
};

export default MapFilters;
