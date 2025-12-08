import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Map,
  AlertTriangle,
  Camera,
  Sparkles,
  Ban,
  Bell,
  Settings,
  LogOut,
  Shield,
  Car,
  Route,
  Users,
  FileText,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarItem = ({
  icon,
  label,
  path,
  active = false,
}: SidebarItemProps) => {
  return (
    <Link to={path}>
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm",
          active
            ? "bg-blue-900/30 text-blue-400 border-l-2 border-blue-500"
            : "text-slate-300 hover:bg-slate-800 hover:text-white",
        )}
      >
        <div className="w-5 h-5">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("isAuthenticated");
    // Show confirmation alert
    alert("You have been logged out successfully");
    // Redirect to login page
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <Map className="w-5 h-5" />,
      label: "Real-Time Traffic Heatmap",
      path: "/heatmap",
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      label: "Active Incidents & Alerts",
      path: "/incidents",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      label: "Live CCTV Feeds",
      path: "/cctv",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: "AI-Powered Prediction",
      path: "/prediction",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      path: "/notifications",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto z-50">
      <div className="p-4 flex flex-col items-center">
        <div className="w-20 h-20 mb-2 flex items-center justify-center rounded-full shadow-lg overflow-hidden">
          <img
            src="/tn-police-logo.png"
            alt="Tamil Nadu Police Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-bold text-center text-white">
          Tuticorin Police
        </h2>
        <p className="text-sm text-center text-slate-400">
          Traffic Management System
        </p>
      </div>

      <div className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={currentPath === item.path}
          />
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 text-red-400 transition-colors rounded-lg hover:bg-red-900/20 hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
