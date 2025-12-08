// Simulated traffic signal data for Tuticorin

export interface TrafficSignal {
  id: string;
  location: string;
  status: "operational" | "maintenance" | "offline";
  congestionLevel: number; // 0-100
  lastUpdated: string;
  coordinates: [number, number]; // [latitude, longitude]
  cameras: string[];
  incidents?: {
    id: string;
    type: string;
    severity: "low" | "medium" | "high";
    timestamp: string;
    description: string;
  }[];
}

// Function to generate random congestion level
const getRandomCongestion = () => Math.floor(Math.random() * 100);

// Function to get random status
const getRandomStatus = (): "operational" | "maintenance" | "offline" => {
  const statuses: ("operational" | "maintenance" | "offline")[] = [
    "operational",
    "maintenance",
    "offline",
  ];
  const weights = [0.85, 0.1, 0.05]; // 85% operational, 10% maintenance, 5% offline
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) return statuses[i];
  }
  return "operational";
};

// Function to simulate real-time data updates
export const updateTrafficSignals = () => {
  const updatedSignals = trafficSignals.map((signal) => {
    // Generate new random incidents occasionally
    let updatedIncidents = signal.incidents || [];

    // 10% chance to add a new incident if there are fewer than 3
    if (
      Math.random() < 0.1 &&
      (!updatedIncidents || updatedIncidents.length < 3)
    ) {
      const incidentTypes = [
        "Minor Accident",
        "Traffic Violation",
        "Signal Malfunction",
        "Power Outage",
        "Road Construction",
        "Vehicle Breakdown",
        "Pedestrian Incident",
        "Flooding",
      ];

      const severities: ("low" | "medium" | "high")[] = [
        "low",
        "medium",
        "high",
      ];
      const severityWeights = [0.5, 0.3, 0.2]; // 50% low, 30% medium, 20% high

      let selectedSeverity: "low" | "medium" | "high" = "low";
      const random = Math.random();
      let sum = 0;
      for (let i = 0; i < severityWeights.length; i++) {
        sum += severityWeights[i];
        if (random < sum) {
          selectedSeverity = severities[i];
          break;
        }
      }

      const newIncident = {
        id: `INC${Math.floor(Math.random() * 10000)}`,
        type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
        severity: selectedSeverity,
        timestamp: new Date().toISOString(),
        description: `New incident detected at ${signal.location}`,
      };

      updatedIncidents = [...updatedIncidents, newIncident];
    }

    // 20% chance to remove an incident if there are any
    if (
      Math.random() < 0.2 &&
      updatedIncidents &&
      updatedIncidents.length > 0
    ) {
      updatedIncidents = updatedIncidents.slice(0, -1);
    }

    return {
      ...signal,
      congestionLevel: getRandomCongestion(),
      status: getRandomStatus(),
      lastUpdated: new Date().toISOString(),
      incidents: updatedIncidents,
    };
  });

  // Occasionally add a new traffic signal (5% chance)
  if (Math.random() < 0.05 && trafficSignals.length < 15) {
    const newSignalId = `TS${(trafficSignals.length + 1).toString().padStart(3, "0")}`;
    const locations = [
      "New Beach Road Junction",
      "Industrial Estate Entrance",
      "College Road Crossing",
      "Airport Road Junction",
      "Fisheries Harbor Entrance",
      "New Bus Terminal",
    ];

    // Create a new signal with coordinates near an existing one
    const baseSignal =
      trafficSignals[Math.floor(Math.random() * trafficSignals.length)];
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;

    const newSignal = {
      id: newSignalId,
      location: locations[Math.floor(Math.random() * locations.length)],
      status: getRandomStatus(),
      congestionLevel: getRandomCongestion(),
      lastUpdated: new Date().toISOString(),
      coordinates: [
        baseSignal.coordinates[0] + latOffset,
        baseSignal.coordinates[1] + lngOffset,
      ] as [number, number],
      cameras: [`CAM${Math.floor(Math.random() * 1000)}`],
    };

    trafficSignals.push(newSignal);
  }

  // Occasionally remove a traffic signal (3% chance)
  if (Math.random() < 0.03 && trafficSignals.length > 10) {
    trafficSignals.pop();
  }

  return updatedSignals;
};

// Initial traffic signal data
const trafficSignals: TrafficSignal[] = [
  {
    id: "TS001",
    location: "VOC Chowk",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7642, 78.1348],
    cameras: ["CAM001", "CAM002"],
    incidents: [
      {
        id: "INC001",
        type: "Minor Accident",
        severity: "low",
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        description: "Two-wheeler collision with no injuries",
      },
    ],
  },
  {
    id: "TS002",
    location: "Palayamkottai Road Junction",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7739, 78.1343],
    cameras: ["CAM003"],
  },
  {
    id: "TS003",
    location: "Third Gate Signal",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7594, 78.1369],
    cameras: ["CAM004", "CAM005"],
  },
  {
    id: "TS004",
    location: "Tuticorin Port Entrance",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7456, 78.1951],
    cameras: ["CAM006"],
  },
  {
    id: "TS005",
    location: "Millerpuram Junction",
    status: "maintenance",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7825, 78.1354],
    cameras: ["CAM007"],
    incidents: [
      {
        id: "INC002",
        type: "Signal Maintenance",
        severity: "medium",
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        description: "Scheduled maintenance of traffic lights",
      },
    ],
  },
  {
    id: "TS006",
    location: "Bryant Nagar Signal",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7689, 78.1226],
    cameras: ["CAM008", "CAM009"],
  },
  {
    id: "TS007",
    location: "Thoothukudi Medical College Junction",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7903, 78.1339],
    cameras: ["CAM010"],
  },
  {
    id: "TS008",
    location: "Pudukottai Junction",
    status: "offline",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7631, 78.1432],
    cameras: ["CAM011"],
    incidents: [
      {
        id: "INC003",
        type: "Power Outage",
        severity: "high",
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        description: "Signal offline due to local power outage",
      },
    ],
  },
  {
    id: "TS009",
    location: "Sipcot Junction",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7789, 78.0989],
    cameras: ["CAM012", "CAM013"],
  },
  {
    id: "TS010",
    location: "Korampallam Junction",
    status: "operational",
    congestionLevel: getRandomCongestion(),
    lastUpdated: new Date().toISOString(),
    coordinates: [8.7542, 78.1073],
    cameras: ["CAM014"],
  },
];

export default trafficSignals;
