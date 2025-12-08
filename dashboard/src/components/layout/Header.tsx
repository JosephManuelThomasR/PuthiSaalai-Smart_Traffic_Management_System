import React, { useState, useEffect } from "react";
import { Bell, Settings, LogOut, ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  userAvatar?: string;
  userName?: string;
  notificationCount?: number;
  searchValue?: string;
  onSearch?: (value: string) => void;
}

const Header = ({
  title = "Smart Traffic Management - Tuticorin Police",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=police",
  userName = "Officer",
  notificationCount = 3,
  searchValue = "",
  onSearch = () => {},
}: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const navigate = useNavigate();

  useEffect(() => {
    // Update time every second
    const updateDateTime = () => {
      const now = new Date();

      // Format time as HH:MM:SS
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      // Format date as Day, Month Date, Year
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    // Initial update
    updateDateTime();

    // Set interval for updates
    const interval = setInterval(updateDateTime, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 w-full h-16 bg-slate-900 text-white shadow-md z-40 px-4 flex items-center justify-between">
      {/* Left side - Title */}
      <div className="flex items-center gap-3">
        <img
          src="/tn-police-logo.png"
          alt="Tamil Nadu Police Logo"
          className="h-10 w-10 object-contain"
        />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center mx-4 flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 pr-10 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Search locations, incidents, or license plates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
              onClick={() => setSearchTerm("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

      {/* Center - Date and Time */}
      <div className="hidden md:flex flex-col items-center">
        <span className="text-sm font-medium">{currentTime}</span>
        <span className="text-xs text-slate-300">{currentDate}</span>
      </div>

      {/* Right side - Action Icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-slate-800 transition-colors"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-slate-800 transition-colors"
          onClick={() => navigate("/settings")}
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 p-1 hover:bg-slate-800 transition-colors"
            >
              <Avatar className="h-8 w-8 border-2 border-slate-700">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-blue-600">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm">{userName}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-slate-800 border-slate-700 text-slate-200"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
