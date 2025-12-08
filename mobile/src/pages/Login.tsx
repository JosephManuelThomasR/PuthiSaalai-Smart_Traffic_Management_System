
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SmartButton } from '@/components/ui/button/SmartButton';
import SmartCard from '@/components/ui/card/SmartCard';
import { toast } from 'sonner';
import { Download, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(true);
  
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication
    setTimeout(() => {
      setIsLoading(false);
      
      if (userCredentials.username && userCredentials.password) {
        toast.success(`Welcome to the Smart Traffic Tuticorin app!`);
        navigate('/citizen');
      } else {
        toast.error('Please enter valid credentials');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <div className="animate-fade-in flex flex-col items-center mb-8">
        <div className="w-28 h-28 mb-2">
          <img 
            src="/lovable-uploads/56f92ebd-a24d-402c-be95-39398997c4eb.png" 
            alt="Tamil Nadu Police Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-center">
          Smart Traffic Tuticorin
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Traffic Management System
        </p>
      </div>

      {showAppInfo && (
        <SmartCard 
          variant="glass" 
          className="w-full max-w-md backdrop-blur-xl bg-white/90 animate-scale-in mb-4"
        >
          <div className="p-4 relative">
            <button 
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowAppInfo(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <Download className="w-10 h-10 text-primary" />
              <div>
                <h3 className="font-semibold">Download our app!</h3>
                <p className="text-sm text-muted-foreground">
                  Install this app on your device for a better experience.
                </p>
              </div>
            </div>
            <div className="mt-3">
              <SmartButton 
                size="sm" 
                className="w-full"
                onClick={() => {
                  // Show instructions for installation
                  toast.info("To install: Click the browser's menu button and select 'Add to Home Screen' or 'Install App'");
                }}
                icon={<Download className="w-4 h-4" />}
              >
                Install App
              </SmartButton>
            </div>
          </div>
        </SmartCard>
      )}

      <SmartCard 
        variant="glass" 
        className="w-full max-w-md backdrop-blur-xl bg-white/90 animate-scale-in"
      >
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <User className="w-5 h-5 text-primary" />
              <span className="font-medium">Citizen Login</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={userCredentials.username}
                onChange={handleInputChange}
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={userCredentials.password}
                onChange={handleInputChange}
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <SmartButton 
              type="submit" 
              className="w-full"
              isLoading={isLoading}
              loadingText="Signing in..."
            >
              Sign In
            </SmartButton>
            
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <a href="#" className="text-primary hover:underline">
                Register now
              </a>
            </div>
          </form>
        </div>
      </SmartCard>

      <p className="mt-8 text-xs text-center text-muted-foreground max-w-md">
        By logging in, you agree to the terms of service and privacy policy of the Smart Traffic Tuticorin application.
      </p>
    </div>
  );
};

export default Login;
