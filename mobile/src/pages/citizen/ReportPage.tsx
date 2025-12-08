
import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, Send, Loader2 } from 'lucide-react';
import CitizenLayout from '@/components/CitizenLayout';
import SmartCard from '@/components/ui/card/SmartCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SmartButton } from '@/components/ui/button/SmartButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import TrafficMap from '@/components/TrafficMap';

const ReportPage = () => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(fileArray);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportType) {
      toast.error('Please select a report type');
      return;
    }
    
    if (!description) {
      toast.error('Please provide a description');
      return;
    }
    
    if (!location && !useCurrentLocation) {
      toast.error('Please provide a location or use your current location');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock form submission with timeout
    setTimeout(() => {
      toast.success('Your report has been submitted successfully!');
      setReportType('');
      setDescription('');
      setLocation('');
      setImages([]);
      setIsSubmitting(false);
    }, 2000);
  };
  
  const getCurrentLocation = () => {
    setUseCurrentLocation(true);
    toast.info('Using your current location');
    // In a real app, we would use the browser's geolocation API here
  };
  
  return (
    <CitizenLayout title="Report Traffic Incident">
      <div className="container mx-auto max-w-6xl p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section>
            <SmartCard className="p-6">
              <h2 className="text-xl font-semibold mb-6">Submit New Report</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of report" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accident">Traffic Accident</SelectItem>
                      <SelectItem value="congestion">Traffic Congestion</SelectItem>
                      <SelectItem value="roadwork">Road Construction/Repair</SelectItem>
                      <SelectItem value="hazard">Road Hazard</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe the incident in detail..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location">Location</Label>
                    <button 
                      type="button" 
                      className="text-xs text-primary hover:underline"
                      onClick={getCurrentLocation}
                    >
                      Use my location
                    </button>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      id="location"
                      placeholder={useCurrentLocation ? "Using your current location" : "Enter incident location"}
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={useCurrentLocation}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="images">Add Images (optional)</Label>
                  <div className="border border-input rounded-md p-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="images"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                        <input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    
                    {images.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {images.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`preview ${index}`}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              className="absolute -top-1 -right-1 bg-background rounded-full p-0.5"
                              onClick={() => {
                                const newImages = [...images];
                                newImages.splice(index, 1);
                                setImages(newImages);
                              }}
                            >
                              <span className="sr-only">Remove</span>
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <SmartButton 
                  type="submit" 
                  className="w-full"
                  isLoading={isSubmitting}
                  loadingText="Submitting report..."
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-4 w-4" /> Submit Report
                </SmartButton>
              </form>
            </SmartCard>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Select Location on Map</h2>
            <div className="h-[600px] rounded-lg overflow-hidden">
              <TrafficMap showSearch={true} />
            </div>
          </section>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default ReportPage;
