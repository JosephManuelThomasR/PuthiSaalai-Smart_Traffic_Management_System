
// Traffic data models
export interface TrafficIncident {
  id: number;
  type: 'accident' | 'congestion' | 'roadwork';
  lat: number;
  lng: number;
  location: string;
  severity: 'high' | 'medium' | 'low';
  time: string;
  description: string;
}

export interface ParkingLocation {
  id: number;
  name: string;
  available: number;
  total: number;
  lat: number;
  lng: number;
  address: string;
  fee?: number;
}

export interface VehicleCommunication {
  id: string;
  type: 'car' | 'bus' | 'truck' | 'motorcycle';
  lat: number;
  lng: number;
  speed: number;
  direction: number; // in degrees, 0 is north, 90 is east
  status: 'normal' | 'emergency' | 'alert';
  message?: string;
}

export interface RouteInfo {
  points: [number, number][];
  travelTime: number; // in minutes
  distance: number; // in kilometers
  trafficDensity: 'low' | 'medium' | 'high';
  alternateRoutes: number;
}

export interface TrafficFlowData {
  start: [number, number];
  end: [number, number];
  intensity: number; // 0-1 where 1 is maximum congestion
}

// Enhanced real Tuticorin traffic incidents
export const trafficIncidents: TrafficIncident[] = [
  { id: 1, type: 'accident', lat: 8.7642, lng: 78.1348, location: 'Highway NH-45, near Tuticorin Port', severity: 'high', time: '10:35 AM', description: 'Multiple vehicle collision, emergency services on scene' },
  { id: 2, type: 'congestion', lat: 8.7891, lng: 78.1423, location: 'VOC Road Junction', severity: 'medium', time: '11:15 AM', description: 'Heavy traffic due to market day' },
  { id: 3, type: 'roadwork', lat: 8.7765, lng: 78.1256, location: 'Anna Salai, City Center', severity: 'medium', time: '9:00 AM', description: 'Road widening project, one lane closed' },
  { id: 4, type: 'accident', lat: 8.7512, lng: 78.1382, location: 'Palayamkottai Road', severity: 'high', time: '1:20 PM', description: 'Truck overturned, affecting both directions' },
  { id: 5, type: 'congestion', lat: 8.7734, lng: 78.1301, location: 'Ettayapuram Road', severity: 'low', time: '8:45 AM', description: 'School rush hour traffic' },
  { id: 6, type: 'roadwork', lat: 8.7689, lng: 78.1289, location: 'Thoothukudi Bypass', severity: 'medium', time: '7:30 AM', description: 'Drainage installation, expected completion in 3 days' },
  { id: 7, type: 'congestion', lat: 8.7598, lng: 78.1354, location: 'Harbour Road', severity: 'high', time: '2:15 PM', description: 'Container loading causing traffic backup' },
  { id: 8, type: 'roadwork', lat: 8.7823, lng: 78.1401, location: 'Pudukottai Road', severity: 'low', time: '11:00 AM', description: 'Pothole repairs underway' },
  { id: 9, type: 'accident', lat: 8.7701, lng: 78.1329, location: 'VE Road Junction', severity: 'medium', time: '12:40 PM', description: 'Two-wheeler collision, minor injuries reported' },
];

// Tuticorin-specific parking data
export const parkingLocations: ParkingLocation[] = [
  { id: 1, name: 'VOC Port Parking', available: 42, total: 120, lat: 8.7612, lng: 78.1943, address: 'VOC Port, Tuticorin', fee: 30 },
  { id: 2, name: 'City Center Mall Parking', available: 85, total: 200, lat: 8.7750, lng: 78.1350, address: 'City Center Mall, Anna Salai' },
  { id: 3, name: 'Railway Station Parking', available: 28, total: 75, lat: 8.7636, lng: 78.1340, address: 'Railway Station Road', fee: 20 },
  { id: 4, name: 'Tuticorin Beach Parking', available: 15, total: 40, lat: 8.8012, lng: 78.1510, address: 'Beach Road, Tuticorin' },
];

// Nearby vehicles for V2V communication
export const nearbyVehicles: VehicleCommunication[] = [
  { id: 'V-1234', type: 'car', lat: 8.7645, lng: 78.1345, speed: 45, direction: 90, status: 'normal' },
  { id: 'V-5678', type: 'bus', lat: 8.7680, lng: 78.1320, speed: 30, direction: 180, status: 'normal' },
  { id: 'V-9012', type: 'truck', lat: 8.7710, lng: 78.1375, speed: 25, direction: 270, status: 'normal' },
  { id: 'V-3456', type: 'car', lat: 8.7635, lng: 78.1390, speed: 50, direction: 0, status: 'normal' },
  { id: 'V-7890', type: 'motorcycle', lat: 8.7660, lng: 78.1425, speed: 60, direction: 45, status: 'alert', message: 'High speed zone ahead' },
  { id: 'V-1357', type: 'bus', lat: 8.7690, lng: 78.1410, speed: 20, direction: 135, status: 'normal' },
];

