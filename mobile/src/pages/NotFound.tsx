
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { SmartButton } from "@/components/ui/button/SmartButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-6">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-7xl font-bold mb-6 text-primary">404</h1>
        <p className="text-2xl font-semibold mb-4">Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/login">
          <SmartButton variant="default" className="mx-auto" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
            Back to Login
          </SmartButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
