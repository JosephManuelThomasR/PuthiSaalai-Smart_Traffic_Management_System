
import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { SmartButton } from './ui/button/SmartButton';
import SmartCard from './ui/card/SmartCard';

const PwaInstallBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install banner
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowBanner(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Log the outcome
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Clear the deferredPrompt since it can only be used once
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-11/12 max-w-md z-50 animate-in slide-in-from-bottom">
      <SmartCard variant="glass" className="backdrop-blur-xl bg-white/90">
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0">
            <img src="/src/assets/tn-police-logo.svg" alt="App Logo" className="w-12 h-12" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Install Smart Traffic App</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add to your home screen for quick access to traffic updates and alerts
            </p>
            <div className="flex gap-2">
              <SmartButton 
                size="sm" 
                onClick={handleInstallClick}
                icon={<Download className="w-4 h-4" />}
              >
                Install
              </SmartButton>
              <SmartButton 
                size="sm" 
                variant="outline" 
                onClick={() => setShowBanner(false)}
              >
                Not now
              </SmartButton>
            </div>
          </div>
          <button 
            onClick={() => setShowBanner(false)} 
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </SmartCard>
    </div>
  );
};

export default PwaInstallBanner;
