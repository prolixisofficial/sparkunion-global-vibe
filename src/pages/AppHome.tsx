
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppHome = () => {
  useEffect(() => {
    // Get username from localStorage or use default
    // This would normally come from authentication
    const username = "User";
    document.title = `Welcome, ${username} | SparkUnion`;
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="bg-secondary/80 px-4 py-2 rounded-full inline-block">
          <span className="text-primary font-heading font-bold text-xl">SparkUnion</span>
        </div>
        
        <h1 className="text-4xl font-bold">Welcome to SparkUnion!</h1>
        <p className="text-muted-foreground">
          Your account has been created successfully. This is where your personalized
          feed and dashboard would appear.
        </p>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild>
            <Link to="/">Explore Content</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppHome;
