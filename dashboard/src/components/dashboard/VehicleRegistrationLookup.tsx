import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Car,
  Search,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleRegistrationLookupProps {
  className?: string;
}

interface VehicleData {
  regNumber: string;
  owner: string;
  model: string;
  year: string;
  color: string;
  status: "valid" | "expired" | "suspended" | "stolen";
  lastUpdated: string;
  violations?: string[];
}

const VehicleRegistrationLookup = ({
  className,
}: VehicleRegistrationLookupProps) => {
  const [regNumber, setRegNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Mock vehicle database
  const vehicleDatabase: Record<string, VehicleData> = {
    TN01AB1234: {
      regNumber: "TN01AB1234",
      owner: "Rajesh Kumar",
      model: "Maruti Swift",
      year: "2019",
      color: "White",
      status: "valid",
      lastUpdated: "2023-05-15",
    },
    TN02CD5678: {
      regNumber: "TN02CD5678",
      owner: "Priya Singh",
      model: "Honda City",
      year: "2020",
      color: "Silver",
      status: "expired",
      lastUpdated: "2023-06-20",
      violations: ["Parking violation - 2023-04-10", "Speeding - 2023-05-22"],
    },
    TN03EF9012: {
      regNumber: "TN03EF9012",
      owner: "Mohammed Ali",
      model: "Hyundai i20",
      year: "2018",
      color: "Red",
      status: "suspended",
      lastUpdated: "2023-07-05",
      violations: [
        "No insurance - 2023-03-15",
        "Running red light - 2023-06-30",
        "Speeding - 2023-07-02",
      ],
    },
    TN04GH3456: {
      regNumber: "TN04GH3456",
      owner: "Lakshmi Venkatesh",
      model: "Toyota Innova",
      year: "2021",
      color: "Black",
      status: "valid",
      lastUpdated: "2023-08-10",
    },
    TN05IJ7890: {
      regNumber: "TN05IJ7890",
      owner: "Suresh Patel",
      model: "Mahindra XUV300",
      year: "2022",
      color: "Blue",
      status: "stolen",
      lastUpdated: "2023-09-01",
      violations: ["Reported stolen - 2023-08-25"],
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError("");

    // Format registration number (remove spaces, convert to uppercase)
    const formattedRegNumber = regNumber.replace(/\s+/g, "").toUpperCase();

    // Simulate API call delay
    setTimeout(() => {
      if (vehicleDatabase[formattedRegNumber]) {
        setVehicleData(vehicleDatabase[formattedRegNumber]);

        // Add to recent searches if not already there
        if (!recentSearches.includes(formattedRegNumber)) {
          setRecentSearches((prev) => [
            formattedRegNumber,
            ...prev.slice(0, 4), // Keep only the 5 most recent
          ]);
        }
      } else {
        setVehicleData(null);
        setError("No vehicle found with the provided registration number.");
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return (
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-4 w-4 mr-1" />
            Valid
          </div>
        );
      case "expired":
        return (
          <div className="flex items-center text-amber-400">
            <Clock className="h-4 w-4 mr-1" />
            Expired
          </div>
        );
      case "suspended":
        return (
          <div className="flex items-center text-red-400">
            <XCircle className="h-4 w-4 mr-1" />
            Suspended
          </div>
        );
      case "stolen":
        return (
          <div className="flex items-center text-red-500 font-semibold">
            <AlertCircle className="h-4 w-4 mr-1" />
            STOLEN
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <Card className={cn("bg-slate-900 border-slate-800 shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg font-medium text-white">
            Vehicle Registration Lookup
          </CardTitle>
        </div>
        <CardDescription className="text-slate-400">
          Search for vehicle information by registration number
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reg-number" className="text-slate-300">
              Registration Number
            </Label>
            <div className="relative">
              <Car className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="reg-number"
                placeholder="Enter vehicle registration (e.g., TN01AB1234)"
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 h-8"
                disabled={isSearching || regNumber.length < 4}
              >
                {isSearching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-100/10 border border-red-200/20 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
        </form>

        {vehicleData && (
          <div className="mt-4 p-4 border border-slate-700 rounded-lg bg-slate-800/50">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-white">
                {vehicleData.regNumber}
              </h3>
              {getStatusBadge(vehicleData.status)}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center text-slate-300">
                <User className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-400">Owner:</span>
                <span className="ml-1 text-white">{vehicleData.owner}</span>
              </div>

              <div className="flex items-center text-slate-300">
                <Car className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-400">Model:</span>
                <span className="ml-1 text-white">{vehicleData.model}</span>
              </div>

              <div className="flex items-center text-slate-300">
                <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-400">Year:</span>
                <span className="ml-1 text-white">{vehicleData.year}</span>
              </div>

              <div className="flex items-center text-slate-300">
                <div
                  className="h-4 w-4 mr-2 rounded-full border border-slate-600"
                  style={{ backgroundColor: vehicleData.color.toLowerCase() }}
                ></div>
                <span className="text-slate-400">Color:</span>
                <span className="ml-1 text-white">{vehicleData.color}</span>
              </div>
            </div>

            {vehicleData.violations && vehicleData.violations.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-700">
                <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Violations/Alerts
                </h4>
                <ul className="text-xs space-y-1 text-slate-300">
                  {vehicleData.violations.map((violation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {violation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400">
              <span>Last updated: {vehicleData.lastUpdated}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
              >
                <FileText className="h-3 w-3 mr-1" />
                Full Report
              </Button>
            </div>
          </div>
        )}

        {/* Recent searches */}
        {recentSearches.length > 0 && !vehicleData && !isSearching && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-400 mb-2">
              Recent Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <Button
                  key={search}
                  variant="outline"
                  size="sm"
                  className="text-xs text-slate-300 border-slate-700 bg-slate-800/50"
                  onClick={() => {
                    setRegNumber(search);
                    // Auto-submit the form
                    setIsSearching(true);
                    setError("");
                    setTimeout(() => {
                      setVehicleData(vehicleDatabase[search]);
                      setIsSearching(false);
                    }, 500);
                  }}
                >
                  <Car className="h-3 w-3 mr-1" />
                  {search}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleRegistrationLookup;
