
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "../components/layout/PageLayout";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout title="Page Not Found" showBackButton={false} showMenu={false}>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mb-6">
          <span className="text-6xl font-light">404</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8 text-center">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="ios-button">
          Return to Home
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
