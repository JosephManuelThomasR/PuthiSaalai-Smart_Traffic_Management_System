import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  MapPin,
  Clock,
  Camera,
  Send,
  Plus,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveIncidentReportPanelProps {
  className?: string;
  onSubmit?: (incidentData: any) => void;
}

const LiveIncidentReportPanel = ({
  className,
  onSubmit = () => {},
}: LiveIncidentReportPanelProps) => {
  const [incidentType, setIncidentType] = useState("");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const incidentData = {
        id: `INC-${Math.floor(Math.random() * 10000)}`,
        type: incidentType,
        location,
        severity,
        description,
        timestamp: new Date().toISOString(),
        status: "new",
      };

      onSubmit(incidentData);

      // Reset form
      setIncidentType("");
      setLocation("");
      setSeverity("");
      setDescription("");
      setIsSubmitting(false);
      setShowForm(false);
    }, 1000);
  };

  return (
    <Card className={cn("bg-slate-900 border-slate-800 shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg font-medium text-white">
              Live Incident Reporting
            </CardTitle>
          </div>
          {!showForm ? (
            <Button
              size="sm"
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              <Plus className="h-4 w-4 mr-1" /> Report Incident
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowForm(false)}
              className="text-slate-300 border-slate-700"
            >
              Cancel
            </Button>
          )}
        </div>
        <CardDescription className="text-slate-400">
          Report traffic incidents, accidents, or violations in real-time
        </CardDescription>
      </CardHeader>

      <CardContent>
        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incident-type" className="text-slate-300">
                  Incident Type
                </Label>
                <Select
                  value={incidentType}
                  onValueChange={setIncidentType}
                  required
                >
                  <SelectTrigger
                    id="incident-type"
                    className="bg-slate-800 border-slate-700 text-white"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="accident">Accident</SelectItem>
                    <SelectItem value="congestion">
                      Traffic Congestion
                    </SelectItem>
                    <SelectItem value="roadblock">Road Block</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="violation">Traffic Violation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity" className="text-slate-300">
                  Severity
                </Label>
                <Select value={severity} onValueChange={setSeverity} required>
                  <SelectTrigger
                    id="severity"
                    className="bg-slate-800 border-slate-700 text-white"
                  >
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-300">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="location"
                  placeholder="Enter location or intersection"
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Provide details about the incident"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[80px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-slate-300 border-slate-700 bg-slate-800/50"
                >
                  <Camera className="h-4 w-4 mr-1" /> Add Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-slate-300 border-slate-700 bg-slate-800/50"
                >
                  <MapPin className="h-4 w-4 mr-1" /> Use GPS
                </Button>
              </div>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" /> Submit Report
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-500/20">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Recent Accident</h4>
                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Main Junction</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>10 mins ago</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
              >
                <FileText className="h-4 w-4 mr-1" /> View
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Road Closure</h4>
                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Harbor Road</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>25 mins ago</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
              >
                <FileText className="h-4 w-4 mr-1" /> View
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-500/20">
                  <AlertTriangle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Traffic Violation</h4>
                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Beach Road</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>45 mins ago</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
              >
                <FileText className="h-4 w-4 mr-1" /> View
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveIncidentReportPanel;
