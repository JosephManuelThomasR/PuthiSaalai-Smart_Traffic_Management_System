
import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-muted-foreground font-medium">Loading traffic data...</p>
        <p className="text-xs text-muted-foreground mt-1">Please wait</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
