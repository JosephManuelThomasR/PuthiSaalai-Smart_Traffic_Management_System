
import React, { useState, useEffect } from 'react';
import { Map as LeafletMap } from 'leaflet';
import { toast } from 'sonner';
import { 
  getTrafficIncidents, 
  getParkingLocations, 
  getFilteredIncidents,
  getNearbyVehicles,
  getTrafficFlowData,
  sendVehicleCommunication,
  TrafficIncident,
  VehicleCommunication
} from '@/services/trafficDataService';

// Import refactored components
import MapContainer from './map/MapContainer';
import SearchBar from './map/SearchBar';
import MapFilters from './map/MapFilters';
import TransportControls from './map/TransportControls';
import TrafficAlerts from './map/TrafficAlerts';
import V2VPanel from './map/V2VPanel';
import LoadingOverlay from './map/LoadingOverlay';
import { useIsMobile } from '@/hooks/use-mobile';

interface TrafficMapProps {
  showSearch?: boolean;
  showV2V?: boolean;
  className?: string;
}

const TrafficMap: React.FC<TrafficMapProps> = ({ 
  showSearch = false,
  showV2V = false,
  className = ''
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIncidents, setFilteredIncidents] = useState<TrafficIncident[]>([]);
  const [nearbyVehicles, setNearbyVehicles] = useState<VehicleCommunication[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showV2VPanel, setShowV2VPanel] = useState(false);
  const [parkingSpots, setParkingSpots] = useState<any[]>([]);
  const [trafficFlow, setTrafficFlow] = useState<any[]>([]);
  
  const [activeFilters, setActiveFilters] = useState({
    accidents: true,
    congestion: true,
    roadwork: true,
  });
  
  const [mapLayers, setMapLayers] = useState({
    incidents: true,
    parking: true,
    vehicles: true,
    trafficFlow: false
  });
  
  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const incidents = await getTrafficIncidents();
        const spots = await getParkingLocations();
        const vehicles = await getNearbyVehicles();
        const flow = await getTrafficFlowData();
        
        setFilteredIncidents(incidents);
        setParkingSpots(spots);
        setNearbyVehicles(vehicles);
        setTrafficFlow(flow);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading map data:', error);
        toast.error('Failed to load map data');
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);
  
  // Update data when filters change
  useEffect(() => {
    const updateFilters = async () => {
      try {
        const incidents = await getFilteredIncidents(searchQuery, activeFilters);
        setFilteredIncidents(incidents);
      } catch (error) {
        console.error('Error updating filters:', error);
        toast.error('Failed to update filters');
      }
    };
    
    if (!isLoading) {
      updateFilters();
    }
  }, [searchQuery, activeFilters, isLoading]);
  
  // Handle map element clicks (for buttons in popups)
  const handleMapClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Handle navigation buttons in popups
    if (target.classList.contains('navigate-btn') || target.parentElement?.classList.contains('navigate-btn')) {
      const btn = target.classList.contains('navigate-btn') ? target : target.parentElement;
      const lat = btn?.getAttribute('data-lat');
      const lng = btn?.getAttribute('data-lng');
      
      if (lat && lng) {
        toast.success(`Navigation started to ${lat}, ${lng}`);
      }
    }
    
    // Handle vehicle communication buttons
    if (target.classList.contains('communicate-btn') || target.parentElement?.classList.contains('communicate-btn')) {
      const btn = target.classList.contains('communicate-btn') ? target : target.parentElement;
      const vehicleId = btn?.getAttribute('data-id');
      
      if (vehicleId) {
        setSelectedVehicle(vehicleId);
        setShowV2VPanel(true);
      }
    }
  };
  
  const toggleFilter = (filterType: 'accidents' | 'congestion' | 'roadwork') => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
    
    toast.info(`${filterType.charAt(0).toUpperCase() + filterType.slice(1)} filter ${activeFilters[filterType] ? 'disabled' : 'enabled'}`);
  };
  
  const toggleLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
    
    toast.info(`${layer.charAt(0).toUpperCase() + layer.slice(1)} layer ${mapLayers[layer] ? 'hidden' : 'shown'}`);
  };
  
  const handleSendMessage = async (vehicleId: string, message: string) => {
    if (!vehicleId || !message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    try {
      const result = await sendVehicleCommunication(vehicleId, message);
      
      if (result.success) {
        toast.success(result.message);
        setShowV2VPanel(false);
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Communication failed');
    }
  };

  const handleFindMyLocation = () => {
    toast.success('Finding your location...');
    // This functionality relies on the LeafletMap instance which is now in MapContainer
    // We'll use a custom event to communicate this
    const event = new CustomEvent('find-my-location');
    document.dispatchEvent(event);
  };

  const handleNavigate = (mode: 'car' | 'bike') => {
    toast.success(`Starting ${mode} navigation`);
    // In a real app, this would start navigation based on the selected mode
  };
  
  const handleCenterMap = (lat: number, lng: number, location: string) => {
    toast.info(`Centered on: ${location}`);
    // We'll use a custom event to communicate with the map component
    const event = new CustomEvent('center-map', {
      detail: { lat, lng, zoom: 16 }
    });
    document.dispatchEvent(event);
  };

  return (
    <div className={`relative w-full h-full rounded-lg overflow-hidden ${className}`}>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          {/* Map Container */}
          <MapContainer 
            mapLayers={mapLayers}
            filteredIncidents={filteredIncidents}
            parkingSpots={parkingSpots}
            nearbyVehicles={nearbyVehicles}
            trafficFlow={trafficFlow}
            showV2V={showV2V}
            handleMapClick={handleMapClick}
          />
          
          {/* Search Bar */}
          {showSearch && (
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
          
          {/* Map Controls and Filters */}
          <MapFilters 
            activeFilters={activeFilters}
            mapLayers={mapLayers}
            toggleFilter={toggleFilter}
            toggleLayer={toggleLayer}
            handleFindMyLocation={handleFindMyLocation}
            showV2V={showV2V}
            showV2VPanel={showV2VPanel}
            toggleV2VPanel={() => setShowV2VPanel(!showV2VPanel)}
          />
          
          {/* Traffic Incidents Panel */}
          <TrafficAlerts 
            incidents={filteredIncidents}
            onCenterMap={handleCenterMap}
          />
          
          {/* Transport Mode Controls */}
          <TransportControls onNavigate={handleNavigate} />
          
          {/* V2V Communication Panel */}
          {showV2V && (
            <V2VPanel
              show={showV2VPanel}
              vehicles={nearbyVehicles}
              selectedVehicle={selectedVehicle}
              onPanelClose={() => setShowV2VPanel(false)}
              onVehicleSelect={setSelectedVehicle}
              onSendMessage={handleSendMessage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TrafficMap;
