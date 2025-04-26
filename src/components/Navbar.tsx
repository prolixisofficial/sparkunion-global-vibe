
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="bg-secondary/80 px-4 py-2 rounded-full">
            <span className="text-primary font-heading font-bold text-xl">SparkUnion</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            FEATURES
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            PRIVACY
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            HELP CENTRE
          </Link>
          <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            BLOG
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <span className="text-sm font-medium hover:text-primary/80 transition-colors">LOG IN</span>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              SIGN UP
            </Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 py-4 absolute w-full">
          <div className="container flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
              FEATURES
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
              PRIVACY
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
              HELP CENTRE
            </Link>
            <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
              BLOG
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Link to="/login" className="text-sm font-medium hover:text-primary/80 transition-colors">
                LOG IN
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full w-full">
                  SIGN UP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