// Traffic flow data for visualization
export const trafficFlowData: TrafficFlowData[] = [
  { start: [8.7642, 78.1348], end: [8.7750, 78.1350], intensity: 0.8 },
  { start: [8.7750, 78.1350], end: [8.7823, 78.1401], intensity: 0.5 },
  { start: [8.7823, 78.1401], end: [8.7891, 78.1423], intensity: 0.3 },
  { start: [8.7642, 78.1348], end: [8.7598, 78.1354], intensity: 0.7 },
  { start: [8.7598, 78.1354], end: [8.7512, 78.1382], intensity: 0.4 },
];

// Route information
export const routeInfo: RouteInfo = {
  points: [
    [8.7642, 78.1348], // Start point
    [8.7680, 78.1360],
    [8.7720, 78.1370],
    [8.7750, 78.1350], // End point
  ],
  travelTime: 15,
  distance: 3.2,
  trafficDensity: 'medium',
  alternateRoutes: 2
};

// Traffic data operations
export const getTrafficIncidents = async (): Promise<TrafficIncident[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(trafficIncidents);
    }, 800);
  });
};

export const getParkingLocations = async (): Promise<ParkingLocation[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(parkingLocations);
    }, 600);
  });
};

export const getNearbyVehicles = async (): Promise<VehicleCommunication[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(nearbyVehicles);
    }, 500);
  });
};

export const getTrafficFlowData = async (): Promise<TrafficFlowData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(trafficFlowData);
    }, 700);
  });
};

export const getRouteInfo = async (
  startCoords: [number, number],
  endCoords: [number, number]
): Promise<RouteInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would calculate a route based on the coordinates
      resolve({
        ...routeInfo,
        points: [startCoords, ...routeInfo.points.slice(1, -1), endCoords]
      });
    }, 1000);
  });
};

export const getFilteredIncidents = async (
  searchQuery: string,
  filters: { accidents: boolean; congestion: boolean; roadwork: boolean }
): Promise<TrafficIncident[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = trafficIncidents.filter(incident => {
        const matchesSearch = incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             incident.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilter = (incident.type === 'accident' && filters.accidents) ||
                             (incident.type === 'congestion' && filters.congestion) ||
                             (incident.type === 'roadwork' && filters.roadwork);
                             
        return matchesSearch && matchesFilter;
      });
      
      resolve(filtered);
    }, 300);
  });
};

// Send v2v communication message
export const sendVehicleCommunication = async (
  vehicleId: string, 
  message: string
): Promise<{ success: boolean, message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would send a message to the vehicle via API
      resolve({ 
        success: true, 
        message: `Message sent to vehicle ${vehicleId}: ${message}` 
      });
    }, 500);
  });
};

// Traffic status operations
export interface TrafficStatus {
  congestion: string;
  trafficIndex: number;
  incidentCount: number;
  parkingAvailable: number;
  weatherTemp: number;
  weatherCondition: string;
  airQuality: string;
  roadCondition: string;
  vehiclesInRange: number;
}

export const getTrafficStatus = async (): Promise<TrafficStatus> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        congestion: 'Moderate',
        trafficIndex: 65,
        incidentCount: trafficIncidents.length,
        parkingAvailable: parkingLocations.reduce((total, loc) => total + loc.available, 0),
        weatherTemp: 32,
        weatherCondition: 'Sunny',
        airQuality: 'Good',
        roadCondition: 'Dry',
        vehiclesInRange: nearbyVehicles.length
      });
    }, 500);
  });
};

// Report new traffic incident
export const reportTrafficIncident = async (
  incident: Omit<TrafficIncident, 'id' | 'time'>
): Promise<{ success: boolean, message: string, newIncident?: TrafficIncident }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = trafficIncidents.length + 1;
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newIncident: TrafficIncident = {
        ...incident,
        id: newId,
        time: timeString
      };
      
      // In a real app, this would save to a database
      // For demo, we'll just simulate a success
      resolve({
        success: true,
        message: 'Incident reported successfully',
        newIncident
      });
    }, 800);
  });
};
