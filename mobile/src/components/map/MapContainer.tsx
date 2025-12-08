
import React, { useEffect, useRef } from 'react';
import { Map as LeafletMap } from 'leaflet';
import { 
  initializeMap, 
  addTrafficIncidentMarkers, 
  addParkingMarkers, 
  addUserLocationMarker,
  addNearbyVehicles,
  addTrafficFlowLayer,
  addMapStyles,
  clearMapLayers
} from '@/services/mapService';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapContainerProps {
  mapLayers: {
    incidents: boolean;
    parking: boolean;
    vehicles: boolean;
    trafficFlow: boolean;
  };
  filteredIncidents: any[];
  parkingSpots?: any[];
  nearbyVehicles?: any[];
  trafficFlow?: any[];
  showV2V: boolean;
  handleMapClick?: (e: MouseEvent) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({
  mapLayers,
  filteredIncidents,
  parkingSpots = [],
  nearbyVehicles = [],
  trafficFlow = [],
  showV2V,
  handleMapClick
}) => {
  const isMobile = useIsMobile();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map if it doesn't exist
    if (!map.current) {
      addMapStyles();
      map.current = initializeMap('map-container');
      
      // Setup click handler for vehicle communication
      if (handleMapClick) {
        document.addEventListener('click', handleMapClick);
      }
      
      // Make sure map is properly sized after initialization
      setTimeout(() => {
        if (map.current) {
          map.current.invalidateSize();
        }
      }, 200);
    }
    
    // Update map with current data
    if (map.current) {
      clearMapLayers(map.current);
      
      if (mapLayers.incidents && filteredIncidents.length > 0) {
        addTrafficIncidentMarkers(map.current, filteredIncidents);
      }
      
      if (mapLayers.parking && parkingSpots.length > 0) {
        addParkingMarkers(map.current, parkingSpots);
      }
      
      if (mapLayers.vehicles && showV2V && nearbyVehicles.length > 0) {
        addNearbyVehicles(map.current, nearbyVehicles);
      }
      
      if (mapLayers.trafficFlow && trafficFlow.length > 0) {
        addTrafficFlowLayer(map.current, trafficFlow);
      }
      
      // Always add user location
      addUserLocationMarker(map.current);
    }

    // Listen for find-my-location event
    const handleFindMyLocation = () => {
      if (map.current) {
        // In a real implementation, use browser's geolocation API
        const userLocation = [8.7642, 78.1348]; // Tuticorin coordinates
        map.current.setView(userLocation as any, 15);
        toast("Located you on the map");
      }
    };

    // Listen for center-map event
    const handleCenterMap = (e: CustomEvent) => {
      if (map.current) {
        const { lat, lng, zoom } = e.detail;
        map.current.setView([lat, lng], zoom);
      }
    };

    document.addEventListener('find-my-location', handleFindMyLocation);
    document.addEventListener('center-map', handleCenterMap as EventListener);
    
    // Handle window resize events for responsiveness
    const handleResize = () => {
      if (map.current) {
        map.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (handleMapClick) {
        document.removeEventListener('click', handleMapClick);
      }
      document.removeEventListener('find-my-location', handleFindMyLocation);
      document.removeEventListener('center-map', handleCenterMap as EventListener);
      window.removeEventListener('resize', handleResize);
    };
  }, [mapLayers, filteredIncidents, parkingSpots, nearbyVehicles, trafficFlow, showV2V, handleMapClick]);
  
  // Expose map for parent component functions
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  return <div id="map-container" ref={mapContainer} className="w-full h-full"></div>;
};

export default MapContainer;
