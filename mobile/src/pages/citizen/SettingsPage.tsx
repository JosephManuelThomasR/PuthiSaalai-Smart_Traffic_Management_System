
import React, { useState } from 'react';
import { Bell, User, Shield, MapPin, LogOut } from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import SmartCard from '@/components/ui/card/SmartCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('9876543210');
  const [defaultLocation, setDefaultLocation] = useState('Tuticorin City Center');
  const [notificationSettings, setNotificationSettings] = useState({
    accidents: true,
    congestion: true,
    roadwork: false,
    parking: true,
    weatherAlerts: true,
  });
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification preferences updated!');
  };
  
  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <CitizenLayout title="Settings">
      <div className="container mx-auto max-w-4xl p-4 space-y-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <SmartCard className="sticky top-20">
              <div className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-medium">{name}</h2>
                <p className="text-sm text-muted-foreground">Citizen Account</p>
                
                <div className="w-full mt-6 space-y-2">
                  <SmartButton variant="outline" className="w-full justify-start" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </SmartButton>
                  <SmartButton variant="outline" className="w-full justify-start" size="sm">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </SmartButton>
                  <SmartButton variant="outline" className="w-full justify-start" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy & Security
                  </SmartButton>
                  <SmartButton variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </SmartButton>
                </div>
              </div>
            </SmartCard>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <SmartCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Default Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          id="location"
                          className="pl-10"
                          value={defaultLocation}
                          onChange={(e) => setDefaultLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <SmartButton type="submit">
                      Save Profile
                    </SmartButton>
                  </div>
                </form>
              </div>
            </SmartCard>
            
            <SmartCard>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                
                <form onSubmit={handleSaveNotifications} className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="accidents">Traffic Accidents</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts about accidents in your area
                        </p>
                      </div>
                      <Switch 
                        id="accidents"
                        checked={notificationSettings.accidents}
                        onCheckedChange={() => toggleNotification('accidents')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="congestion">Traffic Congestion</Label>
                        <p className="text-sm text-muted-foreground">
                          Get updates about heavy traffic conditions
                        </p>
                      </div>
                      <Switch 
                        id="congestion"
                        checked={notificationSettings.congestion}
                        onCheckedChange={() => toggleNotification('congestion')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="roadwork">Road Construction</Label>
                        <p className="text-sm text-muted-foreground">
                          Be notified about ongoing or planned roadwork
                        </p>
                      </div>
                      <Switch 
                        id="roadwork"
                        checked={notificationSettings.roadwork}
                        onCheckedChange={() => toggleNotification('roadwork')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="parking">Parking Availability</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about nearby parking spots
                        </p>
                      </div>
                      <Switch 
                        id="parking"
                        checked={notificationSettings.parking}
                        onCheckedChange={() => toggleNotification('parking')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weatherAlerts">Weather Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notifications about weather affecting traffic
                        </p>
                      </div>
                      <Switch 
                        id="weatherAlerts"
                        checked={notificationSettings.weatherAlerts}
                        onCheckedChange={() => toggleNotification('weatherAlerts')}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <SmartButton type="submit">
                      Save Notification Preferences
                    </SmartButton>
                  </div>
                </form>
              </div>
            </SmartCard>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default SettingsPage;
