
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Map, 
  Car, 
  AlertTriangle, 
  Bell, 
  Settings, 
  LogOut
} from 'lucide-react';

interface NavigationProps {
  userType: 'citizen' | 'police';
}

const CitizenNavItems = [
  { icon: Home, label: 'Home', path: '/citizen' },
  { icon: Map, label: 'Traffic Map', path: '/citizen/map' },
  { icon: Car, label: 'Parking', path: '/citizen/parking' },
  { icon: AlertTriangle, label: 'Report', path: '/citizen/report' },
  { icon: Bell, label: 'Alerts', path: '/citizen/alerts' },
  { icon: Settings, label: 'Settings', path: '/citizen/settings' },
];

const Navigation: React.FC<NavigationProps> = ({ userType }) => {
  const location = useLocation();
  const navItems = CitizenNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center px-2 py-3 transition-all duration-300',
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
