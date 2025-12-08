
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import SmartCard from '@/components/ui/card/SmartCard';
import { Input } from '@/components/ui/input';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { VehicleCommunication } from '@/services/trafficDataService';

interface V2VPanelProps {
  show: boolean;
  vehicles: VehicleCommunication[];
  selectedVehicle: string | null;
  onPanelClose: () => void;
  onVehicleSelect: (vehicleId: string) => void;
  onSendMessage: (vehicleId: string, message: string) => Promise<void>;
}

const V2VPanel: React.FC<V2VPanelProps> = ({
  show,
  vehicles,
  selectedVehicle,
  onPanelClose,
  onVehicleSelect,
  onSendMessage
}) => {
  const [messageText, setMessageText] = useState('');
  
  if (!show) return null;
  
  const handleSendMessage = async () => {
    if (selectedVehicle && messageText.trim()) {
      await onSendMessage(selectedVehicle, messageText);
      setMessageText('');
    }
  };
  
  return (
    <div className="absolute right-4 top-1/3 w-64 z-20">
      <SmartCard className="p-3 bg-gradient-to-br from-green-50 to-green-100/90 border border-green-200 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-green-800">Vehicle Communication</h3>
          <button
            className="text-green-600 hover:text-green-800"
            onClick={onPanelClose}
          >
            ×
          </button>
        </div>
        
        {selectedVehicle ? (
          <>
            <div className="text-xs mb-2 text-green-700">
              Sending message to vehicle: <strong>{selectedVehicle}</strong>
            </div>
            
            <div className="mb-2">
              <Input
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="text-xs border-green-200 focus:border-green-400"
              />
            </div>
            
            <div className="flex gap-2">
              <SmartButton 
                size="sm" 
                className="text-xs w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSendMessage}
              >
                <MessageSquare className="w-3 h-3" />
                Send Message
              </SmartButton>
            </div>
          </>
        ) : (
          <div className="text-center py-2 text-xs text-green-700">
            Click on a vehicle icon to start communication
          </div>
        )}
        
        <div className="mt-3 text-xs text-muted-foreground border-t border-green-200 pt-2">
          <div className="font-medium text-green-700 mb-1">Nearby Vehicles: {vehicles.length}</div>
          <div className="max-h-32 overflow-y-auto">
            {vehicles.map(vehicle => (
              <div 
                key={vehicle.id}
                className="flex items-center gap-1 p-1 hover:bg-green-200/50 rounded cursor-pointer"
                onClick={() => onVehicleSelect(vehicle.id)}
              >
                <span className={`w-2 h-2 rounded-full ${
                  vehicle.status === 'normal' ? 'bg-green-500' : 
                  vehicle.status === 'alert' ? 'bg-amber-500' : 'bg-red-500'
                }`}></span>
                <span className="text-[11px]">{vehicle.id} - {vehicle.type}</span>
                <span className="text-[10px] ml-auto">{vehicle.speed} km/h</span>
              </div>
            ))}
          </div>
        </div>
      </SmartCard>
    </div>
  );
};

export default V2VPanel;
