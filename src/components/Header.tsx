
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";

export default function Header() {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo - only show on mobile */}
        {isMobile && (
          <Link to="/" className="flex-shrink-0">
            <div className="bg-secondary/80 px-4 py-2 rounded-full">
              <span className="text-primary font-heading font-bold text-xl">SparkUnion</span>
            </div>
          </Link>
        )}

        {/* Search */}
        <div className={`relative ${isMobile ? "flex-grow mx-4" : "w-[300px]"}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="search" 
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell />
          </Button>
          
          <Link to="/app/create">
            <Button className="bg-gradient-to-r from-primary to-secondary">
              {isMobile ? "+" : "Create a post"}
            </Button>
          </Link>
          
          {user && (
            <Link to="/app/profile">
              <Avatar className="h-8 w-8 border-2">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.user_metadata?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
