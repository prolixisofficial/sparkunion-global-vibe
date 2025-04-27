
import { Home, Search, PlusCircle, User, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Logged out",
        description: "You have been logged out successfully"
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full justify-between py-6 px-4 border-r border-border">
      <div className="space-y-2">
        <div className="flex justify-center mb-6">
          <div className="bg-secondary/80 px-4 py-2 rounded-full">
            <span className="text-primary font-heading font-bold text-xl">SparkUnion</span>
          </div>
        </div>
        
        <NavLink 
          to="/app" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`
          }
          end
        >
          <Home size={24} />
          <span className="font-medium hidden md:block">Home</span>
        </NavLink>
        
        <NavLink 
          to="/app/explore" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`
          }
        >
          <Search size={24} />
          <span className="font-medium hidden md:block">Explore</span>
        </NavLink>
        
        <NavLink 
          to="/app/glimes" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 8-6 4 6 4V8Z"></path>
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
          </svg>
          <span className="font-medium hidden md:block">Glimes</span>
        </NavLink>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 px-4 py-6 h-auto font-normal"
          onClick={() => navigate("/app/create")}
        >
          <PlusCircle size={24} />
          <span className="hidden md:block">Create</span>
        </Button>
        
        <NavLink 
          to="/app/profile" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-accent' : 'hover:bg-accent/50'} transition-colors`
          }
        >
          {user ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          ) : (
            <User size={24} />
          )}
          <span className="font-medium hidden md:block">Profile</span>
        </NavLink>
      </div>
      
      <Button 
        variant="ghost" 
        className="justify-start gap-3 hover:bg-accent/50"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        <LogOut size={24} />
        <span className="hidden md:block">{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </Button>
    </div>
  );
}
