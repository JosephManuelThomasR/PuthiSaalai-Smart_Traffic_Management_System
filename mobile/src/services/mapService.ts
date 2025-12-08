
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TrafficIncident, ParkingLocation, VehicleCommunication } from './trafficDataService';

// Variable to store the Mapbox token
let mapboxToken = '';

// Function to set Mapbox token
export const setMapboxToken = (token: string): void => {
  mapboxToken = token;
  console.log('Mapbox token set successfully');
};

// Function to get the Mapbox token
export const getMapboxToken = (): string => {
  return mapboxToken;
};

// Initialize map using OpenStreetMap
export const initializeMap = (
  containerId: string, 
  center: [number, number] = [8.7642, 78.1347], // Tuticorin coordinates (lat, lng)
  zoom: number = 13
): L.Map => {
  // Create map instance
  const map = L.map(containerId, {
    center: center,
    zoom: zoom,
    zoomControl: false,
    attributionControl: true
  });
  
  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  
  // Add zoom controls to top-right
  L.control.zoom({
    position: 'topright'
  }).addTo(map);

  console.log('Map initialized with OpenStreetMap tiles');
  
  return map;
};

// Custom icon for traffic incidents
const createTrafficIcon = (severity: 'high' | 'medium' | 'low', type: 'accident' | 'congestion' | 'roadwork'): L.DivIcon => {
  const className = `traffic-icon traffic-${severity} traffic-type-${type}`;
  
  return L.divIcon({
    className: className,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<div class="icon-inner"></div>`
  });
};

// Add markers for traffic incidents
export const addTrafficIncidentMarkers = (
  map: L.Map, 
  incidents: TrafficIncident[]
): L.Marker[] => {
  const markers: L.Marker[] = [];
  
  incidents.forEach(incident => {
    // Create custom icon based on severity and type
    const icon = createTrafficIcon(incident.severity, incident.type);
    
    // Create marker with popup
    const marker = L.marker([incident.lat, incident.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div class="incident-popup">
          <h3 class="text-base font-semibold capitalize">${incident.type}</h3>
          <p class="text-sm">${incident.location}</p>
          <p class="text-xs mt-1">${incident.time} - ${incident.description}</p>
          <div class="mt-2 text-xs flex items-center">
            <span class="severity-badge severity-${incident.severity}">
              ${incident.severity.toUpperCase()}
            </span>
            <span class="ml-auto text-muted-foreground">ID: ${incident.id}</span>
          </div>
        </div>
      `);
    
    markers.push(marker);
  });
  
  return markers;
};

// Custom icon for parking locations
const createParkingIcon = (available: number, total: number): L.DivIcon => {
  const percentage = (available / total) * 100;
  const colorClass = percentage > 50 ? 'good' : percentage > 20 ? 'medium' : 'low';
  
  return L.divIcon({
    className: `parking-icon parking-${colorClass}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    html: `<div class="parking-icon-inner">${available}</div>`
  });
};

// Add markers for parking locations
export const addParkingMarkers = (
  map: L.Map, 
  parkingSpots: ParkingLocation[]
): L.Marker[] => {
  const markers: L.Marker[] = [];
  
  parkingSpots.forEach(spot => {
    // Create custom icon
    const icon = createParkingIcon(spot.available, spot.total);
    
    // Create marker with popup
    const marker = L.marker([spot.lat, spot.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div class="parking-popup">
          <h3 class="text-base font-semibold">${spot.name}</h3>
          <p class="text-sm">${spot.address}</p>
          <div class="mt-2 text-sm">
            <span class="font-medium">${spot.available}</span> spots available out of <span>${spot.total}</span>
          </div>
          ${spot.fee ? `<div class="mt-1 text-xs">Fee: ₹${spot.fee}/hour</div>` : ''}
          <button class="navigate-btn mt-2 bg-primary text-white text-xs rounded-md px-3 py-1 w-full" 
            data-lat="${spot.lat}" data-lng="${spot.lng}">
            Navigate Here
          </button>
        </div>
      `);
    
    markers.push(marker);
  });
  
  return markers;
};

