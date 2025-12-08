
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Car, AlertTriangle, Bell, Calendar, BarChart3, Search } from 'lucide-react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import SmartCard from '@/components/ui/card/SmartCard';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { Input } from '@/components/ui/input';
import TrafficMap from '@/components/TrafficMap';
import { toast } from 'sonner';
import { getTrafficStatus, TrafficStatus } from '@/services/trafficDataService';

// User travel plans
const travelPlans = [
  {
    id: 1,
    title: 'Work commute',
    time: '8:30 AM',
    advice: 'Best time to leave: Now',
    destination: 'VOC Port, Tuticorin',
    eta: '25 mins'
  },
  {
    id: 2,
    title: 'Shopping mall visit',
    time: '6:00 PM',
    advice: 'Rush hour, consider alternate route',
    destination: 'City Center Mall, Tuticorin',
    eta: '35 mins'
  },
  {
    id: 3,
    title: 'Beach visit',
    time: '4:30 PM',
    advice: 'Medium traffic expected',
    destination: 'Tuticorin Beach',
    eta: '20 mins'
  }
];

const CitizenDashboard = () => {
  const location = useLocation();
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('John');
  const [searchQuery, setSearchQuery] = useState('');
  const [trafficStatus, setTrafficStatus] = useState<TrafficStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentAlerts, setRecentAlerts] = useState([
    { 
      id: 1, 
      type: 'accident', 
      title: 'Major accident on NH-45', 
      time: '15 minutes ago', 
      impact: 'Expect delays of 25 mins',
      location: 'Near Tuticorin Port Trust',
      severity: 'high'
    },
    { 
      id: 2, 
      type: 'roadwork', 
      title: 'Construction work on VOC Road', 
      time: '2 hours ago', 
      impact: 'Ongoing for 3 days',
      location: 'VOC Road Junction near Bus Stand',
      severity: 'medium'
    },
    { 
      id: 3, 
      type: 'congestion', 
      title: 'Heavy traffic at Palayamkottai Road', 
      time: '30 minutes ago', 
      impact: 'Delays up to 15 minutes',
      location: 'Near District Collector Office',
      severity: 'medium'
    }
  ]);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    toast.info(`Searching for "${searchQuery}"`);
    // In a real app, this would trigger a search API call
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Header title="Citizen Dashboard" userType="citizen" userName={userName} />
      
      <main className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
        <div className="container mx-auto max-w-6xl space-y-6 pb-6 animate-fade-in">
          <section className="mb-6">
            <div className="flex flex-col space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-warm-800">{greeting}, {userName}</h2>
              <p className="text-warm-600">Here's your Tuticorin traffic overview for today</p>
            </div>
          </section>
          
          <section className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400" />
              <Input 
                type="text"
                placeholder="Search location, traffic alerts, or parking..." 
                className="pl-10 pr-24 bg-white border-warm-200 focus:border-warm-400 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <SmartButton 
                  type="submit" 
                  size="sm" 
                  className="h-8"
                  variant="vibrant-gradient"
                  isRounded={true}
                >
                  Search
                </SmartButton>
              </div>
            </form>
          </section>
          
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SmartCard 
              className="col-span-1 p-4" 
              variant="gradient" 
              isHoverable={true}
              isFloating={true}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-blue-700 mb-1">Traffic Status</span>
                <span className="text-lg font-semibold text-blue-900">
                  {isLoading ? 'Loading...' : trafficStatus?.congestion}
                </span>
                <div className="mt-2 w-full bg-blue-200/50 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${isLoading ? 0 : trafficStatus?.trafficIndex}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-blue-700">
                  Road Condition: {isLoading ? 'Loading...' : trafficStatus?.roadCondition}
                </div>
              </div>
            </SmartCard>
            
            <SmartCard 
              className="col-span-1 p-4" 
              variant="gradient"
              isHoverable={true}
              isFloating={true}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-green-700 mb-1">Parking Spots</span>
                <span className="text-lg font-semibold text-green-900">
                  {isLoading ? 'Loading...' : trafficStatus?.parkingAvailable} Available
                </span>
                <div className="mt-2 text-xs text-green-700">
                  Across 4 major locations in Tuticorin
                </div>
              </div>
            </SmartCard>
            
            <SmartCard 
              className="col-span-1 p-4" 
              variant="gradient"
              isHoverable={true}
              isFloating={true}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-amber-700 mb-1">Incidents</span>
                <span className="text-lg font-semibold text-amber-900">
                  {isLoading ? 'Loading...' : trafficStatus?.incidentCount} Active
                </span>
                <div className="mt-2 text-xs text-amber-700">
                  3 high priority incidents
                </div>
              </div>
            </SmartCard>
            
            <SmartCard 
              className="col-span-1 p-4" 
              variant="gradient"
              isHoverable={true}
              isFloating={true}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-purple-700 mb-1">Weather</span>
                <span className="text-lg font-semibold text-purple-900">
                  {isLoading ? 'Loading...' : `${trafficStatus?.weatherTemp}°C ${trafficStatus?.weatherCondition}`}
                </span>
                <div className="mt-2 text-xs text-purple-700">
                  Air Quality: {isLoading ? 'Loading...' : trafficStatus?.airQuality}
                </div>
              </div>
            </SmartCard>
          </section>
          
          <section className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-warm-800">Live Tuticorin Traffic Map</h3>
              <Link to="/citizen/map">
                <SmartButton 
                  variant="vibrant" 
                  size="pill-sm"
                  isRounded={true}
                  hasGlow={true}
                >
                  Full Map
                </SmartButton>
              </Link>
            </div>
            <div className="h-[400px] rounded-xl overflow-hidden border border-warm-200 shadow-lg">
              <TrafficMap showSearch={false} />
            </div>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SmartCard className="col-span-1" variant="vibrant">
              <div className="p-4 border-b border-orange-200">
                <h3 className="font-semibold text-warm-900">Recent Alerts</h3>
              </div>
              <div className="divide-y divide-orange-100">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className="p-4 flex gap-3 hover:bg-orange-50 transition-colors">
                    <div className={`p-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                      alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 
                      'bg-green-100 text-green-600'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-warm-900">{alert.title}</p>
                      <p className="text-xs text-warm-600">{alert.time} - {alert.impact}</p>
                      <p className="text-xs text-warm-500">{alert.location}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <Link to="/citizen/alerts" className="text-sm text-warm-600 hover:text-warm-800 hover:underline">
                  View all alerts
                </Link>
              </div>
            </SmartCard>
            
            <SmartCard className="col-span-1" variant="vibrant">
              <div className="p-4 border-b border-orange-200">
                <h3 className="font-semibold text-warm-900">Your Travel Plans</h3>
              </div>
              <div className="divide-y divide-orange-100">
                {travelPlans.map(plan => (
                  <div key={plan.id} className="p-4 flex gap-3 hover:bg-orange-50 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-warm-900">{plan.title}</p>
                      <p className="text-xs text-warm-600">{plan.time} - {plan.advice}</p>
                      <p className="text-xs text-warm-500">To: {plan.destination} (ETA: {plan.eta})</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <Link to="/citizen/plans" className="text-sm text-warm-600 hover:text-warm-800 hover:underline">
                  Manage travel plans
                </Link>
              </div>
            </SmartCard>
          </section>
        </div>
      </main>
      
      <Navigation userType="citizen" />
    </div>
  );
};

export default CitizenDashboard;
