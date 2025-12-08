
import React from 'react';
import { Car, Bike } from 'lucide-react';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { useIsMobile } from '@/hooks/use-mobile';

interface TransportControlsProps {
  onNavigate: (mode: 'car' | 'bike') => void;
}

const TransportControls: React.FC<TransportControlsProps> = ({ onNavigate }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute bottom-20 sm:bottom-4 left-4 flex flex-col gap-2">
      <SmartButton 
        variant="glass" 
        size={isMobile ? "pill-sm" : "icon"} 
        className={`backdrop-blur-lg bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white hover:from-blue-600/90 hover:to-blue-700/90 flex items-center justify-center ${isMobile ? 'px-4' : ''}`}
        title="Car navigation"
        onClick={() => onNavigate('car')}
      >
        <Car className="w-4 h-4" />
        {isMobile && <span className="ml-2">Car</span>}
      </SmartButton>
      <SmartButton 
        variant="glass" 
        size={isMobile ? "pill-sm" : "icon"}
        className={`backdrop-blur-lg bg-white/70 text-foreground hover:bg-white/90 flex items-center justify-center ${isMobile ? 'px-4' : ''}`}
        title="Bike navigation"
        onClick={() => onNavigate('bike')}
      >
        <Bike className="w-4 h-4" />
        {isMobile && <span className="ml-2">Bike</span>}
      </SmartButton>
    </div>
  );
};

export default TransportControls;
