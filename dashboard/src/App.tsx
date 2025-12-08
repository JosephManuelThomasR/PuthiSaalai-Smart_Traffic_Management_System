import { Suspense, lazy, useEffect, useState } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const LoginPage = lazy(() => import("./components/login/LoginPage"));
const RealTimeTrafficHeatmapPage = lazy(
  () => import("./components/dashboard/RealTimeTrafficHeatmapPage"),
);
const ActiveIncidentsAlertsPage = lazy(
  () => import("./components/dashboard/ActiveIncidentsAlertsPage"),
);
const LiveCCTVFeedsPage = lazy(
  () => import("./components/dashboard/LiveCCTVFeedsPage"),
);
const AIPoweredCongestionPredictionPage = lazy(
  () => import("./components/dashboard/AIPoweredCongestionPredictionPage"),
);
const RouteModificationsPage = lazy(
  () => import("./components/dashboard/RouteModificationsPage"),
);
const NotificationsPanelPage = lazy(
  () => import("./components/dashboard/NotificationsPanelPage"),
);
const SettingsPage = lazy(() => import("./components/dashboard/SettingsPage"));

// Auth guard component to protect routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  // Check if user is visiting the app for the first time
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("hasVisited") !== "true";
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    // If first visit, mark as visited and redirect to login
    if (isFirstVisit) {
      localStorage.setItem("hasVisited", "true");
      navigate("/login");
    } else if (
      !isAuthenticated &&
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/forgot-password"
    ) {
      navigate("/login");
    }
  }, [location, navigate]);

  // Handle search functionality
  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Implement search logic here
    console.log("Searching for:", value);
  };

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center bg-slate-900">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage searchValue={searchValue} onSearch={handleSearch} />
            }
          />
          <Route
            path="/register"
            element={
              <LoginPage
                isRegister={true}
                searchValue={searchValue}
                onSearch={handleSearch}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <LoginPage
                isForgotPassword={true}
                searchValue={searchValue}
                onSearch={handleSearch}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home searchValue={searchValue} onSearch={handleSearch} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/heatmap"
            element={
              <ProtectedRoute>
                <RealTimeTrafficHeatmapPage
                  searchValue={searchValue}
                  onSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidents"
            element={
              <ProtectedRoute>
                <ActiveIncidentsAlertsPage
                  searchValue={searchValue}
                  onSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cctv"
            element={
              <ProtectedRoute>
                <LiveCCTVFeedsPage
                  searchValue={searchValue}
                  onSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prediction"
            element={
              <ProtectedRoute>
                <AIPoweredCongestionPredictionPage
                  searchValue={searchValue}
                  onSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/routes"
            element={
              <ProtectedRoute>
                <RouteModificationsPage
                  searchValue={searchValue}
                  onSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPanelPage
                  searchValue={searchValue}
                  onSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage
                  searchValue={searchValue}
                  onSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