// Add user location marker with pulsing effect
export const addUserLocationMarker = (
  map: L.Map, 
  position: [number, number] = [8.7642, 78.1347]
): L.Marker => {
  const userIcon = L.divIcon({
    className: 'user-location-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    html: `
      <div class="user-marker-inner"></div>
      <div class="user-marker-pulse"></div>
    `
  });
  
  return L.marker(position, { icon: userIcon })
    .addTo(map);
};

// Add nearby vehicles for V2V communication visualization
export const addNearbyVehicles = (
  map: L.Map,
  vehicles: VehicleCommunication[]
): L.Marker[] => {
  const markers: L.Marker[] = [];
  
  vehicles.forEach(vehicle => {
    const vehicleIcon = L.divIcon({
      className: `vehicle-marker vehicle-${vehicle.type}`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      html: `<div class="vehicle-icon-inner"></div>`
    });
    
    const marker = L.marker([vehicle.lat, vehicle.lng], { icon: vehicleIcon })
      .addTo(map)
      .bindPopup(`
        <div class="vehicle-popup">
          <h3 class="text-sm font-medium">${vehicle.type.toUpperCase()}</h3>
          <p class="text-xs">${vehicle.id}</p>
          <p class="text-xs mt-1">Speed: ${vehicle.speed} km/h</p>
          <p class="text-xs">Direction: ${vehicle.direction}°</p>
          <button class="communicate-btn mt-2 bg-primary text-white text-xs rounded-md px-3 py-1 w-full" 
            data-id="${vehicle.id}">
            Send Alert
          </button>
        </div>
      `);
    
    markers.push(marker);
  });
  
  return markers;
};

// Add traffic flow visualization
export const addTrafficFlowLayer = (
  map: L.Map,
  trafficFlow: { start: [number, number], end: [number, number], intensity: number }[]
): void => {
  trafficFlow.forEach(flow => {
    const color = flow.intensity > 0.7 ? '#ef4444' : 
                 flow.intensity > 0.4 ? '#f59e0b' : '#22c55e';
                 
    L.polyline([flow.start, flow.end], {
      color: color,
      weight: 5,
      opacity: 0.7,
      dashArray: '10, 5',
      className: 'traffic-flow-line'
    }).addTo(map);
  });
};

// Add route visualization with travel time estimate
export const showRouteOnMap = (
  map: L.Map,
  routePoints: [number, number][],
  travelTime: number,
  distance: number
): L.Polyline => {
  const route = L.polyline(routePoints, {
    color: '#3b82f6',
    weight: 5,
    opacity: 0.8
  }).addTo(map);
  
  // Add start and end markers
  const startIcon = L.divIcon({
    className: 'route-start-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    html: '<div class="start-marker-inner">A</div>'
  });
  
  const endIcon = L.divIcon({
    className: 'route-end-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    html: '<div class="end-marker-inner">B</div>'
  });
  
  L.marker(routePoints[0], { icon: startIcon }).addTo(map);
  L.marker(routePoints[routePoints.length - 1], { icon: endIcon }).addTo(map);
  
  // Add route info popup to the middle point
  const midPointIndex = Math.floor(routePoints.length / 2);
  
  L.popup({
    className: 'route-info-popup',
    closeButton: false,
    offset: [0, -10]
  })
    .setLatLng(routePoints[midPointIndex])
    .setContent(`
      <div class="route-info">
        <div class="text-sm font-medium">Est. Travel Time: ${travelTime} min</div>
        <div class="text-xs">Distance: ${distance.toFixed(1)} km</div>
      </div>
    `)
    .openOn(map);
  
  return route;
};

// Add all map styles to the document
export const addMapStyles = (): void => {
  if (document.getElementById('leaflet-custom-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'leaflet-custom-styles';
  style.innerHTML = `
    .leaflet-container {
      font-family: 'Inter', sans-serif;
      border-radius: 0.75rem;
      overflow: hidden;
      width: 100% !important;
      height: 100% !important;
    }
    
    /* Traffic incident markers */
    .traffic-icon {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
    }
    
    .traffic-high { background-color: #ef4444; }
    .traffic-medium { background-color: #f59e0b; }
    .traffic-low { background-color: #22c55e; }
    
    .traffic-type-accident .icon-inner:before { content: '!'; color: white; font-weight: bold; }
    .traffic-type-congestion .icon-inner:before { content: '⌛'; color: white; }
    .traffic-type-roadwork .icon-inner:before { content: '🛠️'; color: white; }
    
    /* Parking markers */
    .parking-icon {
      border-radius: 50%;
      background-color: #3b82f6;
      border: 2px solid white;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
    
    .parking-icon-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: white;
      font-weight: bold;
      font-size: 12px;
    }
    
    .parking-good { background-color: #22c55e; }
    .parking-medium { background-color: #f59e0b; }
    .parking-low { background-color: #ef4444; }
    
    /* User location marker */
    .user-location-marker {
      position: relative;
    }
    
    .user-marker-inner {
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: #3b82f6;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
      top: 4px;
      left: 4px;
    }
    
    .user-marker-pulse {
      background-color: rgba(59, 130, 246, 0.3);
      border-radius: 50%;
      height: 40px;
      width: 40px;
      position: absolute;
      top: -8px;
      left: -8px;
      z-index: -1;
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(0.5); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    
    /* Vehicle markers */
    .vehicle-marker {
      border-radius: 50%;
      background-color: #8b5cf6;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
    }
    
    .vehicle-car .vehicle-icon-inner:before { content: '🚗'; font-size: 10px; }
    .vehicle-bus .vehicle-icon-inner:before { content: '🚌'; font-size: 10px; }
    .vehicle-truck .vehicle-icon-inner:before { content: '🚚'; font-size: 10px; }
    .vehicle-motorcycle .vehicle-icon-inner:before { content: '🏍️'; font-size: 10px; }
    
    /* Popups */
    .leaflet-popup-content-wrapper {
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .severity-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 9999px;
    }
    
    .severity-high { background-color: rgba(239, 68, 68, 0.15); color: #ef4444; }
    .severity-medium { background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; }
    .severity-low { background-color: rgba(34, 197, 94, 0.15); color: #22c55e; }
    
    /* Route markers */
    .route-start-marker, .route-end-marker {
      border-radius: 50%;
      background-color: white;
      border: 2px solid #3b82f6;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .start-marker-inner, .end-marker-inner {
      font-size: 12px;
      font-weight: bold;
      color: #3b82f6;
    }
    
    /* Route info popup */
    .route-info-popup .leaflet-popup-content-wrapper {
      background-color: #3b82f6;
      color: white;
    }
    
    .route-info-popup .leaflet-popup-tip {
      background-color: #3b82f6;
    }
    
    .navigate-btn, .communicate-btn {
      transition: all 0.2s;
    }
    
    .navigate-btn:hover, .communicate-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    
    /* Fix for traffic-colors */
    .bg-traffic-red { background-color: #ef4444; }
    .text-traffic-red { color: #ef4444; }
    .bg-traffic-yellow { background-color: #f59e0b; }
    .text-traffic-yellow { color: #f59e0b; }
    .bg-traffic-green { background-color: #22c55e; }
    .text-traffic-green { color: #22c55e; }
  `;
  
  document.head.appendChild(style);
  console.log('Map styles added to document');
};

// Clear all markers and layers from map
export const clearMapLayers = (map: L.Map): void => {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });
};
