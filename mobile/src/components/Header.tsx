
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface HeaderProps {
  title: string;
  userType: 'citizen' | 'police';
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ title, userType, userName = 'User' }) => {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur-lg bg-background/80 border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-foreground">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative animate-fade-in">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="end">
              <div className="p-4 border-b border-border">
                <h4 className="font-semibold">Notifications</h4>
              </div>
              <div className="max-h-80 overflow-auto">
                <div className="p-4 border-b border-border hover:bg-accent/50 transition-colors">
                  <p className="font-medium text-sm">Traffic alert on Highway</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
                <div className="p-4 border-b border-border hover:bg-accent/50 transition-colors">
                  <p className="font-medium text-sm">New parking available near Central</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="p-2 text-center">
                <Link to={`/${userType}/alerts`} className="text-sm text-primary hover:underline">
                  View all notifications
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="animate-fade-in">
                <User className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="flex flex-col space-y-1 leading-none p-2">
                <p className="font-medium">{userName}</p>
                <p className="text-sm text-muted-foreground capitalize">{userType} account</p>
              </div>
              <div className="border-t border-border mt-2 pt-2">
                <Link 
                  to={`/${userType}/settings`} 
                  className="block w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-accent"
                >
                  Settings
                </Link>
                <Link 
                  to="/login" 
                  className="block w-full text-left px-2 py-1.5 text-sm rounded-md text-red-500 hover:bg-red-500/10"
                >
                  Logout
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
