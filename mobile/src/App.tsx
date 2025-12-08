
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import NotFound from "./pages/NotFound";
import ParkingPage from "./pages/citizen/ParkingPage";
import ReportPage from "./pages/citizen/ReportPage";
import AlertsPage from "./pages/citizen/AlertsPage";
import SettingsPage from "./pages/citizen/SettingsPage";
import PwaInstallBanner from "./components/PwaInstallBanner";
import TuticorinMapPage from "./pages/citizen/TuticorinMapPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" expand={true} closeButton richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Citizen Routes */}
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/citizen/map" element={<TuticorinMapPage />} />
          <Route path="/citizen/parking" element={<ParkingPage />} />
          <Route path="/citizen/report" element={<ReportPage />} />
          <Route path="/citizen/alerts" element={<AlertsPage />} />
          <Route path="/citizen/settings" element={<SettingsPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PwaInstallBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
