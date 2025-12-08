
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Car } from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import SmartCard from '@/components/ui/card/SmartCard';
import { Input } from '@/components/ui/input';
import { SmartButton } from '@/components/ui/button/SmartButton';
import TrafficMap from '@/components/TrafficMap';
import { getParkingLocations, ParkingLocation } from '@/services/trafficDataService';
import { toast } from 'sonner';

const ParkingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [parkingSpots, setParkingSpots] = useState<ParkingLocation[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadParkingSpots();
  }, []);
  
  const loadParkingSpots = async () => {
    setLoading(true);
    try {
      const spots = await getParkingLocations();
      setParkingSpots(spots);
    } catch (error) {
      console.error('Failed to load parking spots:', error);
      setParkingSpots([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const allSpots = await getParkingLocations();
      // Filter parking spots based on search query
      const filteredSpots = allSpots.filter(spot => 
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setParkingSpots(filteredSpots);
    } catch (error) {
      console.error('Error searching parking spots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (spot: ParkingLocation) => {
    toast.success(`Navigating to ${spot.name}`, {
      description: `Destination set: ${spot.address}`
    });
  };
  
  return (
    <CitizenLayout title="Parking Spots">
      <div className="container mx-auto max-w-6xl p-4 space-y-6">
        <section className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search for parking locations..." 
              className="pl-10 pr-24"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <SmartButton type="submit" size="sm" className="h-8">
                <span className="inline-block">Search</span>
              </SmartButton>
            </div>
          </form>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Available Parking Spots</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-warm-700">Loading parking spots...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {parkingSpots.map((spot) => (
                  <SmartCard key={spot.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Car className="w-4 h-4 text-primary" />
                          <h3 className="font-medium">{spot.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{spot.address}</span>
                        </div>
                        <div className="mt-3 text-sm">
                          <span className="font-medium">{spot.available}</span> spots available out of <span>{spot.total}</span>
                        </div>
                        {spot.fee > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Fee: ₹{spot.fee}/hour
                          </div>
                        )}
                      </div>
                      <SmartButton 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleNavigate(spot)}
                      >
                        <span className="inline-block">Navigate</span>
                      </SmartButton>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            (spot.available / spot.total) > 0.5 ? 'bg-green-500' : 
                            (spot.available / spot.total) > 0.2 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(spot.available / spot.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </SmartCard>
                ))}
                
                {parkingSpots.length === 0 && (
                  <div className="text-center py-8">
                    <Car className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">No parking spots found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Parking Map</h2>
            <div className="h-[600px] rounded-lg overflow-hidden">
              <TrafficMap showSearch={false} />
            </div>
          </div>
        </section>
      </div>
    </CitizenLayout>
  );
};

export default ParkingPage;
